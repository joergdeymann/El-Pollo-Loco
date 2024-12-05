class Chicken extends AnimatedObject {
    y= 365;
    width=75;
    height=60;

    count=0;

    IMAGES_WALKING=[
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super();
        this.x = Math.random()*620 +720; // Random Position in first screen + screensize-center 

        this.loadImages(this.IMAGES_WALKING);
        this.init();
    

        

        // this.moveLeft();       
    } 

    init() {
        this.animationStart();
        this.initListenerMoveLeft();
        this.initListenerLeftPosition();
        this.adjustSpeedTimer();
    }
 

    pick() {

    }




}
