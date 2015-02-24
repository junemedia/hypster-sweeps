<?php
    extract($data);
    $is_todays_prize = date('Y-m-d') == $prize['date'];
?>
<div id="prize" class="frame">
<? if (@$prize): ?>
    <h3 class="account">Welcome <a href="/profile"></a>, <a class="logout">logout</a></h3>
    <h3 class="prize_today"><!-- NO GAP
     --><?= date('Y') == date('Y', strtotime($prize['date'])) ? date( "F j", strtotime($prize['date'])) : date( "F j, Y", strtotime($prize['date'])); ?><!-- NO GAP
     --><? if ($is_todays_prize) echo '&nbsp;| <span>Win today’s prize</span>'; ?><!-- NO GAP
     --></h3>
    <div class="prize"><!-- NO GAP
     --><img src="<?= $prize['img1'] ?>" data-img2="<?= @$prize['img2'] ?>" data-img3="<?= @$prize['img3'] ?>"/><!-- NO GAP
     --><div class="info"><!-- NO GAP
         --><h1><?= $prize['title'] ?></h1><!-- NO GAP
         --><p data-desc2="<?= safeAttr(@$prize['desc2']) ?>" data-desc3="<?= safeAttr(@$prize['desc3']) ?>"><?= $prize['desc1'] ?></p><!-- NO GAP
         --><div class="alert"></div><!-- NO GAP
         --><?php if ($is_todays_prize): ?><!-- NO GAP
         --><form id="prize_form" class="submit" action="/api/enter" method="POST"><!-- NO GAP
             --><input type="submit" value="Enter Now"/><!-- NO GAP
             --><span class="loader"></span><!-- NO GAP
         --></form><!-- NO GAP
         --><?php else: ?><!-- NO GAP
         --><a href="/">Back to today’s prize</a><!--
         --><?php endif ?><!-- NO GAP
         --><p class="legal">Prizes are shared across June Media sites. <span>See <a href="/rules" target="_blank">Official Rules</a>.</span></p><!-- NO GAP
     --></div><!-- NO GAP
 --></div>
<? else: ?>
    <h3>No prize for this date.</h3>
<? endif; ?>
</div>