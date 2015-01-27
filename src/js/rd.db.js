// Requires rd.cookie.js (RD version w/ expires MS support) as fallback
// rd.extend
;(function ( window, document, rd ) {

    !rd && (window['rd'] = rd = {});

    var
    config = {
            prefix: '', // prefix for storing anything in DB
            gc: 2, // after this many `set`s, we run garbage collection (only for localStorage)
            gc_key: '_gc' // local storage key gc metadata
        },
    storage_capable = _storage_capable();

    function _storage_capable () {
        if (!window['localStorage'] || !window['sessionStorage']) {
            return false;
        }
        // If private browsing is enabled, then localStorage/sessionStorage
        // methods will fail with a quota error even if writing one byte.
        var test_key = 'RD.DB.TEST.'+Math.random().toString().substr(2);
        try {
            sessionStorage[test_key] = '1';
            sessionStorage.removeItem(test_key);
        } catch (e) {
            return false;
        }
        return true;
    }

    function db () {
        if (arguments.length == 1) {
            if (typeof arguments[0] == 'string') {
                // get call
                return get(arguments[0]);
            } else {
                // we're setting the config
                return init(arguments[0]);
            }
        } else if (arguments.length > 1) {
            // set call
            return set.apply(this, Array.prototype.slice.call(arguments));
        } else {
            return false
        }
    }

    function init ( opts ) {
        config = rd.extend( {}, config, opts );
    }

    function get(key) {
        var o;
        // add the prefix
        key = config.prefix + key;

        if (storage_capable) {
            try {
                o = JSON.parse(localStorage[key] || sessionStorage[key]);
            } catch (e) {}
            if (!o || !('d' in o)) {
                return null;
            }
            if (o['t'] > 0 && o['t'] < (new Date()).getTime()) {
                // expired, remove it
                localStorage.removeItem(key);
                sessionStorage.removeItem(key);
                return null;
            }
            return o['d'];
        } else {
            // return rd.cookie(key);
            try {
                o = JSON.parse(rd.cookie(key));
            } catch (e) {}
            return o || null;
        }
    }

    function set (key, val, ttl) {
        var now = new Date().getTime();

        // add the prefix if set and non empty
        key = config.prefix + key;


        ttl = parseInt(ttl);
        ttl = ttl > 0 ? ( ttl < now ? ttl+now : ttl ) : 0;

        if (storage_capable) {
            if (val === null || val === undefined) {
                // this is a delete
                localStorage.removeItem(key);
                sessionStorage.removeItem(key);
                return true;
            }
            // localStorage or sessionStorage
            var o = {
                d: val,
                t: ttl
            };
            var storage = ttl ? localStorage : sessionStorage;
            localStorage.removeItem(key); // remove the item from localStorage just in case this is a session storage (avoid duplicates and possibly setting a variable as a session after setting it as a localStorage)
            storage[key] = JSON.stringify(o);
            // should we run garbage collection?
            setTimeout(gc,10);
            return true;
        } else {
            // cookie approach
            return rd.cookie(key, JSON.stringify(val), { expires: ttl }) ? true : false;
        }
    }

    function gc () {
        if (!config.gc || !config.gc_key || !storage_capable) {
            return false;
        }
        // increment this gc counter
        var _gc = localStorage[config.gc_key] = parseInt(localStorage[config.gc_key]) + 1;
        // run garbage collection every config.gc times that we're called
        if (_gc < config.gc) {
            return false;
        }
        // reset the gc incrementer
        localStorage[config.gc_key] = 0;
        // if we got here, we're running garbage collection
        var now = new Date().getTime();
        for (var i in localStorage) {
            var o = null;
            // make sure this is our object
            if (!config.prefix || i.indexOf(config.prefix) === 0) {
                try {
                    o = JSON.parse(localStorage[i]);
                } catch (e) {}
                // if it really is our object JSON.parse would work and we'd
                // have a "t" property for the timestamp of when it is set
                // to expire.
                if (o && o.t && o.t < now) {
                    localStorage.removeItem(i); // kill it
                }
            }
        }
    }

    // $ || ($ = function() {});
    // $.db = db;
    // $.fn || ($.fn = $.prototype);
    // $.fn.db = db;

    // window['rd']['db'] = db;
    rd.db = db;

})( window, document, window['rd'] );
