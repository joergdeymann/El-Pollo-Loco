class ThrowableObject extends AnimatedObject {
    sound;
    x;
    y;
    width=50;
    height=60;
    img;
    speed;
    damage={touch:10,jump:0,fire:0};
    live=1;

    hitbox = {
        dx:2,
        dy:10,
        width: 44,
        height: 24
    }

    IMAGES_THROW=[];


    constructor() {
        super();
    } 

    /**
     * 
     * Start Animation and other Secendary inits()
     *
     */
    init() {
        this.animationStart();
    }
    

    /**
     * 
     * Enables Sounds when splashing
     * 
     * @param {Sound Object} sound 
     */
    addSound(sound) {
        this.sound=sound;
    }


    /**
     * 
     * Ask if direction is Left
     * 
     * @returns - true if direction is Left 
     */
    get isMovingLeft() {
        return this.direction<0;
    }

 
    /**
     * 
     * Ask if direction is Right
     * 
     * @returns - true if direction is Right 
     */
    get isMovingRight() {
        return this.direction>0;
    }
    

    /**
     * 
     * Throw a bottle or other things (wantet to implement more)
     * @param {int} x - X Direction 
     * @param {int} y - Y Direction
     * @param {int} speed - 0-100; good values between 50 and 100;
     */
    throw(x,y,speed) {
        this.x = x;
        this.y = y;
        this.direction=(speed==0?0:speed/Math.abs(speed));
        speed=Math.abs(speed);
        this.speed=7*speed/100; // 3-8
        this.speedY=this.speed*5/7; //*50/100;
        this.applyGravity(); 
        this.applyGravityX(); 
    }


    /**
     * 
     * Throws an Object from the Charcters Center
     * 
     * @param {Object} character 
     * @param {int} speed 
     */
    throwFromObject(character,speed) {
        let dx=20;
        if (character.isMovingLeft) {
            speed=-speed;
            dx-=dx;
        } 
        let x=character.getCenterX()-this.width/2;
        let y=character.getCenterY()-this.height/2;
        this.throw(x,y,speed);
    }
 }