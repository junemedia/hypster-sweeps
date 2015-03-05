define(function() {
    /**
     * throttle: Utility function that throttles the invokation (*) of your
     * function parameter (fn) to once every (threshold) milliseconds.
     *
     *       /-- 10s --\ /-- 10s --\ /-- 10s --\
     *      * . . . . . * . . . . . * . . . . . *
     *
     * @param   function    fn          Function to be throttled
     * @param   integer     threshold   Milliseconds fn will be throttled
     * @param   object      scope       Context fn should be .apply(ed) with
     * @param   function    throttleFn  Callback to trigger if/when we throttle
     *
     * @return  function    Throttled fn
     */
    return function (fn, threshold, scope, throttleFn) {
        if (!threshold) {
            threshold = 250;
        }
        var last,
            deferTimer;
        return function() {
            var context = scope || this,
                now = +new Date(),
                args = arguments;
            if (last && now < last + threshold) {
                // trigger callback to throttleFN
                throttleFn && throttleFn.call(context, deferTimer, threshold);
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function() {
                    last = now;
                    fn.apply(context, args);
                }, threshold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }
});