<?php

/**
 * User Controller
 */

class User extends FrontendController
{

    public function __construct()
    {
        parent::__construct();

        // only load the Session library for this controller and all of its actions
        $this->load->library('session');

        // all responses here should never be cached
        $this->rdcache->expires(-1);
    }

    /**
     * Profile
     */
    public function profile()
    {
    }

    /**
     * Verify email address
     */
    public function verify($token = null)
    {
        $data['site_slug'] = $this->site_slug;

        if (!$token) {
            $data['status'] = 2;
            $data['msg']    = 'Invalid or expired verification token.  <a class="verify">Resend verification email</a>.';
            $this->load->view('verify', $msg);
            return;
        }

        $this->load->model('userModel');

        if (!$this->userModel->verify($token)) {
            $data['status'] = 2;
            $data['msg']    = 'Invalid or expired verification token.  <a class="verify">Resend verification email</a>.';
            $this->load->view('verify', $data);
            return;
        }

        $this->load->view('verify');
    }

    /**
     * Reset password
     */
    public function reset()
    {
    }

}
