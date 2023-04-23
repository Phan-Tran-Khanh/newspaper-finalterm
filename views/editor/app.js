//Support function: delay time
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let cur_id = null;

// Action when load page:
$(document).ready(function() {
    if (site_list) LoadPosts();
    if (site_detail) {        
        let params = new URLSearchParams(location.search);
        cur_id = params.get('post_id')
        if (!site_approve && !site_disapprove) LoadDetailedPost(cur_id)
        else if (site_approve) LoadApprovedPost(cur_id)
    }
});

//Function: [INDEX]  navigate to detail post
$("body").on("click", ".post-info-s, .post-img-s", function(){
    let Post_id = parseInt($('.e_Post').data("post-id"));
    window.location.replace('./pages/details.html?post_id='+Post_id);
});

//Function: [INDEX]  navigate to disapprove post
$("body").on("click", ".post-btn-del", function(){
    let Post_id = parseInt($('.e_Post').data("post-id"));
    window.location.replace('./pages/disapprove.html?post_id='+Post_id);
});

//Function: [DETAIL] return to post list
$("body").on("click", ".post-subpane-l.category", function(){
    window.location.replace('../index.html');
});

//Function: [DETAIL] navigate to disapprove page
$("body").on("click", ".btn-disapprove", function(){
    let Post_id = parseInt($('.post-detail').data("post-id"));
    window.location.replace('./disapprove.html?post_id='+Post_id);
});

//Function: [DETAIL] navigate to disapprove page
$("body").on("click", ".btn-approve", function(){
    let Post_id = parseInt($('.post-detail').data("post-id"));
    window.location.replace('./approve.html?post_id='+Post_id);
});

//Function: [DISAPPROVE]  return to post detail
$("body").on("click", ".btn-back", function(){
    window.location.replace('./details.html?post_id='+cur_id);
});

//Function: [DISAPPROVE]  navigate to post list
$("body").on("click", ".btn-send", function(){
    window.location.replace('../index.html');
});

//Function: [APPROVE]  navigate to post list
$("body").on("click", ".btn-publish", function(){
    window.location.replace('../index.html');
});

//Function: load all posts
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

//Function: Load detail of a post
function LoadDetailedPost(id) {
    var item = posts[id];
    item['image']='.'+item['image'];
    $(".e_Content_Details").empty();
    let html_post = $('<div class="post-detail" data-post-id="'+item['id']+'"></div>');
    html_post.append('<div class="post-pane-l header">\
                        <div class="post-subpane-l category">'+item['category']+'</div>\
                        <div class="post-subpane-l datetime">'+Date().toLocaleString()+'</div>\
                    </div>');
    html_post.append('<div class="post-pane-l title">'+item['title']+'</div>');  
    html_post.append('<div class="post-pane-l abstract">'+item['abstract']+'</div>');   
    html_post.append('<div class="post-pane-l img">\
                        <div class="post-subpane-l img-url">\
                            <img src="'+item['image']+'" class="img-responsive"/>\
                        </div>\
                        <div class="post-subpane-l img-desp">'+item['image_desp']+'</div>\
                    </div>');     
    html_post.append('<div class="post-pane-l details">'+item['details']+'</div>');     
    html_post.append('<div class="post-pane-l footer">\
                        <div class="post-subpane-l tags">'+item['tags']+'</div>\
                        <div class="post-subpane-l reported">'+item['reporter']+'</div>\
                    </div>');                 
    $(".e_Content_Details").append(html_post);
    $(".e_Content_Details").append('<div class="post action">\
                                    <button type="button" class="btn btn-danger btn-disapprove">Từ chối</button>\
                                    <button type="button" class="btn btn-success btn-approve">Duyệt</button>\
                                </div>');
}

//Function: Load detail of a post
function LoadApprovedPost(id) {
    var item = posts[id];
    item['image']='.'+item['image'];
    $(".e_Content_Details").empty();
    let html_post = $('<div class="post-detail" data-post-id="'+item['id']+'"></div>');
    html_post.append('<div class="post-pane-l header">\
                        <div class="post-subpane-l category">'+item['category']+'</div>\
                        <div class="post-subpane-l datetime">'+Date().toLocaleString()+'</div>\
                    </div>');
    html_post.append('<div class="post-pane-l title">'+item['title']+'</div>');  
    html_post.append('<div class="post-pane-l abstract">'+item['abstract']+'</div>');   
    html_post.append('<div class="post-pane-l img">\
                        <div class="post-subpane-l img-url">\
                            <img src="'+item['image']+'" class="img-responsive"/>\
                        </div>\
                        <div class="post-subpane-l img-desp">'+item['image_desp']+'</div>\
                    </div>');     
    html_post.append('<div class="post-pane-l details">'+item['details']+'</div>');     
    html_post.append('<div class="post-pane-l footer">\
                        <div class="post-subpane-l tags">'+item['tags']+'</div>\
                        <div class="post-subpane-l reported">'+item['reporter']+'</div>\
                    </div>');                 
    $(".e_Content_Details").append(html_post);
    $(".e_Content_Details").append('<div class="post action">\
                                    <button type="button" class="btn btn-danger btn-disapprove">Từ chối</button>\
                                    <button type="button" class="btn btn-success btn-approve">Duyệt</button>\
                                </div>');
}