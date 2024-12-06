class Level {
    enemies;
    clouds;
    backgrounds;
    width;
    
    constructor(enemies,clouds,backgrounds) {
        this.enemies=enemies;
        this.clouds=clouds;
        this.backgrounds=backgrounds;

        this.addBackgrounds(5);
    }


    addBackgrounds(size) {
        let position= this.backgrounds[0].width-1;
        let parts = 2;
        let counter =this.backgrounds.length/parts;
        this.width=size*parts*position;

        for(let i=1;i<=size;i++) {
            for (let k=0;k<parts;k++) {
                for (let j=counter*k;j<counter*(k+1);j++) {
                    this.backgrounds.push(new Background(this.backgrounds[j].img.src,i*2*position+k*position));
                }
            }
        }


    }

}