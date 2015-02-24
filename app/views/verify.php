<? extract($data); ?>
<? if ($status == 1): ?>
Thank you! You’re email address has been verified.
<? else: ?>
<?= $msg ?>
<? endif; ?>