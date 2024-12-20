class World {
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


    ctx;
    canvas;
    key;
    cameraX=-100;

    width=720*2*5;


    constructor(canvas,keyboard) {
        this.canvas=canvas;
        this.key=keyboard;

        this.ctx=canvas.getContext('2d');
        this.ctx.size=this.canvas;

        
        // this.draw();  
    }

    chooseLevel(level) {
        this.level=level;
        this.addWorld(this.character);
        this.addWorld(this.level.enemies);  
        this.addWorld(this.level.clouds);  
        this.addWorld(this.level.endboss);  
        this.addWorld(this.level.collectableObjects);  

        this.draw();
        this.addCollisionListener();
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
                // console.log("Boss Live:",enemy.live)

            this.statusBar.ENDBOSS.setPercentage(enemy.livePercentage);
        }
    }

    addCollisionListener() {

        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        },50);
    }

    checkCollisions() {
        this.character.resetCollision();
        for (let enemy of this.level.enemies) {
            this.collisionAction(enemy);
            this.statusBar.LIVE.setPercentage(this.character.livePercentage);
        }
        for (let enemy of this.level.endboss) {
            this.collisionAction(enemy);
            this.checkCollisionThrowableObjects(enemy);
        }    

        
    }

    checkThrowObjects() {
        if (this.key.FIRE ) { // && !this.key.hasCooldown("FIRE")
            let bottle=new ThrowableBottle();            
            bottle.throwFromObject(this.character,90);
            this.throwableObjects.push(bottle);
            this.key.FIRE=false;
        }
    }



    draw() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.translate(this.cameraX,0);

        this.addToMap(this.level.backgrounds);
        this.addToMap(this.level.clouds);
        this.addToMap(this.level.endboss);
        this.character.draw(this.ctx);
        this.addToMap(this.throwableObjects);
        this.addToMap(this.level.enemies);
        this.addToMap(this.level.collectableObjects);
        // this.addToMap(this.statusBar);
        this.ctx.translate(-this.cameraX,0);

        this.addToMap(Object.values(this.statusBar)); // Als JSON JSON.parse(jsonString);
        // statusBar.draw(this.ctx);

        requestAnimationFrame(() => this.draw());


    }

    addToMap(objects) {
        for(let object of objects) {
            object.draw(this.ctx);
        }
    }

}