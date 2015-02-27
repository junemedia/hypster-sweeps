<? extract($data); ?>
    <div id="winners">
<? if (isset($winners)): ?>
        <h3>Recent Winners</h3>
        <div class="winners"><?
        foreach ($winners as $key => $winner):
            ?><div><img
            src="<?= trim($winner['prize_img1']) ?>"/><div>
                    <h6><?= date("F j", strtotime($winner['date'])); ?></h6>
                    <h5><a href="/prize/<?= $winner['date'] ?>"><?= $winner['prize_title'] ?></a></h5>
                    <?= firstNameLastInitial($winner['user_firstname'], $winner['user_lastname']) ?><br/><?= $winner['user_city'] . ', ' . $winner['user_state'] ?></p>
                </div
            ></div><?
        endforeach;
        ?></div>
        <a class="see_winners" href="/winners">See Past Winners</a>
<? else: ?>
        <p>No winners yet.</p>
<? endif; ?>
    </div>