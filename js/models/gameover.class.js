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
    ]

    invisible=true;
    

    constructor() {
        super();
        this.loadImages(this.IMAGES_LOOSE); 
        this.loadImages(this.IMAGES_WIN); 
    }


    loose() {
        setTimeout(() => {
            this.invisible=false;
            this.nextImage(this.IMAGES_LOOSE); 
        },5000)       
    }

    win() {
        this.invisible=false;
        this.nextImage(this.IMAGES_WIN); 
    }

}
