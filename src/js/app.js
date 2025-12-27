/**
 * OneMinuteApp - Core utilities and helpers
 */
class OneMinuteApp {
    constructor() {
        this.timer = 60;
        this.isRunning = false;
    }

    // Timer Management
    startTimer(duration = 60, onTick, onComplete) {
        this.timer = duration;
        this.isRunning = true;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        this.timerInterval = setInterval(() => {
            this.timer--;
            if (onTick) onTick(this.timer);
            
            if (this.timer <= 0) {
                this.stopTimer();
                if (onComplete) onComplete();
            }
        }, 1000);

        return this.timerInterval;
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.isRunning = false;
    }

    getFormattedTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // Formatting Utilities
    truncateText(text, length = 100) {
        if (!text) return '';
        return text.length > length ? text.substring(0, length) + '...' : text;
    }

    getTimeAgo(date) {
        if (!date) return 'Unknown';
        const now = new Date();
        const past = new Date(date);
        const diff = Math.floor((now - past) / 1000);

        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    }

    // Navigation
    goTo(page) {
        window.location.href = `/src/pages/${page}.html`;
    }

    goHome() {
        window.location.href = `/src/pages/index.html`;
    }
}

// Global instance
const app = new OneMinuteApp();

// Legacy helper compatibility
const goTo = (page) => app.goTo(page);
const goHome = () => app.goHome();