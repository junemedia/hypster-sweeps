<? extract($data) ?>
<table id="thanks">
<?php foreach($sites as $site): ?>
    <tr>
        <th><?= $site['name'] ?></th>
        <td>
            <form action="/admin/thanks/<?= $site['id'] ?>" method="POST">
                <textarea name="thanks" placeholder="(empty)"><?= $site['thanks'] ?></textarea>
                <input type="submit" value="Save"/>
                <input type="reset" value="Reset"/>
            </form>
        </td>
    </tr>
<?php endforeach; ?>
</table>