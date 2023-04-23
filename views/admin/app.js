//Function: navigate to a pane
$("body").on("click", ".nav-item", function(){
    let cur_nav = $(this).data("type");
    $("ul.nav > li.nav-item").each(function () {
        if ($(this).data("type") == cur_nav) {
            $(this).children("a").removeClass('text-white');
            $(this).children("a").addClass('active');
        }
        else {
            $(this).children("a").addClass('text-white');
            $(this).children("a").removeClass('active');
        }
    });
    switch (cur_nav) {
        case 'categories':
            showCategories();
            break;
        case 'tags':
            showTags();
            break;
        case 'news':
            showNews();
            break;
        case 'users':
            showUsers();
            break;
        default:
            break;
    }
});

function showCategories() {
    $('div.nav-content').empty();
    $('div.nav-content').append('<div class="header h1">CATEGORY</div><hr>');
    $('div.nav-content').append('<table class="table table-striped">\
                                <colgroup>\
                                    <col span="1" style="width: 50%;">\
                                    <col span="1" style="width: 20%;">\
                                    <col span="1" style="width: 20%;">\
                                    <col span="1" style="width: 5%;">\
                                    <col span="1" style="width: 5%;">\
                                </colgroup>\
                                <thead class="table-dark">\
                                    <tr>\
                                        <th>Category</th>\
                                        <th>Num editors</th>\
                                        <th>Num news</th>\
                                        <th>&nbsp;</th>\
                                        <th>&nbsp;</th>\
                                    </tr>\
                                </thead>\
                                <tbody>\
                                    <tr>\
                                        <td>Category 1</td>\
                                        <td>5</td>\
                                        <td>5</td>\
                                        <td class="text-center"><i class="bi bi-pencil-square"></i></td>\
                                        <td class="text-center"><i class="bi bi-trash3"></i></td>\
                                    </tr>\
                                    <tr>\
                                        <td>Category 2</td>\
                                        <td>5</td>\
                                        <td>5</td>\
                                        <td class="text-center"><i class="bi bi-pencil-square"></i></td>\
                                        <td class="text-center"><i class="bi bi-trash3"></i></td>\
                                    </tr>\
                                </tbody>\
                            </table><hr>');
    $('div.nav-content').append('<button type="button" class="btn btn-default" style="color:dodgerblue;"><i class="bi bi-plus"></i>Add</button>');
}

function showTags() {
    $('div.nav-content').empty();
    $('div.nav-content').append('<div class="header h1">TAG</div><hr>');
    $('div.nav-content').append('<table class="table table-striped">\
                                <colgroup>\
                                    <col span="1" style="width: 50%;">\
                                    <col span="1" style="width: 20%;">\
                                    <col span="1" style="width: 20%;">\
                                    <col span="1" style="width: 5%;">\
                                    <col span="1" style="width: 5%;">\
                                </colgroup>\
                                <thead class="table-dark">\
                                    <tr>\
                                        <th>Tag</th>\
                                        <th>Num editors</th>\
                                        <th>Num news</th>\
                                        <th>&nbsp;</th>\
                                        <th>&nbsp;</th>\
                                    </tr>\
                                </thead>\
                                <tbody>\
                                    <tr>\
                                        <td>Tag 1</td>\
                                        <td>5</td>\
                                        <td>5</td>\
                                        <td class="text-center"><i class="bi bi-pencil-square"></i></td>\
                                        <td class="text-center"><i class="bi bi-trash3"></i></td>\
                                    </tr>\
                                    <tr>\
                                        <td>Tag 2</td>\
                                        <td>5</td>\
                                        <td>5</td>\
                                        <td class="text-center"><i class="bi bi-pencil-square"></i></td>\
                                        <td class="text-center"><i class="bi bi-trash3"></i></td>\
                                    </tr>\
                                </tbody>\
                            </table><hr>');
    $('div.nav-content').append('<button type="button" class="btn btn-default" style="color:dodgerblue;"><i class="bi bi-plus"></i>Add</button>');
}

function showNews() {
    $('div.nav-content').empty();
    $('div.nav-content').append('<div class="header h1">NEWS</div><hr>');
    $('div.nav-content').append('<table class="table table-striped">\
                                <colgroup>\
                                    <col span="1" style="width: 10%;">\
                                    <col span="1" style="width: 30%;">\
                                    <col span="1" style="width: 20%;">\
                                    <col span="1" style="width: 20%;">\
                                    <col span="1" style="width: 5%;">\
                                    <col span="1" style="width: 5%;">\
                                </colgroup>\
                                <thead class="table-dark">\
                                    <tr>\
                                        <th>Title</th>\
                                        <th>Abstract</th>\
                                        <th>Views</th>\
                                        <th>Status</th>\
                                        <th>&nbsp;</th>\
                                        <th>&nbsp;</th>\
                                    </tr>\
                                </thead>\
                                <tbody>\
                                    <tr>\
                                        <td>Title 1</td>\
                                        <td>abababab</td>\
                                        <td>0</td>\
                                        <td><select class="form-select">\
                                            <option>Xuất bản</option>\
                                            <option>Bản nháp</option>\
                                        </select></td>\
                                        <td class="text-center"><i class="bi bi-pencil-square"></i></td>\
                                        <td class="text-center"><i class="bi bi-trash3"></i></td>\
                                    </tr>\
                                    <tr>\
                                        <td>Title 2</td>\
                                        <td>xyxyxyxy</td>\
                                        <td>232332</td>\
                                        <td><select class="form-select">\
                                            <option>Xuất bản</option>\
                                            <option>Bản nháp</option>\
                                        </select></td>\
                                        <td class="text-center"><i class="bi bi-pencil-square"></i></td>\
                                        <td class="text-center"><i class="bi bi-trash3"></i></td>\
                                    </tr>\
                                </tbody>\
                            </table><hr>');
    $('div.nav-content').append('<button type="button" class="btn btn-default" style="color:dodgerblue;"><i class="bi bi-plus"></i>Add</button>');
}

function showUsers() {
    $('div.nav-content').empty();
    $('div.nav-content').append('<div class="header h1">NEWS</div><hr>');
    $('div.nav-content').append('<table class="table table-striped">\
                                <colgroup>\
                                    <col span="1" style="width: 10%;">\
                                    <col span="1" style="width: 30%;">\
                                    <col span="1" style="width: 20%;">\
                                    <col span="1" style="width: 20%;">\
                                    <col span="1" style="width: 5%;">\
                                    <col span="1" style="width: 5%;">\
                                </colgroup>\
                                <thead class="table-dark">\
                                    <tr>\
                                        <th>Title</th>\
                                        <th>Abstract</th>\
                                        <th>Views</th>\
                                        <th>Status</th>\
                                        <th>&nbsp;</th>\
                                        <th>&nbsp;</th>\
                                    </tr>\
                                </thead>\
                                <tbody>\
                                    <tr>\
                                        <td>Title 1</td>\
                                        <td>abababab</td>\
                                        <td>0</td>\
                                        <td><select class="form-select">\
                                            <option>Xuất bản</option>\
                                            <option>Bản nháp</option>\
                                        </select></td>\
                                        <td class="text-center"><i class="bi bi-pencil-square"></i></td>\
                                        <td class="text-center"><i class="bi bi-trash3"></i></td>\
                                    </tr>\
                                    <tr>\
                                        <td>Title 2</td>\
                                        <td>xyxyxyxy</td>\
                                        <td>232332</td>\
                                        <td><select class="form-select">\
                                            <option>Xuất bản</option>\
                                            <option>Bản nháp</option>\
                                        </select></td>\
                                        <td class="text-center"><i class="bi bi-pencil-square"></i></td>\
                                        <td class="text-center"><i class="bi bi-trash3"></i></td>\
                                    </tr>\
                                </tbody>\
                            </table><hr>');
    $('div.nav-content').append('<button type="button" class="btn btn-default" style="color:dodgerblue;"><i class="bi bi-plus"></i>Add</button>');
}