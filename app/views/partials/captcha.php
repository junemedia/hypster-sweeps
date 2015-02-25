<!-- Solve Media Captcha -->
<div id="solvemedia">
    <form id="adcopy-outer" method="post" action="/api/captcha">
        <div id="adcopy-puzzle-image"></div>
        <div id="adcopy-puzzle-audio"></div>
        <input type="text" name="adcopy_response" id="adcopy_response"/><!--
     --><input type="submit" class="loader" value=">"/><!-- 〉
     --><a id="adcopy-link-refresh"></a><!-- Reload: ACPuzzle.reload()
     --><a id="adcopy-link-audio"></a><!-- Audio: ACPuzzle.change2audio()
     --><a id="adcopy-link-image"></a><!-- Visual: ACPuzzle.change2image()
     --><a id="adcopy-link-info"></a><!-- Info: ACPuzzle.moreinfo()
     --><div class="alert"></div>
        <input type="hidden" name="adcopy_challenge" id="adcopy_challenge"/>
        <b>x</b><!-- close X button -->
        <i></i><!-- solve media logo -->
        <!-- Garbage anchor points required by puzzle.js -->
        <u><u id="adcopy-instr"></u><u id="adcopy-pixel-image"></u><u id="adcopy-error-msg"></u></u>
    </form>
</div>
<!-- End Solve Media Captcha -->