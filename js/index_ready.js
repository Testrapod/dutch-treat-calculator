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
        $("#member").hide();
        $("#receipt").show();
    });
    ////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////
    // add receipt
    $("#add_button_receipt").click(function() {
        console.log("add receipt");

        // $("#alert_add_success").show();
        // setTimeout(function() { $("#alert_add_success").fadeOut(); }, 2000);
    });

    // prev (receipt)
    $("#prev_button_receipt").click(function() {
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