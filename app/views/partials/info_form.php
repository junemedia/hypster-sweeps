<div id="info" class="frame">
  <h1>Update Your Info</h1>

  <p>Please make sure that your mailing address is up to date.</p>

  <form id="info_form" class="info profile" method="post" action="/api/user">
    <fieldset class="profile">
      <label for="firstname" class="req">First Name</label>
      <input type="text" name="firstname" class="firstname"/>

      <label for="lastname" class="req">Last Name</label>
      <input type="text" name="lastname" class="lastname"/>

      <label for="address" class="req">Street Address</label>
      <input type="text" name="address" class="address"/>

      <label for="city" class="req">City</label>
      <input type="text" name="city" class="city"/>

      <label for="state" class="req">State</label>
      <input type="text" name="state" class="state"/>

      <label for="zipcode" class="req">Zip Code</label>
      <input type="text" name="zipcode" class="zipcode"/>
    </fieldset>

    <div class="alert"></div>

    <fieldset class="submit"><!-- NO GAP
      --><input type="submit" value="Update"/><!-- NO GAP
      --><span class="loader"></span><!-- NO GAP
      --><a href="/">cancel</a><!-- NO GAP
    --></fieldset>
  </form>
</div>
