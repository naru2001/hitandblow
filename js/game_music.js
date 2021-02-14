function upVolume() {
    bgm1.volume = Math.min(1.0, bgm1.volume + 0.1);
    bgm2.volume = Math.min(1.0, bgm2.volume + 0.1);
    sound1.volume = Math.min(1.0, bgm2.volume + 0.1);
    sound2.volume = Math.min(1.0, bgm2.volume + 0.1);
    sound3.volume = Math.min(1.0, bgm2.volume + 0.1);
    sound3.currentTime = 0;
    sound3.play();
    console.log(bgm1.volume);
}

function downVolume() {
    bgm1.volume = Math.max(0.0, bgm1.volume - 0.1);
    bgm2.volume = Math.max(0.0, bgm2.volume - 0.1);
    sound1.volume = Math.max(0.0, bgm2.volume - 0.1);
    sound2.volume = Math.max(0.0, bgm2.volume - 0.1);
    sound3.volume = Math.max(0.0, bgm2.volume - 0.1);
    sound3.currentTime = 0;
    sound3.play();
    console.log(bgm1.volume);

}

window.addEventListener("load", function () {
    bgm1 = document.querySelector("#gamemusic1");
    bgm2 = document.querySelector("#gamemusic2");
    sound1 = document.querySelector("#gamesound1");
  sound2 = document.querySelector("#gamesound2");
  sound3 = document.querySelector("#gamesound3");
    bgm1.volume = 0.5;
    bgm2.volume = 0.5;
    sound1.volume = 0.5;
    sound2.volume = 0.5;
    sound3.volume = 0.5;
})
