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
     * index (dashboard)
     *
     * @return HTML
     */
    public function index()
    {
        $this->load->model('adminModel');

        $begin_date = $this->closestModXDate(strtotime('8 days ago'), 7);
        $end_date   = date('Y-m-t', strtotime('+2 months'));

        $contests = $this->adminModel->getContestsByDateRange($begin_date, $end_date);

        $dates   = array();
        $d       = new DateTime($begin_date);
        $one_day = new DateInterval('P1D');
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
     * contests (aka sweepstakes)
     *
     * @param   string  $params CSV of sort/limit/offset options
     *
     * @return  html
     */
    public function contests($params = null)
    {
        $this->load->model('adminModel');
        $data['nav_sweepstakes'] = true;
        $data['contests'] = $this->adminModel->getContestsByDateRange(date('Y-m-d', strtotime('15 days ago')), date('Y-m-d', strtotime('+90 days')));
        $data['stats']    = $this->adminModel->getPrizeStats();
        // return $this->json($response);
        // for now, just return HTML
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
            $response['err'] = 1;
            $response['msg'] = validation_errors();
            return $this->json($response);
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
            return $this->json(array(
                'err' => 1,
                'msg' => 'We encountered a server error. Please try again.',
            ));
        }

        return $this->json(array('success' => true, 'prize_id' => $result));
    }

    /**
     * Update a prize
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
            $response['err'] = 1;
            $response['msg'] = validation_errors();
            return $this->json($response);
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
            return $this->json(array(
                'err' => 1,
                'msg' => 'We encountered a server error. Please try again.',
            ));
        }

        return $this->json(array('success' => true));
    }

    /**
     * addContest
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

        $response = array();

        if (!$prize_id || !$date) {
            $response['err'] = 1;
            $response['msg'] = 'Invalid prize_id or date';
            return $this->json($response);
        }

        $this->load->model('adminModel');

        $success = $this->adminModel->addContest($prize_id, $date);
        if (!$success) {
            $c = array_shift($this->adminModel->getContestsByDateRange($date, $date));
            // this contest date already exists for another prize (or this prize)
            $response['err'] = 1;
            $response['msg'] = sprintf('<a href="/admin/prize/%s" target="_blank">%s</a> is already scheduled for %s', $c['prize_id'], $c['prize_title'], $date);
        } else {
            $response['success'] = true;
        }

        return $this->json($response);
    }

    /**
     * delContest
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
            $response['err'] = 1;
            $response['msg'] = 'Invalid prize_id or date';
            return $this->json($response);
        }

        if (strtotime(date('Y-m-d')) >= strtotime($date)) {
            $response['err'] = 1;
            $response['msg'] = 'Unable to delete a past or present flight date.';
            return $this->json($response);
        }

        $this->load->model('adminModel');

        $success = $this->adminModel->delContest($prize_id, $date);
        if (!$success) {
            // this flight date was not assigned
            $response['err'] = 1;
            $response['msg'] = $date . ' was not a flight date (contest) for this prize. It was most likely removed since you’ve loaded this page. It’s recommended that you <a onclick="window.location.reload()">refresh</a> this page.';
        } else {
            $response['success'] = true;
        }

        return $this->json($response);
    }

    /**
     * altContest
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
            $response['err'] = 1;
            $response['msg'] = 'Invalid prize_id or date';
            return $this->json($response);
        }

        if (strtotime($date) >= strtotime(date('Y-m-d'))) {
            $response['err'] = 1;
            $response['msg'] = 'This contest is still running. You must wait until after midnight tonight to select an alternate winner.';
            return $this->json($response);
        }

        $this->load->model('adminModel');

        $user = $this->adminModel->pickWinner($date);

        switch (true) {
            case $user == -1:
                $response['err'] = 1;
                $response['msg'] = 'No contest exists on ' . $date . '.';
                break;
            case $user == -2:
                $response['err'] = 1;
                $response['msg'] = 'We do not have any other entries on ' . $date . '.';
                break;
            case @$user['id'] >= 1:
                $response['success'] = true;
                $response['winner']  = $user;
                break;
            default:
                $response['err'] = 1;
                $response['msg'] = 'Something bad happened; please try again or contact RD support.' . print_r($success, true);
                break;
        }

        return $this->json($response);
    }

    /**
     * Upload JPG prize image(s)
     *
     * These are stored in the DB and filesystem as a MD5
     *
     */
    public function upload()
    {
        $successful = array();
        $response   = array();

        // process $_FILES['img']
        if (!@$_FILES['img']) {
            $response['err'] = 1;
            $response['msg'] = 'bad request';
            return $this->json($response);
        }

        $file = $_FILES['img'];

        if ((int) $file['size'] == 0) {
            $response['err'] = 1;
            $response['msg'] = 'zero byte file upload';
            return $this->json($response);
        }

        $save_to = rtrim(config_item('prize_image_dir'), '/') . '/' . $file['md5'] . '.jpg';

        if (!file_exists($save_to)) {
            if (!@rename($file['tmp_name'], $save_to)) {
                $response['err'] = 1;
                $response['msg'] = 'failed to rename file, check upload path file permissions';
                return $this->json($response);
            }
            @chmod($save_to, 0666);
        } else {
            // we already have it, so just delete the uploaded tmp file
            @unlink($file['tmp_name']);
        }

        $response['md5'] = $file['md5'];
        $response['url'] = sprintf('%s/%s.jpg', rtrim(config_item('prize_image_uri'), '/'), $file['md5']);

        // return similar prizes with same prize image in img1, img2, img3
        // return similar prizes with same prize image in img1, img2, img3
        // return similar prizes with same prize image in img1, img2, img3
        // return similar prizes with same prize image in img1, img2, img3
        // return similar prizes with same prize image in img1, img2, img3
        // return similar prizes with same prize image in img1, img2, img3
        // return similar prizes with same prize image in img1, img2, img3

        // $this->load->model('adminModel');
        // $this->adminModel->setPrizeImage($prize_id, $successful);

// header('Content-Type: text/plain');
        // var_dump($_FILES);
        // var_dump($this->input->post('prize_id'));
        return $this->json($response);
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
