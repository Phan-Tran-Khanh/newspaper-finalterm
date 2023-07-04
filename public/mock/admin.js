var cateTab = []
{{#each categories}}
    cateTab.push({
      "id": {{id}},
      "name": '{{{name}}}',
      {{!-- "noEditor": {{noEditor}},
      "noNews": {{noNews}}, --}}
    })
{{/each}}
console.log("========>", cateTab);

var tagTable = [
    {
        "Tag": "Agriculture",
        "No. editors": "5",
        "No. news": "5"
    },
    {
        "Tag": "Sea Food",
        "No. editors": "6765",
        "No. news": "522"
    }
];

var newsTable = [
    {
        "Title": "No boom for Phu Quoc tour guides this holiday",
        "Views": "5",
        "Status": ["Xuất bản", "Bản nháp"]
    },
    {
        "Title": "Vietnamese man dies at Japanese police station",
        "Views": "232332",
        "Status": ["Xuất bản", "Bản nháp"]
    }
];

var usersTable = [
    {
        "Username": "#username 1",
        "Permission": "Subcriber",
        "Premium Duration": ""
    },
    {
        "Username": "#username 2",
        "Permission": "Editor",
        "Status": "Mục lục"
    },
    {
        "Username": "#username 3",
        "Permission": "Writer"
    },
    {
        "Username": "#username 4",
        "Permission": "Subcriber",
        "Premium Duration": "2033-06-06T19:30"
    }
];