<?php

/*
| -------------------------------------------------------------------------
| Sweeps Configuration
| -------------------------------------------------------------------------
 */

// How long will password reset token and email verification tokens live?
$config['token_ttl']     = 86400; // 1 day

$config['from_name']     = 'June Media';
$config['from_email']    = 'win@rd.meredith.com';
// $config['replyto_name']  = 'Meredith Corporation';
// $config['replyto_email'] = 'win@rd.meredith.com';

$config['prize_image_dir'] = rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/pimg';
$config['prize_image_uri'] = '/pimg';