class Screen {
    intro;
    canvas;
    imgFullscreen;
    body;


    /**
     * 
     * Prepare Screen Interactions
     * 
     */
    constructor() {
        this.intro  = document.getElementById("intro");
        this.canvas = document.getElementsByTagName("canvas")[0];
        this.imgFullscreen = document.getElementById("img-fullscreen");
        this.body = document.querySelector("body");

        this.addScreenListener();
        this.addKeyListener();
    }

    /**
     * Start Screens
     */
    init() {
        this.hideStartscreen();
        this.hideEndscreen();
        this.initGameScreen();
        this.showGamescreen();   
    } 
    
    /**
     * 
     * Ask for the Screen that is displayed: Intro Screen
     * 
     */
    get isStartscreen() {
        return !this.intro.classList.contains("d-none");
    }
    
    /**
     * 
     * alias to ask if we have Fullscreen
     *
     */
    get isFullScreen() {
        return document.fullscreenElement;
    }
    
    /**
     * 
     * Adds a Listener to watch if Screenmode has changed and 
     * reconfigure Setup also to exit Fullscreen
     *  
     */
    addScreenListener() {
        document.addEventListener("fullscreenchange", (e) => {
            e.preventDefault();             
            if (document.fullscreenElement) {
                this.toggleFullscreenMenu(); 
                this.toggleFullscreenGame();    
            } else {
                this.exitFullscreenMenu(); 
                this.exitFullscreenGame();    
            }
        });        
    }

    /**
     * 
     * Overwrite Original F11 Browser FUllscreen Mode
     * with requestFullscreen
     * 
     */
    addKeyListener() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "F11") { 
                e.preventDefault();    
                if (!document.fullscreenElement) {
                    if (this.isStartscreen)  {
                        this.intro.requestFullscreen();     
                    } else {
                        this.canvas.requestFullscreen(); 
                    }
                }
    
            } 
        });
    
    }

    /**
     * Hide Intro
     */
    hideStartscreen() {
        document.getElementById("intro").classList.add("d-none");
    }
    
    /**
     * Show Intro
     */
    showStartscreen() {
        document.getElementById("intro").classList.remove("d-none");
    }
    
    /**
     * Hide Game Canvas
     */
    hideGamescreen() {
        document.getElementsByTagName("canvas")[0].classList.add("d-none");
    }
    
    /**
     * Show Game Canvas
     */
    showGamescreen() {
        document.getElementsByTagName("canvas")[0].classList.remove("d-none");
    }
    
    /**
     * Hide Endscreen (GameOver or You Win)
     */
    hideEndscreen() {
        document.getElementById("endscreen").classList.add("d-none");
    }

    /**
     * Show Endscreen (GameOver or You Win)
     */
    showEndscreen() {
        document.getElementById("endscreen").classList.remove("d-none");
    }
       
    /**
     * 
     * Toggle the Modifies of Fullscreen Menu
     * Button / Size / Color aso.
     * 
     */
    toggleFullscreenMenu() {
        this.imgFullscreen.classList.toggle("off");
        this.intro.classList.toggle("full");
        return;
    }
 

    /**
     * 
     * Exit the Modifies for normal Display
     * Button / Size / Color aso.
     * 
     */
    exitFullscreenMenu() {
        this.imgFullscreen.classList.add("off");
        this.intro.classList.remove("full");
        return;
    }
    
    /**
     * 
     * Toggle the Modifies for Canvas Game  Display
     * Border , Background
     * 
     */
    toggleFullscreenGame() {
        this.canvas.classList.toggle("noBorderRadius");
        this.canvas.classList.toggle("full");
        this.body.classList.toggle("full");
    }

    /**
     * 
     * Switch the Modifies for Canvas Game Display to Standart
     * Border , Background
     * 
     */
    exitFullscreenGame() {
        this.canvas.classList.remove("noBorderRadius");
        this.canvas.classList.remove("full");
        this.body.classList.remove("full");
    }
    
    /** 
     * 
     * Starts the Game in Fullscreen iof Wantd
     * Switches the Fullscreen Menu to Canvas
     * 
     */
    async initGameScreen() {
        if (this.isFullScreen) {
            this.toggleFullscreenGame();
            await document.exitFullscreen();
            this.canvas.requestFullscreen();      
        }     
    }
}