var flag = 0; // 0->Menu, 1->play 2->end
var ans_array=[]

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
    //console.log(x, y);
}

function full_check(n) {

}
function check_coord(x, y) {
    if (flag == 0) {
        if (eval_Ineq(50.0, 200.0, x) && eval_Ineq(250.0, 450.0, y)) {
            flag = 1;
            gameplayCanvas(3);
        } else if (eval_Ineq(250.0, 400.0, x) && eval_Ineq(250.0, 450.0, y)) {
            flag = 1;
            gameplayCanvas(4);
        } else if (eval_Ineq(450.0, 600.0, x) && eval_Ineq(250.0, 450.0, y)) {
            flag = 1;
            gameplayCanvas(5);
        } else if (eval_Ineq(50.0, 250.0, x) && eval_Ineq(510.0, 590.0, y)) {
            //console.log("rule");
            flag = 4;
        } else if (eval_Ineq(280.0, 480.0, x) && eval_Ineq(510.0, 590.0, y)) {
            //console.log("rank");
            flag = 5;
        } else if (eval_Ineq(520.0, 600.0, x) && eval_Ineq(510.0, 590.0, y)) {
            //console.log("share");
        }
    } else if (flag == 1) {
        if (eval_Ineq(300.0, 380.0, x) && eval_Ineq(260.0, 340.0, y)) {
            console.log(6);
            flag = 1;
        } else if (eval_Ineq(400.0, 480.0, x) && eval_Ineq(260.0, 340.0, y)) {
            console.log(7);
            flag = 1;
        } else if (eval_Ineq(500.0, 580.0, x) && eval_Ineq(260.0, 340.0, y)) {
            console.log(8);
            flag = 1;
        } else if (eval_Ineq(300.0, 380.0, x) && eval_Ineq(350.0, 430.0, y)) {
            console.log("rule1");
            flag = 1;
        } else if (eval_Ineq(400.0, 480.0, x) && eval_Ineq(350.0, 430.0, y)) {
            console.log("rank2");
            flag = 5;
        } else if (eval_Ineq(500.0, 580.0, x) && eval_Ineq(350.0, 430.0, y)) {
            console.log("share3");
        } else if (eval_Ineq(300.0, 380.0, x) && eval_Ineq(440.0, 520.0, y)) {
            console.log("rule1");
            flag = 1;
        } else if (eval_Ineq(400.0, 480.0, x) && eval_Ineq(440.0, 520.0, y)) {
            console.log("rank2");
            flag = 5;
        } else if (eval_Ineq(500.0, 580.0, x) && eval_Ineq(440.0, 520.0, y)) {
            console.log("share3");
        } else if (eval_Ineq(300.0, 280.0, x) && eval_Ineq(530.0, 610.0, y)) {
            console.log(0);
        }
    }
}

window.addEventListener("load", function () {
    var canvas = $("gameCanvas");
    canvas.addEventListener("click", onClick, false);
});
