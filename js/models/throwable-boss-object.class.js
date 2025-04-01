class ThrowableBossObject extends AnimatedObject {
    x;
    y;
    width=50;
    height=60;
    img;
    speed=2;
    damage={touch:50,jump:50,fire:0};
    live=1;
    lifeTime=5000;
    radius=50;
    radiusStart=this.radius;
    harmable=false;
    usable=false;
    

    hitbox = {
        dx:2,
        dy:10,
        width: 44,
        height: 44
    }

    IMAGES_THROW=[
            './assets/img/4_enemie_boss_chicken/6_feather/feder1-gimp.svg'
    ];

    constructor(character,angel) {
        super();
        this.loadImages(this.IMAGES_THROW);

        this.throwFromObject(character,angel);
        this.init();
    } 


    /**
     * Starts the animation
     */
    init() {
        this.animationStart();
    }


    /**
     * 
     * Throws a Feather has another behaviour than a Bottle
     * 
     * @param {int} x - Direction to x 
     * @param {int} y - Direction to y
     * @param {int} angel - 0-100 Rad Direction where the Feather flys
     */
    throw(x,y,angel) {
        
        this.dx = Math.sin(angel); //Rad =1-100
        this.dy=  Math.cos(angel);

        this.x = x+this.dx*this.radiusStart;
        this.y = y+this.dy*this.radiusStart;
        this.start={x:this.x,y:this.y};

        this.interval=setInterval(() => this.movementListener(),1000/60);
        this.rotationListener();
    }


    /**
     * 
     * The Fether gets here direction and timer
     * 
     * @param {Object} character - The Player / Enemy 
     * @param {int} angel - 0-100 The Angel
     */
    throwFromObject(character,angel) {
        let x=character.getCenterX()-this.width/2;
        let y=character.getCenterY()-this.height/2;
        this.throw(x,y,angel);
        this.destroyTimer();
    }

    
    /**
     * 
     * The Position whre the Fether is moving from / starts
     * 
     */
    setStartposition() {
        this.radius=this.radiusStart;
        this.x=this.start.x;
        this.y=this.start.y;
    }


    /**
     * Overwrite the Method to do nothing
     */
    removeSelf() {
    }


    /**
     * 
     * Stop the feathers movement
     * 
     */
    stop() {
        clearInterval(this.interval);
    }


    /**
     * 
     * Listener: Rotates the feather for a smoother view
     * 
     */
    rotationListener() {
        this.rotationDegree=Math.random()*0.1+0.03;
        this.intervalRotation=setInterval(() => this.rotate(this.rotationDegree),1000/60);
    }


    /**
     * Listner: moves the Fether 
     */
    movementListener() {
        this.x+=this.dx*this.speed;
        this.y+=this.dy*this.speed;
        this.radius+=Math.max(Math.abs(this.dx),Math.abs(this.dy));
        if (this.radius>300) this.setStartposition(); 
    }


    /**
     * 
     * Destoys the Feahter when timer is reached
     * so this is removed
     * 
     */
    destroyTimer() {
        setTimeout(()=>{
            this.stop();
            this.removeObjectFromArray(this.world.level.enemies,this);
        },this.lifeTime)
    }


    /**
     * 
     * Removes a Feather tha is not used anymore
     * 
     * @param {List} array - List of Feathers, created from outside
     * @param {Object} obj - Object to remove
     * 
     */
    removeObjectFromArray(array,obj) {
        const index=array.findIndex(e => e == obj);
        if (index != -1) array.splice(index,1);
        else {
            console.error("Object nicht gefunden in thowable Boss Object");
        }
    } 
 }