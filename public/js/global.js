$(document).ready(function () {
  // Switch to the corresponding tab when clicking on a tab link in Login/Register Modals
  $('#login-signup-tabs a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show', 'active');
  });
});