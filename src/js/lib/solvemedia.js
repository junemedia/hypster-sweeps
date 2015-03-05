define(function() {
    /**
     * Solve Media
     */

    var
    // src = '//api' + (location.protocol == 'https:' ? '-secure' : '') + '.solvemedia.com/papi/challenge.ajax', // invocation JS
        src = '//api.solvemedia.com/papi/_puzzle.js', // invocation JS
        acp, // placeholder for window.ACPuzzle after /papi/_puzzle.js loads
        $solvemedia; // placeholder for $('solvemedia')

    function fire(callback) {
        SolveMedia.callback = callback;
        // acp = W['ACPuzzle'];
        // acp.create(key);

        if (!acp) {
            // this is unfortunate, the roadblock has been called,
            // but SolveMedia's invocation JS has not loaded yet.
            ROADUNBLOCKED = true;
            console.error('SolveMedia.fire executed, but ACPuzzle not ready :(');
            return false;
        }
        $(document).on(ON_KEYUP, escape);
        $solvemedia.show();
        // iOS won't let you focus on a field that was hidden when the event fired
        // LOSING BATTLE ON IOS:
        focus();
        return false;
    }

    function escape(e) {
        if (e.which == 27) {
            collapse();
            return false;
        }
        return true;
    }

    function focus() {
        acp.focus_response_field();
        // var $txtbox = $solvemedia.find('input[type="text"]');
        // // assist mobile safari
        // $txtbox.on(ON_FOCUS, function(evt) {
        //     scrollTop(0);
        // });
        // $txtbox.trigger(ON_FOCUS);
    }

    function collapse() {
        $(document).off('keyup', escape);
        $("#solvemedia").hide();
    }

    function tap(evt) {
        var $target = $(evt.target);
        switch ($target.attr('id') || $target[0].nodeName) {
            case 'adcopy-link-refresh':
                acp.reload();
                focus();
                break;
            case 'adcopy-link-audio':
                acp.change2audio();
                focus();
                break;
            case 'adcopy-link-image':
                acp.change2image();
                focus();
                break;
            case 'adcopy-link-info':
            case 'I': // solve media logo
                acp.moreinfo();
                break;
            case 'solvemedia':
            case 'B': // close button
                collapse();
                break;
            default:
                return true;
        }
        return false;

    }


    function SolveMedia(key) {
        // load Solve Media tag
        if (!key) {
            console.warn('Could not initialize SolveMedia roadblock. No key provided.');
            return false;
        }

        $solvemedia = $('#solvemedia');

        if (!$solvemedia.length) {
            return false;
        }


        // needed by /papi/_puzzle.js
        W['ACPuzzleInfo'] = {
            protocol: !W.location.protocol.match(/^https?:$/) ? 'http:' : '',
            apiserver: '//api.solvemedia.com',
            mediaserver: '//api.solvemedia.com',
            magic: 'u7WpnzA6KVaLL0XYMDopVg',
            chalapi: 'ajax',
            chalstamp: 1424984044,
            lang: 'en',
            size: 'standard',
            theme: 'custom',
            type: 'img',
            onload: null
        }
        // W['ACPuzzleOptions'] = {
        //     theme: 'custom'
        // };

        ready(function() {
            // load the Solve Media JavaScript
            $.ajax({
                url: src,
                dataType: 'script',
                cache: true // prevent appending ?<timstamp> bullsh
            }).fail(function() {
                console.error('Failed to load SolveMedia JS: ' + src);
            })
                .done(function() {
                    acp = W['ACPuzzle'];
                    acp.create(key);
                });

            // don't use touchstart or selectstart here, iOS will flip out:
            $solvemedia.on(ON_CLICK, tap);

            $solvemedia.find('form').on(ON_SUBMIT, {
                success: function(response) {
                    ROADUNBLOCKED = true;
                    collapse();
                    if ($.type(SolveMedia.callback) == 'function') {
                        SolveMedia.callback();
                    }
                },
                fail: function(response) {
                    acp.reload();
                    return false;
                }
            }, xhr);
        });
    }

    // expose this "fire" method
    SolveMedia.fire = fire;

    return SolveMedia;
});