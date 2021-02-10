function make_number(n) { //Fisher–Yates shuffle
    const num_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = num_array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        num_array[i] = [num_array[j], num_array[j] = num_array[i]][0];
    }
    return num_array.slice(0, n);
}

function ans_check(ans, reply) {
    let n = ans.length;
    let hit = 0;
    let brow = 0;
    for (let i = 0; i < n; i++) {
        if (ans[i] === reply[i]) hit++;
        else if (ans.indexOf(reply[i]) >= 0) brow++;
    }
    return [hit, brow];
}

function onClick(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    check_coord(x,y);
}

function check_coord(x,y){
    //座標の判定する
    return
}

window.addEventListener('load', function () {
    var canvas = $("gameCanvas");
    canvas.addEventListener('click', onClick, false);
})