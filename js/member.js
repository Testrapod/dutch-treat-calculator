var member_count = $("#table_member>tbody>tr").length;

function addMember(name) {
    if(isEmpty(name)) {
        $("#alert_message").text("이름은 한 글자 이상이어야 합니다");
        $("#alert_fail").show();
        setTimeout(function() { $("#alert_fail").fadeOut(); }, 1000);
        return;
    }
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
        closeButton();

        name = $("#revise_input_member").val();
        if(isEmpty(name)) {
            $("#alert_message").text("이름은 한 글자 이상이어야 합니다");
            $("#alert_fail").show();
            setTimeout(function() { $("#alert_fail").fadeOut(); }, 1000);
            return;
        }

        $(obj).text(name);
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

function checkMember() {
    var member_list = [];

    var trs = $("#table_member>tbody>tr");
    trs.each(function(i) {
        var name = trs.eq(i).children().eq(1).text().trim();
        member_list.push(name);
    });
    var member_set = new Set(member_list);

    if(member_list.length <= 1) return "ONE_MEMBER";
    else if(member_list.length != member_set.size) return "DUPLICATE";
    return "PASS";
}