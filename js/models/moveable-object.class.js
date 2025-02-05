class MovableObject extends AutomatedObject {
    speedY=1;
    accelerationY=0.2;
    accelerationX=0.1;
    direction=0;
    jumpHeight=100;

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
        this.flip=!this.FLIP;
        if (sound) sound.play();
        this.direction=1;
    }


    moveLeft(sound=null) {
        this.x-=this.speed;
        this.flip=this.FLIP;
        if (sound) sound.play();
        this.direction=-1;
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
        this.speedY=3; 
        this.y-=height;          
    }


    jumpSmall() {
        this.speedY=3; 
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
    

    stopMovingX() {
        this.speed=0;
    }

}