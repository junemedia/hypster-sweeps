<? extract($data); ?>
<!DOCTYPE html>
<html>
<head>
  <title><?= safeHtml(safeTitle(@$meta['title'] ? $meta['title'] : @$meta['og:title'])) ?></title>
  <meta name="viewport" content="width=device-width"/>
  <meta name="description" content="<?= safeAttr(safeTitle(@$meta['description'] ? $meta['description'] : @$meta['og:description'])) ?>"/>

  <?php if (@is_array($meta)) {
    foreach ($meta as $key => $val) { ?>
      <meta name="<?= safeAttr($key) ?>" content="<?= safeAttr(safeTitle($val)) ?>"/>
    <?php }
  } ?>

  <link rel="stylesheet" href="<?= $assets['/css/hypster.css'] ?>"/>
  <link rel="stylesheet" href="http://hypster.com/bundles/css?v=EKDg3wnM3G5p_xNhRqwB5s4yJcmdIj6i3w5jmMn5X8k1" />

  <link rel="shortcut icon" href="http://www.hypster.com/favicon.ico"/>

  <script type="text/javascript">
    function solvemedia()
    {
      ACPuzzle.create('ym7RhIOhnKDH44Vt.atFOnHyicq2FVs6', 'acwidget', { size: 'standard' });
    }

    function closeSolve()
    {
      ACPuzzle.destroy();
      $("#solvemedia").hide();
    }
  </script>
</head>

<body>

  <?php $this->load->view("partials/header"); ?>

  <div id="jds" class="<?= $site_slug ?>">
    <div class="main">
      <!-- THIS SHOULD EVENTUALLY BE PART OF THE ADMIN -->
      <a class="banner" href="/"><span>Enter to win prizes daily</span></a>

      <?php
      foreach ($view as $v) {
        $this->load->view($v, compact('data'));
      } ?>

    </div><!-- NO GAP

 --><div class="rail">
      <!-- Right Rail Ad Units -->
      <div class="ad" data-id="300x250_ATF"></div>
      <div class="ad" data-id="ourbestbox"></div>
      <div class="ad" data-id="300x250_BTF"></div>
      <div class="ad" data-id="zergnet-widget-29457"></div>
    </div>
  </div>

  <div class="ad" data-id="728x90_BTF"></div>


  <?php $this->load->view("partials/footer"); ?>

  <?php if (@$solvemedia) { $this->load->view('partials/captcha'); } ?>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

  <!-- Create the `jds` pre-object/function which allows for jds() calls before jds.js is loaded -->
  <script>(function(w,m){w[m]=w[m]&&!w[m].nodeName?w[m]:function(){(w[m].q=w[m].q||[]).push(arguments)}})(window,'jds')<?php

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
?></script>

  <script async src="<?= $assets['/js/hypster.js'] ?>"></script>

  <script>
    $(document).ready(function(){
      $.ajaxSetup({
        cache: true
      });

      $.getScript( "http://api.solvemedia.com/papi/challenge.ajax", function( data, textStatus, jqxhr ) {
        //console.log( data ); // Data returned
      });
    });
  </script>

  <?php $this->load->view("ads/$site_slug/underdog"); ?>
  <?php $this->load->view("ads/$site_slug/swoop"); ?>

</body>
</html>
