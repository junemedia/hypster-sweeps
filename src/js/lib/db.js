// Requires cookie.js (RD version w/ expires MS support) as fallback
define(['./cookie'], function(cookie) {

    var
        prefix = '', // prefix for storing anything in DB
        gc = 2, // after this many `set`s, we run garbage collection (only for localStorage)
        gc_key = '_gc', // local storage key gc metadata
        lclStorage = W['localStorage'],
        sesStorage = W['sessionStorage'],
        removeItemMethod = 'removeItem',
        storage_capable = function() {
            if (!lclStorage || !sesStorage) {
                return false;
            }
            // If private browsing is enabled, then localStorage/sessionStorage
            // methods will fail with a quota error even if writing one byte.
            var test_key = 'TEST' + Math.random().toString().substr(2);
            try {
                sesStorage[test_key] = '1';
                sesStorage[removeItemMethod](test_key);
            } catch (e) {
                return false;
            }
            return true;
        };


    function get(key) {
        var o;
        // add the prefix
        key = prefix + key;

        if (storage_capable) {
            try {
                o = JSON.parse(lclStorage[key] || sesStorage[key]);
            } catch (e) {}
            if (!o || !('d' in o)) {
                return null;
            }
            if (o['t'] > 0 && o['t'] < (new Date()).getTime()) {
                // expired, remove it
                lclStorage[removeItemMethod](key);
                sesStorage[removeItemMethod](key);
                return null;
            }
            return o['d'];
        } else {
            // return cookie(key);
            try {
                o = JSON.parse(cookie(key));
            } catch (e) {}
            return o || null;
        }
    }

    function set(key, val, ttl) {
        var now = new Date().getTime();

        // add the prefix if set and non empty
        key = prefix + key;


        ttl = parseInt(ttl);
        ttl = ttl > 0 ? (ttl < now ? ttl + now : ttl) : 0;

        if (storage_capable) {
            if (val === null || val === undefined) {
                // this is a delete
                lclStorage[removeItemMethod](key);
                sesStorage[removeItemMethod](key);
                return true;
            }
            // localStorage or sessionStorage
            var o = {
                d: val,
                t: ttl
            };
            var storage = ttl ? lclStorage : sesStorage;
            lclStorage[removeItemMethod](key); // remove the item from localStorage just in case this is a session storage (avoid duplicates and possibly setting a variable as a session after setting it as a localStorage)
            storage[key] = JSON.stringify(o);
            // should we run garbage collection?
            setTimeout(gc, 10);
            return true;
        } else {
            // cookie approach
            return cookie(key, JSON.stringify(val), {
                expires: ttl
            }) ? true : false;
        }
    }

    function gc() {
        if (!gc || !gc_key || !storage_capable) {
            return false;
        }
        // increment this gc counter
        var _gc = lclStorage[gc_key] = parseInt(lclStorage[gc_key]) + 1;
        // run garbage collection every gc times that we're called
        if (_gc < gc) {
            return false;
        }
        // reset the gc incrementer
        lclStorage[gc_key] = 0;
        // if we got here, we're running garbage collection
        var now = new Date().getTime();
        for (var i in lclStorage) {
            var o = null;
            // make sure this is our object
            if (!prefix || i.indexOf(prefix) === 0) {
                try {
                    o = JSON.parse(lclStorage[i]);
                } catch (e) {}
                // if it really is our object JSON.parse would work and we'd
                // have a "t" property for the timestamp of when it is set
                // to expire.
                if (o && o.t && o.t < now) {
                    lclStorage[removeItemMethod](i); // kill it
                }
            }
        }
    }

    return function db(key, val) {
        var args = arguments;
        if (args.length == 1) {
            if (typeof args[0] == 'string') {
                // get call
                return get(args[0]);
            }
            // we only got one param, and it wasn't a string, what should we do?
            return false;
        }
        if (args.length > 1) {
            // set call
            return set.apply(this, Array.prototype.slice.call(args));
        }
        return false;
    }

});