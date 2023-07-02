$(document).ready(function () {
  $('.page-link').on('click', function (e) {
    e.preventDefault();
    let val = $(this).text();
    let url = new URL(window.location.href);
    if (val === 'First') {
      val = '1';
    }
    else if (val === 'Last') {
      val = $(".page-link:not(#first, #last)").length;
    }
    // Add the query parameter
    url.searchParams.set('page', val);
    // Navigate to the new URL
    window.location.href = url.href;
  });
});