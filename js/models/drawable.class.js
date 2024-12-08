class Drawable {
    img;
    x;
    y;
    width;
    height;
    width;


    drawRect(ctx) {
        if (this instanceof Character || this instanceof Chicken) {

            ctx.beginPath();
            ctx.strokeStyle='Blue';
            ctx.lineWidth='2';
            ctx.rect(this.x,this.y,this.width,this.height);
            ctx.stroke();
        } 
    }

    drawImage(ctx) {
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }

    flipImage(ctx) {
        if (this.flip) {
            ctx.save();
            ctx.translate(this.width,0);  
            ctx.scale(-1,1);  
            this.x=-this.x;
        }
    }

    flipImageBack(ctx) {
        if (this.flip) {
            this.x=-this.x;
            ctx.restore();
        }
    }

    draw(ctx) {
        this.flipImage(ctx);
        this.drawImage(ctx);
        this.drawRect(ctx);
        this.flipImageBack(ctx);
    }

}
