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
     *
     * You cannot resend a verification email from here, because
     * you don't know for certain what the email address is
     * on failure.
     *
     */
    public function verify($token = null)
    {
        $data['site_slug'] = $this->site_slug;
        $data['meta']['title'] = 'Email Verification';

        if (!$token) {
            $data['status'] = 2;
            $data['msg']    = 'Invalid or expired verification token.';
            $this->load->view('verify', $data);
            return;
        }

        $this->load->model('userModel');

        if (!$this->userModel->verify($token)) {
            $data['status'] = 2;
            $data['msg']    = 'Invalid or expired verification token.';
            $this->load->view('verify', $data);
            return;
        }

        $data['status'] = 1;
        $this->load->view('verify', $data);
    }

    /**
     * Reset password
     */
    public function reset()
    {
    }

}
