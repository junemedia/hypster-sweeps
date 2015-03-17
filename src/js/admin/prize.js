define(function() {

    var
        DEFAULT_PRIZE_IMAGE_URL = '/img/unavailable.png',
        DEFAULT_PRIZE_FORM_ERROR_MSG = 'Server error encountered. Please try again.',
        $form,
        $submit_btn,
        $reset_btn,
        $msg,
        $loader,
        $upload_form,
        $input_file,
        $fieldset_img;


    function changes() {
        $submit_btn.attr('disabled', false).val('Save');
        $reset_btn.attr('disabled', false);
        $msg.html('');
    }

    function reset(save_btn_text, loader) {
        $submit_btn.attr('disabled', true).val(save_btn_text || 'Saved');
        $reset_btn.attr('disabled', true)
        $msg.removeClass('error').html('');
        $loader[loader == 'on' ? 'addClass' : 'removeClass']('on');
    }

    function sendFile(file, index) {
        var
            fd = new FormData(),
            $input_hidden = $('input[name="img' + index + '"]'),
            $fieldset = $input_hidden.closest('fieldset'),
            $img = $fieldset.find('img');

        fd.append('img', file);

        if (!index) {
            // find the first index image without a src
            for (var i = 1; i <= 3; i++) {
                if (!$('input[name="img' + i + '"]').val()) {
                    index = i;
                    break;
                }
            }
        }

        $.ajax({
            url: '/admin/upload',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST'
        }).done(function done(r, textStatus, jqXHR) {
            // add the uploaded image to the dom and form
            $fieldset.removeClass('empty');
            $img.attr('src', r.url);
            $input_hidden.val(r.md5);
            $upload_form[0].reset();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            $warn = $fieldset.find('ol');
            $fieldset.removeClass('empty').addClass('warn');
            $warn.html('<li>' + errorThrown + '</li>');
            console.warn('FAIL', jqXHR, textStatus, errorThrown);
        });
    }

    /**
     * removeImage
     */
    function removeImage(index) {
        Prize.data['img' + index] = null;
    }

    /**
     * Save this to backend
     */
    function evaluateImage(fieldsetimg) {
        var $fieldsetimg = $(fieldsetimg),
            $img = $fieldsetimg.find('img'),
            $warn = $fieldsetimg.find('ol');
        if (!$img.length || $img.attr('src').match(/unavailable/)) {
            $fieldsetimg.removeClass('warn');
            $warn.html('');
            return;
        }
        var errors = []
        width = $img[0].naturalWidth,
        height = $img[0].naturalHeight;
        if (width != height) {
            errors.push('Please use a square image with an 1:1 aspect ratio.');
        }
        if (width < 400 || height < 400) {
            errors.push('Image should be at least 400 x 400 pixels.');
        }
        if (errors.length) {
            $fieldsetimg.addClass('warn');
            $warn.html('<li>' + errors.join('</li><li>') + '</li>');
        } else {
            $fieldsetimg.removeClass('warn');
            $warn.html('');
        }
    }


    ready(function() {
        $form = $('form.prize');
        $submit_btn = $form.find('input[type="submit"]');
        $reset_btn = $form.find('input[type="reset"]');
        $msg = $form.find('.msg');
        $loader = $form.find('.loader');
        $upload_form = $('form.upload');
        $input_file = $upload_form.find('input[type="file"]');
        $fieldset_img = $form.find('fieldset.img');

        $fieldset_img.each(function(i, e) {
            $(e).find('img').on('load', function() {
                evaluateImage($(this).closest('fieldset'))
            });
            evaluateImage(e);
        });

        prize.id = parseInt($form.find('input[name="id"]').val());
        if (isNaN(prize.id)) {
            prize.id = 0;
        }

        // any change to input/select should enable the submit button
        $form.find('input, select, textarea').on('change, keydown', changes);

        $form.on('reset', function() {
            // NEED TO ADJUST IMG TAGS TO MATCH INPUT HIDDEN TAGS, BUT WE DON'T HAVE A URL
            // NEED TO ADJUST IMG TAGS TO MATCH INPUT HIDDEN TAGS, BUT WE DON'T HAVE A URL
            // NEED TO ADJUST IMG TAGS TO MATCH INPUT HIDDEN TAGS, BUT WE DON'T HAVE A URL
            // NEED TO ADJUST IMG TAGS TO MATCH INPUT HIDDEN TAGS, BUT WE DON'T HAVE A URL
            // NEED TO ADJUST IMG TAGS TO MATCH INPUT HIDDEN TAGS, BUT WE DON'T HAVE A URL
            // NEED TO ADJUST IMG TAGS TO MATCH INPUT HIDDEN TAGS, BUT WE DON'T HAVE A URL
            // NEED TO ADJUST IMG TAGS TO MATCH INPUT HIDDEN TAGS, BUT WE DON'T HAVE A URL
            // NEED TO ADJUST IMG TAGS TO MATCH INPUT HIDDEN TAGS, BUT WE DON'T HAVE A URL
            // NEED TO ADJUST IMG TAGS TO MATCH INPUT HIDDEN TAGS, BUT WE DON'T HAVE A URL
            reset('No Changes');
            return true;
        });

        // bind to form submt
        $form.on('submit', function(evt) {
            reset('Saving…', 'on');
            $.ajax({
                url: '/admin/prize',
                data: $(this).serialize(),
                type: 'POST'
            }).done(done).fail(function() {
                console.log(arguments);
                fail();
            });

            function done(r, textStatus, jqXHR) {
                reset();
                if (r.status !== 1) {
                    return fail(r.message);
                }
                if (r.prize_id) {
                    prize.id = parseInt(r.prize_id, 10);
                    $form.find('input[name="id"]').val(prize.id);
                    // FOR NOW WE SHOULD REDIRECT TO THE PRIZE ID
                    window.location.href = window.location.href.replace(/0$/, prize.id);
                }
                return false;
            }

            function fail(msg) {
                reset();
                changes();
                $msg.addClass('error').html(msg || DEFAULT_PRIZE_FORM_ERROR_MSG);
                return false;
            }

            return false;
        });

        // onchange <input type="file">
        $input_file.on('change', function(evt) {
            changes();
            sendFile(this.files[0], $input_file.data('index'));
        });
        // trigger upload binding (delegation)
        $form.on('click', 'fieldset.img img', function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            var
                $fieldset = $(this).closest('fieldset'),
                index = $fieldset.find('input[type="hidden"]').attr('name').substring(3);
            $input_file.data('index', index);
            $input_file.trigger('click');
        });
        // delete binding (delegation)
        $form.on('click', 'fieldset.img b', function(evt) {
            changes();
            evt.stopPropagation();
            evt.preventDefault();
            var
                $fieldset = $(this).closest('fieldset'),
                $img = $fieldset.find('img'),
                $input_hidden = $fieldset.find('input[type="hidden"]');
            $fieldset.addClass('empty');
            $img.attr('src', DEFAULT_PRIZE_IMAGE_URL);
            $input_hidden.val('');
            evaluateImage($fieldset);
        });
        // drag and drop
        $(document)
            .bind('dragover', function(e) {
                e.preventDefault();
                var foundDropzone,
                    timeout = window.dropZoneTimeout;
                if (!timeout) {
                    $fieldset_img.addClass('in');
                } else {
                    clearTimeout(timeout);
                }
                var found = false,
                    node = e.target;

                do {

                    if ($(node).hasClass('img')) {
                        found = true;
                        foundDropzone = $(node);
                        break;
                    }

                    node = node.parentNode;

                } while (node !== null);

                $fieldset_img.removeClass('in hover');

                if (found) {
                    foundDropzone.addClass('hover');
                }

                window.dropZoneTimeout = setTimeout(function() {
                    window.dropZoneTimeout = null;
                    $fieldset_img.removeClass('in hover');
                }, 100);
            })
            .bind('drop', function(evt) {
                changes();
                evt.stopPropagation();
                evt.preventDefault();

                // which element are we over?
                var element_name = $(evt.target).closest('fieldset.img').find('input[type="hidden"]').attr('name'),
                    index = element_name && element_name.substring(3);
                sendFile((evt.originalEvent.target.files || evt.originalEvent.dataTransfer.files)[0], index);
                return false;
            });

    });

    return {
        id: null
    }

});