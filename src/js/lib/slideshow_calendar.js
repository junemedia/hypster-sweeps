define(['./ready', './throttle'], function(ready, throttle) {
    /**
     * Prize Calendar Slideshow/Carousel (homepage)
     *
     * This was a quick stab at it.  It could use a lot of TLC.
     *
     */
    var
        FLUSH_LEFT_CLASS = 'flush_left',
        FLUSH_RIGHT_CLASS = 'flush_right',
        $calendar,
        $scroller,
        $prev_arrow,
        $next_arrow,
        $today,

        $children,
        $last_child,

        width_scroller,
        width_calendar,
        scroll_left_max,
        last_child_width,
        range_in_view;

    ready(function() {
        $calendar = $('.calendar.slideshow');

        if (!$calendar.length) {
            return;
        }

        $scroller = $calendar.find('.wrap');
        $prev_arrow = $calendar.find('.prev');
        $next_arrow = $calendar.find('.next');
        $today = $calendar.find('.today');
        $children = $scroller.children();
        $last_child = $($children[$children.length - 1]);


        updateWidthCalendarAndScrollerLeftMax();


        // set initial scrollLeft to be centered on TODAY
        // var x = width_scroller/2 - width_calendar/2;
        var t = $today.position(),
            x = !t ? 0 : t.left + last_child_width / 2 - width_calendar / 2;

        $scroller.scrollLeft(x);

        // call this once, just in case
        scrollback();

        $prev_arrow.on(ON_SELECTSTART_TOUCHSTART, throttle(goPrev, 450));
        $next_arrow.on(ON_SELECTSTART_TOUCHSTART, throttle(goNext, 450));

        $scroller.on(ON_SCROLL, throttle(scrollback, 32));
        $(W).on(ON_RESIZE, updateWidthCalendarAndScrollerLeftMax);

    });

    // calculate the scroller width, why can't we just get the width of the scroller (.wrap)?
    // this seems like a lot of bullshit
    function updateWidthCalendarAndScrollerLeftMax() {
        var
            last_child_pos = $last_child.position(),
            last_child_left = last_child_pos && last_child_pos.left + $scroller.scrollLeft();

        last_child_width = $last_child.width();
        // also used to center shiests on load
        width_scroller = last_child_left + last_child_width;

        width_calendar = $calendar.width()
        scroll_left_max = width_scroller - width_calendar;

        range_in_view = width_calendar / last_child_width;
    }

    function goPrev(evt) {
        var x = $scroller.scrollLeft() - width_calendar * .63;
        if (x <= 0) {
            x = 0;
            $calendar.addClass(FLUSH_LEFT_CLASS);
            $calendar.removeClass(FLUSH_RIGHT_CLASS);
        } else {
            $calendar.removeClass(FLUSH_LEFT_CLASS);
        }
        $scroller.animate({
            scrollLeft: x
        }, 400);
        events.slideshowCalendar();
    }

    function goNext(evt) {
        var x = $scroller.scrollLeft() + width_calendar * .63;
        if (x >= scroll_left_max) {
            x = scroll_left_max + 2; // 2 = px of left and right border
            $calendar.addClass(FLUSH_RIGHT_CLASS);
            $calendar.removeClass(FLUSH_LEFT_CLASS);
        } else {
            $calendar.removeClass(FLUSH_RIGHT_CLASS);
        }
        $scroller.animate({
            scrollLeft: x
        }, 400);
        events.slideshowCalendar();
    }

    function scrollback(evt) {
        var pos = $scroller.scrollLeft();
        if (pos >= scroll_left_max) {
            $calendar
                .addClass(FLUSH_RIGHT_CLASS);
        } else if (pos <= 0) {
            $calendar
                .addClass(FLUSH_LEFT_CLASS);
        } else {
            $calendar
                .removeClass(FLUSH_LEFT_CLASS)
                .removeClass(FLUSH_RIGHT_CLASS);
        }

        // we need to lazily load all prize images
        // that are in view of the calendar
        // range to load (or check)
        var min = Math.floor(pos / last_child_width),
            max = min + range_in_view + 1;
        for (var n = min; n <= max; n++) {
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

});