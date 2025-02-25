class Gameover extends DrawableObject {
    width=300;
    height=120;
    x=100;
    y=100;

    IMAGES_LOOSE=[
        './assets/img/9_intro_outro_screens/game_over/game over.png',
        './assets/img/9_intro_outro_screens/game_over/you lost.png',
    ]

    IMAGES_WIN=[
        './assets/img/9_intro_outro_screens/game_over/game over.png',
    ]
    

    constructor() {
        super();
        this.loadImages(this.IMAGES_LOOSE); 
        this.loadImages(this.IMAGES_WIN); 
    } 

    loose() {
        setTimeout(() => {
            this.nextImage(this.IMAGES_LOOSE); 
        },2000)       
    }

    win() {
        this.nextImage(this.IMAGES_WIN); 
    }

}
