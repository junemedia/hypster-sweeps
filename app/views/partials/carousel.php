<?php
    extract($data);
    $today_y_m_d = date('Y-m-d');
    $today_timestamp = strtotime(date('Y-m-d'));
    $div_close = '</div>';
?>
<? if (@$prizes): ?>
    <div class="carousel"><!-- NO GAP
     --><div class="fade left"></div><!-- NO GAP
     --><div class="fade right"></div><!-- NO GAP
     --><b class="prev"></b><!-- NO GAP
     --><b class="next"></b><!-- NO GAP
     --><div class="wrap"><!-- NO GAP
 --><!-- htmlmin:ignore --><?php foreach ($prizes as $c_prize):
        $timestamp = strtotime($c_prize['date']);
        $div_open = ($c_prize['date'] == $today_y_m_d) ? '<div class="today">' : '<div>';
        $weekday = date('j', $timestamp) == 1
                ? mb_strtoupper(date('F', $timestamp)) // Month (i.e. NOVEMBER)
                : date('l', $timestamp); // Weekday (i.e. Thursday)
        $tag_img = sprintf('<img %ssrc="%s"/>',
            (abs($today_timestamp - $timestamp) / 86400 <= 2) ? '' : 'data-',
            $c_prize['img1']);
?><!-- htmlmin:ignore --><!-- NO GAP
         --><?= $div_open ?><!-- NO GAP
             --><i><?= $weekday ?></i><!-- NO GAP
             --><i><?= date('j', $timestamp) ?></i><!-- NO GAP
             --><a href="/prize/<?=$c_prize['date']?>"><!-- NO GAP
                 --><?= $tag_img ?><!-- NO GAP
             --></a><!-- NO GAP
         --><?= $div_close ?><!-- NO GAP
     --><? endforeach; ?><!-- NO GAP
     --></div>
    </div>
    <a class="see_all_prizes" href="/calendar">See all prizes for each day</a>
<? endif; ?>