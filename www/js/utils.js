
// ============================
// === FONCTIONS UTILITAIRE ===
// ============================

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function getPhoneGapPath() {
    var path = window.location.pathname;
    path = path.substr( 0, path.length - 10 );
    return 'file://' + path;
};

function leftPad (str, len, ch) {
    var cache = [
        '',
        ' ',
        '  ',
        '   ',
        '    ',
        '     ',
        '      ',
        '       ',
        '        ',
        '         '
    ];
    // convert `str` to `string`
    str = str + '';
    // `len` is the `pad`'s length now
    len = len - str.length;
    // doesn't need to pad
    if (len <= 0) return str;
    // `ch` defaults to `' '`
    if (!ch && ch !== 0) ch = ' ';
    // convert `ch` to `string`
    ch = ch + '';
    // cache common use cases
    if (ch === ' ' && len < 10) return cache[len] + str;
    // `pad` starts with an empty string
    var pad = '';
    // loop
    while (true) {
    // add `ch` to `pad` if `len` is odd
    if (len & 1) pad += ch;
    // divide `len` by 2, ditch the remainder
    len >>= 1;
    // "double" the `ch` so this operation count grows logarithmically on `len`
    // each time `ch` is "doubled", the `len` would need to be "doubled" too
    // similar to finding a value in binary search tree, hence O(log(n))
    if (len) ch += ch;
    // `len` is 0, exit the loop
    else break;
    }
    // pad `str`!
    return pad + str;
}