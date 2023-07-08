let cur_id = null;

// Action when load page:
$(document).ready(function() {
    $('[data-bs-toggle="popover"]').popover();

    if (site_list) LoadPosts();
    if (site_detail) {        
        let params = new URLSearchParams(location.search);
        cur_id = params.get('post_id');
        if (!site_approve && !site_disapprove) LoadDetailedPost(cur_id);
        else if (site_approve) LoadApprovedPost(cur_id);
    }
});

//Function: [INDEX]  navigate to detail post
$("body").on("click", ".post-info-s, .post-img-s", function(){
    let Post_id = parseInt($(this).parents('.e_Post').data("post-id"));
    window.location.replace('./detail?post_id='+Post_id);
});

//Function: [INDEX]  navigate to disapprove post
$("body").on("click", ".post-btn-del", function(){
    let Post_id = parseInt($(this).parents('.e_Post').data("post-id"));
    window.location.replace('./disapprove?post_id='+Post_id);
});

//Function: [DETAIL] return to post list
$("body").on("click", ".back-to-list", function(){
    window.location.replace('./list');
});

//Function: [DETAIL] navigate to disapprove page
$("body").on("click", ".btn-disapprove", function(){
    let Post_id = parseInt($('.post-detail').data("post-id"));
    window.location.replace('./disapprove?post_id='+Post_id);
});

//Function: [DETAIL] navigate to disapprove page
$("body").on("click", ".btn-approve", function(){
    let Post_id = parseInt($('.post-detail').data("post-id"));
    window.location.replace('./approve?post_id='+Post_id);
});

//Function: [DISAPPROVE/APPROVE]  return to post detail
$("body").on("click", ".btn-back", function(){
    window.location.replace('./detail?post_id='+cur_id);
});

//Function: [DISAPPROVE]  navigate to post list
$("body").on("click", ".btn-send", function(){
    window.location.replace('./list');
});

//Function: [APPROVE]  navigate to post list
$("body").on("click", ".btn-publish", function(){
    window.location.replace('./list');
});

//Function: load all posts
function LoadPosts() {
    let numPages = 4;

    //display posts on each page
    $(".post-list-area").empty();
    for (let page=1; page<=1; page++){
        let html_postList = $('<div class="post-list" data-page="'+page+'"></div>'); 
        for (let i=0; i<window.posts.length; i++){
            let item = window.posts[i];
            let html_post = $('<div class="e_Post card mb-3" data-post-id="'+item['id']+'"></div>');
            let html_row = $('<div class="row g-0"></div>');
            html_row.append('<div class="col-md-6 d-flex flex-column post-info-s">\
                                <div class="card-body">\
                                    <p class="card-text small text-muted">'+item['reporter']+' - '+item['datetime']+'</p>\
                                    <h6 class="card-subtitle text-muted">'+item['category']+'</h6>\
                                    <h5 class="card-title mb-2">'+item['title']+'</h5>\
                                    <p class="card-text small flex-grow-1">'+item['abstract']+'</p>\
                                </div>\
                                <div class="card-footer">\
                                    <p class="card-text small text-muted mt-auto">tags: '+item['tags']+'</p>\
                                </div>\
                            </div>');
            html_row.append('<div class="col-md-5 post-img-s">\
                                <img src="'+item['image']+'" class="d-block w-100 h-100" alt="...">\
                            </div>');
            html_row.append('<div class="col-md-1 d-grid post-btn-del">\
                                <div class="btn btn-danger btn-block">\
                                    <i class="bi bi-trash"></i>\
                                </div>\
                            </div>');
            html_post.append(html_row);
            html_postList.append(html_post);
        }
        $(".post-list-area").append(html_postList);
    }

    //custom navigation panel
    $(".pagination").each(function(){
        $(this).empty();
        var table = $('<table></table>');
        var row = $('<tr></tr>');
        row.append('<th class="text-center">N</th>');
        for (let page=1; page<=numPages; page++){
            row.append('<th class="text-center">e</th>');
        }
        row.append('<th>w</th>');
        row.append('<th>s</th>');
        table.append(row);

        row = $('<tr></tr>');
        row.append('<td class="page-item">\
                        <a class="page-link" href="#" aria-label="Previous">\
                            <span aria-hidden="true">&laquo;</span>\
                            <span class="visually-hidden">Previous</span>\
                        </a>\
                    </td>');
        for (let page=1; page<=numPages; page++){
            row.append('<td class="page-item"><a class="page-link" href="#">'+page+'</a></td>');
        }
        row.append('<td colspan="2" class="page-item">\
                        <a class="page-link" href="#" aria-label="Next">\
                            <span aria-hidden="true">&raquo;</span>\
                            <span class="visually-hidden">Next</span>\
                        </a>\
                    </td>');
        table.append(row);

        $(this).append(table);
    });
}

//Function: Load detail of a post
function LoadDetailedPost(id) {    
    var item = window.posts[id];
    item['image']='..'+item['image'];
    $(".e_Content_Details").empty();
    let html_post = $('<div class="post-detail col-md-9" data-post-id="'+item['id']+'"></div>');
    html_post.append('<div class="row row-cols-2">\
                        <div class="col text-start small back-to-list">\
                            <a href="../index.html" class="text-decoration-none">'+item['category']+'</a>\
                        </div>\
                        <div class="col text-end small">\
                            <p class="text-muted">\
                                '+item['datetime']+'\
                            </p>\
                        </div>\
                    </div>');
    html_post.append('<div class="row">\
                        <h2>'+item['title']+'</h2>\
                        <p>'+item['abstract']+'</p>\
                        <figure style="display: flex !important; flex-direction: column; align-items: center;">\
                            <img src="'+item['image']+'" alt="..." class="d-block w-100 h-100">\
                            <figcaption class="small">'+item['image_desp']+'</figcaption>\
                        </figure>\
                        <p>'+item['details']+'</p>\
                    </div>');  
    html_post.append('<div class="row row-cols-2">\
                        <div class="col text-start small">\
                            <span>tags: </span>\
                            <a href="../index.html" class="text-decoration-none">'+item['tags']+'</a>\
                        </div>\
                        <div class="col text-end">\
                            <p class="fw-bold">'+item['reporter']+'</p>\
                        </div>\
                    </div>');                
    $(".e_Content_Details").append(html_post);
    $(".e_Content_Details").append('<div class="post action">\
                                    <button type="button" class="btn btn-danger btn-disapprove">Từ chối</button>\
                                    <button type="button" class="btn btn-success btn-approve">Duyệt</button>\
                                </div>');
}

//Function: Load detail of a post
function LoadApprovedPost(id) {
    var item = window.posts[id];
    item['image']='..'+item['image'];
    $(".approve-area").empty();
    $(".approve-area").append('<div class="approve header h2">\
                                <span><strong>XUẤT BẢN TRỰC TUYẾN</strong></span>\
                            </div>');
                            
    let html_post = $('<div class="approve-content" data-post-id="'+item['id']+'"></div>');
    html_post.append('<div class="approve-c text">\
                    <div class="approve-r datetime">\
                        <label for="a-datetime">Datetime</label>\
                        <div class="input-group date" id="a-datetime">\
                            <input class="form-control" type="datetime-local">\
                        </div>\
                    </div>\
                    <div class="approve-r category">\
                        <label for="a-category">Category</label>\
                        <input type="text" class="form-control" id="a-category" value="'+item['category']+'">\
                    </div>\
                    <div class="approve-r title">\
                        <label for="a-title">Title</label>\
                        <input type="text" class="form-control" id="a-title" value="'+item['title']+'">\
                    </div>\
                    <div class="approve-r abstract">\
                        <label for="a-abstract">Abstract</label>\
                        <textarea type="text" class="form-control" id="a-abstract">'+item['abstract']+'</textarea>\
                    </div>\
                    <div class="approve-r tags">\
                        <label for="a-tags">tags:</label>\
                        <input type="text" class="form-control" id="a-tags" value="'+item['tags']+'">\
                    </div>\
                </div>');
    html_post.append('<div class="approve-c image">\
                        <img src="'+item['image']+'" class="d-block w-100 h-100">\
                    </div>');
                    
    $(".approve-area").append(html_post);
}

$("#logout-btn").on("click", function() {
    // Other Role Logout
    window.location.href = "../../views/index.hbs";
});