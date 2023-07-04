//Load screen
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

function showCategories() {
  $('div.nav-content').empty();
  $('div.nav-content').append('<div class="header h1">CATEGORY</div><hr>');

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
                        <th>Tag</th>\
                        <th>No. editors</th>\
                        <th>No. news</th>\
                        <th>&nbsp;</th>\
                        <th>&nbsp;</th>\
                    </tr>\
                </thead>',
  );

  var tbody = $('<tbody></tbody>');
  for (let i = 0; i < cateTable.length; i++) {
    tbody.append(
      '<tr data-cate-id="'+ i +'">\
            <td>' + cateTable[i].Category + '</td>\
            <td>' + cateTable[i]["No. editors"] + '</td>\
            <td>' + cateTable[i]["No. news"] + '</td>\
            <td class="text-center btn-edit-cate"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditCate"><i class="bi bi-pencil-square"></i></a></td>\
            <td class="text-center btn-remove-cate"><a href="#"/><i class="bi bi-trash3"></i></td>\
        </tr>',
    );}
    table.append(tbody);
    $('div.nav-content').append(table);

    $('div.nav-content').append('<button type="button" class="btn btn-default" style="color:dodgerblue;"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalAddCate"><i class="bi bi-plus"></i>Add</a></button>');

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

function showTags() {
    $('div.nav-content').empty();
    $('div.nav-content').append('<div class="header h1">TAG</div><hr>');
    var table = $('<table id="tag-table" class="table table-striped"></table>');    
    var tbody = $('<tbody></tbody>');
    table.append('<colgroup>\
                    <col span="1" style="width: 50%;">\
                    <col span="1" style="width: 20%;">\
                    <col span="1" style="width: 20%;">\
                    <col span="1" style="width: 5%;">\
                    <col span="1" style="width: 5%;">\
                </colgroup>');
    table.append('<thead class="table-dark">\
                    <tr>\
                        <th>Tag</th>\
                        <th>No. editors</th>\
                        <th>No. news</th>\
                        <th>&nbsp;</th>\
                        <th>&nbsp;</th>\
                    </tr>\
                </thead>');

    for (let i = 0; i < tagTable.length; i++) {
        var rowValue = tagTable[i];
        var row = $('<tr data-tag-id="'+i+'">\
                        <td>'+ rowValue["Tag"] +'</td>\
                        <td>'+ rowValue["No. editors"] +'</td>\
                        <td>'+ rowValue["No. news"] +'</td>\
                        <td class="text-center btn-edit-tag"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditTag"><i class="bi bi-pencil-square"></i></a></td>\
                        <td class="text-center btn-remove-tag"><a href="#"/><i class="bi bi-trash3"></i></td>\
                    </tr>');
        tbody.append(row);
    }
    table.append(tbody);
    $('div.nav-content').append(table);

    $('div.nav-content').append('<button type="button" class="btn btn-default" style="color:dodgerblue;"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalAddTag"><i class="bi bi-plus"></i>Add</a></button>');

    $('div.nav-content').on('click', '.btn-remove-tag', function() {
        $(this).closest('tr').remove();
    });

    // Add event listener to the "Add" button
    $('#add-tag-btn').on('click', function() {
        var itemInput = document.getElementById('input-tag');

        // Create a new row with the required HTML structure
        var newRow = '<tr>\
                        <td>' + itemInput.value +'</td>\
                        <td>0</td>\
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

function showNews() {
    $('div.nav-content').empty();
    $('div.nav-content').append('<div class="header h1">NEWS</div><hr>');

    var table = $('<table id="news-table" class="table table-striped"></table>');
    var tbody = $('<tbody></tbody>');

    table.append('<colgroup>\
                    <col span="1" style="width: 30%;">\
                    <col span="1" style="width: 25%;">\
                    <col span="1" style="width: 25%;">\
                    <col span="1" style="width: 10%;">\
                    <col span="1" style="width: 10%;">\
                </colgroup>');
    table.append('<thead class="table-dark">\
                    <tr>\
                        <th>Title</th>\
                        <th>Views</th>\
                        <th>Status</th>\
                        <th>&nbsp;</th>\
                        <th>&nbsp;</th>\
                    </tr>\
                </thead>');

    for (let i = 0; i < newsTable.length; i++) {
        var rowValue = newsTable[i];
        var row = $('<tr data-news-id="'+i+'">\
                        <td>'+ rowValue["Title"] +'</td>\
                        <td>'+ rowValue["Views"] +'</td>\
                        <td><select class="form-select">\
                            <option>' + rowValue["Status"][0] + '</option>\
                            <option>' + rowValue["Status"][1] +'</option>\
                        </select></td>\
                        <td class="text-center btn-edit-news"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditNews"><i class="bi bi-pencil-square"></i></a></td>\
                        <td class="text-center btn-remove-news"><a href="#"/><i class="bi bi-trash3"></i></td>\
                    </tr>');
        tbody.append(row);
    }                
    table.append(tbody);
    $('div.nav-content').append(table);
    $('div.nav-content').append('<button type="button" class="btn btn-default" style="color:dodgerblue;"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalAddNews"><i class="bi bi-plus"></i>Add</a></button>');
    
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

function showUsers() {
    $('div.nav-content').empty();
    $('div.nav-content').append('<div class="header h1">USERS</div><hr>');

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
                        <th>Permission</th>\
                        <th>Category</th>\
                        <th>Premium Duration</th>\
                        <th>&nbsp;</th>\
                        <th>&nbsp;</th>\
                    </tr>\
                </thead>');

    for (let i = 0; i < usersTable.length; i++) {
        var rowValue = usersTable[i];
        var cateValue = '&nbsp;';
        if (rowValue.Permission === 'Editor') {
            cateValue ='<select class="form-select">\
                            <option selected>'+rowValue.Category[0]+'</option>\
                            <option>'+rowValue.Category[1]+'</option>\
                            <option>'+rowValue.Category[2]+'</option>\
                        </select>';
        }

        var durationValue = '&nbsp;';
        if (rowValue.Permission === 'Subcriber') {
            durationValue ='<div class="input-group date">\
                                <input class="form-control" type="datetime-local" value="'+rowValue["Premium Duration"]+'">\
                            </div>';
        }


        var row = $('<tr data-user-id="'+i+'">\
                        <td>'+rowValue.Username+'</td>\
                        <td>'+rowValue.Permission+'</td>\
                        <td>'+cateValue+'</td>\
                        <td>'+durationValue+'</td>\
                        <td class="text-center btn-edit-user"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalEditUser"><i class="bi bi-pencil-square"></i></a></td>\
                        <td class="text-center btn-remove-user"><a href="#"/><i class="bi bi-trash3"></i></td>\
                    </tr>');
        tbody.append(row);
    }
    table.append(tbody);
    $('div.nav-content').append(table);
    $('div.nav-content').append('<button type="button" class="btn btn-default" style="color:dodgerblue;"><a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalAddUser"><i class="bi bi-plus"></i>Add</a></button>');

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