<?php
    $data['disable_slideshow'] = true;
    extract($data);
    $month = (@$prizes[0]['date']) ? date('F', strtotime($prizes[0]['date'])) : '';
?>
<div id="calendar">
    <header><?= $month ?></header><?php
    $this->load->view('partials/calendar', $data); ?><!-- NO GAP
--><? /* <p><a href="/prize/<?= date('Y-m-01', strtotime('next month'))?>">Check out next month’s daily prizes!</a></p>*/ ?>
</div>