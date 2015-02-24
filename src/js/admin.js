/**
 * admin.js
 */
'use strict';

// This may run at any time.  Since we rely on jQuery, we must wait until
// it is defined.
(function(w, $, m, l, t, i) {



    /**
     * Utility Functions (thank you Underscore.js)
     */
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function throttle(fn, threshhold, scope) {
        threshhold = threshhold || 250;
        var last,
            deferTimer;
        return function() {
            var context = scope || this;

            var now = +new Date(),
                args = arguments;
            if (last && now < last + threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function() {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }

    function pad(str, len, chr) {
        if (!chr && chr !== 0 || chr.toString().length != 1) {
            chr = ' ';
        }
        str = str.toString();
        var l = str.length + 1,
            buf = '';
        while (l++ <= len) {
            buf += chr;
        }
        return buf + str;
    }

    function str2date(str, if_null) {
        var m = $.type(str) == 'string' && str.match(/^(\d+)-(\d+)-(\d+)$/),
            d;
        if (!m || m.length != 4) {
            return if_null;
        }
        var year = parseInt(m[1]),
            month = parseInt(m[2]) - 1,
            day = parseInt(m[3]);
        if (month < 0 || month > 11 || day > 31 || day < 1) {
            return if_null;
        }
        if (year < 30) {
            year += 2e3;
        }
        d = new Date(year, month, day);
        return !isNaN(d.getTime()) ? d : if_null;
    }

    function date2str(timestamp) {
        var d = new Date(timestamp);
        if (!d) {
            return '';
        }
        return [d.getFullYear().toString(), pad(d.getMonth() + 1, 2, 0), pad(d.getDate(), 2, 0)].join('-');
    }

    /**
     * admin context Globals
     */



    /**
     * Prize model
     */
    function Prize() {
        var DEFAULT_PRIZE_IMAGE_URL = '/img/unavailable.png',
            DEFAULT_PRIZE_FORM_ERROR_MSG = 'Server error encountered. Please try again.',
            $form = $('form.prize'),
            $submit_btn = $form.find('input[type="submit"]'),
            $reset_btn = $form.find('input[type="reset"]'),
            $msg = $form.find('.msg'),
            $loader = $form.find('.loader'),
            $upload_form = $('form.upload'),
            $input_file = $upload_form.find('input[type="file"]'),
            $fieldset_img = $form.find('fieldset.img');

        Prize.id = parseInt($form.find('input[name="id"]').val());
        if (isNaN(Prize.id)) {
            Prize.id = 0;
        }


        function changes () {
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
                if (r.err || !r.success) {
                    return fail(r.msg);
                }
                if (r.prize_id) {
                    Prize.id = parseInt(r.prize_id, 10);
                    $form.find('input[name="id"]').val(Prize.id);
                    // FOR NOW WE SHOULD REDIRECT TO THE PRIZE ID
                    window.location.href = window.location.href.replace(/0$/, Prize.id);
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

        function sendFile(file, index) {
            var fd = new FormData();
            fd.append('img', file);
            $.ajax({
                url: '/admin/upload',
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST'
            }).done(function done(r, textStatus, jqXHR) {
                if (!index) {
                    // find the first index image without a src
                    for (var i = 1; i <= 3; i++) {
                        if (!$('input[name="img' + i + '"]').val()) {
                            index = i;
                            break;
                        }
                    }
                }
                // add the uploaded image to the dom and form
                var
                    $input_hidden = $('input[name="img' + index + '"]'),
                    $fieldset = $input_hidden.closest('fieldset'),
                    $img = $fieldset.find('img');

                $fieldset.removeClass('empty');
                $img.attr('src', r.url);
                $input_hidden.val(r.md5);
                $upload_form[0].reset();
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log('FAIL', jqXHR, textStatus, errorThrown);
            });
        }


        /**
         * uploadImage
         */
        function uploadImage() {}

        /**
         * addImage
         */
        function addImage(index, md5) {}

        /**
         * removeImage
         */
        function removeImage(index) {
            Prize.data['img' + index] = null;
        }

        /**
         * Save this to backend
         */
        function save() {}
    }


    /**
     * Contest model
     */
    function Contest() {
        // Contest globals
        var
            $flight_table = $('#flight'),
            $flight_add = $('#add_flight'),
            $flight_footer_row = $flight_table.find('tr:last-child'),
            $flight_error = $('#contest_error'),
            HIGHLIGHT_DATE = location.hash.substr(1) || str2date(new Date()),
            CONTEST_DATES = getContestDates(),
            GENERIC_CONTEST_ERROR = 'Ooops, server error, please try again';


        // find a date to highlight
        highlightContestDate(HIGHLIGHT_DATE);

        // special binding: flight date adder
        $flight_add.on('keydown', function(evt) {
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
        });

        // special binding: DELETE a flight or pick an ALTERNATE winner
        $flight_table.on('click', 'b', function() {
            var $tr = $(this).closest('tr'),
                date = $tr.find('td:nth-child(2)').text(),
                has_past = !$tr.hasClass('won'); // what's better?
            // has_past = str2date(date) > new Date;

            if (has_past) {
                removeContestDate(date);
            } else {
                pickAlternateWinner(date);
            }
        });


        /**
         * contestError
         */
        function contestError(msg) {
            $flight_error.html(msg || GENERIC_CONTEST_ERROR);
            $flight_footer_row.addClass('error');
        }

        /**
         * contestXhr
         */
        function contestXhr(action, date, callback) {
            if (!Prize.id) {
                contestError('Please save this prize before adding flight dates.');
                return false;
            }
            $flight_error.html('');
            $flight_footer_row.removeClass('error');
            $.ajax({
                url: '/admin/contest/' + action,
                data: {
                    'prize_id': Prize.id,
                    'date': date
                },
                dataType: 'json',
                type: 'POST'
            })
                .done(function done(r, textStatus, jqXHR) {
                    if (r.success) {
                        if ($.type(callback) == 'function') {
                            callback(r);
                        }
                    } else {
                        contestError(r.msg);
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

    }


    /**
     * Ready methods
     */
    function ready() {

        // hardcode for now
        if ($('form.prize').length) {
            Prize();
            Contest();
        }
        // $.ajax({
        //     url: '/admin/prize/1',
        //     dataType: 'json',
        //     cache: true
        // })
        //     .done(function(r, textStatus, jqXHR) {
        //         $('.prize').show();
        //         Prize(r);
        //     })
        //     .fail(function(jqXHR, textStatus, errorThrown) {});


    } // end ready()



    /**
     * Expose global context hooks into admin.*
     */
    admin['prize'] = Prize;


    /**
     * the real admin() object and deferred loader
     */
    function admin(key, val) {
        if (key in admin) {
            if ($.isFunction(admin[key])) {
                return admin[key].call(this, val);
            }
            if ($.isPlainObject(val)) {
                return $.extend(admin[key], val);
            }
        }
        return admin[key] = val;
    }
    i = 0; // placeholder for setInterval id
    (l = function() {
        // rd.log('Checking for jQuery '+i);
        if (!w[$]) {
            (!i++) && (t = setInterval(l, 50)); // check every 50 milliseconds
            return;
        }
        // rd.warn('jQuery FOUND after '+i+' intervals!')
        t && clearInterval(t);

        // define $ in this context:
        $ = w[$];

        // process any admin() calls before we started
        if (w[m] && w[m].q) {
            w[m].q.forEach(function(a) {
                admin.apply(w, a);
            });
        }

        // overwrite the window.admin object with this one.
        w[m] = admin;

        $(ready); // kick things off
    })();



})(window, 'jQuery', 'admin');