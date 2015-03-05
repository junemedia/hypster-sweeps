define(['./pad'], function(pad) {

    return function (timestamp) {
        var d = new Date(timestamp);
        if (!d) {
            return '';
        }
        return [d.getFullYear().toString(), pad(d.getMonth() + 1, 2, 0), pad(d.getDate(), 2, 0)].join('-');
    }

});