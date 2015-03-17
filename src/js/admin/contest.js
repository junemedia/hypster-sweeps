define(['./str2date', './date2str', './prize'], function(str2date, date2str, prize) {

    var
        $flight_table,
        $flight_add,
        $flight_footer_row,
        $flight_error,
        CONTEST_DATES,
        HIGHLIGHT_DATE = location.hash.substr(1) || str2date(new Date());

    /**
     * contestError
     */
    function contestError(msg) {
        $flight_error.html(msg || GENERIC_AJAX_ERROR);
        $flight_footer_row.addClass('error');
        $(W).scrollTop($flight_error.offset().top);
    }

    /**
     * contestXhr
     */
    function contestXhr(action, date, callback) {
        if (!prize.id) {
            contestError('Please save this prize before adding flight dates.');
            return false;
        }
        $flight_error.html('');
        $flight_footer_row.removeClass('error');
        $.ajax({
            url: '/admin/contest/' + action,
            data: {
                'prize_id': prize.id,
                'date': date
            },
            dataType: 'json',
            type: 'POST'
        })
            .done(function done(r, textStatus, jqXHR) {
                if (r.status === 1) {
                    if ($.type(callback) == 'function') {
                        callback(r);
                    }
                } else {
                    contestError(r.message);
                }

            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                contestError();
            });
    }

    /**
     * getContestDates
     */
    function getContestDates() {
        var dates = [];
        $flight_table.find('tr').each(function(i, el) {
            var date = $(el).find('td:nth-child(2)').text();
            if (date.match(/\d+-\d+\d+/)) {
                dates.push(date);
            }
        });
        dates.last = function() {
            return this[this.length - 1];
        };
        return dates;
    }

    /**
     * highlightContestDate
     */
    function highlightContestDate(date) {
        // Find the row if the date exists
        var nth_child = CONTEST_DATES.indexOf(date) + 2; // +1 because i is 0-based index and +1 for the header row
        $flight_table.find('tr:nth-child(' + nth_child + ')').addClass('highlight');
    }

    /**
     * addContestDate
     */
    function addContestDate(date) {
        // Send this back to the server
        contestXhr('add', date, function(response) {
            CONTEST_DATES.push(date);
            CONTEST_DATES.sort();
            var nth_child = CONTEST_DATES.indexOf(date) + 1; // +1 because i is 0-based index and +1 for the header row
            $flight_table.find('tr:nth-child(' + nth_child + ')').after(
                $('<tr class="future"><td><b></b></td><td>' + date + '</td><td></td><td></td></tr>').addClass(date == HIGHLIGHT_DATE ? 'highlight' : '')
            );
            $flight_add.val('');
        });
    }

    /**
     * removeContestDate
     *
     *
     */
    function removeContestDate(date) {
        // Send this back to the server
        contestXhr('del', date, function(response) {
            var index = CONTEST_DATES.indexOf(date),
                nth_child = index + 2; // +1 because i is 0-based index and +1 for the header row
            CONTEST_DATES.splice(index, 1);
            $flight_table.find('tr:nth-child(' + nth_child + ')').remove();
        });
    }

    /**
     * pickAlternateWinner
     *
     * Request a new (alternate) winner from the server and replace
     * our row with the new winner/user information.
     *
     * On error, message the admin of the error and leave DOM alone.
     *
     */
    function pickAlternateWinner(date) {
        // remove any value in the flight add input field so that admin does not get confused
        $flight_add.val('');
        // Send this back to the server
        contestXhr('alt', date, function(response) {
            var index = CONTEST_DATES.indexOf(date),
                nth_child = index + 2, // +1 because i is 0-based index and +1 for the header row
                $row = $flight_table.find('tr:nth-child(' + nth_child + ')'),
                $winner_name = $row.find('td:nth-child(3)'),
                $winner_location = $row.find('td:nth-child(4)'),
                r = response.winner;
            $winner_name.html('<a href="mailto:' + r.email + '">' + r.firstname + ' ' + r.lastname + '</a>');
            $winner_location.html(r.city + ', ' + r.state);
        });
    }



    ready(function() {
        $flight_table = $('#flight');
        $flight_add = $('#add_flight');
        $flight_footer_row = $flight_table.find('tr:last-child');
        $flight_error = $('#contest_error');
        CONTEST_DATES = getContestDates();
        HIGHLIGHT_DATE = location.hash.substr(1) || str2date(new Date());


        // find a date to highlight
        highlightContestDate(HIGHLIGHT_DATE);

        // special binding: flight date adder
        $flight_add
            .on('keydown', function(evt) {
                switch (evt.which) {
                    case 38: // arrow up
                    case 40: // arrow down
                        // find the latest in Prize.data.dates, or worst case, today (second param to str2date)
                        var timestamp = (str2date($(this).val()) || str2date(CONTEST_DATES.last(), new Date())).getTime();
                        if (evt.which == 40) {
                            timestamp += 86400000;
                        } else {
                            timestamp -= 86400000;
                        }
                        $(this).val(date2str(timestamp));
                        return true;
                    case 9: // tab
                        break;
                    case 13: // return
                        evt.preventDefault();
                        break;
                    default:
                        return true;
                }

                var new_date = $(this).val();

                // check to make sure this date isn't in the past
                if (str2date(new_date) <= new Date()) {
                    contestError('Cannot add a date in the past');
                    return false;
                }

                // check to make sure this date isn't in our local copy, duh
                if (CONTEST_DATES.indexOf(new_date) >= 0) {
                    contestError('This prize is already scheduled for ' + new_date + '.');
                    return false;
                }

                addContestDate(new_date);
            })
            .datepicker({
                format: 'yyyy-mm-dd',
                startDate: 'today',
                autoclose: true,
                orientation: 'left bottom',
                todayBtn: true,
                todayHighlight: true
                // }).on('changeDate', function (e) {
            }).on('hide', function(e) {
                addContestDate($flight_add.val());
            });;

        // special binding: DELETE a flight or pick an ALTERNATE winner
        $flight_table.on('mousedown', 'b', function() {
            var $button = $(this),
                $tr = $button.closest('tr'),
                date = $tr.find('td:nth-child(2)').text(),
                has_past = !$tr.hasClass('won'),
                held_down_at = +new Date(),
                timeout = setTimeout(function() {
                    $button.removeClass('hold');
                    if (has_past) {
                        removeContestDate(date);
                    } else {
                        pickAlternateWinner(date);
                    }
                }, 1500);

            $button
                .addClass('hold')
                .on('mouseup mouseleave', function() {
                    timeout && clearTimeout(timeout);
                    setTimeout(function() { $button.removeClass('hold'); }, 800);
                });


        });


    });

});