# One Minute for Tomorrow

A beautiful web application where users write and share one-minute wishes for tomorrow. This project features a full-stack architecture with a Node.js/Express backend and a MongoDB database for persistent storage.

## 📁 Project Structure

```
one-minute-for-tomorrow/
├── src/                      # Frontend source code
│   ├── pages/               # HTML entry points
│   │   ├── index.html       # Single Page App (Home, Writing, Visibility, Confirmation)
│   │   └── wall.html        # Public wishes gallery (Grid/Credits modes)
│   ├── js/                  # JavaScript logic
│   │   ├── api.js           # Backend API client
│   │   ├── app.js           # Core application utilities
│   │   └── fireworks.js     # Visual effects engine
│   ├── css/                 # Stylesheets
│   │   └── styles.css       # Global styles & animations
│   └── assets/              # Static assets (images, icons)
├── config/                   # Backend configuration
│   ├── api-routes.js        # Express API endpoints
│   └── models.js            # Mongoose (MongoDB) schema
├── docs/                     # Comprehensive documentation
├── server.js                # Express server & API entry point
├── vercel.json              # Vercel deployment configuration
├── package.json             # Project dependencies & scripts
└── .env                     # Environment variables (MongoDB URI, Port)
```

## ✨ Key Features

- **⏱️ 60-Second Focused Writing**: A timed environment to express what truly matters.
- **🌌 Intelligent Wall of Tomorrow**:
  - **Pre-2026**: A minimalist grid of hopes.
  - **Post-2026**: An cinematic "Movie Credits" crawl of the wishes left for the future.
- **🔒 Privacy First**: Choose to share your wish on the Wall or keep it private.
- **✨ Visual Atmosphere**: Tailored dark mode, animated stars, and procedural fireworks.
- **⏳ New Year Countdown**: Live countdown to the year 2026.
- **💾 Persistent Backend**: All wishes are securely stored in MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance (Atlas recommended)

### Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

3. **Start the Server**:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your browser.

## 🛠️ Technology Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB via Mongoose ODM
- **Deployment**: Optimized for Vercel/PM2
- **Visuals**: Canvas API (Fireworks), CSS Keyframe Animations

## 📡 API Reference

The backend exposes a RESTful API at `/api`:

- `GET  /api/wishes` - Fetch wishes (supports `isPublic`, `limit`, `skip` filters)
- `POST /api/wishes` - Save a new wish
- `PUT  /api/wishes/:id` - Update wish text or visibility
- `GET  /api/stats` - Get total/public/private wish counts
- `GET  /api/health` - Check server and database status

## 📖 Documentation

Explore the `/docs` directory for deep dives:
- **STATUS.md**: Current implementation progress
- **ARCHITECTURE.md**: System design overview
- **API_INTEGRATION_EXAMPLES.md**: How to use the frontend `wishAPI`
- **DEPLOYMENT.md**: Guide for production hosting

## 📄 License

This project is part of the "One Minute for Tomorrow" experience.

---

Designed with attention to detail for meaningful human connection. ✨