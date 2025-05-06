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

        "77":"MUSIC", //M
        "80":"PAUSE", //P
        "83":"SOUND", //FX SOUND S

        "79":"OVERLAY", //O
        "191":"DEBUG"      //#
    }

    KEYNAMES = {
        "37":"LEFT",
        "39":"RIGHT",
        "38":"UP", //up
        "40":"DUCK",
        "32":"SPACE",  // Jump or Fire
        "69":"E",  // E 
        "81":"Q", // Q
        "16":"SHIFT", //Shift

        "65":"A",  // A
        "68":"D", // D
        "87":"W",  // W
        "83":"S",  // S

        "77":"M", //M
        "80":"P", //P
        "83":"S", //FX SOUND S

        "79":"O", //O
        "191":"#"      //#
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
    setKey=null;


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
        console.log(key.keyCode);   
        if (this.setKey) return this.changeKey(key);
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

    setKeyChanger(key) {
        if (!document.getElementById("change-key").classList.contains("d-none")) {
            return;
        }
        document.getElementById("change-key").classList.remove("d-none");
        document.querySelector("#change-key span").innerHTML=key;

        this.setKey=key;
    }

    displayKey(keyFunction) {
        let list=Object.entries(this.KEYTABLE).filter(([k,v]) => v==keyFunction).map(([k]) => this.KEYNAMES[k].toUpperCase()).join(",");
        document.getElementById("display-"+keyFunction).innerHTML=list.toUpperCase();
    }

    changeKey(key) {
        this.KEYTABLE[key.keyCode]=this.setKey;
        this.KEYNAMES[key.keyCode]=key.key.replace("Arrow","").replace("Key","").replace(" ","SPACE");
        this.displayKey(this.setKey); 

        setTimeout(() => {
            this.setKey=null;
            document.getElementById("change-key").classList.add("d-none");
        },100);
    }
}