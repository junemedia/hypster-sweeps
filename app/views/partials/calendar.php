<?php
    extract($data);
    $today_y_m_d = date('Y-m-d');
    $today_timestamp = strtotime(date('Y-m-d'));
    $a_close = '</a>';
?>
<? if (@$prizes): ?>
<div id="calendar">
    <div class="calendar<?= @$disable_slideshow ? '' : ' slideshow' ?>"><!-- NO GAP
     --><?php if (!@$disable_slideshow): ?><!-- NO GAP
     --><u class="fade left"></u><!-- NO GAP
     --><u class="fade right"></u><!-- NO GAP
     --><b class="prev"></b><!-- NO GAP
     --><b class="next"></b><!-- NO GAP
     --><div class="wrap"><!-- NO GAP
     --><?php endif; ?><!-- NO GAP
 --><!-- htmlmin:ignore --><?php foreach ($prizes as $c_prize):
        $timestamp = strtotime($c_prize['date']);
        $a_open = '<a href="/prize/' . $c_prize['date'] . '"' . (($c_prize['date'] == $today_y_m_d) ? ' class="today">' : '>');
        $weekday = date('j', $timestamp) == 1
                ? mb_strtoupper(date('F', $timestamp)) // Month (i.e. NOVEMBER)
                : date('l', $timestamp); // Weekday (i.e. Thursday)
        $tag_img = sprintf('<img %ssrc="%s"/>',
            (@$disable_slideshow || abs($today_timestamp - $timestamp) / 86400 <= 2) ? '' : 'data-',
            $c_prize['img1']);
?><!-- htmlmin:ignore --><!-- NO GAP
         --><?= $a_open ?><!-- NO GAP
             --><i><?= $weekday ?></i><!-- NO GAP
             --><i><?= date('j', $timestamp) ?></i><!-- NO GAP
             --><?php if (@$c_prize['title']): ?><!-- NO GAP
             --><?= $tag_img ?><!-- NO GAP
             --><h4><?= $c_prize['title'] ?></h4><!-- NO GAP
             --><?php else: ?><!-- NO GAP
             --><p>No prize this day</p><!-- NO GAP
             --><?php endif; ?><!-- NO GAP
         --><?= $a_close ?><!-- NO GAP
     --><? endforeach; ?><!-- NO GAP
     --><?php if (!@$disable_slideshow): ?><!-- NO GAP
     --></div><!-- NO GAP
     --><?php endif; ?><!-- NO GAP
 --></div><!-- NO GAP
 --><?php if (!@$disable_slideshow): ?><!-- NO GAP
 --><a class="see_prizes" href="/calendar">See all prizes for each day</a><!-- NO GAP
 --><?php endif; ?><!-- NO GAP
--></div>
<? endif; ?>