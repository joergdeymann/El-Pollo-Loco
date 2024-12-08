class AnimatedObject extends MovableObject {
    intervalTime=175;
    intervalRange=50;
    images={};
    index=0;
    IMAGES=[];

 
    constructor() {
        super()
        // this.animationStart();
    }

    setInterval(time,range) {
        this.intervalTime=time;
        this.intervalRange=range;
    }

    randomInterval() {
        return this.intervalTime+this.intervalRange*Math.random();
    }

    animationStart() {
        let interval=this.randomInterval();
        setInterval(() => {
            this.nextImage();
        },interval);
    }

    loadImages(images) {
        for(let path of images) {
            let img = new Image();
            img.src= path;
            this.images[path]=img;  //# im Video as JSON this.images[path]=path;
        }
        this.img=this.images[images[0]];
        if (this.IMAGES.length == 0) this.IMAGES=images;
    }

    nextImage(images=this.IMAGES) {
        this.IMAGES=images; // if (images != this.IMAGES) this.IMAGES=images;
        // this.images={};
        // this.img=this.images[path];

        this.index=this.index % this.IMAGES.length;
        let path=this.IMAGES[this.index];
        this.img=this.images[path];
        ++this.index;

        // this.img=this.images[this.index];
        // this.index=++this.index % this.images.length;
    }

}