class Chicken extends MovableObject {
    constructor() {
        super();
        this.loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); 
        this.x = Math.random() * 400
        this.width=100;
        this.height=80;       
    } 

    pick() {

    }
}