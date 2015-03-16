define(function() {

    var
        DASHBOARD_URL = '/admin/dashboard',

        $nav;



    ready(function() {
        $nav = $('#dashboard nav');

        if (!$nav.length) {
            return;
        }

        $nav.on('click', 'b', function(evt) {
            var offset = $(this).data('offset');
            W.location.href = DASHBOARD_URL + ((offset != 0) ? '/' + $(this).data('offset') : '');
        });
    });

});