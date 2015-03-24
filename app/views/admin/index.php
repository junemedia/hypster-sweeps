<? extract($data) ?>
<!DOCTYPE html>
<head>
<?php if (@$meta['title']): ?>
<title><?= safeHtml($meta['title']) ?></title>
<?php endif; ?>
<meta name="viewport" content="width=device-width"/>
<link rel="stylesheet" href="/css/admin.css"/>
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
         --><a href="/admin/thanks" class="<?= @$nav_thanks ? 'on' : ''?>">Thank You</a><!-- NO GAP
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
<!-- admin.js is not setup to be async with jquery / the frontend js IS -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script async src="/js/admin.js"></script>
</body>
</html>