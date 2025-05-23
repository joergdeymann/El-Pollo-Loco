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
    
    /**
     * Throws a smaller bow
     */
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


    /**
     * 
     * Stops the splash Animation
     * 
     */
    stopAnimation() {
        clearInterval(this.splashInterval);
        this.splashInterval=null;
        this.live=0;
        this.smaller();
        super.stopAnimation();
    }


    /**
     * 
     * If the bottle falls to ground the bottle begins to spash
     * 
     */
    splashOnGround() {
        if (this.IMAGES != this.IMAGES_SPLASH) {
            this.nextImage(this.IMAGES_SPLASH);
            this.index=0;
                this.sound.play('bottleSmash');
        } else 
        if (this.index == this.IMAGES.length) {
            this.stopAnimation();
        }
    }


    /**
     * 
     * Splash the Botlle now
     * 
     */
    splashBottle() {
        if (!this.isMoving()) {
            this.splashOnGround();
        }
    }


    /**
     * 
     * Watch if a bottle is on Ground, and triggers a splash
     * 
     */
    initListenerSplash() {
        if (this.splashInterval) return;

        this.splashInterval=setInterval(() => {
            this.splashBottle();
        },100);

    }

    
    /**
     * 
     * If the bottle is behind the enemy you make more damage, so you can seperate score
     * 
     * @param {Object} enemy - enmy we hit with the Bottlle e.g. 
     * @returns - true if Bottle is behind the given Enemy 
     * 
     */
    isBehind(enemy) {
        return (enemy.isMovingLeft && this.isMovingLeft) || (enemy.isMovingRight && this.isMovingRight);
    }
    

    /**
     * 
     * Test if  Bottle hits the enemy
     * 
     * @param {Object} enemy 
     */
    hitted(enemy) {
        if (this.isFalling() && this.live != 0) {
            if (this.isBehind(enemy)) {
                enemy.reduceLive(this,"touch");
            }
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
