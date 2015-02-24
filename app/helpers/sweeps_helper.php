<?php

function proper($str, $return_if_loose_eval_to_false = null)
{
    return ((mb_strtolower($str) == $str) || ((mb_strtoupper($str) == $str) && strlen($str) > 2)) ? trim(mb_convert_case($str, MB_CASE_TITLE)) : (!trim($str) ? $return_if_loose_eval_to_false : trim($str));
}

if (!function_exists('redirect')) {
    function redirect($url, $code = '301')
    {
        header('Location: ' . $url, true, $code);
    }
}

function articleAgreement($str, $include_str_in_return = true)
{
    $str = trim($str);

    $return_str = $include_str_in_return ? $str : '';

    // is this plural?
    if (mb_strtolower(mb_substr($str, -1)) == 's') {
        // then no prefixed article
        return $return_str;
    }
    // "an "+str if starts with vowel, otherwise "a "+str
    return (in_array(mb_strtolower(mb_substr($str, 0, 1)), array('a', 'e', 'i', 'o', 'u', 'y')) ? 'an ' : 'a ') . $return_str;
}

// // UNUSED in favor of SPROCs
// function mtRandStr($l, $c = 'abcdefghijklmnopqrstuvwxyz1234567890')
// {
//     for ($s = '', $cl = strlen($c) - 1, $i = 0; $i < $l; $s .= $c[mt_rand(0, $cl)], ++$i);
//     return $s;
// }

function safeHtml($str)
{
    // prevent double encoding
    $str = str_replace('&amp;', '&', $str);
    return str_replace('&', '&amp;', $str);
}

function safeAttr($str)
{
    // prevent double encoding
    $str = str_replace('&quot;', '"', $str);
    return str_replace('"', '&quot;', $str);
}

function prizeByDateMap($prizes)
{
    $p = array();
    foreach ($prizes as $prize) {
        $p[$prize['date']] = $prize;
    }
    return $p;
}

function winner_tds_html($contest)
{
    if (!@$contest['user_id']) {
        return '<td></td><td></td>';
    }
    extract($contest);
    return sprintf('<td><a href="mailto:%s">%s %s</a></td><td>%s, %s</td>',
        $user_email,
        $user_firstname,
        $user_lastname,
        $user_city,
        $user_state);

}

function sanitizeDate($str, $default_return = null)
{
    $ts = strtotime($str);
    return $ts ? date('Y-m-d', $ts) : $default_return;
}

function firstNameLastInitial($firstname, $lastname)
{
    return (mb_strlen($lastname) > 0)
    ? $firstname . ' ' . mb_substr($lastname, 0, 1) . '.'
    : $firstname;
}
