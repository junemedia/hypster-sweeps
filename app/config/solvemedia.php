<?php

/*
|--------------------------------------------------------------------------
| SolveMedia Keys
|--------------------------------------------------------------------------
|
| Choose the correct key set based on HTTP_HOST since this is only used
| through php-fpm.
|
 */

switch (@$_SERVER['HTTP_HOST']) {

  case 'stage.win.hypster.com':
  case 'win.hypster.com':
    $config['public']  = 'ym7RhIOhnKDH44Vt.atFOnHyicq2FVs6';
    $config['private'] = '-ki9FiWGRSsHjl-QV5k-d2qML43hfHwQ';
    $config['verify']  = 'fJCQQ3WPIPZCX26rqBOyM5v41q2lKQRt';
    break;
}
