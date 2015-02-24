<?php
    extract($data);
    extract($prize);
?>
<form class="upload" method="POST" accept-charset="UTF-8" enctype="multipart/form-data">
    <input type="file" name="img" accept="image/jpeg"/>
</form>

<form class="prize" method="POST" action="/admin/prize">
    <section class="details">
        <h2>Prize Details</h2>
        <input type="hidden" name="id" value="<?= @$id ? $id : 0 ?>"/>
        <input type="text" name="title" placeholder="Prize Title" value="<?= @$title ?>" required/>
        <fieldset class="img <?= !@$img1 ? ' empty': '' ?>">
            <img src="<?= @$img1_url ? $img1_url : '/img/unavailable.png' ?>"/>
            <input type="hidden" name="img1" value="<?= @$img1 ?>"/>
            <b></b>
            <div><textarea name="desc1" placeholder="Primary description"><?= @$desc1 ?></textarea></div>
        </fieldset>
        <fieldset class="img <?= !@$img2 ? ' empty': '' ?>">
            <img src="<?= @$img2_url ? $img2_url : '/img/unavailable.png' ?>"/>
            <input type="hidden" name="img2" value="<?= @$img2 ?>"/>
            <b></b>
            <div><textarea name="desc2" placeholder="Secondary description"><?= @$desc2 ?></textarea></div>
        </fieldset>
        <fieldset class="img <?= !@$img3 ? ' empty': '' ?>">
            <img src="<?= @$img3_url ? $img3_url : '/img/unavailable.png' ?>"/>
            <input type="hidden" name="img3" value="<?= @$img3 ?>"/>
            <b></b>
            <div><textarea name="desc3" placeholder="Tertiary description"><?= @$desc3 ?></textarea></div>
        </fieldset>
    </section>
    <section class="legal"><?=
        sprintf('<label for="award"><span>Awarded As</span><input type="text" name="award" placeholder="$100 gift card" value="%s"%s required/></label>', @$award, @$immutable ? ' disabled' : '').
        sprintf('<label for="value"><span>Retail Value</span><input type="text" name="value" placeholder="$ value" pattern="\d*" value="%s"%s required/></label>', @$value, @$immutable ? ' disabled' : '')
        ?><label for="type"><span>Email Template</span>
        <?= sprintf('<select name="type"%s>', @$immutable ? ' disabled': '') ?>
                <?= sprintf('<option value="giftcard"%s>Giftcard</option>', @$type == 'giftcard' ? ' selected' : '') ?>
                <?= sprintf('<option value="prize"%s>Giftcard or Prize</option>', @$type == 'prize' ? ' selected' : '') ?>
        <?= sprintf('</select>') ?>
        </label>
    </section>
    <section>
        <input type="submit" value="No Changes" disabled/><span class="loader"></span><input type="reset" value="reset" disabled/>
        <div class="msg"></div>
    </section>
</form>

<form class="flights">
    <h2>Flight Dates &amp; Winners</h2>
    <input type="hidden" name="dates"/>
    <table id="flight">
        <tr>
            <th></th>
            <th>Date</th>
            <th>Winner</th>
            <th></th>
        </tr>
<?php
    $this_morning = strtotime(date('Y-m-d'));
    if (@$contests) foreach ($contests as $contest):
        $diff = strtotime($contest['date']) - $this_morning;
        $class = $diff > 0 ? 'future' : ($diff < 0 ? 'won' : '');

?>
        <tr class="<?= $class ?>">
            <td><b></b></td>
            <td><?= $contest['date'] ?></td>
            <?= winner_tds_html($contest) ?>
        </tr>
<? endforeach ?>
        <tr>
            <th>Add Flight Date:</th>
            <th><input type="text" id="add_flight" placeholder="YYYY-MM-DD" pattern="20\d\d-[01]\d-[0-3]\d"/></th>
            <th id="contest_error" colspan="2"></th>
        </tr>
    </table>
</form>