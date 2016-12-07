<?php

class PrizeModel extends CI_Model
{

    /**
     * Retrieve prize objects by date range
     *
     * @param date      $date (YYYY-MM-DD)
     *
     * @return array    prize object
     */
    public function getPrizeByDate($date = null)
    {
        return array_shift($this->getPrizesByDateRange($date, $date));
    }

    /**
     * Retrieve prize objects by date range
     *
     * @param date      $begin_date (YYYY-MM-DD)
     * @param date      $end_date   (YYYY-MM-DD)
     *
     * @return array    array of prize objects
     */
    public function getPrizesByDateRange($begin_date, $end_date)
    {
        if (!$begin_date) {
            $begin_date = date('Y-m-d');
        }
        if (!$end_date) {
            $end_date = $begin_date;
        }
        return $this->db
                    ->where(sprintf('`date` BETWEEN "%s" AND "%s"', $this->db->escape_str($begin_date), $this->db->escape_str($end_date)), null, false)
                    ->order_by('date ASC')
                    ->get('view_prize')
                    ->result_array();
    }

    /**
     * Retrieve a monthly prize calendar
     *
     * @param date      $month (YYYY-MM-01)
     *
     * @return array    array of prize objects for the month of the given $month;
     *                  There MAY be gaps depending on admin--handle in view.
     */
    public function getPrizeCalendar($month)
    {
        $timestamp = !$month ? time() : strtotime($month);

        $begin_date = date('Y-m-01', $timestamp);
        $end_date   = date('Y-m-t', $timestamp);

        return $this->getPrizesByDateRange($begin_date, $end_date);
    }

    /**
     * Retrieve winner objects by date range
     *
     * @param date      $begin_date (YYYY-MM-DD)
     * @param date      $end_date   (YYYY-MM-DD optional, default today)
     *
     * @return array    array of winner objects
     */
    public function getWinnersByDateRange($begin_date, $end_date = null)
    {
        if (!$end_date) {
            $end_date = date('Y-m-d');
        }
        if (!$begin_date) {
            $begin_date = $end_date;
        }
        $winners = $this->db
                        ->where(sprintf('`date` BETWEEN "%s" AND "%s"', $begin_date, $end_date), null, false)
                        ->order_by('date DESC')
                        ->get('view_winner')
                        ->result_array();
        return $winners;
    }

    /**
     * Check if this user (`user_id`) has already `enter`ed this contest today.
     *
     * @param integer   $user_id
     * @param integer   $site_id
     * @param date      $day (optional, defaults to today)
     *
     * @return boolean  true if not already entered, false if already entered
     */
    public function isEligible($user_id, $site_id, $date = null)
    {
        if (!$date) {
            $date = date('Y-m-d');
        }
        // return 1 if user has entered into the contest
        return !$this->db
                     ->select('1', false)
                     ->where('date', (string) $date)
                     ->where('user_id', (int) $user_id)
                     ->where('site_id', (int) $site_id)
                     ->limit(1)
                     ->get('entry')
                     ->num_rows()
        ? true
        : false;
    }

    /**
     * INSERT/enter this user (`user_id`) into the contest (`entry`) table.
     *
     * @param   integer $site_id
     *
     * @return  mixed   Thank you page HTML snippet on success; (null) if successful but no thank you copy
     */
    public function getThanks($site_id)
    {
        // return the thank you HTML
        $row = $this->db
                    ->select('thanks')
                    ->where('id', $site_id)
                    ->get('site')
                    ->row_array();

        return @$row['thanks'] ? $row['thanks'] : null;
    }

//
    //
    //
    //
    //
    // CONVERT TO SPROC in order to return meaningful results
    //
    //
    //
    //
    //
    //

    /**
     * INSERT/enter this user (`user_id`) into the contest (`entry`) table.
     *
     * @param   integer $user_id
     * @param   integer $site_id
     * @param   date    $date (optional, default today)
     * @param   time    $time (optional, default now)
     *
     * @return  mixed   Thank you page HTML snippet on success; null if successful but no thank you copy; (int) 0 if error; (int) -1 if duplicate
     */
    public function enter($user_id, $user_email, $site_id, $date = null, $time = null)
    {
        if ($date === null) {
            $date = date('Y-m-d');
        }

        if ($time === null) {
            $time = date('H:i:s');
        }

        // There is no way to get back the number of affected_rows()
        // or anything else useful out of this query.
        $this->db->query('INSERT IGNORE INTO `entry` VALUES (?,?,?,?,?)', // gotta love ORMs
            compact('date', 'user_id', 'user_email', 'site_id', 'time'));

        // return the thank you HTML
        $row = $this->db
                    ->select('thanks')
                    ->where('id', $site_id)
                    ->get('site')
                    ->row_array();

        return $this->getThanks($site_id);
    }

}
