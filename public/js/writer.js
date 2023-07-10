tinymce.init({
  selector: '#writer-editor',
  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
  images_file_types: 'jpg,svg,webp',
  height: "480"
});

function previewImg(event) {
  var imgUrl = URL.createObjectURL(event.target.files[0]);
  $("#preview").attr("src", imgUrl);
  $("#preview").addClass("banner");
  $("#uploadImgButton").text("Change Image");
}

$(document).ready(function () {
  // Pen name and Date Section
  var today = new Date();
  var formattedDate = today.toDateString();
  $("#created-date").append(" - " + formattedDate);

  // Label Section
  $("select#label-init").mousedown(function (e) {
    e.preventDefault();
    var select = this;
    var scroll = select.scrollTop;
    e.target.selected = !e.target.selected;
    setTimeout(function () { select.scrollTop = scroll; }, 0);
    $(select).focus();
  }).mousemove(function (e) { e.preventDefault() });

  // Banner Image Section
  $('#post-article-btn').on('click', function (e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append('file', $('#uploadImage').prop('files')[0]);
    formData.append('upload_preset', 'sip8xn8w'); // Cloudinary upload preset for unsigned mode

    $.ajax({
      url: 'https://api.cloudinary.com/v1_1/ddvyn6ajr/image/upload', // Cloudinary Cloud_name
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        var imageUrl = data.secure_url;
        $('#uploadImgUrl').val(imageUrl);
        $('#article-form').submit();
      },
      error: function (error) {
        console.log('Error uploading banner image:', error);
      }
    });
  });
});