<div id="rules">
    <? $this->load->view('partials/banner/home'); ?>
    <p>
        <a href="<?= $channel_url ?>">&lt; Back Home</a>
    </p>
    <? if (isset($grandprize['grandprize_rule_template_id'])): ?>
        <!-- <a class="flri sweeps_menu_btn" href="javascript:void(0);" onclick="sweeps_open('#sweeps_grandprize');">Grand Prize Rules &gt;&gt;</a> -->
    <? endif; ?>
    <?= $body ?>
</div>