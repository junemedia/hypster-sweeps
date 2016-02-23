<?php

/*
| -------------------------------------------------------------------------
| Sweeps Configuration
| -------------------------------------------------------------------------
*/

// How long will password reset token and email verification tokens live?
$config['token_ttl']                      = 86400; // 1 day
$config['human_ttl']                      = 86400; // 1 day

// Who will be BCC’d on winner emails:
$config['admin_emails'][]                 = 'williamg@junemedia.com';
$config['admin_emails'][]                 = 'aburton@junemedia.com';
$config['admin_emails'][]                 = 'contestadmin@junemedia.com';

// The "From:" address for the winner emails:
// Organized by "site_slug" (`site`.`slug`);
// If no site slugs match, then "default" will be used.
$config['from']['betterrecipes']['name']  = 'BetterRecipes Daily Sweepstakes';
$config['from']['betterrecipes']['email'] = 'win@betterrecipes.com';
$config['from']['recipe4living']['name']  = 'Recipe4Living Daily Sweepstakes';
$config['from']['recipe4living']['email'] = 'win@recipe4living.com';
$config['from']['default']['name']        = 'June Media Daily Sweepstakes';
$config['from']['default']['email']       = 'win@junemedia.com';

$config['prize_image_dir']                = rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/pimg';
$config['prize_image_uri']                = '/pimg';
