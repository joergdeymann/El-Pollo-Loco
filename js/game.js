let canvas; 
let world; 
let sound;


function removeStartscreen() {
    document.getElementById("startscreen").classList.add("d-none");
}

function showStartscreen() {
    document.getElementById("startscreen").classList.remove("d-none");
}

function initGame() {
    console.trace("init Game");
    removeStartscreen();
    initLevel1();
    canvas = document.getElementsByTagName("canvas")[0];
    key = new Keyboard();
    world = new World(canvas,key);
    world.chooseLevel(level1);
    world.level.world=world;
    world.debug=true;
}

function init() {
    sound = new Sound();
}


function toggleFullscreen() {

}

class Sound {
    constructor() {
        this.backgroundAudio=new Audio('../assets/sound/background01.mp3');
        this.backgroundAudio.pause();
        this.backgroundAudio.volume=0.2;
    } 

    toggleBackgroundMusic() {
        if (this.backgroundAudio.paused) {
            this.backgroundAudio.play();
        } else {
            this.backgroundAudio.pause();
        }
    }

    // function XisAudioPlaying(audio) {
    //     return !audio.paused && !audio.ended && audio.currentTime > 0;
    // }
        
}