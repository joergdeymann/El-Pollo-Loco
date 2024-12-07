class Item {
    x;
    y;
    width;
    height;
    img;
    speed=1;
    flip=false;
    world;


    constructor() {
        this.x=150;
        this.y=250;
    }
    
    loadImage(path) {
        this.img= new Image();
        this.img.src= path;
    }


    draw(ctx) {
        if (this.flip) {
            ctx.save();
            ctx.translate(this.width,0);  
            ctx.scale(-1,1);  
            this.x=-this.x;
        }
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        // requestAnimationFrame(function () {self.draw(ctx)});
        if (this.flip) {
            this.x=-this.x;
            ctx.restore();
        }
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