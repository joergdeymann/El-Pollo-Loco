class Character extends AnimatedObject {
    width=195-75;
    height=300-100;
    y=230;// 400-this.image[0].height// 135;
    y=100;
    x=150+200;
    world;
    speed=1;
    speedMultiplier=1;
    offsetX=300;
    harmable=false;


    hitbox = {
        dx:25,
        dy:80,
        width: 65,
        height: 110
    }
    damage={touch:0,jump:100,fire:10};
    live=1000; // 1000;
    maxlive=this.live;




    IMAGES_WALKING=[
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING=[
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    
    IMAGES_DEAD=[
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png',
        './assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT=[
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png'
    ];


    soundWalk=new Audio('./assets/sound/walknormal.mp3');
    

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);

        this.animationStart();        
        this.wait(); // this.applyGravity();

    } 
    
    async wait() {
        setTimeout(() => this.harmable=true,4000);
        this.applyGravity();
    }
    
    setWalkSpeed(speed) {
        this.speed=speed;
        this.soundWalk.playbackRate = (100+speed*20)/100;
    }
    get livePercentage() {
        return 100*this.live/this.maxlive;
    }

    isLevelEnd() {
        return this.x > this.world.level.width-425;
    }

    isLevelStart() {
        return this.x < 330;
    }

    continueHurtAnimation() {
        return (this.IMAGES===this.IMAGES_HURT) && (this.index>1);
    }

    continueDeadAnimation() {
        return this.index>1;
    }



    animationStart() {
        this.soundWalk.pause();
        let moveInterval=setInterval(() => {
            if (this.world.key.FAST) {
                this.setWalkSpeed(5);
            } else {
                this.setWalkSpeed(1);
            }
            if (this.world.key.RIGHT && !this.isLevelEnd()) {
                this.moveRight(this.soundWalk);
                // this.x+=this.speed;
                // this.flip=false;
                // this.soundWalk.play();
            }
            if (this.world.key.LEFT && !this.isLevelStart()) {
                this.moveLeft(this.soundWalk);
                // this.x-=this.speed;
                // this.flip=true;
                // this.soundWalk.play();
            }

            if (this.world.key.JUMP && !this.isAboveGround()) {
                this.jump();
            }

            this.world.cameraX = -this.x+300;
        },1000/60);

        let interval=this.randomInterval();
        let animation=setInterval(() => {
            if (this.isAboveGround()) {
                this.nextImage(this.IMAGES_JUMPING);
            } else {
              if (this.world.key.RIGHT || this.world.key.LEFT) this.nextImage(this.IMAGES_WALKING);
            }

            if (this.isDead()) {
                this.nextImage(this.IMAGES_DEAD);  // let it run for some sconds and then stop everything 
                // clearInterval(animation);
                clearInterval(moveInterval);
                // this.deadAnimation();
                return;
            }

            if(this.isHurt() || this.continueHurtAnimation()) this.nextImage(this.IMAGES_HURT);
        },interval);
    }

    deadAnimation() {
        let interval=this.randomInterval();
 
        let animation=setInterval(() => {
            this.nextImage(this.IMAGES_DEAD);
        },interval);
 
        setTimeout(() => {
            clearInterval(animation);
        },2000);
    }
}