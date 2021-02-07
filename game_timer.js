var limitTime = 120;
var startTime = Date.now();
var timeDiff;
var score = 0;

var countdown = function () {
    timeDiff = Date.now() - startTime;
    timeDiff = limitTime - (timeDiff / 1000);
    timeDiff *= 100;
    timeDiff = Math.floor(timeDiff);
    timeDiff = timeDiff / 100;
    $('.sec').text(timeDiff);
}

var id = setInterval(function () {
    countdown();
    console.log(timeDiff);
    if (timeDiff <= 0) {
        clearInterval(id);
        $('#timer').text("終了");
        $("#inputAnswer").hide();
    }
}, 1);