class CollectableCoin extends CollectableObject {
    x;
    y=365;
    width=90;
    height=90;
    live=1;

    hitbox = {
        dx:32,
        dy:32,
        width: 26,
        height: 26
    }
    

    
    IMAGES_ANIMATED=[
        './assets/img/8_coin/coin_1.png'
    ]


    constructor(x,y) {
        super();
        this.x=x;
        this.y=y;

        this.loadImages(this.IMAGES_ANIMATED);
        // this.animationStart();
    }
    

}