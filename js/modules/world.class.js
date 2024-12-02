class World {
    character = new Character();

    enemies=[
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    ctx;

    constructor(canvas) {
        console.log(canvas);
        this.ctx=canvas.getContext('2d');
        this.draw();
        // character.src='assets/img/2_character_pepe/2_walk/W-21.png';
        
    }

    draw() {
        this.ctx.drawImage(this.character.img,this.character.x,this.character.y,this.character.width,this.character.height);

        for(let chicken of this.enemies) {
            this.ctx.drawImage(chicken.img,chicken.x,chicken.y,chicken.width,chicken.height);

        }

    }
}