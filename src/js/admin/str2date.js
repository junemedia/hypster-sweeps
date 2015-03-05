define(function() {
    return function (str, if_null) {
        var m = typeof str == 'string' && str.match(/^(\d+)-(\d+)-(\d+)$/),
            d;
        if (!m || m.length != 4) {
            return if_null;
        }
        var year = parseInt(m[1]),
            month = parseInt(m[2]) - 1,
            day = parseInt(m[3]);
        if (month < 0 || month > 11 || day > 31 || day < 1) {
            return if_null;
        }
        if (year < 30) {
            year += 2e3;
        }
        d = new Date(year, month, day);
        return !isNaN(d.getTime()) ? d : if_null;
    }
});