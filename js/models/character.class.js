class Character extends AnimatedObject {
    width=195-75;
    height=300-100;
    y=230;// 400-this.image[0].height// 135;
    //  y=100;
    x=150+200;
    world;
    speed=1;
    speedMultiplier=1;
    offsetX=300;
    harmable=false;
    name="Character";
    startX=this.x;


    hitbox = {
        dx:25,
        dy:80,
        width: 65,
        height: 110
    }
    damage={touch:0,jump:100,fire:10};
    live=3000; // 1000;
    maxlive=this.live;
    initialLive=this.live;

    inventory = {
        bottles: 0,
        coins: 0,
        
        //better only what is used/bought
        flask: {
            speed:0,     // ist 50% faster in running and attacking for 30 seconds
            damage:0,    // makes 50% mor damage for 30 seconds
            health:0,    // gives back health
            resilient:0  // takes no damage for 30 seconds
        },
        gem: {
            weapon:0,    // gets a weapon that gives additional 5% damage
            shield:0     // gets a shield thas removes 5% of token damage
        },
        item: {
            weapon:0,    // gets a weapon that you can use , has its own cooldown like 10 seconds 
            shield:0     // gets a shield thas removes permanent 10% of token damage
        }
}


    using= {
        flask: {
            time: 0,      // last time used for count down and cooldown
            type: null   // type of flask character uses, must be set null after timeout, -> add setTimeOut to remove 
        }
    }

    MAX_BOTTLES=40;
    MAX_COINS=20; // 50

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

    IMAGES_IDLE=[
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEP=[
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_IDLE);
        
        this.animationStart();        
        this.wait(); 
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




    get bottlesPercentage() {
        return 100*this.inventory.bottles/this.MAX_BOTTLES;
    }
  
    get textBottlesAbsolute() {
        return `${this.inventory.bottles} / ${this.MAX_BOTTLES}`;
    }


    get textBottlesPercentage() {
        return `${this.bottlesPercentage.toFixed(0)} %`;
    }


    get coinsPercentage() {
        return 100*this.inventory.coins/this.MAX_COINS;
    }


    get textCoinsAbsolute() {
        return `${this.inventory.coins} / ${this.MAX_COINS}`;
    }


    get textCoinsPercentage() {
        return `${this.coinsPercentage.toFixed(0)} %`;
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


    hasBottleSpace() {
        return this.inventory.bottles < this.MAX_BOTTLES;
    }

    
    hasBottle() {
        return this.inventory.bottles>0;
    }

    
    removeBottle() {
        this.inventory.bottles-=1;
    }


    addBottle() {
        this.inventory.bottles+=1;
    }


    hasCoin() {
        return this.inventory.coins>0;
    }

    
    removeCoin() {
        this.inventory.coins-=1;
    }


    addCoin() {
        this.inventory.coins+=1;
        if (this.MAX_COINS<this.inventory.coins) this.MAX_COINS=this.inventory.coins;
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


    deadAction() {
        this.nextImage(this.IMAGES_DEAD);  // let it run for some sconds and then stop everything 
        // clearInterval(animation);
        clearInterval(this.moveInterval);
        // this.deadAnimation();
        return;
    } 


    animateMovement=() => {
        if (this.world.key.FAST) {
            this.setWalkSpeed(5);
        } else {
            this.setWalkSpeed(1);
        }
        if (this.world.key.RIGHT && !this.isLevelEnd()) {
            this.moveRight(this.soundWalk);
        }
        if (this.world.key.LEFT && !this.isLevelStart()) {
            this.moveLeft(this.soundWalk);
        }

        if (this.world.key.JUMP && !this.isAboveGround()) {
            this.jump();
        }

        this.world.cameraX = -this.x+300;

        if (this.world.key.LEFT) {
            this.displaymode=(this.displaymode+1) %2;
        }    

    }


    nextAnimation=() => {
        if (this.isAboveGround()) {
            this.nextImage(this.IMAGES_JUMPING);
        } 
        else 
            if (this.world.key.RIGHT || this.world.key.LEFT) this.nextImage(this.IMAGES_WALKING);  
        else
            if (this.isDead()) {
                this.deadAction();
                return;
            }
        else {
            if (this.IMAGES != this.IMAGES_WALKING) this.nextImage(this.IMAGES_WALKING);
        }
        
        if(this.isHurt() || this.continueHurtAnimation()) {
            this.nextImage(this.IMAGES_HURT);
        }

        else 
            if (key.isSleeping()) this.nextImage(this.IMAGES_SLEEP);
        else 
            if (key.isIdle()) this.nextImage(this.IMAGES_IDLE);
    }


    animationStart() {
        this.soundWalk.pause();
        this.moveInterval=setInterval(this.animateMovement,1000/60);
        let interval=this.randomInterval();
        setInterval(this.nextAnimation,interval);
    }

}