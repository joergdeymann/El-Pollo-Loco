class Endboss extends AnimatedObject {
    y= 95;
    x=800;
    width=375;  // 75
    height=350; // 60;
    speed=0;
    active=false;
    FLIP=false;


    hitboxes = [
        {   //Head
            dx:20,
            dy:70,
            width: 100,
            height:100,
            damageFactor: 1.3
        },
        {   //Body
            dx:70,
            dy:135,
            width: 250,
            height: 130,
            damageFactor: 1
        },
        {   // Feet
            dx:135,
            dy:265,
            width: 115,
            height:70,
            damageFactor: 0.5
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
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
    ];


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


    IMAGES_ATTACK=[
        './assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];


    IMAGES_HURT=[
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];


    IMAGES_DEAD=[
        './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G26.png',
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
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.init();
        this.setLive();
   } 

    init() {
        this.animationStart();
    }

    hurting() {
        if (!this.isImageSet(this.IMAGES_HURT)) {
            this.setImages(this.IMAGES_HURT);
            setTimeout(() => {
                this.isHurtingMovement=false;
            },500);
        }
    }


    movement() {
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
    }
    

    movementListener() {
        let t=Math.random()*10;
        if (this.isHurtingMovement) {
            this.hurting();
        } else if (t<10) {
            this.movement();
        }
    }


    activate() {
        this.active=true;
        this.listener.movement=setInterval(() => this.movementListener(),50);
    }


    pick() {

    }
}
