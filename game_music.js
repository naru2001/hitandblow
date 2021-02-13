function upVolume() {
    bgm1.volume = Math.min(1.0, bgm1.volume + 0.1);
    bgm2.volume = Math.min(1.0, bgm2.volume + 0.1);
    console.log(bgm1.volume);
}

function downVolume() {
    bgm1.volume = Math.max(0.0, bgm1.volume - 0.1);
    bgm2.volume = Math.max(0.0, bgm2.volume - 0.1);
    console.log(bgm1.volume);

}

window.addEventListener("load", function () {
    bgm1 = document.querySelector("#gamemusic1");
    bgm2 = document.querySelector("#gamemusic2");
    bgm1.volume = 0.5;
    bgm2.volume = 0.5;
})
