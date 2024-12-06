class World {
    character;
    level; // =level1;


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
        this.addWorld();  
        // this.draw();  
    }

    chooseLevel(level) {
        this.level=level;
        this.draw();
    }



    addWorld() {
        this.character.world=this;
        
    }


    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.translate(this.cameraX,0);

        this.addToMap(this.level.backgrounds);
        this.addToMap(this.level.clouds);
        this.character.draw(this.ctx);
        this.addToMap(this.level.enemies);

        this.ctx.translate(-this.cameraX,0);

        requestAnimationFrame(() => this.draw());


    }

    addToMap(objects) {
        for(let object of objects) {
            object.draw(this.ctx);
            object.world=this;
        }
    }
}