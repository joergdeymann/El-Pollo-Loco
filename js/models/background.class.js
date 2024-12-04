class Background extends MovableObject {
    width=720;
    height=480;

    constructor(imagePath,x) {
        super();
        this.loadImage(imagePath); 

        // this.width=this.ctx.size.width;
        // this.height=this.ctx.size.height;
        this.speed=0;
        this.x=x;
        this.y=480-this.height;
    } 


}
