<?php

/**
 * Main Controller
 */

class Main extends FrontendController
{

    public function __construct()
    {
        parent::__construct();

        // Do Not Cache during the first minute after midnight
        // so that the daily cron has enough time to select a
        // winner.  This applies to any controller that displays
        // winner information (main.php and winners.php).
        if (date('Hi') === "0000") {
            $this->rdcache->expires(-1);
        } else {
            // expire these responses at midnight tonight
            $this->rdcache->expires('@' . strtotime('tomorrow'));
        }
    }

    /**
     * Homepage
     */
    public function index()
    {
        $this->load->model('prizeModel');

        $this->load->library('SolveMedia');

        $data['prizes'] = $this->prizeModel->getPrizesByDateRange(date('Y-m-d', strtotime('15 days ago')), date('Y-m-d', strtotime('+15 days')));
        // find today's prize
        $todays_date = date('Y-m-d');
        while ($p = current($data['prizes'])) {
            if ($p['date'] == $todays_date) {
                $data['prize']    = &$p;
                $data['tomorrow'] = &next($data['prizes']);
                break;
            }
            next($data['prizes']);
        }
        $data['winners'] = $this->prizeModel->getWinnersByDateRange(date('Y-m-d', strtotime('16 days ago')));

        // having 'solvemedia' defined will cause the auto load of partials/captcha
        // in the footer of each shell--directly following the <script> line
        $data['solvemedia'] = $this->solvemedia->invoke();

        // <title> & <meta> tags
        if (@$data['prize']['title']) {
            $data['meta']['og:title']       = 'Win ' . articleAgreement($data['prize']['title']);
            $data['meta']['og:description'] = $data['prize']['desc1'];
            $data['meta']['og:image']       = 'http://' . $_SERVER['HTTP_HOST'] . $data['prize']['img1'];
            $data['meta']['og:domain']      = $this->site_domain;
            $data['meta']['og:url']         = 'http://' . $_SERVER['HTTP_HOST'] . '/';
        }

        return $this->loadView(array(
            'partials/prize',
            'partials/signup',
            'partials/info_form',
            'partials/thankyou',
            'partials/calendar',
            'partials/winners',
        ), $data);
    }

    /**
     * Calendar
     */
    public function calendar()
    {
        $this->load->model('prizeModel');

        ### REMOVE THIS CONDITIONAL AFTER LAUNCH
        if (date('Y-m') == '2015-03') {
            $begin_date = '2015-04-01';
            $end_date   = '2015-04-30';
        } else {
            $begin_date = date('Y-m-1');
            $end_date   = date('Y-m-t');
        }

        // get prizes
        $data['prizes'] = $this->prizeModel->getPrizesByDateRange($begin_date, $end_date);

        // <title> & <meta> tags
        $data['meta']['og:title']  = $this->site_name . ' Daily Sweepstakes Calendar';
        $data['meta']['og:domain'] = $this->site_domain;
        $data['meta']['og:url']    = 'http://' . $_SERVER['HTTP_HOST'] . '/calendar';

        $this->loadView('calendar', $data);
    }

    /**
     * Winners
     */
    public function winners()
    {
        $this->load->model('prizeModel');

        // get winners
        $data['winners'] = $this->prizeModel->getWinnersByDateRange(date('Y-m-d', strtotime('44 days ago')));

        // <title> & <meta> tags
        $data['meta']['og:title']  = 'Recent ' . $this->site_name . ' Daily Sweepstakes Winners';
        $data['meta']['og:domain'] = $this->site_domain;
        $data['meta']['og:url']    = 'http://' . $_SERVER['HTTP_HOST'] . '/winners';
        if (@$data['winners'][0]) {
            $latest_winner                  = $data['winners'][0];
            $data['meta']['og:image']       = $latest_winner['prize_img1'];
            $data['meta']['og:description'] = firstNameLastInitial($latest_winner['user_firstname'], $latest_winner['user_lastname']) . ' from ' . $latest_winner['user_city'] . ', ' . $latest_winner['user_state'] . ' won '
            . articleAgreement($latest_winner['prize_title']);
        }

        $this->loadView('winners', $data);
    }

    /**
     * Prize
     */
    public function prize($date = null)
    {

        $time = strtotime($date);

        // issue 302 redirect for today’s prize
        if (!$time || $date == date('Y-m-d')) {
            redirect('/', '302');
        }

        $date      = date('Y-m-d', $time);
        $yesterday = date('Y-m-d', $time - 86400);
        $tomorrow  = date('Y-m-d', $time + 86400);

        $this->load->model('prizeModel');
        $prizes        = prizeByDateMap($this->prizeModel->getPrizesByDateRange($yesterday, $tomorrow));
        $data['prize'] = @$prizes[$date];
        $data['prev']  = @$prizes[$yesterday];
        $data['next']  = @$prizes[$tomorrow];
        $prize         = $data['prize'];

        if (!@$prize) {
            show_404();
        }

        // <title> & <meta> tags
        $prize = $data['prize'];
        if ($prize['date'] && $prize['title']) {
            $data['meta']['og:title']       = 'Win ' . articleAgreement($prize['title']);
            $data['meta']['og:description'] = trim($prize['desc1']);
            $data['meta']['og:image']       = (strpos(trim($prize['img1']), 'http') !== 0 ? 'http:' : '') . trim($prize['img1']);
            $data['meta']['og:domain']      = $this->site_domain;
            $data['meta']['og:url']         = 'http://' . $_SERVER['HTTP_HOST'] . '/prize/' . $prize['date'];
        }

        $this->loadView('partials/prize', $data);
    }

    /**
     * Rules
     */
    public function rules()
    {
        $data['meta']['og:title']  = $this->site_name . ' Daily Sweepstakes Rules';
        $data['meta']['og:domain'] = $this->site_domain;
        $data['meta']['og:url']    = 'http://' . $_SERVER['HTTP_HOST'] . '/rules';

        $this->load->model('prizeModel');
        $this->load->library('parser');

        $prize = $this->prizeModel->getPrizeByDate(date('Y-m-d'));

        if (!$prize) {
            $data['rules'] = '<p>We are not running a Daily Sweepstakes today.  Please check back tomorrow!</p>';
            return $this->loadView('rules', $data);
        }

        $ts_today_end   = strtotime('tomorrow') - 1;
        $ts_today_begin = $ts_today_end - 86400 + 1;
        $ts_day_after   = $ts_today_end + 1;

        $params['BEGIN_DATE']     = date('F j, Y \a\t h:i:s a T', $ts_today_begin);
        $params['END_DATE']       = date('F j, Y \a\t h:i:s a T', $ts_today_end);
        $params['SITE_LIST']      = sprintf('<a href="%s">%s</a>', 'http://' . $this->site_domain . '/', $this->site_domain);
        $params['DAY_AFTER']      = date('F j, Y', $ts_day_after);
        $params['TITLE']          = $prize['title'];
        $params['ACTUAL_VALUE']   = '$' . $prize['value'];
        $params['AWARDED_AS']     = $prize['award'];
        $params['DOMAIN']         = sprintf('<a href="%s">%s</a>', 'http://' . $this->site_domain . '/', $this->site_domain);
        $params['DOMAIN_PARENT']  = sprintf('<a href="%s">%s</a>', 'http://' . str_replace('win.', '', $this->site_domain) . '/', str_replace('win.', '', $this->site_domain));
        $params['DOMAIN_WINNERS'] = sprintf('<a href="%s">%s</a>', 'http://' . $this->site_domain . '/winners', $this->site_domain . '/winners');

        $data['rules'] = $this->parser->parse('../templates/rules', $params, true);

        $this->loadView('rules', $data);
    }

}
