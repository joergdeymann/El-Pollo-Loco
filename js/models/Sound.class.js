class Sound {
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
            ls: document.getElementById("img-ls")
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


    addSound(src, name, volume = 100,start = 0,stop=0) {
        let audio = new Audio(src);
        audio.volume = volume / 100;    
        audio.loop = false;
        audio.pause();

        this.sound[name]={
            audio: audio,
            start: start,
            stop: stop  
        }
    }

    
    addSounds() {
        this.addSound('../assets/sound/bottle-smash.mp3', 'bottleSmash');
        this.addSound('../assets/sound/button.mp3', 'button');       
        this.addSound('../assets/sound/chicken-jump.mp3', 'chickenJump');
        this.addSound('../assets/sound/feet-on-glass.mp3', 'feetOnGlass');
        this.addSound('../assets/sound/grunt.mp3', 'grunt');
        this.addSound('../assets/sound/hit.mp3', 'hit',1,0.1);
        this.addSound('../assets/sound/jump.mp3', 'jump',50,0.3,0.6);
        this.addSound('../assets/sound/rooster.mp3', 'rooster');    
    }

    
    play(name) {
        console.log("play sound",name);
        if (this.sound[name] && !this.isPlaying(name)) {
            // console.log("play sound is noctz playing starting:",name);
            this.sound[name].audio.currentTime = this.sound[name].start; // Reset the sound to the beginning
            this.sound[name].audio.play(); // Play the sound
            if (this.sound[name].stop) {
                let timer=(this.sound[name].stop-this.sound[name].start)*1000;
                setTimeout(() => {
                    this.sound[name].audio.pause();
                }, timer); // Stop the timer
            }
        }
    }
}
