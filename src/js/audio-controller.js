/**
 * Global Audio Controller
 * Manages continuous music playback across multiple pages using localStorage
 */
class AudioController {
    constructor(src) {
        this.src = src;
        this.audio = new Audio(this.src);
        this.audio.loop = true;
        this.audio.volume = 0.4;
        
        this.storageKeyTime = 'bg_music_time';
        this.storageKeyPlaying = 'bg_music_playing';
        
        this.init();
    }

    init() {
        // Load saved state
        const savedTime = localStorage.getItem(this.storageKeyTime);
        if (savedTime) {
            this.audio.currentTime = parseFloat(savedTime);
        }

        const isPlaying = localStorage.getItem(this.storageKeyPlaying) === 'true';
        if (isPlaying) {
            // Browsers usually block autoplay until user interaction
            this.attemptPlay();
        }

        // Periodically save time
        setInterval(() => {
            if (!this.audio.paused) {
                localStorage.setItem(this.storageKeyTime, this.audio.currentTime);
            }
        }, 1000);

        // Listen for user interaction to resume if blocked
        const resumeAudio = () => {
            if (localStorage.getItem(this.storageKeyPlaying) === 'true' && this.audio.paused) {
                this.attemptPlay();
            }
        };

        document.addEventListener('click', resumeAudio, { once: true });
        document.addEventListener('mousedown', resumeAudio, { once: true });
    }

    attemptPlay() {
        this.audio.play().then(() => {
            localStorage.setItem(this.storageKeyPlaying, 'true');
            this.updateIcons();
        }).catch(err => {
            console.log('Autoplay prevented. Waiting for user interaction.');
            this.updateIcons();
        });
    }

    toggle() {
        if (this.audio.paused) {
            this.audio.play();
            localStorage.setItem(this.storageKeyPlaying, 'true');
        } else {
            this.audio.pause();
            localStorage.setItem(this.storageKeyPlaying, 'false');
        }
        this.updateIcons();
    }

    updateIcons() {
        const icons = document.querySelectorAll('.music-toggle-icon');
        const buttons = document.querySelectorAll('.music-toggle-btn');
        const isPaused = this.audio.paused;

        icons.forEach(icon => {
            icon.textContent = isPaused ? 'volume_off' : 'volume_up';
        });

        buttons.forEach(btn => {
            if (isPaused) {
                btn.classList.add('opacity-50');
            } else {
                btn.classList.remove('opacity-50');
            }
        });
    }
}

// Initialize with the user's specific track
const bgMusic = new AudioController('/src/assets/audio/Calum Scott - You Are The Reason (Official Video).mp3');
