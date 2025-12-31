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
        this.drones = []; // { element, index }

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
                width: 5px; 
                height: 5px; 
                border-radius: 50%; 
                pointer-events: none; 
                z-index: 40; 
                transition: 
                    left 2s cubic-bezier(0.4, 0, 0.2, 1), 
                    top 2s cubic-bezier(0.4, 0, 0.2, 1), 
                    background-color 1.5s ease,
                    color 1.5s ease,
                    opacity 1s ease;
                box-shadow: 0 0 8px currentColor;
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
                50% { transform: scale(1.5); opacity: 0.8; }
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
        const velocity = options.velocity || 1.2;
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
            this.createFirework(endX, endY, {
                color: color,
                particleCount: options.particleCount || 40 + Math.random() * 20
            });
        }, duration * 1000);
    }

    createFirework(x, y, options = {}) {
        const particleCount = options.particleCount || 30;
        const baseColor = options.color || this.colors[Math.floor(Math.random() * this.colors.length)];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            const size = 2 + Math.random() * 2;
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const velocity = 80 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity + 100;
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

    // --- DRONE SHOW LOGIC ---

    ensureDrones(count) {
        // Add more if needed
        while (this.drones.length < count) {
            const drone = document.createElement('div');
            drone.className = 'drone-light';
            // Start from bottom center
            const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
            const startY = window.innerHeight + 50;
            drone.style.left = startX + 'px';
            drone.style.top = startY + 'px';
            this.container.appendChild(drone);
            this.drones.push(drone);
        }
        // Remove excess (optional, but keeping simple for now)
    }

    formShape(shapeType, centerX, centerY, scale) {
        const count = this.drones.length;
        if (count === 0) return;

        let coords = [];

        switch (shapeType) {
            case 'heart':
                coords = this.getHeartCoords(count, scale);
                break;
            case 'smiley':
                coords = this.getSmileyCoords(count, scale);
                break;
            case 'flag':
                coords = this.getFlagCoords(count, scale);
                break;
            case 'star':
                coords = this.getStarCoords(count, scale);
                break;
            default: // 'ring' or 'halo'
                coords = this.getRingCoords(count, scale);
                break;
        }

        this.drones.forEach((drone, i) => {
            const target = coords[i % coords.length];
            drone.style.opacity = '1';
            drone.style.left = (centerX + target.x) + 'px';
            drone.style.top = (centerY + target.y) + 'px';
            drone.style.backgroundColor = target.color;
            drone.style.color = target.color; // for box-shadow
            
            // Random twinkle offset
            setTimeout(() => {
                drone.style.animation = `drone-twinkle ${2 + Math.random()}s infinite alternate`;
            }, 2000);
        });
    }

    // -- Shape Algorithms --

    getRingCoords(count, scale) {
        const coords = [];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            coords.push({
                x: Math.cos(angle) * scale,
                y: Math.sin(angle) * scale,
                color: i % 2 === 0 ? '#FFD700' : '#ECB613' // Gold & Primary
            });
        }
        return coords;
    }

    getHeartCoords(count, scale) {
        const coords = [];
        for (let i = 0; i < count; i++) {
            const t = (i / count) * Math.PI * 2;
            // Heart formula
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            
            // Normalize roughly to -1..1 range before applying scale
            // Heart is roughly -16..16 in X and -17..12 in Y. Scale factor ~1/16
            coords.push({
                x: x * (scale / 16),
                y: y * (scale / 16),
                color: '#E11D48' // Festive Red
            });
        }
        return coords;
    }

    getSmileyCoords(count, scale) {
        const coords = [];
        // Face (Ring) - 60% of dots
        const faceCount = Math.floor(count * 0.6);
        for (let i = 0; i < faceCount; i++) {
            const angle = (i / faceCount) * Math.PI * 2;
            coords.push({
                x: Math.cos(angle) * scale,
                y: Math.sin(angle) * scale,
                color: '#FFD700' // Gold
            });
        }

        // Eyes - 10% dots (2 eyes)
        const eyeCount = Math.max(4, Math.floor(count * 0.1));
        const leftEyeX = -0.35 * scale;
        const rightEyeX = 0.35 * scale;
        const eyeY = -0.15 * scale;
        
        for (let i = 0; i < eyeCount; i++) {
            const isLeft = i < eyeCount / 2;
            coords.push({
                x: (isLeft ? leftEyeX : rightEyeX) + (Math.random() - 0.5) * 5,
                y: eyeY + (Math.random() - 0.5) * 5,
                color: '#FFD700'
            });
        }

        // Smile - 30% dots (Arc)
        const smileCount = count - faceCount - eyeCount;
        for (let i = 0; i < smileCount; i++) {
            const t = Math.PI * 0.2 + (i / smileCount) * Math.PI * 0.6; // Arc from ~36deg to ~144deg
            coords.push({
                x: Math.cos(t) * (scale * 0.6),
                y: Math.sin(t) * (scale * 0.6) + (scale * 0.1), // Offset down slightly
                color: '#FFD700'
            });
        }
        return coords;
    }

    getFlagCoords(count, scale) {
        // Malagasy Flag: 
        // Left 33% vertical strip = White
        // Right top 50% = Red
        // Right bottom 50% = Green
        
        const coords = [];
        const cols = Math.ceil(Math.sqrt(count)); 
        const rows = Math.ceil(count / cols);
        
        const width = scale * 2;
        const height = scale * 1.5;
        const startX = -width / 2;
        const startY = -height / 2;

        for (let i = 0; i < count; i++) {
            // Distribute points in a grid approx
            const row = Math.floor(i / cols);
            const col = i % cols;
            
            const xNorm = col / cols; // 0 to 1
            const yNorm = row / rows; // 0 to 1

            let color = '#ffffff'; // White default
            
            if (xNorm > 0.33) {
                if (yNorm < 0.5) {
                    color = '#E11D48'; // Red
                } else {
                    color = '#22C55E'; // Green
                }
            } else {
                color = '#ffffff'; // White
            }

            coords.push({
                x: startX + xNorm * width,
                y: startY + yNorm * height,
                color: color
            });
        }
        return coords;
    }

    getStarCoords(count, scale) {
        const coords = [];
        for (let i = 0; i < count; i++) {
            const t = (i / count) * Math.PI * 2 * 5; // 5 points
            // Parametric star approximation or simplified loop
            // Use simple 5-point logic: alternate radius
            const angle = (i / count) * Math.PI * 2;
            const segment = i % 10; // For high density, this is simpler
            // Just use a simpler interpolation between 5 points
            
            // Simple approach: Map 0..1 to the parametric boundary of a star
            const k = 5;
            const m = 0.5; // inner radius ratio
            const angleStepped = (i / count) * Math.PI * 2;
            // Radius modulation
            // r = R * (cos(pi/k) / cos(a - 2pi/k * floor((k*a + pi)/2pi))) 
            // Too complex. Simple zigzag radius.
            
            const starAngle = (i / count) * Math.PI * 2;
            // Modulate radius: 5 peaks
            // r varies from scale to scale*0.4
            const mod = Math.abs(Math.sin(starAngle * 2.5)); // 5 lobes
            // Make sharp
            const radius = scale * (0.4 + 0.6 * Math.pow(mod, 0.3)); // Sharpness
            
            // To make it look like a real star, we need better math or just plot points along lines.
            // Let's use simple logic: 5 lines out, 5 lines in.
            // Actually, simplified:
            const r = scale * (1 + 0.5 * Math.cos(5 * starAngle)); // Soft star

            coords.push({
                x: Math.cos(starAngle) * r,
                y: Math.sin(starAngle) * r,
                color: '#ECB613' // Primary
            });
        }
        return coords;
    }

    // --- ORCHESTRATION ---

    startDroneShowSequence() {
        if (this.isStopping) return;
        
        const droneCount = 80; // More drones for better shapes
        this.ensureDrones(droneCount);

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight * 0.35;
        const scale = Math.min(window.innerWidth, window.innerHeight) * 0.25;

        // Sequence
        const timeline = [
            { shape: 'ring', delay: 100 },
            { shape: 'heart', delay: 4000 },
            { shape: 'smiley', delay: 8000 },
            { shape: 'flag', delay: 12000 },
            { shape: 'star', delay: 16000 }
        ];

        timeline.forEach(step => {
            const timeout = setTimeout(() => {
                if (this.isStopping) return;
                this.formShape(step.shape, centerX, centerY, scale);
            }, step.delay);
            this.timeouts.push(timeout);
        });

        // Exit or Loop
        const exitTimeout = setTimeout(() => {
            if (this.isStopping) {
                this.drones.forEach(d => {
                    d.style.opacity = '0';
                    d.style.top = '-100px';
                });
                const cleanup = setTimeout(() => {
                    this.drones.forEach(d => d.remove());
                    this.drones = [];
                }, 2000);
                this.timeouts.push(cleanup);
            } else {
                // Loop
                this.drones.forEach(d => {
                    d.style.opacity = '0';
                });
                const loopTimeout = setTimeout(() => {
                     this.startDroneShowSequence();
                }, 2000);
                this.timeouts.push(loopTimeout);
            }
        }, 21000);
        
        this.timeouts.push(exitTimeout);
    }

    celebrateSequence(count = 5, delay = 300, withDrones = false) {
        // 1. Launch Drone Show (Optional)
        if (withDrones) {
            this.startDroneShowSequence();
        }

        // 2. Launch Fireworks
        let i = 0;
        const interval = setInterval(() => {
            this.createRandomFirework();
            i++;
            if (i >= count) clearInterval(interval);
        }, delay);
    }

    startContinuousShow() {
        this.isStopping = false;
        this.timeouts = [];
        
        // 1. Start Drone Loop
        this.startDroneShowSequence();

        // 2. Start Firework Rain
        this.rainInterval = setInterval(() => {
            if (Math.random() < 0.3) { // Increased frequency for "show" feel
                this.createRandomFirework();
            }
        }, 1500);
    }

    stopShow() {
        this.isStopping = true;
        
        // Clear Intervals
        if (this.rainInterval) clearInterval(this.rainInterval);
        
        // Clear Timeouts
        if (this.timeouts) {
            this.timeouts.forEach(t => clearTimeout(t));
            this.timeouts = [];
        }

        // Remove Elements
        this.clear();
    }

    startRain() {
        this.rainInterval = setInterval(() => {
            if (Math.random() < 0.2) {
                this.createRandomFirework();
            }
        }, 3000);
        return this.rainInterval;
    }

    init(options = {}) {
        const { autoRain = false, clickTrigger = true } = options;
        if (autoRain) this.startRain();
        if (clickTrigger) {
            document.addEventListener('mousedown', (e) => {
                const target = e.target.closest('button') || e.target.closest('a');
                if (target) {
                    this.createFirework(e.clientX, e.clientY, { particleCount: 20 });
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