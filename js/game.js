let canvas; 
let world; 

function init() {
    canvas = document.getElementsByTagName("canvas")[0];
    world = new World(canvas);
    
}
