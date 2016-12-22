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
        // if we're not logged-in, bail
        if (!$user_id = $this->session->userdata('user_id')) {
            return redirect('/');
        }

        $this->load->model('userModel');
        $data = $this->userModel->getProfile($user_id);

        // having 'solvemedia' defined will cause the auto load of partials/captcha
        // in the footer of each shell--directly following the <script> line
        $this->load->library('SolveMedia');
        $data['solvemedia'] = $this->solvemedia->invoke();

        return $this->loadView('profile', $data);
    }

    /**
     * Verify email address
     *
     * ANONYMOUS CONTROLLER: You cannot resend a verification
     * email from here, because you don't know for certain
     * what the email address is on failure.
     *
     */
    public function verify($token = null)
    {
        $data['meta']['title'] = 'Email Verification';

        if (!$token) {
            $data['status'] = 2;
            $data['msg']    = 'Invalid or expired verification token.';
            $this->loadView('verify', $data);
            return;
        }

        $this->load->model('userModel');

        if (!$this->userModel->verify($token)) {
            $data['status'] = 2;
            $data['msg']    = 'Invalid or expired verification token.';
            $this->loadView('verify', $data);
            return;
        }

        $data['status'] = 1;

        return $this->loadView('verify', $data);
    }

    /**
     * Reset password
     */
    public function reset($token = null)
    {
        $data['token'] = $token;
        return $this->loadView('reset', $data);
    }

}
