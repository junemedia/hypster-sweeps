define(['./str2date', './date2str', './infinite_scroll'], function(str2date, date2str, infiniteScroll) {

    var
        CONTESTS_URL = '/admin/contests',

        $contests,

        $query,
        $query_label,
        $query_close,
        $query_search,
        $reverse,
        limit,
        offset,

        finished,
        lock;



    function weekday(date) {
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
    }

    function prettyDate(date) {
        return [(date.getMonth() + 1), date.getDate(), String(date.getFullYear()).substr(2)].join('/');
    }


    function Contest(data) {
        var
            d = str2date(data['date']),
            day_of_week = weekday(d),
            pretty_date = prettyDate(d),
            winner_html = (data['user_id']) ? data['user_firstname'] + ' ' + data['user_lastname'] + ' &lt;<a href="mailto:' + data['user_email'] + '">' + data['user_email'] + '</a>&gt;' : '—';

        return $('<tr>')
            .append($('<td>').html(pretty_date))
            .append($('<td>').html(day_of_week))
            .append($('<td>').html('<a href="/admin/prize/' + data['prize_id'] + '#' + data['date'] + '">' + data['prize_title'] + '</a>'))
            .append($('<td>').html('$' + data['prize_award'] + ' Gift Card' + (data['prize_type'] == 'prize' ? ' or Prize' : '')))
            .append($('<td>').html(winner_html));
    }


    function more(reset) {
        if (lock) {
            return;
        }
        lock = true;

        if (!reset && finished) {
            // remove lock
            lock = false;
            return;
        }

        if (reset) {
            finished = false;
            offset = 0;
        }

        $.ajax({
            url: CONTESTS_URL,
            data: {
                'limit': limit,
                'offset': offset,
                'reverse': $reverse.hasClass('reverse') ? 1 : 0,
                'query': $query.val()
            },
            type: 'get',
            dataType: 'json',
        })
            .done(done); //.fail(fail);

        function done(data, textStatus, jqXHR) {
            if (reset) {
                $contests.empty();
            }
            var new_count = 0;
            if (!data.contests) {
                finished = true;
                lock = false;
                return;
            }
            $.each(data.contests, function(i, c) {
                new_count++;
                $contests.append(Contest(c));
            });
            offset += new_count;
            lock = false;
        }
    }

    function reset() {
        $query.val('');
        $query_label.removeClass('active');
        more(true);
    }


    ready(function() {
        $contests = $('table#contests tbody');

        if (!$contests.length) {
            return;
        }

        $reverse = $contests.parent().find('a#reverse');
        $query = $contests.parent().find('input[name="query"]');
        $query_label = $query.parent();
        $query_close = $query_label.find('b');
        $query_search = $query_label.find('i');

        // see what's in the dom and define some of our variables
        var chilluns = $contests.children();

        // set both the limit and offset to how many rows we have in HTML
        // this will serve as our defaults
        offset = limit = chilluns.length;


        // setup infinite scroll
        infiniteScroll({
            distance: 1000, // px
            callback: function(finished) {
                // THIS COULD BE A LITTLE BIT BETTER
                more();
                finished();
            }
        });

        // bind to date sort
        $reverse.on('click', function() {
            $reverse.toggleClass('reverse');
            more(true);
        });

        // bind to prize title search/filter
        $query.on('keyup', function(evt) {

            $query_label[($query.val().length ? 'add' : 'remove') + 'Class']('active');

            if (evt.keyCode == 27) {
                reset();
                return;
            }
            if (evt.keyCode == 13) {
                more(true);
            }
        });
        $query_close.on(ON_CLICK, reset);
        $query_search.on(ON_CLICK, function() { more(true); });

    });

});