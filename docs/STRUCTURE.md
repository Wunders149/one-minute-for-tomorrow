# Directory Structure - Deployment Ready

## Final Project Organization

```
one-minute-for-tomorrow/
│
├── server.js                    # Main Express.js server
├── package.json                 # Project metadata and dependencies
├── package-lock.json            # Locked dependency versions
├── .env                         # Production environment variables (NOT in git)
├── .env.example                 # Template for environment configuration
├── .gitignore                   # Git ignore rules
├── README.md                    # Main project documentation
│
├── config/                      # Backend configuration and models
│   ├── models.js               # Mongoose schemas (Wish model)
│   └── api-routes.js           # REST API endpoint definitions
│
├── src/                         # Frontend source files
│   ├── pages/                  # HTML pages
│   │   ├── index.html          # Home page with fireworks
│   │   ├── writing.html        # Wish writing interface
│   │   ├── wall.html           # Public wishes gallery
│   │   ├── visibility.html     # Wish visibility toggle
│   │   ├── confirmation.html   # Submission confirmation
│   │   └── landing.html        # Landing page
│   │
│   ├── js/                     # JavaScript source files
│   │   ├── app.js              # Shared utilities and helpers
│   │   ├── api.js              # Frontend API client (WishAPI)
│   │   ├── audio-controller.js # Audio management
│   │   └── fireworks.js        # Firework animation system
│   │
│   ├── css/                    # Stylesheets
│   │   └── styles.css          # Main stylesheet (Tailwind + custom)
│   │
│   └── assets/                 # Page-specific media
│       ├── images/             # Images and graphics
│       └── audio/              # Audio files
│
├── assets/                      # Root-level static assets (served at /assets/)
│   ├── app.js                  # Shared application utilities
│   ├── styles.css              # Shared stylesheet
│   └── images/                 # Shared images and icons
│
├── logs/                        # Application logs (not in git)
│   ├── server.log              # Server activity logs
│   └── pm2-error.log           # PM2 process manager errors
│
└── docs/                        # Documentation and reference
    ├── DEPLOYMENT.md            # Complete deployment guide
    ├── DEPLOYMENT_CHECKLIST.md  # Pre/post deployment verification
    ├── ARCHITECTURE.md          # System architecture overview
    ├── API_INTEGRATION_EXAMPLES.md # API usage examples
    ├── BACKEND_SETUP.md         # Backend setup instructions
    ├── PUBLIC_ASSETS.md         # Static assets organization
    ├── ecosystem.config.js      # PM2 process manager config
    ├── test-api.js              # API endpoint testing script
    ├── START_HERE.md            # Quick start guide
    ├── README_*.md              # Additional documentation
    └── *.md                     # Other reference documents
```

## File Organization Summary

### Core Files (Root Level)
- **server.js** - Express.js application server
- **package.json** - Node.js project configuration with 5 dependencies
- **.env** - Production environment variables
- **.env.example** - Environment variable template
- **.gitignore** - Git exclusion rules (covers node_modules, .env, logs, etc.)
- **README.md** - Main project readme

### Backend (config/)
- **models.js** - Mongoose Wish schema with validation
- **api-routes.js** - 7 REST API endpoints

### Frontend (src/)
- **pages/** - 6 HTML pages for different sections
- **js/** - JavaScript modules (app utilities, API client, animations)
- **css/** - Tailwind CSS with custom styling
- **assets/** - Page-specific images and audio

### Static Assets (assets/)
- **app.js** - Shared utility functions
- **styles.css** - Shared stylesheet
- **images/** - Icons and graphics

### Documentation (docs/)
- **DEPLOYMENT.md** - Step-by-step deployment guide for various platforms
- **DEPLOYMENT_CHECKLIST.md** - Pre/post deployment verification
- **ecosystem.config.js** - PM2 configuration for production
- **test-api.js** - API testing script
- Various markdown guides and references

### Logs (logs/)
- Application logs (automatically created by server)
- Not tracked in git

## Deployment Benefits

✅ **Clean Root Directory** - Only essential files at root level  
✅ **Organized Documentation** - All docs in dedicated folder  
✅ **Separated Concerns** - Backend config, frontend code, static assets  
✅ **Production Ready** - Proper asset serving, cache optimization  
✅ **Scalable Structure** - Easy to extend with new pages/features  
✅ **Git Clean** - Logs, env files properly excluded  

## Quick Reference

### Starting the Server
```bash
# Development
npm start

# Production
NODE_ENV=production npm start

# With PM2
pm2 start docs/ecosystem.config.js
```

### Adding New Pages
1. Create `.html` file in `src/pages/`
2. Create page-specific JS/CSS in respective folders
3. Update navigation in `index.html`

### Adding Assets
1. **Shared assets** → `assets/` folder
2. **Page-specific assets** → `src/assets/` folder
3. Server automatically serves both locations

### Deployment
Follow the step-by-step guide in `docs/DEPLOYMENT.md` for your platform (Heroku, Railway, AWS, etc.)
