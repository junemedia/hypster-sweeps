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
$route['cron/(:any)']         = 'cron/$1';
$route['cron/(:any)/(:any)']  = 'cron/$1/$2';

// Public/Cacheable HTML Requests
$route['winners']             = 'main/winners';
$route['calendar']            = 'main/calendar';
$route['rules']               = 'main/rules';
$route['prize/(:any)']        = 'main/prize/$1';

// Private User/Auth HTML Requests
$route['profile']             = 'user/profile';
$route['verify/(:any)']       = 'user/verify/$1'; // anon OK
$route['reset']               = 'user/reset/$1';  // anon OK

// Private JSON API Requests
$route['api/eligible']        = 'api/eligible';
$route['api/enter']           = 'api/enter';
$route['api/logout']          = 'api/logout';
$route['api/password']        = 'api/password';
$route['api/verify']          = 'api/verify'; // must be logged in; generate a verification email

// Public JSON API Requests
$route['api/signup']          = 'api/signup';
$route['api/login']           = 'api/login';
$route['api/forgot']          = 'api/forgot';

// Admin Area
$route['admin']               = 'admin/index';
$route['admin/sweepstakes']   = 'admin/sweepstakes';
$route['admin/prize/(:num)']  = 'admin/prize';     // GET for HTML; POST for JSON (update/create)
$route['admin/prizes/(:any)'] = 'admin/prizes/$1'; // JSON (accepts sorting)

// Public General/Specific Channel HTML Requests
$route['default_controller']  = 'main';


/* End of file routes.php */
/* Location: ./application/config/routes.php */