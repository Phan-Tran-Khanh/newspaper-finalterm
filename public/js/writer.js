tinymce.init({
  selector: '#writer-editor',
  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
  images_file_types: 'jpg,svg,webp'
});

// Preview Article Heading
var headingConfig = {
  selector: '.tinymce-heading',
  menubar: false,
  inline: true,
  plugins: [
    'lists',
    'powerpaste',
    'autolink'
  ],
  toolbar: 'undo redo | bold italic underline',
  valid_elements: 'strong,em,span[style],a[href]',
  valid_styles: {
    '*': 'font-size,font-family,color,text-decoration,text-align'
  },
  powerpaste_word_import: 'clean',
  powerpaste_html_import: 'clean',
};

// Preview Article Body
var bodyConfig = {
  selector: '.tinymce-body',
  menubar: false,
  inline: true,
  plugins: [
    'link',
    'lists',
    'powerpaste',
    'autolink',
    'tinymcespellchecker'
  ],
  toolbar: [
    'undo redo | bold italic underline | fontselect fontsizeselect',
    'forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent'
  ],
  valid_elements: 'p[style],strong,em,span[style],a[href],ul,ol,li',
  valid_styles: {
    '*': 'font-size,font-family,color,text-decoration,text-align'
  },
  powerpaste_word_import: 'clean',
  powerpaste_html_import: 'clean',
};

// Preview Article Image
let imgConfig = {
  selector: "#tinymce-img",
  inline: true,
  plugins: "image",
  toolbar: "image",
  images_file_types: 'jpg,svg,webp',
  images_upload_url: "/your/upload/url" //Server-side handle this
}

tinymce.init(headingConfig);
tinymce.init(bodyConfig);
tinymce.init(imgConfig);

function previewImg(event) {
  var fileName = URL.createObjectURL(event.target.files[0]);
  $("#preview").attr("src", fileName);
  $("#preview").addClass("banner");
}

$(document).ready(function () {
  var today = new Date();
  var formattedDate = today.toDateString();
  $("#created-date").append(" - " + formattedDate);

  $("select#label").mousedown(function (e) {
    e.preventDefault();
    var select = this;
    var scroll = select.scrollTop;
    e.target.selected = !e.target.selected;
    setTimeout(function () { select.scrollTop = scroll; }, 0);
    $(select).focus();
  }).mousemove(function (e) { e.preventDefault() });
});