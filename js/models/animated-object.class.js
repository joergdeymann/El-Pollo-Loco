class AnimatedObject extends MovableObject {
    intervalTime=175;
    intervalRange=50;
    animationInterval=null;
    images={};
    index=0;
    IMAGES=[];


    constructor() {
        super()
    }


    setInterval(time,range) {
        this.intervalTime=time;
        this.intervalRange=range;
    }


    randomInterval() {
        return this.intervalTime+this.intervalRange*Math.random();
    }


    animationStart() {
        if (this.animationInterval) return;
        let interval=this.randomInterval();
        this.animationInterval=setInterval(() => {
            this.nextImage();
        },interval);
    }


    stopAnimation() {
        clearInterval(this.animationInterval);
        this.animationInterval=null;
    }


    loadImages(images) {
        for(let path of images) {
            let img = new Image();
            img.src= path;
            this.images[path]=img; 
        }
        this.img=this.images[images[0]];
        if (this.IMAGES.length == 0) this.IMAGES=images;
    }

    
    nextImage(images=this.IMAGES) {
        this.IMAGES=images; 
        this.index=this.index % this.IMAGES.length;
        let path=this.IMAGES[this.index];
        this.img=this.images[path];
        ++this.index;
    }


    setImages(images) {
        if (this.IMAGES != images) {
            this.index=0;
            this.nextImage(images);
        }
    }

    isImageSet(images) {
        return this.IMAGES == images;
    }


    attack() {
    }

}