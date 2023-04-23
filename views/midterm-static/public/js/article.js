$(document).ready(function () {
    /* Add New Comment */
    $("#comment-input").on('submit', function (e) {
        // Prevent comment being submitted
        e.preventDefault();
        // Create a new comment element
        let newComment = $("<div>", { "class": "card" }).append(
            $("<div>", { "class": "card-body" }).append(
                $("<div>", { "class": "media" }).append(
                    $("<img>", { "src": "https://via.placeholder.com/50x50", "alt": "..." }),
                    $("<div>", { "class": "media-body" }).append(
                        $("<h5>", { "class": "mt-0" }).text("DongNike"),
                        $("<p>").text($("#comment-text").val())
                    ),
                    $("<p>", { "class": "card-text small text-muted" }).text("Posted recently")
                ),
                $("<div>", { "class": "d-flex align-items-center mt-3" }).append(
                    $("<a>", { "href": "#", "class": "like-input me-3 position-relative" }).append(
                        $("<i>", { "class": "bi bi-hand-thumbs-up" }),
                        " Like",
                        $("<span>", { "class": "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" }).append(
                            "0",
                            $("<span>", { "class": "visually-hidden" }).text("Total Likes")
                        )
                    ),
                    $("<a>", { "href": "#", "class": "reply-old" }).text("Reply")
                )
            ),
            $("<div>", { "class": "card-footer bg-white border-0" }).append(
                $("<a>", { "href": "#" }).append(
                    $("<i>", { "class": "bi bi-arrow-return-right" }),
                    " 0 Replies"
                )
            )
        );
        $("#comment-container").append(newComment);
        $("#comment-text").val("");
    });
    /* Add New Comment */

    /* Press Like Link */
    $('.like-input').on('click', function (e) {
        e.preventDefault();
        let badge = $(this).find(".badge");
        let count = parseInt(badge.text());
        let icon = $(this).find('i');
        // Toggle between 'bi-hand-thumbs-up' and 'bi-hand-thumbs-up-fill' classes
        if (icon.hasClass("bi-hand-thumbs-up")) {
            icon.removeClass("bi-hand-thumbs-up").addClass("bi-hand-thumbs-up-fill");
            count += 1; // Increment the count by 1
        } else {
            icon.removeClass("bi-hand-thumbs-up-fill").addClass("bi-hand-thumbs-up");
            count -= 1; // Decrement the count by 1
        }
        // Update the badge count
        badge.text(count);
    });
    /* Press Like Link */

    /* Press Reply Link */
    $('.reply-old').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.card-body').append(
            '<form class="d-flex gap-2 mt-2">' +
            '<textarea class="form-control" rows="1"></textarea>' +
            '<button class="btn" type="submit">Send</button>' +
            '</form>'
        );
    });
    /* Press Reply Link */

    /* Press Nested Replies */
    $(".replies-container").hide();

    // Listen for click event on the "Replies" link
    $(".nested-replies").on("click", function (e) {
        e.preventDefault();
        // Hide the "Replies" link with fadeOut animation
        $(this).fadeOut();

        // Show the multiple replies container with slideDown animation
        $(this).siblings('.replies-container').slideDown();
    });
    /* Press Nested Replies */
});