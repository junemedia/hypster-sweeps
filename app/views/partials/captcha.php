<? extract($data); ?>
<!-- Solve Media Captcha -->
<div id="solvemedia">
    <div class="screen"></div>
    <form method="post" action="/api/captcha">
        <a class="close"></a>
        <p>Please verify your entry by answering the question below and then pressing the “Enter Now” button.</p>
        <?= $solvemedia ?>
        <div id="solvemedia_widget"></div>
        <input type="submit" value="Enter Now"/>
    </form>
</div>
<!-- End Solve Media Captcha -->