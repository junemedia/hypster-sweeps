<? extract($data); ?>
<div id="signup" class="frame"><!-- NO GAP

 --><?php //$this->load->view('partials/signup_form.php'); ?><!-- NO GAP

 --><form id="login_form" class="login" method="post" action="/api/login">
        <h2>Already a Member?</h2>
        <fieldset class="login">
            <label for="login_username">Username</label>
            <input type="text" name="username" id="login_username"/>
            <label for="login_password">Password</label>
            <input name="password" type="password" id="login_password"/>
        </fieldset>
        <a href="http://hypster.com/account/ForgotPassword" class="forgot">Forgot password?</a>
        <div class="alert"></div>
        <fieldset class="submit"><!-- NO GAP
         --><input type="submit" value="Enter Now"/><!-- NO GAP
         --><span class="loader"></span><!-- NO GAP
     --></fieldset>
    </form><!-- NO GAP

 --><?php //$this->load->view('partials/forgot_form.php'); ?><!-- NO GAP

--></div><!-- /#signup.frame -->
