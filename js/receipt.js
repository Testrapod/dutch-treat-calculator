var receipt_count = $("#list_receipt>div").length;

function addReceipt() {
    var item = $("#add_input_receipt_item").val();
    var payer = $("#add_select_list_receipt").val();
    var price = $("#add_input_receipt_price").val();
    if(isEmpty(price)) price = 0;

    var names = []; var participants = [];
    $('label[name=add_participants_label]').each(function() { names.push($(this).text()); });
    $('input:checkbox[name=add_participants_input]').each(function(i) { if(this.checked) participants.push(names[i]); });
    if(participants.length == 0) {
        $("#alert_message").text("참여자는 한 명 이상 있어야 합니다");

        $("#alert_fail").show();
        setTimeout(function() { $("#alert_fail").fadeOut(); }, 1000);
        return;
    }
    // console.log(item + " / " + payer + " / " + price + " / " + participants);

    receipt_count++;

    var marginTop = "";
    if(receipt_count > 1) marginTop = "mt-2";

    var tagContent =
        '<div class="card ' + marginTop + '" onclick="reviseReceipt(this);">' +
            '<h5 class="card-header">' + item + '</h5>' +
            '<div class="card-body">' +
                '<h5 class="card-title">결제자: <span>' + payer + '</span></h5>' +
                '<h6 class="card-subtitle mb-2">가격: <span>' + price + '</span></h6>' +
                '<hr />' +
                '<span class="card-text">참여자:</span><br />' +
                '<span class="card-text">' + participants.join(" ") + '</span>' +
            '</div>' +
        '</div>';

    $("#list_receipt").append(tagContent);

    $("#add_input_receipt_item").val("");
    $("#add_select_list_receipt").val(payer);
    $("#add_input_receipt_price").val("");
    $('input:checkbox[name=add_participants_input]').each(function(i) { $(this).prop("checked", true); });
}

function reviseReceipt(obj) {
    var item = $(obj).children().eq(0).text();
    var payer = $(obj).children().eq(1).children().eq(0).children().eq(0).text();
    var price = $(obj).children().eq(1).children().eq(1).children().eq(0).text();
    var participants = $(obj).children().eq(1).children().eq(5).text().split(" ");
    // console.log(item + " / " + payer + " / " + price + " / " + participants);

    $("#revise_input_receipt_item").val(item);
    $("#revise_select_list_receipt").val(payer).prop("selected", true);
    $("#revise_input_receipt_price").val(price);

    var participants_idx = [];
    $('label[name=revise_participants_label]').each(function(i) { if(participants.includes($(this).text())) participants_idx.push(i) });
    $('input:checkbox[name=revise_participants_input]').each(function(i) {
        if(participants_idx.includes(i)) $(this).prop("checked", true);
        else $(this).prop("checked", false);
    });

    var reviseModalReceipt = new bootstrap.Modal(document.getElementById('reviseModalReceipt'));
    reviseModalReceipt.show();

    // revise receipt
    $("#revise_button_receipt").click(function() {
        closeButton();

        item = $("#revise_input_receipt_item").val();
        payer = $("#revise_select_list_receipt").val();
        price = $("#revise_input_receipt_price").val();
        if(isEmpty(price)) price = 0;

        var names = []; participants = [];
        $('label[name=revise_participants_label]').each(function() { names.push($(this).text()); });
        $('input:checkbox[name=revise_participants_input]').each(function(i) { if(this.checked) participants.push(names[i]); });
        if(participants.length == 0) {
            $("#alert_message").text("참여자는 한 명 이상 있어야 합니다");
            $("#alert_fail").show();
            setTimeout(function() { $("#alert_fail").fadeOut(); }, 1000);
            return;
        }
        // console.log(item + " / " + payer + " / " + price + " / " + participants);

        $(obj).children().eq(0).text(item);
        $(obj).children().eq(1).children().eq(0).children().eq(0).text(payer);
        $(obj).children().eq(1).children().eq(1).children().eq(0).text(price);
        $(obj).children().eq(1).children().eq(5).text(participants.join(" "));
    });

    // delete receipt
    $("#delete_button_receipt").click(function() {
        receipt_count--;
        
        $(obj).remove();
        closeButton();
    });
}