class MovableObject extends Item {
    speed= 0;
    speedRange=1;
    speedMin=0;
    speedMax=1;
    speedIntervalRange=5000;
    speedIntervalMin=1000;
    stoptimer=false;

    constructor() {
        super()

    }

 

    moveRight() {

    }

    initListenerMoveLeft() {
        setInterval(() => {
            this.x-=this.speed;
        },1000/60)        
    }

    jump() {
        
    }

    initListenerLeftPosition() {
        setInterval(() => {
            if (this.x < -this.width) this.x=720; // Map Width
        },1000)
    }
 

    adjustSpeedTimer() {
        setTimeout(() => this.adjustSpeed(), this.speedInterval); //First SpeedDelay
    }

    get speedInterval() {
        let intervalDelay=Math.random()*this.speedIntervalRange;
        return this.speedIntervalMin+intervalDelay;
    }

    /**
     * AdjustSpeed every 5 Seconds + random of 0-1 Seconds random
     * set speed to random of 0 to 2
     */
    adjustSpeed() {
        this.adjustSpeedRandom();
        if (!this.stoptimer) { 
            this.adjustSpeedTimer();
        }
    }

    adjustSpeedSmoth() {
        this.speed=min(max(this.speedMin,this.speed*Math.random()*this.speedRange),this.speedMax);
    }

    adjustSpeedRandom() {
        this.speed=this.speedMin+Math.random()*this.speedRange;
    }




}