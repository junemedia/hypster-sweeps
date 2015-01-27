<div id="thanks" class="frame">

    <h2>Thank you for entering!</h2>
<? if (@$tomorrow['title']): ?>
    <p>Don’t forget to come back tomorrow to win<?= ' '.articleAgreement($tomorrow['title'], false).' ' ?><a href="/prize/<?= $tomorrow['date'] ?>" target="_blank"><?= trim($tomorrow['title']) ?></a>!</p>
<? endif;?>

</div>