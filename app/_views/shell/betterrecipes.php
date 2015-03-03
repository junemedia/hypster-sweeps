<? extract($data); ?><!DOCTYPE html><head><title><?= safeHtml(@$meta['title'] ? $meta['title'] : @$meta['og:title']) ?></title><meta name="viewport" content="width=device-width"/><meta name="description" content="<?= safeAttr(@$meta['description'] ? $meta['description'] : @$meta['og:description']) ?>"/><?php if (@is_array($meta)) foreach ($meta as $key => $val): ?><meta name="<?= safeAttr($key) ?>" content="<?= safeAttr($val) ?>"/><?php endforeach; ?><?php /* SHELL-TIMESTAMP.min.css */ $minify_config['noout'] = true; require_once('minify.inc.php'); $minify_config['group'] = 'betterrecipes'; new Minify($minify_config); ?><link rel="shortcut icon" href="http://www.betterrecipes.com/favicon.ico"/></head><body><header><div class="wrap"><a href="http://www.betterrecipes.com/" class="logo">BetterRecipes</a><div id="537278266_728x90_ATF" class="ad"></div><a class="menu"></a></div><nav><div class="wrap"><a href="http://www.betterrecipes.com/recipes">Recipes</a><a href="http://www.betterrecipes.com/blogs/daily-dish">The Daily Dish</a><a href="http://www.betterrecipes.com/contests">Contests</a><a href="http://win.betterrecipes.com/" class="on">Sweepstakes</a><form method="GET" action="http://www.betterrecipes.com/search"><input type="text" name="term" placeholder="Search for recipe" required/><input type="submit" value="Search"/><input type="hidden" name="PageType" value="Recipe"/></form></div></nav></header><div id="jds" class="wrap <?= $site_slug ?>"><div class="main"><a class="banner" href="/"><span>Enter to win prizes daily</span></a><?php foreach ($view as $v) { $this->load->view($v, compact('data')); } ?></div><div class="rail"><div id="537278268_300x250_ATF"></div><div id="537278269_300x250_BTF"></div></div></div><footer><div class="wrap"><div id="537278267_728x90_BTF" class="ad"></div>©<?= ' '.date('Y').' ' ?>June Media Inc <a href="http://www.betterrecipes.com/privacy">Privacy Policy</a> <a href="http://www.betterrecipes.com/terms">Terms of Service</a></div></footer><?php if (@$solvemedia) { $this->load->view('partials/captcha'); } ?><script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script><script>(function(w,m){w[m]=w[m]&&!w[m].nodeName?w[m]:function(){(w[m].q=w[m].q||[]).push(arguments)}})(window,'jds')<?php

        $js_script_arr = array();

        /* SolveMedia */
        if (@$solvemedia) {
            $js_script_arr[] = $solvemedia;
        }

        /* GTM */
        if (@$site_gtm) {
            $js_script_arr[] = 'jds("gtm","' . $site_gtm . '")';
        }

        if ($js_script_arr) {
            echo ';' . implode(';', $js_script_arr);
        }
 ?></script><?php /* jds-TIMESTAMP.min.js */ $minify_config['noout'] = true; require_once('minify.inc.php'); $minify_config['group'] = 'mainjs'; new Minify($minify_config); ?></body>