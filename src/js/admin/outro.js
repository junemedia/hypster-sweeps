
    /**
     * admin() deferred loader
     */
    var
        intervalTimer, // placeholder for setInterval id
        intervalCounter = 0;
    (function recursiveJqueryChecker() {

        // check for jQuery
        if (!W[$]) {
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
        $ = W[$];

        // process any admin() calls before we were loaded
        if (W[METHOD_NAME] && W[METHOD_NAME].q) {
            W[METHOD_NAME].q.forEach(function(a) {
                admin.apply(W, a);
            });
        }

        // overwrite the window.admin object with this one
        W[METHOD_NAME] = admin;

        $(ready.fire); // kick things off
    })();

})(window, 'jQuery', 'admin');