class ThrowableBottle extends ThrowableObject {
    width=50;   //12 + 13x
    height=60;  // 15 + 15y
    damage={touch:10,jump:0,fire:0};
    live=1;
    name="ThrowAble Bottle";

    hitbox = {
        dx:8,
        dy:10,
        width: 34, // 8
        height: 42 // 10
    }

    IMAGES_THROW=[
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH=[
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    splashInterval;


    constructor() {
        super();
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH)
        this.initListenerSplash();

        this.init();
    }
    

    smaller() {
        this.x+=18;
        this.y+=0;
        this.width/=4;
        this.height/=4;
        this.hitbox = {
            dx:0,
            dy:0,
            width: this.width, // 8
            height: this.hitbox.height/2 // 10
        }        
    }


    stopAnimation() {
        clearInterval(this.splashInterval);
        this.splashInterval=null;
        this.live=0;
        this.smaller();
        super.stopAnimation();
    }


    splashOnGround() {
        if (this.IMAGES != this.IMAGES_SPLASH) {
            this.nextImage(this.IMAGES_SPLASH);
            this.index=0;
        } else 
        if (this.index == this.IMAGES.length) {
            this.stopAnimation();
        }
    }


    splashBottle() {
        if (!this.isMoving()) {
            this.splashOnGround();
        }
    }


    initListenerSplash() {
        if (this.splashInterval) return;

        this.splashInterval=setInterval(() => {
            this.splashBottle();
        },100);

    }


    throwFromObject(character,speed) {
        let dx=20;
        if (character.isMovingLeft) {
            speed=-speed;
            dx-=dx;
        } 
        let x=character.getCenterX()-this.width/2;
        let y=character.getCenterY()-this.height/2;
        this.throw(x,y,speed);
    }


    hitted(enemy) {
        if (this.isFalling() && this.live != 0) {
            enemy.reduceLive(this,"touch");
            this.stopMovingX();
            this.live=0;
            this.speedY=0;
            let acceleration=this.accelerationY;
            this.accelerationY=0;
            setTimeout(() => {
                this.speedY=-5;
                this.accelerationY=acceleration;          
            },500);    
        }
    }
}
