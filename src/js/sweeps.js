/**
* sweeps.js
*/

// This may run at any time.  Since we rely on jQuery, we must wait until
// it is defined.
(function(w,$,m,l,t,i){



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
        var context = this, args = arguments;
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
    return function () {
        var context = scope || this;

        var now = +new Date,
        args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
                last = now;
                fn.apply(context, args);
        }
    };
}



/**
 * jds context Globals
 */
var ROADUNBLOCKED, // holds whether or not the captcha (Solve Media or Selectable Media) has been passed
    MIDNIGHT = function(){ return (new Date().setUTCHours(4,0,0,0) + 86400000) - new Date() }, // milliseconds until midnight
    ONE_YEAR = 1000*60*60*24*365,
    GENERIC_AJAX_ERROR = 'An unexpected error has occurred. Please try again.',
    // user variables
    // UI elements
    $logout_buttons;

function jds (key, val) {
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

function enter (already_entered) {
    var entered_contest = !!rd.db('ineligible'),
        logged_in = isLoggedIn();

    if (!logged_in) {
        $('.frame').hide();
        $('#signup').show();
        // jds('omniture', 'register');
        return;
    }

    if (entered_contest) {
        if (already_entered) {
            $('#thanks h2').html('You have already entered today.');
        }
        $('.frame').hide();
        $('#thanks').show();
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

function getEligibility () {
    $.ajax({
        type: 'POST',
        url: '/api/eligible',
        dataType: 'json',
        success: function(data)
        {
            if (!data) {
                // logout, but do not change any state
                return logout();
            }
            $logout_buttons.show();
            rd.db('lis', 1, ONE_YEAR);
            // rd.db('user_id', data.user_id, ONE_YEAR);
            rd.db('ineligible', !data.eligible, MIDNIGHT());
        }
    });
}

function logout (evt) {
    $logout_buttons.hide();
    rd.db('lis', null);
    rd.db('user_id', null);
    rd.db('ineligible', null);
    rd.cookie('sid', null);
    ROADUNBLOCKED = null;
    // only change state (enter) if this is a button click
    // otherwise, it's coming from somewhere like getEligibility()
    if (evt) {
        // enter(); // client doesn't want to go to login screen on logout
        // send to splash screen
        $('.frame').hide();
        $('#splash').show();
    }
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
function GTM (opts) {
    // initialize if passed a GTM id and we have not initialized yet
    if (!GTM.initialized && $.type(opts) === "string") {
        return init(opts);
    }

    // Assign dataLayer properties from Omniture
    var s = w['s'],
        d = (function(map){
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
            "Page Name"                : "pageName",
            "Channel"                  : "channel",
            "Category"                 : "prop1",
            "Subcategory"              : "prop2",
            "Application"              : "prop5",
            "Content ID"               : "prop9",
            "Search Term"              : "eVar5",
            "Registration Time"        : "eVar18",
            "Internal Campaign"        : "eVar8",
            "Email Campaign"           : "eVar15",
            "Party ID"                 : "eVar26",
            "Social Campaign"          : "eVar35",
            "Slideshows and Quizzes"   : "prop6",
            "Sponsor Name"             : "eVar44",
            "Registration Source"      : "eVar6",
            "Profile ID"               : "eVar32",
            "Hash ID"                  : "eVar68",
            "Status Code"              : "prop12",
            "Story"                    : "prop3",
            "Newsletter Signup Source" : "eVar27",
            "Member Logged In"         : "eVar24",
            "Content Type"             : "eVar29",
            "Commerce Enabled?"        : "eVar36",
            "External Campaign"        : "campaign",
            "Search Filters"           : "prop67",
            "Search Results Number"    : "prop68",
            "Video Playlist ID"        : "eVar41",
            "Video Player Name"        : "eVar40"
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
            url: '//www.googletagmanager.com/gtm.js?id='+id,
            dataType: 'script',
            cache: true
        })
        .done(done)
        .fail(fail);
        function done (data, textStatus, jqXHR) {
            GTM.initializing = false;
            GTM.initialized = true;
        }
        function fail (jqXHR, textStatus, errorThrown) {
            GTM.initializing = false;
            rd.error('GTM failed to load:', errorThrown);
        }
    }
} // /GTM

// Initialize the GTM global `dataLayer` array
var dataLayerString = 'dataLayer',
    dataLayer = w[dataLayerString];
if (!w[dataLayerString]) {
    dataLayer = w[dataLayerString] = [{'gtm.start':new Date().getTime(),event:'gtm.js'}];
}






/**
 * Solve Media
 */
function SolveMedia(opts) {
    // load Solve Media tag
    if (!opts || !opts.key) {
        rd.warn('Could not initialize solvemedia roadblock. No key provided.');
        return false;
    }
    // assign the challenge/public key
    var key = opts && opts.key;

    // set the invocation JS source
    var js_source = 'http://api.solvemedia.com/papi/challenge.ajax?k=' + key;
    // load the Solve Media JavaScript
    $.ajax({
        url: js_source,
        dataType: 'script',
        cache: true,
        success: function () {
            // nothing to do here
            // we'll load the puzzle once the user clicks
        },
        error: function () {
            rd.error('Failed to load SolveMedia JS: ' + js_source);
        }
    });

    function fire () {
        var ACPuzzle = w['ACPuzzle'];
        if (!ACPuzzle) {
            ROADUNBLOCKED = true;
            rd.error('SolveMedia.fire executed, but ACPuzzle not ready :(');
            return false;
        }
        ACPuzzle.create(key, "solvemedia_widget", {});
        $("#solvemedia form").on('submit', function(evt) {
            // don't even bother authenticating this response
            evt.preventDefault();
            // drop the gate until tomorrow (or logout or login as another user)
            ROADUNBLOCKED = true;
            $('#prize_form').submit();
            $("#solvemedia").hide();
            // not needed since we don't actually submit this captcha
            // $("#captcha-error").remove();
        });
        $("#solvemedia .close").on('click', collapse);
        $(document).on('keyup', escape);
        $('#solvemedia').show();

        return false;
    }

    function escape (e) {
        (e.keyCode == 27) && collapse();
    }

    function collapse () {
        $(document).off('keyup', escape);
        $("#solvemedia").hide();
    }
    // expose this "fire" method
    SolveMedia['fire'] = fire;
}





/**
 * Homepage/Splashpage Prize Carousel
 *
 * This was a quick stab at it.  It could use a lot of TLC.
 *
 */
function Carousel () {
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
        scroll_left_max
        ,last_child_width
        // ,index_width_scroller
        ,range_in_view
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
        x = !t ? 0 : t.left + last_child_width/2 - width_carousel/2;
    $scroller.scrollLeft(x);
    // call this once, just in case
    scrollback();


    $prev_arrow.on('click', throttle(goPrev, 450));
    $next_arrow.on('click', throttle(goNext, 450));

    function goPrev (evt) {
        var x = $scroller.scrollLeft() - width_carousel*.63;
        if (x <= 0) {
            x = 0;
            $carousel.addClass(FLUSH_LEFT_CLASS);
            $carousel.removeClass(FLUSH_RIGHT_CLASS);
        } else {
            $carousel.removeClass(FLUSH_LEFT_CLASS);
        }
        $scroller.animate({scrollLeft: x}, 400);
    }

    function goNext (evt) {
        var x = $scroller.scrollLeft() + width_carousel*.63;
        if (x >= scroll_left_max) {
            x = scroll_left_max + 1;
            $carousel.addClass(FLUSH_RIGHT_CLASS);
            $carousel.removeClass(FLUSH_LEFT_CLASS);
        } else {
            $carousel.removeClass(FLUSH_RIGHT_CLASS);
        }
        $scroller.animate({scrollLeft: x}, 400);
    }

    function scrollback (evt) {
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
        var i = Math.round(cur/last_child_width),
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
                .removeClass('ajax-loader')
                ;
                $c
                .addClass('loaded')
                .data('loaded', true);
            }
        }
    }

    function resize (evt) {
        // adjust width variables on window.resize
        updateWidthCarouselAndScrollerLeftMax();
    }

    $scroller.on('scroll', throttle(scrollback, 200));
    // $scroller.on('scroll', scrollback);
    $('window').on('resize', resize);

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
function xhr (submitEvent) {
    submitEvent.preventDefault();
    var
    callback = submitEvent.data && submitEvent.data.success || function() {},
    prereq   = submitEvent.data && submitEvent.data.prereq || function () { return true; },
    $form    = xhr.$form = $(this),
    $submit  = xhr.$submit = $form.find('input[type="submit"]').attr('disabled', 'disabled'),
    $loader  = $form.find('.ajax-loader').addClass('on'),
    $alert   = xhr.$alert = $form.find('.alert').empty().hide();
    // return false if a pre requirement is not met
    if (!prereq(submitEvent)) {
        restore();
        return false;
    }
    function restore () {
        $loader.removeClass('on');
        $submit.attr('disabled', null);
    }
    function done (data, textStatus, jqXHR) {
        restore();
        if (!data || (('err' in data) && parseInt(data['err']) === 1)) {
            $alert.html(data['msg'] || GENERIC_AJAX_ERROR).show();
            return;
        }
        return callback(data);
    }
    function fail (jqXHR, textStatus, errorThrown) {
        restore();
        $alert.html(GENERIC_AJAX_ERROR).show();
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
function ready () {

    $('#login_form').on('submit', {
    success: function (response) {
        // if (parseInt(response.code) === 2) {
        //     // hide the login form
        //     xhr.$form.hide();
        //     // switch to and populate the registration form
        //     xhr.$form = $('#signup_form');
        //     if (response.prefill) {
        //         for (var key in response.prefill) {
        //             var val = response.prefill[key];
        //             xhr.$form.find('[name="'+key+'"]').val(val);
        //         }
        //     }
        //     xhr.$form.find('.hide_on_update').hide();
        //     // instruct the user to complete his/her profile
        //     response.msg && xhr.$form.find('.alert').html(response.msg).show();
        //     return false;
        // }
        // remove any previous roads being unblocked
        ROADUNBLOCKED = null;
        // set environment variables
        rd.db('lis', 1, ONE_YEAR);
        // rd.db('user_id', response.user_id, ONE_YEAR);
        $logout_buttons.show();
        if (response.eligible) {
            enter();
        } else {
            // already entered
            rd.db('ineligible', true, MIDNIGHT()); // mark that we are ineligible until midnight tonight
            // shows #thanks, but with "You have ALREADY entered today…"
            enter(true);
        }
        return false;
    }
    }, xhr);

    $('#signup_form').on('submit', {
    success: function (response) {
        // remove any previous roads being unblocked
        ROADUNBLOCKED = null;
        // set environment variables
        rd.db('user_id', response.user_id, ONE_YEAR);
        rd.db('lis', 1, ONE_YEAR);
        // show buttons & clear this form
        $logout_buttons.show();
        xhr.$form.trigger('reset');
        // show the #prize_form
        enter();
        return false;
    }
    }, xhr);

    $('#forgot_form').on('submit', {
    success: function (response) {
        xhr.$alert.show().html(response.msg);
        xhr.$form.trigger('reset');
        xhr.$form.find('fieldset.login').hide();
        xhr.$submit.hide();
        xhr.$form.find('.forgot_close').html('Dismiss');
        return false;
    }
    }, xhr);

    $('#prize_form').on('submit', {
    prereq: function (response) {
        if (isLoggedIn()) {
            if (!rd.db('ineligible')) {
                // eligible
                if (!ROADUNBLOCKED) {
                    // Check for roadblock completion (Solve Media)
                    jds.roadblock && jds.roadblock();
                    return false;
                }
            } else {
                // ineligible
                enter();
                return false;
            }
            return true;
        }
        enter();
        return false;
    },
    success: function (response) {
        // destroy this now that we won't be needing it anymore
        ROADUNBLOCKED = null;
        // we cannot enter this contest until tomorrow
        rd.db('ineligible', true, MIDNIGHT());
        // this will send us to #thanks since we've set environment variables:
        enter();
    }
    }, xhr);

    /**
     * UI Bindings
     */
    $logout_buttons = $('a.logout').on('click', logout);
    $('a.forgot').on('click', function() {
        $('#signup').addClass('forgot');
        $('#login_form').find('.alert').empty();
    });
    $('a.forgot_close').on('click', function() {
        // close the form
        $('#signup').removeClass('forgot');
        // show all of the things that could be hidden so if they forget password again…
        $('#forgot_form')
            .trigger('reset')
            .find('input[type="submit"]').show()
            .find('fieldset.login').show()
            .find('.alert').empty();
    });

    /**
     * Carousel on splash (landing) page
     */
    Carousel();

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
        $logout_buttons.show();
        if (!rd.db('ineligible')) {
            // if we know you're ineligble, there's no point in checking with server
            getEligibility();
        }
    }


} // end ready()



/**
 * Expose global context hooks into jds.*
 */
jds['gtm']              = GTM;
jds['solvemedia']       = SolveMedia;
// jds['carousel']         = Carousel; // not needed
// // CANNOT export ROADUNBLOCKED since it is a primitive
// // Only Objects (arrays, functions, …) can be exported
// // since JavaScript won't pass a primitive as a refernece:
// // http://stackoverflow.com/a/6605700
// jds['roadunblocked']    = ROADUNBLOCKED;



/**
 * jds() deferred loader
 */
i=0; // placeholder for setInterval id
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
