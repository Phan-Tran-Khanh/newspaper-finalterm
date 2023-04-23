//Support function: delay time
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Action when load page:
$(document).ready(function() {
    LoadPosts();
});

//Function: navigate to a certain post page
$("body").on("click", ".e_Post", function(){
    let Post_id = parseInt($(this).data("post-id"));
    window.location.replace('./pages/details.html?post_id='+Post_id);
});

function LoadPosts() {
    console.log(posts);
    let numPages = 4;

    //display posts on each page
    $(".post-list-area").empty();
    for (let page=1; page<=1; page++){
        let html_postList = $('<div class="post-list" data-page="'+page+'"></div>'); 
        for (let i=0; i<4; i++){
            let item = posts[i];
            let html_post = $('<div class="e_Post" data-post-id="'+item['id']+'"></div>');
            html_post.append('<div class="post-info-s">\
                            <div class="post-pane-s datetime">\
                                <span>'+Date().toLocaleString()+'</span>\
                            </div>\
                            <div class="post-pane-s category">\
                                <span>'+item['category']+'</span>\
                            </div>\
                            <div class="post-pane-s title">\
                                <span>'+item['title']+'</span>\
                            </div>\
                            <div class="post-pane-s abstract">\
                                <span>'+item['abstract']+'</span>\
                            </div>\
                            <div class="post-pane-s tags">\
                                <span>tags: '+item['tags']+'</span>\
                            </div>\
                        </div>');
            html_post.append('<div class="post-img-s">\
                                <img src="'+item['image']+'" class="img-responsive">\
                            </div>');
            html_post.append('<div class="post-btn-del">\
                                <div class="btn btn-danger">\
                                    <i class="glyphicon glyphicon-trash"></i>\
                                </div>\
                            </div>');
            html_postList.append(html_post);
        }
        $(".post-list-area").append(html_postList);
    }

    //custom navigation panel
    $(".pagination").each(function(){
        $(this).empty();
        var table = $('<table></table>');
        var row = $('<tr></tr>');
        row.append('<th>N</th>');
        for (let page=1; page<=numPages; page++){
            row.append('<th>e</th>');
        }
        row.append('<th>w</th>');
        row.append('<th>s</th>');
        table.append(row);

        row = $('<tr></tr>');
        row.append('<td>&nbsp;</td>');
        for (let page=1; page<=numPages; page++){
            row.append('<td><a href="#">'+page+'</a></td>');
        }
        row.append('<td>&nbsp;</td>');
        row.append('<td>&nbsp;</td>');
        table.append(row);

        $(this).append(table);
    });
}