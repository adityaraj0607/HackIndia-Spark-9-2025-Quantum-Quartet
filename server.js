const express = require('express');
const cors = require('cors');
const path = require('path');
//require('dotenv').config();

// Import route modules
const flightRoutes = require('./routes/flightRoutes');
const airportRoutes = require('./routes/airportRoutes');
const config = require('./config/api');

const app = express();

// Configure middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static files from the root directory
app.use(express.static('./'));

// Import configuration from config folder

// Register API routes with configuration
app.use('/api/flights', flightRoutes);
app.use('/api/airports', airportRoutes);

// Log that API is configured
console.log('https://api.aviationstack.com/v1/', config.API_URL);

// Basic route for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', message: `Route ${req.originalUrl} not found` });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}/api/test`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ Port ${PORT} is already in use. Try stopping other services or using a different port.`);
  } else {
    console.error('Server startup error:', err);
  }
});