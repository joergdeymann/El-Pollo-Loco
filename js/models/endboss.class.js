class Endboss extends AnimatedObject {
    y= 95;
    x=800;
    width=375;  // 75
    height=350; // 60;
    speed=0;

    hitboxes = [
        {
            dx:20,
            dy:70,
            width: 100,
            height:100
        },
        {
            dx:70,
            dy:135,
            width: 250,
            height: 130
        },
        {
            dx:135,
            dy:265,
            width: 115,
            height:70
        },
        

    ];

    hitbox = {
        dx:30,
        dy:70,
        width: 290,
        height: 265
    };
    

    damage={touch:2,jump:1000,fire:10};
    live=2000;
    name="Enboss";

    count=0;

    IMAGES_WALKING=[
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super();

        this.loadImages(this.IMAGES_WALKING);
        this.init();
        this.setLive();
    

        

        // this.moveLeft();       
    } 

    init() {
        this.animationStart();
        this.initListenerMoveLeft();
        this.initListenerLeftPosition();
        // this.adjustSpeedTimer();
        
        // this.setRandomStartPositionX();
    }

    // isColliding(obj) {     
    //     return this.isCollidingGroup(obj);
    // }


    pick() {

    }




}
