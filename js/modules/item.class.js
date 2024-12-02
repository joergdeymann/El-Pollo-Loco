class Item {
    index=0;
    images=[];
    x;
    y;
    width;
    height;
    img;


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

    addImages(images) {
        for(let image of images) {
            let img = new Image(image);
            this.images.add(img);
        }
    }

    nextImage() {
        this.index=++this.index % this.images.length;
    }
}