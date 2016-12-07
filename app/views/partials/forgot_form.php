<form id="forgot_form" class="login" method="post" action="/api/forgot">
    <h2>Forget your password?</h2>
    <p>Enter your email address and we’ll send you a message with instructions how to reset your password.</p>
    <fieldset class="login">
        <label for="forgot_email">Email</label>
        <input type="email" name="email" id="forgot_email"/>
    </fieldset>
    <div class="alert"></div>
    <fieldset class="submit"><!-- NO GAP
      --><input type="submit" value="Submit"/><!-- NO GAP
      --><span class="loader"></span><!-- NO GAP
      --><a class="forgot_close">Cancel</a><!-- NO GAP
  --></fieldset>
</form>
