class Character extends AnimatedObject {
    width=195-75;
    height=300-100;
    y=230;// 400-this.image[0].height// 135;
    y=100;
    x=150+400;
    world;
    speed=1;
    speedMultiplier=1;
    offsetX=300;
    hitbox = {
        dx:25,
        dy:80,
        width: 65,
        height: 110
    }


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
    
    soundWalk=new Audio('./assets/sound/walknormal.mp3');
    

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.animationStart();        
        this.wait(); // this.applyGravity();

    } 
    
    async wait() {
        await new Promise(e => setTimeout(e,4000));
        this.applyGravity();
    }
    
    setWalkSpeed(speed) {
        this.speed=speed;
        this.soundWalk.playbackRate = (100+speed*20)/100;
    }

    isLevelEnd() {
        return this.x > this.world.level.width-425;
    }

    isLevelStart() {
        return this.x < 330;
    }

    animationStart() {
        this.soundWalk.pause();
        setInterval(() => {
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
        setInterval(() => {
            if (this.isAboveGround()) {
                this.nextImage(this.IMAGES_JUMPING);
            } else {
              if (this.world.key.RIGHT || this.world.key.LEFT) this.nextImage(this.IMAGES_WALKING);
            }
        },interval);
    }

}