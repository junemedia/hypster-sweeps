define(['./jds'], function(jds) {
    /**
     * XHR submit handler
     *
     * Used by $.ajax() calls to handle responses
     *
     * @param event submitEvent
     *
     * @return false
     *
     */
  function xhr(submitEvent) {
    submitEvent.preventDefault();
    console.info('xhr');
    var callback = submitEvent.data && submitEvent.data.success || function() {},
        callbackFail = submitEvent.data && submitEvent.data.fail || function() {},
        prereq = submitEvent.data && submitEvent.data.prereq || function() {
            return true;
        },
        $form = xhr.$form = $(this).addClass('loading'),
        $submit = xhr.$submit = $form.find('input[type="submit"]').attr('disabled', 'disabled'),
        $loader = $form.find('.loader').addClass('on'),
        $alert = xhr.$alert = $form.find('.alert').empty().hide();

    console.info('action: ' + $form.attr('action'));
    // return false if a pre requirement is not met
    if (!prereq(submitEvent)) {
        console.info('xhr: prereq not met, returning false');
        restore();
        return false;
    }

    function restore() {
        $loader.removeClass('on');
        $form.removeClass('loading');
        $submit.attr('disabled', null);
    }

    function done(data, textStatus, jqXHR) {
      console.info('xhr.done');
      console.debug(data);
      restore();

      if (!data || !'status' in data || data['status'] !== XHR_OK) {
        switch (data['status']) {
          case XHR_AUTH:
            // If we get an error of XHR_AUTH, then make sure we are logged out
            logout();
            break;
          case XHR_HUMAN:
            // Captcha has expired in our session, pop it up, and pass the callback
            jds.roadblock(function() {
              $form.trigger(ON_SUBMIT)
            });
            break;
        }

        $alert.html(data['message'] || GENERIC_AJAX_ERROR).show();
        return callbackFail(data);
      }
      console.info('xhr: call success callback');
      return callback(data);
    }

    function fail(jqXHR, textStatus, errorThrown) {
      console.info('xhr.fail');
      console.debug(jqXHR);
      restore();

      $alert.html(GENERIC_AJAX_ERROR).show();
      return callbackFail();
    }

    $.ajax({
        type: 'POST',
        url: $form.attr('action'),
        data: $form.serialize(),
        dataType: 'json'
      })
      .done(done)
      .fail(fail);
    return false;
  }
  return xhr;
});
