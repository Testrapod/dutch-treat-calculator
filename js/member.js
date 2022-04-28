var member_count = $("#table_member>tbody>tr").length;

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
        closeButton();

        $("#alert_revise_success").show();
        setTimeout(function() { $("#alert_revise_success").fadeOut(); }, 1500);
    });
}

function deleteMember(obj) {
    $(obj).parent().remove();

    member_count = 0;
    var trs = $("#table_member>tbody>tr");
    trs.each(function(i) {
        member_count++;

        var tds = trs.eq(i).children();
        tds.eq(0).text(member_count);
    });
}