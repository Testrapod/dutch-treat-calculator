/* index.html document ready */
$(document).ready(function () {
    // add member
    $("#add_button_member").click(function() {
        var name = $("#add_input_member").val();
        addMember(name);
    });
});