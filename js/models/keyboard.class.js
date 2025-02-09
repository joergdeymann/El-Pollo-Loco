class Keyboard {
    KEYTABLE = {
        "37":"LEFT",
        "39":"RIGHT",
        "38":"JUMP", //up
        "40":"DUCK",
        "32":"JUMP",  // Jump or Fire
        "69":"FIRE",  // E 
        "81":"ALTFIRE", // Q
        "16":"FAST", //Shift

        "65":"LEFT",  // A
        "68":"RIGHT", // D
        "87":"JUMP",  // W
        "83":"DUCK",  // S

        "79":"OVERLAY", //O
        "191":"DEBUG"      //#

    }

    COOLDOWN = {
        FIRE: 1000,
        ALTFIRE: 5000,
        POD: 30000,
        OVERLAY: 50,
        DEBUG: 50
    }

    cooldownTime = {
        FIRE: null,
        ALTFIRE: null,
        OVERLAY: null,
        DEBUG: null
    }

    lastActionTime=Date.now()+60000;

    keyDown=false;


    constructor() {
        document.addEventListener("keydown",e => this.getkeyDown(e));
        document.addEventListener("keyup",e => this.getkeyUp(e));
        this.addKeyListener();
        this.setKeys(false);
    }
    

    setKeys(status) {
        for  (let key of Object.values(this.KEYTABLE)) {
            this[key]=status;
        }
    }


    isKeyDown() {
        for  (let key of Object.values(this.KEYTABLE)) {
            if (this[key]==true) return true;
        }
        return false;
    }


    getkeyDown(key) {
        this.keyDown=true;
        let keyname=this.KEYTABLE[key.keyCode];
        if (this.hasCooldown(keyname)) return;
        if (keyname) this[keyname]=true;
        // console.log(key.keyCode);           
    }


    getkeyUp(key) {
        this.keyDown=false;
        let keyname=this.KEYTABLE[key.keyCode];
        if (keyname) this[keyname]=false;    
    }


    hasCooldown(keyname) {
        let date=Date.now();
        if (this.COOLDOWN[keyname] && this.cooldownTime[keyname] && (date-this.cooldownTime[keyname])<this.COOLDOWN[keyname]) {
            return true;
        }
        this.cooldownTime[keyname]=date;        
        return false;
    }


    isIdle() {
        let t=Date.now()-this.lastActionTime;
        return t > 2000 && t < 20000;
    }


    isSleeping() {
        let t=Date.now()-this.lastActionTime;
        return t > 20000;
    }

    addKeyListener() {
        setInterval(() => {
            if (this.isKeyDown()) this.lastActionTime=Date.now();
        },50);
    }
}