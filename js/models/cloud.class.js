class Cloud extends MovableObject {
    stoptimer=false;
    count=0;
    static time;

    constructor(image) {
        super();
        this.loadImage(image); 
        this.width=300;
        this.height=120;
        this.speed=0;


        this.init();
    } 

    init() {
        setTimeout(() => this.moveLeft(), Math.random()*1000*5); //Move Delay First Time
        this.resetPosition();
        this.start();
        this.adjustSpeed();
    }

    pick() {

    }

    /**
     * AdjustSpeed every 5 Seconds + random of 0-1 Seconds random
     * set speed to random of 0 to 2
     */
    adjustSpeed() {
        this.speed=(0.2+this.speed*Math.random());
        
        let intervalDelay=Math.random()*5000;
        let intervalTime=5000;

        if (!this.stoptimer) { 
            setTimeout(() => this.adjustSpeed(), intervalTime+intervalDelay); 
        }
    }

    start() {
        this.x = Math.random()*620 +720; // Random Position in first screen + screensize-center 
        this.y=15+Math.random()*100;
        // this.speed=(0.2+this.speed*Math.random());
        // delay=Math.random*1000*10;

        // setTimeout(() => this.adjustSpeed(), Math.random*1000*10); //SpeedDelay
    }


    resetPosition() {
        setInterval(() => {
            if (this.x < -500) this.start();
        },1000)
    }

}
