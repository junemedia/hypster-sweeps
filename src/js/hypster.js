define([
    'lib/debounce',
    'lib/jds'
], function(debounce, jds) {

    /**
     * BR context Globals
     */
    var
        BASE_HREF = 'http://hypster.com',
        FOOTER_LINKS = {},
        // Do not allow ads to be refreshed more than once every
        // AD_REFRESH_TIME_LIMIT ms
        AD_REFRESH_TIME_LIMIT = 4000,
        // Keep an internal DEEP copy of OX_ads so that we can reuse it when we
        // call refreshAds().  OpenX will Array.shift and destroy OX_ads in the
        // global window context.
        OX_ads_copy = [];



    /**
     * placeholder, could do something, but doesn't
     */
    function hypster() {}

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

        ourbestbox();

        zergnet();
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
        var yieldbot = W['yieldbot'];
        yieldbot.pub('d45f');
        yieldbot.defineSlot('LB');
        yieldbot.defineSlot('MR');
        yieldbot.enableAsync();
        yieldbot.go();
        // console.log('Yieldbot loaded');

        // load OX tags synchronously (after yieldbot)
        W['OX_ads'] = [{
            // Header - 728x90
            'slot_id': '728x90_ATF',
            'auid': '537513249',
            'vars': yieldbot.getSlotCriteria('LB')
        }, {
            // Right Rail Above the fold - 300x250
            'slot_id': '300x250_ATF',
            'auid': '537513251',
            'vars': yieldbot.getSlotCriteria('MR')
        }, {
            // Right Rail Below the Fold 300x250
            'slot_id': '300x250_BTF',
            'auid': '537513252'
        }, {
            // Footer - 728x90
            'slot_id': '728x90_BTF',
            'auid': '537513250'
        }];

        // make a deep copy of this tag configuration
        // to our internal OX_ads_copy
        $.extend(true, OX_ads_copy, W['OX_ads']);

        scriptAsync(
            '//junemedia-d.openx.net/w/1.0/jstag',
            OXSuccess,
            OXFailure
        );
    }

    function yieldbotFailure() {
        // console.error('Yieldbot failed to load');
    }

    function OXSuccess() {
        // console.log('OpenX loaded');
    }

    function OXFailure() {
        // console.error('OpenX failed to load');
    }

    function zergnetSuccess() {
        // console.log('Zergnet loaded');
    }

    function zergnetFailure() {
        // console.error('Zergnet failed to load');
    }

    function zergnet() {
        // Zergnet ads are independent of Yieldbot/OpenX
        scriptAsync(
            'http://www.zergnet.com/zerg.js?id=29457',
            zergnetSuccess,
            zergnetFailure
        );
    }

    function ourbestbox(callbackString) {
        if (!callbackString) {
            callbackString = 'ourbestbox';
        }

        // define the callback in the global window context
        W[callbackString] = function (d) {
            $('#' + callbackString).append(d && d['result'] || '');
        }

        $.ajax({
            // url: 'http://brstage.resolute.com/slideshows/ourbestbox_ajax/',
            url: 'http://www.betterrecipes.com/slideshows/ourbestbox_ajax',
            jsonp: callbackString,
            dataType: 'jsonp',
            data: {
                format: "json"
            }
        });
    }

    /**
     * This is the actual method to refresh ad units.  It will be throttle’d
     * and exposed as refreshAds
     */
    function refreshAdsNow() {
        // console.debug('Ad refresh at ' + new Date());
        resetAdZones();
        OX_ads_copy.forEach(function(a) {
            OX.load(a);
        });
        zergnet();
        ourbestbox();
    }

    // wrap and throttle the actual ad refresh method
    var refreshAds = hypster.refreshAds = debounce(function() {
            ADS_BEING_THROTTLED = false;
            // add a little cushion to allow a transition to finish
            // before refreshing the ads:
            setTimeout(refreshAdsNow, 1000)
        },
        AD_REFRESH_TIME_LIMIT,
        true,
        function() {
            ADS_BEING_THROTTLED = true;
        }
    );


    function footer() {
        var $copyright = $('footer nav');
        for (var heading in FOOTER_LINKS) {
            var $nav = $('<nav>').append($('<h5>').html(heading)),
                links = FOOTER_LINKS[heading],
                links_len = links.length;
            for (var i = 0; i < links_len; i++) {
                var link = links[i],
                    name,
                    url;
                if ($.type(link) == 'string') {
                    // special case for recipe categories
                    name = link;
                    url = BASE_HREF.replace(/www/, name.toLowerCase().replace(' ', '')) + '/';
                    // special case for Copycat recipes
                    if (name == 'Copycat') {
                        url = BASE_HREF.replace(/www/, 'restaurant') + '/';
                    }
                    name += ' Recipes'
                } else {
                    url = link[1].charAt(0) == '/' ? BASE_HREF + link[1] : link[1];
                    name = link[0];
                }
                $nav.append($('<a>').attr('href', url).html(name));
            }
            $copyright.before($nav);
        }
    }

    /*
     * Ready method: runs after DOMContentLoaded and once jQuery is ready
     *
     */
    ready(function() {

        // hamburger opener/closer on a mobile viewport size
        $('body>header .menu').on(ON_CLICK_SELECTSTART_TOUCHSTART, debounce(function(evt) {
            evt.preventDefault();
            $(this).closest('header').toggleClass('open');
        }, 100, true));

        // ad unit initialization
        initAds();

        // create the footer links
        footer();

    });

    // register our refreshAds method with jds
    jds.refreshAds = refreshAds;

    // expose the global window.BR object
    W['HYP'] = hypster;

    return hypster;

});
