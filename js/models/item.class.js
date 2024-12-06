class Item {
    x;
    y;
    width;
    height;
    img;
    speed=1;
    flip=0;
    levelwidth=2*720*5;
    

    constructor() {
        this.x=150;
        this.y=250;
        // this.addImages(images);
    }
    
    loadImage(path) {
        this.img= new Image();
        this.img.src= path;
        console.log(this);
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
}