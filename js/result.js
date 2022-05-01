var members = [];
var receipts = [];

var Transaction = function(sender, receiver, price) {
    this.sender = sender;
    this.receiver = receiver;
    this.price = price;
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
                        '<td>' + transactions[i].price + '</td>' +
                    '</tr>';
                samePersonCount--;
            } else { // 같은 사람 (두번째 이후 나온 경우)
                tagContent +=
                    '<tr>' +
                        '<td>' + sender + '</td>' +
                        '<td>' + transactions[i].receiver + '</td>' +
                        '<td>' + transactions[i].price + '</td>' +
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
                    '<td>' + transactions[i].price + '</td>' +
                '</tr>';
        }
        $("#table_result>tbody").append(tagContent);
    }
}

function txCompare(tx1, tx2) {
    if(tx1.sender == tx2.sender && tx1.receiver == tx2.receiver) return true;
    return false;
}

function transactionSimplify(transactions) {
    for(var i=0; i<transactions.length; i++) {
        for(var j=i+1; j<transactions.length; j++) {
            if(txCompare(transactions[i], transactions[j])) {
                transactions[i].price += transactions[j].price;
                transactions[j].price = 0;
            }
        }
    }

    return transactions.filter(tx => tx.price != 0);
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
        });
    });
    // console.log(transactions);

    transactions = transactions.sort(function(a, b) {
        return members.indexOf(a.sender) - members.indexOf(b.sender);
    });
    transactions = transactionSimplify(transactions);
    // console.log(transactions);

    dataSetting(transactions);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function getMaximumSubsets(paidMoney) {
    var money = [...paidMoney];
    var subsets = [[]];
    var result = [];

    for(var i=0; i<money.length; i++) {
        var len = subsets.length;
        for(var j=0; j<len; j++) {
            var subset = [...subsets[j], i];
            var sum = 0;

            if(subset.length > money.length/2) continue;

            for(var k=0; k<subset.length; ) {
                if(money[subset[k]] != undefined) { sum += money[subset[k]]; k += 1;}
                else subset.splice(k, 1);
            }

            if(sum == 0 && subset.length != 0) {
                result.push(subset);
                for(var k=0; k<subset.length; k++) money[subset[k]] = undefined;
                break;
            }
            else subsets.push(subset);
        }
    }

    var rest = [];
    for(var i=0; i<money.length; i++) { if(money[i] != undefined) rest.push(i); }
    if(rest.length != 0) result.push(rest);

    return result;
}

function calculateSubsetProb() {
    dataGetting();

    // subset problem
    var totalPaidMoney = [];
    for(var i=0; i<members.length; i++) totalPaidMoney.push(0);

    receipts.forEach(function(receipt) {
        var payer = receipt.payer;
        var money = Number(receipt.price);
        var participants = receipt.participants;
        
        var r = money % participants.length;
        if(r != 0) money += Number(participants.length - r);

        totalPaidMoney[members.indexOf(payer)] -= money;
        participants.forEach(function(participant) { totalPaidMoney[members.indexOf(participant)] += Math.ceil(money / participants.length); });
    });
    // console.log(totalPaidMoney);

    var subsets = getMaximumSubsets(totalPaidMoney);
    // console.log(subsets);

    var transactions = [];
    subsets.forEach(function(subset) {
        var money = [];
        for(var i=0; i<subset.length; i++) money.push(totalPaidMoney[subset[i]]);

        var root = money.indexOf(Math.min(...money));
        while(money[root] != 0) {
            let from, to;

            for(var i=0; i<money.length; i++) {
                if(from === undefined && money[i] > 0) {
                    from = i;
                    if (money[from] <= Math.abs(money[root])) to = root;
                } else if(to === undefined && money[i] < 0 && i !== root) { to = i; }

                if(from !== undefined && to !== undefined) break;
            }

            transactions.push(new Transaction(members[subset[from]], members[subset[to]], money[from]));
            money[to] += money[from];
            money[from] = 0;
        }
    });

    transactions = transactions.sort(function(a, b) { return members.indexOf(a.sender) - members.indexOf(b.sender); });
    transactions = transactionSimplify(transactions);
    // console.log(transactions);

    dataSetting(transactions);
}