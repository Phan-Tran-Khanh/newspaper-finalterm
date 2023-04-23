$(document).ready(function () {
    // Initialize popover
    $('[data-bs-toggle="popover"]').popover();

    // Event listener for "First" button click
    $('#first').on('click', function (e) {
        e.preventDefault();
        $('.pagination li a.active').removeClass('active');
        $('.pagination li').eq(1).find('a').addClass('active');
        $('[id^="group-"]').hide();
        $('#group-1').show();
    });

    // Event listener for "Last" button click
    $('#last').on('click', function (e) {
        e.preventDefault();
        $('.pagination li a.active').removeClass('active');
        $('.pagination li').eq(-2).find('a').addClass('active');
        $('[id^="group-"]').hide();
        let $lastPage = $('.pagination li a.active').text();
        $('#group-' + $lastPage).show();
    });

    // Add click event listeners to page links in Pagination
    $('.pagination li a:not(#first, #last)').on('click', function (e) {
        e.preventDefault();
        $('.pagination li a.active').removeClass('active');
        $(this).addClass('active');
        $('[id^="group-"]').hide();
        let $curPage = $(this).text();
        $('#group-' + $curPage).show();
    });

    // Initialize first page of articles
    $('[id^="group-"]:not(#group-1)').hide();

    // Attach an input event handler to the search input element
    $('#search-input').on('input', function () {
        // Get the search input value
        let $searchValue = $(this).val().toLowerCase();

        // Filter the list items based on the search input value
        $('a[href="article.html"]').each(function () {
            // Get the text content of the current list item and convert it to lowercase
            let $listItemText = $(this).text().toLowerCase();
            // Check if the list item text contains the search input value
            if ($listItemText.indexOf($searchValue) !== -1) {
                // Show the list item if it matches the search input value
                $(this).parents('.card').show();
            } else {
                // Hide the list item if it does not match the search input value
                $(this).parents('.card').hide();
            }
        });
    });
});