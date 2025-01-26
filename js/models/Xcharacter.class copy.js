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
    soundWalk=new Audio('./assets/sound/walknormal.mp3');


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
        this.soundWalk.playbackRate = (this.speed-1)/2;
    }


    isLevelEnd() {
        return this.x > this.world.level.width-425;
    }


    isLevelStart() {
        return this.x < 330;
    }


    animationMovements() {
        if (this.world.key.FAST) {
            this.setWalkSpeed(5); // this.soundWalk.playbackRate = this.speed  *2/5;
        } else {
            this.setWalkSpeed(1);
        }

        if (this.world.key.RIGHT && !this.isLevelEnd()) {
            this.moveRight(this.soundWalk);
        }

        if (this.world.key.LEFT && !this.isLevelStart) {
            this.moveLeft(this.soundWalk);
        }

        if (this.world.key.JUMP && !this.isAboveGround()) {
            this.jump();
        }

        this.world.cameraX = -this.x+300;
    }


    nextAnimation() {
        if (this.isAboveGround()) {
            this.nextImage(this.IMAGES_JUMPING);
        } else {
            if (this.world.key.RIGHT || this.world.key.LEFT) this.nextImage(this.IMAGES_WALKING);
        }
    }


    animationStart() {
        this.soundWalk.pause();
        setInterval(this.animationMovements,1000/60);
        let interval=this.randomInterval();
        setInterval(nextAnimation,interval);
    }

}