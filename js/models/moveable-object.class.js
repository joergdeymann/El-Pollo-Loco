// extends ActionOnjects, 
// hier solllen nur die direkten Movements rein

class MovableObject extends AutomatedObject {
    speedY=1;
    accelerationY=0.2;
    accelerationX=0.1;
    direction=0;



    constructor() {
        super()

    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.fall();
            }

        },1000/60);
    }

    fall() {
        this.y -= this.speedY;
        this.speedY -= this.accelerationY;    
    }

    applyGravityX() {
        setInterval(() => {
            if (this.isMoving()) {
                this.slowDownX();
            }
        },1000/60);
    }
    
 
    slowDownX() {
        this.x += this.speed*this.direction;
        this.speed -= this.accelerationX;
        if (this.speed < 0) this.speed=0;
    }                
    
    isAboveGround() {
        return (this.y+this.hitbox.height+this.hitbox.dy) < 420;
    }

    isFalling() {
        return this.speedY < 0 && this.isAboveGround();
    }
 
    isMoving() {
        return this.speed >0;
    }

    moveRight(sound=null) {
        this.x+=this.speed;
        this.flip=false;
        if (sound) sound.play();
        this.direction=1;
    }

    moveLeft(sound=null) {
        this.x-=this.speed;
        this.flip=true;
        if (sound) sound.play();
        this.direction=-1;
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