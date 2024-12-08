class World {
    character;
    level; 
    endboss;


    ctx;
    canvas;
    key;
    cameraX=-100;

    width=720*2*5;


    constructor(canvas,keyboard) {
        this.canvas=canvas;
        this.key=keyboard;

        this.ctx=canvas.getContext('2d');
        this.ctx.size=this.canvas;
        this.character=new Character();    
        this.addWorld(this.character);  
        
        // this.draw();  
    }

    chooseLevel(level) {
        this.level=level;
        this.addWorldOf(this.level.enemies);  
        this.addWorldOf(this.level.clouds);  
        this.addWorldOf(this.level.endboss);  

        this.draw();
    }

    addWorldOf(objects) {
        for(let object of objects) {
            object.world=this;
        }
    }

    addWorld(object) {
        object.world=this;
    }


    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.translate(this.cameraX,0);

        this.addToMap(this.level.backgrounds);
        this.addToMap(this.level.clouds);
        this.addToMap(this.level.endboss);
        this.character.draw(this.ctx);
        this.addToMap(this.level.enemies);




        this.ctx.translate(-this.cameraX,0);

        requestAnimationFrame(() => this.draw());


    }

    addToMap(objects) {
        for(let object of objects) {
            object.draw(this.ctx);
        }
    }
}