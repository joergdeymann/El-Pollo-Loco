class World {
    character = new Character();

    enemies=[
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    clouds=[
        new Cloud('./assets/img/5_background/layers/4_clouds/1.png'),
        new Cloud('./assets/img/5_background/layers/4_clouds/2.png'),
        new Cloud('./assets/img/5_background/layers/4_clouds/1.png'),
        new Cloud('./assets/img/5_background/layers/4_clouds/2.png'),
    ];

    backgrounds=[
        new Background('./assets/img/5_background/layers/air.png',0),
        new Background('./assets/img/5_background/layers/3_third_layer/1.png',0),
        new Background('./assets/img/5_background/layers/2_second_layer/1.png',0),
        new Background('./assets/img/5_background/layers/1_first_layer/1.png',0),
        
    ];
    
    ctx;
    canvas;

    constructor(canvas) {
        this.canvas=canvas;
        console.log(canvas);
        this.ctx=canvas.getContext('2d');
        this.ctx.size=this.canvas;
//         {width:this.canvas.width,height:this.canvas.height};
        this.draw();        
    }


    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        // this.ctx.canvas=canvas; 
        // this.ctx.drawImage(this.character.img,this.character.x,this.character.y,this.character.width,this.character.height);

        this.addToMap(this.backgrounds);
        this.addToMap(this.clouds);
        this.character.draw(this.ctx);
        this.addToMap(this.enemies);

        requestAnimationFrame(() => this.draw());


    }

    addToMap(objects) {
        for(let object of objects) {
            object.draw(this.ctx);
        }
    }
}