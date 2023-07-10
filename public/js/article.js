$(document).ready(function () {
    /* Add New Comment */
    $("#comment-input").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            method: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                // Create a new comment element
                let newComment = $("<div>", { class: "card" }).append(
                    $("<div>", { class: "card-body" }).append(
                        $("<div>", { class: "media" }).append(
                            $("<img>", {
                                src: $('#account-avatar').attr('src'),
                                class: "rounded-circle object-fit-cover border border-dark border-2",
                                style: "width: 50px; height: 50px;"
                            }),
                            $("<div>", { class: "media-body" }).append(
                                $("<h5>", { class: "mt-0" }).text($("#account-name").text()),
                                $("<p>").text($("#comment-text").val())
                            ),
                            $("<p>", { class: "card-text small text-muted" }).text("Posted recently")
                        )
                    )
                );
                $("#comment-container").append(newComment);
                $("#comment-text").val("");
            },
            error: function () {
                console.log('Error sending comment.');
            },
        });
    });
    /* Add New Comment */
});