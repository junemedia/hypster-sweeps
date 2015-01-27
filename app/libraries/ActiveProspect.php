<?php

/**
 * Active Prospect / Lead Conduit
 *
 * Offers in the `offer` table will be submitted to Active Prospect.
 *
 */

class ActiveProspect
{

    protected $base_url    = 'https://app.leadconduit.com/v2/PostLeadAction';
    protected $environment = 'production';
    protected $ch          = null;// cURL handler

    public function __construct()
    {
        // set the environment based on CI’s ENVIRONMENT
        $this->environment = ENVIRONMENT == 'development' ? 'development' : 'production';

             // initialize the curl handler
        $this->ch = curl_init();
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($this->ch, CURLOPT_TCP_NODELAY, 1);
    }

    /**
     * Subscribes a provided profile to one or many offer
     *
     * @param array $profile Meredith Registration Service profile object
     * @param mixed array of $offers Consisting of ['id' => …, 'offer_id' => …,]
     * @param string $site_id
     *
     * @return array Of offers arrays successfully subscribed to for this user
     */
    public function send($profile, $offers, $site_id = null)
    {
        if ($site_id) {
            $this->site_id = $site_id;
        }

        // init the array of successful offer_id submissions
        $success = array();

        foreach ($offers as $offer) {
            if ($offer['ap_map']) {
                // convert a Meredith Profile to an array matching the GET params for Active Prospect
                $ap_profile = $this->mapProfile($profile, $offer['ap_map']);
            } else {
                // WE NEED A DEFAULT MAPPING, I guess we could just Meredith's:
                $ap_profile = $profile;
            }
            if ($this->submit($offer['ap_account_id'], $offer['ap_campaign_id'], $ap_profile)) {
                // only push the successful offer_id submissions to the array
                // also, strip the ap_account_id, ap_campaign_id, ap_map fields,
                // since the end-user will not need this
                unset($offer['ap_account_id']);
                unset($offer['ap_campaign_id']);
                unset($offer['ap_map']);
                $success[] = $offer;
            }
        }

        return $success;
    }

    /**
     * Map the Active Prospect paramaters to Meredith Profile properties
     *
     * This will also make sure that the Active Prospect character limits are upheld.
     *
     * @param array $profile Meredith Registration Service profile object
     * @param array $map     Meredith Registration Service profile fields to Active Prospect fields
     *
     * @return array of mapped Meredith profile properties with sanitized character lengths
     */
    protected function mapProfile($profile, $map)
    {
        $ap_profile = array();
        foreach ($map as $meredith => $ap) {
            if (@$profile[$meredith]) {
                $ap_profile[$ap] = $profile[$meredith];
            } elseif ($meredith == 'timestamp') {
                // special case for timestamp in the format:
                // "Y-m-d H:i:s"
                $ap_profile[$ap] = date('Y-m-d H:i:s');
            }
        }
        return $ap_profile;
    }

    /**
     * Send a lead to Active Prospect
     *
     * We count a "duplicate" or "queued" as a successful submission.
     *
     * @param string $ap_account_id  Active Prospect Account ID
     * @param string $ap_campaign_id Active Prospect Campaign ID
     * @param array $params          GET parameters to send to Active Prospect
     *
     * @return boolean
     */
    protected function submit($ap_account_id, $ap_campaign_id, $params)
    {
        if ($this->environment != 'production') {
            $params['xxTest'] = true;
        }
        $params['xxAccountId'] = $ap_account_id;
        $params['xxCampaignId'] = $ap_campaign_id;

        $ch = &$this->ch;

        curl_setopt($ch, CURLOPT_URL, $this->base_url . '?' . http_build_query($params));

        if (!$response = curl_exec($ch)) {
            return false;
        }

        $xml = @simplexml_load_string($response);

        if (!$xml) {
            return false;
        }

        return ($xml->result == 'success' || ($xml->result == 'failure' && $xml->reason == 'duplicate') || $xml->result == 'queued');
    }

}
