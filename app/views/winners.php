<?php
    $data['disable_slideshow'] = true;
    extract($data);
?>
<div id="winners"><?php
    $this->load->view('partials/winners', $data); ?>
</div>