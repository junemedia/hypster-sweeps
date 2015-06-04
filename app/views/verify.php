<? extract($data); ?>
<? if ($status == 1): ?>
<h1>Verified</h1>

<p>Thank you! Your email address has been verified.</p>

<p>Please return to our <a href="/">sweepstakes</a> and keep entering for your chance to win!</p>

<? else: ?>

<h1>Verification Failed</h1>

<p><?= $msg ?></p>

<p>Please login and request a new verification email on your <a href="/profile">profile settings</a> page.</p>

<? endif; ?>
