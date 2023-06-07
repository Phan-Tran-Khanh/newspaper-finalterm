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

  $('[id$="-err"]').hide();

  // Validate passwords inputted
  function validatePassword(event, password, confirmPassword, errorNotif) {
    password = $(password).val();
    confirmPassword = $(confirmPassword).val();
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
      $(errorNotif).text(errorMessage);
      $(errorNotif).show();
      event.preventDefault(); // Prevent form submission
    } else {
      $(errorNotif).hide();
    }
  }

  $('#signup-btn').on('click', function (e) {
    validatePassword(e, '#signup-password', '#signup-repassword', '#signup-err');
  });

  $('#resetpw-btn').on('click', function (e) {
    validatePassword(e, '#reset-password', '#reset-repassword', '#resetpw-err');
  });

  // Handle forms submission without rendering
  function formSubmit(event, formID, urlPath, modalShow, modalHide, errorNotif) {
    event.preventDefault();

    // Send AJAX request
    $.ajax({
      url: urlPath,
      method: 'POST',
      data: $(formID).serialize(),
      success: function (response) {
        $(errorNotif).hide();
        $(modalHide).modal('hide');
        $(modalShow).modal('show');
      },
      error: function (xhr, status, error) {
        $(errorNotif).text(error);
        $(errorNotif).show();
      }
    });
  }

  $('#forgotpw-form').on('submit', function (e) {
    formSubmit(e, '#forgotpw-form', '/auth/forgot-password', '#modalResetPassword', '#modalForgotPassword', '#forgotpw-err');
  });

  $('#resetpw-form').on('submit', function (e) {
    formSubmit(e, '#resetpw-form', '/auth/reset-password', '#modalLoginSignup', '#modalResetPassword', '#resetpw-err');
  });

  $('#login-form').on('submit', function (e) {
    e.preventDefault();

    // Send AJAX request
    $.ajax({
      url: '/auth/login',
      method: 'POST',
      data: $('#login-form').serialize(),
      success: function (response) {
        $('#login-err').hide();
        $('#modalLoginSignup').modal('hide');
        setTimeout(function () {
          location.reload();
        }, 1000);
      },
      error: function (xhr, status, error) {
        $('#login-err').text('Password or email is not correct.');
        $('#login-err').show();
      }
    });
  });

  // Payment Method: Paypal
  paypal.Buttons({
    style: {
      layout: 'vertical',
      color: 'blue',
      shape: 'rect',
      label: 'paypal'
    }
  }).render('#paypal-button-container');
});