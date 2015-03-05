define(function() {
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
     * @param   boolean     immediate   Should we trigger on the leading edge
     * @param   function    debounceFN  Triggered when/if the fn is debounced
     *
     * @return  function    Debounce'd function `fn`
     */
    return function (fn, threshold, immediate, debounceFn) {
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
            if (callNow) {
                fn.apply(context, args);
            } else {
                debounceFn && debounceFn.call(timeout, threshold);
            }
        };
    }

});
