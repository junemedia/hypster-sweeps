<?php

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

// Cronjob Tasks
$route['cron/daily']             = 'cron/daily';

// Public/Cacheable HTML Requests
$route['winners']                = 'main/winners';
$route['calendar']               = 'main/calendar';
$route['rules']                  = 'main/rules';
$route['prize/(:any)']           = 'main/prize/$1';

// Private User/Auth HTML Requests
$route['profile']                = 'user/profile';
$route['verify/(:any)']          = 'user/verify/$1';        // anon OK
$route['reset/(:any)']           = 'user/reset/$1';         // reset password (anon OK)

// Private JSON API Requests
$route['api/eligible']           = 'api/eligible';
$route['api/enter']              = 'api/enter';
$route['api/logout']             = 'api/logout';
$route['api/verify']             = 'api/verify';            // generate a new verification email (logged in)

// Public JSON API Requests
$route['api/captcha']            = 'api/captcha';           // prove your human
$route['api/signup']             = 'api/signup';
$route['api/login']              = 'api/login';
$route['api/reset']              = 'api/reset';             // reset password (anonymous, with token)
$route['api/forgot']             = 'api/forgot';

// Admin Area
$route['admin']                  = 'admin/dashboard';       // dashboard
$route['admin/dashboard/(:num)'] = 'admin/dashboard/$1';    // dashboard
$route['admin/sweepstakes']      = 'admin/sweepstakes';     // list view
$route['admin/prize/(:num)']     = 'admin/prize/$1';        // GET/html: of prize detail or 0 for new
$route['admin/thanks']           = 'admin/thanks';          // GET/html: display form for each site's thank you HTML

// Admin JSON API Requests
$route['admin/contests/(:any)']  = 'admin/contests/$1';     // GET/json: list flight date prizes accepts sorting
// $route['admin/prizes/(:any)']    = 'admin/prizes/$1';       // GET/json: (accepts sorting/filtering)
$route['admin/prize']            = 'admin/upsert';          // POST/json: get or create/update a prize
$route['admin/contest/add']      = 'admin/addContest';      // POST/json: add a contest (flight date) to a prize
$route['admin/contest/del']      = 'admin/delContest';      // POST/json: remove a future contest (flight date) from a prize
$route['admin/contest/alt']      = 'admin/altContest';      // POST/json: pick an alternate winner for a contest
$route['admin/thanks/(:num)']    = 'admin/thanksUpdate/$1'; // POST/json: update the HTML of a site_id’s thank you page
// $route['admin/similar']          = 'admin/similar';         // POST/json: return prizes with similar title or images

// Public General/Specific Channel HTML Requests
$route['default_controller']     = 'main';


/* End of file routes.php */
/* Location: ./application/config/routes.php */