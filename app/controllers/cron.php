<?php

class Cron extends CI_Controller
{
    protected $debug               = true;
    protected $log                 = '';
    protected $log_email           = null;
    protected $log_dir             = '/srv/sites/hypster.com/win/bin/logs';
    protected $log_file            = '';
    protected $INFO                = 4;
    protected $WARN                = 3;
    protected $ERROR               = 2;
    protected $FATAL               = 1;
    protected $ERROR_STATUS_BY_INT = array(
                                       1 => 'FATAL',
                                       2 => 'ERROR',
                                       3 => 'WARN',
                                       4 => 'INFO',
                                     );
    protected $yesterday;
    protected $today;

    public function __construct()
    {
        parent::__construct();

        if (@$_SERVER['HTTP_HOST']) {
            show_404();
        }

        $this->yesterday = date('Y-m-d', strtotime('-1 day'));
        $this->today     = date('Y-m-d');
        $this->log_file  = $this->log_dir . '/' . $this->today . '.log';
    }

    public function __destruct()
    {
        if ($this->log) {
          @file_put_contents($this->log_file, $this->log, FILE_APPEND);
        }
    }

    /**
     * Performs daily winner selection for the previous day.
     * Sends emails to the winner and the contest admin about the winner selection.
     *
     * @return void
     */
    public function daily() {
      $date = $this->yesterday;

      $this->load->model('adminModel');
      $this->load->model('prizeModel');

      $result = $this->adminModel->pickWinner($date);
      /*
       * possible values for $result:
       *   -1: no contest set for this $date
       *   -2: no eligible entries for this $date
       *   array of user data: `user_id`, `user_email`
       *
       */
      if ($result['error'] == -1) {
        return $this->logItem($this->ERROR, 'No contest exists on ' . $date . '.');
      }
      elseif ($result['error'] == -2) {
        return $this->logItem($this->ERROR, 'We do not have any other entries on ' . $date . '.');
      }
      elseif (@$result['user_id'] >= 1) {
        $this->logItem($this->INFO, 'Winner email chosen: ' . $result['user_email']);

        // grab all of the information for this contest:
        $winner = $this->prizeModel->getWinnersByDateRange($date);
        if (!$winner) {
            return $this->logItem($this->ERROR, 'Winner picked, but then $this->getWinnersByDateRange(' . $date . ') failed.');
        }
        $winner = array_shift($winner);
        $this->sendMail($winner);
      }
      else {
        return $this->logItem($this->ERROR, 'Unexpected error from $this->adminModel->pickWinner(' . $date . ').');
      }
    }

    protected function logItem($status = 3, $msg) {
      $trace  = debug_backtrace();
      $caller = (@$trace[1]['class'] ? $trace[1]['class'] . '::' : '') . $trace[1]['function'];

      // log item if error or fatal, or if debug is true
      if ($status < 3 || $this->debug) {
        $this->log .= '[' . date('Y-m-d H:i:s') . '] ' . $this->ERROR_STATUS_BY_INT[$status] . ' ' . $caller . PHP_EOL . $msg . PHP_EOL;
      }
      if ($status == 1) {
        // FATAL
        exit;
      }
    }

    protected function sendMail($params) {
      $this->load->library('maropost', config_item('maropost'));

      $params['date_pretty'] = date('F j, Y', strtotime($params['date']));
      // remove any HTML tags in the prize title
      $params['prize_title'] = safeTitle($params['prize_title']);

      // winner email
      $this->maropost->from(config_item('from')).
      $this->maropost->to($params['user_email']);
      $this->maropost->bcc(config_item('admin_emails'));
      // tags
      $this->maropost->tags('prize_title', $params['prize_title']);
      $this->maropost->tags('prize_value', $params['prize_value']);
      $this->maropost->tags('prize_date', $params['date_pretty']);

      $response = $this->maropost->send_transaction();

      $recd = $response['recd'];
      $postfields = print_r($response['sent']['postfields'], true);
      $info = print_r($response['sent']['info'], true);

      $this->logItem($this->INFO, "POST data: $postfields");
      $this->logItem($this->INFO, "cURL info: $info");
      $this->logItem($this->INFO, "cuRL response: $recd");
    }
}
