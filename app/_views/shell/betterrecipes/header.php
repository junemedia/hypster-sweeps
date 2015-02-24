<!DOCTYPE html>
<head>
<?php if (@$meta['title']): ?>
<title><?= safeHtml($meta['title']) ?></title>
<?php endif; ?>
<?php if (@is_array($meta)) foreach ($meta as $key => $val): ?>
<meta name="<?= safeAttr($key) ?>" content="<?= safeAttr($val) ?>">
<?php endforeach; ?>
<?php
    $minify_config['noout'] = true;
    require_once('minify.inc.php');
    $minify_config['group'] = 'betterrecipes';
    new Minify($minify_config);
?>
</head>
<body id="jds" class="<?= $site_slug ?>">
<header>
    <div class="wrap">
        <a href="http://www.betterrecipes.com/" class="logo">BetterRecipes</a>
        <div class="ad-728x90"></div>
    </div>
    <nav>
        <div class="wrap">
            <a href="http://www.betterrecipes.com/recipes">Recipes</a>
            <a href="http://www.betterrecipes.com/blogs/daily-dish">The Daily Dish</a>
            <a href="http://www.betterrecipes.com/contests">Contests</a>
            <a href="http://win.betterrecipes.com/">Sweepstakes</a>
            <form method="GET" action="http://www.betterrecipes.com/search">
                <input type="search" name="term" placeholder="Search for recipe">
                <input type="hidden" name="PageType" value="Recipe">
                <input type="submit" value="Search">
            </form>
        </div>
    </nav>
</header>
<div class="wrap"></div></body>