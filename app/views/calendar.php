<? extract($data); ?>
<div id="calendar"><!-- NO GAP
 --><div id="cal"><!-- htmlmin:ignore --><?
                $today = strtotime(date('Y-m-d'));
                $i = 0;
                foreach ($prizes as $prize):
                    $is_today = strtotime($prize['date']) == $today;
                    $dom = ++$i;
                    $li_class_list = array();
                    if ($is_today) {
                        $li_class_list[] = 'today';
                    }
                    $li_open = '<div' . ( $li_class_list ? ' class="'.implode(' ', $li_class_list).'"' : '' ) .'>';
                    $li_close = '</div>';
                ?><!-- htmlmin:ignore --><!-- NO GAP
             --><?= $li_open ?><!-- NO GAP
         --><? if ($prize): ?><!-- NO GAP
                 --><img src="<?= $prize['img1']?>"/><!-- NO GAP
                 --><!-- Hover Prize Info --><!-- NO GAP
                 --><h4><?=$prize['title']?></h4><!-- NO GAP
             --><? if ($is_today): ?><!-- NO GAP
                 --><a href="/">Enter Now</a><!-- NO GAP
             --><? else: ?><!-- NO GAP
                 --><a href="/prize/<?= $prize['date'] ?>">View Details</a><!-- NO GAP
             --><? endif; ?><!-- NO GAP
                 --><span><?= $dom ?></span><!-- NO GAP
         --><? else: ?><!-- NO GAP
                 --><p>No prize scheduled for this day.</p><!-- NO GAP
         --><? endif; ?><!-- NO GAP
             --><?= $li_close ?><!-- NO GAP
         --><?
        endforeach;
    ?></div><!-- NO GAP
 --><p><a href="/prize/<?= date('Y-m-01', strtotime($prize['date'].' +1 month'))?>">Check out next month’s daily prizes!</a></p><!-- NO GAP
 --></div>
