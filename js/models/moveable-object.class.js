class MovableObject extends Item {
    constructor() {
        super()

    }

    animateStart() {
        let interval=175+50*Math.random();
        setInterval(() => {
            this.nextImage();
        },interval);
    }


    moveRight() {

    }

    moveLeft() {
        setInterval(() => {
            this.x-=this.speed;
        },1000/60)        
    }

    jump() {
        
    }
}