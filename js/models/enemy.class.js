class Enemy extends AnimatedObject {
    removeTime=5000; // Time to remove dead body

    constructor() {
        super();
    } 


    init() {
        this.animationStart();
        this.initListenerMoveLeft();
        this.initListenerLeftPosition();
        this.adjustSpeedTimer();
        
        this.setRandomStartPositionX();
    }


    die() {
        this.live=0;
        this.nextImage(this.IMAGES_DEAD);
        this.removeSelf();
    }


    removeSelf() {
        setTimeout(() => {
            this.removeObjectFromArray(this.world.level.enemies,this);
        },this.removeTime);
    }


    removeObjectFromArray(array,obj) {
        const index=array.findIndex(e => e == obj);
        if (index != -1) array.splice(index,1);
    } 

}
