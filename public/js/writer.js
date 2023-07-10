tinymce.init({
  selector: '#writer-editor',
  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
  images_file_types: 'jpg,svg,webp',
  height: "480"
});

var imgData;

function previewImg(event) {
  var imgUrl = URL.createObjectURL(event.target.files[0]);
  $("#preview").attr("src", imgUrl);
  $("#preview").addClass("banner");
  $("#uploadImgButton").text("Change Image");
  imgData = event.target.files[0];
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
    // $('#uploadImage').prop('files')[0]
    e.preventDefault();
    var reader = new FileReader();
    reader.onloadend = function () {
      var base64imgData = reader.result;
      $.ajax({
        url: 'https://api.imgur.com/3/image',
        type: 'POST',
        headers: {
          Authorization: 'Client-ID d296f70487afe57'
        },
        data: {
          image: base64imgData
        },
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
          var imageUrl = response.data.link;
          console.log('imgurl = ' + imageUrl);
          $('#uploadImgUrl').val(imageUrl);
          $('#article-form').submit();
        },
        error: function () {
          console.log('Error uploading image.');
        }
      });
    }
    reader.readAsDataURL(imgData);
  });
});