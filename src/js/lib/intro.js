(function(W, $, METHOD_NAME) {
    var
        ROADUNBLOCKED = undefined, // holds whether or not the captcha (Solve Media or Selectable Media) has been passed
        ONE_YEAR = 1000 * 60 * 60 * 24 * 365,
        GENERIC_AJAX_ERROR = 'An unexpected error has occurred. Please try again.',

        // Use these global variable names instead of 'click', 'reset', 'submit' in jQuery.on/.trigger methods
        ON_FOCUS = 'focus',
        ON_BLUR = 'blur',
        ON_KEYUP = 'keyup',
        ON_SCROLL = 'scroll',
        ON_RESIZE = 'resize',
        ON_SUBMIT = 'submit',
        ON_RESET = 'reset',
        ON_CLICK = 'click',
        ON_SELECTSTART_TOUCHSTART = 'selectstart touchstart',
        ON_CLICK_SELECTSTART_TOUCHSTART = ON_CLICK + ' ' + ON_SELECTSTART_TOUCHSTART,

        // XHR "status" response codes (see app/config/constants.php)
        XHR_OK = 1,
        XHR_ERROR = 2,
        XHR_AUTH = 3,
        XHR_INVALID = 4,
        XHR_DUPLICATE = 5,
        XHR_EXPIRED = 6,
        XHR_NOT_FOUND = 7,
        XHR_INCOMPLETE = 8,
        XHR_HUMAN = 9,

        // boolean indicating whether or not the ads are being throttled (not refreshed)
        ADS_BEING_THROTTLED = true;
