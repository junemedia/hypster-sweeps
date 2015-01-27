<?php

class RDGeo
{

    protected $url = 'http://resolute.com/geo.json?q=';
    protected $ch  = null;

    public function __construct()
    {
        $this->ch = curl_init();
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, true);
    }

    public function lookup($q)
    {
        curl_setopt($this->ch, CURLOPT_URL, $this->url . $q);
        return json_decode(curl_exec($this->ch), true);
    }

}
