class Item {
    x;
    y;
    width;
    height;
    img;
    speed=1;

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
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        // requestAnimationFrame(function () {self.draw(ctx)});
    }
}