class Keyboard {
    KEYTABLE = {
        "37":"LEFT",
        "39":"RIGHT",
        "40":"DUCK",
        "32":"JUMP",
        "69":"FIRE",  // E 
        "81":"ALTFIRE", // Q
        "16":"FAST" //Shift
    }

    LEFT    = false;
    RIGHT   = false;
    JUMP    = false;
    FIRE    = false;
    ALTFIRE = false;
    FAST    = false;

    constructor() {
        document.addEventListener("keydown",e => this.getkeyDown(e));
        document.addEventListener("keyup",e => this.getkeyUp(e));
    }

    getkeyDown(key) {
        let keyname=this.KEYTABLE[key.keyCode];
        if (keyname) this[keyname]=true;   
        key.preventDefault(); 
        console.log(key.keyCode)
    }

    getkeyUp(key) {
        let keyname=this.KEYTABLE[key.keyCode];
        if (keyname) this[keyname]=false;    
        key.preventDefault(); 
    }


}