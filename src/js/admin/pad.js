define(function() {
    return function (str, len, chr) {
        if (!chr && chr !== 0 || chr.toString().length != 1) {
            chr = ' ';
        }
        str = str.toString();
        var l = str.length + 1,
            buf = '';
        while (l++ <= len) {
            buf += chr;
        }
        return buf + str;
    }
});