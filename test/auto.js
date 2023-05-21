
function generateQRCode() {
    var qrCode = new QRCode(document.getElementById("qrcode"), {
        width: 100,
        height: 100
    });
    qrCode.makeCode("https://www.youtube.com/watch?v=U06jlgpMtQs");
}

function readQRCode() {
    var html5QrcodeScanner = new Html5QrcodeScanner(
        "reader", {
            fps: 10,
            qrbox: 250
        });
    html5QrcodeScanner.render(onScanSuccess);
}
function saveQRCode() {
    var canvas = document.getElementById("qrcode");
    var img = canvas.toDataURL("image/png");
    document.write('<img src="'+img+'"/>');
}