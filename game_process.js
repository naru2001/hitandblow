var flag = 0; // 0->Menu, 1->play 2->end 3->rule 4->volume
var digit;
var rep_array = [];
var ans_array = [];

function make_number(n) { //Fisher–Yates shuffle
    const num_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = num_array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        num_array[i] = [num_array[j], (num_array[j] = num_array[i])][0];
    }
    return num_array.slice(0, n);
}

function eval_Ineq(a, b, n) {
    return a <= n && n <= b;
}

function ans_check() {
    let n = ans_array.length;
    let hit = 0;
    let brow = 0;
    for (let i = 0; i < n; i++) {
        if (ans_array[i] === rep_array[i]) hit++;
        else if (ans_array.indexOf(rep_array[i]) >= 0) brow++;
    }
    hitblow(hit,brow,ans_array); // canvasに渡す
    rep_array = [];
}

function onClick(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    check_coord(x, y);
    //console.log(x, y);
}

function full_check() {
    if (rep_array.length === digit) {
        ans_check(ans_array, rep_array);
    }
}

function check_coord(x, y) {
    if (flag == 0) {
        if (eval_Ineq(50.0, 200.0, x) && eval_Ineq(250.0, 450.0, y)) {
            starttime();
            flag = 1;
            digit = 3;
            ans_array = make_number(3);
            gameplayCanvas(3 ,ans_array);
        } else if (eval_Ineq(250.0, 400.0, x) && eval_Ineq(250.0, 450.0, y)) {
          starttime();
            flag = 1;
            digit = 4;
            ans_array = make_number(4);
            gameplayCanvas(4, ans_array);
        } else if (eval_Ineq(450.0, 600.0, x) && eval_Ineq(250.0, 450.0, y)) {
          starttime();
            flag = 1;
            digit = 5;
            ans_array = make_number(5);
            gameplayCanvas(5, ans_array);
        } else if (eval_Ineq(50.0, 250.0, x) && eval_Ineq(510.0, 590.0, y)) {
            //console.log("rule");
            flag = 0;
        } else if (eval_Ineq(280.0, 480.0, x) && eval_Ineq(510.0, 590.0, y)) {
            //console.log("rank");
            flag = 0;
        } else if (eval_Ineq(505.0, 555.0, x) && eval_Ineq(543.0, 583.0, y)) {
            console.log("up");
            upVolume();
        } else if (eval_Ineq(560.0,610.0,x) && eval_Ineq(543.0,583,y)){
            console.log("down");
            downVolume();
        }
    } else if (flag == 1) {
        if (eval_Ineq(300.0, 380.0, x) && eval_Ineq(260.0, 340.0, y)) {
            console.log(1);
            rep_array.push(1);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(400.0, 480.0, x) && eval_Ineq(260.0, 340.0, y)) {
            console.log(2);
            rep_array.push(2);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(500.0, 580.0, x) && eval_Ineq(260.0, 340.0, y)) {
            console.log(3);
            rep_array.push(3);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(300.0, 380.0, x) && eval_Ineq(350.0, 430.0, y)) {
            console.log(4);
            rep_array.push(4);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(400.0, 480.0, x) && eval_Ineq(350.0, 430.0, y)) {
            console.log(5);
            rep_array.push(5);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(500.0, 580.0, x) && eval_Ineq(350.0, 430.0, y)) {
            console.log(6);
            rep_array.push(6);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(300.0, 380.0, x) && eval_Ineq(440.0, 520.0, y)) {
            console.log(7);
            rep_array.push(7);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(400.0, 480.0, x) && eval_Ineq(440.0, 520.0, y)) {
            console.log(8);
            rep_array.push(8);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(500.0, 580.0, x) && eval_Ineq(440.0, 520.0, y)) {
            console.log(9);
            rep_array.push(9);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(300.0, 580.0, x) && eval_Ineq(530.0, 610.0, y)) {
            console.log(0);
            rep_array.push(0);
            select_num(rep_array);
            flag = 1;
        }
        full_check();
        console.log(rep_array, ans_array);
    }
}

window.addEventListener("load", function () {
    var canvas = $("gamenumberCanvas");
    canvas.addEventListener("click", onClick, false);
});
