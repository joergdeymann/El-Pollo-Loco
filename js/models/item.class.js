class Item {
    index=0;
    images=[];
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

    loadImages(images) {
        for(let path of images) {
            let img = new Image();
            img.src= path;
            this.images.push(img);  //# im Video as JSON this.images[path]=path;
        }
        this.img=this.images[0];
    }

    nextImage() {
        this.img=this.images[this.index];
        this.index=++this.index % this.images.length;
    }

    draw(ctx) {
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        // requestAnimationFrame(function () {self.draw(ctx)});
    }
}