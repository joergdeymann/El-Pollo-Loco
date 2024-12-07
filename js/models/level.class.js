class Level {
    enemies;
    clouds;
    backgrounds;
    endboss;
    width;
    
    constructor(enemies,clouds,backgrounds,endboss) {
        this.enemies=enemies;
        this.clouds=clouds;
        this.backgrounds=backgrounds;
        this.endboss=endboss;

        this.addBackgrounds(countBackgrounds);
    }


    addBackgrounds(size) {
        let parts = 2;
        let backgrounds =this.backgrounds.length;
        let position;
        for(let i=0;i<backgrounds*size;i++) {
            position=this.backgrounds[i].width*parts-parts+this.backgrounds[i].x;
            this.backgrounds.push(new Background(this.backgrounds[i].img.src,position));
        }

        this.width=position+this.backgrounds[this.backgrounds.length-1].width;
    }

}