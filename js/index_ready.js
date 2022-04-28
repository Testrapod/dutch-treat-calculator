/* index.html document ready */
$(document).ready(function () {
    $("form").submit(function() { return false; });

    ////////////////////////////////////////////////////////////////////////////////
    // add member
    $("#add_button_member").click(function() {
        var name = $("#add_input_member").val();
        addMember(name);

        $("#alert_add_success").show();
        setTimeout(function() { $("#alert_add_success").fadeOut(); }, 2000);
    });

    // next (member)
    $("#next_button_member").click(function() {
        // select_list
        $("#select_list_receipt").empty();
        var select_list = $("#select_list_receipt");

        // checkbox_list
        $("#checkbox_list_receipt>div").remove();
        var checkbox_list = $("#checkbox_list_receipt");

        var trs = $("#table_member>tbody>tr");
        trs.each(function(i) {
            var tds = trs.eq(i).children();
            var name = tds.eq(1).text().trim();

            // select_list
            var tagContent = '<option value="' + name + '">' + name + '</option>'
            select_list.append(tagContent);
            
            // checkbox_list
            tagContent = 
                '<div class="form-check">' +
                    '<input name="participants_input" class="form-check-input" type="checkbox" checked>' +
                    '<label name="participants_label" class="form-check-label">' + name + '</label>'
                '</div>';
            checkbox_list.append(tagContent);
        });

        $("#member").hide();
        $("#receipt").show();
    });
    ////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////
    // add receipt
    $("#add_button_receipt").click(function() {
        addReceipt();

        $("#alert_add_success").show();
        setTimeout(function() { $("#alert_add_success").fadeOut(); }, 2000);
    });

    // prev (receipt)
    $("#prev_button_receipt").click(function() {
        $("#list_receipt").empty();

        $("#receipt").hide();
        $("#member").show();
    });
    // next (receipt)
    $("#next_button_receipt").click(function() {
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