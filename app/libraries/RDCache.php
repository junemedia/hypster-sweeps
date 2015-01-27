<?
Class RDCache {

    protected $NGX_EXP_DATE = 'D, j M Y H:i:s \G\M\T';


    public function expires ($seconds) {
        // $seconds can either be:
        // 0   : no caching headers / rely on next downstream rules
        // <0  : negative cache headers
        // >0  : cache for this many seconds
        // @ts : (string) leading with '@' followed by unix timestamp


        // cache the current time
        $now = time();

        // @ts : (string) leading with '@' followed by unix timestamp
        if (@substr($seconds, 0, 1) == '@') {
            // convert @ts to seconds
            $seconds = (int)substr($seconds, 1) - $now;
        }

        // handle floats
        if (is_float($seconds)) {
            $seconds = round($seconds, 0);
        }

        // 0   : no caching headers / rely on next downstream rules
        if (!$seconds || !is_integer($seconds)) { // 0, '', undefined, null, false, or anything other than an int
            return;
        }

        // <0  : negative cache headers
        if ($seconds < 0) {
            @header('X-Accel-Expires: 0');
            @header('Cache-Control: no-cache');
            @header('Expires: ' . gmdate($this->NGX_EXP_DATE, $now - 1));
            return;
        }

        // >0  : cache for this many seconds
        $expires = $now + $seconds;

        // set the appropriate headers
        @header('Cache-Control: max-age=' . $seconds);
        @header('Expires: ' . gmdate($this->NGX_EXP_DATE, $now + $seconds));
        @header('X-Accel-Expires: @' . $expires);
        return true;
    }

}