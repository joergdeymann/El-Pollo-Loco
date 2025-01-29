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
    ]


    constructor() {
        super();
    }


    removeSelf() {
        this.removeObjectFromArray(this.world.level.collectableObjects,this);
    }


    removeObjectFromArray(array,obj) {
        const index=array.findIndex(e => e == obj);
        if (index != -1) array.splice(index,1);
    } 


    
    setRandomStartPositionX() {
        if (this.world?.level?.width) {
            let unreachable=this.world.level.backgrounds[0].width/2*1.1;
            this.x = Math.random()*(this.world.level.width - unreachable*2)+unreachable;
        } else {
            setTimeout(() => this.setRandomStartPositionX(),50);
        }
    }
}