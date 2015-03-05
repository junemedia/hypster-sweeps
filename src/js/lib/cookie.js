define(function() {

    return function (key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && String(value) !== "[object Object]") {
            !options && (options = {});

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (!isNaN(parseInt(options.expires)) && options.expires !== 0) {
                var future = options.expires, t = options.expires = new Date();
                if (future > 1000) {
                    // timestamp (milliseconds)
                    t.setTime(future);
                } else {
                    // days
                    t.setDate(t.getDate() + future);
                }
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=',
                options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
    }

});
