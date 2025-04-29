class Sound {
    sfx=true; // Sound Effects
    sound={};
    /**
     * 
     * Initialise Background Sounds and load other Sounds
     * 
     */
    constructor() {
        this.backgroundAudio=new Audio('../assets/sound/background01.mp3');
        this.backgroundAudio.loop=true;       
        this.backgroundAudio.pause();
        this.backgroundAudio.volume=0.2;
        this.element={
            ls: document.getElementById("img-ls"),
            sfx: document.getElementById("img-sfx")
        }
        this.addSounds();
    } 
    

    /**
     * Toggle Backgrouns Music
     */
    toggleBackgroundMusic() {
        this.element.ls.classList.toggle("off");
        if (this.backgroundAudio.paused) {
            this.backgroundAudio.play();
        } else {
            this.backgroundAudio.pause();
        }
    }
    
    /**
     * Toggle SFX
     */
    toggleBackgroundSFX() {
        this.element.sfx.classList.toggle("off");
    }
    

    /**
     * Check if an Audio File is playing
     * @param {Audio} audio 
     * @returns - true if is playing
     */
    isAudioPlaying(audio) {
        return !audio.paused && !audio.ended && audio.currentTime > 0;
    }


    isPlaying(name) {
        return this.isAudioPlaying(this.sound[name].audio);        
    }


    addSound(src, name, volume = 100,start = 0,stop=0,blocking=true) {
        let audio = new Audio(src);
        audio.volume = volume / 100;    
        audio.loop = false;
        audio.pause();

        this.sound[name]={
            audio: audio,
            start: start,
            stop: stop,
            blocking: blocking   
        }
    }

    
    addSounds() {
        this.addSound('../assets/sound/bottle-smash.mp3', 'bottleSmash',10,0,0,false);
        this.addSound('../assets/sound/button.mp3', 'button');       
        this.addSound('../assets/sound/chicken-jump.mp3', 'chickenJump');
        this.addSound('../assets/sound/feet-on-glass.mp3', 'feetOnGlass',10,0,0.4);
        this.addSound('../assets/sound/grunt.mp3', 'grunt');
        this.addSound('../assets/sound/hit.mp3', 'hit',1,0.1);
        this.addSound('../assets/sound/jump.mp3', 'jump',50,0.3,0.6);
        this.addSound('../assets/sound/rooster.mp3', 'rooster');    
        this.addSound('../assets/sound/squish.mp3', 'squish',10,0,0,false);    
        this.addSound('../assets/sound/coin.mp3', 'coin',30,0,0,false);    
        this.addSound('../assets/sound/bottle.mp3', 'bottle',30,0,0,false);    
    }

    
    play(name) {
        if (this.sfx === false) return; // Sound is off
        // console.log("play sound",name);
        let sound=this.sound[name];
        let audio=sound.audio;  
        if (sound && (!this.isPlaying(name) || !sound.blocking)) {
            audio.currentTime = sound.start;
            audio.play(); 
            if (sound.stop) {
                let timer=(sound.stop-sound.start)*1000;
                setTimeout(() => {
                    audio.pause();
                }, timer); 
            }
        }
    }
}
