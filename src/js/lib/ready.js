define(function() {
    /**
     * register event hooks to be invoked once jQuery is loaded and
     * DOMContentLoaded last fired.
     */
    var callbacks = [];

    function ready(callback, ctx) {
        // bind
        callbacks.push([
            callback,
            ctx || this
        ]);
    }

    ready.fire = function() {
        // fire
        return callbacks.forEach(function(fn) {
            return fn[0].call(fn[1]);
        });
    }

    return ready;
});