define([
    'lib/debounce',
    'lib/jds'
], function(debounce, jds) {

    var
    // Do not allow ads to be refreshed more than once every
    // AD_REFRESH_TIME_LIMIT ms
        AD_REFRESH_TIME_LIMIT = 4000;


    function openx() {
        // set the OpenX configuration every time we refresh, /jstag JS will delete it
        W['OX_ads'] = [{
            // Header - 728x90
            'slot_id': '728x90_ATF',
            'auid': '537614199'
        }, {
            // Right Rail Above the fold - 300x250
            'slot_id': '300x250_ATF',
            'auid': '537614197'
        }, {
            // Right Rail Below the Fold 300x250
            'slot_id': '300x250_BTF',
            'auid': '537614198'
        }, {
            // Footer - 728x90
            'slot_id': '728x90_BTF',
            'auid': '537614200'
        }];

        getScript('//ox-d.junemedia.com/w/1.0/jstag');
    }


    function zergnet() {
        // Zergnet ads are independent of OpenX
        getScript('http://www.zergnet.com/zerg.js?id=29019');
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
    function getScript(url, chain) {
        $.ajax({
            url: url,
            dataType: 'script',
            cache: true
        })
            .fail(function() {
                console.error(url + ' FAILED to load');
            })
            .done(function() {
                console.debug(url + ' loaded');
                if (chain) {
                    chain();
                }
            });
    }

    /**
     * This is the actual method to refresh ad units.  It will be throttle’d
     * and exposed as refreshAds
     */
    function refreshAdsNow() {
        console.debug('Ad refresh at ' + new Date());
        resetAdZones();
        openx();
        zergnet();
    }

    // wrap and throttle the actual ad refresh method
    var refreshAds = debounce(function() {
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

    // register our refreshAds method with jds
    jds.refreshAds = refreshAds;

    /*
     * Ready method: runs after DOMContentLoaded and once jQuery is ready
     *
     * load the ads on document ready
     */
    ready(refreshAds);

});