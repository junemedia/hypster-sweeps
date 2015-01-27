<div id="splash" class="frame">

<? if (@$today['date']): ?>
    <h3 class="prize_today"><?= date( "F j", strtotime($today['date'])); ?>&nbsp;|&nbsp;<span>Win today’s prize</span></h3>
    <div class="prize col2"><!-- NO GAP
     --><img src="<?= trim($today['img1']) ?>"/><!-- NO GAP
     --><div class="info">
            <h1><?= trim($today['title']) ?></h1>
            <p><?= trim($today['desc1']) ?></p>
            <a class="btn" id="mdsenter">Enter Now</a>
            <p class="directives"><!-- NO GAP
             --><a href="/rules" target="_blank">Official Rules</a><!-- NO GAP
             --><a class="logout">Logout</a><!-- NO GAP
         --></p>
        </div><!-- NO GAP
 --></div>
    <p class="legal">Prizes are shared across Meredith sites. See Official Rules.</p>
<? else: ?>
    <h3>No prize for this date.</h3>
<? endif; ?>

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


    <div class="winners">
<? if (isset($winners)): ?>
        <h3>Recent Winners</h3>
        <p>Winners and prizes are site specific</p>
        <div class="list col2"><?
        foreach ($winners as $key => $winner):
            ?><div class="winner col2"><img
            src="<?= trim($winner['prize_img1']) ?>"/><div>
                    <h6 class="day"><?= date( "F j", strtotime($winner['date'])); ?></h6>
                    <h5><a><?= trim($winner['prize_title']) ?></a></h5>
                    <?= $winner['user_first_name'] ?><br/><?= $winner['user_city'] ?></p>
                </div
            ></div><?
        endforeach;
        ?></div>
        <a class="see_winners" href="/winners">See Past Winners</a>
<? else: ?>
        <p>No winners yet.</p>
<? endif; ?>
    </div>
</div><!-- /#splash -->