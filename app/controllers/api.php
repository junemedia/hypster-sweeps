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
     * POST/json: Evaluate user's response to Solve Media's captcha
     *
     * Anonymous is OK, so it is safe to use this before a login/signup form.  Session
     * will only be created if user's response is valid.
     *
     * @return  json
     */
    public function captcha()
    {

        // foregoing CI validation on the two fields
        $challenge = $this->input->post('adcopy_challenge');
        $answer    = $this->input->post('adcopy_response');

        // blank response?
        if (!$answer) {
            return $this->json(XHR_INVALID, 'Please provide a response, or click on the reload button to load different puzzles.');
        }

        // this should never happen, but the challenge wasn't provided
        if (!$challenge) {
            return $this->json(XHR_ERROR, 'Something bad happened. Please reload this page and try again.');
        }

        $ip = $this->input->ip_address();

        $this->load->library('SolveMedia');
        $solve = $this->solvemedia->solve($ip, $challenge, $answer);

        if (!$solve['valid']) {
            return $this->json(
                XHR_INVALID,
                'Incorrect. Please try again or click on the reload button to load different puzzles.'
            );
        }

        // store the fact that this is a human in the session
        $this->session->set_userdata('human', true);

        return $this->json(XHR_OK);

    }

    /**
     * POST/json: Check Eligibility
     *
     * Must return "midnight" in successful JSON response so that
     * localStorage can expire at the correct time: EST midnight
     *
     */
    public function eligible()
    {
        $r['eligible'] = false;

        // load user_id from session
        $user_id = $r['user_id'] = $this->session->userdata('user_id');

        // logged-in check
        if (!$user_id) {
            return $this->json(XHR_AUTH, 'You must be logged-in in order to check contest eligibility.');
        }

        $this->load->model('prizeModel');

        // eligible for today?
        $r['eligible'] = $this->prizeModel->isEligible(
            $user_id,
            $this->site_id);
        $r['midnight'] = strtotime('tomorrow');

        return $this->json(XHR_OK, $r);

    }

    /**
     * POST/json: Enter user into the contest
     *
     * Must return "midnight" in successful JSON response so that
     * localStorage can expire at the correct time: EST midnight
     *
     */
    public function enter()
    {
        $r = array();

        // load user_id from session
        $user_id = $this->session->userdata('user_id');

        // logged-in check
        if (!$user_id) {
            return $this->json(XHR_AUTH, 'You must be logged-in in order to enter this contest.');
        }

        // human check
        if (!$this->session->userdata('human')) {
            return $this->json(XHR_HUMAN, 'Please solve the captcha puzzle before entering this contest.');
        }

        // Enter the user into the contest
        $this->load->model('prizeModel');

        // Thank you page HTML snippet on success;
        // null if successful but no thank you copy;
        // (int) 0 if error;
        // (int) -1 if duplicate
        $success = $this->prizeModel->enter(
            $user_id,
            $this->site_id
        );

        switch (true) {
            case $success === null:
            case strlen($success) > 0:
                $r['html'] = $success;
                $r['midnight'] = strtotime('tomorrow');
                return $this->json(XHR_OK, $r);
            case $success === -1:
                // duplicate
                $r['midnight'] = strtotime('tomorrow');
                return $this->json(XHR_DUPLICATE, 'You have already entered today.');
                break;
            default:
            case $success === 0:
                // failed for a reason other than duplicate
                return $this->json(XHR_ERROR, 'We encountered an error while trying to enter you into this contest. Please try again later.');
                break;
        }
    }

    /**
     * POST/json: Register/update a user
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
            return $this->json(XHR_INVALID, validation_errors());
        }

        // human check
        if (!$this->session->userdata('human')) {
            return $this->json(XHR_HUMAN, 'Please solve the captcha puzzle before entering this contest.');
        }

        // Lookup city/state
        if ($this->input->post('zip')) {
            $this->load->library('RDGeo');
            $geo = $this->rdgeo->lookup($this->input->post('zip'));
            if (!@$geo || !@$geo['city'] || !@$geo['state']) {
                return $this->json(XHR_INVALID, 'Invalid Zip Code');
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

        $r = array();

        switch (true) {
            case ($result == -2):
                return $this->json(XHR_NOT_FOUND, 'This user does not exist.');
                break;
            case ($result == -1):
                return $this->json(XHR_DUPLICATE, 'This email address is already registered.');
                break;
            default:
                return $this->json(XHR_ERROR);
                break;
            case ($result > 0):
                if ($is_new_reg) {
                    // authentication successful, save this in the session
                    // effectively "logging in the user" during registrations
                    $this->session->set_userdata('user_id', $result);
                    $r['user_id'] = $result;
                } else {
                    $r['user_id'] = $profile['id'];
                }
                if ($is_new_reg || (!$is_new_reg && $result == 1)) {
                    // send a verification email for new registrations
                    // and updates where email address is updated
                    $this->verify();
                }
                if (@$profile['firstname']) {
                    // send back first name
                    $r['name'] = $profile['firstname'];
                }
                break;
        }

        return $this->json(XHR_OK, $r);
    }

    /**
     * POST/json: Authenticate user
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

        $r = array();

        if (!$this->form_validation->run()) {
            return $this->json(XHR_INVALID, validation_errors());
        }

        $this->load->model('userModel');

        $user = $this->userModel->login($this->input->post('email'), $this->input->post('password'));

        if (!$user) {
            return $this->json(XHR_INVALID, 'Invalid email or password.');
        }

        // authentication successful, save this in the session
        // effectively "logging in the user"
        $this->session->set_userdata('user_id', $user['id']);
        // set is_admin if applicable (null will delete is_admin = true)
        $this->session->set_userdata('is_admin', ($user['role'] == 2) ? true : null);

        // eligible for today?
        $this->load->model('prizeModel');
        $r['eligible'] = $this->prizeModel->isEligible(
            $user['id'],
            $this->site_id);
        $r['midnight'] = strtotime('tomorrow');
        $r['name']     = $user['firstname'];
        $r['user_id']  = $user['id'];
        return $this->json(XHR_OK, $r);
    }

    /**
     * Destroy the user session
     */
    public function logout()
    {
        $this->session->sess_destroy();
        $this->json(XHR_OK);
    }

    /**
     * POST/json: Reset password using a token
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
            return $this->json(XHR_INVALID, validation_errors());
        }

        $password = $this->input->post('password');
        $token    = $this->input->post('token');

        $this->load->model('userModel');

        if (!$this->userModel->reset($token, $password, config_item('token_ttl'))) {
            return $this->json(XHR_EXPIRED, 'Your reset token has expired or is invalid. Please reset your password again on the <a href="/">signup page</a>.');
        }

        return $this->json(XHR_OK);
    }

    /**
     * POST/json: (Re)send a verificaiton email
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
            return $this->json(XHR_AUTH, 'You must be logged-in in order to send a verification email.');
        }

        $this->load->model('userModel');

        // create a new email verification token
        list($token, $email) = $this->userModel->getEmailVerificationToken($user_id);
        if (!$token) {
            return $this->json(XHR_ERROR);
        }

        $this->load->library('email');
        $this->load->library('parser');

        // find correct "From:" in config/project.php:
        $froms = config_item('from');
        if (@$froms[$this->site_slug]) {
            $from_email = $froms[$this->site_slug]['email'];
            $from_name  = $froms[$this->site_slug]['name'];
        } else {
            $from_email = $froms['default']['email'];
            $from_name  = $froms['default']['name'];
        }

        $params = array('link' => 'http://' . $_SERVER['HTTP_HOST'] . '/verify/' . $token);
        $this->email->clear();
        $this->email->from($from_email, $from_name);
        $this->email->to($email);
        $this->email->subject('Please Verify Your Email Address');
        $this->email->message($this->parser->parse('../templates/verify', $params, true));
        $this->email->send();

        return $this->json(XHR_OK);
    }

    /**
     * POST/json: Execute a forgot password request
     *
     *
     */
    public function forgot()
    {
        $this->load->library('form_validation');
        $this->form_validation->set_rules('email', 'Email Address', 'trim|required|valid_email|callback_properEmail');

        if (!$this->form_validation->run()) {
            return $this->json(XHR_INVALID, 'Please double check your email address');
        }

        $email = $this->input->post('email');

        $this->load->model('userModel');

        if (!$token = $this->userModel->getPasswordResetToken($email)) {
            return $this->json(XHR_NOT_FOUND, 'We cannot find that email address.');
        }

        $this->load->library('email');
        $this->load->library('parser');

        // find correct "From:" in config/project.php:
        $froms = config_item('from');
        if (@$froms[$this->site_slug]) {
            $from_email = $froms[$this->site_slug]['email'];
            $from_name  = $froms[$this->site_slug]['name'];
        } else {
            $from_email = $froms['default']['email'];
            $from_name  = $froms['default']['name'];
        }

        $params = array('link' => 'http://' . $_SERVER['HTTP_HOST'] . '/reset/' . $token);
        $this->email->clear();
        $this->email->from($from_email, $from_name);
        $this->email->to($email);
        $this->email->subject('Reset Your June Media Sweepstakes Password');
        $this->email->message($this->parser->parse('../templates/reset', $params, true));
        $this->email->send();

        return $this->json(XHR_OK, 'We’ve sent you an email with password reset instructions.');
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
     * TODO
     * TODO
     * TODO
     * TODO
     * TODO
     * TODO
     * TODO
     * TODO
     * TODO
     * TODO
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
