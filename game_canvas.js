/*
Hit and Blow ver0.0.1
Copyright © naru2001, nkgw-marronnier 2021
GitHub: https://github.com/naru2001
GitHub: https://github.com/nkgw-marronnier

game_canvas.js
Copyright © nkgw-marronnier 2021
GitHub: https://github.com/nkgw-marronnier
*/

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

  // 共有ボタン
  draw_roundRect(520, 510, 80, 80, 15, "#00bfff", "white", "game");
  draw_filltext("共有", "28px gothic", "white", 532, 561, "game");

  // 音量設定ボタン
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
  } else {
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
  }
}

// 横線描画関数
function draw_line(start_x, start_y, stop_x, stop_y, width, s_style, canvas_n) {
  if (canvas_n == "back") {
    b_ctx.strokStyle = s_style;
    b_ctx.lineWidth = width;
    b_ctx.beginPath();
    b_ctx.moveTo(start_x, start_y);
    b_ctx.lineTo(stop_x, stop_y);
    b_ctx.closePath();
    b_ctx.stroke();
  } else {
    ctx.strokStyle = s_style;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(stop_x, stop_y);
    ctx.closePath();
    ctx.stroke();
  }
}

// 塗りつぶし文字描画関数
function draw_filltext(word, fontstyle, fillstyle, x, y, canvas_n) {
  if (canvas_n == "back") {
    b_ctx.fillStyle = fillstyle;
    b_ctx.font = fontstyle;
    b_ctx.fillText(word, x, y);
  } else {
    ctx.fillStyle = fillstyle;
    ctx.font = fontstyle;
    ctx.fillText(word, x, y);
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

  load_logo();
  startCanvas();
  animationUpdate();
};
