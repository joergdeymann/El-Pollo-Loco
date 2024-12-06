class Cloud extends MovableObject {
    count=0;
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
    } 

    init() {
        // setTimeout(() => this.initMoveLeft(), Math.random()*1000*5); //Move Delay First Time
        this.initListenerMoveLeft();       //let Cloud move dircetly
        this.initListenerLeftPosition();   //listener LeftPosition
        this.initStartPosition();          //set StartPosition
        this.adjustSpeed();
    }

    initListenerLeftPosition() {
        setInterval(() => {
            if (this.x < -this.width) this.newStartPosition(); // Map Width
        },1000)
    }

    initStartPosition() {
        this.x = Math.random()*(this.levelwidth+720); // Random Position in first screen + screensize-center 
        this.y=-15+Math.random()*100;
        this.speed=0.3;
    }

    newStartPosition() {
        this.x = Math.random()*2000 + this.world.level.levelwidth; // Random Position in first screen + screensize-center 
        if (this.x > this.world.character.x-150) this.x = this.world.character.x-150;  
        if (this.x < this.world.character.x+150) this.x = this.world.character.x+150;
        this.y=-15+Math.random()*100;
    }

}
