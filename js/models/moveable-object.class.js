// extends ActionOnjects, 
// hier solllen nur die direkten Movements rein

class MovableObject extends AutomatedObject {
    speedY=1;
    accelerationY=0.2;



    constructor() {
        super()

    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.accelerationY;
            }

        },1000/60);
    }
 

    isAboveGround() {
        return this.y < 230;
    }

    // noch nicht ganz richtig
    isFalling() {
        return this.y < 0 && this.isAboveGround();
    }
 

    moveRight(sound=null) {
        this.x+=this.speed;
        this.flip=false;
        if (sound) sound.play();
    }

    moveLeft(sound=null) {
        this.x-=this.speed;
        this.flip=true;
        if (sound) sound.play();
    }

    jump() {
        this.speedY=3; 
        this.y-=100;          
    }





    isLeftFromCharacter() {
        return this.getCenterX(this) < this.getCenterX(this.world.character);
    }

    isRightFromCharacter() {
        return this.getCenterX(this) > this.getCenterX(this.world.character);
    }

    // this.x + this.width/2
    isNearCharacter() {
        let enemy = this.getCenterX(this);
        let character = this.getCenterX(this.world.character);
        return enemy > character-150 && enemy < character+150;
    }    

}