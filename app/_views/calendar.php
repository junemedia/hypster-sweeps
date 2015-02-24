<? extract($data); ?><div id="calendar"><div id="cal"><?
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
                ?><?= $li_open ?><? if ($prize): ?><img src="<?= $prize['img1']?>"/><h4><?=$prize['title']?></h4><? if ($is_today): ?><a href="/">Enter Now</a><? else: ?><a href="/prize/<?= $prize['date'] ?>">View Details</a><? endif; ?><span><?= $dom ?></span><? else: ?><p>No prize scheduled for this day.</p><? endif; ?><?= $li_close ?><? endforeach; ?></div><p><a href="/prize/<?= date('Y-m-01', strtotime($prize['date'].' +1 month'))?>">Check out next month’s daily prizes!</a></p></div>