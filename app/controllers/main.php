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
        $data['winners'] = $this->prizeModel->getWinnersByDateRange(date('Y-m-d', strtotime('15 days ago')));

        // having 'solvemedia' defined will cause the auto load of partials/captcha
        // in the footer of each shell--directly following the <script> line
        $data['solvemedia'] = $this->solvemedia->invoke();

        // <title> & <meta> tags
        if (@$data['prize']['title']) {
            $data['meta']['title']       = 'Win ' . articleAgreement($data['prize']['title']);
            $data['meta']['description'] = $data['prize']['desc1'];
            $data['meta']['image']       = 'http://' . $_SERVER['HTTP_HOST'] . $data['prize']['img1'];
            $data['meta']['domain']      = $this->site_domain;
            $data['meta']['url']         = 'http://' . $_SERVER['HTTP_HOST'] . '/';
        }

        return $this->loadView(array(
            'partials/prize',
            'partials/signup',
            'partials/thankyou',
            'partials/carousel',
            'partials/winners',
        ), $data);
    }

    /**
     * Calendar
     */
    public function calendar()
    {
        $this->load->model('prizeModel');

        // get prizes
        $data['prizes'] = $this->prizeModel->getPrizesByDateRange(date('Y-m-1'), date('Y-m-t'));

        // <title> & <meta> tags
        $data['meta']['title']  = $this->site_name . ' Daily Sweepstakes Calendar';
        $data['meta']['domain'] = $this->site_domain;
        $data['meta']['url']    = 'http://' . $_SERVER['HTTP_HOST'] . '/calendar';

        $this->loadView('calendar', $data);
    }

    /**
     * Winners
     */
    public function winners()
    {
        $this->load->model('prizeModel');

        // get winners
        $data['winners'] = $this->prizeModel->getWinnersByDateRange(date('Y-m-d', strtotime('45 days ago')));

        // <title> & <meta> tags
        $data['meta']['title']  = $this->site_name . ' Daily Sweepstakes Calendar';
        $data['meta']['domain'] = $this->site_domain;
        $data['meta']['url']    = 'http://' . $_SERVER['HTTP_HOST'] . '/calendar';

        // <title> & <meta> tags
        $meta['title']  = $this->site_name . ' Daily Sweepstakes Winners';
        $meta['domain'] = $this->site_domain;
        $meta['url']    = 'http://' . $_SERVER['HTTP_HOST'] . '/winners';

        if (@$data['winners'][0]) {
            $latest_winner       = $data['winners'][0];
            $meta['image']       = $latest_winner['prize_img1'];
            $meta['description'] = $latest_winner['user_firstname'] . ' from ' . $latest_winner['user_city'] . ' won '
            . articleAgreement($latest_winner['prize_title']);
        }

        $this->loadView('partials/winners', $data);
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
            $data['meta']['title']       = 'Win ' . articleAgreement($prize['title']);
            $data['meta']['description'] = trim($prize['desc1']);
            $data['meta']['image']       = (strpos(trim($prize['img1']), 'http') !== 0 ? 'http:' : '') . trim($prize['img1']);
            $data['meta']['domain']      = $this->site_domain;
            $data['meta']['url']         = 'http://' . $_SERVER['HTTP_HOST'] . '/prize/' . $prize['date'];
        }

        $this->loadView('partials/prize', $data);
    }

    /**
     * Rules
     */
    public function rules()
    {
        $grandprize_template_body = '';
        $template_body            = '';

        $this->load->model('banner_model');
        $this->load->model('prize_model');
        $this->load->model('template_model');

        $this->load->library('parser');

        $data['banner'] = $this->banner_model->getTodaysBanners(array(1, 2, 3, 4), $this->channel_id);

        $data['prize'] = $this->prize_model->getPrizeByDate($this->channel_id);

        if (!$data['prize']) {
            show_404();
        }

        $data['grandprize'] = $this->prize_model->getGrandPrizeByDate($this->channel_id);

        if (isset($data['grandprize']['grandprize_rule_template_id'])) {
            $grandprize_rule_template = $this->template_model->getGrandprizeTemplateById($data['grandprize']['grandprize_rule_template_id']);
            $grandprize_template_body = $this->load->view('/partials/grandprize_rules', array('body' => $this->parser->parse_string($grandprize_rule_template['rules'], $data['grandprize'], true), 'banner' => $data['banner']), true);
        }

        $rule_template = $this->template_model->getTemplateById($data['prize']['daily_rule_template_id']);

        $json = array();

        $template_body = preg_replace_callback('~{([\w]+):([-$\w\s]+)}~', function ($match) use (&$json) {
            $json[$match[1]] = $match[2];
            return '{' . $match[1] . '}';
        }, $rule_template['rules']);

        $data['prize']['domain']         = '<a href="' . $this->channel_url . '">' . $this->site_name . '</a>';
        $data['prize']['domain_winners'] = '<a href="/winners' . '">' . $this->site_name . ' Winners</a>';
        $data['prize']['channel_url']    = $this->channel_url;

        $data['gtm'] = $this->config->item($this->site_slug, 'gtm');

        $data['tos_link'] = $this->config->item($this->site_slug, 'tos_link');

        $template_data = array(
            'body'        => $this->parser->parse_string($template_body, $data['prize'], true),
            'grandprize'  => $data['grandprize'],
            'banner'      => $data['banner'],
            'channel_url' => $this->channel_url);
        $template_body = $this->load->view('rules', $template_data, true);

        // Omniture
        $data['omniture'] = array(
            'site_slug'    => $this->site_slug,
            'site_name'    => $this->site_name,
            'channel_slug' => $this->channel_slug,
            'channel_name' => $this->channel_name,
            'reg_source'   => $this->reg_source_id,
            '_evt'         => 'home', // optional, but allows us to fire this event immediately after setup
        );

        // <Title> & <Meta> tags
        $meta['title']         = 'Daily Sweepstakes Rules for ' . $this->site_name . ($this->channel_id != $this->site_id ? ' / ' . $this->channel_name : '');
        $meta['domain']        = $this->domain;
        $meta['url']           = 'http://' . $_SERVER['HTTP_HOST'] . $this->channel_url . 'rules';
        $template_data['meta'] = $this->load->view('/partials/meta', $meta, true);

        $template_data['sf_content'] = '<div id="mds" class="' . $this->site_slug . '">' .
        $this->load->view('/partials/script', $data, true) .
        $template_body . $grandprize_template_body .
        '</div>';

        $this->load->view('/shells/' . $this->site_slug, $template_data);
    }

}
