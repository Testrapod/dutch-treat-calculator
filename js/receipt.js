var receipt_count = $("#list_receipt>div").length;

function addReceipt() {
    var item = $("#add_input_receipt_item").val();
    var payer = $("#add_input_receipt_payer").val();
    var price = $("#add_input_receipt_price").val();

    var names = []; var participants = [];
    $('label[name=participants_label]').each(function() { names.push($(this).text()); });
    $('input:checkbox[name=participants_input]').each(function(i) { if(this.checked) participants.push(names[i]); });
    // console.log(item + " / " + payer + " / " + price + " / " + participants);

    receipt_count++;

    var tagContent =
        '<div class="card">' +
            '<h5 class="card-header">' + item + '</h5>' +
            '<div class="card-body">' +
                '<h5 class="card-title">Payer: <span>' + payer + '</span></h5>' +
                '<h6 class="card-subtitle mb-2">Price: <span>' + price + '</span></h6>' +
                '<hr />' +
                '<span class="card-text">Participants:</span><br />';
    for(var i=0; i<participants.length; i++) { tagContent += '<span class="card-text"> ' + participants[i] + ' </span>'; }
    tagContent +=
            '</div>' +
        '</div>';

    $("#list_receipt").append(tagContent);
}