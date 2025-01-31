class Statusbar extends DrawableObject {
    ABSOLUTE=0;      // Displaymode
    PERCENTAGE=1;    // Displaymode

    IMAGES_LIVE=[
        './assets/img/7_statusbars/3_icons/icon_health.png',
    ];

    IMAGES_COINS=[
        './assets/img/7_statusbars/3_icons/icon_coin.png',
    ];

    IMAGES_BOTTLES=[
        './assets/img/7_statusbars/3_icons/icon_salsa_bottle.png',
    ];

    IMAGES_ENDBOSS=[
        'assets/img/7_statusbars/3_icons/icon_health_endboss.png',
    ];

    IMAGES_BACKGROUND=[
        'assets/img/7_statusbars/4_bar_elements/statusbar_empty.png'
    ];

    IMAGES_BAR=[
        'assets/img/7_statusbars/4_bar_elements/statusbar_blue.png'
    ];

    IMAGES_FRONT=[
        'assets/img/7_statusbars/3_icons/icon_health_endboss.png'
    ];

    CALL={
        0:{
            IMAGES_BOTTLES: "textBottlesAbsolute",
            IMAGES_COINS: "textCoinsAbsolute",
            IMAGES_LIVE: "textLiveAbsolute",
            IMAGES_ENDBOSS: "textLiveAbsolute",
        },
        1:{
            IMAGES_BOTTLES: "textBottlesPercentage",
            IMAGES_COINS: "textCoinsPercentage",
            IMAGES_LIVE: "textLivePercentage",
            IMAGES_ENDBOSS: "textLivePercentage"
        }

    }

    percentage=100;
    x=10;
    y=0;
    width=200;
    height=40;
    dx=0;
    imageSet;
    imgCollection=[];
    imgBackground;
    imgFront;
    association;
    displaymode=this.ABSOLUTE;
    keyCooldown=false;
    

    constructor(images,positionX,positionY,width=200,height=40) {
        super();
        this.imageSet=images;

        this.y=positionY;
        this.x=positionX;
        this.width=width;
        this.height=height;

        this.setCollection();
        this.setPercentage(this.getPercentageStart(images));
        this.addKeyListener();
    }

    
    getPercentageStart(images) {
        let i={
            IMAGES_LIVE:100,
            IMAGES_COINS:0,
            IMAGES_BOTTLES:0,
            IMAGES_ENDBOSS:100,
        }
        return i[images]??0;
    }


    setPercentage(p) {
        this.percentage=p;
        this.imgCollection[1].width=p*2;
        this.index=0;
        this.dx=0;
        if (this.isBottleBar()) {
            this.dx=(100-p)/100*12;
        }
        // if (this.isCoinBar()) debugger;
        return;
    }


    addKeyListener() {
        this.keyCooldown=false;
        document.addEventListener("keydown", () => {
            if (this.world.key.OVERLAY && !this.keyCooldown && this.world.key.hasCooldown("OVERLAY")) {
                this.displaymode=++this.displaymode%3;
                this.keyCooldown=true;
                setTimeout(() => {
                    this.keyCooldown=false;
                },this.world.key.COOLDOWN.OVERLAY);
            }
        })

    }

    addImage(img,x=this.x,y=this.y,width=this.width,height=this.height) {
        let newImg=new Image();
        newImg.src=img;
        this.imgCollection.push({    
            img:newImg,
            x:x, 
            y:y,
            width:width,
            height:height
        })
    }


    setCollection() {
        this.addImage(this.IMAGES_BACKGROUND[0],  this.x+10,  this.y);
        this.addImage(this.IMAGES_BAR[0],         this.x+10,  this.y,this.width-10);
        this.addImage(this[this.imageSet][0],     this.x -5,  this.y-10,50,50);
    }
    

    drawImage(ctx) {
        this.imgCollection[1].x=this.x+10+this.dx;
        for(let img of this.imgCollection) {
            ctx.drawImage(img.img,img.x,img.y,img.width,img.height);
        }
        this.drawText(ctx,this.association);
    }

    isBottleBar() {
        return this.imageSet == "IMAGES_BOTTLES";
    }

    isCoinBar() {
        return this.imageSet == "IMAGES_COINS";
    }

    XisCollectableBar() {
        return this.imageSet == "IMAGES_BOTTLES" || this.imageSet == "IMAGES_COINS";
    }

    // Hier die Anzahl der Coins / Bottles
    getDisplayMode(obj) {
        if (this.displaymode==2) return "";
        let call=this.CALL[this.displaymode][this.imageSet];
        return obj[call];
    }


    formatText(ctx) {
        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'red';        
        ctx.textBaseline = 'top';
    }


    drawText(ctx,obj) {
        if (!obj) return;
        let img=this.imgCollection[1];
        let text=this.getDisplayMode(obj);
        this.formatText(ctx);

        ctx.fillText(text,img.x+50,img.y+15);
    }
}