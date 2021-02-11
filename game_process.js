function make_number(n) { //Fisher–Yates shuffle
    const num_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = num_array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        num_array[i] = [num_array[j], num_array[j] = num_array[i]][0];
    }
    return num_array.slice(0, n);
}

function eval_Ineq(a, b, n) { //欲しかった
    return a <= n && n <= b;
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
    check_coord(x, y);
    console.log(x, y);
}

function check_coord(x, y) {
    if (50.0 <= x <= 200.0 && 250.0 <= y <= 450.0) {
        console.log(3);
    }
    else if (250.0 <= x <= 400.0 && 250.0 <= y <= 450.0) {
        console.log(4);
    }
    else if (450.0 <= x <= 600.0 && 250.0 <= y <= 450.0) {
        console.log(5);
    }
    return
}

window.addEventListener('load', function () {
    var canvas = $("gameCanvas");
    canvas.addEventListener('click', onClick, false);
})

