require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
  origin: NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || 'localhost'
    : '*',
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Static files with cache headers
const staticOptions = NODE_ENV === 'production' 
  ? { maxAge: '7d', etag: false }
  : { maxAge: 0 };

app.use(express.static(__dirname, staticOptions));
app.use('/src', express.static(path.join(__dirname, 'src'), staticOptions));
app.use('/assets', express.static(path.join(__dirname, 'assets'), staticOptions));

// MongoDB Connection
if (!MONGODB_URI) {
  console.error('✗ Error: MONGODB_URI environment variable is not defined.');
  console.error('  Please create a .env file with your MongoDB connection string.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✓ Connected to MongoDB');
})
.catch(err => {
  console.error('✗ MongoDB connection error:', err);
  process.exit(1);
});

// API Routes
const apiRoutes = require('./config/api-routes');
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Root route - serve landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/index.html'));
});

// Catch-all route for unknown API calls
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Catch-all route for frontend - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Server running at http://${HOST}:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    console.log(`${'='.repeat(60)}\n`);
  });
}

// Export for serverless
module.exports = app;

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
  }
  process.exit(0);
});
