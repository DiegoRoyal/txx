function hex2Dec(hex) {
    return parseInt(hex, 16);
}
function chat() {
    var chat = document.getElementById("chat").value;
    var chat = chat.split("");
    var chat = chat.map(function (x) { return hex2Dec(x); });
    var chat = chat.map(function (x) { return String.fromCharCode(x); });
    var chat = chat.join("");
    document.getElementById("chat").value = chat;
}
function drawCard() {
    var card = document.getElementById("card").value;
    var card = card.split("");
    var card = card.map(function (x) { return hex2Dec(x); });
    var card = card.map(function (x) { return String.fromCharCode(x); });
    var card = card.join("");
    document.getElementById("card").value = card;
}