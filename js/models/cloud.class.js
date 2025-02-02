class Cloud extends MovableObject {
    static id=0;
    width=300;
    height=120;

    //Speed Settings for each Cloud
    speedtype=1;
    speedRange=0.2;
    speedMin=0.2;
    speedMax=2;
    speedIntervalRange=5000;
    speedIntervalMin=5000;

    constructor(image) {
        super();
        this.loadImage(image); 
        this.init();
        Cloud.id++;
    } 

    init() {
        this.initStartPosition();
        this.adjustSpeed();
        this.initListenerMoveLeft(); 
        this.initListenerLeftPosition(); 
    }


    initListenerLeftPosition() {
        setInterval(() => {
            if (this.x < -this.width) this.newStartPosition(); // Map Width
        },1000)
    }


    initStartPosition() {
        if (this.world?.level?.width) {
            this.setRandomStartPositionX(); 
            this.setRandomPositionY();
            this.speed=0.3;    
        } else {
            setTimeout(() => this.initStartPosition(),50);
        }
    }


    setRandomPositionX() {
        this.x = Math.random()*2000 + this.world.level.width;
    }


    setRandomPositionY() {
        this.y=-15+Math.random()*100;
    }


    respawn() {
        super.respawn();
        this.setRandomPositionY(); 
    } 


    newStartPosition() {
        this.setRandomPositionX(); 
        this.setRandomPositionY(); 
    }
}
