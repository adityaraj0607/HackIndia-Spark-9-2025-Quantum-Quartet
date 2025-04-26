const express = require('express');
const router = express.Router();
const axios = require('axios'); // You need to install this: npm install axios

// Get API config from the correct location
const apiConfig = require('../config/api');
const FLIGHT_API_URL = apiConfig.flightAPI.url;
const FLIGHT_API_KEY = apiConfig.flightAPI.key;

// Base route
router.get('/', (req, res) => {
  res.json({ message: 'Flight route is working' });
});

// Search endpoint
router.post('/search', async (req, res) => {
  try {
    console.log('Search request received:', req.body);
    const { from, to, date, returnDate, passengers } = req.body;
    
    // Validate required fields
    if (!from || !to || !date) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Try to use the real API if it's configured correctly
    if (FLIGHT_API_URL && FLIGHT_API_KEY && FLIGHT_API_URL !== 'https://api.aviationstack.com/v1/') {
      try {
        console.log(`Attempting API request to: ${FLIGHT_API_URL}`);
        
        const response = await axios.get(FLIGHT_API_URL, {
          params: {
            origin: from,
            destination: to,
            date: date,
            returnDate: returnDate || undefined,
            passengers: passengers || 1
          },
          headers: {
            'Authorization': `Bearer ${FLIGHT_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.flights) {
          console.log(`API returned ${response.data.flights.length} flights`);
          return res.json(response.data);
        }
      } catch (apiError) {
        console.error('API request failed:', apiError.message);
        console.log('Falling back to mock data');
      }
    }
    
    // Generate mock flights as fallback
    const flights = [
      {
        id: 'AI123',
        airline: 'Air India',
        from: from,
        to: to,
        departure: `${date}T08:30:00`,
        arrival: `${date}T11:15:00`,
        duration: '2h 45m',
        price: 12500 + Math.floor(Math.random() * 8000)
      },
      {
        id: 'UK456',
        airline: 'Vistara',
        from: from,
        to: to,
        departure: `${date}T14:15:00`,
        arrival: `${date}T16:45:00`,
        duration: '2h 30m',
        price: 14800 + Math.floor(Math.random() * 5000)
      },
      {
        id: '6E789',
        airline: 'IndiGo',
        from: from,
        to: to,
        departure: `${date}T18:30:00`,
        arrival: `${date}T20:55:00`,
        duration: '2h 25m',
        price: 9800 + Math.floor(Math.random() * 5000)
      }
    ];
    
    console.log('Returning mock flight results:', flights.length);
    res.json({ flights });
    
  } catch (error) {
    console.error('Error in flight search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;