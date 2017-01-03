<?php

class UserModel extends CI_Model
{
  const USER_GET_URL = 'http://api.hypster.com/user';

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
     * @param   integer $user_id
     * @param   array   $profile
     *
     * @return  integer -2 on user does not exist,
     *                  -1 on duplicate email,
     *                   0 on failure,
     *                   1 on new email,
     *                   2 on success with changes,
     *                   3 on success without any changes
     */
    public function update($user_id, $profile)
    {
      log_message('info', 'usermodel:update');
      log_message('info', "userid: $user_id");
      log_message('info', $_SERVER['REQUEST_METHOD']);
      log_message('info', $_SERVER['HTTP_CONTENT_TYPE']);

      //return $profile;

      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $res = $this->_user_put($user_id, $profile);
        if ($res->status === XHR_OK) {
          return (array) $res->user;
        }
      }
      if ($_SERVER['REQUEST_METHOD'] === 'GET') {

      }
    }


    /**
     * Reset password using reset token
     *
     * @param  string   $token
     * @param  string   $password
     * @param  integer  $ttl seconds (optional; default 1 day) //Updated default to 365 days 48hrs andrewb@junemedia.com
     *
     * @return boolean
     */
    public function reset($token, $password, $ttl = 31104000)
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
     * @param  integer  $ttl seconds (optional; default 1 day)//Updated default to 3 days andrewb@junemedia.com
     *
     * @return boolean
     */
    public function verify($token, $ttl = 259200)
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
		
		$sql = "SELECT `token` FROM `reset` 
				WHERE `type`='reset' 
				AND `email`=".$this->db->escape($email)." 
				LIMIT 1;";
		
		$query = $this->db->query( $sql );
		
		if ( $query && $query->num_rows() > 0){
			$result = $query->row_array();
			return $result['token'];
		} 
		
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
      // getting back an array with status, message and a user object
      $res = $this->_user_get($user_id);
      if ($res->status === XHR_OK) {
        return (array) $res->user;
      }
      /* return $this->db */
      /*             ->where('id', $user_id) */
      /*             ->get('view_profile') */
      /*             ->row_array(); */
    }

    /**
     * dump user's profile
     *
     * @param   integer $dateStart $dateStop
     *
     * @return  array   user
     */
    public function dumpUserByDate($dateStart, $dateStop){
        $result = $this->db
                    //->select('id,role,verified,ip,optin,site_id,date_register,date_verified,date_updated,email,firstname,lastname,address,city,state,zip')
                    ->select('*')
                    ->where('date_registered >', $dateStart)
                    ->where('date_registered <', $dateStop)
                    ->get('user');


        foreach ($result->result_array() as $row){
                unset($row["password"]);        // We don't have to transfer password field
                $r[] = $row;
        }
        return $r;
    }

    private function _user_get($userid)
    {

      $ch = curl_init(self::USER_GET_URL.'/'.$userid);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      $recd = curl_exec($ch);
      curl_close($ch);

      return json_decode($recd);
    }

  /**
    * PUT user profile info to api server
    *
    * @param integer $user_id
    * @param array $profile
    *
    * @return object
    */
  private function _user_put($userid, $profile)
  {
    $ch = curl_init(self::USER_GET_URL.'/'.$userid);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($profile));

    $recd = curl_exec($ch);
    curl_close($ch);
    log_message('info', $recd);
    return json_decode($recd);
  }
}
