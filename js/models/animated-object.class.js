class AnimatedObject extends MovableObject {
    intervalTime=175;
    intervalRange=50;
    images=[];
    index=0;
 
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
            this.images.push(img);  //# im Video as JSON this.images[path]=path;
        }
        this.img=this.images[0];
    }

    nextImage() {
        // this.images={};
        // path=this.IMAGES_WALKING[this.index];
        // this.img=this.images[path];

        this.img=this.images[this.index];
        this.index=++this.index % this.images.length;
    }

}