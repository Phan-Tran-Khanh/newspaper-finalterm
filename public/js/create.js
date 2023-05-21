tinymce.init({
    selector: '#reporter-editor',
    plugins: "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinycomments tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
    toolbar: "aligncenter alignjustify alignleft alignnone alignright| anchor | blockquote blocks | backcolor | bold | copy | cut | fontfamily fontsize forecolor h1 h2 h3 h4 h5 h6 hr indent | italic | language | lineheight | newdocument | outdent | paste pastetext | print | redo | remove removeformat | selectall | strikethrough | styles | subscript superscript underline | undo | visualaid | a11ycheck advtablerownumbering typopgraphy anchor restoredraft casechange charmap checklist code codesample addcomment showcomments ltr rtl editimage fliph flipv imageoptions rotateleft rotateright emoticons export footnotes footnotesupdate formatpainter fullscreen help image insertdatetime link openlink unlink bullist numlist media mergetags mergetags_list nonbreaking pagebreak pageembed permanentpen preview quickimage quicklink quicktable cancel save searchreplace spellcheckdialog spellchecker | table tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertdialog tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader | tableofcontents tableofcontentsupdate | template typography | insertfile | visualblocks visualchars | wordcount",
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