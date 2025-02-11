// extends ActionOnjects, 
// hier solllen nur die direkten Movements rein

class AutomatedObject extends ActiveObject {
    speed= 0;
    speedType=0;
    speedRange=1;
    speedMin=0;
    speedMax=1;
    speedIntervalRange=5000;
    speedIntervalMin=1000;
    stopTimer=false;
    respawnInterval=null;
    moveInterval=null;
    listenerInteval=null;
    direction=-1; //-1 for CHicken Chicks



    constructor() {
        super();
        this.setDirection(this.direction);
    }

    setDirectionLeft() {
        this.flip=!this.FLIPIMG;
        this.direction=-1;
    }

    setDirectionRight() {
        this.flip=this.FLIPIMG;
        this.direction=1;
    }

    setDirection(d) {
        if (d<0) this.setDirectionLeft();
        if (d>0) this.setDirectionRight();
    }

    changeDirection() {
        if (this.direction>0) this.setDirectionLeft();
        else if (this.direction<0) this.setDirectionRight();
    }

    getDirection() {
        return this.direction;
    }



    stopInterval() {
        clearInterval(this.moveInterval);
        clearInterval(this.respawnInterval);
    }


    initListenerReverseMove() {
        this.listenerInteval=setInterval(() => {
            let r=Math.random()*100;
            if ((this.direction<1 && r<25) || (this.direction>1 && r<75)) {
                this.changeDirection();
            }
        },5000);        
    }

    // ab hier die Action Objects
    initListenerMoveLeft() {
        if (this.moveInterval) return;

        this.moveInterval=setInterval(() => {
            this.x+=this.speed*this.direction;
        },1000/60);      
    }

    // initListenerMoveRight() {
    //     if (this.moveInterval) return;
    //     this.moveInterval=setInterval(() => {
    //         this.x+=this.speed;
    //     },1000/60);        
    // }


    initListenerLeftPosition() {
        if (this.respawnInterval) return;
        this.respawnInterval=setInterval(() => {
            if (this.x < -this.width) this.respawn(); 
            if (this.x > this.world?.level?.width) this.respawn();
        },1000);
    }
  

    adjustSpeedTimer() {
        setTimeout(() => this.adjustSpeed(), this.speedInterval);
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
        if (this.stopTimer) return;
        if (this.speedType==0)  this.adjustSpeedRandom(); 
        if (this.speedType==1)  this.adjustSpeedSmooth(); 
        
        if (!this.stopTimer)    this.adjustSpeedTimer();
        
    }


    // Relkative adjust
    adjustSpeedSmoth() {
        this.speed=min(max(this.speedMin,this.speed+Math.random()*this.speedRange-this.speedRange/2),this.speedMax);
    }


    //Absolute Adjust
    adjustSpeedRandom() {
        this.speed=this.speedMin+Math.random()*this.speedRange;
    }


    respawn() {
        let dx;
        this.setRandomPositionX(); 
        if (this.isNearCharacter()) {
            if (this.isLeftFromCharacter()) {
                dx=-150;
            } 
            else {
                dx=150;
            }
            this.x = this.world.character.x+dx;  
        }
    }


}