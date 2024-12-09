class Chicken extends AnimatedObject {
    y= 385;
    width=50;  // 75
    height=40; // 60;

    hitbox = {
        dx:2,
        dy:10,
        width: 44,
        height: 24
    }

    count=0;

    IMAGES_WALKING=[
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super();

        this.loadImages(this.IMAGES_WALKING);
        this.init();
    

        

        // this.moveLeft();       
    } 

    init() {
        this.animationStart();
        this.initListenerMoveLeft();
        this.initListenerLeftPosition();
        this.adjustSpeedTimer();
        
        this.setRandomStartPositionX();
    }
 

    pick() {

    }




}
