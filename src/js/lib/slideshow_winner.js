define(['./ready', './throttle'], function(ready, throttle) {
    /**
     * Recent Winners Slideshow (homepage)
     *
     */
    var
        FLUSH_LEFT_CLASS = 'flush_left',
        FLUSH_RIGHT_CLASS = 'flush_right',

        VISIBLE_ITEM_CNT = 4, // 2x2 recent winners module

        $winners,
        $prev_arrow,
        $next_arrow,

        slides = [ // array of buckets of items
            [] // the first slide holder
        ],
        slide_count = 1,
        current_slide = 1;

    ready(function() {

        $winners = $('.winners.slideshow');

        var $children = $winners.children(),
            children_count = $children.length;

        // calculate the slide_count
        slide_count = Math.ceil(children_count / VISIBLE_ITEM_CNT);

        if (!children_count || slide_count <= 1) {
            return;
        }

        // bucket groups of 4 items into slides[] array
        for (var n = 0; n < slide_count; n++) {
            //     0                    0  3
            //     1                    4  7
            //     2                    8  11
            slides[n] = $($children.slice(n * VISIBLE_ITEM_CNT, n * VISIBLE_ITEM_CNT + VISIBLE_ITEM_CNT));

            if (n != 0) {
                slides[n].hide();
            }
        }

        // create UI elements
        $prev_arrow = $('<b class="prev"></b>');
        $next_arrow = $('<b class="next"></b>');

        // add UI to DOM
        $winners
            .append($prev_arrow)
            .append($next_arrow)
            .addClass(FLUSH_RIGHT_CLASS); // we always start at the end

        // bind events to UI elements
        $prev_arrow.on(ON_SELECTSTART_TOUCHSTART, goPrev);
        $next_arrow.on(ON_SELECTSTART_TOUCHSTART, goNext);

    });

    function load($slides) {
        $slides.each(function (i, s) {
            var $img = $(s).find('img');
            if (!$img.attr('src')) {
                $img.attr('src', $img.data('src'));
            }
        });
    }

    function goNext(evt) {
        var target_slide = current_slide - 1;
        if (target_slide < 1) {
            return false;
        }
        if (target_slide == 1) {
            $winners.addClass(FLUSH_RIGHT_CLASS);
        } else {
            $winners.removeClass(FLUSH_LEFT_CLASS);
        }
        slides[current_slide - 1].hide();
        load(slides[target_slide - 1].show());
        events.slideshowWinner();
        current_slide = target_slide;
    }

    function goPrev(evt) {
        var target_slide = current_slide + 1;
        if (target_slide > slide_count) {
            return false;
        }
        if (target_slide == slide_count) {
            $winners.addClass(FLUSH_LEFT_CLASS);
        } else {
            $winners.removeClass(FLUSH_RIGHT_CLASS);
        }
        slides[current_slide - 1].hide();
        load(slides[target_slide - 1].show());
        events.slideshowWinner();
        current_slide = target_slide;
    }

});