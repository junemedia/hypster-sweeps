<? extract($data); ?>
<!DOCTYPE html>
<head>
<?php if (@$meta['title']): ?>
<title><?= safeHtml($meta['title']) ?></title>
<?php endif; ?>
<meta name="viewport" content="width=device-width"/>
<?php if (@is_array($meta)) foreach ($meta as $key => $val): ?>
<meta name="<?= safeAttr($key) ?>" content="<?= safeAttr($val) ?>"/>
<?php endforeach; ?>
<?php
    $minify_config['noout'] = true;
    require_once('minify.inc.php');
    $minify_config['group'] = 'betterrecipes';
    new Minify($minify_config);
?>
</head>
<body>
<header>
    <div class="wrap">
        <a href="http://www.betterrecipes.com/" class="logo">BetterRecipes</a>
        <div class="ad-728x90">
            <img src="http://placehold.it/728x90"/>
        </div>
    </div>
    <nav><!-- NO GAP
     --><div class="wrap"><!-- NO GAP
         --><a href="http://www.betterrecipes.com/recipes">Recipes</a><!-- NO GAP
         --><a href="http://www.betterrecipes.com/blogs/daily-dish">The Daily Dish</a><!-- NO GAP
         --><a href="http://www.betterrecipes.com/contests">Contests</a><!-- NO GAP
         --><a href="http://win.betterrecipes.com/" class="on">Sweepstakes</a><!-- NO GAP
         --><form method="GET" action="http://www.betterrecipes.com/search"><!-- NO GAP
             --><input type="text" name="term" placeholder="Search for recipe" required/><!-- NO GAP
             --><input type="submit" value="Search"/><!-- NO GAP
             --><input type="hidden" name="PageType" value="Recipe"/><!-- NO GAP
         --></form><!-- NO GAP
     --></div><!-- NO GAP
 --></nav>
</header>
<div id="jds" class="wrap <?= $site_slug ?>">
    <div class="main">
    <!-- THIS SHOULD EVENTUALLY BE PART OF THE ADMIN -->
    <a class="banner" href="/"><span>Enter to win prizes daily</span></a>
    <?php
        foreach ($view as $v) {
            $this->load->view($v, compact('data'));
        }
    ?>
    </div><!-- NO GAP
    --><div class="rail">
    <!-- Right Rail Ad Units -->
        <img src="http://placehold.it/300x250"/>
        <img src="http://placehold.it/300x250"/>
        <img src="http://placehold.it/300x250"/>
        <img src="http://placehold.it/300x250"/>
    </div>
</div><!-- /.wrap -->
<footer><div class="wrap">©<?= ' '.date('Y').' ' ?>June Media Inc</div></footer>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
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