/* index.html document ready */
function closeButton() {
    $("#revise_button_member").off();

    $("#revise_button_receipt").off();
    $("#delete_button_receipt").off();
}

$(document).ready(function () {
    $("form").submit(function() { return false; });

    ////////////////////////////////////////////////////////////////////////////////
    // add member
    $("#add_button_member").click(function() {
        var name = $("#add_input_member").val();
        addMember(name);

        // $("#alert_add_success").show();
        // setTimeout(function() { $("#alert_add_success").fadeOut(); }, 1500);
    });

    // next (member)
    $("#next_button_member").click(function() {
        // select_list
        $("#add_select_list_receipt").empty();
        $("#revise_select_list_receipt").empty();
        var add_select_list = $("#add_select_list_receipt");
        var revise_select_list = $("#revise_select_list_receipt");

        // checkbox_list
        $("#add_checkbox_list_receipt>div").remove();
        $("#revise_checkbox_list_receipt>div").remove();
        var add_checkbox_list = $("#add_checkbox_list_receipt");
        var revise_checkbox_list = $("#revise_checkbox_list_receipt");

        var trs = $("#table_member>tbody>tr");
        trs.each(function(i) {
            var tds = trs.eq(i).children();
            var name = tds.eq(1).text().trim();

            // select_list
            var tagContent = '<option value="' + name + '">' + name + '</option>'
            add_select_list.append(tagContent);
            revise_select_list.append(tagContent);
            
            // checkbox_list
            tagContent = 
                '<div class="form-check">' +
                    '<input name="add_participants_input" class="form-check-input" type="checkbox" checked>' +
                    '<label name="add_participants_label" class="form-check-label">' + name + '</label>'
                '</div>';
            add_checkbox_list.append(tagContent);
            tagContent = 
                '<div class="form-check">' +
                    '<input name="revise_participants_input" class="form-check-input" type="checkbox">' +
                    '<label name="revise_participants_label" class="form-check-label">' + name + '</label>'
                '</div>';
            revise_checkbox_list.append(tagContent);
        });

        $("#member").hide();
        $("#receipt").show();
    });
    ////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////
    // add receipt
    $("#add_button_receipt").click(function() {
        addReceipt();

        // $("#alert_add_success").show();
        // setTimeout(function() { $("#alert_add_success").fadeOut(); }, 1500);
    });

    // prev (receipt)
    $("#prev_button_receipt").click(function() {
        $("#list_receipt").empty();

        $("#receipt").hide();
        $("#member").show();
    });
    // next (receipt)
    $("#next_button_receipt").click(function() {
        if(receipt_count >= 1) {
            calculate();
            $("#no_result").hide();
            $("#table_result").show();
        } else {
            $("#table_result").hide();
            $("#no_result").show();
        }

        $("#receipt").hide();
        $("#result").show();
    });
    ////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////
    // prev (result)
    $("#prev_button_result").click(function() {
        $("#result").hide();
        $("#receipt").show();
    });
    // again (result)
    $("#again_button_result").click(function() { location.reload(); });
    ////////////////////////////////////////////////////////////////////////////////
});