var flag = 0; // 0->Menu, 1->play 2->end(成功) 3->end(失敗) 4->rule 5->volume
var digit;
var rep_array = [];
var ans_array = [];
var sound4;

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

function flag_ch(n) {
    flag = n;
}

function ans_check() {
    let n = ans_array.length;
    let hit = 0;
    let brow = 0;
    for (let i = 0; i < n; i++) {
        if (ans_array[i] === rep_array[i]) hit++;
        else if (ans_array.indexOf(rep_array[i]) >= 0) brow++;
    }
    hitblow(hit, brow); // canvasに渡す
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
        rep_array = [];
        if (eval_Ineq(50.0, 200.0, x) && eval_Ineq(250.0, 450.0, y)) {
            sound4.currentTime = 0;
            sound4.play();
            starttime();
            flag = 1;
            digit = 3;
            ans_array = make_number(3);
            gameplayCanvas(3, ans_array);
        } else if (eval_Ineq(250.0, 400.0, x) && eval_Ineq(250.0, 450.0, y)) {
            sound4.currentTime = 0;
            sound4.play();
            starttime();
            flag = 1;
            digit = 4;
            ans_array = make_number(4);
            gameplayCanvas(4, ans_array);
        } else if (eval_Ineq(450.0, 600.0, x) && eval_Ineq(250.0, 450.0, y)) {
            sound4.currentTime = 0;
            sound4.play();
            starttime();
            flag = 1;
            digit = 5;
            ans_array = make_number(5);
            gameplayCanvas(5, ans_array);
        } else if (eval_Ineq(49.0, 251.0, x) && eval_Ineq(509.0, 591.0, y)) {
          sound4.currentTime = 0;
            sound4.play();
            ruleCanvas();
            //console.log("rule");
            flag = 4;
        } else if (eval_Ineq(280.0, 480.0, x) && eval_Ineq(510.0, 590.0, y)) {
            sound4.currentTime = 0;
            sound4.play();
            //console.log("rank");
            flag = 0;
        } else if (eval_Ineq(505.0, 555.0, x) && eval_Ineq(543.0, 583.0, y)) {
            console.log("up");
            upVolume();
        } else if (eval_Ineq(560.0, 610.0, x) && eval_Ineq(543.0, 583, y)) {
            console.log("down");
            downVolume();
        }
    } else if (flag == 1) {
        if (eval_Ineq(300.0, 380.0, x) && eval_Ineq(260.0, 340.0, y)) {
            sound1.currentTime = 0;
            sound1.play();
            console.log(1);
            rep_array.push(1);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(400.0, 480.0, x) && eval_Ineq(260.0, 340.0, y)) {
            sound1.currentTime = 0;
            sound1.play();
            console.log(2);
            rep_array.push(2);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(500.0, 580.0, x) && eval_Ineq(260.0, 340.0, y)) {
            sound1.currentTime = 0;
            sound1.play();
            console.log(3);
            rep_array.push(3);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(300.0, 380.0, x) && eval_Ineq(350.0, 430.0, y)) {
            sound1.currentTime = 0;
            sound1.play();
            console.log(4);
            rep_array.push(4);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(400.0, 480.0, x) && eval_Ineq(350.0, 430.0, y)) {
            sound1.currentTime = 0;
            sound1.play();
            console.log(5);
            rep_array.push(5);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(500.0, 580.0, x) && eval_Ineq(350.0, 430.0, y)) {
            sound1.currentTime = 0;
            sound1.play();
            console.log(6);
            rep_array.push(6);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(300.0, 380.0, x) && eval_Ineq(440.0, 520.0, y)) {
            sound1.currentTime = 0;
            sound1.play();
            console.log(7);
            rep_array.push(7);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(400.0, 480.0, x) && eval_Ineq(440.0, 520.0, y)) {
            sound1.currentTime = 0;
            sound1.play();
            console.log(8);
            rep_array.push(8);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(500.0, 580.0, x) && eval_Ineq(440.0, 520.0, y)) {
            sound1.currentTime = 0;
            sound1.play();
            console.log(9);
            rep_array.push(9);
            select_num(rep_array);
            flag = 1;
        } else if (eval_Ineq(300.0, 580.0, x) && eval_Ineq(530.0, 610.0, y)) {
            sound1.currentTime = 0;
            sound1.play();
            console.log(0);
            rep_array.push(0);
            select_num(rep_array);
            flag = 1;
        } else if(eval_Ineq(594.0,631.0,x) && eval_Ineq(542.0,579.0,y)){
            upVolume();
        } else if(eval_Ineq(594.0,631.0,x) && eval_Ineq(582.0,619.0,y)){
            downVolume();
        }
        full_check();
        console.log(rep_array, ans_array);
    } else if (flag === 2){
        if(eval_Ineq(74.0,376.0,x) && eval_Ineq(499.0,601.0,y)){
            sound4.currentTime = 0;
            sound4.play();
            flag=0;
            canvas_reset(0,0,650,650);
            load_logo();
            startCanvas();
        }
        else if(eval_Ineq(419.0,551.0,x)&&eval_Ineq(499.0,601.0,y)){
            sound4.currentTime = 0;
            sound4.play();
            var temp="https://twitter.com/share?ref_src=twsrc%5Etfw&text=";
            window.open(temp+"Hit and Blow["+digit+"桁]を"+String(get_time())+"秒でクリアしました！Hit and Blowを遊ぶ場合はこちらから：","_blank");
        }
    } else if(flag===3){
        if(eval_Ineq(174.0,476.0,x)&&eval_Ineq(499.0,601.0,y)){
            sound4.currentTime = 0;
            sound4.play();
            flag=0;
            canvas_reset(0,0,650,650);
            load_logo();
            startCanvas();
        }
    } else if(flag===4){
        console.log(x,y);
        if(eval_Ineq(569.0,631.0,x) || eval_Ineq(49.0,111.0,y)){
            rule_del();
            flag=0;
        }
    }

}

window.addEventListener("load", function () {
    var canvas = $("gamenumberCanvas");
    canvas.addEventListener("click", onClick, false);
    sound1 = document.querySelector("#gamesound1");
    sound4 = document.querySelector("#gamesound4");
});

