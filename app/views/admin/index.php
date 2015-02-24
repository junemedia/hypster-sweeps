<? extract($data) ?>
<!DOCTYPE html>
<head>
<?php if (@$meta['title']): ?>
<title><?= safeHtml($meta['title']) ?></title>
<?php endif; ?>
<meta name="viewport" content="width=device-width"/>
<?php
    $minify_config['noout'] = true;
    require_once('minify.inc.php');
    $minify_config['group'] = 'admincss';
    new Minify($minify_config);
?>
</head>
<body>
<header>
    <div class="wrap">
        <a href="/admin" class="logo"></a>
    </div>
    <nav><!-- NO GAP
     --><div class="wrap"><!-- NO GAP
         --><a href="/admin" class="<?= @$nav_dashboard ? 'on' : ''?>">Dashboard</a><!-- NO GAP
         --><a href="/admin/sweepstakes" class="<?= @$nav_sweepstakes ? 'on' : ''?>">Sweepstakes</a><!-- NO GAP
     --></div><!-- NO GAP
 --></nav>
</header>
<div id="admin" class="wrap">
<?php
    foreach ($view as $v) {
        $this->load->view($v, compact('data'));
    }
?>
</div><!-- /.wrap -->
<footer><div class="wrap">©<?= ' '.date('Y').' ' ?>June Media Inc</div></footer>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<!-- Create the `jds` pre-object/function which allows for jds() calls before jds.js is loaded -->
<!-- <script>(function(w,m){w[m]=w[m]&&!w[m].nodeName?w[m]:function(){(w[m].q=w[m].q||[]).push(arguments)}})(window,'jds')</script> -->
<?php
    $minify_config['noout'] = true;
    require_once('minify.inc.php');
    $minify_config['group'] = 'adminjs';
    new Minify($minify_config);
?>
</body>
</html>