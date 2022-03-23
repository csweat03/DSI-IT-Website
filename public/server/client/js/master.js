function autoHyphen(f) {
    var r = /(\D+)/g,
        npa = '',
        nxx = '',
        last4 = '';
    f.value = f.value.replace(r, '');
    npa = f.value.substr(0, 3);
    nxx = f.value.substr(3, 3);
    last4 = f.value.substr(6, 4);
    f.value = npa + (nxx.length > 0 ? '-' : '') + nxx + (last4.length > 0 ? '-' : '') + last4;
}

function limitTextAreaReg(f) {
    var limit = 5;
    var l = f.value.replace(/\r\n/g, "\n").replace(/\r/g, "").split(/\n/g);

    if (l.length > limit) {
        f.value = l.slice(0, limit).join("\n");
    }
}

function limitTextAreaOnPaste(f) {
    setTimeout(limitTextAreaReg, 1);
}

function getCounter(f, limit) {
    var l = f.value.replace(/\r\n/g, "\n").replace(/\r/g, "").split(/\n/g)[0].split('');

    document.getElementById("charcount").innerHTML = ("" + l.length + " / " + limit + "");
}
