let canvas; 
let world; 
let sound;
let screen;


/**
 * 
 * Start New Game each time
 * 
 */
function initGame() {
    screen.init();

    initLevel1();
    canvas = document.getElementsByTagName("canvas")[0];
    key = new Keyboard();
    world = new World(canvas,key);
    world.chooseLevel(level1);
    world.level.world=world;
    world.debug=true;
    world.sound=sound;
}


/**
 * 
 * First Initialisation
 * 
 */
function init() {
    screen=new Screen();
    sound = new Sound();
}