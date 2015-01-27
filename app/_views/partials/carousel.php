<? if (@$prizes): ?><div class="carousel"><div class="fade left"></div><div class="fade right"></div><a class="prev"></a><a class="next"></a><div class="wrap"><?php foreach ($prizes as $c_prize):
        $timestamp = strtotime($c_prize['date']);
        $today_y_m_d = date('Y-m-d');
        $div_open = ($c_prize['date'] == $today_y_m_d) ? '<div class="today">' : '<div>';
        $weekday = date('j', $timestamp) == 1
                ? mb_strtoupper(date('F', $timestamp)) // Month (i.e. NOVEMBER)
                : date('l', $timestamp); // Weekday (i.e. Thursday)
        $div_close = '</div>' ?><?= $div_open ?><b><?= $weekday ?></b><b><?= date('j', $timestamp) ?></b><a href="/prize/<?=$c_prize['date']?>"><img src="<?= trim($c_prize['img1']) ?>"/></a><?= $div_close ?><? endforeach; ?></div></div><a class="see_all_prizes" href="/calendar">See all prizes for each day</a><? endif; ?>