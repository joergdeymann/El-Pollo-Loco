// character = new Character();
let backgrounds=[
    new Background('./assets/img/5_background/layers/air.png',0),
    new Background('./assets/img/5_background/layers/3_third_layer/1.png',0),
    new Background('./assets/img/5_background/layers/2_second_layer/1.png',0),
    new Background('./assets/img/5_background/layers/1_first_layer/1.png',0),
    new Background('./assets/img/5_background/layers/air.png',719),
    new Background('./assets/img/5_background/layers/3_third_layer/2.png',719),
    new Background('./assets/img/5_background/layers/2_second_layer/2.png',719),
    new Background('./assets/img/5_background/layers/1_first_layer/2.png',719)
    
];

let clouds=[];

let enemies=[];

for(i=0;i<10;i++) {
    clouds.push(new Cloud('./assets/img/5_background/layers/4_clouds/1.png'));
    clouds.push(new Cloud('./assets/img/5_background/layers/4_clouds/2.png'));
}

for(i=0;i<20;i++) {
    enemies.push(new Chicken());
}

const level1= new Level(enemies,clouds,backgrounds);
level1.width=720*2*5;
