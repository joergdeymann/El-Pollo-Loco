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
        document.getElementById("endscreen").classList.remove("d-none");
        document.getElementById("intro").classList.add("d-none");
    }

    /**
     * Shows the "Gameover" Screen
     */
    displayIntroScreen() {
        document.getElementById("intro").classList.remove("d-none");
        document.getElementById("endscreen").classList.add("d-none");        
        document.getElementsByTagName("canvas")[0].classList.add("d-none");        
    }


    /**
     * Shows the 2nd "Gameover" Screen and exits Fullscreen Mode
     */
    secondImageAndChoice() {
        this.displayEndscreen(this.imgaes); 
        setTimeout(() => {
            this.nextImage(); 
        },1000);     

        setTimeout(() => {
            this.exitFullscreen();        
        },2000);
    }


    /**
     * Character is dead - show Endscreen
     */
    loose() {
        this.invisible=false;
        this.nextImage(this.IMAGES_LOOSE); 
        this.secondImageAndChoice();       
    }


    /**
     * Character has won - show Endscreen
     */
    win() {
        this.index=0;
        this.invisible=false;
        this.nextImage(this.IMAGES_WIN); 
        setTimeout(() => {
            this.width=this.width*0.5;
            this.height=this.height*0.5;
            this.x+=this.width/2;
            this.y+=this.height/2-50;
        },2000);
        this.secondImageAndChoice();       
       
    }


    /**
     * 
     * Exits the Fullscreen Mode completely
     * 
     */
    async exitFullscreen() {
        if (!document.fullscreenElement) return;
        await this.exitFullscreenWindow();
        this.exitFullscreenGame();
        this.exitFullscreenMenu();
    }


    /**
     * Exits the Fullscreen Mode for the Game Screen
     */
    exitFullscreenGame() {
        let canvas=document.getElementsByTagName("canvas")[0];
        canvas.classList.remove("noBorderRadius");
        canvas.classList.remove("full");
        document.querySelector("body").classList.remove("full");
    }


    /**
     * Exits the System Fullscreen Mode
     */
    async exitFullscreenWindow() {
        // Fullscreen verlassen
        if (document.exitFullscreen) {
            await document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            await document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari
            await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // Internet Explorer
            await document.msExitFullscreen();
        }
    }
    

    /**
     * Exits the Fullscreen Mode for the Menu Screen
     */
    exitFullscreenMenu() {
        let fullscreen=document.getElementById("img-fullscreen");
        fullscreen.classList.add("off");
        let menu=document.getElementById("intro");
        menu.classList.remove("full");
    }
}
