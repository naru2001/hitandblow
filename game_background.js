/*
Hit and Blow ver0.0.1
Copyright © naru2001, nkgw-marronnier 2021
GitHub: https://github.com/naru2001
GitHub: https://github.com/nkgw-marronnier

game_background.js
Copyright © nkgw-marronnier 2021
GitHub: https://github.com/nkgw-marronnier
*/

var degree = 0;
var back_number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var b_size_ = 630;
var back_time = 0;
var back_time_ = 0;
var l = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450];
var num_mas = [];
var color_n = 0;

for (var i = l.length - 1; i > 0; i--) {
  var k = Math.floor(Math.random() * (i + 1));
  var tmp = l[i];
  l[i] = l[k];
  l[k] = tmp;
}

function backNumber() {
  if (back_time % 40 == 0) {
    for (var i = 0; i < back_number.length; i++) {
      back_number[i]++;
      if (back_number[i] > 9) {
        back_number[i] = 0;
      }
    }
  }
  backNumberRandom();
  back_time = back_time + 0.5;
  if (back_time >= 40) {
    back_time = 0;
  }
}

function backNumberRandom() {
  if (back_time_ % 80 == 0) {
    var start_nX = -70;
    var start_nY = -120;
    num_mas = [];
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        num_mas.push([start_nX, start_nY]);
        start_nY = start_nY + 150;
      }
      start_nY = -120;
      start_nX = start_nX + 150;
    }
    for (var i = num_mas.length - 1; i > 0; i--) {
      var k = Math.floor(Math.random() * (i + 1));
      var tmp = num_mas[i];
      num_mas[i] = num_mas[k];
      num_mas[k] = tmp;
    }
  }
  back_time_ = back_time_ + 0.5;
  if (back_time_ >= 80) {
    back_time_ = 0;
  }
}

function lineMove() {
  for (var i = 0; i < l.length; i++) {
    l[i]++;
    if (l[i] > b_size_ + 100) {
      l[i] = -1100;
    }
  }
}

function colorVariety(late_c) {
  if (late_c == null) {
    late_c = 0;
  }
  var latency_c = late_c;
  color_n = color_n + latency_c;

  if (color_n > 360) {
    color_n = 0;
  }

  var color_v = "hsl(" + color_n + ", 55%, 55%)";
  color_n = color_n + 0.5;

  return [color_v, color_n];
}

function backgroundDraw() {
  backNumber();
  lineMove();

  for (var i = 0; i < 18; i++) {
    var nX = num_mas[i][0];
    var nY = num_mas[i][1];
    draw_filltext(
      back_number[i],
      "150px gothic",
      colorVariety(60)[0],
      nX,
      nY,
      "back"
    );
  }

  draw_line(l[0], 50, 1000 + l[0], 50, 4, colorVariety(0)[0], "back");
  draw_line(l[1], 200, 1000 + l[1], 200, 4, colorVariety(50)[0], "back");
  draw_line(l[2], 350, 1000 + l[2], 350, 4, colorVariety(30)[0], "back");
  draw_line(l[3], 500, 1000 + l[3], 500, 4, colorVariety(100)[0], "back");
  draw_line(l[4], 650, 1000 + l[4], 650, 4, colorVariety(200)[0], "back");
  draw_line(50, l[5], 50, 1000 + l[5], 4, colorVariety(0)[0], "back");
  draw_line(200, l[6], 200, 1000 + l[6], 4, colorVariety(30)[0], "back");
  draw_line(350, l[7], 350, 1000 + l[7], 4, colorVariety(50)[0], "back");
  draw_line(500, l[8], 500, 1000 + l[8], 4, colorVariety(20)[0], "back");
  draw_line(650, l[9], 650, 1000 + l[9], 4, colorVariety(0)[0], "back");
}

function backgroundTurn() {
  b_ctx.save();

  b_ctx.beginPath();

  b_ctx.translate(650 / 2, 650 / 2);
  degree = degree + 0.1;
  b_ctx.rotate((degree * Math.PI) / 180);
  if (degree >= 360) {
    degree = 0;
  }
  b_ctx.translate(-650 / 2, -650 / 2);

  backgroundDraw();

  b_ctx.restore();
}

function animationUpdate() {
  b_ctx.clearRect(0, 0, b_size_, b_size_);
  backgroundTurn();
  window.requestAnimationFrame(animationUpdate);
}
