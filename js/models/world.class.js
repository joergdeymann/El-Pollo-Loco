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
    }


    chooseLevel(level) {
        this.character.MAX_COINS=level.collectableCoinCount;
        this.level=level;
        this.addWorld(this.level);
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


    enemyAttack(enemy) {
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
                this.enemyAttack(enemy);
            }
        } 
    }


    collisionAction(enemy) {
         if (this.character.isColliding(enemy)) {
            this.character.reduceLive(enemy,"touch");
        }
    }


    /*
        Colliding enemy width Bottle
    */ 
    checkCollisionThrowableObjects(enemy) {
        enemy.resetCollision();
        for (let obj of this.throwableObjects) {

            if (enemy.canTakeDamageFrom(obj)) {
                obj.hitted(enemy);
            }
            this.statusBar.ENDBOSS.setPercentage(enemy.livePercentage);
        }
    }

    checkEndbossActivation() {
        if (this.level.endboss[0].isNearCharacter(500) && !this.level.endboss[0].active) {
            this.level.endboss[0].activate();
        }
    }


    addCollisionListener() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkEndbossActivation();
        },50);
    }



    addStatusbarAssosiation() {
        this.statusBar.ENDBOSS.association=this.level.endboss[0];
        this.statusBar.LIVE.association=this.character;
        this.statusBar.BOTTLES.association=this.character;
        this.statusBar.COINS.association=this.character;
    }


    checkCollisionCollectableObjects(item) {

        if (this.character.isColliding(item)) {

            if (item instanceof CollectableBottle && this.character.hasBottleSpace()) {
                this.character.addBottle();
                item.removeSelf();
                this.statusBar.BOTTLES.setPercentage(this.character.bottlesPercentage);    
            } else 
            if (item instanceof CollectableCoin) {
                this.character.addCoin();
                item.removeSelf();
                this.statusBar.COINS.setPercentage(this.character.coinsPercentage);    
            }

        }
    }

    /**
     * Check Collision : Character enemy,endboss,bottle
     * 
     */
    checkCollisions() {
        this.character.resetCollision();
        for (let enemy of this.level.enemies) {
            this.collisionActionEnemy(enemy);
            this.checkCollisionThrowableObjects(enemy);
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

        this.addToMap(this.level.backgrounds); 
        this.addToMap(this.level.clouds);
        this.addToMap(this.level.collectableObjects);
        this.addToMap(this.level.endboss);
        this.character.draw(this.ctx);
        this.addToMap(this.throwableObjects);
        this.addToMap(this.level.enemies);
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