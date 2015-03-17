define(function() {

    ready(function() {
        $forms = $('table#thanks form');

        if (!$forms.length) {
            return;
        }


        $forms.each(function(i, form) {
            var $form = $(form),
                $submit = $form.find('input[type="submit"]');
            $form.on('submit', function() {
                $submit.attr('disabled', true);
                $.ajax({
                    url: $form.attr('action'),
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        'b64thanks': btoa($form.find('textarea').val())
                    }
                })
                    .done(function(data, textStatus, jqXHR) {
                        // nothing here
                        $submit.attr('disabled', null);
                    })
                    .fail(function() {
                        // uh oh
                        $submit.attr('disabled', null);
                    });
                return false;
            });
        });


    });

});