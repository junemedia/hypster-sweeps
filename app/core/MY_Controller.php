<?php

/**
 * Sweeps Controller
 *
 * @author    Adam Chalemian [achalemian@resolute.com]
 * @copyright 2015 Resolute Digital [http://resolute.com]
 */
class SweepsController extends CI_Controller
{
    /**
     * Constructor
     *
     * @access  public
     * @return  void
     */
    public function __construct()
    {
        parent::__construct();

    }

    /**
     * Output a JSON response with the correct Content-Type header
     *
     * @param mixed $data
     * @return void
     */
    protected function json($data)
    {
        // do not do an array_filter here, because code=0’s will be removed.
        $this->output
             ->set_content_type('application/json; charset=UTF-8')
             ->set_output($this->jsonEncode($data));
    }

    /**
     * Sanitize any response array before applying json_encode()
     *
     * @param mixed $data
     * @return json
     */
    protected function jsonEncode($data)
    {
        if (!$data || !is_array($data)) {
            return is_array($data) ? '[]' : '{}';
        }
        return json_encode($this->removeNullEmpty($data), JSON_NUMERIC_CHECK);
    }

    /**
     * Remove empty or null values from a response array
     *
     * @param array $data
     * @return array With $data cleaned recursively
     */
    protected function removeNullEmpty($data)
    {
        foreach ($data as &$val) {
            if (is_array($val)) {
                $val = $this->removeNullEmpty($val);
            }
        }
        return array_filter($data, function ($v) {return !($v === array() || $v === "" || $v === null);});
    }

}

class FrontendController extends SweepsController
{
    protected $site_id     = null;
    protected $site_slug   = null;
    protected $site_name   = null;
    protected $site_domain = null;

    public function __construct()
    {
        parent::__construct();

        $this->db->select('id as site_id, slug as site_slug, name as site_name, domain as site_domain');

        // production (win.) domains are easy to match against the `site`.`domain` column
        if (strpos($_SERVER['HTTP_HOST'], 'win.') === 0) {
            $this->db->where('domain', $_SERVER['HTTP_HOST']);
        } else {
            // development/staging domains must have the `slug` in the format SLUG.sweeps.HOST.resolute.com
            if (!preg_match('/^([a-z]+)\.junesweeps\.[^\.]+\.resolute\.com/', $_SERVER['HTTP_HOST'], $m)) {
                show_404();
            }
            $this->db->where('slug', $m[1]);
        }

        $this->db->limit(1);

        $response = $this->db->get('site')->row_array();

        if (!$response) {
            show_404();
        }

        // assigned each of these fields (columns) to $this object
        foreach ($response as $key => $value) {
            $this->{$key} = $value;
        }
    }
}

class AdminController extends SweepsController
{
    public function __construct()
    {
        parent::__construct();

        // only load the Session library for this controller and all of its actions
        $this->load->library('session');

        // all responses here should never be cached
        $this->rdcache->expires(-1);

        // if we're not an admin, bail
        if (!$this->session->userdata('is_admin')) {
            show_404();
        }
    }
}
