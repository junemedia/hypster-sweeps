define('hook', function() {
    /**
     * BR.hook: Arbitrary event hook mechanism
     *
     *
     * Example 1: single event registration, binding, and triggering
     *
     *      var mySignupEvent = BR.hook('signup');  // register
     *
     *      mySignupEvent(function(evt) {           // bind
     *          console.log(evt);                   // 'signup'
     *      });
     *
     *      mySignupEvent();                        // trigger
     *
     *
     * @param   mixed   `evt_name` can either be a string or an obect of
     *                  hooks in the form:
     *                  {key1: evt_name1, key2: evt_name2}
     *
     * @return  mixed   Hook object or object of Hook objects
     */
    return function (evt_name) {

        var callbacks = [];

        return function (callback, ctx) {
            if (arguments.length === 0) {
                // trigger
                return callbacks.forEach(function(fn) {
                    return fn[0].call(fn[1], evt_name);
                });
            }
            // bind
            callbacks.push([
                callback,
                ctx || this
            ]);
        }
    }
});