<? if (@$prizes): ?>
    <div class="carousel"><!-- NO GAP
     --><div class="fade left"></div><!-- NO GAP
     --><div class="fade right"></div><!-- NO GAP
     --><a class="prev"></a><!-- NO GAP
     --><a class="next"></a><!-- NO GAP
     --><div class="wrap"><!-- NO GAP
 --><!-- htmlmin:ignore --><?php foreach ($prizes as $c_prize):
        $timestamp = strtotime($c_prize['date']);
        $today_y_m_d = date('Y-m-d');
        $div_open = ($c_prize['date'] == $today_y_m_d) ? '<div class="today">' : '<div>';
        $weekday = date('j', $timestamp) == 1
                ? mb_strtoupper(date('F', $timestamp)) // Month (i.e. NOVEMBER)
                : date('l', $timestamp); // Weekday (i.e. Thursday)
        $div_close = '</div>' ?><!-- htmlmin:ignore --><!-- NO GAP
         --><?= $div_open ?><!-- NO GAP
             --><b><?= $weekday ?></b><!-- NO GAP
             --><b><?= date('j', $timestamp) ?></b><!-- NO GAP
             --><a href="/prize/<?=$c_prize['date']?>"><!-- NO GAP
                 --><img src="<?= trim($c_prize['img1']) ?>"/><!-- NO GAP
             --></a><!-- NO GAP
         --><?= $div_close ?><!-- NO GAP
     --><? endforeach; ?><!-- NO GAP
     --></div>
    </div>
    <a class="see_all_prizes" href="/calendar">See all prizes for each day</a>
<? endif; ?>