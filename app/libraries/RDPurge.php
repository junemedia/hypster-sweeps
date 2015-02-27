<?php

class RDPurge
{

    protected $ch             = null;
    protected $HOST           = null;
    protected $PURGE_BASE_URL = null;

    /**
     * Must use "mfs" so that we hit Nginx with a local IP
     *
     */
    public function __construct()
    {
        $this->PURGE_BASE_URL = sprintf('http%s://mfs/purge', ($_SERVER['HTTPS'] ? 's' : ''));
        $this->HOST           = $_SERVER['HTTP_HOST'];
        $this->ch             = curl_init();
        curl_setopt($this->ch, CURLOPT_HTTPHEADER, array('Host: ' . $this->HOST));
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, true);

    }

    /**
     * Purge a URL from the Nginx cache
     *
     * @param   string  $path
     *
     * @return  boolean
     */
    public function purge($path)
    {
        curl_setopt($this->ch, CURLOPT_URL, $this->PURGE_BASE_URL . $path);
        curl_exec($this->ch);
        $info = curl_getinfo($this->ch);
        return @$info['http_code'] == 200;
    }

}
