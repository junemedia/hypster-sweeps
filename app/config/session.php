<?php

/*
|--------------------------------------------------------------------------
| Session Variables
|--------------------------------------------------------------------------
| 'session_name'        Name of the cookie used for sessions.
|                       Default: ini_get('session.name')
|
| 'session_lifetime'    Time from when session *first* create, in seconds,
|                       when the COOKIE will expire.
|                       Default: ini_get('session.cookie_lifetime')
| 'session_path'        Base path where the session cookie will be valid.
|                       Default: ini_get('session.cookie_path') or '/'
|
| 'session_domain'      The cookie’s domain.
|                       Default: ''
|
| 'session_secure'      Should the cookie (and session) be allowed/set
|                       on/for HTTPS only?
|                       Default: false
|
| 'session_httponly'    Should the cookie (and session) be allowed/set
|                       on/for HTTP only?
|                       Default: false
|
| 'flashdata_prefix'    String to use to prefix any flashdata() keys.
|                       Default: "flash_"
|
| 'gc_maxlifetime'      Time from *last* request (using the session), in
|                       seconds, when the session DATA stored on the
|                       server (ie. Memcached) should be removed.  For
|                       Memcached session storage, this sets the TTL of
|                       the storage. This may NOT exceed 2592000 seconds
|                       (30 days).
|                       Default: ini_get('session.gc_maxlifetime')
|
|--------------------------------------------------------------------------
| 'session_lifetime' vs 'gc_maxlifetime'
|--------------------------------------------------------------------------
| Which one does what?  This library was developed with the intention that
| you will use Memcached as your session storage engine.  Therefore, you
| can be certain that once the Memcached TTL for the session key expires,
| that session is destroyed.  Here are some things to keep in mind
| regarding the expiration and refreshing of session data:
|
| * 'session_lifetime' sets the session cookie to expire <session_lifetime>
|   seconds from **when it was FIRST created**.
|
| * 'gc_maxlifetime' PHP’s memcached session storage handler and will set
|   the TTL (expiration time) of a session to <gc_maxlifetime> seconds
|   **from the last (and every) time session_start() is called**.
|
| * Once the session cookie is sent by PHP’s internal session manager, it
|   will not update that session cookie in any way.
|
| * Conversly, every time that session_start() is invoked, that session’s
|   lifetime in Memcache is extended (renewed) for another <gc_maxlifetime>
|   seconds.
|
| This means that if you set both 'session_lifetime' and 'gc_maxlifetime'
| to the same number of seconds, it is very likely that your session cookie
| will expire before your session data in Memcached is deleted.  Remember,
| if either the session cookie or the session data is deleted (for whatever
| reason), the session is lost.  You will have an orphaned session cookie
| or an orphaned session key in Memcached.
|
| Since you cannot control how often the cookie’s expiration is updated,
| you should set a very long 'session_lifetime' (2 years+) so that the
| cookie has the best chance of surviving longer than the corresponding
| session data in Memcache.  Then, you can control the length of time, or
| the number of seconds the user may "be away" from your project/site,
| until the session is deleted.  In terms of micro-efficiency, it makes
| sense to NOT keep sending cookie TTL updates in your responses unless
| you’re changing the value (generating a new session).  Otherwise, you're
| constantly just telling the browser to keep on extending the life of the
| cookie without a really good reason.
|
*/

// $config['session_name']     = 'sid';    // name of the session cookie
// $config['session_lifetime'] = 63072000; // cookie expires after 2 years
// $config['session_path']     = '/';      // restrict to specific base URL
// $config['session_domain']   = '';       // explicitely set the cookie domain
// $config['session_secure']   = false;    // only allow sessions on HTTPS
// $config['session_httponly'] = false;    // only allow sessions on HTTP
// $config['flashdata_prefix'] = 'flash_'; // flashdata key prefix
// $config['gc_maxlifetime']   = 2592000;  // delete session data after 30 days