let countChicken=40; // 40;
let countClouds=10;
let countBackgrounds=10;
let countBottlesGround=50;

let clouds=[];
let enemies=[];
let endboss=[]; 

let backgrounds=[];
let collectableObjects=[];
let level1;

let coinSet=[
    [
        {x:0,   y:0},
        {x:50,  y:-50},
        {x:100, y:-75},
        {x:150, y:-90},
        {x:200, y:-75},
        {x:250, y:-50},
        {x:300, y:0},    
    ],
    [
        {x:0, y:0},
        {x:75, y:0},
        {x:150,y:0},
        {x:225, y:0},
        {x:300, y:0}
    ],
    [
        {x:0, y:0},
        {x:75, y:-50},
        {x:150,y:0},
        {x:225, y:50},
        {x:300, y:0}
    ],
    [
        {x:0, y:0},
        {x:0, y:50},
        {x:0, y:100},
        {x:0, y:150},
        {x:0, y:200}
    ],
    [
        {x:0, y:0},
        {x:50, y:50},
        {x:100, y:100},
    ],
    [
        {x:100, y:0},
        {x:50, y:50},
        {x:0, y:100},
    ],
    [
        {x:0,   y:-90},
        {x:50,  y:-75},
        {x:100, y:-50},
        {x:150, y:  0},
        {x:200, y:-50},
        {x:250, y:-75},
        {x:300, y:-90},    
    ],
    

];

let coinPositions=[
    {
        set:0,
        x:400,
        y:250
    },
    {
        set:1,
        x:900,
        y:150
    },
    {
        set:2,
        x:1400,
        y:200
    },
    {
        set:3,
        x:2000,
        y:150
    },
    {
        set:4,
        x:2400,
        y:150
    },
    {
        set:5,
        x:2700,
        y:150
    },
    {
        set:6,
        x:3300,
        y:230
    },
]


function initLevel1() {
    enemies.length=0;
    clouds.length=0;
    backgrounds.length=0;
    endboss.length=0;
    collectableObjects.length=0;
    
    clouds=[];
    enemies=[];
    endboss=[]; 
    
    backgrounds=[];
    collectableObjects=[];


        
    initBackgrounds();
    initClouds();
    initEnemies();
    
    level1= new Level(enemies,clouds,backgrounds,endboss);
    addBottles();
    addCoins();
}

function initBackgrounds() {
    backgrounds=[
        new Background('./assets/img/5_background/layers/air.png',0,0),
        new Background('./assets/img/5_background/layers/3_third_layer/1.png',0,1),
        new Background('./assets/img/5_background/layers/2_second_layer/1.png',0,2),
        new Background('./assets/img/5_background/layers/1_first_layer/1.png',0,3),
        new Background('./assets/img/5_background/layers/air.png',719,0),
        new Background('./assets/img/5_background/layers/3_third_layer/2.png',719,1),
        new Background('./assets/img/5_background/layers/2_second_layer/2.png',719,2),
        new Background('./assets/img/5_background/layers/1_first_layer/2.png',719,3) 
    ];    
}


function initClouds() {
    for(i=0;i<countClouds;i++) {
        clouds.push(new Cloud('./assets/img/5_background/layers/4_clouds/1.png'));
        clouds.push(new Cloud('./assets/img/5_background/layers/4_clouds/2.png'));
    }    
}


function initEnemies() {
    for(i=0;i<countChicken;i++) {
        enemies.push(new Chicken());
    }
    
    for(i=0;i<countChicken;i++) {
        enemies.push(new Chick());
    }
    endboss.push(new Endboss());
    
}
// level1.width=backgrounds[0].width*(2*5+1);

function addBottles() {
    for (i=0;i<countBottlesGround;i++) {
        level1.collectableObjects.push(new CollectableBottle());
    }    
}


function addCoins() {
    let backgroundSize=backgrounds[backgrounds.length-1].x-coinSet.length;

    let x=-200;

    while(true) {
        let set=Math.floor(Math.random()*coinSet.length);
        let dx=Math.random()*600+600;
        x+=dx;
        if (x > backgroundSize) break;

        y=coinPositions[set].y+Math.random()*40;

        for (let coin of coinSet[set]) {
            level1.collectableObjects.push(new CollectableCoin(coin.x*2+x,coin.y+y));
        }        
    }
    
}
