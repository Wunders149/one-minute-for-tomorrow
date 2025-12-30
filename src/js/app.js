/**
 * OneMinuteApp - Core utilities and helpers
 */
class OneMinuteApp {
    constructor() {
        // Core state if needed
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
        // If navigating to a view within index.html
        if (['landing', 'writing', 'visibility', 'confirmation'].includes(page)) {
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                // If we are already on index, use the global switchView if available
                if (typeof window.switchView === 'function') {
                    window.switchView(page);
                } else {
                    window.location.hash = page;
                }
            } else {
                // Go to index with hash
                window.location.href = `/src/pages/index.html#${page}`;
            }
        } else {
            // Standard page navigation
            window.location.href = `/src/pages/${page}.html`;
        }
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