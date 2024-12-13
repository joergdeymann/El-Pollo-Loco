class ThrowableBottle extends ThrowableObject {
    width=50;
    height=60;
    damage={touch:10,jump:0,fire:0};
    live=1;

    hitbox = {
        dx:8,
        dy:10,
        width: 34,
        height: 42
    }

    IMAGES_THROW=[
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x,y,speed) {
        super(x,y,speed);
    }
}