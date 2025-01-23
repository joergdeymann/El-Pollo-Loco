let canvas; 
let world; 

function init() {
    canvas = document.getElementsByTagName("canvas")[0];
    key = new Keyboard();
    world = new World(canvas,key);
    world.chooseLevel(level1);
    world.debug=false;

}
