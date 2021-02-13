/*
Hit and Blow ver0.0.1
Copyright © naru2001, nkgw-marronnier 2021
GitHub: https://github.com/naru2001
GitHub: https://github.com/nkgw-marronnier

game_canvas.js
Copyright © nkgw-marronnier 2021
GitHub: https://github.com/nkgw-marronnier
*/

//var number = [];
var gamemode = 3;
var ansarray = [];
var flag_d = 0; //0->game, 1->result
var bgm1;
var bgm2;
var time_s;

// DOM要素を返す
function $(id) {
  return document.getElementById(id);
}

// 画像読み込み関数
function loadImage(fname, onload) {
  var image = new Image();
  image.src = fname;
  image.onload = onload;
  return image;
}

// ロゴ画像読み込み
function load_logo() {
  // 題名
  var logo_src = "menu_logo.png";
  logo_image = loadImage(logo_src);
  logo_image.onload = function () {
    ctx.drawImage(logo_image, 0, 0, 600, 200);
  };
}

// ゲーム開始画面描画
function startCanvas() {
  // 説明文
  draw_filltext(
    "遊ぶゲームモードを選択してください.",
    "30px gothic",
    "black",
    60,
    200,
    "game"
  );

  // 3桁選択ボタン
  draw_roundRect(50, 250, 150, 200, 15, "orange", "white", "game");
  draw_filltext("3", "130px gothic", "white", 55, 370, "game");
  draw_filltext("桁", "55px gothic", "white", 135, 370, "game");
  draw_filltext("制限:120秒", "25px gothic", "white", 60, 430, "game");
  draw_line(60, 395, 190, 395, 4, "white", "game");

  // 4桁選択ボタン
  draw_roundRect(250, 250, 150, 200, 15, "red", "white", "game");
  draw_filltext("4", "130px gothic", "white", 255, 370, "game");
  draw_filltext("桁", "55px gothic", "white", 335, 370, "game");
  draw_filltext("制限:120秒", "25px gothic", "white", 260, 430, "game");
  draw_line(260, 395, 390, 395, 4, "white", "game");

  // 5桁選択ボタン
  draw_roundRect(450, 250, 150, 200, 15, "purple", "white", "game");
  draw_filltext("5", "130px gothic", "white", 455, 370, "game");
  draw_filltext("桁", "55px gothic", "white", 535, 370, "game");
  draw_filltext("制限:120秒", "25px gothic", "white", 460, 430, "game");
  draw_line(460, 395, 590, 395, 4, "white", "game");

  // ルール確認ボタン
  draw_roundRect(50, 510, 200, 80, 15, "green", "white", "game");
  draw_filltext("ルール確認", "35px gothic", "white", 60, 565, "game");

  // ランキング閲覧ボタン
  draw_roundRect(280, 510, 200, 80, 15, "brown", "white", "game");
  draw_filltext("ランキング", "35px gothic", "white", 290, 565, "game");

  // 音量設定ボタン
  draw_filltext("volume", "26px gothic", "black", 510, 535, "game");
  draw_roundRect(505, 543, 50, 40, 15, "#00bfff", "white", "game");
  draw_filltext("+1", "26px gothic", "black", 510, 570, "game");
  draw_roundRect(560, 543, 50, 40, 15, "#00bfff", "white", "game");
  draw_filltext("-1", "26px gothic", "black", 572, 570, "game");

  // 著作権表記
  draw_filltext(
    "Copyright © naru2001, nkgw-marronnier 2021 All Rights Reserved.",
    "13px gothic",
    "black",
    110,
    625,
    "game"
  );
}

function gameplayCanvas(num, ans_) {
  // 描画初期化
  ctx.clearRect(0, 0, 650, 650);
  // ゲームモード判定用
  gamemode = num;
  ansarray = ans_;

  // 選択した数字の表示板描画
  for (var i = 0; i < gamemode; i++) {
    if (gamemode == 3) {
      draw_roundRect(50 + 200 * i, 50, 130, 160, 15, "orange", "white", "game");
    } else if (gamemode == 4) {
      draw_roundRect(35 + 150 * i, 50, 130, 160, 15, "red", "white", "game");
    } else if (gamemode == 5) {
      draw_roundRect(30 + 120 * i, 60, 110, 140, 15, "purple", "white", "game");
    }
  }

  if (gamemode == 3 || gamemode == 4) {
    bgm1.play();
  } else {
    bgm2.play();
  }

  // テンキー描画
  for (var i = 0; i < 9; i++) {
    if (i < 3) {
      draw_roundRect(300 + 100 * i, 260, 80, 80, 15, "gray", "white", "game");
      draw_filltext(i + 1, "80px gothic", "white", 315 + 100 * i, 330, "game");
    } else if (i < 6) {
      draw_roundRect(
        300 + 100 * (i - 3),
        350,
        80,
        80,
        15,
        "gray",
        "white",
        "game"
      );
      draw_filltext(
        i + 1,
        "80px gothic",
        "white",
        315 + 100 * (i - 3),
        420,
        "game"
      );
    } else {
      draw_roundRect(
        300 + 100 * (i - 6),
        440,
        80,
        80,
        15,
        "gray",
        "white",
        "game"
      );
      draw_filltext(
        i + 1,
        "80px gothic",
        "white",
        315 + 100 * (i - 6),
        510,
        "game"
      );
    }
  }
  draw_roundRect(300, 530, 280, 80, 15, "gray", "white", "game");
  draw_filltext(0, "80px gothic", "white", 415, 600, "game");

  // 結果表示板描画
  draw_roundRect(
    50,
    260,
    200,
    260,
    15,
    "rgb(182, 255, 221, 0.5)",
    "white",
    "game"
  );

  select_num();
}

function select_num(select_) {
  // 描画初期化
  n_ctx.clearRect(0, 0, 650, 650);

  // 選択した数字の配列を取得
  var select = select_;
  if (select == null) {
    select = [];
  }
  var select_n = select.length;
  for (var i = 0; i < gamemode; i++) {
    if (gamemode == 3 && select_n > 0) {
      draw_filltext(
        select[i],
        "130px gothic",
        "white",
        75 + 200 * i,
        180,
        "gamenum"
      );
      select_n--;
    } else if (gamemode == 4 && select_n > 0) {
      draw_filltext(
        select[i],
        "130px gothic",
        "white",
        60 + 150 * i,
        180,
        "gamenum"
      );
      select_n--;
    } else if (gamemode == 5 && select_n > 0) {
      draw_filltext(
        select[i],
        "130px gothic",
        "white",
        45 + 120 * i,
        180,
        "gamenum"
      );
      select_n--;
    }
  }
  timeUpdate();
}

function hitblow(hit_, blow_) {
  h_ctx.clearRect(0, 0, 650, 650);
  var hit = hit_;
  var blow = blow_;

  draw_filltext(hit, "120px gothic", "red", 60, 375, "gamehitblow");
  draw_filltext("HIT", "60px gothic", "black", 130, 375, "gamehitblow");
  draw_line(60, 400, 240, 400, 4, "rgb(0,0,0,0.4)", "gamehitblow");
  draw_filltext(blow, "100px gothic", "red", 60, 495, "gamehitblow");
  draw_filltext("BLOW", "40px gothic", "black", 120, 495, "gamehitblow");

  if (hit == 3 && gamemode == 3) {
    flag_d = 1;
    bgm1.pause();
    resultCanvas("success");
  } else if (hit == 4 && gamemode == 4) {
    flag_d = 1;
    bgm1.pause();
    resultCanvas("success");
  } else if (hit == 5 && gamemode == 5) {
    flag_d = 1;
    bgm2.pause();
    resultCanvas("success");
  }
}

function gametimedraw() {
  var time_count = countdown();
  draw_filltext("残り:", "30px gothic", "red", 80, 600, "gametime");
  draw_filltext(
    Math.floor(time_count),
    "60px gothic",
    "red",
    170,
    600,
    "gametime"
  );
  draw_filltext("秒", "30px gothic", "red", 240, 600, "gametime");
  draw_line(
    75,
    630,
    75 + 4 * (120 - time_count),
    630,
    12,
    "rgb(0,200,30,0.6)",
    "gametime"
  );

  if (time_count < 0) {
    flag_d = 1;
    if (gamemode == 3 || gamemode == 4) {
      bgm1.pause();
    } else {
      bgm2.pause();
    }

    resultCanvas("timeup");
  }
  time_s = time_count;
  //console.log(time_count);
}

function timeUpdate() {
  if (flag_d != 1) {
    t_ctx.clearRect(0, 0, 650, 650);
    gametimedraw();
    window.requestAnimationFrame(timeUpdate);
  }
}

function resultCanvas(result_) {
  var result = result_;
  t_ctx.clearRect(0, 0, 650, 650);
  ctx.clearRect(0, 0, 650, 650);
  n_ctx.clearRect(0, 0, 650, 650);
  h_ctx.clearRect(0, 0, 650, 650);

  if (result == "timeup") {
    draw_filltext("TIME UP!!", "100px gothic", "red", 75, 150, "game");
    draw_filltext("ANSWER:", "60px gothic", "black", 180, 250, "game");

    for (var i = 0; i < gamemode; i++) {
      if (gamemode == 3) {
        draw_roundRect(
          50 + 200 * i,
          290,
          130,
          160,
          15,
          "orange",
          "white",
          "game"
        );
      } else if (gamemode == 4) {
        draw_roundRect(35 + 150 * i, 290, 130, 160, 15, "red", "white", "game");
      } else if (gamemode == 5) {
        draw_roundRect(
          30 + 120 * i,
          290,
          110,
          160,
          15,
          "purple",
          "white",
          "game"
        );
      }
    }
    var ansarray_n = ansarray.length;
    for (var i = 0; i < gamemode; i++) {
      if (gamemode == 3 && ansarray_n > 0) {
        draw_filltext(
          ansarray[i],
          "130px gothic",
          "white",
          75 + 200 * i,
          420,
          "gamenum"
        );
        ansarray_n--;
      } else if (gamemode == 4 && ansarray_n > 0) {
        draw_filltext(
          ansarray[i],
          "130px gothic",
          "white",
          60 + 150 * i,
          420,
          "gamenum"
        );
        ansarray_n--;
      } else if (gamemode == 5 && ansarray_n > 0) {
        draw_filltext(
          ansarray[i],
          "130px gothic",
          "white",
          45 + 120 * i,
          420,
          "gamenum"
        );
        ansarray_n--;
      }
    }
    draw_roundRect(
      175,
      500,
      300,
      100,
      15,
      "rgb(100, 200, 255, 0.8)",
      "white",
      "game"
    );
    draw_filltext("TOPへ戻る", "50px gothic", "white", 200, 570, "game");
  } else if (result == "success") {
    draw_filltext("CLEAR!!", "100px gothic", "red", 120, 150, "game");
    draw_filltext(
      "TIME:" + (120 - time_s).toFixed(3) + "秒",
      "60px gothic",
      "black",
      320,
      250,
      "gametime"
    );

    for (var i = 0; i < gamemode; i++) {
      if (gamemode == 3) {
        draw_roundRect(
          50 + 200 * i,
          290,
          130,
          160,
          15,
          "orange",
          "white",
          "game"
        );
      } else if (gamemode == 4) {
        draw_roundRect(35 + 150 * i, 290, 130, 160, 15, "red", "white", "game");
      } else if (gamemode == 5) {
        draw_roundRect(
          30 + 120 * i,
          290,
          110,
          160,
          15,
          "purple",
          "white",
          "game"
        );
      }
    }
    var ansarray_n = ansarray.length;
    for (var i = 0; i < gamemode; i++) {
      if (gamemode == 3 && ansarray_n > 0) {
        draw_filltext(
          ansarray[i],
          "130px gothic",
          "white",
          75 + 200 * i,
          420,
          "gamenum"
        );
        ansarray_n--;
      } else if (gamemode == 4 && ansarray_n > 0) {
        draw_filltext(
          ansarray[i],
          "130px gothic",
          "white",
          60 + 150 * i,
          420,
          "gamenum"
        );
        ansarray_n--;
      } else if (gamemode == 5 && ansarray_n > 0) {
        draw_filltext(
          ansarray[i],
          "130px gothic",
          "white",
          45 + 120 * i,
          420,
          "gamenum"
        );
        ansarray_n--;
      }
    }
    draw_roundRect(
      75,
      500,
      300,
      100,
      15,
      "rgb(100, 200, 255, 0.8)",
      "white",
      "game"
    );
    draw_roundRect(
      420,
      500,
      130,
      100,
      15,
      "rgb(100, 200, 255, 0.8)",
      "white",
      "game"
    );

    draw_filltext("TOPへ戻る", "50px gothic", "white", 100, 570, "game");
    draw_filltext("共有", "50px gothic", "white", 435, 570, "game");
  }
}

// 角丸四角形作成関数
/*
okikuさんのブログを参考
http://blog.chatlune.jp/2018/02/06/canvas-rounded-rectangle/
*/
function draw_roundRect(
  x,
  y,
  width,
  height,
  radius,
  f_color,
  s_color,
  canvas_n
) {
  if (canvas_n == "back") {
    b_ctx.beginPath();
    b_ctx.lineWidth = 5;
    b_ctx.strokeStyle = s_color;
    b_ctx.fillStyle = f_color;
    b_ctx.moveTo(x, y + radius);
    b_ctx.arc(
      x + radius,
      y + height - radius,
      radius,
      Math.PI,
      Math.PI * (1 / 2),
      true
    );
    b_ctx.arc(
      x + width - radius,
      y + height - radius,
      radius,
      Math.PI * (1 / 2),
      0,
      1
    );
    b_ctx.arc(x + width - radius, y + radius, radius, 0, Math.PI * (3 / 2), 1);
    b_ctx.arc(x + radius, y + radius, radius, Math.PI * (3 / 2), Math.PI, 1);
    b_ctx.closePath();
    b_ctx.stroke();
    b_ctx.fill();
  } else if (canvas_n == "game") {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = s_color;
    ctx.fillStyle = f_color;
    ctx.moveTo(x, y + radius);
    ctx.arc(
      x + radius,
      y + height - radius,
      radius,
      Math.PI,
      Math.PI * (1 / 2),
      true
    );
    ctx.arc(
      x + width - radius,
      y + height - radius,
      radius,
      Math.PI * (1 / 2),
      0,
      1
    );
    ctx.arc(x + width - radius, y + radius, radius, 0, Math.PI * (3 / 2), 1);
    ctx.arc(x + radius, y + radius, radius, Math.PI * (3 / 2), Math.PI, 1);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  } else if (canvas_n == "gamenum") {
    n_ctx.beginPath();
    n_ctx.lineWidth = 5;
    n_ctx.strokeStyle = s_color;
    n_ctx.fillStyle = f_color;
    n_ctx.moveTo(x, y + radius);
    n_ctx.arc(
      x + radius,
      y + height - radius,
      radius,
      Math.PI,
      Math.PI * (1 / 2),
      true
    );
    n_ctx.arc(
      x + width - radius,
      y + height - radius,
      radius,
      Math.PI * (1 / 2),
      0,
      1
    );
    n_ctx.arc(x + width - radius, y + radius, radius, 0, Math.PI * (3 / 2), 1);
    n_ctx.arc(x + radius, y + radius, radius, Math.PI * (3 / 2), Math.PI, 1);
    n_ctx.closePath();
    n_ctx.stroke();
    n_ctx.fill();
  } else {
    h_ctx.beginPath();
    h_ctx.lineWidth = 5;
    h_ctx.strokeStyle = s_color;
    h_ctx.fillStyle = f_color;
    h_ctx.moveTo(x, y + radius);
    h_ctx.arc(
      x + radius,
      y + height - radius,
      radius,
      Math.PI,
      Math.PI * (1 / 2),
      true
    );
    h_ctx.arc(
      x + width - radius,
      y + height - radius,
      radius,
      Math.PI * (1 / 2),
      0,
      1
    );
    h_ctx.arc(x + width - radius, y + radius, radius, 0, Math.PI * (3 / 2), 1);
    h_ctx.arc(x + radius, y + radius, radius, Math.PI * (3 / 2), Math.PI, 1);
    h_ctx.closePath();
    h_ctx.stroke();
    h_ctx.fill();
  }
}

// 直線描画関数
function draw_line(start_x, start_y, stop_x, stop_y, width, s_style, canvas_n) {
  if (canvas_n == "back") {
    b_ctx.strokeStyle = s_style;
    b_ctx.lineWidth = width;
    b_ctx.beginPath();
    b_ctx.moveTo(start_x, start_y);
    b_ctx.lineTo(stop_x, stop_y);
    b_ctx.closePath();
    b_ctx.stroke();
  } else if (canvas_n == "game") {
    ctx.strokeStyle = s_style;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(stop_x, stop_y);
    ctx.closePath();
    ctx.stroke();
  } else if (canvas_n == "gamenum") {
    n_ctx.strokeStyle = s_style;
    n_ctx.lineWidth = width;
    n_ctx.beginPath();
    n_ctx.moveTo(start_x, start_y);
    n_ctx.lineTo(stop_x, stop_y);
    n_ctx.closePath();
    n_ctx.stroke();
  } else if (canvas_n == "gamehitblow") {
    h_ctx.strokeStyle = s_style;
    h_ctx.lineWidth = width;
    h_ctx.beginPath();
    h_ctx.moveTo(start_x, start_y);
    h_ctx.lineTo(stop_x, stop_y);
    h_ctx.closePath();
    h_ctx.stroke();
  } else {
    t_ctx.strokeStyle = s_style;
    t_ctx.lineWidth = width;
    t_ctx.beginPath();
    t_ctx.moveTo(start_x, start_y);
    t_ctx.lineTo(stop_x, stop_y);
    t_ctx.closePath();
    t_ctx.stroke();
  }
}

// 塗りつぶし文字描画関数
function draw_filltext(word, fontstyle, fillstyle, x, y, canvas_n) {
  if (canvas_n == "back") {
    b_ctx.fillStyle = fillstyle;
    b_ctx.font = fontstyle;
    b_ctx.fillText(word, x, y);
  } else if (canvas_n == "game") {
    ctx.fillStyle = fillstyle;
    ctx.font = fontstyle;
    ctx.fillText(word, x, y);
  } else if (canvas_n == "gamenum") {
    n_ctx.fillStyle = fillstyle;
    n_ctx.font = fontstyle;
    n_ctx.fillText(word, x, y);
  } else if (canvas_n == "gamehitblow") {
    h_ctx.fillStyle = fillstyle;
    h_ctx.font = fontstyle;
    h_ctx.fillText(word, x, y);
  } else {
    t_ctx.textAlign = "center";
    t_ctx.fillStyle = fillstyle;
    t_ctx.font = fontstyle;
    t_ctx.fillText(word, x, y);
  }
}

// 初期読み込み
window.onload = function () {
  var canvas = $("gameCanvas");
  ctx = canvas.getContext("2d");
  /*
  Mozillaより引用
  © 2005-2021 Mozilla and individual contributors. Content is available under these licenses.
  https://developer.mozilla.org/ja/docs/Web/API/Window/devicePixelRatio
  */
  var size = 650;
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";

  var scale = window.devicePixelRatio;
  canvas.width = size * scale;
  canvas.height = size * scale;

  ctx.scale(scale, scale);

  var b_size = 630;

  var b_canvas = $("backgroundCanvas");
  b_ctx = b_canvas.getContext("2d");

  b_canvas.style.width = b_size + "px";
  b_canvas.style.height = b_size + "px";

  b_canvas.width = b_size * scale;
  b_canvas.height = b_size * scale;

  b_ctx.scale(scale, scale);

  var n_canvas = $("gamenumberCanvas");
  n_ctx = n_canvas.getContext("2d");

  n_canvas.style.width = size + "px";
  n_canvas.style.height = size + "px";

  n_canvas.width = size * scale;
  n_canvas.height = size * scale;

  n_ctx.scale(scale, scale);

  var h_canvas = $("gamehitblowCanvas");
  h_ctx = h_canvas.getContext("2d");

  h_canvas.style.width = size + "px";
  h_canvas.style.height = size + "px";

  h_canvas.width = size * scale;
  h_canvas.height = size * scale;

  h_ctx.scale(scale, scale);

  var t_canvas = $("gametimeCanvas");
  t_ctx = t_canvas.getContext("2d");

  t_canvas.style.width = size + "px";
  t_canvas.style.height = size + "px";

  t_canvas.width = size * scale;
  t_canvas.height = size * scale;

  t_ctx.scale(scale, scale);

  bgm1 = document.querySelector("#gamemusic1");
  bgm2 = document.querySelector("#gamemusic2");
  load_logo();
  startCanvas();
  animationUpdate();
  //resultCanvas("timeup");
};
