// extends ActionOnjects, 
// hier solllen nur die direkten Movements rein

class MovableObject extends AutomatedObject {
    speed= 0;
    speedType=0;
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

    jump() {
        
    }





    isLeftFromCharacter() {
        return this.getCenterX(this) < this.getCenterX(this.world.character);
    }

    isRightFromCharacter() {
        return this.getCenterX(this) > this.getCenterX(this.world.character);
    }

    // this.x + this.width/2
    isNearCharacter() {
        let enemy = this.getCenterX(this);
        let character = this.getCenterX(this.world.character);
        return enemy > character-150 && enemy < character+150;
    }    

}