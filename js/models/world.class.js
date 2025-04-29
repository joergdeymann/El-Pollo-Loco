class World {
    ctx;
    canvas;
    key;
    sound
    cameraX=-100;
    debug=true;
    character=new Character();
    gameover=new Gameover();
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
    scaleX=null;
    scaleY=null;

    
    /**
     * 
     * Constructor for the World
     * 
     * @param {Element} canvas - Our Visual Gamne GUI 
     * @param {Object} keyboard - ask for the allowed Key we pressed
     *  
     */
    constructor(canvas,keyboard) {
        this.canvas=canvas;
        this.key=keyboard;

        this.ctx=canvas.getContext('2d');
    }

    /**
     * 
     * Choose the Level we want to play
     * and add the world
     * 
     * @param {Object} level - the Level we created 
     */
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
        this.addWorld(this.gameover);  

        this.draw();
        this.addCollisionListener();
        this.addStatusbarAssosiation();
        this.addBackgroundListener();
    }


    /**
     * 
     * Add World to all Drawable Objects
     * 
     * @param {Object} objects 
     * @returns 
     */
    addWorld(objects) {
        if (!Array.isArray(objects)) {
            objects.world=this;
            return;
        }
        for(let object of objects) {
            object.world=this;
        }
    }


    /**
     * 
     * Reduce Live of of any Enemy
     * 
     * @param {Object} enemy - The enemy thatr looses its Live and dies
     * @returns 
     */
    enemyDie(enemy) {
        if (enemy.isDead()) return;
        enemy.reduceLive(this.character,"jump");

        if (enemy instanceof ThrowableBossObject) return;
        this.character.jumpSmall();
    }


    /**
     * 
     * Reduce Live of Character when attacked from Enemy
     * 
     * @param {Object} enemy 
     */
    enemyAttack(enemy) {
        if (enemy.isAboveGround()) {
            this.character.reduceLive(enemy,"jump");
        } else {
            this.character.reduceLive(enemy,"touch");
        }

        // if (this.character.isHurt() ) {
        //     console.log("Hurt Sound ind World");
        //     this.sound.play('hit');
        // }
    }


    /**
     * 
     * Check collision: 
     *  Character with enemy, 
     *  Enemy is attacked
     * 
     * @param {Object} enemy - Chicken / Chicks 
     */
    collisionActionEnemy(enemy) {
        if (this.character.isColliding(enemy)) {
            if (this.character.isFalling()) {
                if( !enemy.isDead()) this.sound.play('squish');
                this.enemyDie(enemy);
            } else {
                this.enemyAttack(enemy);
            }
        } 
    }


    /**
     * 
     * Check collision: 
     *  Character with enemy, 
     *  Character is attacked
     * 
     * @param {Object} enemy - Chicken / Chicks / Endboss
     *  
     */
    collisionAction(enemy) {
        if (this.character.isColliding(enemy)) {
            this.enemyAttack(enemy); // this.character.reduceLive(enemy,"touch");
            enemy.setAttackImages();
        }

    }


    /**
     * Colliding enemy width thrown Bottle
     * 
     * @param {Object} enemy - Chicken / Chicks / Endboss
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


    /**
     * 
     * Activate Endboss Attackls when seen
     * 
     */
    checkEndbossAttacks(enemy) {
        if (enemy.attack.earthquake && !this.character.isAboveGround()) {
            this.character.reduceLive(enemy,"earthquake");
        }
    }


    /**
     * 
     * Check collisions
     * 
     */
    addCollisionListener() {
        if (this.collisionInterval) return;
        this.collisionInterval=setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.level.endboss[0].activateCheck();
        },50);
    }

    /**
     * 
     * Stop all Collission Events
     * 
     */
    stopCollisionListener() {
        clearInterval(this.collisionInterval);
        this.collisionInterval=null;
    }

    /**
     * 
     * Add Statusbar to the character and endboss
     * 
     */
    addStatusbarAssosiation() {
        this.statusBar.ENDBOSS.association=this.level.endboss[0];
        this.statusBar.LIVE.association=this.character;
        this.statusBar.BOTTLES.association=this.character;
        this.statusBar.COINS.association=this.character;
    }

    /**
     * Movement of Background
     * 
     */
    addBackgroundListener() {  
        for(let bg of this.level.backgrounds) {
            bg.addListener();
        }
    }


    /**
     * 
     * Check collisions of Collectable Items
     * and Collect them
     * 
     * @param {Object} item 
     */
    checkCollisionCollectableObjects(item) {

        if (this.character.isColliding(item)) {

            if (item instanceof CollectableBottle && this.character.hasBottleSpace()) {
                this.sound.play('bottle');
                this.character.addBottle();
                item.removeSelf();
                this.statusBar.BOTTLES.setPercentage(this.character.bottlesPercentage);    
            } else 
            if (item instanceof CollectableCoin) {
                this.sound.play('coin');
                this.character.addCoin();
                item.removeSelf();
                this.statusBar.COINS.setPercentage(this.character.coinsPercentage);    
            }

        }
    }


    /**
     * Check Collision : 
     * Character width enemy,endboss,bottle
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
            this.checkEndbossAttacks(enemy);
        }    


        for (let bottle of this.level.collectableObjects) {
            this.checkCollisionCollectableObjects(bottle);
        }

        for (let bottle of this.throwableObjects) {
            if (bottle instanceof ThrowableBottle && 
                bottle.isDead() && 
                bottle.isColliding(this.character) &&
                (this.key.RIGHT || this.key.LEFT)
            )   {
                this.sound.play('feetOnGlass');
            }
        }

        
    }


    /**
     * 
     * throw a bottle to Attack
     */
    throwBottle() {
        let bottle=new ThrowableBottle();            
        bottle.throwFromObject(this.character,90);
        bottle.addSound(this.sound);
        this.throwableObjects.push(bottle);
    }


    /**
     * 
     * Cheks if Player pressed Fire 
     * and throws a bottle if one or more is in inventory
     * 
     */
    checkThrowObjects() {
        if (this.key.FIRE && this.character.hasBottle() ) { 
            this.key.FIRE=false;
            this.throwBottle();
            this.character.removeBottle();
            this.statusBar.BOTTLES.setPercentage(this.character.bottlesPercentage);
        }
    }


    /**
     * 
     * Graphical Display of all Elements
     * 
     */
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
        this.gameover.draw(this.ctx);
        requestAnimationFrame(() => this.draw());
    }


    /**
     * Adds multipe Objects to the Graphical Display
     * 
     * @param {Array} objects - Enemies, Endboss, Charater, Clouds, Bottles Backgrounds 
     */
    addToMap(objects) {
        for(let object of objects) {
            object.draw(this.ctx);
        }
    }

}