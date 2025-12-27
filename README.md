# One Minute for Tomorrow 🌟

A beautiful web application where users can write and share one-minute wishes for tomorrow. The app combines a minimalist design with meaningful functionality to capture hopes and aspirations.

## 📁 Project Structure

```
one-minute-for-tomorrow/
├── index.html                      # Main landing page
├── server.js                        # Node.js HTTP server
├── assets/                          # Shared assets
│   ├── app.js                      # Core application logic & storage
│   └── styles.css                  # Global CSS utilities
├── landing_screen/                 # Start screen
│   └── code.html
├── writing_screen/                 # 1-minute timer & text input
│   └── code.html
├── visibility_choice_screen/       # Privacy/sharing choice
│   └── code.html
├── confirmation_screen/            # Thank you & next actions
│   └── code.html
└── wall_of_tomorrow/               # View shared wishes
    └── code.html
```

## 🎨 Design System

- **Primary Color**: `#ecb613` (Gold/Yellow)
- **Background Light**: `#f8f8f6`
- **Background Dark**: `#221d10` (Dark Brown)
- **Surface Dark**: `#2c2616`
- **Font**: Inter (sans-serif)
- **Theme**: Dark mode by default with light mode support

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system

### Installation & Running

1. Navigate to the project directory:
```bash
cd one-minute-for-tomorrow
```

2. Start the server:
```bash
node server.js
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## 📱 Application Flow

### 1. **Main Menu** (`index.html`)
- Welcome screen with two options
- "Start Writing" → Navigate to landing screen
- "View Wall of Tomorrow" → Navigate to wall

### 2. **Landing Screen** (`landing_screen/code.html`)
- Sets context for the writing experience
- Button to begin the one-minute timer
- Back button to return home

### 3. **Writing Screen** (`writing_screen/code.html`)
- **60-second countdown timer** at the top
- Large text input area (max 200 characters)
- Real-time character count
- Auto-submits when timer ends or user clicks "Done"
- iOS-style keyboard simulation at bottom
- Back button to cancel

### 4. **Visibility Choice** (`visibility_choice_screen/code.html`)
- User chooses whether to share their wish publicly
- **"Yes, Share It"** → Wish appears on Wall of Tomorrow
- **"Keep It Private"** → Wish saved locally only
- Back button to previous screen

### 5. **Confirmation Screen** (`confirmation_screen/code.html`)
- Thank you message
- Options to:
  - View the Wall of Tomorrow
  - Return to Home

### 6. **Wall of Tomorrow** (`wall_of_tomorrow/code.html`)
- Displays all public wishes in a masonry grid
- Each wish shows:
  - The text
  - When it was posted (relative time)
  - Animated entrance effect
- Bottom navigation with:
  - Home button
  - Write button
  - Wall view (active)

## 💾 Data Storage

All wishes are stored in the browser's **localStorage** using the `OneMinuteApp` class:

```javascript
// Structure of a wish:
{
    id: timestamp,
    text: "User's wish text",
    isVisible: true/false,  // Public or private
    createdAt: ISO string
}
```

### Key Methods:
- `addWish(text)` - Create a new wish
- `updateWish(id, updates)` - Update wish properties
- `getWish(id)` - Retrieve a specific wish
- `getAllWishes()` - Get all wishes sorted by date
- `deleteWish(id)` - Remove a wish

## 🛠️ Core Files

### `assets/app.js`
Contains the main `OneMinuteApp` class with methods for:
- Wish management (CRUD operations)
- Local storage synchronization
- Timer management
- Utility functions (time formatting, text truncation)
- Navigation helpers (`goTo()`, `goHome()`)

### `assets/styles.css`
Global styles including:
- CSS variables for colors
- Scrollbar customization
- Animation delay utilities
- Common patterns

### `server.js`
Simple HTTP server that:
- Serves all files with correct MIME types
- Handles 404 errors
- Logs all requests
- Runs on `localhost:3000`

## 🎯 Features

✅ **One-Minute Timer** - Motivates focused writing
✅ **Dark Mode** - Eye-friendly interface with Tailwind CSS
✅ **Privacy Control** - Users choose who sees their wishes
✅ **Persistence** - Wishes saved in localStorage
✅ **Responsive Design** - Works on mobile and desktop
✅ **Masonry Grid** - Beautiful wall layout
✅ **Animations** - Smooth transitions and fade-in effects
✅ **Material Icons** - Modern icon system

## 📐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Requires JavaScript enabled

## 🔧 Development Notes

### Navigation
All pages use the `goTo()` and `goHome()` helper functions from `app.js`:
```javascript
goTo('landing_screen');  // Navigate to a screen
goHome();               // Return to index.html
```

### Styling
The project uses **Tailwind CSS** with custom Tailwind configuration in each HTML file's `<script id="tailwind-config">` section.

### Session Management
Session-specific data (like current wish ID) is stored in `sessionStorage` to pass data between screens without persistence.

## 📝 Customization

To customize colors, edit the Tailwind config in any HTML file:
```javascript
colors: {
    "primary": "#ecb613",
    "background-light": "#f8f8f6",
    "background-dark": "#221d10",
}
```

## 🐛 Troubleshooting

**Server won't start:**
- Ensure Node.js is installed
- Check port 3000 is available
- Verify you're in the correct directory

**Styles not loading:**
- Clear browser cache
- Check that Tailwind CDN is accessible
- Verify Internet connection for font loading

**Timer not working:**
- Check browser console for JavaScript errors
- Ensure JavaScript is enabled
- Try a different browser

## 📄 License

This project is part of the "One Minute for Tomorrow" New Year's Eve experience.

## 🙏 Credits

Designed and built with attention to detail for meaningful human connection.
