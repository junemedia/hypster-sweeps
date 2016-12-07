<form id="signup_form" class="signup" method="post" action="/api/signup" onsubmit="solvemedia()">
    <fieldset class="profile">
        <label for="firstname" class="req">First Name</label><input type="text" name="firstname" id="firstname"/>
        <label for="lastname" class="req">Last Name</label><input type="text" name="lastname" id="firstname"/>
        <label for="address" class="req">Street Address</label><input type="text" name="address" id="address"/>
        <label for="zip" class="req">Zip Code</label><input type="text" name="zip" id="zip" pattern="\d*"/>
    </fieldset>

    <fieldset class="credentials">
        <label for="email" class="req">Email</label><input type="email" name="email" id="email"/>
        <label for="password" class="req">Password</label><input type="password" name="password" id="password"/>
    </fieldset>

    <fieldset class="optin">
        <label for="optin"><input type="checkbox" name="optin" id="optin" checked/>Send me email updates and special offers from June Media</label>
    </fieldset>

    <div class="alert"></div>

    <fieldset class="submit"><!-- NO GAP
      --><input type="submit" value="Next"/><!-- NO GAP
      --><span class="loader"></span><!-- NO GAP
  --></fieldset>
</form><!-- NO GAP

