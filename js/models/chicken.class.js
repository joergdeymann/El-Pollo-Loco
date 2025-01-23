class Chicken extends AnimatedObject {
    y= 385;
    width=50;  // 75
    height=40; // 60;
    live=10;

    removeTime=5000; // Time to remove dead body

    damage={touch:1,jump:5,fire:10};

    hitbox = {
        dx:2,
        dy:10,
        width: 44,
        height: 24
    }

    IMAGES_WALKING=[
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD=[
        './assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor() {
        super();

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.init();
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

    die() {
        this.live=0;
        this.nextImage(this.IMAGES_DEAD);
        this.removeSelf();
    }

    removeSelf() {
        setTimeout(() => {
            this.removeObjectFromArray(this.world.level.enemies,this);
        },this.removeTime);
    }

    removeObjectFromArray(array,obj) {
        const index=array.findIndex(e => e == obj);
        if (index != -1) array.splice(index,1);
    } 




}
