<?php

/**
 * Solve Media Captcha Genterator
 */

class SolveMedia
{

    protected $ADCOPY_API_SERVER        = "http://api.solvemedia.com";
    protected $ADCOPY_API_SECURE_SERVER = "https://api-secure.solvemedia.com";
    protected $ADCOPY_VERIFY_SERVER     = "verify.solvemedia.com";
    protected $ADCOPY_SIGNUP            = "http://api.solvemedia.com/public/signup";

    // development/staging keys
    protected $challengeKeyStaging    = '-UiGuJh36qy9xacVg5VB8qBGun9ZnQ3g';
    protected $verificationKeyStaging = 'yKKkq1jO7-fSXPFl6szWx-DdESMMvOGP';
    protected $hashKeyStaging         = '3nBAcdUnnIT6zclTwsZWC4jw0HOkkKI-';

    // production keys
    protected $challengeKeys = array(
        'betterrecipes'   => 'aWf51JQPkzQq7wFHnOwpLlWay8LBuCHc',
        'bhg'             => 'MMT6vxD1XAgtur78Ql2KVHdkP10tf1NZ',
        'fitnessmagazine' => 'qD0S8DrQyy5RAojZnIotAWJz6kQybGPo',
        'parents'         => 'KEpwTBr-uJoLaAoeMRfZQ2kcDnuGHPxT',
        'bettertv'        => 'fyRMm.pkxgGz8AA0BAJKyo9fBC-nii5Y',
        'more'            => '9U5NRDoSL1GxLsUJdV5NiIVx5s.V4.e.',
        'lhj'             => '4RXLEjx-9hHZK5nDwI8eYiAh9KNs2AdG',
        'recipe'          => 'xy9j4LLkKBHa4kFK41C-SmydGzLDgE-S',
        'familycircle'    => '0IcQqsvJlEn2maDcOGDyk3xVTb8xNC8a',
        'divinecaroline'  => 'ive5UOvWyMhovh6v.drSA22GHkYvQ2iM',
    );
    protected $verificationKeys = array(
        'betterrecipes'   => '5znbJXaxjPI5HVUm-FGICwvrffYB5Fj.',
        'bhg'             => 'uJlAWx6B3T2N7suRb23jHRSX-vhP8Gmm',
        'fitnessmagazine' => 'SgLlowmJOXRrqj6oQ9ygQzTzEnNngv3I',
        'parents'         => 'VDqQXB3899oD717jj3Ibkp862OcaBJ8O',
        'bettertv'        => 'wdx8ijnJATc.LtoaKuYfkz0IwZH7BNo3',
        'more'            => '9ya9ucupLaC3z4Ml95F07680FkKJek8u',
        'lhj'             => 'KLtXD65bkv0rVnezp8y8Qv38qHpGdKDg',
        'recipe'          => 'QAoAC9aQyedSwWbFEhnxFH1Ix401TM1n',
        'familycircle'    => 'NW2XsKlA.mB3Z9DxffZAdAMhwdTHOoP7',
        'divinecaroline'  => 'FpSxzCNF0a0pWvppwdZ9OSOyHa5d2bLR',
    );
    protected $hashKeys = array(
        'betterrecipes'   => 'JWksBFhNBL2pNCKL.vOfyGzbeIaa-EQg',
        'bhg'             => 'U4QbJx7T4S.-kD.D-B801iVjRNTcL1Or',
        'fitnessmagazine' => '05DdCnvpB19cYFAfqfLG6xYrJZmF-jN1',
        'parents'         => 'Qk2G25NfuyOIpcJQrwMCS7cg0P0jxp42',
        'bettertv'        => '-1nr6foLV867ZOIXc.cffR3-gB-eznjm',
        'more'            => 'L.O-wLPXY3Ye.yycHgxUrjoAYviy24mW',
        'lhj'             => 'pQSUhmzlS2K5Lc3DftObddZaAt9OmnYo',
        'recipe'          => '-j-QGIRMdCoK1j-TMwD4fHycXlbCALTC',
        'familycircle'    => 'XMRzN5j.xcoTsSdp4tr0EsgUcbZITRM8',
        'divinecaroline'  => 'oLbOWE6168chbe45sC2c.vBniW4-pJ6p',
    );

    public function getHtml($site_name)
    {
        $staging = (strpos($_SERVER['HTTP_HOST'], 'resolute.com') !== false) ? true : false;

        if ($staging) {
            $pubkey = $this->challengeKeyStaging;
        } else {
            $pubkey = @$this->challengeKeys[$site_name];
        }

        return sprintf('<script>jds("solvemedia",{key:"%s"})</script>', $pubkey);

        // if ($staging)
        //     return isset($this->staging_challengeKey) ? $this->solvemedia_get_html($this->staging_challengeKey) : false;
        // else
        // {
        //     if ($mobile)
        //         return isset($this->challengeKeysMobile[$site_name]) ? $this->solvemedia_get_html($this->challengeKeysMobile[$site_name]) : false;
        //     else
        //         return isset($this->challengeKeys[$site_name]) ? $this->solvemedia_get_html($this->challengeKeys[$site_name]) : false;
        // }
    }

    // /**
    //  * Encodes the given data into a query string format
    //  * @param $data - array of string elements to be encoded
    //  * @return string - encoded request
    //  */
    // protected function _adcopy_qsencode($data)
    // {
    //     $req = "";
    //     foreach ($data as $key => $value)
    //         $req .= $key . '=' . urlencode(stripslashes($value)) . '&';

    //     // Cut the last '&'
    //     $req = substr($req, 0, strlen($req) - 1);
    //     return $req;
    // }

    // /**
    //  * Submits an HTTP POST to a solvemedia server
    //  * @param string $host
    //  * @param string $path
    //  * @param array $data
    //  * @param int port
    //  * @return array response
    //  */
    // protected function _adcopy_http_post($host, $path, $data, $port = 80)
    // {

    //     $req = $this->_adcopy_qsencode($data);

    //     $http_request = "POST $path HTTP/1.0\r\n";
    //     $http_request .= "Host: $host\r\n";
    //     $http_request .= "Content-Type: application/x-www-form-urlencoded;\r\n";
    //     $http_request .= "Content-Length: " . strlen($req) . "\r\n";
    //     $http_request .= "User-Agent: solvemedia/PHP\r\n";
    //     $http_request .= "\r\n";
    //     $http_request .= $req;

    //     $response = '';
    //     if (false == ( $fs = @fsockopen($host, $port, $errno, $errstr, 10) ))
    //         die('Could not open socket');

    //     fwrite($fs, $http_request);

    //     while (!feof($fs))
    //         $response .= fgets($fs, 1024); // One TCP-IP packet [sic]
    //     fclose($fs);
    //     $response = explode("\r\n\r\n", $response, 2);

    //     return $response;
    // }

    // /**
    //  * Gets the challenge HTML (javascript and non-javascript version).
    //  * This is called from the browser, and the resulting solvemedia HTML widget
    //  * is embedded within the HTML form it was called from.
    //  * @param string $pubkey A public key for solvemedia
    //  * @param string $error The error given by solvemedia (optional, default is null)
    //  * @param boolean $use_ssl Should the request be made over ssl? (optional, default is false)
    //  * @return string - The HTML to be embedded in the user's form.
    //  */
    // // function solvemedia_get_html($pubkey, $error = null, $use_ssl = false)
    // // {
    // //     if ($pubkey == null || $pubkey == '')
    // //         $this->_show_error(0);
    // //     $server = ($use_ssl) ? $this->ADCOPY_API_SECURE_SERVER : $this->ADCOPY_API_SERVER;

    // //     $errorpart = "";
    // //     if ($error)
    // //         $errorpart = ";error=1";

    // //     $html = '<script type="text/javascript" src="' . $server . '/papi/challenge.ajax?k=' . $pubkey . $errorpart . '"></script>';
    // //     $html .= '<script>function show_captcha() { if (typeof(ACPuzzle) != "undefined") { ACPuzzle.create("' . $pubkey . '", "solve_media_widget", {}); } else { setTimeout(show_captcha, 200); } } </script>';
    // //     $html .= '<noscript><iframe src="' . $server . '/papi/challenge.noscript?k=' . $pubkey . $errorpart . '" height="300" width="500" frameborder="0"></iframe><br/>';
    // //     $html .= '<textarea name="adcopy_challenge" rows="3" cols="40"></textarea>';
    // //     $html .= '<input type="hidden" name="adcopy_response" value="manual_challenge"/>';
    // //     $html .= '</noscript>';

    // //     return $html;
    // // }

    // /**
    //  * Calls an HTTP POST function to verify if the user's guess was correct
    //  * @param string $privkey
    //  * @param string $remoteip
    //  * @param string $challenge
    //  * @param string $response
    //  * @param string $hashkey
    //  * @return SolveMediaResponse
    //  */
    // public function solvemedia_check_answer($privkey, $remoteip, $challenge, $response, $hashkey = '')
    // {
    //     if ($privkey == null || $privkey == '')
    //         $this->_show_error(0);
    //     if ($remoteip == null || $remoteip == '')
    //         $this->_show_error(1);

    //     //discard spam submissions
    //     if ($challenge == null || strlen($challenge) == 0 || $response == null || strlen($response) == 0)
    //         return $this->_response(false, 'Incorrect Solution');

    //     $response = $this->_adcopy_http_post($this->ADCOPY_VERIFY_SERVER, "/papi/verify", array(
    //         'privatekey' => $privkey,
    //         'remoteip' => $remoteip,
    //         'challenge' => $challenge,
    //         'response' => $response
    //             ));

    //     $answers = explode("\n", $response [1]);

    //     if (strlen($hashkey))
    //     {
    //         # validate message authenticator
    //         $hash = sha1($answers[0] . $challenge . $hashkey);

    //         if ($hash != $answers[2])
    //             return $this->_response(false, 'hash-fail');
    //     }

    //     if (trim($answers[0]) == 'true')
    //         return $this->_response(true);
    //     else
    //         return $this->_response(false, $answers[1]);
    // }

    // /**
    //  * gets a URL where the user can sign up for solvemedia. If your application
    //  * has a configuration page where you enter a key, you should provide a link
    //  * using this function.
    //  * @param string $domain The domain where the page is hosted
    //  * @param string $appname The name of your application
    //  */
    // public function solvemedia_get_signup_url($domain = null, $appname = null)
    // {
    //     return $this->ADCOPY_SIGNUP . "?" . $this->_adcopy_qsencode(array('domain' => $domain, 'app' => $appname));
    // }

    // protected function _show_error($status_code)
    // {
    //     switch ($status_code)
    //     {
    //         case 1:
    //             $error_message = "For security reasons, you must pass the remote ip to solvemedia";
    //         default:
    //             $error_message = "To use solvemedia you must get an API key from <a href='" . $this->ADCOPY_SIGNUP . "'>" . $this->ADCOPY_SIGNUP . "</a>";
    //             break;
    //     }
    //     return $error_message;
    // }

    // protected function _response($is_valid = TRUE, $message = '')
    // {
    //     return json_encode(array('is_valid' => $is_valid, 'error' => $message));
    // }

    // /*
    //  * Returns the verification key based on the site name
    //  */
    // public function getVerificationKey($site_name, $mobile = FALSE)
    // {
    //     $staging = (strpos($_SERVER['HTTP_HOST'], 'resolute.com') !== false) ? true : false;

    //     if ($staging)
    //         return isset($this->staging_verificationKey) ? $this->staging_verificationKey : false;
    //     else
    //     {
    //         if ($mobile)
    //             return isset($this->verificationKeysMobile[$site_name]) ? $this->verificationKeysMobile[$site_name] : false;
    //         else
    //             return isset($this->verificationKeys[$site_name]) ? $this->verificationKeys[$site_name] : false;
    //     }
    // }

    // /*
    //  * Returns the hash key based on the site name
    //  */
    // public function getHashKey($site_name, $mobile = FALSE)
    // {
    //     $staging = (strpos($_SERVER['HTTP_HOST'], 'resolute.com') !== false) ? true : false;

    //     if ($staging)
    //         return isset($this->staging_hashKey) ? $this->staging_hashKey : false;
    //     else
    //     {
    //         if ($mobile)
    //             return isset($this->hashKeysMobile[$site_name]) ? $this->hashKeysMobile[$site_name] : false;
    //         else
    //             return isset($this->hashKeys[$site_name]) ? $this->hashKeys[$site_name] : false;
    //     }
    // }

}