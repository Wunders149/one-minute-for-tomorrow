// Shared utilities for the app
class OneMinuteApp {
    constructor() {
        this.wishes = [];
        this.currentWish = {};
        this.timer = 60;
        this.isRunning = false;
        this.loadFromStorage();
    }

    // Storage Management
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('wishes');
            if (stored) {
                this.wishes = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Failed to load wishes:', e);
            this.wishes = [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('wishes', JSON.stringify(this.wishes));
        } catch (e) {
            console.error('Failed to save wishes:', e);
        }
    }

    // Wish Management
    addWish(wish) {
        const newWish = {
            id: Date.now(),
            text: wish,
            isVisible: false,
            createdAt: new Date().toISOString()
        };
        this.wishes.push(newWish);
        this.saveToStorage();
        return newWish;
    }

    updateWish(id, updates) {
        const wish = this.wishes.find(w => w.id === id);
        if (wish) {
            Object.assign(wish, updates);
            this.saveToStorage();
        }
        return wish;
    }

    getWish(id) {
        return this.wishes.find(w => w.id === id);
    }

    getAllWishes() {
        return this.wishes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    deleteWish(id) {
        this.wishes = this.wishes.filter(w => w.id !== id);
        this.saveToStorage();
    }

    // Timer Management
    startTimer(duration = 60, onTick, onComplete) {
        this.timer = duration;
        this.isRunning = true;
        
        const interval = setInterval(() => {
            this.timer--;
            if (onTick) onTick(this.timer);
            
            if (this.timer <= 0) {
                clearInterval(interval);
                this.isRunning = false;
                if (onComplete) onComplete();
            }
        }, 1000);

        return interval;
    }

    stopTimer() {
        this.isRunning = false;
    }

    getFormattedTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // Utility Functions
    truncateText(text, length = 100) {
        return text.length > length ? text.substring(0, length) + '...' : text;
    }

    getTimeAgo(date) {
        const now = new Date();
        const past = new Date(date);
        const diff = Math.floor((now - past) / 1000);

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    }
}

// Global app instance
const app = new OneMinuteApp();

// Navigation helpers
function goTo(page) {
    window.location.href = `/src/pages/${page}.html`;
}

function goHome() {
    window.location.href = `/src/pages/index.html`;
}
