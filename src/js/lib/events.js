define(['./hook'], {
    // Event hook registration (used mostly for GTM events and refreshAds)
    enterAnonymous: hook('enterAnonymous'), // anonymous user clicks on the "Enter Now" button.
    signup: hook('signup'), // user registered a new account successfully
    signupFail: hook('signupFail'), // user failed to register a new account
    login: hook('login'), // user authenticates successfully
    loginFail: hook('loginFail'), // user failed to authenticate
    enter: hook('enter'), // authenticated user successfully entered into today’s contest
    enterDuplicate: hook('enterDuplicate'), // authenticated user re-entered into today’s contest
    enterFail: hook('enterFail'), // authenticated user failed to enter into today’s contest for a reason other than duplicate
    forgot: hook('forgot'), // anonymous user successfully entered his/her email and triggered a password reset email
    reset: hook('reset'), // anonymous user successfully reset his/her password
    verify: hook('verify'), // authenticated or anonymous user successfully verified his/her email address (verification email sent after new signup or email address change via profile update)
    verifyRequest: hook('verifyRequest'), // authenticated user requested to verify his/her email address
    profileUpdate: hook('profileUpdate'), // authenticated user updated his/her profile
    logout: hook('logout'), // authenticated user logs in
    slideshowPrize: hook('slideshowPrize'), // next/prev on the prize slideshow/carousel
    slideshowCalendar: hook('slideshowCalendar'), // next/prev on the calendar slideshow/carousel
    slideshowWinner: hook('slideshowWinner') // next/prev on the winner slideshow/carousel
});