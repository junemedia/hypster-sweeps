define([
    'lib/debounce',
    'lib/throttle',
    'lib/ready',
    'admin/pad',
    'admin/str2date',
    'admin/date2str',
    'admin/dashboard',
    'admin/prize',
    'admin/contest',
    'admin/contests',
    'admin/datepicker'
    ], function(solvemedia) {

    /**
     * Actual/true admin() function definition
     *
     * This will replace the temporary window.admin that may or may not have
     * been created previously in the HTML content.
     *
     */
    function admin() {
        var args = [],
            method;

        if (!arguments.length) {
            return false;
        }

        Array.prototype.push.apply(args, arguments);

        method = args.shift();

        return (method && method in admin && $.isFunction(admin[method])) ? admin[method].apply(this, args) : false;
    }

    return admin;
});