class Character extends AnimatedObject {
    width=195-75;
    height=300-100;
    y=230;// 400-this.image[0].height// 135;
    x=150+400;
    world;
    speed=10;
    offsetX=300;


    IMAGES_WALKING=[
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.animationStart();        
    } 


    animationStart() {
        setInterval(() => {
            if (this.world.key.RIGHT) {
                this.x+=this.speed;
                this.flip=0;
            }
            if (this.world.key.LEFT) {
                this.x-=this.speed;
                this.flip=1;
            }
            this.world.cameraX = -this.x+300;
        },1000/60);

        let interval=this.randomInterval();
        setInterval(() => {
            if (this.world.key.RIGHT || this.world.key.LEFT) this.nextImage();
        },interval);
    }

}