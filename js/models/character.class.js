class Character extends AnimatedObject {
    width=195;
    height=300;
    y=135;
    x=150;
    world;

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
        let interval=this.randomInterval();
        setInterval(() => {
            if (this.world.key.RIGHT) this.nextImage();
        },interval);
    }

}