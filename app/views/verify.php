<? $this->load->view('shell/'.$site_slug.'/header', compact($site_slug, $meta)); ?>

<? if ($status == 1): ?>
Thank you! You’re email address has been verified.
<? else: ?>
<?= $msg ?>
<? endif; ?>

<? $this->load->view('shell/'.$site_slug.'/footer'); ?>