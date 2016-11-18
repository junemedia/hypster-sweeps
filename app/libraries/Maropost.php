<?php

/**
 * Maropost
 *
 */

class Maropost
{

  const API_ROOT = 'http://api.maropost.com/accounts';

  protected $api_key;
  protected $account_id;
  protected $campaign_id;
  protected $content_id;
  protected $from_email;
  protected $from_name;
  protected $to;
  protected $bcc;
  protected $tags;

  public function __construct($params)
  {
      $this->api_key     = $params['api_key'];
      $this->account_id  = $params['account_id'];
      $this->campaign_id = $params['campaign_id'];
      $this->content_id  = $params['content_id'];
      $this->tags        = array();
  }

  /**
   * Set from: name and address
   *
   * @param string[] $from From name and address
   *
   */
  public function from($from) {
    $this->from_email = $from['email'];
    $this->from_name  = $from['name'];
    return $this;
  }

  /**
   * Set to: address
   *
   * @param string $to TO: address
   *
   */
  public function to($to) {
    $this->to = $to;
    return $this;
  }

  /**
   * Set bcc: address
   *
   * @param string $bcc BCC: address
   *
   */
  public function bcc($bcc) {
    $this->bcc = $bcc;
    return $this;
  }

  /**
   * Sets a tag to be included with HTTP request
   *
   * A key/value pair to get included into the email body in
   * Maropost's system
   *
   * @param string $key Tag name
   * @param string $value Tag value
   *
   */
  public function tags($key, $value) {
    $this->tags[$key] = $value;
    return $this;
  }

  /**
   * Submits an HTTP POST to Maropost
   *
   */
  public function send_transaction() {
    $endpoint = 'emails/deliver.json';

    $apiHeaders = array(
      'Accept: application/json',
      'Content-Type: application/json'
    );

    $payload = array(
      'email' => array(
        'campaign_id' => $this->campaign_id,
        'content_id' => $this->content_id,
        'contact' => array(
          'email' => $this->to
        ),
        'bcc' => $this->bcc,
        'tags' => $this->tags
      )
    );
    $payload = json_encode($payload);

    $ch = curl_init(self::API_ROOT .'/'. $this->account_id .'/'. $endpoint .'?auth_token=' . $this->api_key);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $apiHeaders);
    $response = curl_exec($ch);
    curl_close($ch);
  }
}
