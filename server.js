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

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// MongoDB Connection
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

// Catch-all route for SPA - serve index.html for all other routes
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

// Start server
app.listen(PORT, HOST, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  console.log(`${'='.repeat(60)}\n`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});