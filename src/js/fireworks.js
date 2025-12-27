/**
 * Firework Animation System
 * Creates celebratory firework bursts for New Year theme
 */
class FireworkSystem {
    constructor() {
        this.colors = ['#ecb613', '#fbbf24', '#f59e0b', '#fca5a5', '#fb7185', '#f0abfc'];
        this.container = document.body;
    }

    /**
     * Launch a rocket from start to end, then burst
     */
    launch(startX, startY, endX, endY) {
        const rocket = document.createElement('div');
        rocket.className = 'firework-rocket';
        
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const tx = endX - startX;
        const ty = endY - startY;
        
        // Calculate distance for consistent velocity
        const distance = Math.sqrt(tx * tx + ty * ty);
        const velocity = 2.0; // Increased velocity (px per ms)
        const duration = Math.max(0.2, Math.min(0.8, distance / (velocity * 1000)));
        
        const angle = Math.atan2(tx, -ty);

        rocket.style.left = startX + 'px';
        rocket.style.top = startY + 'px';
        rocket.style.backgroundColor = color;
        rocket.style.color = color;
        rocket.style.setProperty('--tx', tx + 'px');
        rocket.style.setProperty('--ty', ty + 'px');
        rocket.style.setProperty('--rotate', angle + 'rad');
        rocket.style.animation = `rocket-launch ${duration}s ease-out forwards`;

        this.container.appendChild(rocket);

        setTimeout(() => {
            rocket.remove();
            this.createFirework(endX, endY);
        }, duration * 1000);
    }

    /**
     * Create a firework burst at specified coordinates
     */
    createFirework(x, y) {
        const particleCount = 80 + Math.random() * 40;
        const colors = this.colors;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const velocity = 150 + Math.random() * 200;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            const duration = 1.2 + Math.random() * 0.8;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = color;
            particle.style.color = color;
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.animation = `firework-burst ${duration}s cubic-bezier(0.1, 0.5, 0.3, 1) forwards`;

            this.container.appendChild(particle);
            setTimeout(() => particle.remove(), duration * 1000);
        }
        this.createCentralBurst(x, y);
    }

    createCentralBurst(x, y) {
        const burst = document.createElement('div');
        burst.className = 'firework-burst';
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';

        this.container.appendChild(burst);
        setTimeout(() => burst.remove(), 600);
    }

    createRandomFirework() {
        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * (window.innerHeight * 0.5) + window.innerHeight * 0.05;
        const startX = endX + (Math.random() - 0.5) * 500; 
        const startY = window.innerHeight + 10;
        
        this.launch(startX, startY, endX, endY);
    }

    celebrateSequence(count = 5, delay = 150) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => this.createRandomFirework(), delay * i);
        }
    }

    /**
     * Start a continuous rain of fireworks
     */
    startRain() {
        const rainInterval = setInterval(() => {
            // Randomly trigger bursts or sequences
            if (Math.random() < 0.4) {
                this.celebrateSequence(Math.floor(Math.random() * 3) + 1, 100);
            }
        }, 1500);
        return rainInterval;
    }

    /**
     * Initialize automatic triggers
     */
    init(options = {}) {
        const { autoRain = true, clickTrigger = true } = options;

        if (autoRain) {
            this.startRain();
        }

        if (clickTrigger) {
            document.addEventListener('mousedown', (e) => {
                const target = e.target.closest('button') || e.target.closest('a');
                if (target) {
                    // Trigger a "mini-rain" on click
                    for (let i = 0; i < 3; i++) {
                        setTimeout(() => {
                            const offsetX = (Math.random() - 0.5) * 200;
                            const offsetY = (Math.random() - 0.5) * 100;
                            const originX = e.clientX + (Math.random() - 0.5) * 300;
                            this.launch(originX, window.innerHeight + 10, e.clientX + offsetX, e.clientY + offsetY);
                        }, i * 100);
                    }
                }
            });
        }
    }
}

// Global instance
const fireworks = new FireworkSystem();
