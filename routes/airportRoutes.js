const express = require('express');
const router = express.Router();

// airport data
const airports = [
  { iataCode: 'DEL', name: 'Indira Gandhi International', cityName: 'New Delhi', countryName: 'India' },
  { iataCode: 'BOM', name: 'Chhatrapati Shivaji', cityName: 'Mumbai', countryName: 'India' },
  { iataCode: 'BLR', name: 'Kempegowda International', cityName: 'Bangalore', countryName: 'India' },
  { iataCode: 'MAA', name: 'Chennai International', cityName: 'Chennai', countryName: 'India' },
  { iataCode: 'CCU', name: 'Netaji Subhash Chandra Bose', cityName: 'Kolkata', countryName: 'India' },
  { iataCode: 'HYD', name: 'Rajiv Gandhi International', cityName: 'Hyderabad', countryName: 'India' },
  { iataCode: 'JFK', name: 'John F. Kennedy', cityName: 'New York', countryName: 'United States' },
  { iataCode: 'LHR', name: 'Heathrow', cityName: 'London', countryName: 'United Kingdom' },
  { iataCode: 'DXB', name: 'Dubai International', cityName: 'Dubai', countryName: 'United Arab Emirates' },
  { iataCode: 'SIN', name: 'Changi', cityName: 'Singapore', countryName: 'Singapore' },
  { iataCode: 'IXZ', name: 'Veer Savarkar International ', cityName: 'Port Blair', countryName: 'India' },
  { iataCode: 'VAK', name: 'Visakhapatnam International', cityName: 'New Delhi', countryName: 'India' },
  { iataCode: 'AMD', name: 'Sardar Vallabhbhai Patel International', cityName: 'Ahmedabad', countryName: 'India' },
  { iataCode: 'GOI', name: 'Goa International', cityName: 'Goa(Dabolim)', countryName: 'India' },
  { iataCode: 'GOX', name: 'Manohar International', cityName: 'Goa (Mopa)', countryName: 'India' },
  { iataCode: 'COK', name: 'Cochin International ', cityName: 'Kochi', countryName: 'India' },
  { iataCode: 'TRV', name: 'Trivandrum International ', cityName: 'Thiruvananthapuram', countryName: 'India' },
  { iataCode: 'PNQ', name: 'Pune Airport', cityName: 'Pune', countryName: 'India' },
  { iataCode: 'JAI', name: 'Jaipur International', cityName: 'Jaipur', countryName: 'India' },
  { iataCode: 'LKO', name: 'Chaudhary Charan Singh International', cityName: 'Lucknow', countryName: 'India' },
  { iataCode: 'ATQ', name: 'Sri Guru Ram Dass Jee International', cityName: 'Amritsar', countryName: 'India' },
  { iataCode: 'NAG', name: 'Dr. Babasaheb Ambedkar International', cityName: 'Nagpur', countryName: 'India' },
  { iataCode: 'CJB', name: 'Coimbatore International', cityName: 'Coimbatore', countryName: 'India' },
  { iataCode: 'IXM', name: 'Madurai', cityName: 'Madurai', countryName: 'India' },
  { iataCode: 'VNS', name: 'Lal Bahadur Shastri International', cityName: 'Varanasi', countryName: 'India' },
  { iataCode: 'IDR', name: 'Devi Ahilya Bai Holkar', cityName: 'Indore', countryName: 'India' },
  { iataCode: 'BHO', name: 'Raja Bhoj ', cityName: 'Bhopal', countryName: 'India' },
  { iataCode: 'SXR', name: 'Sheikh ul-Alam International', cityName: 'Srinagar', countryName: 'India' },
  { iataCode: 'IXL', name: 'Kushok Bakula Rimpochee ', cityName: 'Leh', countryName: 'India' },
  { iataCode: 'GAU', name: 'Lokpriya Gopinath Bordoloi International ', cityName: 'Guwahati', countryName: 'India' },
  { iataCode: 'BBI', name: 'Biju Patnaik International ', cityName: 'Bhubaneswar', countryName: 'India' },
  { iataCode: 'PAT', name: 'Jay Prakash Narayan ', cityName: 'Patna', countryName: 'India' },
  { iataCode: 'RPR', name: 'Swami Vivekananda ', cityName: 'Raipur', countryName: 'India' },
  { iataCode: 'IXR', name: 'Birsa Munda ', cityName: 'Ranchi', countryName: 'India' },
  { iataCode: 'DED', name: 'Jolly Grant ', cityName: 'Dehradun', countryName: 'India' },
  { iataCode: 'IXA', name: 'Maharaja Bir Bikram Airport', cityName: 'Agartala', countryName: 'India' },
  { iataCode: 'IMF', name: 'Imphal', cityName: 'Imphal', countryName: 'India' },
  { iataCode: 'SHL', name: 'Shillong', cityName: 'Shillong', countryName: 'India' },
  { iataCode: 'IXZ', name: 'Veer Savarkar International', cityName: 'Port Blair', countryName: 'India' },
  { iataCode: 'AGR', name: 'Agra', cityName: 'Agra', countryName: 'India' },
  { iataCode: 'GAY', name: 'Gaya', cityName: 'Gaya', countryName: 'India' },
  { iataCode: 'JDH', name: 'Jodhpur', cityName: 'Jodhpur', countryName: 'India' },
  { iataCode: 'UDR', name: 'Maharana Pratap', cityName: 'Udaipur', countryName: 'India' },
  { iataCode: 'JSA', name: 'Jaisalmer', cityName: '	Jaisalmer', countryName: 'India' },
  { iataCode: 'TRZ', name: 'Tiruchirappalli International', cityName: 'Tiruchirappalli', countryName: 'India' },
  { iataCode: 'VGA', name: 'Vijayawada', cityName: 'Vijayawada', countryName: 'India' },
  { iataCode: 'VTZ', name: 'Visakhapatnam', cityName: 'Visakhapatnam', countryName: 'India' },
  { iataCode: 'TIR', name: 'Tirupati', cityName: 'Tirupati', countryName: 'India' },
  { iataCode: 'RJA', name: 'Rajahmundry', cityName: 'Rajahmundry', countryName: 'India' },
  { iataCode: 'CDP', name: 'Kadapa', cityName: 'Kadapa', countryName: 'India' },
  { iataCode: 'HBX', name: 'Hubli', cityName: 'Hubli', countryName: 'India' },
  { iataCode: 'IXG', name: 'Belgaum', cityName: 'Belgaum', countryName: 'India' },
  { iataCode: 'IXE', name: 'Mangalore International', cityName: 'Mangalore', countryName: 'India' },
  { iataCode: 'MYQ', name: '	Mysore', cityName: '	Mysore', countryName: 'India' },
  { iataCode: 'IXU', name: 'Aurangabad', cityName: 'Aurangabad', countryName: 'India' },
  { iataCode: 'SAG', name: 'Shirdi', cityName: 'Shirdi', countryName: 'India' },
  { iataCode: 'KLH', name: 'Kolhapur', cityName: 'Kolhapur', countryName: 'India' },
  { iataCode: 'ISK', name: 'Nashik', cityName: 'Nashik', countryName: 'India' },
  { iataCode: 'RDP', name: 'Kazi Nazrul Islam ', cityName: 'Durgapur', countryName: 'India' },
  { iataCode: 'IXB', name: 'Bagdogra', cityName: 'Bagdogra', countryName: 'India' },
  { iataCode: 'IXS', name: 'Silchar', cityName: 'Silchar', countryName: 'India' },
  { iataCode: 'DIB', name: 'Dibrugarh', cityName: 'Dibrugarh', countryName: 'India' },
  { iataCode: 'JRH', name: 'Jorhat', cityName: 'Jorhat', countryName: 'India' },
  { iataCode: 'TEZ', name: 'Tezpur', cityName: 'Tezpur', countryName: 'India' },
  { iataCode: 'IXI', name: 'Lilabari', cityName: 'Lilabari', countryName: 'India' },
  { iataCode: 'DMU', name: 'Dimapur', cityName: 'Dimapur', countryName: 'India' },
  { iataCode: 'AJL', name: 'Lengpui', cityName: 'Aizwal', countryName: 'India' },
  { iataCode: 'PYG', name: 'Pakyong', cityName: 'Pakyong', countryName: 'India' },
  { iataCode: 'KUU', name: 'Kullu-Manali', cityName: 'Kullu', countryName: 'India' },
  { iataCode: 'SLV', name: 'Shimla', cityName: 'Shimla', countryName: 'India' },
  { iataCode: 'DHM', name: 'Kangra', cityName: 'Kangra', countryName: 'India' },
  { iataCode: 'PGH', name: 'Pantnagar', cityName: 'Pantnagar', countryName: 'India' },
  { iataCode: 'NNS', name: 'Naini Saini', cityName: 'Pithoragraph', countryName: 'India' },
  { iataCode: 'JRG', name: 'Veer Surendra Sai', cityName: 'Jharsuguda', countryName: 'India' },
  { iataCode: 'JLR', name: 'Jabalpur', cityName: 'Jabalpur', countryName: 'India' },
  { iataCode: 'HJR', name: 'Khajuraho', cityName: 'Khajuraho', countryName: 'India' },
  { iataCode: 'GWL', name: 'Gwalior', cityName: 'Gwalior', countryName: 'India' },
  { iataCode: 'REW', name: 'Rewa ', cityName: 'Rewa', countryName: 'India' },
  { iataCode: 'TNI', name: 'Satna', cityName: 'Satna', countryName: 'India' },
  { iataCode: 'DIU', name: 'Diu', cityName: 'Diu', countryName: 'India' },
  { iataCode: 'PNY', name: 'Puducherry', cityName: 'Puducherry', countryName: 'India' },
  { iataCode: 'AGX', name: 'Agatti ', cityName: 'Agatti', countryName: 'India' },
  { iataCode: 'AYJ', name: 'Maharishi Valmiki International', cityName: 'Ayodhya', countryName: 'India' },
  { iataCode: 'KBK', name: 'Kushinagar International', cityName: 'Kushinagar', countryName: 'India' },
];

// Test endpoint to verify routes are working
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Airport routes are working', 
    endpoints: ['/search'],
    sampleUsage: '/api/airports/search?query=del'
  });
});

// Airport search endpoint
router.get('/search', (req, res) => {
  // Add CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  try {
    // Accept either "query" or "q" parameter for flexibility
    const query = (req.query.query || req.query.q || '').toLowerCase().trim();
    console.log(`Search API called with query: "${query}" (${typeof query})`);
    console.log(`Query parameters:`, req.query);
    
    // Return empty results for empty query
    if (!query) {
      console.log('Empty query received, returning empty results');
      return res.json({ places: [] });
    }
    
    // Filter airports - supporting any query length
    const filteredAirports = airports.filter(airport => 
      airport.iataCode.toLowerCase().includes(query) || 
      airport.cityName.toLowerCase().includes(query) ||
      airport.name.toLowerCase().includes(query) ||
      airport.countryName.toLowerCase().includes(query)
    );
    
    console.log(`Found ${filteredAirports.length} airports matching "${query}"`);
    
    // Return results
    res.json({ 
      places: filteredAirports.slice(0, 10) // Limit to 10 results
    });
    
  } catch (error) {
    console.error('Error in airport search:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      query: req.query
    });
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

module.exports = router;

    
  