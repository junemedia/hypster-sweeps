<?php

/**
 * API Controller
 */

class Api extends FrontendController
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
     *
     * Must return "midnight" in successful JSON response so that
     * localStorage can expire at the correct time: EST midnight
     *
     */
    public function eligible()
    {
        $response['eligible'] = false;

        // load user_id from session
        $user_id = $this->session->userdata('user_id');

        // logged-in check
        if (!$user_id) {
            $response['err'] = 1;
            $response['msg'] = 'You must be logged-in in order to check contest eligibility.';
            return $this->json($response);
        }

        $this->load->model('prizeModel');

        // eligible for today?
        $response['eligible'] = $this->prizeModel->isEligible(
            $user_id,
            $this->site_id);
        $response['midnight'] = strtotime('tomorrow');

        return $this->json($response);

    }

    /**
     * Enter user into the contest
     *
     * Must return "midnight" in successful JSON response so that
     * localStorage can expire at the correct time: EST midnight
     *
     */
    public function enter()
    {
        $response = array();

        // load user_id from session
        $user_id = $this->session->userdata('user_id');

        // logged-in check
        if (!$user_id) {
            $response['err'] = 1;
            $response['msg'] = 'You must be logged-in in order to enter this contest.';
            return $this->json($response);
        }

        // Enter the user into the contest
        $this->load->model('prizeModel');

        // Using INSERT IGNORE, CI cannot tell us the affected_rows()
        // or anything else useful here.
        // So, if $success evaluates to true, then assume the user
        // has been entered into the contest.
        $success = $this->prizeModel->enter(
            $user_id,
            $this->site_id
        );

        if (!$success) {
            $response['err'] = 1;
            $response['msg'] = 'We encountered an error while trying to enter you into this contest. Please try again later.';
            return $this->json($response);
        }

        $response['success']  = 1;
        $response['midnight'] = strtotime('tomorrow');

        return $this->json($response);
    }

    /**
     * Register/update a user
     *
     * This can be called to update profile with the address requirements
     * or to create a user from scratch.
     *
     */
    public function signup()
    {
        $profile = array();

        $this->load->library('form_validation');

        if (!($user_id = $this->session->userdata('user_id'))) {
            $is_new_reg = true;
            // New Users
            $this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email|callback_properEmail');
            $this->form_validation->set_rules('password', 'Password', 'callback_checkPassword');
            $this->form_validation->set_rules('firstname', 'First Name', 'trim|required|callback_properName');
            $this->form_validation->set_rules('lastname', 'Last Name', 'trim|required|callback_properName');
            $this->form_validation->set_rules('address', 'Address', 'trim|required|callback_properAddress');
            $this->form_validation->set_rules('zip', 'Zip Code', 'trim|required|is_natural|min_length[5]');
        } else {
            $is_new_reg = false;
            // Profile Updates
            $this->form_validation->set_rules('email', 'Email', 'trim|valid_email|callback_properEmail');
            $this->form_validation->set_rules('firstname', 'First Name', 'trim|callback_properName');
            $this->form_validation->set_rules('lastname', 'Last Name', 'trim|callback_properName');
            $this->form_validation->set_rules('address', 'Address', 'trim|callback_properAddress');
            $this->form_validation->set_rules('zip', 'Zip Code', 'trim|is_natural|min_length[5]');
            if ($this->input->post('password')) {
                $this->form_validation->set_rules('password', 'Password', 'callback_checkPassword');
            }
        }

        if (!$this->form_validation->run()) {
            $response['err'] = 1;
            $response['msg'] = validation_errors();
            return $this->json($response);
        }

        // Lookup city/state
        if ($this->input->post('zip')) {
            $this->load->library('RDGeo');
            $geo = $this->rdgeo->lookup($this->input->post('zip'));
            if (!@$geo || !@$geo['city'] || !@$geo['state']) {
                $response['err'] = 1;
                $response['msg'] = "Invalid Zip Code";
                return $this->json($response);
            }
        }

        // Set the profile to be passed to Registration Services
        $profile['id']        = $user_id;
        $profile['firstname'] = $this->input->post('firstname');
        $profile['lastname']  = $this->input->post('lastname');
        $profile['address']   = $this->input->post('address');
        $profile['city']      = @$geo['city'];
        $profile['state']     = @$geo['state'];
        $profile['zip']       = $this->input->post('zip');
        $profile['email']     = $this->input->post('email');
        $profile['password']  = $this->input->post('password');
        $profile['ip']        = $this->input->ip_address();

        // remove empty/null/false values; CAREFUL: removes boolean false values
        $profile = array_filter($profile);

        // save in DB
        $this->load->model('userModel');
        $result = $is_new_reg ? $this->userModel->register($profile) : $this->userModel->update($profile);

        $response = array();

        switch (true) {
            case ($result == -2):
                $response['err'] = 1;     // user does not exist
                $response['msg'] = "This user does not exist.";
                break;
            case ($result == -1):
                $response['err'] = 2;     // duplicate user
                $response['msg'] = "This email address is already registered.";
                break;
            default:
                $response['err'] = 1;     // general error
                $response['msg'] = "We encountered a server error. Please try again.";
                break;
            case ($result > 0):
                if ($is_new_reg) {
                    // authentication successful, save this in the session
                    // effectively "logging in the user" during registrations
                    $this->session->set_userdata('user_id', $result);
                }
                if ($is_new_reg || (!$is_new_reg && $result == 1)) {
                    // send a verification email for new registrations
                    // and updates where email address is updated
                    $this->verify();
                }
                if (@$profile['firstname']) {
                    // send back first name
                    $response['name'] = $profile['firstname'];
                }
                break;
        }

        return $this->json($response);
    }

    /**
     * Authenticate user
     *
     * Accept email/password; return JSON of eligible: true/false
     *
     * Must return "midnight" in successful JSON response so that
     * localStorage can expire at the correct time: EST midnight
     *
     */
    public function login()
    {
        $this->load->library('form_validation');

        $this->form_validation->set_rules('email', 'Email', 'trim|required|valid_email|callback_properEmail');
        $this->form_validation->set_rules('password', 'Password', 'required');

        $response = array();

        if (!$this->form_validation->run()) {
            $response['err'] = 1;
            $response['msg'] = validation_errors();
            return $this->json($response);
        }

        $this->load->model('userModel');

        $user = $this->userModel->login($this->input->post('email'), $this->input->post('password'));

        if (!$user) {
            $response['err'] = 1;
            $response['msg'] = 'Invalid email or password';
            return $this->json($response);
        }

        // authentication successful, save this in the session
        // effectively "logging in the user"
        $this->session->set_userdata('user_id', $user['id']);
        // set is_admin if applicable (null will delete is_admin = true)
        $this->session->set_userdata('is_admin', ($user['role'] == 2) ? true : null);

        // eligible for today?
        $this->load->model('prizeModel');
        $response['eligible'] = $this->prizeModel->isEligible(
            $user['id'],
            $this->site_id);
        $response['midnight'] = strtotime('tomorrow');
        $response['name']     = $user['firstname'];
        return $this->json($response);
    }

    /**
     * Destroy the user session
     */
    public function logout()
    {
        $this->session->sess_destroy();
        $this->json(array('success' => 1));
    }

    /**
     * Reset password using a token
     *
     * Authenticated users can change their password in /profile
     *
     */
    public function reset()
    {
        $this->load->library('form_validation');
        $this->form_validation->set_rules('password', 'Password', 'callback_checkPassword');
        $this->form_validation->set_rules('token', 'Password Reset Token', 'trim|required|min_length[8]');

        if (!$this->form_validation->run()) {
            $response['err'] = 1;
            $response['msg'] = validation_errors();
            return $this->json($response);
        }

        $password = $this->input->post('password');
        $token = $this->input->post('token');

        $this->load->model('userModel');

        if (!$this->userModel->reset($token, $password, config_item('token_ttl'))) {
            $response['err'] = 1;
            $response['msg'] = 'Your reset token has expired or is invalid. Please reset your password again on the <a href="/">signup page</a>.';
            return $this->json($response);
        }

        $response['success'] = 1;
        return $this->json($response);
    }

    /**
     * (Re)send a verificaiton email
     *
     * Only used for logged in users.
     *
     */
    public function verify()
    {
        // load user_id from session
        $user_id = $this->session->userdata('user_id');

        // logged-in check
        if (!$user_id) {
            $response['err'] = 1;
            $response['msg'] = 'You must be logged-in in order to send a verification email.';
            return $this->json($response);
        }

        $this->load->model('userModel');

        // create a new email verification token
        list($token, $email) = $this->userModel->getEmailVerificationToken($user_id);
        if (!$token) {
            $response['err'] = 1;
            $response['msg'] = 'We encountered an error. Please try again.';
            return $this->json($response);
        }

        $this->load->library('email');
        $this->load->library('parser');

        $params = array('link' => 'http://' . $_SERVER['HTTP_HOST'] . '/verify/' . $token);
        $this->email->clear();
        $this->email->from(config_item('from_email'), config_item('from_name'));
        $this->email->to($email);
        $this->email->subject('Please Verify Your Email Address');
        $this->email->message($this->parser->parse('../templates/verify', $params, true));
        $this->email->send();

        $response['success'] = 1;
        return $this->json($response);
    }

    /**
     * Execute a forgot password request
     *
     *
     */
    public function forgot()
    {
        $this->load->library('form_validation');
        $this->form_validation->set_rules('email', 'Email Address', 'trim|required|valid_email|callback_properEmail');

        if (!$this->form_validation->run()) {
            $response['err'] = 1;
            $response['msg'] = 'Please double check your email address';
            return $this->json($response);
        }

        $email = $this->input->post('email');

        $this->load->model('userModel');

        if (!$token = $this->userModel->getPasswordResetToken($email)) {
            $response['err'] = 1;
            $response['msg'] = 'We cannot find that email address.';
            return $this->json($response);
        }

        $this->load->library('email');
        $this->load->library('parser');

        $params = array('link' => 'http://' . $_SERVER['HTTP_HOST'] . '/reset/' . $token);
        $this->email->clear();
        $this->email->from(config_item('from_email'), config_item('from_name'));
        $this->email->to($email);
        $this->email->subject('Reset Your June Media Sweepstakes Password');
        $this->email->message($this->parser->parse('../templates/reset', $params, true));
        $this->email->send();

        $response['msg'] = 'We’ve sent you an email with password reset instructions.';
        $response['success'] = 1;
        return $this->json($response);
    }

    /**
     * Ensures password complies with Meredith Registration Services v1.6.6
     *
     * @param string $str
     *
     * @return boolean
     */
    public function checkPassword($str)
    {
        // At least one character must be a Capital or special character).
        // (Special characters accepted are {!"# $%&'()*+-./:;,<=>?@[]^_`{| }~})
        // Minimum 6 characters, max 20 characters
        if (preg_match('/^(?=.*[A-Z!@#$,.%\/^&\'"*()\-_=+`~\[\]{}?|]).{6,20}$/', $str)) {
            return true;
        } else {
            $this->form_validation->set_message('checkPassword', 'The %s field must be from 6 to 20 characters in length. Must contain at least one capital letter or special character.');
            return false;
        }
    }

    /**
     * Proper case of names
     *
     * @param  string $str
     *
     * @return string or "" on failure
     */
    public function properName($str)
    {
        return proper($str);
    }

    /**
     * Proper email address
     *
     * @param  string $str
     *
     * @return string or "" on failure
     */
    public function properEmail($str)
    {
        return trim(mb_strtolower($str));
    }

    /**
     * TODO
     * Proper street address
     *
     * @param  string $str
     *
     * @return string or "" on failure
     */
    public function properAddress($str)
    {
        return $str;
    }

}
