class Background extends MovableObject {
    width=720;
    height=480;
    layer=0;
    world;
    startX=0;
    
    constructor(imagePath,x,layer) {
        super();
        this.loadImage(imagePath); 

        this.speed=0;
        this.x=x;
        this.y=480-this.height;
        this.layer=layer;
        this.startX=x;
        if (layer > 0 && layer < 3) {
            setTimeout(()=> this.addPositionListener(),1000);
        }
    } 

    addPositionListener() {
        setInterval(() => {
            // this.x=this.startX-(this.world.character.x-this.world.character.startX)*this.layer/4*0.1;
            // this.x=this.startX-(this.world.character.x-this.world.character.startX)*this.layer/4*0.1;
            // this.x=this.startX+(this.world.character.x-this.world.character.startX)
            if (this.layer==2) this.x=this.startX+(this.world.character.x-this.world.character.startX)*0.1;
            if (this.layer==1) this.x=this.startX+(this.world.character.x-this.world.character.startX)*0.2;
            
        },1000/60);
    }    
}
