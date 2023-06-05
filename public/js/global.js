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
    $('#logout-form').trigger("submit");
  });

  // Reset Password
  $('#forgotpw-form').on('submit', function (e) {
    $('#modalResetPassword').modal('show');
  });

  // Validate passwords inputted
  $('#pws-match-err').hide();

  $('#signup-btn').on('click', function (e) {
    let password = $('#signup-password').val();
    let confirmPassword = $('#signup-repassword').val();
    let errorMessage = null;

    // Password length should be at least 8 characters
    if (password.length < 8) {
      errorMessage = "Password length should be at least 8 characters."
    }

    // Password should contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      errorMessage = "Password should contain at least one uppercase letter.";
    }

    // Password should contain at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      errorMessage = "Password should contain at least one lowercase letter.";
    }

    // Password should contain at least one digit
    if (!/[0-9]/.test(password)) {
      errorMessage = "Password should contain at least one digit.";
    }

    // Password should contain at least one special character
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errorMessage = "Password should contain at least one special character.";
    }

    // Error: Passwords do not match
    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match.";
    }

    if (errorMessage) {
      $('#pws-err').text(errorMessage);
      $('#pws-err').show();
      e.preventDefault(); // Prevent form submission
    } else {
      $('#pws-err').hide();
    }
  });
});