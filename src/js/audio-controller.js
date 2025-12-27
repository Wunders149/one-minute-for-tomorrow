/**
 * Global Audio Controller
 * Manages continuous music playback across multiple pages using localStorage
 */
class AudioController {
    constructor(src, title, artist) {
        this.src = src;
        this.title = title || 'Unknown Title';
        this.artist = artist || 'Unknown Artist';
        
        this.audio = new Audio(this.src);
        this.audio.loop = true;
        this.audio.volume = 0.4;
        
        this.storageKeyTime = 'bg_music_time';
        this.storageKeyPlaying = 'bg_music_playing';
        
        this.init();
    }

    init() {
        const savedTime = localStorage.getItem(this.storageKeyTime);
        if (savedTime) this.audio.currentTime = parseFloat(savedTime);

        const isPlaying = localStorage.getItem(this.storageKeyPlaying) === 'true';
        
        setInterval(() => {
            if (!this.audio.paused) {
                localStorage.setItem(this.storageKeyTime, this.audio.currentTime);
            }
        }, 1000);

        const resumeAudio = () => {
            if (localStorage.getItem(this.storageKeyPlaying) === 'true' && this.audio.paused) {
                this.play();
            }
        };

        document.addEventListener('click', resumeAudio, { once: true });
        
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'm' && !e.target.tagName.match(/TEXTAREA|INPUT/)) {
                this.toggle();
            }
        });

        // Auto-inject UI if not present
        window.addEventListener('DOMContentLoaded', () => {
            this.renderUI();
            if (isPlaying) this.play();
        });
    }

    renderUI() {
        // Find or create container
        let container = document.getElementById('music-control-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'music-control-container';
            container.className = 'fixed top-4 right-6 z-[100]';
            document.body.appendChild(container);
        }

        container.innerHTML = `
            <div id="musicCapsule" class="music-capsule" onclick="bgMusic.toggle()">
                <div class="visualizer">
                    <div class="vis-bar"></div>
                    <div class="vis-bar"></div>
                    <div class="vis-bar"></div>
                </div>
                <div class="music-info">
                    <span class="music-title">${this.title}</span>
                    <span class="music-artist">${this.artist}</span>
                </div>
                <span id="musicIcon" class="material-symbols-outlined text-[20px] ml-auto text-primary">
                    ${this.audio.paused ? 'volume_off' : 'volume_up'}
                </span>
            </div>
        `;
        this.updateUI();
    }

    play() {
        this.audio.play().then(() => {
            localStorage.setItem(this.storageKeyPlaying, 'true');
            this.updateUI();
        }).catch(() => this.updateUI());
    }

    pause() {
        this.audio.pause();
        localStorage.setItem(this.storageKeyPlaying, 'false');
        this.updateUI();
    }

    toggle() {
        if (this.audio.paused) this.play();
        else this.pause();
    }

    updateUI() {
        const capsule = document.getElementById('musicCapsule');
        const icon = document.getElementById('musicIcon');
        if (!capsule || !icon) return;

        if (this.audio.paused) {
            capsule.classList.remove('is-playing');
            icon.textContent = 'volume_off';
        } else {
            capsule.classList.add('is-playing');
            icon.textContent = 'volume_up';
        }
    }
}

// Initialize with the user's specific track
const bgMusic = new AudioController(
    '/src/assets/audio/Calum Scott - You Are The Reason (Official Video).mp3',
    'You Are The Reason',
    'Calum Scott'
);
