/**
 * Festive Firework & Drone System
 * Optimized for performance with reduced particle counts and simpler effects.
 * Includes "Drone Show" capabilities for minimalist celebrations.
 */
class FireworkSystem {
    constructor() {
        this.colors = [
            '#FFD700', // Gold
            '#C0C0C0', // Silver
            '#ECB613', // Primary
            '#E11D48', // Festive Red
            '#22C55E', // Holiday Green
            '#3B82F6', // Ice Blue
            '#A855F7', // Royal Purple
            '#F472B6', // Pink
            '#ffffff'  // Pure White
        ];
        this.container = document.body;
        this.particles = [];
        this.rockets = [];
        this.drones = [];

        // Inject Styles dynamically
        this.injectStyles();
    }

    injectStyles() {
        if (document.getElementById('firework-style')) return;
        const style = document.createElement('style');
        style.id = 'firework-style';
        style.textContent = `
            .firework-particle { 
                position: fixed; 
                pointer-events: none; 
                border-radius: 50%; 
                z-index: 50; 
                will-change: transform, opacity;
            }
            .firework-rocket { 
                position: fixed; 
                pointer-events: none; 
                width: 3px; 
                height: 3px; 
                border-radius: 50%; 
                z-index: 50; 
                will-change: transform;
            }
            .drone-light { 
                position: fixed; 
                width: 4px; 
                height: 4px; 
                border-radius: 50%; 
                pointer-events: none; 
                z-index: 40; 
                transition: left 2.5s cubic-bezier(0.2, 0.8, 0.2, 1), top 2.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s; 
                box-shadow: 0 0 6px currentColor;
                opacity: 0;
            }
            @keyframes firework-gravity {
                0% { transform: translate(0, 0); opacity: 1; }
                100% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
            }
            @keyframes rocket-launch {
                0% { transform: translate(0, 0); opacity: 1; }
                50% { opacity: 1; }
                100% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
            }
            @keyframes drone-twinkle {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.5); opacity: 0.7; }
            }
        `;
        document.head.appendChild(style);
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
        const velocity = options.velocity || 1.2; // Slower, more majestic
        const duration = Math.max(0.5, Math.min(1.2, distance / (velocity * 800)));

        rocket.style.left = startX + 'px';
        rocket.style.top = startY + 'px';
        rocket.style.backgroundColor = color;
        rocket.style.setProperty('--tx', tx + 'px');
        rocket.style.setProperty('--ty', ty + 'px');
        rocket.style.animation = `rocket-launch ${duration}s ease-out forwards`;

        this.container.appendChild(rocket);
        this.rockets.push(rocket);

        setTimeout(() => {
            if (rocket.parentNode) {
                rocket.remove();
                this.rockets = this.rockets.filter(r => r !== rocket);
            }

            // Create a festive burst
            this.createFirework(endX, endY, {
                color: color,
                particleCount: options.particleCount || 40 + Math.random() * 20
            });
        }, duration * 1000);
    }

    /**
     * Create a simple firework burst with gravity
     */
    createFirework(x, y, options = {}) {
        const particleCount = options.particleCount || 30;
        const baseColor = options.color || this.colors[Math.floor(Math.random() * this.colors.length)];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';

            const size = 2 + Math.random() * 2;
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const velocity = 80 + Math.random() * 100; // Explosion force
            
            // Physics: Projectile motion approximation
            // x = v * cos(theta)
            // y = v * sin(theta) + gravity
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity + 100; // Add gravity drop

            const duration = 1.0 + Math.random() * 0.8;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = baseColor;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.animation = `firework-gravity ${duration}s ease-out forwards`;

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
        const startX = endX + (Math.random() - 0.5) * 100;
        const startY = window.innerHeight + 10;

        this.launch(startX, startY, endX, endY);
    }

    /**
     * Launches a minimalist drone swarm forming a ring/halo
     */
    launchDroneSwarm(count = 60) {
        // Clear old drones if any
        this.drones.forEach(d => d.remove());
        this.drones = [];

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight * 0.35;
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.25;

        for (let i = 0; i < count; i++) {
            const drone = document.createElement('div');
            drone.className = 'drone-light';
            
            // Alternating Gold and Primary colors
            const color = i % 2 === 0 ? '#FFD700' : '#ECB613';
            drone.style.backgroundColor = color;
            drone.style.color = color;
            
            // 1. Start from random bottom positions
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight + 50;
            
            drone.style.left = startX + 'px';
            drone.style.top = startY + 'px';
            
            this.container.appendChild(drone);
            this.drones.push(drone);

            // 2. Calculate target position (Circle formation)
            const angle = (i / count) * Math.PI * 2;
            const targetX = centerX + Math.cos(angle) * radius;
            const targetY = centerY + Math.sin(angle) * radius;

            // 3. Move to target after a tiny delay
            setTimeout(() => {
                drone.style.opacity = '1';
                drone.style.left = targetX + 'px';
                drone.style.top = targetY + 'px';
                
                // 4. Add subtle twinkle after arrival
                setTimeout(() => {
                    drone.style.animation = `drone-twinkle ${2 + Math.random()}s infinite alternate`;
                }, 2500);
            }, 100 + Math.random() * 300);
        }
        
        // Auto-dismiss drones after 10 seconds
        setTimeout(() => {
            this.drones.forEach(d => {
                d.style.opacity = '0';
                d.style.top = (parseInt(d.style.top) - 100) + 'px'; // Fly up and away
            });
            setTimeout(() => {
                this.drones.forEach(d => d.remove());
                this.drones = [];
            }, 1000);
        }, 12000);
    }

    celebrateSequence(count = 5, delay = 300, withDrones = false) {
        // 1. Launch Drone Show (Optional)
        if (withDrones) {
            this.launchDroneSwarm(60);
        }

        // 2. Launch Fireworks
        let i = 0;
        const interval = setInterval(() => {
            this.createRandomFirework();
            i++;
            if (i >= count) clearInterval(interval);
        }, delay);
    }

    startRain() {
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
                    this.createFirework(e.clientX, e.clientY, {
                        particleCount: 20
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
        this.drones.forEach(d => d.parentNode && d.remove());
        this.drones = [];
    }
}

const fireworks = new FireworkSystem();
