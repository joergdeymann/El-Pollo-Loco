class Background extends MovableObject {
    width=720;
    height=480;
    layer=0;
    world;
    startX=0;
    startY=0;
    
    constructor(imagePath,x,layer) {
        super();
        this.loadImage(imagePath); 

        this.speed=0;
        this.x=x;
        this.y=480-this.height;
        this.layer=layer;
        this.startX=x;
        this.startY=this.y;

        if (layer > 0 && layer < 3) {
            setTimeout(()=> this.addPositionListener(),1000);
        }
    } 

    addPositionListener() {
        setInterval(() => {
            if (this.layer==2) this.x=this.startX+(this.world.character.x-this.world.character.startX)*0.1;
            if (this.layer==1) this.x=this.startX+(this.world.character.x-this.world.character.startX)*0.2;
        },1000/60);
    }
    
    setDY(dy) {
        this.y=this.startY+dy;
    }
}
