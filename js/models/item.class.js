class Item extends Drawable {
    x;
    y;
    width;
    height;
    img;
    speed=1;
    flip=false;
    world;
    damage={touch:1,jump:100,fire:10};
    live=100;
    collision=false;




    constructor() {
        super();
        this.x=150;
        this.y=250;
    }
    
    loadImage(path) {
        this.img= new Image();
        this.img.src= path;
    }


    setRandomPositionX() {
        this.x = Math.random()*this.world.canvas.width + this.world.level.width;
    }

    setRandomStartPositionX() {
        if (this.world?.level?.width) {
            this.x = Math.random()*this.world.level.width;
        } else {
            setTimeout(() => this.setRandomStartPositionX(),50);
        }
    }

    getCenterX(obj) {
        return obj.x+obj.width/2;
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

    getCoordinatesHitbox(obj) {
        let x=obj.x+obj.hitbox.dx;
        let y=obj.y+obj.hitbox.dy;
        let width=obj.hitbox.width;
        let height=obj.hitbox.height;
        return {x,y,width,height}
    }

    reduceLive(obj,weapon) {
        this.live-=obj.damage[weapon];
    }

    isDead() {
        return this.live<0;
    }

    resetCollision() {
        this.collision=false;
    }

    isHurt() {
        // if (this.collision) console.log("isHurt");
        return this.collision;
    }

    isColliding(obj) {        
        let hitbox=this.getCoordinatesHitbox(this);
        let hitboxOther=this.getCoordinatesHitbox(obj);
        // this.reduceLive(mo,"touch");
        let collision=this.overlap(hitbox,hitboxOther);
        if (collision) this.collision=true;

        return collision;

    } 

}