/**
 * Minimalist Firework Animation System
 * Optimized for performance with reduced particle counts and simpler effects.
 */
class FireworkSystem {
    constructor() {
        this.colors = [
            '#ecb613', '#fbbf24', '#f59e0b', '#fca5a5',
            '#fb7185', '#f0abfc', '#a78bfa', '#60a5fa',
            '#34d399', '#86efac', '#f87171', '#fb923c'
        ];
        this.container = document.body;
        this.particles = [];
        this.rockets = [];
    }

    /**
     * Launch a rocket from start to end, then burst
     */
    launch(startX, startY, endX, endY, options = {}) {
        const rocket = document.createElement('div');
        rocket.className = 'firework-rocket';

        const color = options.color || this.colors[Math.floor(Math.random() * this.colors.length)];
        const tx = endX - startX;
        const ty = endY - startY;

        const distance = Math.sqrt(tx * tx + ty * ty);
        const velocity = options.velocity || 1.5;
        const duration = Math.max(0.3, Math.min(0.8, distance / (velocity * 1000)));

        const angle = Math.atan2(tx, -ty);

        rocket.style.left = startX + 'px';
        rocket.style.top = startY + 'px';
        rocket.style.backgroundColor = color;
        rocket.style.setProperty('--tx', tx + 'px');
        rocket.style.setProperty('--ty', ty + 'px');
        rocket.style.setProperty('--rotate', angle + 'rad');
        rocket.style.animation = `rocket-launch ${duration}s ease-out forwards`;

        this.container.appendChild(rocket);
        this.rockets.push(rocket);

        setTimeout(() => {
            if (rocket.parentNode) {
                rocket.remove();
                this.rockets = this.rockets.filter(r => r !== rocket);
            }

            // Create a small, optimized burst
            this.createFirework(endX, endY, {
                color: color,
                particleCount: options.particleCount || 15 + Math.random() * 10
            });
        }, duration * 1000);
    }

    /**
     * Create a simple firework burst
     */
    createFirework(x, y, options = {}) {
        // Slightly increased particle count for visibility but still low
        const particleCount = options.particleCount || 25 + Math.random() * 15;
        const baseColor = options.color || this.colors[Math.floor(Math.random() * this.colors.length)];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';

            const size = 1.5 + Math.random() * 2;
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const velocity = 100 + Math.random() * 120;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            const duration = 1.0 + Math.random() * 0.5;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = baseColor;
            particle.style.color = baseColor;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.animation = `firework-burst ${duration}s ease-out forwards`;

            this.container.appendChild(particle);
            this.particles.push(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                    this.particles = this.particles.filter(p => p !== particle);
                }
            }, duration * 1000);
        }
    }

    createRandomFirework() {
        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * (window.innerHeight * 0.4) + window.innerHeight * 0.1;
        const startX = endX + (Math.random() - 0.5) * 200;
        const startY = window.innerHeight + 10;

        this.launch(startX, startY, endX, endY);
    }

    celebrateSequence(count = 3, delay = 200) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => this.createRandomFirework(), delay * i);
        }
    }

    startRain() {
        // Much lower frequency for continuous rain
        const rainInterval = setInterval(() => {
            if (Math.random() < 0.2) {
                this.createRandomFirework();
            }
        }, 3000);
        return rainInterval;
    }

    init(options = {}) {
        const { autoRain = false, clickTrigger = true } = options;

        if (autoRain) {
            this.startRain();
        }

        if (clickTrigger) {
            document.addEventListener('mousedown', (e) => {
                const target = e.target.closest('button') || e.target.closest('a');
                if (target) {
                    // Just one small burst on click
                    this.createFirework(e.clientX, e.clientY, {
                        particleCount: 15
                    });
                }
            });
        }
    }

    clear() {
        this.particles.forEach(p => p.parentNode && p.remove());
        this.particles = [];
        this.rockets.forEach(r => r.parentNode && r.remove());
        this.rockets = [];
    }
}

const fireworks = new FireworkSystem();