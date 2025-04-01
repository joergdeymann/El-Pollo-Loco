class Sound {
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
        
}
