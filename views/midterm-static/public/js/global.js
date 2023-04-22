$(document).ready(function () {
    // Switch to the corresponding tab when clicking on a tab link in Login/Register Modals
    $('#login-register-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show', 'active');
    });

    // Hide #user-btn and show #anonymity-btn by default
    $('#user-btn').hide();
    $('#anonymity-btn').show();

    // Event handler for login/register buttons
    $('#login-btn, #register-btn').click(function (e) {
        $('#anonymity-btn').hide();
        $('#user-btn').show();
    });

    // Event handler for logout button
    $('#logout-btn').click(function (e) {
        $('#anonymity-btn').show();
        $('#user-btn').hide();
    });
});
