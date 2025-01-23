let countChicken=40;
let countClouds=10;
let countBackgrounds=5;
let countBottlesGround=50;


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

let endboss=[]; 

for(i=0;i<countClouds;i++) {
    clouds.push(new Cloud('./assets/img/5_background/layers/4_clouds/1.png'));
    clouds.push(new Cloud('./assets/img/5_background/layers/4_clouds/2.png'));
}

for(i=0;i<countChicken;i++) {
    enemies.push(new Chicken());
}
endboss.push(new Endboss());
const level1= new Level(enemies,clouds,backgrounds,endboss);
// level1.width=backgrounds[0].width*(2*5+1);

let collectableObjects=[];
for (i=0;i<countBottlesGround;i++) {
    level1.collectableObjects.push(new CollectableObject());
}


