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
        const duration = 0.5 + Math.random() * 0.5;

        rocket.style.left = startX + 'px';
        rocket.style.top = startY + 'px';
        rocket.style.backgroundColor = color;
        rocket.style.setProperty('--tx', tx + 'px');
        rocket.style.setProperty('--ty', ty + 'px');
        rocket.style.boxShadow = `0 0 10px ${color}`;
        rocket.style.animation = `rocket-launch ${duration}s ease-in forwards`;

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
        const particleCount = 40 + Math.random() * 40;
        const colors = this.colors;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const velocity = 200 + Math.random() * 300;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            const duration = 1.5 + Math.random() * 0.5;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = color;
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.boxShadow = `0 0 6px ${color}`;
            particle.style.animation = `firework-burst ${duration}s ease-out forwards`;

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
        burst.style.backgroundColor = '#ecb613';
        burst.style.borderRadius = '50%';
        burst.style.boxShadow = `0 0 20px rgba(236, 182, 19, 0.8)`;

        this.container.appendChild(burst);
        setTimeout(() => burst.remove(), 1200);
    }

    createRandomFirework() {
        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * (window.innerHeight * 0.4) + window.innerHeight * 0.1;
        const startX = endX + (Math.random() - 0.5) * 100; // Slight angle
        const startY = window.innerHeight + 10;
        
        this.launch(startX, startY, endX, endY);
    }

    celebrateSequence(count = 5, delay = 300) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => this.createRandomFirework(), delay * i);
        }
    }

    /**
     * Initialize automatic triggers
     */
    init(options = {}) {
        const { autoRandom = true, randomChance = 0.2, clickTrigger = true } = options;

        if (autoRandom) {
            setInterval(() => {
                if (Math.random() < randomChance) this.createRandomFirework();
            }, 8000);
        }

        if (clickTrigger) {
            document.addEventListener('click', (e) => {
                const target = e.target.closest('button') || e.target.closest('a');
                if (target) {
                    const startX = window.innerWidth / 2;
                    const startY = window.innerHeight + 10;
                    this.launch(startX, startY, e.clientX, e.clientY);
                }
            });
        }
    }
}

// Global instance
const fireworks = new FireworkSystem();
