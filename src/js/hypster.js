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
        AD_REFRESH_TIME_LIMIT = 4000;


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
      loadOpenX();
      ourbestbox();
      zergnet();
    }

    function loadOpenX() {
      // set the OpenX configuration every time we refresh, /jstag JS will delete it
      W['OX_ads'] = [
          // Header - 728x90
        { 'slot_id': '728x90_ATF',  'auid': '538708064' },
          // Right Rail Above the fold - 300x250
        { 'slot_id': '300x250_ATF', 'auid': '538708061' },
          // Right Rail Below the Fold 300x250
        { 'slot_id': '300x250_BTF', 'auid': '538708063' },
          // Footer - 728x90
        { 'slot_id': '728x90_BTF',  'auid': '538708065' }
      ];

      scriptAsync('//junemedia-d.openx.net/w/1.0/jstag');
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
    function scriptAsync(url, chain) {
      $.ajax({
          url: url,
          dataType: 'script',
          cache: true
        })
       .fail(function () {
          console.error(url, 'FAILED to load');
        })
       .done(function () {
          console.info(url, 'loaded');
          if (chain) {
            chain();
          }
        });
    }

    function zergnet() {
      // Zergnet ads are independent of Yieldbot/OpenX
      scriptAsync('//www.zergnet.com/zerg.js?id=47344');
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
      loadOpenX();
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
