var member_count = 3;

function addMember(name) {
    member_count++;

    var tagContent =
        '<tr>' +
            '<td>' + member_count + '</td>' +
            '<td onclick="reviseMember(this);">' + name + '</td>' +
            '<td class="delete-button" onClick="deleteMember(this);">X</td>' +
        '</tr>';
    
    $("#table_member>tbody").append(tagContent);
    $("#add_input_member").val('');
}

function reviseMember(obj) {
    var name = $(obj).text().trim();
    $("#revise_input_member").val(name);

    var reviseModalMember = new bootstrap.Modal(document.getElementById('reviseModalMember'));
    reviseModalMember.show();

    $("#revise_button_member").click(function() {
        name = $("#revise_input_member").val();
        $(obj).text(name);

        $("#alert_revise_success").show();
        setTimeout(function() { $("#alert_revise_success").fadeOut(); }, 2000);

        $("#revise_button_member").off();
    });
}

function deleteMember(obj) {
    var tds = $(obj).parent().children();

    var number = tds.eq(0).text().trim();
    var name = tds.eq(1).text().trim();

    console.log(number + " / " + name);
}