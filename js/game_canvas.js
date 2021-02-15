/*
Hit and Blow ver0.0.1
Copyright © naru2001, nkgw-marronnier 2021
GitHub: https://github.com/naru2001
GitHub: https://github.com/nkgw-marronnier

game_canvas.js
Copyright © nkgw-marronnier 2021
GitHub: https://github.com/nkgw-marronnier
*/

var gamemode = 3;
var ansarray = [];
var flag_d; //0->game, 1->result
var bgm1;
var bgm2;
var bgm3;
var bgm4;
var bgm5;
var sound2;
var sound3;
var sound5;
var sound6;
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
	var logo_src = "img/menu_logo.png";
	logo_image = loadImage(logo_src);
	logo_image.onload = function () {
		ctx.drawImage(logo_image, 0, 0, 600, 200);
	};
}

function canvas_reset(x, y, dx, dy) {
	ctx.clearRect(x, y, dx, dy);
	n_ctx.clearRect(x, y, dx, dy);
	h_ctx.clearRect(x, y, dx, dy);
	t_ctx.clearRect(x, y, dx, dy);
}

function rule_del() {
	r_ctx.clearRect(0, 0, 650, 650);
}

function get_time() {
	return (120 - time_s).toFixed(3);
}
// ゲーム開始画面描画
function startCanvas() {
	s_ctx.clearRect(0, 0, 650, 650);

	load_logo();

	if (bgm3.paused == false) {
		bgm3.pause();
	} else if (bgm5.paused == false) {
		bgm5.pause();
	}

	bgm4.currentTime = 0;
	bgm4.play();

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
	draw_roundRect(50, 250, 150, 200, 15, "rgb(255,128,0,0.8)", "white", "game");
	draw_filltext("3", "130px gothic", "white", 55, 370, "game");
	draw_filltext("桁", "55px gothic", "white", 135, 370, "game");
	draw_filltext("制限:120秒", "25px gothic", "white", 60, 430, "game");
	draw_line(60, 395, 190, 395, 4, "white", "game");

	// 4桁選択ボタン
	draw_roundRect(250, 250, 150, 200, 15, "rgb(255,0,0,0.8)", "white", "game");
	draw_filltext("4", "130px gothic", "white", 255, 370, "game");
	draw_filltext("桁", "55px gothic", "white", 335, 370, "game");
	draw_filltext("制限:120秒", "25px gothic", "white", 260, 430, "game");
	draw_line(260, 395, 390, 395, 4, "white", "game");

	// 5桁選択ボタン
	draw_roundRect(450, 250, 150, 200, 15, "rgb(128,0,128,0.8)", "white", "game");
	draw_filltext("5", "130px gothic", "white", 455, 370, "game");
	draw_filltext("桁", "55px gothic", "white", 535, 370, "game");
	draw_filltext("制限:120秒", "25px gothic", "white", 460, 430, "game");
	draw_line(460, 395, 590, 395, 4, "white", "game");

	// ルール確認ボタン
	draw_roundRect(50, 510, 200, 80, 15, "rgb(0,128,0,0.8)", "white", "game");
	draw_filltext("ルール確認", "35px gothic", "white", 60, 565, "game");

	// ランキング閲覧ボタン
	draw_roundRect(280, 510, 200, 80, 15, "rgb(128,0,0,0.8)", "white", "game");
	draw_filltext("ランキング", "35px gothic", "white", 290, 565, "game");

	// 音量設定ボタン
	draw_filltext("volume", "26px gothic", "black", 510, 535, "game");
	draw_roundRect(505, 543, 50, 40, 15, "rgb(0,220,255,0.8)", "white", "game");
	draw_filltext("+", "26px gothic", "white", 520, 570, "game");
	draw_roundRect(560, 543, 50, 40, 15, "rgb(0,220,255,0.8)", "white", "game");
	draw_filltext("-", "50px gothic", "white", 573, 578, "game");

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

	bgm4.pause();
	flag_d = 0;

	// 選択した数字の表示板描画
	for (var i = 0; i < gamemode; i++) {
		if (gamemode == 3) {
			draw_roundRect(50 + 200 * i, 50, 130, 160, 15, "rgb(255,128,0,0.8)", "white", "game");
		} else if (gamemode == 4) {
			draw_roundRect(35 + 150 * i, 50, 130, 160, 15, "rgb(255,0,0,0.8)", "white", "game");
		} else if (gamemode == 5) {
			draw_roundRect(30 + 120 * i, 60, 110, 140, 15, "rgb(128,0,128,0.8)", "white", "game");
		}
	}

	if (gamemode == 3 || gamemode == 4) {
		bgm1.currentTime = 0;
		bgm1.play();
	} else {
		bgm2.currentTime = 0;
		bgm2.play();
	}

	// テンキー描画
	for (var i = 0; i < 9; i++) {
		if (i < 3) {
			draw_roundRect(300 + 100 * i, 260, 80, 80, 15, "rgb(128,128,128,0.8)", "white", "game");
			draw_filltext(i + 1, "80px gothic", "white", 315 + 100 * i, 330, "game");
		} else if (i < 6) {
			draw_roundRect(
				300 + 100 * (i - 3),
				350,
				80,
				80,
				15,
				"rgb(128,128,128,0.8)",
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
				"rgb(128,128,128,0.8)",
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
	draw_roundRect(300, 530, 280, 80, 15, "rgb(128,128,128,0.8)", "white", "game");
	draw_filltext(0, "80px gothic", "white", 415, 600, "game");

	draw_roundRect(595, 543, 35, 35, 15, "rgb(0,230,255,0.8)", "white", "game");
	draw_filltext("+", "26px gothic", "white", 602, 569, "game");
	draw_roundRect(595, 583, 35, 35, 15, "rgb(0,230,255,0.8)", "white", "game");
	draw_filltext("-", "30px gothic", "white", 606, 611, "game");
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

function ruleCanvas() {
	draw_roundRect(50, 80, 550, 530, 10, "white", "black", "gameruleCanvas");
	draw_roundRect(570, 50, 60, 60, 31, "red", "black", "gameruleCanvas");
	draw_filltext("コンピュータが決めた数字を", "32px gothic", "black", 100, 150, "gameruleCanvas");
	draw_filltext("予想するゲームです。", "32px gothic", "black", 100, 190, "gameruleCanvas");
	draw_filltext("HIT", "32px gothic", "black", 100, 240, "gameruleCanvas");
	draw_filltext("同じ数字が同じ場所にある", "32px gothic", "black", 130, 280, "gameruleCanvas");
	draw_filltext("BLOW", "32px gothic", "black", 100, 320, "gameruleCanvas");
	draw_filltext("同じ数字が違う場所にある", "32px gothic", "black", 130, 360, "gameruleCanvas");
	var logo_src = "img/playing.png";
	logo_image = loadImage(logo_src);
	logo_image.onload = function () {
		r_ctx.drawImage(logo_image, 340, 390, 210, 200);
	};
	draw_line(615, 65, 585, 95, 4, "black", "gameruleCanvas");
	draw_line(585, 65, 615, 95, 4, "black", "gameruleCanvas");
}

function hitblow(hit_, blow_) {
	h_ctx.clearRect(0, 0, 650, 650);
	var hit = hit_;
	var blow = blow_;

	if (hit == 0 && blow == 0) {
		sound6.currentTime = 0;
		sound6.play();
	} else if (hit == gamemode) {
		sound5.currentTime = 0;
		sound5.play();
	} else {
		sound2.currentTime = 0;
		sound2.play();
	}

	draw_filltext(hit, "120px gothic", "red", 60, 375, "gamehitblow");
	draw_filltext("HIT", "60px gothic", "black", 130, 375, "gamehitblow");
	draw_line(60, 400, 240, 400, 4, "rgb(0,0,0,0.4)", "gamehitblow");
	draw_filltext(blow, "100px gothic", "red", 60, 495, "gamehitblow");
	draw_filltext("BLOW", "40px gothic", "black", 120, 495, "gamehitblow");

	if (hit == 3 && gamemode == 3) {
		flag_d = 1;
		bgm1.pause();
		flag_ch(2);
		resultCanvas("success");
	} else if (hit == 4 && gamemode == 4) {
		flag_d = 1;
		bgm1.pause();
		flag_ch(2);
		resultCanvas("success");
	} else if (hit == 5 && gamemode == 5) {
		flag_d = 1;
		bgm2.pause();
		flag_ch(2);
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
		75 + 4 * 120,
		630,
		17,
		"rgb(255,255,255,0.8)",
		"gametime"
	);
	if (time_count > 60) {
		draw_line(
			75,
			630,
			75 + 4 * (120 - time_count),
			630,
			12,
			"rgb(0,200,30,0.6)",
			"gametime"
		);
	} else if (time_count > 20) {
		draw_line(
			75,
			630,
			75 + 4 * (120 - time_count),
			630,
			12,
			"rgb(255,128,0,0.6)",
			"gametime"
		);
	} else {
		draw_line(
			75,
			630,
			75 + 4 * (120 - time_count),
			630,
			12,
			"rgb(255,0,0,0.6)",
			"gametime"
		);
	}

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
		flag_ch(3);
		draw_filltext("TIME UP!!", "100px gothic", "red", 75, 150, "game");
		draw_filltext("ANSWER:", "60px gothic", "black", 180, 250, "game");

		bgm5.currentTime = 0;
		bgm5.play();

		for (var i = 0; i < gamemode; i++) {
			if (gamemode == 3) {
				draw_roundRect(
					50 + 200 * i,
					290,
					130,
					160,
					15,
					"rgb(255,128,0,0.8)",
					"white",
					"game"
				);
			} else if (gamemode == 4) {
				draw_roundRect(35 + 150 * i, 290, 130, 160, 15, "rgb(255,0,0,0.8)", "white", "game");
			} else if (gamemode == 5) {
				draw_roundRect(
					30 + 120 * i,
					290,
					110,
					160,
					15,
					"rgb(128,0,128,0.8)",
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
		bgm3.currentTime = 0;
		bgm3.play();
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
					"rgb(255,128,0,0.8)",
					"white",
					"game"
				);
			} else if (gamemode == 4) {
				draw_roundRect(35 + 150 * i, 290, 130, 160, 15, "rgb(255,0,0,0.8)", "white", "game");
			} else if (gamemode == 5) {
				draw_roundRect(
					30 + 120 * i,
					290,
					110,
					160,
					15,
					"rgb(128,0,128,0.8)",
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
		draw_roundRect(50, 500, 270, 100, 15, "rgb(100, 200, 255, 0.8)", "white", "game");
		draw_roundRect(350, 500, 100, 100, 15, "white", "rgb(100, 200, 255, 0.8)", "game");
		draw_roundRect(480, 500, 100, 100, 15, "white", "rgb(100, 200, 255, 0.8)", "game");
		draw_filltext("TOPへ戻る", "48px gothic", "white", 65, 570, "game");
		logo_image1 = loadImage("img/twiShare.png");
		logo_image2 = loadImage("img/trophy_gold.png");
		logo_image1.onload = function () {
			h_ctx.drawImage(logo_image1, 358, 513, 80, 70);
		};
		logo_image2.onload = function () {
			h_ctx.drawImage(logo_image2, 498, 518, 65, 65);
		};
		
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
	} else if (canvas_n == "gameruleCanvas") {
		r_ctx.beginPath();
		r_ctx.lineWidth = 5;
		r_ctx.strokeStyle = s_color;
		r_ctx.fillStyle = f_color;
		r_ctx.moveTo(x, y + radius);
		r_ctx.arc(
			x + radius,
			y + height - radius,
			radius,
			Math.PI,
			Math.PI * (1 / 2),
			true
		);
		r_ctx.arc(
			x + width - radius,
			y + height - radius,
			radius,
			Math.PI * (1 / 2),
			0,
			1
		);
		r_ctx.arc(x + width - radius, y + radius, radius, 0, Math.PI * (3 / 2), 1);
		r_ctx.arc(x + radius, y + radius, radius, Math.PI * (3 / 2), Math.PI, 1);
		r_ctx.closePath();
		r_ctx.stroke();
		r_ctx.fill();
	} else if (canvas_n == "soundselect") {
		s_ctx.beginPath();
		s_ctx.lineWidth = 5;
		s_ctx.strokeStyle = s_color;
		s_ctx.fillStyle = f_color;
		s_ctx.moveTo(x, y + radius);
		s_ctx.arc(
			x + radius,
			y + height - radius,
			radius,
			Math.PI,
			Math.PI * (1 / 2),
			true
		);
		s_ctx.arc(
			x + width - radius,
			y + height - radius,
			radius,
			Math.PI * (1 / 2),
			0,
			1
		);
		s_ctx.arc(x + width - radius, y + radius, radius, 0, Math.PI * (3 / 2), 1);
		s_ctx.arc(x + radius, y + radius, radius, Math.PI * (3 / 2), Math.PI, 1);
		s_ctx.closePath();
		s_ctx.stroke();
		s_ctx.fill();
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
	} else if (canvas_n == "gameruleCanvas") {
		r_ctx.strokeStyle = s_style;
		r_ctx.lineWidth = width;
		r_ctx.beginPath();
		r_ctx.moveTo(start_x, start_y);
		r_ctx.lineTo(stop_x, stop_y);
		r_ctx.closePath();
		r_ctx.stroke();
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
	} else if (canvas_n == "gameruleCanvas") {
		r_ctx.fillStyle = fillstyle;
		r_ctx.font = fontstyle;
		r_ctx.fillText(word, x, y);
	} else if (canvas_n == "soundselect") {
		s_ctx.fillStyle = fillstyle;
		s_ctx.font = fontstyle;
		s_ctx.fillText(word, x, y);
	} else {
		t_ctx.textAlign = "center";
		t_ctx.fillStyle = fillstyle;
		t_ctx.font = fontstyle;
		t_ctx.fillText(word, x, y);
	}
}

function draw_soundselect() {
	draw_roundRect(
		210,
		83,
		200,
		100,
		15,
		"rgb(255, 128, 0, 0.8)",
		"white",
		"soundselect"
	);

	draw_filltext("注意", "50px gothic", "white", 260, 150, "soundselect");
	draw_filltext("このゲームは音声が流れます.", "30px gothic", "black", 120, 280, "soundselect");
	draw_filltext("いずれかを選択してください.", "30px gothic", "black", 120, 330, "soundselect");

	draw_roundRect(
		80,
		400,
		200,
		100,
		15,
		"rgb(100, 200, 255, 0.8)",
		"white",
		"soundselect"
	);
	draw_roundRect(
		350,
		400,
		200,
		100,
		15,
		"rgb(100, 200, 255, 0.8)",
		"white",
		"soundselect"
	);

	draw_filltext("消音", "50px gothic", "white", 130, 470, "soundselect");
	draw_filltext("音あり", "50px gothic", "white", 375, 470, "soundselect");
	//startCanvas();
}

function draw_credit() {
	draw_roundRect(50, 80, 550, 530, 10, "white", "black", "gameruleCanvas");
	draw_roundRect(570, 50, 60, 60, 31, "red", "black", "gameruleCanvas");
	var logo_src = "img/menu_logo.png";
	logo_image = loadImage(logo_src);
	logo_image.onload = function () {
		r_ctx.drawImage(logo_image, 50, 80, 500, 150);
	};
	draw_filltext("ver 0.0.1", "20px gothic", "black", 460, 180, "gameruleCanvas");
	draw_filltext("-PROGRAM-", "35px gothic", "black", 225, 250, "gameruleCanvas");
	draw_filltext("naru2001, nkgw-marronnier", "32px gothic", "black", 100, 290, "gameruleCanvas");
	draw_filltext("-BGM/SOUND-", "35px gothic", "black", 200, 350, "gameruleCanvas");
	draw_filltext("nkgw-marronnier", "32px gothic", "black", 190, 390, "gameruleCanvas");
	draw_filltext("効果音ラボ", "32px gothic", "black", 245, 430, "gameruleCanvas");
	draw_filltext("-GitHub-", "35px gothic", "black", 245, 490, "gameruleCanvas");
	draw_filltext("https://github.com/naru2001", "25px gothic", "black", 140, 530, "gameruleCanvas");
	draw_filltext("https://github.com/nkgw-marronnier", "25px gothic", "black", 90, 570, "gameruleCanvas");
	draw_line(615, 65, 585, 95, 4, "black", "gameruleCanvas");
	draw_line(585, 65, 615, 95, 4, "black", "gameruleCanvas");
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

	var r_canvas = $("gameruleCanvas");
	r_ctx = r_canvas.getContext("2d");

	r_canvas.style.width = size + "px";
	r_canvas.style.height = size + "px";

	r_canvas.width = size * scale;
	r_canvas.height = size * scale;

	r_ctx.scale(scale, scale);

	var s_canvas = $("soundselectCanvas");
	s_ctx = s_canvas.getContext("2d");

	s_canvas.style.width = size + "px";
	s_canvas.style.height = size + "px";

	s_canvas.width = size * scale;
	s_canvas.height = size * scale;

	s_ctx.scale(scale, scale);

	bgm1 = document.querySelector("#gamemusic1");
	bgm2 = document.querySelector("#gamemusic2");
	bgm3 = document.querySelector("#gamemusic3");
	bgm4 = document.querySelector("#gamemusic4");
	bgm5 = document.querySelector("#gamemusic5");
	sound2 = document.querySelector("#gamesound2");
	sound3 = document.querySelector("#gamesound3");
	sound5 = document.querySelector("#gamesound5");
	sound6 = document.querySelector("#gamesound6");

	//load_logo();
	//startCanvas();
	draw_soundselect();
	animationUpdate();
};
