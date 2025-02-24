let canvas; 
let world; 
let sound;


function hideStartscreen() {
    document.getElementById("startscreen").classList.add("d-none");
}

function showStartscreen() {
    document.getElementById("startscreen").classList.remove("d-none");
}

function hideGamescreen() {
    document.getElementsByTagName("canvas")[0].classList.add("d-none");
}

function showGamescreen() {
    document.getElementsByTagName("canvas")[0].classList.remove("d-none");
}

function toggleFullscreen() {
    toggleFullscreenMenu();
}

function isFullscreen() {
    let fullscreen=document.getElementById("img-fullscreen");
    return !fullscreen.classList.contains("off");
}

function setScreenSizeGame() {
    if (isFullscreen()) {
        setGameScreenFullsize();
    } else {
        setGameScreenStandart();
    }
}

function initGame() {
    console.trace("init Game");
    hideStartscreen();

    setScreenSizeGame();
    showGamescreen();
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

function requestFullscreen(canvas) {
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

function exitFullscreen() {
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

function setGameScreenFullsize() {
    if (document.fullscreenElement) return;
    canvas=document.getElementsByTagName("canvas")[0];
    canvas.classList.add("noBorderRadius");
    requestFullscreen(canvas);    
} 



function setGameScreenStandart() {
    if (!document.fullscreenElement) return;
    canvas=document.getElementsByTagName("canvas")[0];
    canvas.classList.remove("noBorderRadius");
    exitFullscreen();
    
}


function toggleFullscreenMenu() {
    fullscreen=document.getElementById("img-fullscreen");
    fullscreen.classList.toggle("off");
    menu=document.getElementById("intro");
    menu.classList.toggle("full");
    body=document.getElementsByTagName("body")[0];
    // body.classList.toggle("black");
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
    setInterval(() => listenerBorderRadius(),1000);

}

function listenerBorderRadius() {
    canvas=document.getElementsByTagName("canvas")[0];
    body=document.getElementsByTagName("body")[0];
    if (document.fullscreenElement) {
        canvas.classList.add("noBorderRadius");
        body.classList.add("black");
    
    } else {
        canvas.classList.remove("noBorderRadius");
        body.classList.remove("black");
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