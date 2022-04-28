var members = [];
var receipts = [];

function dataSetting() {
    members = [];
    receipts = [];

    // members
    var trs = $("#table_member>tbody>tr");
    trs.each(function(i) {
        var name = trs.eq(i).children().eq(1).text().trim();
        members.push(name);
    });

    // receipts
    var receipt_list = $("#list_receipt").children();
    receipt_list.each(function(i) {
        var item = $(this).children().eq(0).text();
        var payer = $(this).children().eq(1).children().eq(0).children().eq(0).text();
        var price = $(this).children().eq(1).children().eq(1).children().eq(0).text();
        var participants = $(this).children().eq(1).children().eq(5).text().split(" ");
        receipts.push({item: item, payer: payer, price: price, participants: participants});
    });

    console.log(members);
    console.log(receipts);
}

function calculate() {
    dataSetting();
    console.log("calc...");
}