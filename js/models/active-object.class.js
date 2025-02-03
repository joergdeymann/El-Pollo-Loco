class ActiveObject extends DrawableObject {
    x=150;
    y=250;
    width;
    height;
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
    

    setLive(live) {
        if (!live) live=this.live;
        this.initialLive=live;
        this.live=live;
    }


    setRandomPositionX() {
        this.x = Math.random()*this.world.canvas.width + this.world.level.width;
    }


    setRandomStartPositionX() {
        if (this.world?.level?.width) {
            // let range=this.world.level.width;
            this.x = Math.random()*this.world.level.width;
        } else {
            setTimeout(() => this.setRandomStartPositionX(),50);
        }
    }


    getCenterX(obj) {
        if (obj == null) obj=this;
        return obj.x+obj.width/2;
    }


    getCenterY(obj) {
        if (obj == null) obj=this;
        return obj.y+obj.height/2;
    }


    /**
     * Überprüft, ob sich zwei Quadrate überlappen.
     * 
     * @param {Object} square1 - Das erste Quadrat.
     * @param {number} square1.x - Die x-Koordinate der linken oberen Ecke des ersten Quadrats.
     * @param {number} square1.y - Die y-Koordinate der linken oberen Ecke des ersten Quadrats.
     * @param {number} square1.width - Die Breite des ersten Quadrats.
     * @param {number} square1.height - Die Höhe des ersten Quadrats.
     * @param {Object} square2 - Das zweite Quadrat.
     * @param {number} square2.x - Die x-Koordinate der linken oberen Ecke des zweiten Quadrats.
     * @param {number} square2.y - Die y-Koordinate der linken oberen Ecke des zweiten Quadrats.
     * @param {number} square2.width - Die Breite des zweiten Quadrats.
     * @param {number} square2.height - Die Höhe des zweiten Quadrats.
     * @returns {boolean} - Gibt `true` zurück, wenn die Quadrate sich überlappen, andernfalls `false`.
     */
    overlap(square1, square2) {
        // Überprüfen, ob die Quadrate sich nicht überlappen
        if (
            square1.x + square1.width <= square2.x ||  // square1 ist links von square2
            square1.x >= square2.x + square2.width || // square1 ist rechts von square2
            square1.y + square1.height <= square2.y || // square1 ist oberhalb von square2
            square1.y >= square2.y + square2.height   // square1 ist unterhalb von square2
        ) {
            return false;
        }

        // Wenn keiner der obigen Fälle zutrifft, überlappen sich die Quadrate
        return true;
    }


    getHitbox(hitbox) {
        if (!hitbox) hitbox=this.hitbox;
        if (this.flip) hitbox=this.reverseHitbox(hitbox);
        let x=this.x+hitbox.dx;
        let y=this.y+hitbox.dy;
        let width=hitbox.width;
        let height=hitbox.height;
        return {x,y,width,height}
    }


    reduceLiveCalculation(obj,weapon) {
        if (this.collisionRegion?.damageFactor) {
            this.live-=(obj.damage[weapon] * this.collisionRegion.damageFactor);
        } else {
            this.live-=obj.damage[weapon];
        }
        if (this.live<0) this.live=0;    

    }

    reduceLiveDie() {
        if (this.live == 0) {
            this.speed=0;
            this.stopTimer=true;
            this.die();
        }
    }

    reduceLive(obj,weapon) {
        if (obj.isDead() || !this.harmable) return;
        this.reduceLiveCalculation(obj,weapon);
        this.reduceLiveDie();
    }

    /**
     * handling is in Chicken Class/ Chick Class and so on
     */
    die() {

    }


    isDead() {
        return this.live==0;
    }


    get livePercentage() {
        return this.live*100/this.initialLive;
    }


    get textLiveAbsolute() {
        return this.live + " / " + this.initialLive;
    }


    get textLivePercentage() {
        return this.livePercentage.toFixed(0) + " %";
    }


    resetCollision() {
        this.collision=false;
        this.isHit=false;
    }


    isHurt() {
        this.isHurting=this.isHurting || (this.isHit && this.harmable);
        return this.isHit && this.harmable;
    }
    

    canTakeDamageFrom(obj) {
        return this.isColliding(obj) && !this.isDead() && this.harmable;
    }
    

    isColliding(obj) {
        this.collisionRegion=null;
        if (this.hitboxes && this.hitboxes.length>0) return this.isCollidingGroup(obj);

        let hitbox=this.getHitbox();
        let hitboxOther=obj.getHitbox();
        let collision=this.overlap(hitbox,hitboxOther);
        if (collision) this.collision=true;
        if (!obj.isDead() && collision && !(obj instanceof CollectableObject)) this.isHit=true;

        return collision;
    }

 
    isCollidingGroup(obj) {
        this.collision=false;
        this.isHit=false;
        let hitboxOther=obj.getHitbox();
        for (let hb of this.hitboxes) {
            let hitbox=this.getHitbox(hb);
            let collision=this.overlap(hitbox,hitboxOther);
            if (!obj.isDead() && collision && !(obj instanceof CollectableObject)) {
                this.isHit=true;
                this.collisionRegion=hb;
            }

            if (collision) {
                this.collision=true;
                break;
            }   
        }
        return this.collision;
    }


    reverseHitbox(hitbox) {
        let xc = this.width / 2;
        let x  = 2 * xc - (hitbox.dx + hitbox.width) + 1;
        return {...hitbox, dx:x};
    }


}