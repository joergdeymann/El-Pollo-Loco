class MovableObject extends AutomatedObject {
    speedY=1;
    accelerationY=0.2;
    accelerationX=0.1;
    direction=0;
    jumpHeight=100;
    jumpSpeed=3;
    gravityInterval=null;

    constructor() {
        super()

    }


    applyGravity() {
        this.gravityInterval=setInterval(() => {
            if (this.isAboveGround()) {
                this.fall();
            }
        },1000/60);
    }



    applyGravityX() {
        setInterval(() => {
            if (this.isMoving()) {
                this.slowDownX();
            }
        },1000/60);
    }


    clearGravity() {
        clearInterval(this.gravityInterval);
        this.gravityInterval=null;
    }

    
    fall() {
        this.y -= this.speedY;
        this.speedY -= this.accelerationY;    
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
        return this.speed != 0;
    }


    get isMovingLeft() {
        if (this instanceof Character) return this.flip;  //  || this instanceof Endboss
        return !this.flip;
    } 

    get isMovingRight() {
        if (this instanceof Character) return !this.flip;
        return this.flip;
    } 


    moveRight(sound=null) {
        this.x+=this.speed;
        this.flip=!this.FLIPIMG;
        if (sound) sound.play();
        this.direction=1;
    }


    moveLeft(sound=null) {
        this.x-=this.speed;
        this.flip=this.FLIPIMG;
        if (sound) sound.play();
        this.direction=-1;
    }

    moveUp(dy=this.speedY) {
        this.y-=Math.abs(dy);
    } 


    getRandom(min,max) {
        return min+Math.random()*(max-min);
    }


    jump(random=null) {
        let height=this.jumpHeight;
        if (random) {
            if (typeof random === "boolean") {
                height=this.getRandom(this.jumpHeight*0.25,this.jumpHeight); //  Math.random()*(this.jumpHeight*0.75)+this.jumpHeight
            } 
            if (typeof random === "number") {
                height=random;
            }
        }
        this.speedY=this.jumpSpeed; 
        this.y-=height;          
    }


    jumpSmall() {
        this.speedY=this.jumpSpeed; 
        this.y-=(this.jumpHeight/2);          
    }


    isLeftFrom(obj,limit) {
        return this.getCenterX(this) < this.getCenterX(obj)-limit;
    }


    isLeftFromCharacter(limit=0) {
        return this.isLeftFrom(this.world.character,limit);
    }


    isRightFrom(obj,limit) {
        return this.getCenterX(this) > this.getCenterX(obj)+limit;
    }


    isRightFromCharacter(limit=0) {
        return this.isRightFrom(this.world.character,limit);
    }

    
    isNear(obj,range=150) {
        let enemy = this.getCenterX(this);
        let character = this.getCenterX(obj);
        return enemy > character-range && enemy < character+range;
    }    

    
    isNearCharacter(range=150) {
        return this.isNear(this.world.character,range);
    }    


    isVisible(range=500) {
        return this.isNear(this.world.character,range);
    }    
    

    stopMovingX() {
        this.speed=0;
    }

}