class Statusbar extends DrawableObject {
    ABSOLUTE=0;      // Displaymode
    PERCENTAGE=1;    // Displaymode

    IMAGES_LIVE=[
        './assets/img/7_statusbars/3_icons/icon_health.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    IMAGES_COINS=[
        './assets/img/7_statusbars/3_icons/icon_coin.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    IMAGES_BOTTLES=[
        './assets/img/7_statusbars/3_icons/icon_salsa_bottle.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    IMAGES_ENDBOSS=[
        'assets/img/7_statusbars/3_icons/icon_health_endboss.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
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


    percentage=100;
    x=10;
    y=0;
    width=200;
    height=40;
    imageSet;
    imgCollection=[];
    imgBackground;
    imgFront;
    association;
    displaymode=this.ABSOLUTE;
    


    constructor(images,positionX,positionY,width=200,height=40) {
        super();
        this.imageSet=images;

        this.y=positionY;
        this.x=positionX;
        this.width=width;
        this.height=height;

        //this.loadImages(this[images]);
        this.setCollection();
        this.setPercentage(this.getPercentageStart(images));

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

        return;
    }

    resolveImageIndex() {
        if (this.percentage<0) this.percentage=0;
        if (this.percentage>100) this.percentage=100;
        return Math.floor((this.percentage+19)/20);
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
        this.addImage(this.IMAGES_BAR[0],         this.x+10,  this.y);
        this.addImage(this[this.imageSet][0],     this.x -5,  this.y-10,50,50);
/*        
        this.imgBackground = new Image();
        this.imgBackground.src= this.IMAGES_BACKGROUND[0];
        this.imgFront = new Image();
        this.imgFront.src= this[this.imageSet][0];
        this.imgBar = new Image();
        this.imgBar.src= this.IMAGES_BAR[0];
        
        this.imgCollection=[
            {   
                img:this.imgBackground, 
                x:this.x+10, 
                y:this.y,
                width:this.width,
                height:this.height
            },
            {   
                img:this.imgBar, 
                x:this.x+10, 
                y:this.y,
                width:this.width,
                height:this.height
            },
            {   
                img:this.imgFront, 
                x:this.x-5, 
                y:this.y-10,
                width:50,
                height:50
            },            
        ]
*/            
    }
    
    drawImage(ctx) {
        for(let img of this.imgCollection) {
            ctx.drawImage(img.img,img.x,img.y,img.width,img.height);
        }
        this.drawText(ctx,this.association);
    }

    drawText(ctx,obj) {
        if (!obj) return;
        let img=this.imgCollection[1]
        let text;

        if (this.displaymode==this.ABSOLUTE) {
            text=obj.textLiveAbsolute;
        } else {
            text=obj.textLivePercentage;
        }

        ctx.font = '12px Arial';
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'red';        
        ctx.textBaseline = 'top';
        ctx.fillText(text,img.x+50,img.y+15);
    }




}