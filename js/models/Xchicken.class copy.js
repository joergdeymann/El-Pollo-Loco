class Chicken extends Enemy {
    y= 385;
    width=50;  // 75
    height=40; // 60;
    live=10;


    damage={touch:1,jump:5,fire:10};
    name="Chicken";

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
    } 
}
