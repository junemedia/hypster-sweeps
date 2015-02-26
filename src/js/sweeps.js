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

        // UI elements
        $name, // inside the $profile_bar
        $profile_bar,
        $verify;

    function jds(key, val) {
        if (key in jds) {
            if ($.isFunction(jds[key])) {
                return jds[key].call(this, val);
            }
            if ($.isPlainObject(val)) {
                return $.extend(jds[key], val);
            }
        }
        return jds[key] = val;
    }

    function enter(already_entered) {
        var entered_contest = !!rd.db('ineligible'),
            logged_in = isLoggedIn();

        if (!logged_in) {
            $('.frame').hide();
            $('#signup').show();
            $('#login_email').trigger('focus');
            // jds('omniture', 'register');
            return;
        }

        if (entered_contest) {
            if (already_entered) {
                $('#thanks h2').html('You have already entered today.');
            }
            $('.frame').hide();
            $('#thanks').show();
            $('.carousel, .winners, .see_all_prizes').hide();
            // jds('omniture', 'exclusiveoffers');
        } else {
            $('.frame').hide();
            $('#prize').show();
            // jds('omniture', 'enter');
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
            rd.db('name', null);
            rd.db('ineligible', null);
            rd.cookie('sid', null);
            ROADUNBLOCKED = null;
            $name.html('');
            // only change state (enter) if this is a button click
            // otherwise, it's coming from somewhere like getEligibility()
            if (evt) {
                // enter(); // client doesn't want to go to login screen on logout
                // send to splash screen
                // $('.frame').hide();
                // $('#splash').show();
            }
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
        }

        function fail(msg) {
            $verify.html('Failed to send, please try again later.');
        }
        return false;
    }

    /**
     * Google Tag Manager (GTM)
     *
     * This will load the GTM JavaScript and send dataLayer calls.
     *
     * @param mixed opts
     *
     * @return void
     *
     *
     * Example initializer:
     *      jds("gtm", "GTM-ABCDEF")
     *
     * Example sending a pageview/event
     *      jds("gtm")
     *
     * GTM IDs are defined in app/config/project.php
     *      BetterRecipes: GTM-XXXXXX
     *
     */
    function GTM(opts) {
        // initialize if passed a GTM id and we have not initialized yet
        if (!GTM.initialized && $.type(opts) === "string") {
            return init(opts);
        }

        // Assign dataLayer properties from Omniture
        var s = w['s'],
            d = (function(map) {
                // assign GTM/dataLayer keys to corresponding Omniture s.*
                var dataL = {};
                for (var gtm_key in map) {
                    var omniture_key = map[gtm_key];
                    // loose comparision:
                    // this works, because Pip does not want empty dataLayer params
                    if (s[omniture_key]) {
                        dataL[gtm_key] = s[omniture_key];
                    }
                }
                return dataL;
            })({
                // GTM (dataLayer) :: Omniture (window.s)
                "Page Name": "pageName",
                "Channel": "channel",
                "Category": "prop1",
                "Subcategory": "prop2",
                "Application": "prop5",
                "Content ID": "prop9",
                "Search Term": "eVar5",
                "Registration Time": "eVar18",
                "Internal Campaign": "eVar8",
                "Email Campaign": "eVar15",
                "Party ID": "eVar26",
                "Social Campaign": "eVar35",
                "Slideshows and Quizzes": "prop6",
                "Sponsor Name": "eVar44",
                "Registration Source": "eVar6",
                "Profile ID": "eVar32",
                "Hash ID": "eVar68",
                "Status Code": "prop12",
                "Story": "prop3",
                "Newsletter Signup Source": "eVar27",
                "Member Logged In": "eVar24",
                "Content Type": "eVar29",
                "Commerce Enabled?": "eVar36",
                "External Campaign": "campaign",
                "Search Filters": "prop67",
                "Search Results Number": "prop68",
                "Video Playlist ID": "eVar41",
                "Video Player Name": "eVar40"
            });
        d['event'] = "pageview";
        dataLayer.push(d);

        // Additionally, send any enter as a "Registrations" event
        if (s.events && s.events.match(/scRemove/)) {
            var registrations_event_dataLayer = {
                "event": "Registrations",
                "Registration Source": d["Registration Source"]
                // ,"Registration Time": d["Registration Time"] // Cannot find where this is ever set in Omniture and I don't know how to format it myself
            };
            if (s.events.match(/event23/)) {
                registrations_event_dataLayer["Marketing Opt Ins"] = 1;
            }
            dataLayer.push(registrations_event_dataLayer);
        }
        // Additionally, send a "Newsletter Signup" event for each newsletter in s.products
        if (s.events && s.events.match(/scAdd/) && s.products) {
            s.products.split(',').forEach(function(newsletter_id) {
                dataLayer.push({
                    "event": "Newsletter Signup",
                    "Newsletter ID": newsletter_id.replace(/^Newsletter;/, '')
                });
            });
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

    // Initialize the GTM global `dataLayer` array
    var dataLayerString = 'dataLayer',
        dataLayer = w[dataLayerString];
    if (!w[dataLayerString]) {
        dataLayer = w[dataLayerString] = [{
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        }];
    }



    /**
     * Solve Media
     */
    function SolveMedia(opts) {
        // load Solve Media tag
        if (!opts || !opts.key) {
            rd.warn('Could not initialize SolveMedia roadblock. No key provided.');
            return false;
        }
        var
            key = opts.key, // assign the challenge/public key
            // src = '//api' + (location.protocol == 'https:' ? '-secure' : '') + '.solvemedia.com/papi/challenge.ajax', // invocation JS
            src = '//api.solvemedia.com/papi/_puzzle.js', // invocation JS
            acp, // placeholder for window.ACPuzzle after /papi/_puzzle.js loads
            $solvemedia = $('#solvemedia');


        // needed by /papi/_puzzle.js
        w['ACPuzzleInfo'] = {
            protocol: !window.location.protocol.match(/^https?:$/) ? 'http:' : '',
            apiserver: '//api.solvemedia.com',
            mediaserver: '//api.solvemedia.com',
            magic: 'L.Q1tHYw9Y0fbE6WdjD1jQ',
            chalapi: 'ajax',
            chalstamp: 1424826183,
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

            // console.log(acp, w['ACPuzzle']);
            if (!ACPuzzle) {
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
            var $txtbox = $solvemedia.find('input[type="text"]');
            // assist mobile safari
            $txtbox.on('focus', function(evt) {
                console.log(evt);
                // evt.preventDefault();
                scrollTop(0);
            });
            $txtbox.trigger('focus');
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
            $('.logo').trigger('focus');

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
                rd.db('name', response.name, ONE_YEAR);
                $name.html(response.name);
                $profile_bar.show();
                if (response.eligible) {
                    enter();
                } else {
                    // already entered
                    rd.db('ineligible', true, response.midnight * 1000); // mark that we are ineligible until midnight tonight
                    // shows #thanks, but with "You have ALREADY entered today…"
                    enter(true);
                }
                return false;
            }
        }, xhr);

        $('#signup_form').on('submit', {
            success: function(response) {
                scrollTop(0);
                // remove any previous roads being unblocked
                ROADUNBLOCKED = null;
                // set environment variables
                rd.db('lis', 1, ONE_YEAR);
                // only set the name if given in resposne
                response.name && rd.db('name', response.name, ONE_YEAR);
                // show buttons & clear this form
                $name.html(rd.db('name'));
                $profile_bar.show();
                xhr.$form.trigger('reset');

                if (xhr.$form.hasClass('profile')) {
                    // hanlde the reload on /profile page
                    window.location.href = window.location.href;
                } else {
                    // show the #prize_form
                    enter();
                }
                return false;
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
         * BetterRecipes
         *
         * Ad Units
         */
        w['OX_ads'] = [{
            // Header - 728x90
            'slot_id': '537278266_728x90_ATF',
            'auid': '537278266'
        }, {
            // Right Rail Above the fold - 300x250
            'slot_id': '537278268_300x250_ATF',
            'auid': '537278268'
        }, {
            // Right Rail Below the Fold 300x250
            'slot_id': '537278269_300x250_BTF',
            'auid': '537278269'
        }, {
            // Footer - 728x90
            'slot_id': '537278267_728x90_BTF',
            'auid': '537278267'
        }];
        $.ajax({
            url: '//ox-d.junemedia.com/w/1.0/jstag',
            dataType: 'script',
            cache: true
        })
            // .done(function(data, textStatus, jqXHR) {
            //     rd.log('OpenX JavaScript Loaded');
            // })
            .fail(function(jqXHR, textStatus, errorThrown) {
                rd.error('OpenX JavaScript failed to load');
            });



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
    jds['solvemedia'] = SolveMedia;



    /**
     * jds() deferred loader
     */
    i = 0; // placeholder for setInterval id
    (l = function() {
        // rd.log('Checking for jQuery '+i);
        if (!w[$]) {
            (!i++) && (t = setInterval(l, 50)); // check every 50 milliseconds
            return;
        }
        // rd.warn('jQuery FOUND after '+i+' intervals!')
        t && clearInterval(t);

        // define $ in this context:
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