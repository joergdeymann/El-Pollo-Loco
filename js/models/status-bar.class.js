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
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    IMAGES_BOTTLES=[
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    IMAGES_ENDBOSS=[
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    ];

    percentage=100;
    x=10;
    y=0;
    width=200;
    height=40;


    constructor(images,positionY) {
        super();
        this.loadImages(this[images]);
        this.setPercentage(100);
        this.y=positionY;
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