$(document).ready(function () {
  // Initialize popovers
  $('[data-bs-toggle="popover"]').popover();

  // Switch to the corresponding tab when clicking on a tab link in Login/Register Modals
  $('#login-signup-tabs a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show', 'active');
  });

  // Logout submitting form
  $('#logout-btn').on('click', function (e) {
    e.preventDefault();
    $('#logout-form').trigger( "submit" );
  });

  $('#forgotpw-form').on('submit', function (e) {
    $('#modalResetPassword').modal('show');
  });

  $('#signup-btn').on('click', function(e) {
    var newPassword = $('#signup-password').val();
    var confirmPassword = $('#signup-repassword').val();
    var errorMessage = $('#pws-match-err');
  
    if (newPassword !== confirmPassword) {
      // Error: Passwords do not match
      errorMessage.show();
      e.preventDefault(); // Prevent form submission
    } else {
      errorMessage.hide();
    }
  });  
});