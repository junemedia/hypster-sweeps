define(['./solvemedia', './gtm', './sweeps'], function(solvemedia, gtm) {

    /**
     * Actual/true jds() function definition
     *
     * This will replace the temporary window.jds that may or may not have
     * been created previously in the HTML content.
     *
     */
    function jds() {
        var args = [],
            method;

        if (!arguments.length) {
            return false;
        }

        Array.prototype.push.apply(args, arguments);

        method = args.shift();

        return (method && method in jds && $.isFunction(jds[method])) ? jds[method].apply(this, args) : false;
    }

    // JDS exposure

    // null function that shells can override
    jds.refreshAds = function() { W.console && console.warn('No refreshAds() method defined in shell!'); }

    jds.solvemedia = solvemedia;

    /**
     * Roadblock initialization
     */
    // Initialize the jds.roadblock with SolveMedia until SelectableMedia
    // comes online SolveMedia.fire will gracefully exit if ACPuzzle isn’t
    // defined/ready so it's safe to use this as the default captcha even
    // before it's loaded.
    jds.roadblock = solvemedia.fire;

    /**
     * GTM Hook
     *
     * allows you to pass in a GTM-XXXX id via jds("gtm", "GTM-XXXX");
     */
    jds.gtm = gtm;


    return jds;
});