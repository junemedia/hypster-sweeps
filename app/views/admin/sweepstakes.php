<? extract($data) ?>
<?php if (@$prizes): ?>
<table id="prizes">
    <thead>
        <tr>
            <th>Unscheduled Prizes</th>
            <th>Type &amp; Value</th>
        </tr>
    </thead>
    <tbody>
    <?php foreach($prizes as $prize):
        extract($prize);
    ?>
        <tr>
            <td><a href="/admin/prize/<?= $id ?>"><?= $title ?></a></td>
            <td><?= '$' . $value . ' Gift Card' . ($type == 'prize' ? ' or Prize' : '') ?></td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>
<?php endif; ?>

<table id="contests">
    <thead>
        <tr>
            <th colspan="2">
                <a id="reverse">Date</a>
                <a class="btn" href="/admin/prize/0">New Prize</a>
            </th>
            <th><label for="query"><input type="text" name="query" placeholder="Filter by Prize Title"/><b></b><i></i></label></th>
            <th>$ Value &amp; Type</th>
            <th>Winner</th>
        </tr>
    </thead>
    <tbody>
    <?php foreach($contests as $contest):
        extract($contest);
        if ($user_id) {
            $winner_html = sprintf('%s %s &lt;<a href="mailto:%s">%s</a>&gt;', $user_firstname, $user_lastname, $user_email, $user_email);
        } else {
            $winner_html = '-';
        }
        $time = strtotime($date);
        $day_of_week = date('l', $time);
        $pretty_date = date('n/j/y', $time);
    ?>
        <tr>
            <td><?= $pretty_date ?></td>
            <td><?= $day_of_week ?></td>
            <td><a href="/admin/prize/<?= $prize_id ?>#<?= $date ?>"><?= $prize_title ?></a></td>
            <td><?= '$' . $prize_value . ' Gift Card' . ($prize_type == 'prize' ? ' or Prize' : '') ?></td>
            <td><?= $winner_html ?></td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>
