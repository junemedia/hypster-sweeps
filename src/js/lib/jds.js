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

    jds.gtm = gtm;
    jds.solvemedia = solvemedia;

    return jds;
});