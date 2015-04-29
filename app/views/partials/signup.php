<? extract($data); ?>
<div id="signup" class="frame"><!-- NO GAP

 --><form id="signup_form" class="signup" method="post" action="/api/signup" onsubmit="solvemedia()">
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

 --><form id="login_form" class="login" method="post" action="/api/login">
        <h2>Already a Member?</h2>
        <fieldset class="login">
            <label for="login_email">Email</label>
            <input type="email" name="email" id="login_email"/>
            <label for="login_password">Password</label>
            <input name="password" type="password" id="login_password"/>
        </fieldset>
        <a class="forgot">Forgot password?</a>
        <div class="alert"></div>
        <fieldset class="submit"><!-- NO GAP
         --><input type="submit" value="Enter Now"/><!-- NO GAP
         --><span class="loader"></span><!-- NO GAP
     --></fieldset>
    </form><!-- NO GAP

 --><form id="forgot_form" class="login" method="post" action="/api/forgot">
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
    </form><!-- NO GAP

--></div><!-- /#signup.frame -->