/**
 * br.js -- BetterRecipes.com Global JavaScript Library
 *
 * This JavaScript should be included in any project that uses the
 * BetterRecipes shell.  This script is asynchronous, and does depend
 * on jQuery.  However, it will wait to execute until the `jQuery` object
 * is defined in the global context.
 *
 * Depends on:
 * • jQuery v1.11+
 * • rd.log.js
 *
 * Defines window.BR in the global context.
 *
 * Provides BR.refreshAds or BR("refreshAds") method.
 *
 */

'use strict';

// This may run at any time.  Since we rely on jQuery, we must wait until
// it is defined.
(function(w, $, m, rd) {

    /**
     * BR context Globals
     */
    var // Do not allow ads to be refreshed more than once every
        // AD_REFRESH_TIME_LIMIT ms
        AD_REFRESH_TIME_LIMIT = 4000,
        // Keep an internal DEEP copy of OX_ads so that we can reuse it when we
        // call refreshAds().  OpenX will Array.shift and destroy OX_ads in the
        // global window context.
        OX_ads_copy = [];

    /**
     * debounce: Returns a function, that, as long as it continues to be
     * invoked (.), will not be triggered (*).  The function will be called
     * after it stops being called for `threshold` milliseconds.  If
     * `immediate` is passed, trigger the function on the leading edge,
     * instead of the trailing.
     *
     *       /-- 10s --\ /-- 10s --\ /-- 10s --\
     *     (*). . . . . . . . . . . .           *
     *
     * @param   function    fn          Function to be throttled
     * @param   integer     threshold   Milliseconds fn will be throttled
     * @param   integer     immediate   Context fn should be .apply(ed) with
     *
     * @return  function    Debounce'd function `fn`
     */
    function debounce(fn, threshold, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments,
                later = function() {
                    timeout = null;
                    if (!immediate) fn.apply(context, args);
                },
                callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, threshold);
            if (callNow) fn.apply(context, args);
        };
    }


    /**
     * throttle: Utility function that throttles the invokation (*) of your
     * function parameter (fn) to once every (threshhold) milliseconds.
     *
     *       /-- 10s --\ /-- 10s --\ /-- 10s --\
     *      * . . . . . * . . . . . * . . . . . *
     *
     * @param   function    fn          Function to be throttled
     * @param   integer     threshold   Milliseconds fn will be throttled
     * @param   object      scope       Context fn should be .apply(ed) with
     *
     * @return  function    Throttled fn
     */
    function throttle(fn, threshhold, scope) {
        if (!threshhold) {
            threshhold = 250;
        }
        var last,
            deferTimer;
        return function() {
            var context = scope || this,
                now = +new Date(),
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

    /**
     * Actual/true BR() function definition
     *
     * This will replace the temporary window.BR that may or may not have
     * been created previously in the HTML content.
     *
     */
    function BR() {
        var args = [],
            method;

        if (!arguments.length) {
            return false;
        }

        Array.prototype.push.apply(args, arguments);

        method = args.shift();

        return (method && method in BR && $.isFunction(BR[method])) ? BR[method].apply(this, args) : false;
    }



    /**
     * Begin loading of Ad tags as soon as possible
     *
     *
     */
    function initAds() {
        // initialize the ad zones
        resetAdZones();

        // Yieldbot.com Intent Tag (fire immediately)
        // Load Yieldbot first, hydrate the OX_ads
        // parameters accordingly, and then continue
        // on to load OpenX tags.
        scriptAsync(
            '//cdn.yldbt.com/js/yieldbot.intent.js',
            yieldbotSuccess,
            yieldbotFailure
        );
    }


    /**
     * For any class="ad" element, create a child <div> and give it an
     * id of the parent data-id.
     *
     * For example:
     *      <div class="ad" data-id="ABC-XYZ"></div>
     *
     * Becomes:
     *      <div class="ad" data-id="ABC-XYZ">
     *          <div id="ABC-XYZ">
     *          </div>
     *      </div>
     *
     * This is necessary, because OpenX, specifically the OX.load() method,
     * will replace whatever element getElementById() matches with it’s own
     * element, typically an iFrame, and will not restore the id attribute
     * on the newly created element.
     *
     * So, in order to keep this <div id="ABC-XYZ"> selectable, we must create
     * it everytime before calling OX.load().
     *
     */
    function resetAdZones() {
        $('.ad').each(function(i, e) {
            var $e = $(e);
            if (!$e.data('id')) {
                return;
            }
            $e
                .empty()
                .append($('<div>').attr('id', $e.data('id')));
        });
    }

    /**
     * Asynchronously load an ad tag (JavaScript) `url` and invoke the
     * `success` and `failure` callbacks accordingly.
     */
    function scriptAsync(url, success, failure) {
        $.ajax({
            url: url,
            dataType: 'script',
            cache: true
        }).done(success).fail(failure);
    }

    function yieldbotSuccess() {
        var yieldbot = w['yieldbot'];
        yieldbot.pub('d45f');
        yieldbot.defineSlot('LB');
        yieldbot.defineSlot('MR');
        yieldbot.enableAsync();
        yieldbot.go();
        rd.log('Yieldbot loaded');

        // load OX tags synchronously (after yieldbot)
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

        // make a deep copy of this tag configuration
        // to our internal OX_ads_copy
        $.extend(true, OX_ads_copy, w['OX_ads']);

        scriptAsync(
            '//ox-d.junemedia.com/w/1.0/jstag',
            OXSuccess,
            OXFailure
        );
    }

    function yieldbotFailure() {
        rd.error('Yieldbot failed to load');
    }

    function OXSuccess() {
        rd.log('OpenX JavaScript Loaded');
    }

    function OXFailure() {
        rd.error('OpenX JavaScript failed to load');
    }

    /**
     * This is the actual method to refresh ad units.  It will be throttle’d
     * and exposed as refreshAds
     */
    function refreshAdsNow() {
        rd.debug('Ad refresh at ' + new Date());
        resetAdZones();
        OX_ads_copy.forEach(function(a) {
            OX.load(a);
        });
    }

    // wrap and throttle the actual ad refresh method
    var refreshAds = throttle(refreshAdsNow, AD_REFRESH_TIME_LIMIT);


    /**
     * BR.hook: Arbitrary event hook mechanism
     *
     *
     * Example 1: single event registration, binding, and triggering
     *
     *      var mySignupEvent = BR.hook('signup');  // register
     *
     *      mySignupEvent(function(evt) {           // bind
     *          console.log(evt);                   // 'signup'
     *      });
     *
     *      mySignupEvent();                        // trigger
     *
     *
     * Example 2: multiple registration, binding, and triggering
     *
     *      var Events = BR.hook({                  // register 3
     *          signup: 'signup',                   // event hooks
     *          login: 'login',
     *          logout: 'logout'
     *      });
     *
     *      for (var i in Events) {                 // bind a callback
     *          Events[i](function (evt) {          // to each event
     *              console.log(evt);
     *          })
     *      });
     *
     *      for (var i in Events) {                 // trigger all
     *          Events[i](function (evt) {          // events
     *              console.log(evt);
     *          })
     *      });
     *
     *      Events.signup();                        // or, trigger
     *                                              // single event
     *
     *
     * @param   mixed   `evt_name` can either be a string or an obect of
     *                  hooks in the form:
     *                  {key1: evt_name1, key2: evt_name2}
     *
     * @return  mixed   Hook object or object of Hook objects
     */
    function Hook(evt_name) {

        var callbacks = [];

        // register a hook or group of hooks
        switch ($.type(evt_name)) {
            case 'string':
                return hook;
            case 'object':
                for (var i in evt_name) {
                    evt_name[i] = Hook(evt_name[i]);
                }
                return evt_name;
            default:
                return null;
        }


        function hook(callback, ctx) {
            if (arguments.length === 0) {
                // trigger
                return callbacks.forEach(function(fn) {
                    return fn.cb.call(fn.ctx, evt_name);
                });
            }
            // bind
            callbacks.push({
                cb: callback,
                ctx: ctx || w
            });
        }
    }

    /*
     * Ready method: runs after DOMContentLoaded and once jQuery is ready
     *
     */
    function ready() {

        // hamburger opener/closer on a mobile viewport size
        $('body>header .menu').on('touchstart selectstart click', debounce(function(evt) {
            evt.preventDefault();
            $(this).closest('header').toggleClass('open');
        }, 100, true));

        // ad unit initialization
        initAds();

    }

    /**
     * Expose global context hooks into BR.*
     */
    BR.refreshAds = refreshAds;
    BR.hook = Hook;



    /**
     * BR() deferred loader
     */
    var
        intervalTimer, // placeholder for setInterval id
        intervalCounter = 0;
    (function recursiveJqueryChecker() {

        // check for jQuery
        if (!w[$]) {
            if (!(intervalCounter++)) {
                // check again in 16 milliseconds
                intervalTimer = setInterval(recursiveJqueryChecker, 16);
            }
            return;
        }

        if (intervalTimer) {
            // remove previous timer
            clearInterval(intervalTimer);
        }

        // define 'jQuery'/$ in this context:
        $ = w[$];

        // process any BR() calls before we were loaded
        if (w[m] && w[m].q) {
            w[m].q.forEach(function(a) {
                BR.apply(w, a);
            });
        }

        // overwrite the window.BR object with this one
        w[m] = BR;

        $(ready); // kick things off
    })();



})(window, 'jQuery', 'BR', window.rd);