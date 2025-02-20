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
    setScreenSizeGame();
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


function toggleFullscreenMenu() {
    fullscreen=document.getElementById("img-fullscreen");
    fullscreen.classList.toggle("off");
    menu=document.getElementById("intro");
    menu.classList.toggle("full");
    return;
}

function setScreenSizeGame() {
    fullscreen=document.getElementById("img-fullscreen");
    if (fullscreen.classList.contains("off")) {
        setGameScreenStandart();
    } else {
        setGameScreenFullsize();
    }

    if (!document.fullscreenElement) {
    }

}

function setGameScreenFullSize() {
    if (document.fullscreenElement) return;
    canvas=document.getElementsByTagName("canvas")[0];
    
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {  // Firefox
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { // Internet Explorer
        canvas.msRequestFullscreen();
    }
} 

function setGameScreenStandart() {
    if (!document.fullscreenElement) return;
    canvas=document.getElementsByTagName("canvas")[0];
    
    // Fullscreen verlassen
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // Internet Explorer
        document.msExitFullscreen();
    }
}



function resizeCanvas() {
    const canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


class Sound {
    constructor() {
        this.backgroundAudio=new Audio('../assets/sound/background01.mp3');
        this.backgroundAudio.loop=true;       
        this.backgroundAudio.pause();
        this.backgroundAudio.volume=0.2;
        this.element={
            ls: document.getElementById("img-ls")
        }
    } 
    
    toggleBackgroundMusic() {
        this.element.ls.classList.toggle("off");
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