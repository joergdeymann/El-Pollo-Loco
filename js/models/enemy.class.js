class Enemy extends AnimatedObject {
    removeTime=5000; // Time to remove dead body
    listenerMove;
    direction=-1;
    FLIPIMG=true;


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
        if (this.isAboveGround() && this.IMAGES_DIE) {
            this.nextImage(this.IMAGES_DIE);
            setTimeout(() => this.die(),100);
            return
        }
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
