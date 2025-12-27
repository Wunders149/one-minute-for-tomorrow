# Deployment Guide - One Minute for Tomorrow

## Pre-Deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] `.env` file configured with production MongoDB URI
- [ ] Environment variables set to `NODE_ENV=production`
- [ ] Port configured for your hosting environment
- [ ] Database backups configured
- [ ] SSL/TLS certificates configured (if using HTTPS)
- [ ] CORS settings reviewed for production domain
- [ ] Error logging configured

## File Structure for Deployment

```
one-minute-for-tomorrow/
├── server.js                 # Main Express server
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Locked dependencies
├── .env                       # Production environment variables (NOT in git)
├── .env.example              # Template for environment variables
├── .gitignore                # Git ignore rules
│
├── config/                   # Configuration and database models
│   ├── models.js             # Mongoose schemas
│   └── api-routes.js         # API endpoint definitions
│
├── src/                      # Frontend source files
│   ├── pages/                # HTML pages
│   │   ├── index.html
│   │   ├── writing.html
│   │   ├── wall.html
│   │   ├── visibility.html
│   │   ├── confirmation.html
│   │   └── landing.html
│   ├── js/                   # JavaScript files
│   │   ├── app.js
│   │   └── api.js            # API client
│   ├── css/                  # Stylesheets
│   │   └── styles.css
│   └── assets/               # Images and media
│       └── images/
│
├── assets/                   # Root-level static assets
│   ├── app.js
│   ├── styles.css
│   └── images/
│
└── docs/                     # Documentation
    └── *.md
```

## Environment Variables

Create a `.env` file in the root directory with:

```env
MONGODB_URI=your_mongodb_atlas_url
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
```

**Important**: Never commit `.env` to version control. Use `.env.example` as a template.

## Deployment Steps

### 1. Local Testing
```bash
npm install
npm start
```

### 2. Production Build
```bash
# Ensure all dependencies are production-ready
npm install --production

# Run production server
NODE_ENV=production npm start
```

### 3. Using Process Manager (Recommended)

Install PM2 globally:
```bash
npm install -g pm2
```

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'one-minute-for-tomorrow',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Deployment Platforms

#### Heroku
```bash
# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_url"
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

#### Railway/Render/Others
1. Connect your GitHub repository
2. Set environment variables in platform settings
3. Ensure package.json has `engines.node` specified
4. Platform automatically runs `npm install && npm start`

#### Self-Hosted (Linux/AWS)
```bash
# SSH into server
ssh user@server.com

# Clone repository
git clone https://github.com/yourrepo/one-minute-for-tomorrow.git
cd one-minute-for-tomorrow

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install dependencies
npm install --production

# Set up environment
cp .env.example .env
# Edit .env with production values
nano .env

# Start with systemd or PM2
# Using PM2 (recommended)
npm install -g pm2
pm2 start server.js --name "one-minute-for-tomorrow"
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup -u user -hp /home/user
```

## Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] Database credentials are strong and unique
- [ ] CORS is configured for specific domains (not wildcard)
- [ ] API rate limiting is considered
- [ ] HTTPS is enabled
- [ ] MongoDB authentication is enabled
- [ ] Database has regular backups
- [ ] Error messages don't expose sensitive information
- [ ] User input is validated and sanitized
- [ ] Dependencies are up to date

## Monitoring & Logging

### Log Files
- Server logs: `server.log`
- Error logs: `server-err.log`

### Health Check
Monitor the health endpoint:
```bash
curl https://yourdomain.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Server is running",
  "mongodb": "connected"
}
```

## Database Maintenance

### MongoDB Atlas
1. Enable automatic backups
2. Configure point-in-time recovery
3. Monitor cluster metrics
4. Set up alerts for connection issues

### Manual Backup
```bash
# Export wishes collection
mongoexport --uri "your_mongodb_uri" --collection wishes --out wishes_backup.json
```

## Scaling Considerations

1. **Database**: MongoDB Atlas auto-scaling
2. **Server**: Use load balancer for multiple instances
3. **Caching**: Consider Redis for frequent queries
4. **CDN**: Serve static assets from CDN
5. **Monitoring**: Set up error tracking (e.g., Sentry)

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Fails
- Verify MongoDB URI in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### CORS Issues
- Update CORS origin in `server.js` for production domain
- Check browser console for specific error messages

## Post-Deployment

1. Test all endpoints with production URL
2. Verify database persistence (create a wish, refresh page)
3. Check mobile responsiveness
4. Monitor server logs for errors
5. Set up regular backups

## Support

For deployment help, refer to:
- Express.js documentation: https://expressjs.com
- Mongoose documentation: https://mongoosejs.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
