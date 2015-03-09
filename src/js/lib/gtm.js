define(['./db'], function(db) {
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
        dataLayer,
        initialized,
        initializing;

    function track(evt, pass_user_id) {
        var d = {
            'event': evt
        };


        // only pass the user_id along with the GTM if the
        // user is logged in, otherwise DO NOT send empty
        if (pass_user_id !== false && db('user_id')) {
            d['userId'] = db('user_id');
        }

        console.debug('ADS_BEING_THOTTLED', !ADS_BEING_THOTTLED);

        // Did we successfully refresh the ads, or are they
        // currently being throttled?
        d['ad'] = !ADS_BEING_THOTTLED;

        return dataLayer.push(d);
    }

    /**
     * Download the GTM JS
     *
     * @param string id
     *
     * return void
     */
    function download(id) {

        // don't keep loading the GTM JS code
        if (initializing) {
            return;
        }

        if (!id) {
            console.error('jds("gtm", ?) called without a "GTM-XXXXXX"');
            return;
        }

        initializing = true;

        $.ajax({
            url: '//www.googletagmanager.com/gtm.js?id=' + id,
            dataType: 'script',
            cache: true
        })
            .done(function() {
                initializing = false;
                initialized = true;
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                initializing = false;
                console.error('GTM failed to load:', errorThrown);
            });

    }

    return function(id_or_event, pass_user_id) {
        if (initialized) {
            // regular track event
            return track(id_or_event, pass_user_id);
        }

        // initialize if passed a GTM id and we have not initialized yet
        if (typeof id_or_event === 'string' && id_or_event.indexOf('GTM-') === 0) {
            // Initialize the GTM global `dataLayer` array
            if (!W[dataLayerString]) {
                dataLayer = W[dataLayerString] = [{
                    'gtm.start': +new Date(),
                    event: 'gtm.js'
                }];
            }
            return download(id_or_event);
        }


    }
});