class Chick extends Enemy {
    y= 385;
    width=50;  // 75
    height=40; // 60;
    live=5;
    speed=0.5;    
    speedMin=0;
    speedMax=0.5;
    speedRange=0.5;
    jumpSpeed=1;  //3
    jumpHeight=40; //20;
    accelerationY=0.01// 0.05;


    removeTime=5000; // Time to remove dead body

    damage={touch:1,jump:5,fire:10};
    name="Chick";

    hitbox = {
        dx:2,
        dy:10,
        width: 44,
        height: 24
    }

    IMAGES_WALKING=[
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD=[
        './assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    IMAGES_DIE=[
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    ]

    IMAGES_JUMP=[
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    ]

    constructor() {
        super();

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_DIE);
        this.loadImages(this.IMAGES_JUMP);
        this.init();
        setInterval(() => this.initJumpListener(),1000+Math.random()*500);
        this.applyGravity();
    } 


    resetJump() {
        if (this.isDead()) return;

        if (this.isAboveGround()) {
            setTimeout(() => this.resetJump(),100);
            return;
        } 
        this.setImages(this.IMAGES_WALKING);  
    }

    initJumpListener() {
        let t=Math.random()*100;
        if (t>20 || this.isAboveGround() || this.isDead()) return;
        this.jump();
        this.setImages(this.IMAGES_JUMP);  
        this.resetJump();

    }

}
