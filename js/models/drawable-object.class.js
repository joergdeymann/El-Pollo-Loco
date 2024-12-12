class DrawableObject extends Drawable {
    x=150;
    y=250;
    height=150;
    width=100;

    img;
    images=[];
    IMAGES=[];
    currentImage =0;


    constructor() {
        super();
    }

    loadImage(path) {
        this.img= new Image();
        this.img.src= path;
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
        this.IMAGES=images; 
        this.index=this.index % this.IMAGES.length;
        let path=this.IMAGES[this.index];
        this.img=this.images[path];
        ++this.index;
    }

}