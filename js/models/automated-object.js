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
    stoptimer=false;
    respawnInterval=null;
    moveInterval=null;


    constructor() {
        super()

    }



    // ab hier die Action Objects
    initListenerMoveLeft() {
        if (this.moveInterval) return;
        setInterval(() => {
            this.x-=this.speed;
        },1000/60)        
    }

    initListenerLeftPosition() {
        if (this.respawnInterval) return;
        this.respawnInterval=setInterval(() => {
            if (this.x < -this.width) this.respawn(); 
        },1000)
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
        if (this.speedType==0)  this.adjustSpeedRandom(); 
        if (this.speedType==1)  this.adjustSpeedSmooth(); 
        
        if (!this.stoptimer) this.adjustSpeedTimer();
        
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