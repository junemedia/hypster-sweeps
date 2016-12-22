define([
    './jds',
    './events',
    './db',
    './cookie',
    './debounce',
    './throttle',
    './slideshow_prize',
    './slideshow_calendar',
    './slideshow_winner',
    './xhr',
    './solvemedia',
    './gtm'
], function(
    jds,
    events,
    db,
    cookie,
    debounce,
    throttle,
    slideshow,
    calendar,
    xhr,
    solvemedia,
    gtm
) {

    var
    // UI elements
        // $name, // inside the $profile_bar
        $profile_bar,
        $verify;


    function scrollTop(i) {
        // blur() focus in order to pull down the keyboard on mobile devices
        $('.logo').trigger(ON_FOCUS).trigger(ON_BLUR);
        // scroll to top
        $(W).scrollTop(i || 0);
    }

    /**
     *
     * Update the view when Enter Now button is pushed
     *   doesn't actually do any entering per se
     *
     */
    function enter(already_entered) {
      console.info('enter()');
        var entered_contest = !!db('ineligible'),
            logged_in = isLoggedIn();

        if (!logged_in) {
          console.info('enter: not logged in, show login form');
            $('.frame').hide();
            $('#signup').show();
            $('#login_username').trigger(ON_FOCUS);
            events.enterAnonymous();
            return;
        }

        // do not do tracking here, safer to perform
        // tracking on XHR responses
        if (entered_contest) {
          console.info('enter: ineligible');
            if (already_entered) {
                $('#thanks h2').html('You have already entered today.');
            }
            $('.frame, .calendar, #winners, .see_prizes').hide();
            // add thank you HTML to #thanks
            $('#thanks').append($(db('thanks') || '')).show();
        } else {
          console.info('eligible');
            $('.frame').hide();
            $('#prize').show();
            // no tracking event here
        }

    }

    function isLoggedIn() {
        return db('lis') == 1;
    }

    function getEligibility() {
        $.ajax({
            type: 'POST',
            url: '/api/eligible',
            dataType: 'json'
        }).done(function(data) {
            if (!data || !data.status || data.status != XHR_OK) {
                return logout();
            }
            $profile_bar.show();
            db('lis', 1, ONE_YEAR);
            db('user_id', data.user_id, ONE_YEAR);
            db('ineligible', !data.eligible, data.midnight * 1000);
        });
    }

    function logout() {
        $.ajax({
            type: 'POST',
            url: '/api/logout',
            dataType: 'json'
        }).done(function(data) {
            $profile_bar.hide();
            db('lis', null);
            db('user_id', null);
            db('name', null);
            db('email', null);
            db('verify_address', null);
            db('ineligible', null);
            cookie('sid', null);
            ROADUNBLOCKED = null;
            // $name.html('');
            events.logout();
        });
        return false;
    }

    function verify() {
        $.ajax({
            type: 'POST',
            url: '/api/verify',
            dataType: 'json'
        }).done(done).fail(fail);

        function done(data) {
            if (data.err) {
                return fail(data.message);
            }
            $verify.html('Verification email sent.');
            events.verifyRequest();
        }

        function fail(msg) {
            $verify.html(GENERIC_AJAX_ERROR);
            // no tracking event here
        }
        return false;
    }

    /**
     * Report all of our Events to GTM and request a refreshAds()
     *
     * This method is bind’ed to all `Events`.  If you want to do something
     * else for a specific event, you can either bind another event hook:
     *
     *      events.slideshow(function(evt) {
     *          console.log('Yay, I just did a ' + evt + ' event!');
     *      });
     *
     * - or -
     *
     * You can modify the behavoir of this Track callback based on the `event`
     * string parameter.
     *
     * @param   string  event   Tracking event string
     *
     * @return  boolean
     */
    function basicEventHandler(event) {

        // issue a request to refresh the ad tags
        jds.refreshAds();

        // send the event to GTM
        var matched = !gtm(event); // boolean, was GTM event found?

        // VERBOSE:
        // log whether or not this event was matched in GTM
        // and also whether or not ads are being refreshed or throttled
        // console.debug('GTM ' + event + ' {ad:' + (!ADS_BEING_THROTTLED ? 'true' : 'false') + '} ' + (matched ? 'successfully matched' : 'FAILED to match against') + ' a GTM event');

    }

    // Bind Track()’ing to all of our events
    for (var i in events) {
        events[i](basicEventHandler);
    }

    /*
     * Ready methods
     */
    ready(function() {
      $('#login_form').on(ON_SUBMIT, {
        success: function(response) {
          console.info('login form success callback');
          console.debug(response);
          scrollTop(0);
          // remove any previous roads being unblocked
          ROADUNBLOCKED = null;

          // set environment variables
          db('lis', 1, ONE_YEAR);
          db('user_id', response.user_id, ONE_YEAR);
          db('name', response.name, ONE_YEAR);
          db('email', response.email, ONE_YEAR);

          if (!!response.firstname &&
              !!response.lastname &&
              !!response.address &&
              !!response.city &&
              !!response.state &&
              !!response.zipcode) {
                console.info('profile complete');
            db('verify_address', null);
          }
          else {
                console.info('profile incomplete');
            db('verify_address', true, ONE_YEAR);
          }
          // If we get back the thank you HTML, save it.
          // This should only occur if a user is ineligible,
          // but let's just store it whenever we get it.
          if (response.thanks) {
            db('thanks', response.thanks, ONE_YEAR);
          }

          $profile_bar.show();
          // fire the event callbacks (ads refresh)
          events.login();

          if (response.eligible) {
            enter();
          } else {
            // already entered
            db('ineligible', true, response.midnight * 1000); // mark that we are ineligible until midnight tonight
            // shows #thanks, but with "You have ALREADY entered today…"
            enter(true);
            events.enterDuplicate();
          }
          return false;
        },
        fail: function() {
          console.info('login form fail callback');
          events.loginFail();
        }
      }, xhr);

      $('#info_form').on(ON_SUBMIT, function () {
        console.info('address from submission');
        return false;
      });

      $('#signup_form').on(ON_SUBMIT, {
        success: function(response) {
          scrollTop(0);
          // remove any previous roads being unblocked
          ROADUNBLOCKED = null;
          // set environment variables
          db('lis', 1, ONE_YEAR);
          db('user_id', response.user_id, ONE_YEAR);
          // only set the name if given in resposne
          response.name && db('name', response.name, ONE_YEAR);
          // show buttons & clear this form
          // $name.html(db('name'));
          $profile_bar.show();
          xhr.$form.trigger(ON_RESET);

          if (xhr.$form.hasClass('profile')) {
            events.profileUpdate();
            // // handle the reload on /profile page
            // W.location.href = W.location.href;
            // JDS-23: client wants to redirect to homepage
            W.location.href = '/';
          } else {
            events.signup();
            // show the #prize_form
            enter();
          }
          return false;
        },
        fail: function() {
          // or could be tracked as update fail, but let's not split hairs
          // or could also be captcha on first signup
          events.signupFail();
        }
      }, xhr);

      $('#forgot_form').on(ON_SUBMIT, {
        success: function(response) {
          xhr.$alert.show().html(response.message);
          xhr.$form.trigger(ON_RESET);
          xhr.$form.find('fieldset.login').hide();
          xhr.$form.find('p').hide();
          xhr.$submit.hide();
          xhr.$form.find('.forgot_close').html('Dismiss');
          events.forgot();
          return false;
        }
      }, xhr);

      $('#reset_form').on(ON_SUBMIT, {
        success: function(response) {
          scrollTop(0);
          xhr.$alert.show().html(response.message);
          xhr.$form.trigger(ON_RESET);
          xhr.$form.find('fieldset, input').hide();
          xhr.$form.find('.success').show();
          events.reset();
          return false;
        }
      }, xhr);

      $('#prize_form').on(ON_SUBMIT, {
        prereq: function() {
          if (isLoggedIn()) {
            console.info('prereq: is logged in');
            if (!db('ineligible')) {
              if(db('verify_address')) {
                console.warn('need to verify address info');
                return false;
              }
              else {
                console.info('eligible');
                // eligible
                return true;
              }
            }
            else {
              console.info('prereq: ineligible');
              // ineligible
              enter(true);
              events.enterDuplicate();
              return false;
            }
            return true;
          }
          // if user not logged in, change view to login form
          console.info('prereq: not logged in');
          enter();
          return false;
        },
        success: function(response) {
          scrollTop(0);
          // destroy this now that we won't be needing it anymore
          ROADUNBLOCKED = null;
          // we cannot enter this contest until tomorrow
          db('ineligible', true, response.midnight * 1000);
          // store the thank you HTML response
          db('thanks', response.thanks, ONE_YEAR);
          // this will send us to #thanks since we've set environment variables:
          enter();
          events.enter();
        }
      }, xhr);



        /**
         * UI Bindings
         */
        $profile_bar = $('.account');
        // $name = $($profile_bar.find('a')[0]);
        // $name.html(db('name'));
        $('.logout').on(ON_CLICK, logout);
        /*
        $('a.forgot').on(ON_CLICK, function() {
            $('#signup').addClass('forgot');
            $('#login_form').find('.alert').empty();
            $('#forgot_email').trigger(ON_FOCUS);
        });
        $('a.forgot_close').on(ON_CLICK, function() {
            // close the form
            $('#signup').removeClass('forgot');
            // show all of the things that could be hidden so,
            // if they forget password again…
            var $forgot_form = $('#forgot_form');
            $forgot_form.trigger(ON_RESET);
            $forgot_form.find('fieldset, input').show();
            $forgot_form.find('p').show();
            $forgot_form.find('.success').hide();
            $forgot_form.find('.alert').empty();
            $('#login_username').trigger(ON_FOCUS);
        });
        */
        $verify = $('.verify');
        $verify.find('a').on(ON_CLICK, verify);


        /**
         * Check if user is logged in
         */
        if (isLoggedIn()) {
            $profile_bar.show();
            if (!db('ineligible')) {
                // if we know you're ineligble, there
                // is no point in checking with server
                getEligibility();
            }
        }

    }); // end ready()

});
