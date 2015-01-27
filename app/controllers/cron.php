<?php

class Cron extends CI_Controller
{
    protected $MRS_RETRIES            = 3;
    protected $property_by_channel_id = array();
    protected $domain_by_channel_id   = array();
    protected $debug                  = true;
    protected $error_log              = '';
    protected $error_log_email        = null;
    protected $error_log_file         = '/tmp/sweeps-cron-error.log';
    protected $WARN                   = 3;
    protected $ERROR                  = 2;
    protected $FATAL                  = 1;
    protected $ERROR_STATUS_BY_INT    = array(
        1 => 'FATAL',
        2 => 'ERROR',
        3 => 'WARN',
    );
    protected $yesterday;
    protected $today;

    public function __construct()
    {
        parent::__construct();

        if (@$_SERVER['HTTP_HOST']) {
            show_404();
        }

        // hydrate the $property_by_channel_id
        $this->hydratePropertyByChannelId();

        $this->yesterday = date('Y-m-d', strtotime('-1 day'));
        $this->today     = date('Y-m-d');
    }

    public function __destruct()
    {
        if (!$this->error_log) {
            return;
        }
        @file_put_contents($this->error_log_file, $this->error_log, FILE_APPEND);
    }

    /**
     * Performs daily winner selection for the previous day on every rule_id that is active.
     * Sends emails to the winner and to Meredith about the winner selection.
     *
     * Should be invoked with the following crontab entry (should be midnight on the dot)
     * 0    0 * * * root /srv/sites/sweeps/bin/cron daily
     *
     * @return void
     */
    public function daily()
    {
        $day = $this->yesterday;

        // get all active rules
        $rules = $this->db
                      ->select('id as rule_id, daily_rule.title as rule_title, daily_rule.prize as prize_value, daily_rule.gift_card_amount as giftcard_value, daily_rule.email_type as email_tpl')
                      ->where('is_active', 1)
                      ->where(sprintf('"%s" BETWEEN `start_date` AND `end_date`', $day), null, false)
                      ->get('daily_rule')
                      ->result_array();

        if (!$rules) {
            $this->error('No valid rules found today during daily winner selection:' . PHP_EOL . $this->db->last_query(), $this->FATAL);
        }

        // pick a winner for each rule
        $winners = array();
        foreach ($rules as $rule) {
            $w = $this->pickWinner($day, $rule['id']);
            if (!$w) {
                // this could happen if nobody entered the contest
                $this->error('Could not pick a winner from yesterdays’s rule_id (' . $rule['id'] . ')', $this->WARN);
                continue;
            }
            // we need to find the affidavits and title of the prize from the `prize` table
            $prize = $this->db
                          ->select('prize.affidavits as affidavits, prize.title as prize_title')
                          ->where('id', $w['prize_id'])
                          ->get('prize')
                          ->row_array();

            $winners[] = array(
                'day'            => $day,
                'rule_id'        => $rule['rule_id'],
                'profile_id'     => $w['profile_id'],
                'prize_id'       => $w['prize_id'],
                'channel_id'     => $w['channel_id'],
                'rule_title'     => $rule['rule_title'],
                'prize_value'    => $rule['prize_value'],
                'giftcard_value' => $rule['giftcard_value'],
                'email_tpl'      => $rule['email_tpl'],
                'affidavits'     => $prize['affidavits'],
                'prize_title'    => $prize['prize_title'],
            );
        }

        if (!$winners) {
            $this->error('No eligible winners found during daily winner selection.', $this->FATAL);
        }

        // hydrate every winner with reg service data
        $this->load->library('reg');
        foreach ($winners as $i => &$winner) {
            if (!$this->hydrateProfile($winner)) {
                $this->error('Could NOT hydrateProfile with Reg Services:' . PHP_EOL . print_r($winner, true), $this->ERROR);
                // remove this winner and keep moving
                unset($winners[$i]);
            }
            $this->sanitizeWinner($winner);
        }

        if (!$winners) {
            $this->error('All of today’s winners were unset because Reg Services is down or those profiles do not exist.' . $this->FATAL);
        }

        // insert each winner into the `winner` table
        foreach ($winners as $winner) {
            if (!$this->insertWinner($winner)) {
                $this->error('Unable to inserWinner on the following profile:' . PHP_EOL . print_r($winner, true), $this->ERROR);
                // remove this winner and keep moving
                unset($winners[$i]);
            }
        }

        if (!$winners) {
            $this->error('All of today’s winners were unset because we could not insert them into the `winner` table.', $this->FATAL);
        }

        // send emails to each winner
        foreach ($winners as $winner) {
            $this->sendMail($winner);
        }
    }

    /**
     * Update the stats, specifically entrants, from last month
     *
     * Should be invoked with the following crontab entry (should be run on the first of the month during non-busy hours)
     * 38   2 1 * * root /srv/sites/sweeps/bin/cron entrants
     *
     * @param string $month (optional) defaults to yesterday’s month
     *
     * @return void
     */
    public function entrants($month = null)
    {
        // first day of the month
        $month = date('Y-m-01', strtotime($month ? $month : 'last month'));

        $sql = sprintf('INSERT INTO `stat_monthly` (`date`, `channel_id`, `entries`, `entrants`)
                            SELECT
                                CONCAT(YEAR(`day`),"-",LPAD(MONTH(`day`), 2, "0"),"-01") `date`,
                                `channel_id`,
                                COUNT(1) `entries`,
                                COUNT(DISTINCT(`profile_id`)) `entrants`
                            FROM `entry`
                            WHERE `day` BETWEEN "%s" AND LAST_DAY("%s")
                            GROUP BY `date`, `channel_id`
                        ON DUPLICATE KEY UPDATE
                            `entries`=VALUES(`entries`),
                            `entrants`=VALUES(`entrants`)',
            $month,
            $month);
        $this->db->query($sql);
    }

    protected function hydratePropertyByChannelId()
    {
        $rows = $this->db
                     ->select('channel_id, domain, channel_url')
                     ->get('view_channel')
                     ->result_array();
        foreach ($rows as $r) {
            $this->property_by_channel_id[$r['channel_id']] =
            trim($r['domain'] . $r['channel_url'], '/');
            $this->domain_by_channel_id[$r['channel_id']] =
            trim(str_replace('win.', '', $r['domain']));
        }
    }

    protected function error($msg, $status = 3)
    {
        $trace  = debug_backtrace();
        $caller = (@$trace[1]['class'] ? $trace[1]['class'] . '::' : '') . $trace[1]['function'];
        if ($status < 3) {
            $this->error_log .= '[' . date('Y-m-d H:i:s') . '] ' . $this->ERROR_STATUS_BY_INT[$status] . ' ' . $caller . PHP_EOL . $msg . PHP_EOL;
        }
        if ($this->debug) {
            print_r($msg);
        }
        if ($status == 1) {
            // FATAL
            exit;
        }
    }

    /**
     * SELECT a winner from the `entry` table
     * Also, checks that the winner has not been a previous winner
     *
     * @param date $day (YYY-MM-DD) format
     * @param integer $rule_id
     * @param integer $channel_id (optional) Only selects entries for a given $channel_id
     *
     * @return array ( profile_id, prize_id, channel_id ) or empty array
     */
    protected function pickWinner($day, $rule_id, $channel_id = null)
    {
        $this->db
             ->select('profile_id, prize_id, channel_id')
             ->where('day', $day)
             ->where(sprintf('`profile_id` NOT IN (SELECT `profile_id` FROM `winner` WHERE `rule_id` = %d)', $rule_id), null, false)
             ->order_by('RAND()', false)
             ->limit(1);

        if ($channel_id) {
            $this->db->where('channel_id', $channel_id);
        }

        return $this->db->get('entry')->row_array();
    }

    /**
     * INSERT a winner into the `winner` table
     *
     * @param array $winner
     *
     * @return boolean
     */
    protected function insertWinner($winner)
    {
        return $this->db->insert(
            'winner',
            array(
                'day'        => $winner['day'],
                'rule_id'    => $winner['rule_id'],
                'profile_id' => $winner['profile_id'],
                'prize_id'   => $winner['prize_id'],
                'channel_id' => $winner['channel_id'],
                'name'       => $winner['name'],
                'location'   => $winner['location'],
                'property'   => $winner['property'],
            )
        );
    }

    /**
     * Retrieve a user profile from Meredith’s Registration Services
     *
     * Retries $this->MRS_RETRIES times before returning (bool) false.
     *
     * @param array &$profile
     *
     * @return boolean
     */
    protected function hydrateProfile(&$profile)
    {
        $attempts = 0;
        while (++$attempts <= $this->MRS_RETRIES) {
            $p = $this->reg->getProfile($profile['profile_id']);
            if ($p) {
                $profile = array_merge($profile, $p);
                return true;
            }
        }
        return false;
    }

    /**
     * Derrives the 'name', 'location', and 'property' used in the `winner` table
     *
     * @param array $profile
     *
     * @return void
     */
    protected function sanitizeWinner(&$profile)
    {
        // assign email -> login if that's not already set
        if (!@$profile['email']) {
            $profile['email'] = $profile['login'];
        }
        // name
        if (!@$profile['name']) {
            $profile['name'] = $profile['firstname'];
            if (@$profile['lastname']) {
                $profile['name'] .= ' ' . $profile['lastname'][0] . '.';
            }
        }
        // location
        if (!@$profile['location']) {
            if (@$profile['city']) {
                $profile['location'] = $profile['city'] . ', ';
            }
            $profile['location'] .= $profile['state'];
        }
        // property
        if (!@$profile['property']) {
            $profile['property'] = $this->property_by_channel_id[$profile['channel_id']];
        }
        // fullname (used for email template)
        if (!@$profile['fullname']) {
            $profile['fullname'] = $profile['firstname'];
            if (@$profile['lastname']) {
                $profile['fullname'] .= ' ' . $profile['lastname'];
            }
        }
        // address (used for email template)
        if (!@$profile['address']) {
            $profile['address'] = $profile['address1'];
            if (@$profile['address2']) {
                $profile['address'] .= ', ' . $profile['address2'];
            }
        }
        // domain (used for email template)
        if (!@$profile['domain']) {
            $profile['domain'] = $this->domain_by_channel_id[$profile['channel_id']];
        }
        // date_pretty (used for email template)
        if (!@$profile['date_pretty']) {
            $profile['date_pretty'] = date('F j, Y', strtotime($profile['day']));
        }
    }

    protected function sendMail($params)
    {
        $this->load->library('email');
        $this->load->library('parser');

        // partner email
        $this->email->clear();
        $this->email->from(config_item('from_email'), config_item('from_name'));
        $this->email->to(config_item('meredith_emails'));
        $this->email->cc(config_item('resolute_emails'));
        $this->email->subject('Sweeps Daily Winner: ' . $params['date_pretty']);
        $body = $this->parser->parse('../templates/partner_email', $params, true);
        $this->email->message($body);
        $this->email->send();

        // winner email
        $this->email->clear();
        $this->email->from(config_item('from_email'), config_item('from_name'));
        // $this->email->reply_to(config_item('replyto_email'), config_item('replyto_name'));
        $this->email->to($params['email']);
        $this->email->cc(config_item('meredith_emails'));
        $this->email->bcc(config_item('resolute_emails'));
        $this->email->subject($params['domain'] . ' Winner Notification');

        switch ($params['email_tpl']) {
            case "Prize_or_giftcard":
                $tpl = 'winner_email';
                break;
            case "Prize":
            default:
                $tpl = 'winner_email_prize';
        }
        $body = $this->parser->parse('../templates/' . $tpl, $params, true);
        $this->email->message($body);
        $this->email->send();
    }

}
