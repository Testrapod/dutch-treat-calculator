var members = [];
var receipts = [];

var Transaction = function(sender, receiver, money) {
    this.sender = sender;
    this.receiver = receiver;
    this.money = money;
}

function dataGetting() {
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
}

function dataSetting(transactions) {
    $("#table_result>tbody").empty();

    var samePersonTrigger = false;
    var samePersonCount = 0;
    for(var i=0; i<transactions.length; i++) {
        // console.log(transactions[i]);
        var sender = transactions[i].sender;
        var count = transactions.filter(tx => tx.sender == sender).length;

        if(!samePersonTrigger && count > 1) {
            samePersonTrigger = true;
            samePersonCount = count;
        }

        var tagContent = "";
        if(samePersonTrigger) {
            if(samePersonCount == count) { // 같은 사람 (첫번째 나온 경우)
                tagContent +=
                    '<tr>' +
                        '<td rowspan="' + count + '">' + (members.indexOf(sender)+1) + '</td>' +
                        '<td>' + sender + '</td>' +
                        '<td>' + transactions[i].receiver + '</td>' +
                        '<td>' + transactions[i].money + '</td>' +
                    '</tr>';
                samePersonCount--;
            } else { // 같은 사람 (두번째 이후 나온 경우)
                tagContent +=
                    '<tr>' +
                        '<td>' + sender + '</td>' +
                        '<td>' + transactions[i].receiver + '</td>' +
                        '<td>' + transactions[i].money + '</td>' +
                    '</tr>';
                samePersonCount--;
            }
            if(samePersonCount == 0) samePersonTrigger = false;
        } else {
            tagContent +=
                '<tr>' +
                    '<td>' + (members.indexOf(sender)+1) + '</td>' +
                    '<td>' + sender + '</td>' +
                    '<td>' + transactions[i].receiver + '</td>' +
                    '<td>' + transactions[i].money + '</td>' +
                '</tr>';
        }
        $("#table_result>tbody").append(tagContent);
    }
}

function calculate() {
    dataGetting();
    // console.log(members);
    // console.log(receipts);

    var transactions = [];
    receipts.forEach(function(receipt) {
        // console.log(receipt)
        var eachMoney = Math.ceil(receipt.price / receipt.participants.length);
        receipt.participants.forEach(function(participant) {
            if(receipt.payer != participant) transactions.push(new Transaction(participant, receipt.payer, eachMoney));
        })
    })
    // console.log(transactions);

    transactions = transactions.sort(function(a, b) {
        return members.indexOf(a.sender) - members.indexOf(b.sender);
    });
    console.log(transactions);

    dataSetting(transactions);
}