class Gameover extends DrawableObject {
    width=720;
    height=480;
    x=0;
    y=0;

    IMAGES_LOOSE=[
        './assets/img/9_intro_outro_screens/game_over/game over.png',
        './assets/img/9_intro_outro_screens/game_over/you lost.png',
    ];

    IMAGES_WIN=[
        './assets/img/9_intro_outro_screens/game_over/game over.png',
        './assets/img/9_intro_outro_screens/win/win_2.png'   
    ];

    invisible=true;
    

    constructor() {
        super();
        this.loadImages(this.IMAGES_LOOSE); 
        this.loadImages(this.IMAGES_WIN); 
    }

    /**
     * You Win/You Lost
     * Play Again - Button
     * Overview - Button
     */
    displayEndscreen() {
        // document.getElementById("endscreen-image").src=this.img;
        document.getElementById("endscreen").classList.remove("d-none");
        document.getElementById("intro").classList.add("d-none");
        this.toggleGameScreen();
        this.exitFullscreen();

        // if (document.fullscreenElement) document.getElementById("endscreen").requestFullscreen();
    }

    displayIntroScreen() {
        document.getElementById("intro").classList.remove("d-none");
        document.getElementById("endscreen").classList.add("d-none");        
        document.getElementsByTagName("canvas")[0].classList.add("d-none");        
    }

    secondImageAndChoice() {
        this.displayEndscreen(this.imgaes); 
        setTimeout(() => {
            this.nextImage(); 
        },2000);       
    }

    loose() {
        this.invisible=false;
        this.nextImage(this.IMAGES_LOOSE); 
        // setTimeout(() => {
        //     this.nextImage(this.IMAGES_LOOSE); 
        // },2000)
        this.secondImageAndChoice();       
    }

    win() {
        this.index=0;
        this.invisible=false;
        this.nextImage(this.IMAGES_WIN); 
        setTimeout(() => {
            this.width=this.width*0.5;
            this.height=this.height*0.5;
            this.x+=this.width/2;
            this.y+=this.height/2-50;
            
            console.log("WIN Next image");
        },2000);
        this.secondImageAndChoice();       
       
    }


    // !!" Achtung das Falsche ???
    XexitFullscreenMenu() {
        if (!document.fullscreenElement) return;
        // if (!isFullscreen) return;
    
        let fullscreen=document.getElementById("img-fullscreen");
        fullscreen.classList.toggle("off");
        menu=document.getElementById("intro");
        menu.classList.toggle("full");
        body=document.getElementsByTagName("body")[0];
        // body.classList.toggle("black");
        return;
    }
    


    exitFullscreen() {
        if (!document.fullscreenElement) return;
        this.toggleGameScreen();
        this.toggleFullscreenMenu();
        this.exitFullscreenWindow();


    }

    // Copy of game.js function toggleGameScreen
    toggleGameScreen() {
        let canvas=document.getElementsByTagName("canvas")[0];
        canvas.classList.toggle("noBorderRadius");
        canvas.classList.toggle("full");
        document.querySelector("body").classList.toggle("full");

    }

    // Copy of game.js function exitFullScreen
    exitFullscreenWindow() {
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
    
    toggleFullscreenMenu() {
        let fullscreen=document.getElementById("img-fullscreen");
        fullscreen.classList.toggle("off");
        let menu=document.getElementById("intro");
        menu.classList.toggle("full");
        let body=document.getElementsByTagName("body")[0];
        // body.classList.toggle("black");
        return;
    }
            

}
