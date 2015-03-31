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
        // UNCOMMEND THIS 8 DAYS AFTER LAUNCH:
        // return $winners;
        // AND REMOVE THIS:
        return $this->temporarilyAddMeredithWinners($winners, $begin_date, $end_date);
    }

    /**
     * TEMPORARILY BACKFILL WINNERS FROM MEREDITH DURING THE FIRST 8 DAYS OF
     * THIS PROJECT.
     *
     * AFTER THE FIRST 8 DAYS, THIS METHOD SHOULD BE DELETE AND getWinnersByDateRange
     * SHOULD JUST "return $winners"
     *
     */
    public function temporarilyAddMeredithWinners($winners, $begin_date, $end_date)
    {
        $project_start_time = strtotime('2015-03-31');
        if (time() - $project_start_time <= 86400 * 8) {
            return array_merge(
                $winners,
                array(
                    array(
                        'date'           => '2015-03-30',
                        'prize_title'    => 'Falcon Enamelware Bake Set',
                        'prize_img1'     => 'http://images.meredith.com/recipecom/images/Marketing/Registration/Contests/Daily_Sweepstakes/0330_250x250.jpg',
                        'user_firstname' => 'Joyce',
                        'user_lastname'  => 'E',
                        'user_city'      => 'Lakeville',
                        'user_state'     => 'PA',
                        'site_name'      => 'Recipe.com',
                        'site_domain'    => 'win.recipe.com',
                        '_override'      => true,
                    ),
                    array(
                        'date'           => '2015-03-29',
                        'prize_title'    => 'Farberware 12-Pc. Cookware Set',
                        'prize_img1'     => 'http://images.meredith.com/bhg/images/contests/Hot_Daily_Giveaway/prize_images/recipes_channel/0329_250x250.jpg',
                        'user_firstname' => 'Sandra',
                        'user_lastname'  => 'D',
                        'user_city'      => 'Hot Springs Village',
                        'user_state'     => 'AR',
                        'site_name'      => 'BHG',
                        'site_domain'    => 'win.bhg.com/recipes',
                        '_override'      => true,
                    ),
                    array(
                        'date'           => '2015-03-28',
                        'prize_title'    => 'Metro Storage Ottoman',
                        'prize_img1'     => 'http://images.meredith.com/bhg/images/contests/Hot_Daily_Giveaway/prize_images/general/0328_250x250.jpg',
                        'user_firstname' => 'Michelle',
                        'user_lastname'  => 'S',
                        'user_city'      => 'Barbourville',
                        'user_state'     => 'KY',
                        'site_name'      => 'BHG',
                        'site_domain'    => 'win.bhg.com',
                        '_override'      => true,
                    ),
                    array(
                        'date'           => '2015-03-27',
                        'prize_title'    => 'Bodum Stand Mixer',
                        'prize_img1'     => 'http://images.meredith.com/bhg/images/contests/Hot_Daily_Giveaway/prize_images/general/0327_250x250.jpg',
                        'user_firstname' => 'Peggy',
                        'user_lastname'  => 'L',
                        'user_city'      => 'Kiel',
                        'user_state'     => 'WI',
                        'site_name'      => 'BHG',
                        'site_domain'    => 'win.bhg.com',
                        '_override'      => true,
                    ),
                    array(
                        'date'           => '2015-03-26',
                        'prize_title'    => 'Goldstar Gravity Iron',
                        'prize_img1'     => 'http://images.meredith.com/bhg/images/contests/Hot_Daily_Giveaway/prize_images/APQ/Q-326_250x250.jpg',
                        'user_firstname' => 'Aaron',
                        'user_lastname'  => 'T',
                        'user_city'      => 'Bartow',
                        'user_state'     => 'FL',
                        'site_name'      => 'BHG',
                        'site_domain'    => 'win.bhg.com',
                        '_override'      => true,
                    ),
                    array(
                        'date'           => '2015-03-25',
                        'prize_title'    => 'Cuisinart Wok',
                        'prize_img1'     => 'http://images.meredith.com/recipecom/images/Marketing/Registration/Contests/Daily_Sweepstakes/0325_250x250.jpg',
                        'user_firstname' => 'Elaine',
                        'user_lastname'  => 'W',
                        'user_city'      => 'Fort Wayne',
                        'user_state'     => 'IN',
                        'site_name'      => 'Recipe.com',
                        'site_domain'    => 'win.recipe.com',
                        '_override'      => true,
                    ),
                    array(
                        'date'           => '2015-03-24',
                        'prize_title'    => 'Wall-Mounted Storage',
                        'prize_img1'     => 'http://images.meredith.com/bhg/images/contests/Hot_Daily_Giveaway/prize_images/APQ/Q-324_250x250.jpg',
                        'user_firstname' => 'Chris',
                        'user_lastname'  => 'B',
                        'user_city'      => 'Colleyville',
                        'user_state'     => 'TX',
                        'site_name'      => 'BHG',
                        'site_domain'    => 'win.bhg.com',
                        '_override'      => true,
                    ),
                    array(
                        'date'           => '2015-03-23',
                        'prize_title'    => 'Circulon Fondue Set',
                        'prize_img1'     => 'http://images.meredith.com/recipecom/images/Marketing/Registration/Contests/Daily_Sweepstakes/0323_250x250.jpg',
                        'user_firstname' => 'Marty',
                        'user_lastname'  => 'S',
                        'user_city'      => 'Vancouver',
                        'user_state'     => 'WA',
                        'site_name'      => 'Recipe.com',
                        'site_domain'    => 'win.recipe.com',
                        '_override'      => true,
                    ),
                    array(
                        'date'           => '2015-03-22',
                        'prize_title'    => 'Rachael Ray Pasta Pot',
                        'prize_img1'     => 'http://images.meredith.com/recipecom/images/Marketing/Registration/Contests/Daily_Sweepstakes/0322_250x250.jpg',
                        'user_firstname' => 'Mary',
                        'user_lastname'  => 'T',
                        'user_city'      => 'Westminster',
                        'user_state'     => 'MD',
                        'site_name'      => 'BetterRecipes',
                        'site_domain'    => 'win.betterrecipes.com',
                        '_override'      => true,
                    ),
                )
            );
        }
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
    public function enter($user_id, $site_id, $date = null, $time = null)
    {
        if ($date === null) {
            $date = date('Y-m-d');
        }

        if ($time === null) {
            $time = date('H:i:s');
        }

        // // There is no way to get back the number of affected_rows()
        // // or anything else useful out of this query.
        // return $this->db->query('INSERT IGNORE INTO `entry` VALUES (?,?,?,?)', // gotta love ORMs
        //     compact('date', 'user_id', 'site_id', 'time'));

        // There is no way to get back the number of affected_rows()
        // or anything else useful out of this query.
        $this->db->query('INSERT IGNORE INTO `entry` VALUES (?,?,?,?)', // gotta love ORMs
            compact('date', 'user_id', 'site_id', 'time'));

        // return the thank you HTML
        $row = $this->db
                    ->select('thanks')
                    ->where('id', $site_id)
                    ->get('site')
                    ->row_array();

        return $this->getThanks($site_id);
    }

}
