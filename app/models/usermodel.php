<?php

class UserModel extends CI_Model
{

    /**
     * Register a new user
     *
     * @param  array    ($user object)
     *                   email
     *                   password
     *                   ip
     *                   firstname
     *                   lastname
     *                   address
     *                   city
     *                   state
     *                   zip
     *
     * @return int      user_id on success, 0 on failure, -1 on duplicate email
     */
    public function register($user)
    {
        if (@$user['password']) {
            $user['salt']     = sha1(mktime(true) * mt_rand());
            $user['password'] = sha1($user['salt'] . $user['password']);
        }
        if (@$user['email']) {
            // THIS NEEDS TO BE DONE IN MYSQL OR WE NEED TO CHECK TO SEE IF WE
            // ARE CHANGING EMAIL ADDRESSES BEFORE UNVERIFYING IT.
            $user['verified'] = 0;
            $user['date_verified'] = NULL;
// NEED TO CREATE/SEND A VERIFICATION TOKEN/EMAIL
        }
        if (@$user['id'] > 0) {
            $user_id = $user['id'];
            unset($user['id']);
            $this->db
                 ->where('id', $user_id)
                 ->update('user', $user);
            // affected_rows() will be 0 if nothing was updated, but still successful
            return $this->db->affected_rows() >= 0 ? $user_id : (($this->db->_error_number() === 1062) ? -1 : 0);
        } else {
            $this->db->insert('user', $user);
            if ($user_id = $this->db->insert_id()) {
                return $user_id;
            } else {
                return ($this->db->_error_number() === 1062) ? -1 : 0;
            }
        }
    }

    /**
     * Retrieve winner objects by date range
     *
     * @param  string   $email
     * @param  string   $password
     *
     * @return array    user array or empty array
     */
    public function login($email, $password)
    {
        return $this->db
                    ->select('id, email, role, firstname, lastname, address, city, state, zip')
                    ->where('email', $email)
                    ->where(sprintf('`password`=SHA1(CONCAT(`salt`, "%s"))', $password), null, false)
                    ->get('user')
                    ->row_array();
    }

    /**
     * Verify a users email address
     *
     * @param  string   $token
     *
     * @return boolean
     */
    public function verify($token)
    {
        $result = $this->db
                       ->select('email')
                       ->where('token', $token)
                       ->where('type', 'verify')
                       ->where(sprintf('`timestamp` > FROM_UNIXTIME(%d)', time() - $ttl), null, false)
                       ->get('reset')
                       ->row_array();
        if (!$result || !$result['email']) {
            return false;
        }
        $user = array(
            'verified'      => 1,
            'date_verified' => date('Y-m-d H:i:s'),
        );
        $this->db
             ->update('user', $user)
             ->where('email', $email);
        $success = ($this->db->affected_rows() >= 1) ? true : false;
        // remove verification token
        $this->db
             ->where('email', $email)
             ->delete('reset');
        return $success;
    }

    /**
     * Generate a password reset token
     *
     * @param  string   $email
     *
     * @return string   $token
     */
    public function getPasswordResetToken($email)
    {
        $reset = array(
            'token' => mtRandStr(8),
            'email' => $email,
            'type'  => 'reset',
        );
        // delete any pre-existing reset tokens for this email address
        $this->db
             ->where('email', $email)
             ->where('type', 'reset')
             ->delete('reset');
        // insert this reset token
        $this->db
             ->insert('reset', $reset);
// var_dump($this->db->last_query());
        if ($this->db->affected_rows() <= 0) {
            return false;
        }
        return $reset['token'];
    }

    /**
     * Change password with reset token or by user_id
     *
     * @param  string   $token_or_user_id
     * @param  string   $password
     *
     * @return boolean
     */
    public function password($token_or_user_id, $password, $ttl = 86400)
    {
        if ($is_token = !is_numeric($token_or_user_id)) {
            $token = $token_or_user_id;
            $user  = $this->db
                          ->select('user.id, user.email')
                          ->join('user', 'user.email = reset.email')
                          ->where('token', $token)
                          ->where(sprintf('`timestamp` > FROM_UNIXTIME(%d)', time() - $ttl), null, false)
                          ->get('reset')
                          ->row_array();
            if (!$user) {
                return false; // token not found
            }
            $user_id = $user['id'];
            $email   = $user['email'];
        } else {
            $user_id = (int) $token_or_user_id;
        }

        if (!$user_id > 0) {
            return false;
        }

        $user             = array();
        $user['salt']     = sha1(mktime(true) * mt_rand());
        $user['password'] = sha1($user['salt'] . $password);

        if ($is_token) {
            // reset tokens verify email addresses
            $user['verified']      = 1;
            $user['date_verified'] = date('Y-m-d H:i:s');
            // clear any reset tokens for this email address
            $this->db
                 ->where('email', $email)
                 ->where('type', 'reset')
                 ->delete('reset');
        }
        $this->db
             ->where('id', $user_id)
             ->update('user', $user);
// echo $this->db->last_query();
        return ($this->db->affected_rows() >= 1) ? true : false;
    }

}
