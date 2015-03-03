/**
 * sweeps.js
 */

// This may run at any time.  Since we rely on jQuery, we must wait until
// it is defined.
(function(w, $, m, l, t, i) {

    /**
     * Utility Functions (thank you Underscore.js)
     */
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function throttle(fn, threshhold, scope) {
        threshhold || (threshhold = 250);
        var last,
            deferTimer;
        return function() {
            var context = scope || this;

            var now = +new Date,
                args = arguments;
            if (last && now < last + threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function() {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }

    function scrollTop(i) {
        // defer this so that iOS will close the keyboard
        $(w).scrollTop(i || 0);
    }



    /**
     * jds context Globals
     */
    var ROADUNBLOCKED, // holds whether or not the captcha (Solve Media or Selectable Media) has been passed
        ONE_YEAR = 1000 * 60 * 60 * 24 * 365,
        GENERIC_AJAX_ERROR = 'An unexpected error has occurred. Please try again.',

        // XHR "status" response codes (see app/config/constants.php)
        XHR_OK = 1,
        XHR_ERROR = 2,
        XHR_AUTH = 3,
        XHR_INVALID = 4,
        XHR_DUPLICATE = 5,
        XHR_EXPIRED = 6,
        XHR_NOT_FOUND = 7,
        XHR_INCOMPLETE = 8,
        XHR_HUMAN = 9,

        // TRACKing status strings (used for GTM events)
        TRACK_ENTER_ANONYMOUS = 'enterAnonymous', // anonymous user clicks on the "Enter Now" button.
        TRACK_SIGNUP = 'signup', // user registered a new account successfully
        TRACK_SIGNUP_FAIL = 'signupFail', // user failed to register a new account
        TRACK_LOGIN = 'login', // user authenticates successfully
        TRACK_LOGIN_FAIL = 'loginFail', // user failed to authenticate
        TRACK_ENTER = 'enter', // authenticated user successfully entered into today’s contest
        TRACK_ENTER_DUPLICATE = 'enterDuplicate', // authenticated user re-entered into today’s contest
        TRACK_ENTER_FAIL = 'enterFail', // authenticated user failed to enter into today’s contest for a reason other than duplicate
        TRACK_FORGOT = 'forgot', // anonymous user successfully entered his/her email and triggered a password reset email
        TRACK_RESET = 'reset', // anonymous user successfully reset his/her password
        TRACK_VERIFY = 'verify', // authenticated or anonymous user successfully verified his/her email address (verification email sent after new signup or email address change via profile update)
        TRACK_VERIFY_REQUEST = 'verifyRequest', // authenticated user requested to verify his/her email address
        TRACK_PROFILE_UPDATE = 'profileUpdate', // authenticated user updated his/her profile
        TRACK_LOGOUT = 'logout', // authenticated user logs in


        // UI elements
        $name, // inside the $profile_bar
        $profile_bar,
        $verify;

    function jds() {
        var args = [],
            method;

        if (!arguments.length) {
            return false;
        }

        Array.prototype.push.apply(args, arguments);

        method = args.shift();

        if (!method || !method in jds || !$.isFunction(jds[method])) {
            return false;
        }
        return jds[method].apply(this, args);
    }

    function enter(already_entered) {
        var entered_contest = !!rd.db('ineligible'),
            logged_in = isLoggedIn();

        if (!logged_in) {
            $('.frame').hide();
            $('#signup').show();
            $('#login_email').trigger('focus');
            Track(TRACK_ENTER_ANONYMOUS);
            return;
        }

        // do not do tracking here, safer to perform
        // tracking on XHR responses
        if (entered_contest) {
            if (already_entered) {
                $('#thanks h2').html('You have already entered today.');
                // Track(TRACK_ENTER_DUPLICATE);
            }
            $('.frame').hide();
            $('#thanks').show();
            $('.carousel, #winners, .see_all_prizes').hide();
            // Track(TRACK_ENTER);
        } else {
            $('.frame').hide();
            $('#prize').show();
            // no tracking event here
        }

    }

    function isLoggedIn() {
        return rd.db('lis') == 1;
    }

    function getEligibility() {
        $.ajax({
            type: 'POST',
            url: '/api/eligible',
            dataType: 'json'
        }).done(function(data) {
            if (!data || !data.status || data.status != XHR_OK) {
                // logout, but do not change any state
                return logout();
            }
            $profile_bar.show();
            rd.db('lis', 1, ONE_YEAR);
            rd.db('user_id', data.user_id, ONE_YEAR);
            rd.db('ineligible', !data.eligible, data.midnight * 1000);
        });
    }

    function logout(evt) {
        $.ajax({
            type: 'POST',
            url: '/api/logout',
            dataType: 'json'
        }).done(function(data) {
            $profile_bar.hide();
            rd.db('lis', null);
            rd.db('user_id', null);
            rd.db('name', null);
            rd.db('ineligible', null);
            rd.cookie('sid', null);
            ROADUNBLOCKED = null;
            $name.html('');
            // only change state (enter) if this is a button click
            // otherwise, it's coming from somewhere like getEligibility()
            // if (evt) {
            //     // enter(); // client doesn't want to go to login screen on logout
            //     // send to splash screen
            //     // $('.frame').hide();
            //     // $('#splash').show();
            // }
            Track(TRACK_LOGOUT);
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
                return fail(data.msg);
            }
            $verify.html('Verification email sent.');
            Track(TRACK_VERIFY_REQUEST);
        }

        function fail(msg) {
            $verify.html('Failed to send, please try again later.');
            // no tracking event here
        }
        return false;
    }

    /**
     * Google Tag Manager (GTM)
     *
     * This will load the GTM JavaScript and send dataLayer calls.
     *
     * @param   string  id_or_event
     * @param   boolean pass_user_id    default: true; must explicitely send as false to supress
     *
     * @return void
     *
     *
     * Example initializer:
     *      jds("gtm", "GTM-ABCDEF")
     *
     * Example sending a pageview/event
     *      jds("gtm", "myGtmEvent", true)
     *
     * GTM IDs are defined in the database `site`.`gtm`
     *      BetterRecipes: GTM-5VTT4K
     *
     */

    var dataLayerString = 'dataLayer',
        dataLayer = w[dataLayerString];

    function GTM(id_or_event, pass_user_id) {
        // initialize if passed a GTM id and we have not initialized yet
        if (!GTM.initialized && $.type(id_or_event) === 'string' && id_or_event.indexOf('GTM-') === 0) {
            // Initialize the GTM global `dataLayer` array
            if (!w[dataLayerString]) {
                dataLayer = w[dataLayerString] = [{
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                }];
            }
            return init(id_or_event);
        }

        // regular track event
        return track(id_or_event, pass_user_id);


        function track(evt, pass_user_id) {
            var d = {
                'event': evt
            };
            if (pass_user_id !== false && rd.db('user_id')) {
                d['userId'] = rd.db('user_id');
            }
            return dataLayer.push(d);
        }

        /**
         * Download the GTM JS
         *
         * @param string id
         *
         * return void
         */
        function init(id) {
            if (!id) {
                rd.error('jds.gtm() called without an "id" param');
                return;
            }
            // don't keep loading the GTM JS code
            if (GTM.initializing) {
                return;
            }
            GTM.initializing = true;
            $.ajax({
                url: '//www.googletagmanager.com/gtm.js?id=' + id,
                dataType: 'script',
                cache: true
            })
                .done(done)
                .fail(fail);

            function done(data, textStatus, jqXHR) {
                GTM.initializing = false;
                GTM.initialized = true;
            }

            function fail(jqXHR, textStatus, errorThrown) {
                GTM.initializing = false;
                rd.error('GTM failed to load:', errorThrown);
            }
        }
    } // /GTM

    /**
     * Report tracking events
     *
     * @param   string  event   Tracking event string
     *
     * @return  boolean
     */
    function Track(event) {
        var matched = !GTM(event); // boolean for whether the GTM event was matched

        // refresh the ads on any JDS event
        jds['refreshAds']();

        // DEBUG:
        // expose every event to GTM
        rd[matched ? 'log' : 'warn']('GTM ' + event + ': ' + (matched ? 'successfully matched' : 'FAILED to match against') + ' a GTM event');

        // // Do something different for specific events?
        // switch (event) {
        //     case TRACK_ENTER_ANONYMOUS:
        //         break;
        //     case TRACK_SIGNUP:
        //         break;
        //     case TRACK_SIGNUP_FAIL:
        //         break;
        //     case TRACK_LOGIN:
        //         break;
        //     case TRACK_LOGIN_FAIL:
        //         break;
        //     case TRACK_ENTER:
        //         break;
        //     case TRACK_ENTER_DUPLICATE:
        //         break;
        //     case TRACK_ENTER_FAIL:
        //         break;
        //     case TRACK_FORGOT:
        //         break;
        //     case TRACK_RESET:
        //         break;
        //     case TRACK_VERIFY:
        //         break;
        //     case TRACK_VERIFY_REQUEST:
        //         break;
        //     case TRACK_PROFILE_UPDATE:
        //         break;
        //     case TRACK_LOGOUT:
        //         break;
        //     default:
        //         break;
        // }
    }


    /**
     * Solve Media
     */
    function SolveMedia(key) {
        // load Solve Media tag
        if (!key) {
            rd.warn('Could not initialize SolveMedia roadblock. No key provided.');
            return false;
        }
        var
        // src = '//api' + (location.protocol == 'https:' ? '-secure' : '') + '.solvemedia.com/papi/challenge.ajax', // invocation JS
            src = '//api.solvemedia.com/papi/_puzzle.js', // invocation JS
            acp, // placeholder for window.ACPuzzle after /papi/_puzzle.js loads
            $solvemedia = $('#solvemedia');


        // needed by /papi/_puzzle.js
        w['ACPuzzleInfo'] = {
            protocol: !window.location.protocol.match(/^https?:$/) ? 'http:' : '',
            apiserver: '//api.solvemedia.com',
            mediaserver: '//api.solvemedia.com',
            magic: 'u7WpnzA6KVaLL0XYMDopVg',
            chalapi: 'ajax',
            chalstamp: 1424984044,
            lang: 'en',
            size: 'standard',
            theme: 'custom',
            type: 'img',
            onload: null
        }
        // w['ACPuzzleOptions'] = {
        //     theme: 'custom'
        // };

        // load the Solve Media JavaScript
        $.ajax({
            url: src,
            dataType: 'script',
            cache: true // prevent appending ?<timstamp> bullsh
        }).fail(function() {
            rd.error('Failed to load SolveMedia JS: ' + src);
        })
            .done(function() {
                acp = w['ACPuzzle'];
                acp.create(key);
            });

        function fire(callback) {
            SolveMedia.callback = callback;
            // acp = w['ACPuzzle'];
            // acp.create(key);

            if (!acp) {
                // this is unfortunate, the roadblock has been called,
                // but SolveMedia's invocation JS has not loaded yet.
                ROADUNBLOCKED = true;
                rd.error('SolveMedia.fire executed, but ACPuzzle not ready :(');
                return false;
            }
            $(document).on('keyup', escape);
            $solvemedia.show();
            // iOS won't let you focus on a field that was hidden when the event fired
            // LOSING BATTLE ON IOS:
            focus();
            return false;
        }

        function escape(e) {
            if (e.which == 27) {
                collapse();
                return false;
            }
            return true;
        }

        function focus() {
            acp.focus_response_field();
            // var $txtbox = $solvemedia.find('input[type="text"]');
            // // assist mobile safari
            // $txtbox.on('focus', function(evt) {
            //     scrollTop(0);
            // });
            // $txtbox.trigger('focus');
        }

        function collapse() {
            $(document).off('keyup', escape);
            $("#solvemedia").hide();
        }

        function tap(evt) {
            var $target = $(evt.target);
            switch ($target.attr('id') || $target[0].nodeName) {
                case 'adcopy-link-refresh':
                    acp.reload();
                    focus();
                    break;
                case 'adcopy-link-audio':
                    acp.change2audio();
                    focus();
                    break;
                case 'adcopy-link-image':
                    acp.change2image();
                    focus();
                    break;
                case 'adcopy-link-info':
                case 'I': // solve media logo
                    acp.moreinfo();
                    break;
                case 'solvemedia':
                case 'B': // close button
                    collapse();
                    break;
                default:
                    return true;
            }
            return false;

        }

        // don't use touchstart or selectstart here, iOS will flip out:
        $solvemedia.on('click', tap);

        $solvemedia.find('form').on('submit', {
            success: function(response) {
                ROADUNBLOCKED = true;
                collapse();
                if ($.type(SolveMedia.callback) == 'function') {
                    SolveMedia.callback();
                }
            },
            fail: function(response) {
                acp.reload();
                return false;
            }
        }, xhr);

        // expose this "fire" method
        SolveMedia['fire'] = fire;
    }



    /**
     * Homepage/Splashpage Prize Carousel
     *
     * This was a quick stab at it.  It could use a lot of TLC.
     *
     */
    function Carousel() {
        var FLUSH_LEFT_CLASS = 'flush_left',
            FLUSH_RIGHT_CLASS = 'flush_right',
            $carousel = $('.carousel'),
            $scroller = $carousel.find('.wrap'),
            $prev_arrow = $carousel.find('.prev'),
            $next_arrow = $carousel.find('.next'),
            $today = $carousel.find('.today'),

            $children = $scroller.children(),
            $last_child = $($children[$children.length - 1]),
            // v
            width_scroller,
            width_carousel,
            scroll_left_max, last_child_width
            // ,index_width_scroller
            , range_in_view
            // ^
        ;

        // calculate the scroller width, why can't we just get the width of the scroller (.wrap)?
        // this seems like a lot of bullshit
        function updateWidthCarouselAndScrollerLeftMax() {
            var
                last_child_pos = $last_child.position(),
                last_child_left = last_child_pos && last_child_pos.left + $scroller.scrollLeft();

            last_child_width = $last_child.width();
            // also used to center shiests on load
            width_scroller = last_child_left + last_child_width;
            // v
            width_carousel = $carousel.width()
            scroll_left_max = width_scroller - width_carousel + 0; // 2 = px of left and right border
            // ^
            // index_width_scroller = Math.round(width_scroller / last_child_width);
            range_in_view = Math.round(width_carousel / last_child_width);
            // rd.log(i,j);
        }

        updateWidthCarouselAndScrollerLeftMax();

        if (!$carousel.length) {
            return;
        }

        // set initial scrollLeft to be centered on TODAY
        // var x = width_scroller/2 - width_carousel/2;
        var t = $today.position(),
            x;
        x = !t ? 0 : t.left + last_child_width / 2 - width_carousel / 2;
        $scroller.scrollLeft(x);
        // call this once, just in case
        scrollback();


        $prev_arrow.on('selectstart touchstart', throttle(goPrev, 450));
        $next_arrow.on('selectstart touchstart', throttle(goNext, 450));

        function goPrev(evt) {
            var x = $scroller.scrollLeft() - width_carousel * .63;
            if (x <= 0) {
                x = 0;
                $carousel.addClass(FLUSH_LEFT_CLASS);
                $carousel.removeClass(FLUSH_RIGHT_CLASS);
            } else {
                $carousel.removeClass(FLUSH_LEFT_CLASS);
            }
            $scroller.animate({
                scrollLeft: x
            }, 400);
        }

        function goNext(evt) {
            var x = $scroller.scrollLeft() + width_carousel * .63;
            if (x >= scroll_left_max) {
                x = scroll_left_max + 1;
                $carousel.addClass(FLUSH_RIGHT_CLASS);
                $carousel.removeClass(FLUSH_LEFT_CLASS);
            } else {
                $carousel.removeClass(FLUSH_RIGHT_CLASS);
            }
            $scroller.animate({
                scrollLeft: x
            }, 400);
        }

        function scrollback(evt) {
            // rd.log('Carousel.scrollback() fired');
            var cur = $scroller.scrollLeft();
            if (cur >= scroll_left_max) {
                $carousel
                    .addClass(FLUSH_RIGHT_CLASS);
            } else if (cur <= 0) {
                $carousel
                    .addClass(FLUSH_LEFT_CLASS);
            } else {
                $carousel
                    .removeClass(FLUSH_LEFT_CLASS)
                    .removeClass(FLUSH_RIGHT_CLASS);
            }

            // we need to lazily load all prize images
            // that are in view of the carousel
            // range to load (or check)
            var i = Math.round(cur / last_child_width),
                min = i <= 1 ? 0 : (i - 1),
                max = min + range_in_view + 2;
            // rd.log(Math.round(min, max));
            for (var n = min; n <= max; n++) {
                // rd.log(n);
                var $c = $($children[n]);
                if ($c.length && !$c.data('loaded')) {
                    var img = $c.find('img');
                    img
                        .attr('src', img.data('src'))
                        .data('src', false)
                        .removeClass('ajax-loader');
                    $c
                        .addClass('loaded')
                        .data('loaded', true);
                }
            }
        }

        function resize(evt) {
            // adjust width variables on window.resize
            updateWidthCarouselAndScrollerLeftMax();
        }

        $scroller.on('scroll', throttle(scrollback, 200));
        // $scroller.on('scroll', scrollback);
        $('window').on('resize', resize);

    }



    /**
     * Prize slideshow
     *
     * Dynamically create a slideshow if multiple images or descriptions exist
     *
     */
    function Slideshow() {
        var $prize = $('.prize'),
            $img = $prize.find('img'),
            $desc = $($prize.find('p')[0]),
            IMG = {
                1: $img.attr('src')
            }, // initialize the first $img
            DESC = {
                1: $desc.html()
            }, // initialize the first $desc
            FRAMES = [1], // array of frames
            FRAME_LEN = 1, // array of frames
            CUR_FRAME_INDEX = 1;

        if (!$prize.length) {
            return;
        }

        var v;
        if (v = $img.data('img2')) {
            IMG[2] = v;
        }
        if (v = $img.data('img3')) {
            IMG[3] = v;
        }
        if (v = $desc.data('desc2')) {
            DESC[2] = v;
        }
        if (v = $desc.data('desc3')) {
            DESC[3] = v;
        }

        for (var i = 2; i <= 3; i++) {
            if (IMG[i] || DESC[i]) {
                FRAMES.push(i);
                if (!IMG[i]) {
                    // THIS IS NOT GOOD ENOUGH
                    // THIS IS NOT GOOD ENOUGH
                    // THIS IS NOT GOOD ENOUGH
                    // THIS IS NOT GOOD ENOUGH
                    // THIS IS NOT GOOD ENOUGH
                    // THIS IS NOT GOOD ENOUGH
                    IMG[i] = IMG[i - 1];
                }
                if (!DESC[i]) {
                    // THIS IS NOT GOOD ENOUGH
                    // THIS IS NOT GOOD ENOUGH
                    // THIS IS NOT GOOD ENOUGH
                    // THIS IS NOT GOOD ENOUGH
                    // THIS IS NOT GOOD ENOUGH
                    // THIS IS NOT GOOD ENOUGH
                    DESC[i] = DESC[i - 1];
                }
            }
        }

        if ((FRAME_LEN = FRAMES.length) == 1) {
            return;
        }

        // create prev/next controls
        $prize
            .addClass('slideshow')
            .append($('<b class="prev">').on('selectstart touchstart', debounce(prev, 100, true)))
            .append($('<b class="next">').on('selectstart touchstart', debounce(next, 100, true)));
        // create dots
        var $dots = $('<div class="dots">');
        for (var i = 1; i <= FRAME_LEN; i++) {
            $dots.append($('<i>').data('cur', i));
        }

        $prize
            .addClass('cur1')
            .append($dots);
        $dots.on('touchstart selectstart', 'i', debounce(function() {
            goto($(this).data('cur'));
        }, 100, true));

        function goto(cur) {
            cur = parseInt(cur);
            $img.attr('src', IMG[FRAMES[cur - 1]]);
            $desc.html(DESC[FRAMES[cur - 1]]);
            $prize
                .removeClass('cur' + CUR_FRAME_INDEX)
                .addClass('cur' + cur);
            CUR_FRAME_INDEX = cur;
        }

        function prev(e) {
            e.preventDefault();
            e.stopPropagation();
            goto((CUR_FRAME_INDEX <= 1) ? FRAME_LEN : CUR_FRAME_INDEX - 1);
        }

        function next(e) {
            e.preventDefault();
            e.stopPropagation();
            goto((CUR_FRAME_INDEX >= FRAME_LEN) ? 1 : CUR_FRAME_INDEX + 1);
        }
    }



    /**
     * XHR submit handler
     *
     * Used by $.ajax() calls to handle responses
     *
     * @param event submitEvent
     *
     * @return false
     *
     */
    function xhr(submitEvent) {
        submitEvent.preventDefault();
        var
            callback = submitEvent.data && submitEvent.data.success || function() {},
            callbackFail = submitEvent.data && submitEvent.data.fail || function() {},
            prereq = submitEvent.data && submitEvent.data.prereq || function() {
                return true;
            },
            $form = xhr.$form = $(this).addClass('loading'),
            $submit = xhr.$submit = $form.find('input[type="submit"]').attr('disabled', 'disabled'),
            $loader = $form.find('loader').addClass('on'),
            $alert = xhr.$alert = $form.find('.alert').empty().hide();

        // return false if a pre requirement is not met
        if (!prereq(submitEvent)) {
            restore();
            return false;
        }

        function restore() {
            $loader.removeClass('on');
            $form.removeClass('loading');
            $submit.attr('disabled', null);
        }

        function done(data, textStatus, jqXHR) {
            restore();

            // blur() focus in order to pull down the keyboard on mobile devices
            $('.logo').trigger('focus').trigger('blur');

            if (!data || !'status' in data || data['status'] !== XHR_OK) {
                switch (data['status']) {
                    case XHR_AUTH:
                        // If we get an error of XHR_AUTH, then make sure we are logged out
                        logout();
                        break;
                    case XHR_HUMAN:
                        // Captcha has expired in our session, pop it up, and pass the callback
                        jds.roadblock(function() {
                            $form.trigger('submit')
                        });
                        break;
                }
                $alert.html(data['message'] || GENERIC_AJAX_ERROR).show();
                return callbackFail(data);
            }
            return callback(data);
        }

        function fail(jqXHR, textStatus, errorThrown) {
            restore();

            // blur() focus in order to pull down the keyboard on mobile devices
            $('.logo').trigger('focus');

            $alert.html(GENERIC_AJAX_ERROR).show();
            return callbackFail();
        }
        $.ajax({
            type: 'POST',
            url: $form.attr('action'),
            data: $form.serialize(),
            dataType: 'json'
        })
            .done(done)
            .fail(fail);
        return false;
    }



    /*
     * Ready methods
     */
    function ready() {

        $('#login_form').on('submit', {
            success: function(response) {
                scrollTop(0);
                // remove any previous roads being unblocked
                ROADUNBLOCKED = null;
                // set environment variables
                rd.db('lis', 1, ONE_YEAR);
                rd.db('user_id', response.user_id, ONE_YEAR);
                rd.db('name', response.name, ONE_YEAR);
                $name.html(response.name);
                $profile_bar.show();
                Track(TRACK_LOGIN);
                if (response.eligible) {
                    enter();
                } else {
                    // already entered
                    rd.db('ineligible', true, response.midnight * 1000); // mark that we are ineligible until midnight tonight
                    // shows #thanks, but with "You have ALREADY entered today…"
                    enter(true);
                    Track(TRACK_ENTER_DUPLICATE);
                }
                return false;
            },
            fail: function() {
                Track(TRACK_LOGIN_FAIL);
            }
        }, xhr);

        $('#signup_form').on('submit', {
            success: function(response) {
                scrollTop(0);
                // remove any previous roads being unblocked
                ROADUNBLOCKED = null;
                // set environment variables
                rd.db('lis', 1, ONE_YEAR);
                rd.db('user_id', response.user_id, ONE_YEAR);
                // only set the name if given in resposne
                response.name && rd.db('name', response.name, ONE_YEAR);
                // show buttons & clear this form
                $name.html(rd.db('name'));
                $profile_bar.show();
                xhr.$form.trigger('reset');

                if (xhr.$form.hasClass('profile')) {
                    Track(TRACK_PROFILE_UPDATE);
                    // handle the reload on /profile page
                    window.location.href = window.location.href;
                } else {
                    Track(TRACK_SIGNUP);
                    // show the #prize_form
                    enter();
                }
                return false;
            },
            fail: function() {
                // or could be tracked as update fail, but let's not split hairs
                // or could also be captcha on first signup
                Track(TRACK_SIGNUP_FAIL);
            }
        }, xhr);

        $('#forgot_form').on('submit', {
            success: function(response) {
                xhr.$alert.show().html(response.msg);
                xhr.$form.trigger('reset');
                xhr.$form.find('fieldset.login').hide();
                xhr.$form.find('p').hide();
                xhr.$submit.hide();
                xhr.$form.find('.forgot_close').html('Dismiss');
                Track(TRACK_FORGOT);
                return false;
            }
        }, xhr);

        $('#reset_form').on('submit', {
            success: function(response) {
                scrollTop(0);
                xhr.$alert.show().html(response.msg);
                xhr.$form.trigger('reset');
                xhr.$form.find('fieldset, input').hide();
                xhr.$form.find('.success').show();
                Track(TRACK_RESET);
                return false;
            }
        }, xhr);

        $('#prize_form').on('submit', {
            // prereq: function() {
            //     if (isLoggedIn()) {
            //         if (!rd.db('ineligible')) {
            //             // eligible
            //             if (!ROADUNBLOCKED) {
            //                 // Check for roadblock completion (Solve Media)
            //                 jds.roadblock && jds.roadblock(function() {
            //                     $('#prize_form').trigger('submit');
            //                 });
            //                 return false;
            //             }
            //         } else {
            //             // ineligible
            //             enter();
            //             return false;
            //         }
            //         return true;
            //     }
            //     enter();
            //     return false;
            // },
            prereq: function() {
                if (isLoggedIn()) {
                    if (!rd.db('ineligible')) {
                        // eligible
                        return true;
                        // if (!ROADUNBLOCKED) {
                        //     // Check for roadblock completion (Solve Media)
                        //     jds.roadblock && jds.roadblock(function() {
                        //         $('#prize_form').trigger('submit');
                        //     });
                        //     return false;
                        // }
                    } else {
                        // ineligible
                        enter(true);
                        Track(TRACK_ENTER_DUPLICATE);
                        return false;
                    }
                    return true;
                }
                enter();
                return false;
            },
            success: function(response) {
                scrollTop(0);
                // destroy this now that we won't be needing it anymore
                ROADUNBLOCKED = null;
                // we cannot enter this contest until tomorrow
                rd.db('ineligible', true, response.midnight * 1000);
                // this will send us to #thanks since we've set environment variables:
                enter();
                Track(TRACK_ENTER);
            }
        }, xhr);

        /**
         * UI Bindings
         */
        $profile_bar = $('.account');
        $name = $($profile_bar.find('a')[0]);
        $name.html(rd.db('name'));
        $('.logout').on('click', logout);
        $('a.forgot').on('click', function() {
            $('#signup').addClass('forgot');
            $('#login_form').find('.alert').empty();
            $('#forgot_email').trigger('focus');
        });
        $('a.forgot_close').on('click', function() {
            // close the form
            $('#signup').removeClass('forgot');
            // show all of the things that could be hidden so if they forget password again…
            var $forgot_form = $('#forgot_form');
            $forgot_form.trigger('reset');
            $forgot_form.find('fieldset, input').show();
            $forgot_form.find('p').show();
            $forgot_form.find('.success').hide();
            $forgot_form.find('.alert').empty();
            $('#login_email').trigger('focus');
        });
        $verify = $('.verify');
        $verify.find('a').on('click', verify);

        /**
         * Carousel on splash (landing) page
         */
        Carousel();

        /**
         * Prize slideshow
         */
        Slideshow();

        /**
         * Roadblock initialization
         */
        // Initialize the jds.roadblock with SolveMedia until SelectableMedia comes online
        // SolveMedia.fire will gracefully exit if ACPuzzle isn't defined/ready
        // so it's safe to use this as the default captcha even before it's loaded
        jds.roadblock = SolveMedia.fire;


        /**
         * Check if user is logged in
         */
        if (isLoggedIn()) {
            $profile_bar.show();
            if (!rd.db('ineligible')) {
                // if we know you're ineligble, there's no point in checking with server
                getEligibility();
            }
        }

        //
        //
        //
        //
        // Requires:
        // • jQuery to be loaded,
        // • `debounce` utility function
        // • document to be ready
        //
        //
        //
        //
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

        /**
         * BetterRecipes
         *
         * hamburger opener/closer on mobile devices
         */
        $('body>header .menu').on('touchstart selectstart click', debounce(function(evt) {
            evt.preventDefault();
            $(this).closest('header').toggleClass('open');
        }, 100, true));

        /**
         * BetterRecipes::Ad Units
         *
         * June Media is using OpenX/ReviveAds + Yieldbot.  Refreshing these types of
         * tags is not trivial, neither party provide an easily documented way to perform
         * ad refreshes.
         *
         * Limitations:
         * • OpenX/Revive will replace whatever DOM object with a matching id="" with
         *   the ad tag's generated, usually iFrame, DOM element.  This makes it
         *   difficult to refresh the ad unit.
         *
         * Approach
         * Since the matching id="" DOM element is replaced, we must create the DOM element
         * on the fly.
         *
         */

        var // Do not allow ads to be refreshed more than once every AD_REFRESH_TIME_LIMIT ms
            AD_REFRESH_TIME_LIMIT = 4000,
            // keep an internal DEEP copy of OX_ads so that we can use when we refresh
            rd_OX_ads = [];

        // on DOM ready, create the nested divs with the appropriate id, derrived from data-id
        function resetAdZones() {
            $('.ad').each(function(i, e) {
                var $e = $(e);
                if (!$e.data('id')) {
                    return;
                }
                $e.empty();
                $e.append($('<div>').attr('id', $e.data('id')));
            });
        }

        function _refreshAds() {
            resetAdZones();
            rd_OX_ads.forEach(function(a) {
                w['OX'].load(a);
            });
        }

        // export this to global jds context
        var refreshAds = jds['refreshAds'] = throttle(_refreshAds, AD_REFRESH_TIME_LIMIT);

        // initialize the ad zones
        resetAdZones();

        // Yieldbot.com Intent Tag (fire immediately)
        $.ajax({
            url: '//cdn.yldbt.com/js/yieldbot.intent.js',
            dataType: 'script',
            cache: true
        })
            .done(function(data, textStatus, jqXHR) {
                rd.log('Yieldbot loaded.');
                var yieldbot = w['yieldbot'];
                yieldbot.pub('d45f');
                yieldbot.defineSlot('LB');
                yieldbot.defineSlot('MR');
                yieldbot.enableAsync();
                yieldbot.go();
                w['OX_ads'] = [{
                    // Header - 728x90
                    'slot_id': '537278266_728x90_ATF',
                    'auid': '537278266',
                    'vars': yieldbot.getSlotCriteria('LB')
                }, {
                    // Right Rail Above the fold - 300x250
                    'slot_id': '537278268_300x250_ATF',
                    'auid': '537278268',
                    'vars': yieldbot.getSlotCriteria('MR')
                }, {
                    // Right Rail Below the Fold 300x250
                    'slot_id': '537278269_300x250_BTF',
                    'auid': '537278269'
                }, {
                    // Footer - 728x90
                    'slot_id': '537278267_728x90_BTF',
                    'auid': '537278267'
                }];
                // deep copy to our internal rd_OX_ads
                $.extend(true, rd_OX_ads, w['OX_ads']);
                $.ajax({
                    url: '//ox-d.junemedia.com/w/1.0/jstag',
                    dataType: 'script',
                    cache: true
                })
                    .done(function(data, textStatus, jqXHR) {
                        rd.log('OpenX JavaScript Loaded');
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        rd.error('OpenX JavaScript failed to load');
                    });
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                rd.error('Yieldbot failed to load');
            });

        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js
        // BREAK OUT INTO a betterrecipes.js

    } // end ready()

    /**
     * Expose global context hooks into jds.*
     */
    jds['gtm'] = GTM;
    jds['track'] = Track;
    jds['solvemedia'] = SolveMedia;



    /**
     * jds() deferred loader
     */
    i = 0; // placeholder for setInterval id
    (l = function() {
        // rd.log('Checking for jQuery '+i);
        if (!w[$]) {
            (!i++) && (t = setInterval(l, 16)); // check every 16 milliseconds
            return;
        }
        // rd.warn('jQuery FOUND after '+i+' intervals!')
        t && clearInterval(t);

        // define 'jQuery'/$ in this context:
        $ = w[$];

        // process any jds() calls before we started
        if (w[m] && w[m].q) {
            w[m].q.forEach(function(a) {
                jds.apply(w, a);
            });
        }

        // overwrite the window.jds object with this one.
        w[m] = jds;

        $(ready); // kick things off
    })();



})(window, 'jQuery', 'jds');