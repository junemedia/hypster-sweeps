<? extract($data); ?>
<div id="profile">
    <h1>Update Your Profile</h1>

    <p>Please make sure that your email address and mailing address are up to date.</p>

    <form id="signup_form" class="signup profile" method="post" action="/api/signup">
        <fieldset class="profile">
            <label for="firstname" class="req">First Name</label><input type="text" name="firstname" id="firstname" placeholder="<?= $firstname ?>"/>
            <label for="lastname" class="req">Last Name</label><input type="text" name="lastname" id="firstname" placeholder="<?= $lastname ?>"/>
            <label for="address" class="req">Street Address</label><input type="text" name="address" id="address" placeholder="<?= $address ?>"/>
            <label for="zip" class="req">Zip Code</label><input type="text" name="zip" id="zip" placeholder="<?= $zip ?> (<?= $city ?>, <?= $state ?>)"/>
        </fieldset>

        <fieldset class="credentials">
            <label for="email" class="req">Email <strong><?= $verified ? '✓ verified' : '<span style="color:#933">✗ not verified.</span> <span class="verify"><a>Resend</a> verification email.</span>' ?></strong></label><input type="text" name="email" id="email" placeholder="<?= $email ?>"/>
            <label for="password" class="req">Password</label><input type="password" name="password" id="password" placeholder="•••••••••••"/>
        </fieldset>

        <div class="alert"></div>

        <fieldset class="submit"><!-- NO GAP
         --><input type="submit" value="Update"/><!-- NO GAP
         --><span class="loader"></span><!-- NO GAP
         --><a href="/">cancel</a><!-- NO GAP
     --></fieldset>

    </form>

</div>