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
        // './assets/img/4_enemie_boss_chicken/3_attack/feather01.svg'
        './assets/img/4_enemie_boss_chicken/6_feather/feder1-gimp.svg'
    ];


    constructor(character,angel) {
        super();
        this.loadImages(this.IMAGES_THROW);

        this.throwFromObject(character,angel);
        this.init();
    } 


    init() {
        this.animationStart();
    }


    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} speed - 0-100; good values between 50 and 100;
     */
    throw(x,y,angel) {
        
        this.dx = Math.sin(angel); //Rad =1-100
        this.dy=  Math.cos(angel);

        this.x = x+this.dx*this.radiusStart;
        this.y = y+this.dy*this.radiusStart;
        this.start={x:this.x,y:this.y};

        this.interval=setInterval(() => this.movementListener(),1000/60);
    }


    throwFromObject(character,angel) {
        let x=character.getCenterX()-this.width/2;
        let y=character.getCenterY()-this.height/2;
        this.throw(x,y,angel);
        this.destroyTimer();
    }

    
    setStartposition() {
        this.radius=this.radiusStart;
        this.x=this.start.x;
        this.y=this.start.y;
    }


    removeSelf() {

    }

    stop() {
        clearInterval(this.interval);
    }


    movementListener() {
        this.x+=this.dx*this.speed;
        this.y+=this.dy*this.speed;
        this.radius+=Math.max(Math.abs(this.dx),Math.abs(this.dy));
        if (this.radius>300) this.setStartposition();
    }




    destroyTimer() {
        setTimeout(()=>{
            this.stop();
            this.removeObjectFromArray(this.world.level.enemies,this);
        },this.lifeTime)
    }

    removeObjectFromArray(array,obj) {
        const index=array.findIndex(e => e == obj);
        if (index != -1) array.splice(index,1);
    } 

 }