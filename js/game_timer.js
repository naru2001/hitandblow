var limitTime = 120;
var startTime = 0;
var timeDiff;
var score = 0;

function starttime(){
  startTime = Date.now();
}

function countdown() {
    timeDiff = Date.now() - startTime;
    timeDiff = limitTime - (timeDiff / 1000);
    timeDiff *= 100;
    timeDiff = Math.floor(timeDiff);
    timeDiff = timeDiff / 100;
    //$('.sec').text(timeDiff);
    return timeDiff;
}

var id = setInterval(function () {
    countdown();
    //console.log(timeDiff);
    if (timeDiff <= 0) {
        clearInterval(id);
        //$('#timer').text("終了");
        //$("#inputAnswer").hide();
    }
}, 1);