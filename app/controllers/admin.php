<?php

/**
 * Admin Controller
 */

class Admin extends AdminController
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * GET/html: index (dashboard)
     *
     * @return HTML
     */
    public function index()
    {
        $this->load->model('adminModel');

        // // Align the dates so that month will end flush to a 7-day calendar  row
        // $begin_date = $this->closestModXDate(strtotime('8 days ago'), 7);
        $begin_date = date('Y-m-d', strtotime('2 Sundays ago'));
        $end_date   = date('Y-m-d', strtotime('2 Sundays ago') + 86400*7*9 - 86400); // 9 weeks
        // $end_date   = date('Y-m-t', strtotime('+2 months'));

        $contests = $this->adminModel->getContestsByDateRange($begin_date, $end_date);

        $dates   = array();
        $d       = new DateTime($begin_date);
        $one_day = new DateInterval('P1D'); // 24 hour interval
        // start the loop, but rewind one day first
        $d->sub($one_day);
        $infinite_loop_protection = 0;
        do {
            $next_date = $d->add($one_day)->format('Y-m-d');
            $dates[]   = $next_date;
            if ($infinite_loop_protection++ >= 200) {
                break;
            }
        } while ($next_date != $end_date);

        // re-index $contests by date
        $reindexed = array();
        foreach ($contests as $c) {
            $reindexed[$c['date']] = $c;
        }

        $data['nav_dashboard'] = true;
        $data['stats']         = $this->adminModel->getPrizeStats();
        $data['dates']         = $dates;
        $data['contests']      = $reindexed;
        return $this->loadView(array('admin/dashboard'), $data);
    }

    /**
     * GET/html: contests (aka sweepstakes)
     *
     * @param   string  $params CSV of sort/limit/offset options
     *
     * @return  html
     */
    public function contests($params = null)
    {
        $this->load->model('adminModel');
        $data['nav_sweepstakes'] = true;
        $data['contests']        = $this->adminModel->getContestsByDateRange(date('Y-m-d', strtotime('15 days ago')), date('Y-m-d', strtotime('+90 days')));
        $data['stats']           = $this->adminModel->getPrizeStats();
        return $this->loadView(array('admin/sweepstakes'), $data);
    }

    /**
     * GET/html: prize detail page
     *
     * @param   integer $prize_id
     *
     * @return  html
     */
    public function prize($prize_id = null)
    {
        if (@$_SERVER['REQUEST_METHOD'] != 'GET') {
            show_405();
        }
        switch (@$_SERVER['REQUEST_METHOD']) {
            case 'POST':
                // create/update a prize
                break;
            case 'GET':
                // prize detail HTML or create new HTML
                $this->load->model('adminModel');
                $data['prize']    = $this->adminModel->getPrize($prize_id);
                $data['contests'] = $this->adminModel->getContestsByPrizeId($prize_id);
                return $this->loadView('admin/prize', $data);
                break;
            default:
                show_404();
                break;
        }
    }

    /**
     * POST/json: create/update a prize
     *
     * @return  json
     */
    public function upsert()
    {
        if (@$_SERVER['REQUEST_METHOD'] != 'POST') {
            show_405();
        }

        $this->load->library('form_validation');

        // look for a prize id
        $prize_id = (int) $this->input->post('id');

        return ($prize_id > 0) ? $this->updatePrize($prize_id) : $this->createPrize();
    }

    /**
     * Create a new prize
     *
     * @param   array   $prize
     *
     * @return  json
     */
    public function createPrize()
    {
        // prize requirements validation for a new prize
        $this->form_validation->set_rules('title', 'Title required.', 'trim|required');
        $this->form_validation->set_rules('img1', 'The first image is required.', 'trim|required|callback_properMd5');
        $this->form_validation->set_rules('desc1', '', 'trim');
        $this->form_validation->set_rules('img2', '', 'trim|callback_properMd5');
        $this->form_validation->set_rules('desc2', '', 'trim');
        $this->form_validation->set_rules('img3', '', 'trim|callback_properMd5');
        $this->form_validation->set_rules('desc3', '', 'trim');
        $this->form_validation->set_rules('award', '“Awarded As” must be a string representaion of the prize value.', 'trim|required');
        $this->form_validation->set_rules('value', '“Retail Value” must be an integer value.', 'trim|required|is_natural');
        $this->form_validation->set_rules('type', 'Please select an option for “Email Template”', 'trim|required');

        $this->form_validation->set_message('required', '%s');

        if (!$this->form_validation->run()) {
            return $this->json(XHR_INVALID, validation_errors());
        }

        $prize['title'] = $this->input->post('title');
        $prize['img1']  = $this->input->post('img1');
        $prize['desc1'] = $this->input->post('desc1');
        $prize['img2']  = $this->input->post('img2');
        $prize['desc2'] = $this->input->post('desc2');
        $prize['img3']  = $this->input->post('img3');
        $prize['desc3'] = $this->input->post('desc3');
        $prize['award'] = $this->input->post('award');
        $prize['value'] = $this->input->post('value');
        $prize['type']  = $this->input->post('type');

        $this->load->model('adminModel');

        $result = $this->adminModel->createPrize($prize);

        if (!$result) {
            return $this->json(XHR_ERROR);
        }

        return $this->json(XHR_OK, array('prize_id' => $result));
    }

    /**
     * POST/json: Update a prize
     *
     * @param   array   $prize
     *
     * @return  json
     */
    public function updatePrize($prize_id)
    {
        $this->load->model('adminModel');

        $this->form_validation->set_rules('title', 'Title required.', 'trim|required');
        $this->form_validation->set_rules('img1', 'The first image is required.', 'trim|required|callback_properMd5');
        $this->form_validation->set_rules('desc1', '', 'trim');
        $this->form_validation->set_rules('img2', '', 'trim|callback_properMd5');
        $this->form_validation->set_rules('desc2', '', 'trim');
        $this->form_validation->set_rules('img3', '', 'trim|callback_properMd5');
        $this->form_validation->set_rules('desc3', '', 'trim');

        $existing_prize = $this->adminModel->getPrize($prize_id);

        if (!$existing_prize['immutable']) {
            $this->form_validation->set_rules('award', '“Awarded As” must be a string representaion of the prize value.', 'trim|required');
            $this->form_validation->set_rules('value', '“Retail Value” must be an integer value.', 'trim|required|is_natural');
            $this->form_validation->set_rules('type', 'Please select an option for “Email Template”', 'trim|required');
        }

        $this->form_validation->set_message('required', '%s');

        if (!$this->form_validation->run()) {
            return $this->json(XHR_INVALID, validation_errors());
        }

        $prize['title'] = $this->input->post('title');
        $prize['img1']  = $this->input->post('img1');
        $prize['desc1'] = $this->input->post('desc1');
        $prize['img2']  = $this->input->post('img2');
        $prize['desc2'] = $this->input->post('desc2');
        $prize['img3']  = $this->input->post('img3');
        $prize['desc3'] = $this->input->post('desc3');

        if (!$existing_prize['immutable']) {
            $prize['award'] = $this->input->post('award');
            $prize['value'] = $this->input->post('value');
            $prize['type']  = $this->input->post('type');
        }

        $result = $this->adminModel->updatePrize($prize_id, $prize);

        if (!$result) {
            return $this->json(XHR_ERROR);
        }

        // Purge the cache of every URL that could possibly exist for this prize

        // get a list of all dates/contests for this prize
        $dates = $this->adminModel->getContestDatesByPrizeId($prize_id);

        $this->load->library('RDPurge');
        if ($dates) {
            foreach ($dates as $date) {
                // issue RDPurge requests for each /prize/YYYY-MM-DD url
                $this->rdpurge->purge('/prize/' . $date['date']);
            }
        }

        // also purge /winners
        $this->rdpurge->purge('/winners');

        // also purge the homepage
        $this->rdpurge->purge('/');

        return $this->json(XHR_OK);
    }

    /**
     * POST/json: addContest
     *
     * add a flight date to a prize
     * - flight date must be in the future
     * - flight date must not already be assigned to another prize
     *
     * @return  json
     */
    public function addContest()
    {
        $prize_id = (int) $this->input->post('prize_id');
        $date     = sanitizeDate($this->input->post('date'));

        if (!$prize_id || !$date) {
            return $this->json(XHR_INVALID, 'Invalid prize_id or date');
        }

        $this->load->model('adminModel');

        $success = $this->adminModel->addContest($prize_id, $date);
        if (!$success) {
            $c = array_shift($this->adminModel->getContestsByDateRange($date, $date));
            // this contest date already exists for another prize (or this prize)
            return $this->json(XHR_DUPLICATE, sprintf('<a href="/admin/prize/%s" target="_blank">%s</a> is already scheduled for %s', $c['prize_id'], $c['prize_title'], $date));
        } else {
            // no need to purge here since it doesn't exist yet
            return $this->json(XHR_OK);
        }

    }

    /**
     * POST/json: delContest
     *
     * remove a flight date from a prize
     * - flight date must be in the future
     *
     * @return  json
     */
    public function delContest()
    {
        $prize_id = (int) $this->input->post('prize_id');
        $date     = sanitizeDate($this->input->post('date'));

        $response = array();

        if (!$prize_id || !$date) {
            return $this->json(XHR_INVALID, 'Invalid prize_id or date');
        }

        if (strtotime(date('Y-m-d')) >= strtotime($date)) {
            return $this->json(XHR_ERROR, 'Unable to delete a past or present flight date.');
        }

        $this->load->model('adminModel');

        $success = $this->adminModel->delContest($prize_id, $date);

        if ($success) {
            // Purge the cache for 1) the homepage and 2) /winners
            $this->load->library('RDPurge');
            $this->rdpurge->purge('/prize/' . $date);
            return $this->json(XHR_OK);
        } else {
            return $this->json(XHR_NOT_FOUND, $date . ' was not a flight date (contest) for this prize. It was most likely removed since you’ve loaded this page. It’s recommended that you <a onclick="window.location.reload()">refresh</a> this page.');
        }
    }

    /**
     * POST/json: altContest
     *
     * pick an alternate winner (runner-up) for a contest
     * - flight date must be in the past
     *
     * @return  json
     */
    public function altContest()
    {
        // prize id is not needed for this call
        $prize_id = (int) $this->input->post('prize_id');
        $date     = sanitizeDate($this->input->post('date'));

        $response = array();

        if (!$prize_id || !$date) {
            return $this->json(XHR_INVALID, 'Invalid prize_id or date');
        }

        if (strtotime($date) >= strtotime(date('Y-m-d'))) {
            return $this->json(XHR_INVALID, 'This contest is still running. You must wait until after midnight tonight to select an alternate winner.');
        }

        $this->load->model('adminModel');

        $user = $this->adminModel->pickWinner($date);

        switch (true) {
            case $user == -1:
                return $this->json(XHR_NOT_FOUND, 'No contest exists on ' . $date . '.');
            case $user == -2:
                return $this->json(XHR_NOT_FOUND, 'We do not have any other entries on ' . $date . '.');
            case @$user['id'] >= 1:
                // Purge the cache for 1) the homepage and 2) /winners
                $this->load->library('RDPurge');
                $this->rdpurge->purge('/winners');
                // also purge the homepage
                $this->rdpurge->purge('/');
                return $this->json(XHR_OK, array('winner' => $user));
            default:
                return $this->json(XHR_ERROR);
        }
    }

    /**
     * POST/json: Upload JPG prize image(s)
     *
     * These are stored in the DB and filesystem as a MD5
     *
     */
    public function upload()
    {
        $r = array();

        // process $_FILES['img']
        if (!@$_FILES['img']) {
            return $this->json(XHR_ERROR, 'bad request');
        }

        $file = $_FILES['img'];

        if ((int) $file['size'] == 0) {
            return $this->json(XHR_ERROR, 'zero byte file upload');
        }

        $save_to = rtrim(config_item('prize_image_dir'), '/') . '/' . $file['md5'] . '.jpg';

        if (!file_exists($save_to)) {
            if (!@rename($file['tmp_name'], $save_to)) {
                return $this->json(XHR_ERROR, 'failed to rename file, check upload path file permissions');
            }
            @chmod($save_to, 0666);
        } else {
            // we already have it, so just delete the uploaded tmp file
            @unlink($file['tmp_name']);
        }

        $r['md5'] = $file['md5'];
        $r['url'] = sprintf('%s/%s.jpg', rtrim(config_item('prize_image_uri'), '/'), $file['md5']);

        // return similar prizes with same prize image in img1, img2, img3
        // return similar prizes with same prize image in img1, img2, img3
        // return similar prizes with same prize image in img1, img2, img3
        // return similar prizes with same prize image in img1, img2, img3
        // return similar prizes with same prize image in img1, img2, img3
        // return similar prizes with same prize image in img1, img2, img3
        // return similar prizes with same prize image in img1, img2, img3

        return $this->json(XHR_OK, $r);
    }

    /**
     * Proper MD5 sum
     *
     * @param   string  $str
     *
     * @return  string  md5 or "" on failure
     */
    public function properMd5($str)
    {
        $str = preg_replace('/[^0-9a-z]/', '', strtolower($str));
        if (!strlen($str) == 32) {
            $this->form_validation->set_message('properMd5', 'Invalid image md5.');
            return null;
        } else {
            return $str;
        }
    }

    /**
     * Find the closest date that will fit in the dashboard calendar
     *
     * @param   integer $timestamp
     *
     * @return  date
     */
    protected function closestModXDate($timestamp, $x = 4)
    {
        // days in the month
        $t = (int) date('t', $timestamp);

        // day requested
        $d = (int) date('j', $timestamp);

        while ($d > 0 && ($t + 1 - $d) % $x !== 0) {
            $d--;
        }
        return date('Y-m-', $timestamp) . str_pad($d, '0', STR_PAD_LEFT);
    }

}
