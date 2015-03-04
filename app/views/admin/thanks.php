<? extract($data) ?>
<div id="thanks">
<?php foreach($sites as $site): ?>
<?= $site['name']; ?>
<?php endforeach; ?>
</div>