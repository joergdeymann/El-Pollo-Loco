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
        "83":"DUCK"   // S

    }

    COOLDOWN = {
        FIRE: 2000,
        ALTFIRE: 5000,
        POD: 30000,
    }

    cooldownTime = {
        FIRE: null,
        ALTFIRE: null,
    }

    idleTime=0;

    constructor() {
        document.addEventListener("keydown",e => this.getkeyDown(e));
        document.addEventListener("keyup",e => this.getkeyUp(e));
        this.setKeys(false);
    }
    
    setKeys(status) {
        for  (let key of Object.values(this.KEYTABLE)) {
            this[key]=status;
        }
    }

    getkeyDown(key) {
        let keyname=this.KEYTABLE[key.keyCode];
        if (this.hasCooldown(keyname)) return;
        if (keyname) this[keyname]=true;           
        key.preventDefault(); 
    }

    getkeyUp(key) {
        let keyname=this.KEYTABLE[key.keyCode];
        if (keyname) this[keyname]=false;    
        key.preventDefault(); 
        this.lastActionTime=Date.now();
    }

    hasCooldown(keyname) {
        let date=Date.now();
        if (this.COOLDOWN[keyname] && this.cooldownTime[keyname] && (date-this.cooldownTime[keyname])<this.COOLDOWN[keyname]) {
            // console.log("Cooldown auf ",keyname); 
            return true;
        }
        this.cooldownTime[keyname]=date;        
        return false;

    }

    isIdle() {
        console.log("Idlecheck");
        return (Date.now()-this.idleTime) > 2000;
    }

    isSleeping() {
        return (Date.now()-this.idleTime) > 10000;
    }


}