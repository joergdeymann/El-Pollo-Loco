class World {
    character = new Character();

    enemies=[
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    clouds=[
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ];
    
    ctx;
    canvas;

    constructor(canvas) {
        this.canvas=canvas;
        console.log(canvas);
        this.ctx=canvas.getContext('2d');
        this.draw();        
    }

    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.character.draw(this.ctx);
        // this.ctx.drawImage(this.character.img,this.character.x,this.character.y,this.character.width,this.character.height);

        for(let enemy of this.enemies) {
            enemy.draw(this.ctx);
        }
        for(let cloud of this.clouds) {
            cloud.draw(this.ctx);
        }
        requestAnimationFrame(() => this.draw());


    }
}