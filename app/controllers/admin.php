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
    }

    /**
     * sweepstakes
     *
     * @return HTML
     */
    public function sweepstakes()
    {
    }

    /**
     * prize
     *
     * @return GET:HTML, POST:JSON
     */
    public function prize($prize_id)
    {
        switch ($this->server('REQUEST_METHOD')) {
            case 'POST':
                break;
            case 'GET':
                break;
            default:
                show_404;
                break;
        }
    }

    /**
     * Upload JPG prize image(s)
     *
     * These are stored in the DB and filesystem as a MD5
     *
     * This method reads from $_FILES and from $this->input->post('prize_id');
     *
     */
    public function upload()
    {
        $successful = array();
        $response = array();

        // bail if no prize_id included in POST param
        if (! $prize_id = (int)$this->input->post('prize_id')) {
            $this->json(array('err' => 1, 'msg' => 'Invalid prize_id'));
        }

        // process any img1, img2, img3 $_FILES
        foreach ($_FILES as $img_index => $file) {
            if (!in_array($img_index, array('img1', 'img2', 'img3'))) {
                continue;
            }

            if (!$file['tmp_name'] || filesize($file['tmp_name']) == 0) {
                continue;
            }

            $md5 = md5_file($file['tmp_name']);
            $savepath = sprintf('%s/%s.jpg', rtrim(config_item('prize_image_dir'), '/'), $md5);

            // if we already have this image saved, do not re-save, just continue
            if (!file_exists($savepath)) {
                if (!rename($file['tmp_name'], $savepath)) {
                    // handle somehow
                    continue;
                }
            }

            @chmod($savepath, 0666);

            @unlink($file['tmp_name']);

            $uri =  sprintf('%s/%s.jpg', rtrim(config_item('prize_image_uri'), '/'), $md5);

            $successful[$img_index] = $md5;
            $response['uploads'][$img_index] = $uri;
        }


        $this->load->model('adminModel');

        $this->adminModel->setPrizeImage($prize_id, $successful);

// header('Content-Type: text/plain');
// var_dump($_FILES);
// var_dump($this->input->post('prize_id'));
        $this->json($response);
    }

}
