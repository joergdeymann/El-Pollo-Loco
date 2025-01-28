class World {
    ctx;
    canvas;
    key;
    cameraX=-100;

    debug=true;
    character=new Character();
    level; 
    statusBar={
        LIVE:   new Statusbar("IMAGES_LIVE",10,0),
        COINS:  new Statusbar("IMAGES_COINS",10,30),
        BOTTLES:new Statusbar("IMAGES_BOTTLES",10,60),
        ENDBOSS:new Statusbar("IMAGES_ENDBOSS",500,0),
    };
    throwableObjects = [];
    collectableObjects;


    width=720*2*5;
    

    constructor(canvas,keyboard) {
        this.canvas=canvas;
        this.key=keyboard;

        this.ctx=canvas.getContext('2d');
        this.ctx.size=this.canvas;
        // this.statusBar.BOTTLES.imgCollection[2].x=-5;
        // this.statusBar.LIVE.imgCollection[2].x=-15;
    }


    chooseLevel(level) {
        this.level=level;
        this.addWorld(this.character);
        this.addWorld(this.level.enemies);  
        this.addWorld(this.level.clouds);  
        this.addWorld(this.level.endboss);  
        this.addWorld(this.level.collectableObjects);  
        this.addWorld(Object.values(this.statusBar));  
        this.addWorld(this.level.backgrounds);  

        this.draw();
        this.addCollisionListener();
        this.addStatusbarAssosiation();
    }


    addWorld(objects) {
        if (!Array.isArray(objects)) {
            objects.world=this;
            return;
        }
        for(let object of objects) {
            object.world=this;
        }
    }



    enemyDie(enemy) {
        if (enemy.isDead()) return;
        enemy.reduceLive(this.character,"jump");
        this.character.jumpSmall();
    }


    enemyReduceLive(enemy) {
        if (enemy.isAboveGround()) {
            this.character.reduceLive(enemy,"jump");
        } else {
            this.character.reduceLive(enemy,"touch");
        }
    }


    /**
     * 
     * Check collision: Character with enemy
     * 
     * @param {Object} enemy - Chicken / Chicks 
     */
    collisionActionEnemy(enemy) {
        if (this.character.isColliding(enemy)) {
            if (this.character.isFalling()) {
                this.enemyDie(enemy);
            } else {
                this.enemyReduceLive(enemy);
            }
        } 
    }


    collisionAction(enemy) {
         if (this.character.isColliding(enemy)) {
            this.character.reduceLive(enemy,"touch");
        }
    }


    /*
        Überprüfen obj.isColliding(enemy) oder anders herunm
    */ 
    checkCollisionThrowableObjects(enemy) {
        enemy.resetCollision();
        for (let obj of this.throwableObjects) {
            if (enemy.isColliding(obj)) {
                obj.hitted(enemy);
            }
            this.statusBar.ENDBOSS.setPercentage(enemy.livePercentage);
        }
    }


    addCollisionListener() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        },50);
    }

    addLevelListener() {
        if (this.level.bottles.length<10) {
            // addMoreBottles();
        }
    }

    addStatusbarAssosiation() {
        this.statusBar.ENDBOSS.association=this.level.endboss[0];
        this.statusBar.LIVE.association=this.character;
        this.statusBar.BOTTLES.association=this.character;
    }


    checkCollisionCollectableObjects(bottle) {
        if (this.character.isColliding(bottle) && this.character.hasBottleSpace() ) {
            this.character.addBottle();
            bottle.removeSelf();
            this.statusBar.BOTTLES.setPercentage(this.character.bottlesPercentage);

        }
    }


    checkCollisions() {
        this.character.resetCollision();
        for (let enemy of this.level.enemies) {
            this.collisionActionEnemy(enemy);
            this.statusBar.LIVE.setPercentage(this.character.livePercentage);
        }

        for (let enemy of this.level.endboss) {
            this.collisionAction(enemy);
            this.checkCollisionThrowableObjects(enemy);
        }    

        for (let bottle of this.level.collectableObjects) {
            this.checkCollisionCollectableObjects(bottle);
        }            
    }


    throwBottle() {
        let bottle=new ThrowableBottle();            
        bottle.throwFromObject(this.character,90);
        this.throwableObjects.push(bottle);
    }


    checkThrowObjects() {
        if (this.key.FIRE && this.character.hasBottle() ) { 
            this.key.FIRE=false;
            this.throwBottle();
            this.character.removeBottle();
            this.statusBar.BOTTLES.setPercentage(this.character.bottlesPercentage);
        }
    }


    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.translate(this.cameraX,0);

        this.addToMap(this.level.backgrounds); // in Layer umwandeln
        this.addToMap(this.level.clouds);
        this.addToMap(this.level.endboss);
        this.character.draw(this.ctx);
        this.addToMap(this.throwableObjects);
        this.addToMap(this.level.enemies);
        this.addToMap(this.level.collectableObjects);
        this.ctx.translate(-this.cameraX,0);

        this.addToMap(Object.values(this.statusBar));
        requestAnimationFrame(() => this.draw());
    }


    addToMap(objects) {
        for(let object of objects) {
            object.draw(this.ctx);
        }
    }

}