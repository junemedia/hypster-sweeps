<?php extract($data); ?><div id="dashboard"><nav><b data-offset="<?= $offset - 1 ?>"></b> <b data-offset="<?= $offset + 1 ?>"></b><?php /* if ($offset != 0): ?> <a href="/admin/dashboard">Today</a><?php endif; */ ?></nav><div class="cal header"><div>Sunday</div><div>Monday</div><div>Tuesday</div><div>Wednesday</div><div>Thursday</div><div>Friday</div><div>Saturday</div></div><div class="cal"><?php

    $today = date('Y-m-d');
    $previous_month = null;
    $final_month = date('F, Y', strtotime(array_pop(array_keys($contests))));

    foreach ($dates as $date):
        $c = @$contests[$date];
        $is_today = $c['date'] == $today;
        $month = date('F, Y', strtotime($date));
        $dom = (int) substr($date, 8);
        $li_class_list = array();
        if ($is_today) {
            $li_class_list[] = 'today';
        }
        if (!$c) {
            $li_class_list[] = 'blank';
        }
        $li_open = '<div' . ( $li_class_list ? ' class="'.implode(' ', $li_class_list).'"' : '' ) .'>';
        $li_close = '</div>';
        $u_tag = '';
        if ($month != $previous_month) {
            // echo sprintf('%s<h3>%s</h3><div class="cal">',
            //     $previous_month !== null ? '</div>' : '',
            //     $month
            // );
            $u_tag = '<u>' . substr($month, 0, -6) . '</u>';
            $previous_month = $month;
        }

?><?= $li_open ?><? if ($c): ?><a href="/admin/prize/<?= $c['prize_id'] ?>#<?= $c['date'] ?>"><img src="<?= $c['prize_img1']?>"/><h4><?= $c['prize_title'] ?></h4></a><h5>$<?= $c['prize_value'] . ' ' . ($c['prize_type'] == 'giftcard' ? 'Gift Card' : 'Gift Card or Prize') ?></h5><? else: ?><a href="/admin/prize/0"><img/><h4>Add Prize</h4></a><h5>–</h5><? endif; ?><? if (@$c['user_id']): ?><a href="mailto:<?= $c['user_email'] ?>"><?= $c['user_firstname'] . ' ' . $c['user_lastname'] ?></a><? else: ?> <a>–</a><? endif; ?><?php if ($u_tag) { echo $u_tag; } ?> <em><?= $dom ?></em><?= $li_close ?><?php endforeach; ?></div></div>