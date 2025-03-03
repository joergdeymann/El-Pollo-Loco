class Drawable {
    FLIPIMG=true;
    flip=false;  // direction the Item looks
    img;
    x;
    y;
    width;
    height;
    width;
    
    hitbox = {
        dx:0,
        dy:0,
        width:0,
        height:0
    };

    hitboxes = [];

    invisible=false;


    rect(ctx,color,size) {
        ctx.beginPath();
        ctx.strokeStyle=color;
        ctx.lineWidth='2';
        ctx.rect(size.x,size.y,size.width,size.height);
        ctx.stroke();
    }


    rectHitbox(ctx,color,size) {
        let x=size.dx+this.x;
        let y=size.dy+this.y;
        this.rect(ctx,color,{x,y,width:size.width,height:size.height})
    }


    drawRect(ctx) {
        if (!this.world?.debug) return;
        
        if (this instanceof AnimatedObject)
        {
            this.rect(ctx,'Blue',{x:this.x,y:this.y,width:this.width,height:this.height});
            this.rectHitbox(ctx,'Red',this.hitbox);
            if (this.hitboxes.length) {
                for(let hitbox of this.hitboxes) {
                    this.rectHitbox(ctx,'Yellow',hitbox);
                }
            }
        } 
    }


    drawRotatedImage(ctx) {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
    
        ctx.save(); 
    
        ctx.translate(this.x + halfWidth, this.y + halfHeight);
        ctx.rotate(this.rotation);

        ctx.drawImage(this.img, -halfWidth, -halfHeight,this.width,this.height);
    
        ctx.restore(); // Transformationszustand zurücksetzen
    }


    drawImage(ctx) {
        this.drawRotatedImage(ctx);
        // ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
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
        if (this.invisible) return;
        
        this.flipImage(ctx);
        this.drawImage(ctx);
        this.drawRect(ctx);
        this.flipImageBack(ctx);
    }


}
