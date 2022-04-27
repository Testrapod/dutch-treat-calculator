/* index.html document ready */
$(document).ready(function () {
    // add member
    $("#add_button_member").click(function() {
        var name = $("#add_input_member").val();
        addMember(name);

        $("#alert_add_success").show();
        setTimeout(function() { $("#alert_add_success").fadeOut(); }, 2000);
    });
});