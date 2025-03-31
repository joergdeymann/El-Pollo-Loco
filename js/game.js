let canvas; 
let world; 
let sound;


function isStartscreen() {
    return !document.getElementById("intro").classList.contains("d-none");
}

function hideStartscreen() {
    document.getElementById("intro").classList.add("d-none");
}

function showStartscreen() {
    document.getElementById("intro").classList.remove("d-none");
}

function hideGamescreen() {
    document.getElementsByTagName("canvas")[0].classList.add("d-none");
}

function showGamescreen() {
    document.getElementsByTagName("canvas")[0].classList.remove("d-none");
}

function hideEndscreen() {
    document.getElementById("endscreen").classList.add("d-none");
}

function toggleFullscreen() {
    toggleFullscreenMenu();
}
function isFullScreen() {
    return document.fullscreenElement;
}

// function isFullscreen() {
//     let fullscreen=document.getElementById("img-fullscreen");
//     return !fullscreen.classList.contains("off");
// }

// function XsetScreenSizeGame() {
//     if (isFullscreen()) {
//         setGameScreenFullsize();
//     } else {
//         setGameScreenStandart();
//     }
// }

function initGame() {
    hideStartscreen();
    hideEndscreen();

    if (isFullScreen()) {
        toggleGameScreen();
        let canvas = document.getElementsByTagName("canvas")[0];
        canvas.requestFullscreen();         
    } 

    // setScreenSizeGame();
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
    // document.body.requestPointerLock();
    document.addEventListener("keydown", (e) => {
        if (e.key === "F11") { 
            e.preventDefault();             
            if (!document.fullscreenElement) {
                if (isStartscreen())  {
                    let intro = document.getElementById("intro");
                    intro.requestFullscreen();     
                } else {
                    let canvas = document.getElementsByTagName("canvas")[0];
                    canvas.requestFullscreen(); 
                    // console.log("2. Request");    
                    // let intro = document.getElementById("intro");
                    // intro.requestFullscreen();     
                    // console.log("3. Request");    
                    // let endscreen = document.getElementById("endscreen");
                    // endscreen.requestFullscreen();     
                }
                // toggleFullscreen(); 
            }
        } 
    });


    document.addEventListener("fullscreenchange", (e) => {
        e.preventDefault();             
        console.log("Screen changed");
        toggleFullscreen(); 
        toggleGameScreen();

    });

    sound = new Sound();
}

function requestFullscreen(canvas) {
    // window.addEventListener("resize", resizeCanvas);
    // window.addEventListener("load", resizeCanvas);
    // return;    
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
    if (!document.fullscreenElement) return;

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


function toggleGameScreen() {
    let canvas=document.getElementsByTagName("canvas")[0];
    canvas.classList.toggle("noBorderRadius");
    canvas.classList.toggle("full");
    document.querySelector("body").classList.toggle("full");
}

function setGameScreenFullsize() {
    if (document.fullscreenElement) return;
    console.log("setGameScreenFullsize");

    let canvas=document.getElementsByTagName("canvas")[0];
    canvas.classList.add("noBorderRadius");
    canvas.classList.add("full");
    document.querySelector("body").classList.add("full");
    // document.body.focus();
    // requestFullscreen(canvas);    
} 



function setGameScreenStandart() {
    // if (!document.fullscreenElement) return;
    // if (!isFullscreen) return;
    let canvas=document.getElementsByTagName("canvas")[0];
    canvas.classList.remove("noBorderRadius");
    canvas.classList.remove("full");
    document.querySelector("body").classList.remove("full");

    // exitFullscreen();
    
}


function toggleFullscreenMenu() {
    if (document.fullscreenElement) return;
    // if (!isFullscreen) return;

    let fullscreen=document.getElementById("img-fullscreen");
    fullscreen.classList.toggle("off");
    let menu=document.getElementById("intro");
    menu.classList.toggle("full");
    let body=document.getElementsByTagName("body")[0];
    // body.classList.toggle("black");
    return;
}

function setScreenSizeGame() {
    let fullscreen=document.getElementById("img-fullscreen");
    if (fullscreen.classList.contains("off")) {
        setGameScreenStandart();
    } else {
        setGameScreenFullsize();
    }

    listenerBorderRadius();

    if (!document.fullscreenElement) {
    }
    // setInterval(() => listenerBorderRadius(),1000);

}

function listenerBorderRadius() {
    let canvas=document.getElementsByTagName("canvas")[0];
    let body=document.getElementsByTagName("body")[0];
    if (document.fullscreenElement) {
        canvas.classList.add("noBorderRadius");
        body.classList.add("black");
    
    } else {
        canvas.classList.remove("noBorderRadius");
        body.classList.remove("black");
    }
}



function resizeCanvas() {
    return;
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const originalWidth = 720;  // Ursprüngliche Breite des Canvas
    const originalHeight = 480; // Ursprüngliche Höhe des Canvas

    const aspectRatio = originalWidth / originalHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Berechnen der maximal möglichen Größe unter Beibehaltung des Seitenverhältnisses
    let newWidth = windowWidth;
    let newHeight = windowWidth / aspectRatio;

    if (newHeight > windowHeight) {
        // Falls die Höhe zu groß wird, passe die Breite entsprechend an
        newHeight = windowHeight;
        newWidth = windowHeight * aspectRatio;
    }

    // Setze die Canvas-Größe entsprechend
    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;

    // Setze auch die internen Maße des Canvas (wichtig für Zeichnungen)
    // canvas.width = newWidth;
    // canvas.height = newHeight;
    canvas.width = originalWidth;
    canvas.height = originalHeight;

    scaleX = newWidth / originalWidth;
    scaleY = newHeight / originalHeight;

    scaleX = 1;
    scaleY = originalHeight;

    world.scaleX=scaleX;
    world.scaleY=scaleY;
    
    ctx.scale(this.scaleX, this.scaleY);

    return  {x: scaleX,y: scaleY};
}

function XresizeCanvas() {
    const canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// function getkeyDown(e) {
//     console.log("Taste gedrückt");
//     if (e.key == "F11") {
//         console.log(e);
//         toggleFullscreen();
//         setGameScreenFullsize();
//         listenerBorderRadius();

//         e.preventDefault();
//         e.stopPropagation();
//     }
//     if (e.key == "Escape" && isFullscreen())  {
//         console.log(e);
//         toggleFullscreen();
//         setScreenSizeGame();
//         listenerBorderRadius();
//         e.preventDefault();        
//         e.stopPropagation();  
//     }
// }

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




// -----------------------------------------------------
// document.addEventListener("keydown", (e) => {
//     if (e.key === "F11") { 
//         e.preventDefault(); // Verhindert den Browser-Fullscreen
//         toggleFullscreen(); // Aktiviert dein eigenes Fullscreen
//     }
// });

// // Funktion für Fullscreen
// function toggleFullscreen() {
//     let canvas = document.getElementById("game-canvas");

//     if (!document.fullscreenElement) {
//         canvas.requestFullscreen().catch(err => {
//             console.error(`Fullscreen error: ${err.message}`);
//         });
//     } else {
//         document.exitFullscreen();
//     }
// }

// <button id="fs-button">Fullscreen umschalten</button>
// document.getElementById("fs-button").addEventListener("click", toggleFullscreen);
    