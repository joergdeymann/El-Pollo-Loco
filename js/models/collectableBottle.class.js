class CollectableBottle extends CollectableObject {
    x;
    y=365;
    width=50;
    height=60;
    live=1;

    hitbox = {
        dx:8,
        dy:10,
        width: 34,
        height: 42
    }

    
    IMAGES_ANIMATED=[
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]


    constructor(world=null) {
        super();
        this.world=world;
        this.loadImages(this.IMAGES_ANIMATED);
        this.setRandomStartPositionX();
        this.animationStart();
    }

}