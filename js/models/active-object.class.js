class ActiveObject extends DrawableObject {
    x=150;
    y=250;
    width;
    height;
    rotation=0;

    img;
    speed=1;
    flip=false;
    world;
    damage={touch:1,jump:100,fire:10};
    live=100;
    isHit=false;
    collision=false;
    collisionHitbox;     //the hitbox of the Multi hitbox which collided 
    hitboxes=[];
    
    harmable=true;
    active=true;
    initialLive;
    name;


    constructor() {
        super();
    }
    

    /**
     * 
     * set the live value
     * 
     * @param {int} live - the Live value the object should have 
     */
    setLive(live) {
        if (!live) live=this.live;
        this.initialLive=live;
        this.live=live;
    }


    /**
     * sets a random x position on the map
     */
    setRandomPositionX() {
        this.x = Math.random()*this.world.canvas.width + this.world.level.width;
    }


    /**
     * 
     * sets a random x position on the map for the first time
     * (waits on world class)
     */
    setRandomStartPositionX() {
        if (this.world?.level?.width) {
            // let range=this.world.level.width;
            this.x = Math.random()*this.world.level.width;
        } else {
            setTimeout(() => this.setRandomStartPositionX(),50);
        }
    }


    /**
     * 
     * get the centered x-position of an object
     * 
     * @param {obj} obj - Object that has a size 
     * @returns - returns the centered x position of the object
     */
    getCenterX(obj) {
        if (obj == null) obj=this;
        return obj.x+obj.width/2;
    }


    /**
     * 
     * get the centered y-position of an object
     * 
     * @param {obj} obj - Object that has a size 
     * @returns - returns the centered y position of the object
     */
    getCenterY(obj) {
        if (obj == null) obj=this;
        return obj.y+obj.height/2;
    }


    /**
     * Checks if 2 sqares overlap
     * 
     * @param {Object} square1          - square 1
     * @param {number} square1.x        - most left point
     * @param {number} square1.y        - most top point
     * @param {number} square1.width    - with (most right point)
     * @param {number} square1.height   - height (most bottom point)
     * @param {Object} square2          - square 2
     * @param {number} square2.x        - most left point
     * @param {number} square2.y        - most top point
     * @param {number} square2.width    - with (most right point)
     * @param {number} square2.height   - height (most bottom point)
     * @returns {boolean}               - true if overlapping otherwise false
     */
    overlap(square1, square2) {
        if (
            square1.x + square1.width <= square2.x || 
            square1.x >= square2.x + square2.width ||
            square1.y + square1.height <= square2.y ||
            square1.y >= square2.y + square2.height   
        ) {
            return false;  // no Overlap
        }

        return true; //overlap
    }


    /**
     * returns the hitbox position on the map 
     * - it is calculated from hitbox and postion on the map  
     * @param {JSON} hitbox - relative hitbox
     * @returns - returns the hitbox position on the map
     */
    getHitbox(hitbox) {
        if (!hitbox) hitbox=this.hitbox;
        if (this.flip) hitbox=this.reverseHitbox(hitbox);
        let x=this.x+hitbox.dx;
        let y=this.y+hitbox.dy;
        let width=hitbox.width;
        let height=hitbox.height;
        return {x,y,width,height}
    }


    /**
     * 
     * Reduce the live of this object
     * uses the given weapon damage
     *  
     * @param {Object} obj - enemy, character 
     * @param {string} weapon - what is used to reduce Live e.g. "touch"
     */
    reduceLiveCalculation(obj,weapon) {
        if (this.collisionRegion?.damageFactor) {
            this.live-=(obj.damage[weapon] * this.collisionRegion.damageFactor);
        } else {
            this.live-=obj.damage[weapon];
        }
        if (this.live<0) this.live=0;    

    }


    /**
     * 
     * stopps the timer and movement
     * starts a user defined method (abstract here) 
     */
    reduceLiveDie() {
        if (this.live == 0) {
            this.speed=0;
            this.stopTimer=true;
            this.die();
        }
    }


    /**
     * 
     * Reducec Live of this object from the Objects weapon
     * 
     * @param {*} obj     - Attacking Object
     * @param {*} weapon  - Attacking Weapon
     * @returns           - nothing
     */
    reduceLive(obj,weapon) {
        this.isHurtingMovement=true;
        if (obj.isDead() || !this.harmable) return;
        this.reduceLiveCalculation(obj,weapon);
        this.reduceLiveDie();
    }

    /**
     * 
     * Abstract Methode
     * handling is in Chicken Class/ Chick Class and so on
     */
    die() {

    }

    /**
     * 
     * Checks if the object is dead
     * 
     * @returns true if object is dead, otherwise false
     */
    isDead() {
        return this.live==0;
    }


    /***
     * 
     * The value of Live in Percent
     * 
     * @returns the Live as Percentage
     */
    get livePercentage() {
        return this.live*100/this.initialLive;
    }


    /***
     * 
     * The value of Live in Numbers as Text for output
     * 
     * @returns the Live as text -> absolute Number 
     */
    get textLiveAbsolute() {
        return this.live + " / " + this.initialLive;
    }


    /***
     * 
     * The value of Live in Percent as Text for output
     * 
     * @returns the Live as text -> Percent 
     */
    get textLivePercentage() {
        return this.livePercentage.toFixed(0) + " %";
    }


    /**
     * 
     * Resets the Collisin for Multi Hitboxes
     * 
     */
    resetCollision() {
        this.collision=false;
        this.isHit=false;
    }


    /**
     * Object is only hurt if hit and hamable has been activated
     * Returns the state if hurt
     * 
     * @returns - true if object is Hurt otherwise false
     */
    isHurt() {
        return this.isHit && this.harmable;
    }
    

    /**
     * 
     * Checks 
     * - if object collieded width other object,  
     * - if object is dead
     * - if object is harmable
     * 
     * @param {Object} obj - enemy or character or flask 
     * @returns true if Object can take damage
     */
    canTakeDamageFrom(obj) {
        return this.isColliding(obj) && !this.isDead() && this.harmable;
    }
    

    /**
     * 
     * Checks 
     * - if object collieded width other object,
     * - sets the hit and  hurting state 
     * 
     * @param {Object} obj - enemy or character or flask any other object 
     * @returns true if Object is colliding
     */
    isColliding(obj) {
        this.collisionRegion=null;
        if (this.hitboxes && this.hitboxes.length>0) return this.isCollidingGroup(obj);

        let hitbox=this.getHitbox();
        let hitboxOther=obj.getHitbox();
        let collision=this.overlap(hitbox,hitboxOther);
        if (collision) this.collision=true;
        if (!obj.isDead() && collision && !(obj instanceof CollectableObject)) this.isHit=true;
        if (this.isHit) this.isHurtingMovement=true;

        return collision;
    }

 
    /**
     * 
     * Checks 
     * - if object collieded width other object multi hitboxes,
     * - sets the hit and  hurting state 
     * 
     * @param {Object} obj - enemy or character or flask any other object 
     * @returns true if Object is colliding
     */
    isCollidingGroup(obj) {
        this.collision=false;
        this.isHit=false;
        let hitboxOther=obj.getHitbox();

        for (let hb of this.hitboxes) {
            let hitbox=this.getHitbox(hb);
            let collision=this.overlap(hitbox,hitboxOther);
            this.setCollisionValues(collision,obj,hb);

            if (collision) break;
        }
        return this.collision;
    }


    /**
     * Sets the Hit Values if following is set
     * - object is alive
     * - collision is given
     * - no collectable object
     * 
     * Sets collision true if any new collision detected
     * 
     * @param {*} collision - true if we have a collision
     * @param {*} obj       - the other object that collides
     * @param {*} hitbox    - hitbox
     */
    setCollisionValues(collision,obj,hitbox) {
        if (!obj.isDead() && collision && !(obj instanceof CollectableObject)) {
            this.isHit=true;
            this.collisionRegion=hitbox;
            this.isHurtingMovement=true;
        }
        if (collision) {
            this.collision=true;
            // break;
        }   
    }


    /**
     * 
     * For Multiboxes we need to recalculate the position (mirror)
     * 
     * @param {*} hitbox 
     * @returns - returns the mirrored hitbox
     */
    reverseHitbox(hitbox) {
        let xc = this.width / 2;
        let x  = 2 * xc - (hitbox.dx + hitbox.width) + 1;
        return {...hitbox, dx:x};
    }


    rotate(degree) {
        this.rotation=(this.rotation+degree)%360;
    }

    rotateTo(degree) {
        this.rotation=degree%360;        
    }
}