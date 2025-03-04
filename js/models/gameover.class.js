class Gameover extends DrawableObject {
    width=720;
    height=480;
    x=0;
    y=0;

    IMAGES_LOOSE=[
        './assets/img/9_intro_outro_screens/game_over/game over.png',
        './assets/img/9_intro_outro_screens/game_over/you lost.png',
    ]

    IMAGES_WIN=[
        './assets/img/9_intro_outro_screens/game_over/game over.png',
        './assets/img/9_intro_outro_screens/win/win_2.png'    ]

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
        setTimeout(() => {
            this.nextImage(this.IMAGES_LOOSE); 
        },2000)
        this.secondImageAndChoice();       
    }

    win() {
        this.invisible=false;
        this.nextImage(this.IMAGES_WIN); 
        setTimeout(() => {
            this.nextImage(this.IMAGES_WIN); 
        },2000);
        this.secondImageAndChoice();       
       
    }


}
