class Chicken extends MovableObject {
    stoptimer=false;
    count=0;

    IMAGES_WALKING=[
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING); 
        this.x = Math.random()*620 +720; // Random Position in first screen + screensize-center 
        this.y= 365;
        this.width=75;
        this.height=60;
        this.speed= 0;
        this.moveLeft();
        this.resetPosition();
        this.animateStart()

        setTimeout(() => this.adjustSpeed(), Math.random()*1000*10); //SpeedDelay
        

        // this.moveLeft();       
    } 

    pick() {

    }

    /**
     * AdjustSpeed every 5 Seconds + random of 0-1 Seconds random
     * set speed to random of 0 to 2
     */
    adjustSpeed() {
        this.speed=1*Math.random();

        let intervalDelay=Math.random()*5000;
        let intervalTime=1000;

        if (!this.stoptimer) { 
            setTimeout(() => this.adjustSpeed(), intervalTime+intervalDelay); 
        }
    }

    resetPosition() {
        setInterval(() => {
            if (this.x < -500) this.x=720;
        },1000)
    }

}
