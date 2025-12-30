# One Minute for Tomorrow

A beautiful web application where users write and share one-minute wishes for tomorrow.

## 📁 Project Structure (Professional)

```
one-minute-for-tomorrow/
├── src/                      # Source code
│   ├── pages/               # HTML pages (entry points)
│   │   ├── index.html       # Single Page App (Full Creation Flow)
│   │   └── wall.html        # Shared wishes gallery
│   ├── js/                  # JavaScript source
│   │   └── app.js           # Main application logic
│   ├── css/                 # Stylesheets
│   │   └── styles.css       # Global styles
│   └── assets/
│       └── images/          # Image assets (placeholder)
├── config/                   # Configuration files
│   └── server.config.js     # Server configuration
├── docs/                     # Documentation
├── server.js                # Node.js HTTP server
├── package.json             # Project metadata
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## � Key Features

- ✨ Beautiful minimalist design with Tailwind CSS
- ⏱️ 60-second timer for focused writing
- 🔒 Privacy control (share or keep private)
- 🌙 Dark mode by default
- 💾 Browser-based persistent storage (localStorage)
- 👥 Public wall to view shared wishes
- 📱 Responsive design for all screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js 14 or higher

### Installation

1. Navigate to project directory
2. Start the server: `node server.js`
3. Open `http://localhost:3000` in your browser

## 📱 Application Flow

1. **Home/Write Flow** (index.html) - Seamless flow from Menu -> Intro -> 60s Timer
2. **Visibility Screen** (visibility.html) - Choose public or private
3. **Confirmation Screen** (confirmation.html) - Success message
4. **Wall of Tomorrow** (wall.html) - View all public wishes

## 💾 Data Storage

Wishes stored in browser localStorage with `OneMinuteApp` class:

```javascript
{
    id: number,
    text: string,
    createdAt: ISO8601,
    isPublic: boolean
}
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Tailwind), Vanilla JavaScript
- **Backend**: Node.js (native http module)
- **Storage**: Browser localStorage
- **Icons**: Google Material Symbols

## 🎨 Design System

- **Primary Color**: `#ecb613` (Gold)
- **Background Dark**: `#221d10`
- **Background Light**: `#f8f8f6`
- **Font**: Inter (sans-serif)
- **Theme**: Dark mode by default

## 📖 Documentation

Full documentation available in `/docs`:
- **QUICKSTART.md** - Get running in 2 minutes
- **TECHNICAL_DOCUMENTATION.md** - Architecture & code details
- **API_REFERENCE.md** - Function documentation
- **DEVELOPMENT_GUIDE.md** - Setup for developers
- **DEPLOYMENT_GUIDE.md** - Production deployment

## 🔧 Development

### File Locations

- **App Logic**: `src/js/app.js` - OneMinuteApp class
- **Styles**: `src/css/styles.css` - Global CSS
- **Pages**: `src/pages/` - HTML entry points
- **Config**: `config/server.config.js` - Server settings

### Navigation Helpers

```javascript
goTo('landing');   // Navigate to landing.html
goHome();         // Navigate to index.html
```

### Environment

Copy `.env.example` to `.env` for local development:
```
NODE_ENV=development
PORT=3000
```

## 📝 npm Scripts

```bash
npm start    # Start the server
npm run dev  # Development mode
npm test     # Run tests (not yet implemented)
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Server won't start | Check Node.js is installed & port 3000 is free |
| Styles not loading | Clear browser cache & verify CDN access |
| Pages not found | Verify relative paths in HTML files |
| Data not persisting | Check browser localStorage is enabled |

## 📄 License

This project is part of the "One Minute for Tomorrow" New Year's Eve experience.

## 🙏 Credits

Designed and built with attention to detail for meaningful human connection.
