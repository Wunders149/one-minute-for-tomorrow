/**
 * Enhanced Firework Animation System
 * Creates celebratory firework bursts for New Year theme
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

        // Calculate distance for consistent velocity
        const distance = Math.sqrt(tx * tx + ty * ty);
        const velocity = options.velocity || 2.0; // Increased velocity (px per ms)
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
        this.rockets.push(rocket);

        setTimeout(() => {
            if (rocket.parentNode) {
                rocket.remove();
                this.rockets = this.rockets.filter(r => r !== rocket);
            }

            // Create the firework burst
            const burstType = options.burstType || 'circle';
            this.createFirework(endX, endY, {
                color: color,
                burstType: burstType,
                particleCount: options.particleCount || 80 + Math.random() * 40
            });
        }, duration * 1000);
    }

    /**
     * Create a firework burst at specified coordinates
     */
    createFirework(x, y, options = {}) {
        const particleCount = options.particleCount || 80 + Math.random() * 40;
        const colors = this.colors;
        const burstType = options.burstType || 'circle';
        const baseColor = options.color || colors[Math.floor(Math.random() * colors.length)];

        // Create central burst effect
        this.createCentralBurst(x, y, baseColor);

        // Create particles based on burst type
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle enhanced';

            // Determine particle color (can be base color or variation)
            const color = Math.random() > 0.7 ? colors[Math.floor(Math.random() * colors.length)] : baseColor;
            const size = 2 + Math.random() * 3; // Random size

            // Calculate position and velocity based on burst type
            let angle, velocity, tx, ty;

            switch(burstType) {
                case 'ring':
                    // Ring pattern - particles on the perimeter
                    angle = (Math.PI * 2 * i) / particleCount;
                    velocity = 100 + Math.random() * 150;
                    tx = Math.cos(angle) * velocity;
                    ty = Math.sin(angle) * velocity;
                    break;
                case 'star':
                    // Star pattern - alternating long and short particles
                    angle = (Math.PI * 2 * i) / particleCount;
                    const isLong = i % 5 === 0; // Every 5th particle is longer
                    velocity = isLong ? 200 + Math.random() * 100 : 80 + Math.random() * 80;
                    tx = Math.cos(angle) * velocity;
                    ty = Math.sin(angle) * velocity;
                    break;
                case 'heart':
                    // Heart pattern
                    const t = (Math.PI * 2 * i) / particleCount;
                    const scale = 100 + Math.random() * 100;
                    tx = 16 * Math.pow(Math.sin(t), 3) * scale;
                    ty = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * scale;
                    break;
                case 'circle':
                default:
                    // Standard circular burst
                    angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
                    velocity = 150 + Math.random() * 200;
                    tx = Math.cos(angle) * velocity;
                    ty = Math.sin(angle) * velocity;
                    break;
            }

            const duration = 1.5 + Math.random() * 1.5;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = color;
            particle.style.color = color;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.setProperty('--duration', duration + 's');
            particle.style.animation = `firework-burst-enhanced ${duration}s linear forwards`;

            this.container.appendChild(particle);
            this.particles.push(particle);

            // Remove particle after animation completes
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                    this.particles = this.particles.filter(p => p !== particle);
                }
            }, duration * 1000);
        }
    }

    createCentralBurst(x, y, color) {
        const burst = document.createElement('div');
        burst.className = 'firework-burst enhanced';
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';
        burst.style.background = `radial-gradient(circle, ${color || '#fff'} 0%, rgba(255,255,255,0.5) 20%, transparent 70%)`;

        this.container.appendChild(burst);
        setTimeout(() => {
            if (burst.parentNode) {
                burst.remove();
            }
        }, 600);
    }

    createRandomFirework() {
        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * (window.innerHeight * 0.5) + window.innerHeight * 0.05;
        const startX = endX + (Math.random() - 0.5) * 500;
        const startY = window.innerHeight + 10;

        // Randomly select a burst type
        const burstTypes = ['circle', 'ring', 'star', 'heart'];
        const burstType = burstTypes[Math.floor(Math.random() * burstTypes.length)];

        this.launch(startX, startY, endX, endY, { burstType: burstType });
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
     * Create a special celebration sequence
     */
    specialCelebration() {
        // Create a sequence of different firework types
        const types = ['circle', 'ring', 'star', 'heart'];
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const endX = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
                const endY = Math.random() * (window.innerHeight * 0.4) + window.innerHeight * 0.1;
                const startX = endX + (Math.random() - 0.5) * 300;
                const startY = window.innerHeight + 10;

                this.launch(startX, startY, endX, endY, {
                    burstType: types[i % types.length],
                    particleCount: 100 + Math.random() * 50
                });
            }, i * 300);
        }
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

                            this.launch(originX, window.innerHeight + 10, e.clientX + offsetX, e.clientY + offsetY, {
                                particleCount: 40 + Math.random() * 30
                            });
                        }, i * 100);
                    }
                }
            });
        }
    }

    /**
     * Clear all active fireworks
     */
    clear() {
        // Remove all particles
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.remove();
            }
        });
        this.particles = [];

        // Remove all rockets
        this.rockets.forEach(rocket => {
            if (rocket.parentNode) {
                rocket.remove();
            }
        });
        this.rockets = [];
    }
}

// Global instance
const fireworks = new FireworkSystem();
