<?php

/**
 * Solve Media
 *
 *
 *
 *
 */

class SolveMedia
{

    const ADCOPY_VERIFY_SERVER = "verify.solvemedia.com";

    // keys
    protected $public;
    protected $private;
    protected $verify; // authentication hash salt

    public function __construct($params)
    {
        // define the keys from config/solvemedia.php
        $this->public  = $params['public'];
        $this->private = $params['private'];
        $this->verify  = $params['verify'];
    }

    public function invoke()
    {
        return sprintf('<script>jds("solvemedia",{key:"%s"})</script>', $this->public);
    }

    /**
     * Calls an HTTP POST function to verify if the user's guess was correct
     * @param   string  $ip
     * @param   string  $challenge
     * @param   string  $response
     * @return  array   $this->_response
     */
    public function solve($ip, $challenge, $response)
    {
        // discard spam submissions
        if (!$challenge || !$response) {
            return $this->_response(false, 'Incorrect Solution');
        }

        $response = $this->_adcopy_http_post(self::ADCOPY_VERIFY_SERVER, "/papi/verify", array(
            'privatekey' => $this->private,
            'remoteip'   => $ip,
            'challenge'  => $challenge,
            'response'   => $response,
        ));

        $answers = explode("\n", $response[1]);

        if ($answers[0] != 'true') {
            return $this->_response(false, $answers[1]);
        }

        # validate message authenticator
        if (sha1($answers[0] . $challenge . $this->verify) != $answers[2]) {
            return $this->_response(false, 'hash-fail');
        }

        return $this->_response(true);
    }

    /**
     *
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     * CONVERT TO array_map()
     *
     *
     *
     * Encodes the given data into a query string format
     * @param $data - array of string elements to be encoded
     * @return string - encoded request
     */
    protected function _adcopy_qsencode($data)
    {
        $req = "";
        foreach ($data as $key => $value) {
            $req .= $key . '=' . urlencode(stripslashes($value)) . '&';
        }

        // Cut the last '&'
        $req = substr($req, 0, strlen($req) - 1);
        return $req;
    }

    /**
     * Submits an HTTP POST to a solvemedia server
     * @param string $host
     * @param string $path
     * @param array $data
     * @param int port
     * @return array response
     */
    protected function _adcopy_http_post($host, $path, $data, $port = 80)
    {

        $req = $this->_adcopy_qsencode($data);

        $http_request =
        "POST $path HTTP/1.0\r\n"
        . "Host: $host\r\n"
        . "Content-Type: application/x-www-form-urlencoded;\r\n"
        . "Content-Length: " . strlen($req) . "\r\n"
        . "User-Agent: solvemedia/PHP\r\n"
        . "\r\n"
        . $req;

        $response = '';

        if (false == ($fs = @fsockopen($host, $port, $errno, $errstr, 10))) {
            die('Could not open socket');
        }

        fwrite($fs, $http_request);

        while (!feof($fs)) {
            $response .= fgets($fs, 1024);
        }

        // One TCP-IP packet [sic]
        fclose($fs);

        $response = explode("\r\n\r\n", $response, 2);

        return $response;
    }

    protected function _response($valid = true, $error = null)
    {
        return array('valid' => $valid, 'error' => $error);
    }

}
