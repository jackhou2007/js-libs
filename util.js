function shuffle(array) {
    var m = array.length, i, t;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function generate(min, max) {
    var arr = [];
    for (var i=min; i<=max; i++) {
        arr.push(i);
    }

    return arr;
}
var arr = generate(1, 10);
var result = shuffle(arr);
