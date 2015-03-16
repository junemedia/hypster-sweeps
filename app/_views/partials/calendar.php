<?php extract($data); $today_y_m_d = date('Y-m-d'); $today_timestamp = strtotime(date('Y-m-d')); $a_close = '</a>'; ?><? if (@$prizes): ?><div id="calendar"><div class="calendar<?= @$disable_slideshow ? '' : ' slideshow' ?>"><?php if (!@$disable_slideshow): ?><u class="fade left"></u><u class="fade right"></u><b class="prev"></b><b class="next"></b><div class="wrap"><?php endif; ?><?php foreach ($prizes as $c_prize):
        $timestamp = strtotime($c_prize['date']);
        $a_open = '<a href="/prize/' . $c_prize['date'] . '"' . (($c_prize['date'] == $today_y_m_d) ? ' class="today">' : '>');
        $weekday = date('j', $timestamp) == 1
                ? mb_strtoupper(date('F', $timestamp)) // Month (i.e. NOVEMBER)
                : date('l', $timestamp); // Weekday (i.e. Thursday)
        $tag_img = sprintf('<img %ssrc="%s"/>',
            (@$disable_slideshow || abs($today_timestamp - $timestamp) / 86400 <= 2) ? '' : 'data-',
            $c_prize['img1']);
?><?= $a_open ?><i><?= $weekday ?></i><i><?= date('j', $timestamp) ?></i><?php if (@$c_prize['title']): ?><?= $tag_img ?><h4><?= $c_prize['title'] ?></h4><?php else: ?><p>No prize this day</p><?php endif; ?><?= $a_close ?><? endforeach; ?><?php if (!@$disable_slideshow): ?></div><?php endif; ?></div><?php if (!@$disable_slideshow): ?><a class="see_prizes" href="/calendar">See all prizes for each day</a><?php endif; ?></div><? endif; ?>