<div id="prize" class="frame">
<? if (@$prize): ?>
    <h3 class="prize_today"><!-- NO GAP
     --><?= date('Y') == date('Y', strtotime($prize['date'])) ? date( "F j", strtotime($prize['date'])) : date( "F j, Y", strtotime($prize['date'])); ?><!-- NO GAP
     --><? if (date('Y-m-d') == date('Y-m-d', strtotime($prize['date']))) echo '&nbsp;|&nbsp;<span>Win today’s prize</span>'; ?><!-- NO GAP
     --></h3>
    <div class="prize col2"><!-- NO GAP
     --><img src="<?= $prize['img1'] ?>"/><!-- NO GAP
     --><div class="info"><!-- NO GAP
         --><h1><?= $prize['title'] ?></h1><!-- NO GAP
         --><p><?= $prize['desc1'] ?></p><!-- NO GAP
         --><div class="alert"></div><!-- NO GAP
         --><form id="prize_form" class="submit" action="/api/enter" method="POST"><!-- NO GAP
             --><input type="submit" value="Enter Now"/><!-- NO GAP
             --><span class="ajax-loader"></span><!-- NO GAP
         --></form><!-- NO GAP
         --><p class="legal">Prizes are shared across June Media sites. See <a href="/rules" target="_blank">Official Rules</a>.</p><!-- NO GAP
     --></div><!-- NO GAP
 --></div>
<? else: ?>
    <h3>No prize for this date.</h3>
<? endif; ?>
</div>