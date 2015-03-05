define(['./ready', './throttle'], function(ready, throttle) {
    /**
     * Homepage/Splashpage Prize Carousel
     *
     * This was a quick stab at it.  It could use a lot of TLC.
     *
     */
    var
        FLUSH_LEFT_CLASS = 'flush_left',
        FLUSH_RIGHT_CLASS = 'flush_right',
        $carousel,
        $scroller,
        $prev_arrow,
        $next_arrow,
        $today,

        $children,
        $last_child,
        // v
        width_scroller,
        width_carousel,
        scroll_left_max, last_child_width,
        // index_width_scroller,
        range_in_view
        // ^
    ;

    ready(function() {
        $carousel = $('.carousel');

        if (!$carousel.length) {
            return;
        }

        $scroller = $carousel.find('.wrap');
        $prev_arrow = $carousel.find('.prev');
        $next_arrow = $carousel.find('.next');
        $today = $carousel.find('.today');
        $children = $scroller.children();
        $last_child = $($children[$children.length - 1]);


        updateWidthCarouselAndScrollerLeftMax();


        // set initial scrollLeft to be centered on TODAY
        // var x = width_scroller/2 - width_carousel/2;
        var t = $today.position(),
            x = !t ? 0 : t.left + last_child_width / 2 - width_carousel / 2;

        $scroller.scrollLeft(x);

        // call this once, just in case
        scrollback();

        $prev_arrow.on(ON_SELECTSTART_TOUCHSTART, throttle(goPrev, 450));
        $next_arrow.on(ON_SELECTSTART_TOUCHSTART, throttle(goNext, 450));

        $scroller.on(ON_SCROLL, throttle(scrollback, 32));
        $(W).on(ON_RESIZE, resize);

    });

    // calculate the scroller width, why can't we just get the width of the scroller (.wrap)?
    // this seems like a lot of bullshit
    function updateWidthCarouselAndScrollerLeftMax() {
        var
            last_child_pos = $last_child.position(),
            last_child_left = last_child_pos && last_child_pos.left + $scroller.scrollLeft();

        last_child_width = $last_child.width();
        // also used to center shiests on load
        width_scroller = last_child_left + last_child_width;
        // v
        width_carousel = $carousel.width()
        scroll_left_max = width_scroller - width_carousel + 0; // 2 = px of left and right border
        // ^
        // index_width_scroller = Math.round(width_scroller / last_child_width);
        range_in_view = Math.round(width_carousel / last_child_width);
        // rd.log(i,j);
    }

    function goPrev(evt) {
        var x = $scroller.scrollLeft() - width_carousel * .63;
        if (x <= 0) {
            x = 0;
            $carousel.addClass(FLUSH_LEFT_CLASS);
            $carousel.removeClass(FLUSH_RIGHT_CLASS);
        } else {
            $carousel.removeClass(FLUSH_LEFT_CLASS);
        }
        $scroller.animate({
            scrollLeft: x
        }, 400);
        events.slideshow();
    }

    function goNext(evt) {
        var x = $scroller.scrollLeft() + width_carousel * .63;
        if (x >= scroll_left_max) {
            x = scroll_left_max + 1;
            $carousel.addClass(FLUSH_RIGHT_CLASS);
            $carousel.removeClass(FLUSH_LEFT_CLASS);
        } else {
            $carousel.removeClass(FLUSH_RIGHT_CLASS);
        }
        $scroller.animate({
            scrollLeft: x
        }, 400);
        events.slideshow();
    }

    function scrollback(evt) {
        // console.debug('Carousel.scrollback() fired');
        var cur = $scroller.scrollLeft();
        if (cur >= scroll_left_max) {
            $carousel
                .addClass(FLUSH_RIGHT_CLASS);
        } else if (cur <= 0) {
            $carousel
                .addClass(FLUSH_LEFT_CLASS);
        } else {
            $carousel
                .removeClass(FLUSH_LEFT_CLASS)
                .removeClass(FLUSH_RIGHT_CLASS);
        }

        // we need to lazily load all prize images
        // that are in view of the carousel
        // range to load (or check)
        var i = Math.round(cur / last_child_width),
            min = i <= 1 ? 0 : (i - 1),
            max = min + range_in_view;
        // console.debug(Math.round(min, max));
        for (var n = min; n <= max; n++) {
            // console.debug(n);
            var $c = $($children[n]);
            if ($c.length && !$c.data('loaded')) {
                var img = $c.find('img');
                img
                    .attr('src', img.data('src'))
                    .data('src', false)
                    .removeClass('loader');
                $c
                    .addClass('loaded')
                    .data('loaded', true);
            }
        }
    }

    function resize(evt) {
        // adjust width variables on window.resize
        updateWidthCarouselAndScrollerLeftMax();
    }

});