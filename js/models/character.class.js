class Character extends AnimatedObject {
    width=195-75;
    height=300-100;
    y=230;// 400-this.image[0].height// 135;
    x=150+400;
    world;
    speed=1;
    speedMultiplier=1;
    offsetX=300;


    IMAGES_WALKING=[
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    
    soundWalk=new Audio('./assets/sound/walknormal.mp3');
    

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.animationStart();        
    } 


    animationStart() {
        this.soundWalk.pause();
        setInterval(() => {
            if (this.world.key.FAST) {
                this.speedMultiplier=5;
                this.soundWalk.playbackRate = 1.00 * this.speedMultiplier*this.speed  *2/5;
            } else {
                this.speedMultiplier=1;
                this.soundWalk.playbackRate=1;
                // this.soundWalk.playbackRate = 1.00/(this.speed*this.speedMultiplier);
            }
            if (this.world.key.RIGHT && this.x < this.world.level.width-425) {
                this.x+=this.speed*this.speedMultiplier;
                this.flip=false;
                this.soundWalk.play();
            }
            if (this.world.key.LEFT && this.x>300) {
                this.x-=this.speed * this.speedMultiplier;
                this.flip=true;
                this.soundWalk.play();
            }
            this.world.cameraX = -this.x+300;
        },1000/60);

        let interval=this.randomInterval();
        setInterval(() => {
            if (this.world.key.RIGHT || this.world.key.LEFT) this.nextImage();
        },interval);
    }

}