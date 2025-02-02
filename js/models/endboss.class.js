class Endboss extends AnimatedObject {
    y= 95;
    x=800;
    width=375;  // 75
    height=350; // 60;
    speed=0;
    active=false;
    FLIP=false;


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


    IMAGES_STANDING=[
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    // IMAGES_WALKING=[
    //     './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
    //     './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
    //     './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
    //     './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
    //     './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
    //     './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
    //     './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
    //     './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    // ];


    IMAGES_WALKING=[
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];


    listener={
        movement:null,
        attackPick:null,
        attackEarthquake:null,
        attackFeather:null
    }


    constructor() {
        super();

        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_WALKING);
        this.init();
        this.setLive();
   } 

    init() {
        this.animationStart();
        // this.initListenerMoveLeft();
        // this.initListenerLeftPosition();
        // this.animationStart();
    }

    movementListener() {
        let t=Math.random()*10;
        if (t<10) {
            this.speed=1.5;
            if (this.isLeftFromCharacter(20)) {
                this.setImages(this.IMAGES_WALKING);
                this.moveRight();
            } else 
            if (this.isRightFromCharacter(20)) {
                this.setImages(this.IMAGES_WALKING);
                this.moveLeft();
            } else {
                this.setImages(this.IMAGES_STANDING);
            }



            // this.speed=0;
        }
    }

    // isColliding(obj) {     
    //     return this.isCollidingGroup(obj);
    // }
    activate() {
        this.active=true;
        console.log("Boss aktivated");
        this.listener.movement=setInterval(() => this.movementListener(),50);
    }


    pick() {

    }
}
