class Statusbar extends DrawableObject {
    IMAGES_LIVE=[
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    IMAGES_COINS=[
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    IMAGES_BOTTLES=[
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    IMAGES_ENDBOSS=[
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
    ];

    percentage=100;
    x=10;
    y=0;
    width=200;
    height=40;
    imageSet;


    constructor(images,positionX,positionY) {
        super();
        this.imageSet=images;
        this.loadImages(this[images]);
        this.setPercentage(this.getPercentageStart(images));
        this.y=positionY;
        this.x=positionX;
    }
    getPercentageStart(images) {
        let i={
            IMAGES_LIVE:100,
            IMAGES_COINS:0,
            IMAGES_BOTTLES:0,
            IMAGES_ENDBOSS:50,
        }
        return i[images];
    }

    setPercentage(p) {
        this.percentage=p;
        let index=this.resolveImageIndex();
        let path=this.IMAGES[index];
        this.img = this.images[path];
    }

    resolveImageIndex() {
        if (this.percentage<0) this.percentage=0;
        if (this.percentage>100) this.percentage=100;
        return Math.floor((this.percentage+19)/20);
    }


}