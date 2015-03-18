<?php

class UserModel extends CI_Model
{

    /**
     * Register a new user
     *
     * @param   array    $user object)
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
     * @return  integer user_id on success,
     *                   0 on failure,
     *                  -1 on duplicate email
     */
    public function register($user)
    {
        // For SPROCs, you MUST use $query->free_result() to avoid
        // getting the "2014 Commands out of sync" mysql error.
        $sql = sprintf('CALL CREATE_USER(%s,%d,%d,%s,%s,%s,%s,%s,%s,%s,%s)',
            $this->db->escape(@$user['ip']),
            @$user['optin'] ? 1 : 0,
            (int) @$user['site_id'],
            $this->db->escape(@$user['email']),
            $this->db->escape(@$user['password']),
            $this->db->escape(@$user['firstname']),
            $this->db->escape(@$user['lastname']),
            $this->db->escape(@$user['address']),
            $this->db->escape(@$user['city']),
            $this->db->escape(@$user['state']),
            $this->db->escape(@$user['zip'])
        );
        $query  = $this->db->query($sql);
        $result = $query->row_array();
        $query->free_result();

        return (int) @$result['result'] ? (int) $result['result'] : 0;
    }

    /**
     * Update a user profile
     *
     * @param   array   $user partial user object
     *
     * @return  integer -2 on user does not exist,
     *                  -1 on duplicate email,
     *                   0 on failure,
     *                   1 on new email,
     *                   2 on success with changes,
     *                   3 on success without any changes
     */
    public function update($user)
    {
        // For SPROCs, you MUST use $query->free_result() to avoid
        // getting the "2014 Commands out of sync" mysql error.
        $sql = sprintf('CALL UPDATE_USER(%s,%s,%s,%s,%s,%s,%s,%s,%s)',
            $this->db->escape(@$user['id']),
            $this->db->escape(@$user['email']),
            $this->db->escape(@$user['password']),
            $this->db->escape(@$user['firstname']),
            $this->db->escape(@$user['lastname']),
            $this->db->escape(@$user['address']),
            $this->db->escape(@$user['city']),
            $this->db->escape(@$user['state']),
            $this->db->escape(@$user['zip'])
        );
        $query  = $this->db->query($sql);
        $result = $query->row_array();
        $query->free_result();

        return (int) @$result['result'] ? (int) $result['result'] : 0;
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
        // For SPROCs, you MUST use $query->free_result() to avoid
        // getting the "2014 Commands out of sync" mysql error.
        $sql = sprintf('CALL LOGIN(%s,%s)',
            $this->db->escape($email),
            $this->db->escape($password)
        );
        $query  = $this->db->query($sql);
        $result = $query->row_array();
        $query->free_result();

        return (array) $result;
    }

    /**
     * Reset password using reset token
     *
     * @param  string   $token
     * @param  string   $password
     * @param  integer  $ttl seconds (optional; default 1 day)
     *
     * @return boolean
     */
    public function reset($token, $password, $ttl = 86400)
    {
        // For SPROCs, you MUST use $query->free_result() to avoid
        // getting the "2014 Commands out of sync" mysql error.
        $sql = sprintf('CALL RESET(%s,%s,%s)',
            $this->db->escape($token),
            $this->db->escape($password),
            $this->db->escape($ttl)
        );
        $query  = $this->db->query($sql);
        $result = $query->row_array();
        $query->free_result();

        return @$result['result'] ? true : false;
    }

    /**
     * Verify a users email address
     *
     * @param  string   $token
     * @param  integer  $ttl seconds (optional; default 1 day)
     *
     * @return boolean
     */
    public function verify($token, $ttl = 86400)
    {
        // For SPROCs, you MUST use $query->free_result() to avoid
        // getting the "2014 Commands out of sync" mysql error.
        $sql = sprintf('CALL VERIFY(%s,%s)',
            $this->db->escape($token),
            $this->db->escape($ttl)
        );
        $query  = $this->db->query($sql);
        $result = $query->row_array();
        $query->free_result();

        return @$result['result'] ? true : false;
    }

    /**
     * Generate a password reset token
     *
     * @param   string  $email
     *
     * @return  string  $token or boolean false if email does not exist
     */
    public function getPasswordResetToken($email)
    {
        // For SPROCs, you MUST use $query->free_result() to avoid
        // getting the "2014 Commands out of sync" mysql error.
        $sql = sprintf('CALL RESET_TOKEN(%s)',
            $this->db->escape($email)
        );
        $query  = $this->db->query($sql);
        $result = $query->row_array();
        $query->free_result();

        return @$result['token'] ? $result['token'] : false;
    }

    /**
     * Generate a password reset token
     *
     * @param   integer $user_id
     *
     * @return  array   of (string) $token, (string) $email
     *                  or (bool) false, (bool) false if email does not exist
     */
    public function getEmailVerificationToken($user_id)
    {
        // For SPROCs, you MUST use $query->free_result() to avoid
        // getting the "2014 Commands out of sync" mysql error.
        $sql = sprintf('CALL VERIFY_TOKEN(%s)',
            $this->db->escape($user_id)
        );
        $query  = $this->db->query($sql);
        $result = $query->row_array();
        $query->free_result();

        return @$result['token'] ? array($result['token'], $result['email']) : array(false, false);
    }

    /**
     * Retrieve a user's profile
     *
     * @param   integer $user_id
     *
     * @return  array   user object
     */
    public function getProfile($user_id)
    {
        return $this->db
                    ->where('id', $user_id)
                    ->get('view_profile')
                    ->row_array();
    }

}
