class CollectableObject extends AnimatedObject {
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
        // 'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        // 'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]


    constructor() {
        super();
        // this.loadImages(this.IMAGES_ANIMATED);
        // this.animationStart();
        // this.setRandomStartPositionX();
    }


    removeSelf() {
        this.removeObjectFromArray(this.world.level.collectableObjects,this);
    }


    removeObjectFromArray(array,obj) {
        const index=array.findIndex(e => e == obj);
        if (index != -1) array.splice(index,1);
    } 
}