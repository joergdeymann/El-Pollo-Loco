class Level {
    enemies=[];
    clouds=[];
    backgrounds=[];
    endboss=[];
    collectableObjects=[];
    width;
    world;
    
    constructor(enemies,clouds,backgrounds,endboss) {
        this.enemies=enemies;
        this.clouds=clouds;
        this.backgrounds=backgrounds;
        this.endboss=endboss;

        this.addBackgrounds(countBackgrounds,backgrounds);
        this.addLevelListener();
    }

    addBackgroundLayer(backgrounds,layer,count) {
        let bg_layer=backgrounds.filter(e => e.layer == layer);
        let position=0;
        for (let i=0; i<count; i++) {
            for(let bg of bg_layer) {
                this.backgrounds.push(
                    new Background(bg.img.src,position,bg.layer)
                )
                position+=bg.width-1;
            }
        }
    }



    /**
     * 
     * Layer 1 Sky
     * Layer 2 Shadow 
     * layer 3 Shadow 2
     * Layer 4 Ground
     * 
     * @param {*} count 
     * @param {*} backgrounds 
     */
    addBackgrounds(count,backgrounds) {
        for (let i=0; i<4; i++) {
            this.addBackgroundLayer(backgrounds,i,count);
        }
        let lastBackground=this.backgrounds[this.backgrounds.length-1]
        this.width=lastBackground.width+lastBackground.x-1;
    }

    
    addCollectableBottles(count=countBottlesGround-10) {
        console.log("Neue Bottles");
        for (i=0;i<count;i++) {
            let b=new CollectableBottle(this.world);
            // this.world.addWorld(b);
            this.collectableObjects.push(b);
        }
    }

    get collectableBottleCount() {
        let b=this.collectableObjects.filter(e => e instanceof CollectableBottle);
        return b.length; 
    }

    get collectableCoinCount() {
        let b=this.collectableObjects.filter(e => e instanceof CollectableCoin);
        return b.length; 
    }

    addLevelListener() {
        setInterval(() => {
            if (this.collectableBottleCount<10) {
                this.addCollectableBottles();
            }
        },200);
    }
    
}
