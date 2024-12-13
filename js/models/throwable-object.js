class ThrowableObject extends AnimatedObject {
    x;
    y;
    width=50;
    height=60;
    img;
    speed;
    damage={touch:10,jump:0,fire:0};
    live=1;

    hitbox = {
        dx:2,
        dy:10,
        width: 44,
        height: 24
    }

    IMAGES_THROW=[
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x,y,speed) {
        super();

        this.loadImages(this.IMAGES_THROW);
        this.init();
        this.throw(x,y,speed);
    } 

    init() {
        this.animationStart();
    }

    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} speed 0-100; good values between 50 and 100;
     */
    throw(x,y,speed) {
        this.x = x;
        this.y = y;
        this.speed=7*speed/100; // 3-8
        this.speedY=this.speed*5/7; //*50/100;
        this.direction=1;
        this.applyGravity(); 
        this.applyGravityX(); 
    }
 }