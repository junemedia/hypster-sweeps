<?php
    extract($data);
    $is_todays_prize = date('Y-m-d') == $prize['date'];
    $tag_img = @$prize['img1']
        ? sprintf('<img%s%s%s/>',
            ' src="' . $prize['img1'] . '"',
            @$prize['img2'] ? ' data-img2="' . $prize['img2'] .'"' : '',
            @$prize['img3'] ? ' data-img3="' . $prize['img3'] .'"' : ''
            )
        : '';
    $tag_desc = @$prize['desc1']
        ? sprintf('<p%s%s>%s</p>',
            @$prize['desc2'] ? ' data-desc2="' . safeAttr($prize['desc2']) . '"' : '',
            @$prize['desc3'] ? ' data-desc3="' . safeAttr($prize['desc3']) . '"' : '',
            safeHtml($prize['desc1'])
            )
        : '';
?>
<div id="prize" class="frame">
<? if (@$prize): ?>
    <h3 class="account">Welcome Back
      <p><!--<a href="/profile">Update Profile</a> | --><a class="logout">Logout</a></p>
    </h3>

    <h3 class="prize_today"><!-- NO GAP
     --><?= date('Y') == date('Y', strtotime($prize['date'])) ? date( "F j", strtotime($prize['date'])) : date( "F j, Y", strtotime($prize['date'])); ?><!-- NO GAP
     --><? if ($is_todays_prize) echo '&nbsp;| <span>Win Today’s Prize</span>'; ?><!-- NO GAP
     --></h3>
    <div class="prize"><!-- NO GAP
     --><?= $tag_img ?><!-- NO GAP
     --><div class="info"><!-- NO GAP
         --><h1><?= $prize['title'] ?></h1><!-- NO GAP
         --><?= $tag_desc ?><!-- NO GAP
         --><div class="alert"></div><!-- NO GAP
         --><?php if ($is_todays_prize): ?><!-- NO GAP
         --><form id="prize_form" class="submit" action="/api/enter" method="POST" onsubmit="solvemedia()"><!-- NO GAP
             --><input type="submit" value="Enter Now"/><!-- NO GAP
             --><span class="loader"></span><!-- NO GAP
         --></form><!-- NO GAP
         --><p class="legal"><span>See <a href="/rules">Official Rules</a>.</span></p><!-- NO GAP
         --><?php else: ?><!-- NO GAP
         --><a href="/">Back to today’s prize</a><!--
         --><?php endif ?><!-- NO GAP
     --></div><!-- NO GAP
 --></div>
<? else: ?>
    <h3>No prize for this date.</h3>
<? endif; ?>
</div>
