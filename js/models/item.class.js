class Item extends Drawable {
    x;
    y;
    width;
    height;
    img;
    speed=1;
    flip=false;
    world;


    constructor() {
        super();
        this.x=150;
        this.y=250;
    }
    
    loadImage(path) {
        this.img= new Image();
        this.img.src= path;
    }


    setRandomPositionX() {
        this.x = Math.random()*this.world.canvas.width + this.world.level.width;
    }

    setRandomStartPositionX() {
        if (this.world?.level?.width) {
            this.x = Math.random()*this.world.level.width;
        } else {
            setTimeout(() => this.setRandomStartPositionX(),50);
        }
    }

    getCenterX(obj) {
        return obj.x+obj.width/2;
    }



}