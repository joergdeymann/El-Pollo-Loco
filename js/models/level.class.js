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


    /**
     * 
     * Count the Bottles
     * @returns the count of bottles
     * 
     */
    get collectableBottleCount() {
        let b=this.collectableObjects.filter(e => e instanceof CollectableBottle);
        return b.length; 
    }


    /**
     * 
     * Count the Coins
     * @returns the count of coins
     * 
     */
    get collectableCoinCount() {
        let b=this.collectableObjects.filter(e => e instanceof CollectableCoin);
        return b.length; 
    }


    /**
     * 
     * Creates a Background
     * 
     * @param {Object} backgrounds 
     * @param {int} layer 
     * @param {int} count 
     */
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
     * Creates a Background Layer for different speed for move
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

    
    /**
     * 
     * Adds additional Bottles ingame
     * 
     * @param {int} count 
     */
    addCollectableBottles(count=countBottlesGround-10) {
        for (i=0;i<count;i++) {
            let b=new CollectableBottle(this.world);
            this.collectableObjects.push(b);
        }
    }


    /**
     * 
     * set an Interval that asks if ther is still bottle on the map
     * and add new ones if empty.
     * 
     */
    addLevelListener() {
        setInterval(() => {
            if (this.collectableBottleCount == 0) {
                this.addCollectableBottles();
            }
        },200);
    }
}
