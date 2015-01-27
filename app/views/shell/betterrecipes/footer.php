<footer>©<?= ' '.date('Y').' ' ?>June Media Inc</footer>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<!-- Create the `jds` pre-object/function which allows for jds() calls before jds.js is loaded -->
<script>(function(w,m){w[m]=w[m]&&!w[m].nodeName?w[m]:function(){(w[m].q=w[m].q||[]).push(arguments)}})(window,'jds')</script>
<?php
    $minify_config['noout'] = true;
    require_once('minify.inc.php');
    $minify_config['group'] = 'main';
    new Minify($minify_config);
?>
<?php if (@$solvemedia): ?>
<?php $this->load->view('partials/captcha'); ?>
<?= $solvemedia ?>
<?php endif; ?>
</body>
</html>