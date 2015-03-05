define(['./ready', './events'], function(ready, events) {
    /**
     * Prize Slideshow
     *
     * Dynamically create a slideshow if multiple images or descriptions exist
     *
     */
    var $prize,
        $img,
        $desc,
        IMG = {},
        DESC = {},
        FRAMES = [1], // array of frames
        FRAME_LEN = 1, // array of frames
        CUR_FRAME_INDEX = 1;

    ready(function() {
        $prize = $('.prize');

        if (!$prize.length) {
            return;
        }

        $img = $prize.find('img');
        $desc = $($prize.find('p')[0]);
        IMG[1] = $img.attr('src'); // initialize the first $img
        DESC[1] = $desc.html(); // initialize the first $desc


        var v;
        if (v = $img.data('img2')) {
            IMG[2] = v;
        }
        if (v = $img.data('img3')) {
            IMG[3] = v;
        }
        if (v = $desc.data('desc2')) {
            DESC[2] = v;
        }
        if (v = $desc.data('desc3')) {
            DESC[3] = v;
        }

        for (var i = 2; i <= 3; i++) {
            if (IMG[i] || DESC[i]) {
                FRAMES.push(i);
                if (!IMG[i]) {
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    IMG[i] = IMG[i - 1];
                }
                if (!DESC[i]) {
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    // THIS IS NOT GOOD ENOUGH -- DO BETTER
                    DESC[i] = DESC[i - 1];
                }
            }
        }

        if ((FRAME_LEN = FRAMES.length) == 1) {
            return;
        }

        // create prev/next controls
        $prize
            .addClass('slideshow')
            .append($('<b class="prev">').on(ON_SELECTSTART_TOUCHSTART, debounce(prev, 100, true)))
            .append($('<b class="next">').on(ON_SELECTSTART_TOUCHSTART, debounce(next, 100, true)));
        // create dots
        var $dots = $('<div class="dots">');
        for (var i = 1; i <= FRAME_LEN; i++) {
            $dots.append($('<i>').data('cur', i));
        }

        $prize
            .addClass('cur1')
            .append($dots);
        $dots.on(ON_SELECTSTART_TOUCHSTART, 'i', debounce(function() {
            goto($(this).data('cur'));
        }, 100, true));
    });

    function goto(cur) {
        cur = parseInt(cur);
        $img.attr('src', IMG[FRAMES[cur - 1]]);
        $desc.html(DESC[FRAMES[cur - 1]]);
        $prize
            .removeClass('cur' + CUR_FRAME_INDEX)
            .addClass('cur' + cur);
        CUR_FRAME_INDEX = cur;
        events.slideshow();
    }

    function prev(e) {
        e.preventDefault();
        e.stopPropagation();
        goto((CUR_FRAME_INDEX <= 1) ? FRAME_LEN : CUR_FRAME_INDEX - 1);
    }

    function next(e) {
        e.preventDefault();
        e.stopPropagation();
        goto((CUR_FRAME_INDEX >= FRAME_LEN) ? 1 : CUR_FRAME_INDEX + 1);
    }
});