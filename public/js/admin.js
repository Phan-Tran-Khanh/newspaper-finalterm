// import { ArticleStatus } from 'src/enum/ArticleStatus.enum';

const ArticleStatus = ["Draft", "Approved", "Pending", "Rejected", "Published"];

// Load screen
// Action when load page:
$(document).ready(function () {
  showCategories();
});

//Function: navigate pand
$('body').on('click', '.nav-item', function () {
  let cur_nav = $(this).data('type');
  $('ul.nav > li.nav-item').each(function () {
    if ($(this).data('type') == cur_nav) {
      $(this).children('a').removeClass('text-white');
      $(this).children('a').addClass('active');
    } else {
      $(this).children('a').addClass('text-white');
      $(this).children('a').removeClass('active');
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

$('body').on('click', '.admin-cate-name', function () {
    let cate_idx = $(this).data('admin-cate-idx');
    
    const myCateName = document.getElementById('show-cate-name');
    const myCateDesc = document.getElementById('show-cate-desc');

    myCateDesc.innerHTML = window.cateTable[cate_idx].description;
    myCateName.innerHTML = window.cateTable[cate_idx].name;
});

$('body').on('click', '.btn-edit-cate', function() {
    let id = $(this).data('admin-add-idx');    
    let input = document.getElementById('update-cate');
    input.value = window.cateTable[id].name;
});

function showCategories() {
  $('div.nav-content').empty();
  $('div.nav-content').append('<div class="header h1">CATEGORY</div><hr>');

  var adminTable = $('<div class="admin-table"></div>');
  var table = $('<table id="cate-table" class="table table-striped"></table>');
  table.append(
    '<colgroup>\
            <col span="1" style="width: 50%;">\
            <col span="1" style="width: 20%;">\
            <col span="1" style="width: 20%;">\
            <col span="1" style="width: 5%;">\
            <col span="1" style="width: 5%;">\
        </colgroup>',
  );
  table.append(
    '<thead class="table-dark">\
                    <tr>\
                        <th>Category</th>\
                        <th>No. editors</th>\
                        <th>No. news</th>\
                        <th>&nbsp;</th>\
                        <th>&nbsp;</th>\
                    </tr>\
                </thead>',
  );

  var tbody = $('<tbody></tbody>');
  for (let i = 0; i < window.cateTable.length; i++) {
    tbody.append(
      '<tr data-cate-id="'+ window.cateTable[i].id +'">\
            <td class="admin-cate-name" data-bs-target="#modalShowCate" data-bs-toggle="modal" data-admin-cate-idx="' + i + '" >' + window.cateTable[i].name + '</td>\
            <td>' + window.cateTable[i].noEditor + '</td>\
            <td>' + window.cateTable[i].noNews + '</td>\
            <td class="text-center btn-edit-cate" data-admin-add-idx="'+i+'"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditCate"><i class="bi bi-pencil-square"></i></a></td>\
            <td class="text-center btn-remove-cate"><a href="#"/><i class="bi bi-trash3"></i></td>\
        </tr>',
    );}
    table.append(tbody);
    adminTable.append(table);
    $('div.nav-content').append(adminTable);

    $('div.nav-content').append('<button type="button" class="btn btn-default" style="color:dodgerblue;"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalAddCate"><i class="bi bi-plus"></i>Add</a></button>');
    $('div.nav-content').append("<br>");

    $('div.nav-content').on('click', '.btn-remove-cate', function() {
        $(this).closest('tr').remove();
    });
    
    // Add event listener to the "Add" button
    $('#add-category-btn').on('click', function() {
        var itemInput = document.getElementById('input-cate');

        // Create a new row with the required HTML structure
        var newRow = '<tr>\
                        <td>' + itemInput.value +'</td>\
                        <td>0</td>\
                        <td>0</td>\
                        <td class="text-center btn-edit-cate"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditCate"><i class="bi bi-pencil-square"></i></a></td>\
                        <td class="text-center btn-remove-cate"><a href="#"/><i class="bi bi-trash3"></i></td>\
                    </tr>';
        // Append the new row to the table body
        $('table#cate-table tbody').append(newRow);
        itemInput.value = '';
        // Close the modal
        $('#modalAddCate').modal('hide');
      });
}

$('body').on('click', '.admin-tag-name', function () {
    let tag_idx = $(this).data('admin-tag-idx');
    
    const myTagName = document.getElementById('show-tag-name');
    const myTagDesc = document.getElementById('show-tag-desc');

    myTagDesc.innerHTML = window.tagTable[tag_idx].description;
    myTagName.innerHTML = window.tagTable[tag_idx].name;
});

$('body').on('click', '.btn-edit-tag', function() {
    let id = $(this).data('admin-edit-tag');    
    let inputName = document.getElementById('update-tag');
    let inputDesc = document.getElementById('update-tag-desc');

    inputName.value = window.tagTable[id].name;
    inputDesc.value = window.tagTable[id].description;
});

function showTags() {
    $('div.nav-content').empty();
    $('div.nav-content').append('<div class="header h1">TAG</div><hr>');
    var adminTable = $('<div class="admin-table"></div>');
    var table = $('<table id="tag-table" class="table table-striped"></table>');    
    var tbody = $('<tbody></tbody>');
    table.append('<colgroup>\
                    <col span="1" style="width: 25%;">\
                    <col span="1" style="width: 45%;">\
                    <col span="1" style="width: 20%;">\
                    <col span="1" style="width: 5%;">\
                    <col span="1" style="width: 5%;">\
                </colgroup>');
    table.append('<thead class="table-dark">\
                    <tr>\
                        <th>Tag</th>\
                        <th>Description</th>\
                        <th>No. news</th>\
                        <th>&nbsp;</th>\
                        <th>&nbsp;</th>\
                    </tr>\
                </thead>');

    for (let i = 0; i < window.tagTable.length; i++) {
        var rowValue = window.tagTable[i];
        var row = $('<tr data-tag-id="'+rowValue.id+'">\
                        <td class="admin-tag-name" data-bs-target="#modalShowTag" data-bs-toggle="modal" data-admin-tag-idx="' + i + '" >' + rowValue.name + '</td>\
                        <td>'+ rowValue.description +'</td>\
                        <td>'+ rowValue.noNews +'</td>\
                        <td class="text-center btn-edit-tag" data-admin-edit-tag="'+i+'"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditTag"><i class="bi bi-pencil-square"></i></a></td>\
                        <td class="text-center btn-remove-tag"><a href="#"/><i class="bi bi-trash3"></i></td>\
                    </tr>');
        tbody.append(row);
    }
    table.append(tbody);
    adminTable.append(table);
    $('div.nav-content').append(adminTable);

    $('div.nav-content').append('<button type="button" class="btn btn-default" style="color:dodgerblue;"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalAddTag"><i class="bi bi-plus"></i>Add</a></button>');
    $('div.nav-content').append("<br>");

    $('div.nav-content').on('click', '.btn-remove-tag', function() {
        $(this).closest('tr').remove();
    });

    // Add event listener to the "Add" button
    $('#add-tag-btn').on('click', function() {
        var itemInput = document.getElementById('input-tag');
        var itemDesc = document.getElementById('input-tag-desc');

        // Create a new row with the required HTML structure
        var newRow = '<tr>\
                        <td>' + itemInput.value +'</td>\
                        <td>'+ itemDesc.value +'</td>\
                        <td>0</td>\
                        <td class="text-center btn-edit-tag"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditTag"><i class="bi bi-pencil-square"></i></a></td>\
                        <td class="text-center btn-remove-tag"><a href="#"/><i class="bi bi-trash3"></i></td>\
                    </tr>';
        // Append the new row to the table body
        $('table#tag-table tbody').append(newRow);
        itemInput.value = '';
        // Close the modal
        $('#modalAddTag').modal('hide');
    });
}

$('body').on('click', '.admin-news-title', function () {
    let slug = $(this).data('admin-title-id');
    window.location.replace('./article/'+slug);
});
  
$('body').on('click', '.btn-edit-news', function() {
    let id = $(this).data('admin-edit-news');
    let isPremium = window.newsTable[id].isPremium;
        if (isPremium) {
            document.getElementById('admin-news-edit-premium').checked = true;
        }

    let status = window.newsTable[id].status;
        var selectStatusForm = '<select id="news-edt-cate-form" class="form-select">';
        for (let item in ArticleStatus) {
          var option = '<option value="' + ArticleStatus[item] + '"';
          if (ArticleStatus[item] === status) {
            option += ' selected';
          }
          option += '>' + ArticleStatus[item] + '</option>';
          selectStatusForm += option;
        }
        selectStatusForm += '</select>';

    let inputStatus = document.getElementById('admin-news-edit-status');
    inputStatus.innerHTML = selectStatusForm;
});

$('body').on('click', '.btn-sm-edit-news', function() {
    let isPremium = document.getElementById('admin-news-edit-premium').checked;
    let status = document.getElementById('news-edt-cate-form');

    
    console.log("=======",isPremium, status.value);
});

function showNews() {
    $('div.nav-content').empty();
    $('div.nav-content').append('<div class="header h1">NEWS</div><hr>');
    
    var adminTable = $('<div class="admin-table"></div>');
    var table = $('<table id="news-table" class="table table-striped"></table>');
    var tbody = $('<tbody></tbody>');

    table.append('<colgroup>\
                    <col span="1" style="width: 30%;">\
                    <col span="1" style="width: 15%;">\
                    <col span="1" style="width: 15%;">\
                    <col span="1" style="width: 20%;">\
                    <col span="1" style="width: 10%;">\
                    <col span="1" style="width: 10%;">\
                </colgroup>');
    table.append('<thead class="table-dark">\
                    <tr>\
                        <th>Title</th>\
                        <th>Views</th>\
                        <th>Premium</th>\
                        <th>Status</th>\
                        <th>&nbsp;</th>\
                        <th>&nbsp;</th>\
                    </tr>\
                </thead>');

    for (let i = 0; i < window.newsTable.length; i++) {
        var rowValue = window.newsTable[i];

        var selectStatusForm = '<select class="form-select">';
        for (let item in ArticleStatus) {
          var option = '<option';
          if (ArticleStatus[item] === rowValue.status) {
            option += ' selected';
          }
          option += '>' + ArticleStatus[item] + '</option>';
          selectStatusForm += option;
        }
        selectStatusForm += '</select>';

        var premiumBox = '<input type="checkbox" onclick="return false;"/>';
        if (rowValue.isPremium) {
            premiumBox = '<input type="checkbox" checked onclick="return false;"/>';
        }

        var row = $('<tr data-news-id="'+rowValue.id+'">\
                        <td class="admin-news-title" data-admin-title-id="' + rowValue.slug + '" >'+ rowValue.title +'</td>\
                        <td>'+ rowValue.viewCount +'</td>\
                        <td>'+premiumBox+'</td>\
                        <td>' + selectStatusForm + '</td>\
                        <td class="text-center btn-edit-news" data-admin-edit-news="'+i+'"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditNews"><i class="bi bi-pencil-square"></i></a></td>\
                        <td class="text-center btn-remove-news"><a href="#"/><i class="bi bi-trash3"></i></td>\
                    </tr>');
        tbody.append(row);
    }                
    table.append(tbody);
    adminTable.append(table);
    $('div.nav-content').append(adminTable);
    $('div.nav-content').append("<br>");
    // $('div.nav-content').append('<button type="button" class="btn btn-default" style="color:dodgerblue;"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalAddNews"><i class="bi bi-plus"></i>Add</a></button>');
    
    $('div.nav-content').on('click', '.btn-remove-news', function() {
        $(this).closest('tr').remove();
    });

    // Add event listener to the "Add" button
    $('#add-news-btn').on('click', function() {
        var titleInput = document.getElementById('input-news-title');

        // Create a new row with the required HTML structure
        var newRow = '<tr>\
                        <td><<a href="../article.html">' + titleInput.value +'</td>\
                        <td>0</td>\
                        <td><select class="form-select">\
                            <option>Xuất bản</option>\
                            <option>Bản nháp</option>\
                        </select></td>\
                        <td class="text-center btn-edit-tag"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditTag"><i class="bi bi-pencil-square"></i></a></td>\
                        <td class="text-center btn-remove-new"><a href="#"/><i class="bi bi-trash3"></i></td>\
                    </tr>';
        // Append the new row to the table body
        $('table#news-table tbody').append(newRow);
        titleInput.value = '';
        absInput.value = '';
        // Close the modal
        $('#modalAddNews').modal('hide');

    });  
}

$('body').on('click', '.admin-user-name', function () {
    let userID = $(this).data('admin-name-id');
    console.log(userID);
});
  
function showUsers() {
    $('div.nav-content').empty();
    $('div.nav-content').append('<div class="header h1">USERS</div><hr>');

    var adminTable = $('<div class="admin-table"></div>');
    var table = $('<table id="user-table" class="table table-striped"></table>');
    var tbody = $('<tbody></tbody>');
    
    table.append('<colgroup>\
                    <col span="1" style="width: 23%;">\
                    <col span="1" style="width: 23%;">\
                    <col span="1" style="width: 23%;">\
                    <col span="1" style="width: 23%;">\
                    <col span="1" style="width: 4%;">\
                    <col span="1" style="width: 4%;">\
                </colgroup>');
    table.append('<thead class="table-dark">\
                    <tr>\
                        <th>Username</th>\
                        <th>Role</th>\
                        <th>Category</th>\
                        <th>Premium Duration</th>\
                        <th>&nbsp;</th>\
                        <th>&nbsp;</th>\
                    </tr>\
                </thead>');

    var selectCateForm = '<select class="form-select">';
    for (let item in cateTable) {
        selectCateForm += '<option>' + cateTable[item].name + '</option>';
    }

    for (let i = 0; i < window.usersTable.length; i++) {
        var rowValue = window.usersTable[i];

        var cateValue = '&nbsp;';
        if (rowValue.role === 'Editor') {
            cateValue = selectCateForm + 
                        '<option selected>' + rowValue.category + '</option></select>';
        }

        var durationValue = '&nbsp;';
        if (rowValue.role === 'Subscriber') {
            var tmpDate = new Date(rowValue["subcriptionExpiryDate"]);            
            if (isNaN(tmpDate.getTime())) {            
                tmpDate = new Date(-8640000000000000);
            }

            var formattedDate = tmpDate.toISOString().slice(0, 16);
            durationValue ='<div class="input-group date">\
                                <input class="form-control" type="datetime-local" value="'+formattedDate+'">\
                            </div>';
        }


        var row = $('<tr data-user-id="'+rowValue.id+'">\
                        <td class="admin-user-name" data-admin-name-id="' + rowValue.id + '" >'+rowValue.name+'</td>\
                        <td>'+rowValue.role+'</td>\
                        <td>'+cateValue+'</td>\
                        <td>'+durationValue+'</td>\
                        <td class="text-center btn-edit-user"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditUser"><i class="bi bi-pencil-square"></i></a></td>\
                        <td class="text-center btn-remove-user"><a href="#"/><i class="bi bi-trash3"></i></td>\
                    </tr>');
        tbody.append(row);
    }
    table.append(tbody);
    adminTable.append(table);
    $('div.nav-content').append(adminTable);

    $('div.nav-content').append("<br>");
    // $('div.nav-content').append('<button type="button" class="btn btn-default" style="color:dodgerblue;"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalAddUser"><i class="bi bi-plus"></i>Add</a></button>');

    $('div.nav-content').on('click', '.btn-remove-user', function() {
        $(this).closest('tr').remove();
    });

    // Add event listener to the "Add" button
    $('#add-user-btn').on('click', function() {
        var usernameInput = document.getElementById('input-username');
        var dropdown = document.getElementById('input-permission');
        var permissionInput = dropdown.options[dropdown.selectedIndex];            

        var newRow;
        // Create a new row with the required HTML structure
        if (String(permissionInput.value) == 'Subcriber') {
            newRow = '<tr>\
                        <td><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalUserInformation">' + usernameInput.value +'</td>\
                        <td>' + permissionInput.value +'</td>\
                        <td></td>\
                        <td><select class="form-select">\
                            <option>Xuất bản</option>\
                            <option>Bản nháp</option>\
                        </select></td>\
                        <td class="text-center btn-edit-tag"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditTag"><i class="bi bi-pencil-square"></i></a></td>\
                        <td class="text-center btn-remove-user"><a href="#"/><i class="bi bi-trash3"></i></td>\
                    </tr>';
        } else if (String(permissionInput.value) == 'Editor') {
            newRow = '<tr>\
                        <td><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalUserInformation">' + usernameInput.value +'</td>\
                        <td>' + permissionInput.value +'</td>\
                        <td><select class="form-select">\
                            <option selected>Mục lục</option>\
                            <option>Kinh doanh</option>\
                            <option>Thế giới</option>\
                        </select></td>\
                        <td></td>\
                        <td class="text-center btn-edit-tag"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditTag"><i class="bi bi-pencil-square"></i></a></td>\
                        <td class="text-center btn-remove-user"><a href="#"/><i class="bi bi-trash3"></i></td>\
                    </tr>';
        } else if (String(permissionInput.value) == 'Writer'){
            newRow = '<tr>\
                        <td><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalUserInformation">' + usernameInput.value +'</td>\
                        <td>' + permissionInput.value +'</td>\
                        <td></td>\
                        <td></td>\
                        <td class="text-center btn-edit-tag"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditTag"><i class="bi bi-pencil-square"></i></a></td>\
                        <td class="text-center btn-remove-user"><a href="#"/><i class="bi bi-trash3"></i></td>\
                    </tr>';
        }
        // Append the new row to the table body
        $('table#user-table tbody').append(newRow);
        usernameInput.value = '';
        permissionInput.value = '';
        // Close the modal
        $('#modalAddUser').modal('hide');
    });  
}
