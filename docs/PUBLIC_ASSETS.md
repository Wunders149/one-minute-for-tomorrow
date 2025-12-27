# Public Assets Organization

This document describes how static assets are organized for deployment.

## Asset Serving Strategy

The application serves static files from two locations:

### 1. Root-Level Assets (`/assets/`)
- Served at `/assets/*`
- Contains: Images, shared stylesheets, shared scripts
- Purpose: Global, reusable resources

### 2. Source Assets (`/src/`)
- Served at `/src/*`
- Contains: Page-specific resources, CSS, JavaScript
- Purpose: Frontend source organization

## Deployment Best Practices

### Static File Optimization
1. **Minification**: Minify CSS and JavaScript in production
2. **Compression**: Enable gzip compression in server
3. **Caching**: Set appropriate cache headers
4. **CDN**: Consider serving assets from a CDN

### File Organization

```
assets/
├── images/
│   ├── logo.png
│   ├── icons/
│   └── backgrounds/
├── app.js           # Shared utilities
└── styles.css       # Root styles

src/
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── api.js
├── pages/
│   └── *.html
└── assets/
    └── images/
```

## Adding New Assets

1. **Shared assets**: Place in `/assets/`
2. **Page-specific assets**: Place in `/src/assets/`
3. **Update HTML**: Reference with correct path (`/assets/` or `/src/assets/`)

## Caching Strategy

Set cache headers in `server.js`:

```javascript
// Cache static assets for 1 week in production
if (process.env.NODE_ENV === 'production') {
  app.use('/assets', express.static('assets', {
    maxAge: '7d',
    etag: false
  }));
  app.use('/src', express.static('src', {
    maxAge: '7d',
    etag: false
  }));
}
```

## CDN Configuration (Optional)

For production deployments, consider serving assets from a CDN:

1. Upload contents of `/assets/` to CDN
2. Update HTML to point to CDN URL
3. Example: `https://cdn.yourdomain.com/images/logo.png`

This improves load times and reduces server bandwidth.
