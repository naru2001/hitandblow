function upVolume() {
    bgm1.volume = Math.min(1.0, bgm1.volume + 0.1);
    bgm2.volume = Math.min(1.0, bgm2.volume + 0.1);
    bgm3.volume = Math.min(1.0, bgm3.volume + 0.1);
    bgm4.volume = Math.min(1.0, bgm4.volume + 0.1);
    bgm5.volume = Math.min(1.0, bgm5.volume + 0.1);
    sound1.volume = Math.min(1.0, sound1.volume + 0.1);
    sound2.volume = Math.min(1.0, sound2.volume + 0.1);
    sound3.volume = Math.min(1.0, sound3.volume + 0.1);
    sound4.volume = Math.min(1.0, sound4.volume + 0.1);
    sound3.currentTime = 0;
    sound3.play();
    console.log(bgm1.volume);
}

function downVolume() {
    bgm1.volume = Math.max(0.0, bgm1.volume - 0.1);
    bgm2.volume = Math.max(0.0, bgm2.volume - 0.1);
    bgm3.volume = Math.max(0.0, bgm3.volume - 0.1);
    bgm4.volume = Math.max(0.0, bgm4.volume - 0.1);
    bgm5.volume = Math.max(0.0, bgm5.volume - 0.1);
    sound1.volume = Math.max(0.0, sound1.volume - 0.1);
    sound2.volume = Math.max(0.0, sound2.volume - 0.1);
    sound3.volume = Math.max(0.0, sound3.volume - 0.1);
    sound4.volume = Math.max(0.0, sound4.volume - 0.1);
    sound3.currentTime = 0;
    sound3.play();
    console.log(bgm1.volume);
}

window.addEventListener("load", function () {
    bgm1 = document.querySelector("#gamemusic1");
    bgm2 = document.querySelector("#gamemusic2");
    bgm3 = document.querySelector("#gamemusic3");
    bgm4 = document.querySelector("#gamemusic4");
    bgm5 = document.querySelector("#gamemusic5");
    sound1 = document.querySelector("#gamesound1");
    sound2 = document.querySelector("#gamesound2");
    sound3 = document.querySelector("#gamesound3");
    sound4 = document.querySelector("#gamesound4");
    bgm1.volume = 0.5;
    bgm2.volume = 0.5;
    bgm3.volume = 0.5;
    bgm4.volume = 0.5;
    bgm5.volume = 0.5;
    sound1.volume = 0.5;
    sound2.volume = 0.5;
    sound3.volume = 0.5;
    sound4.volume = 0.5;
})
