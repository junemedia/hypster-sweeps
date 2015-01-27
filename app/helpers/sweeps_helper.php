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

function mtRandStr($l, $c = 'abcdefghijklmnopqrstuvwxyz1234567890')
{
    for ($s = '', $cl = strlen($c) - 1, $i = 0; $i < $l; $s .= $c[mt_rand(0, $cl)], ++$i);
    return $s;
}

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
