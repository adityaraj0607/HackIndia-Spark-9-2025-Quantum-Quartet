const { API_BASE_URL } = require('./api/config');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Flight Scanner app initialized');
    
    // Constants
    // Import API configuration from config file
    const ENDPOINTS = {
        airports: '/airports/search',  // Match your server route
        flights: '/flights'
    };
    // DOM Elements
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const searchBtn = document.getElementById('search-btn');
    const resultsSection = document.getElementById('results-section');
    
    // Setup autocomplete for airport inputs
    if (fromInput) setupAirportAutocomplete(fromInput);
    if (toInput) setupAirportAutocomplete(toInput);
    
    // Setup search button handler
    if (searchBtn) {
        searchBtn.addEventListener('click', handleFlightSearch);
    }
    
    // Airport autocomplete setup
    // In app.js's setupAirportAutocomplete function, add this:
async function searchAirports(query) {
    try {
        console.log(`Attempting to search airports with query: "${query}"`);
        console.log(`Requesting: ${API_BASE_URL}${ENDPOINTS.airports}?query=${encodeURIComponent(query)}`);
        
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.airports}?query=${encodeURIComponent(query)}`);
        
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Airport search results:', data);
        
        return data;
    } catch (error) {
        console.error('Error in airport search:', error);
        throw error;
    }
}
    function setupAirportAutocomplete(input) {
        console.log(`Setting up autocomplete for ${input.id}`);
        
        // Create results container
        let resultsContainer = input.parentNode.querySelector('.autocomplete-results');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.className = 'autocomplete-results';
            input.parentNode.appendChild(resultsContainer);
        }
        
        // Add input event with debounce
        let timeout = null;
        input.addEventListener('input', function() {
            clearTimeout(timeout);
            
            const query = this.value.trim();
            
            // Clear previous results if query is empty
            if (!query) {
                resultsContainer.innerHTML = '';
                resultsContainer.style.display = 'none';
                return;
            }
            
            // Set a small delay to prevent too many requests
            timeout = setTimeout(async function() {
                try {
                    console.log(`Searching airports with query: "${query}"`);
                    
                    // Make API request to airport search endpoint
                    const response = await fetch(`${API_BASE_URL}/airports/search?query=${encodeURIComponent(query)}`);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    console.log('Airport search results:', data);
                    
                    // Display results if found
                    if (data.places && data.places.length > 0) {
                        displayAirportResults(data.places, resultsContainer, input);
                    } else {
                        resultsContainer.innerHTML = '<div class="no-results">No airports found</div>';
                        resultsContainer.style.display = 'block';
                    }
                } catch (error) {
                    console.error('Error searching airports:', error);
                    resultsContainer.innerHTML = '<div class="no-results error">Error searching airports</div>';
                    resultsContainer.style.display = 'block';
                }
            }, 300);
        });
        
        // Close autocomplete when clicking outside
        document.addEventListener('click', function(e) {
            if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
                resultsContainer.style.display = 'none';
            }
        });
    }
    
    // Display airport search results
    function displayAirportResults(airports, container, input) {
        container.innerHTML = '';
        
        airports.forEach(airport => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.innerHTML = `
                <div class="airport-code">${airport.iataCode}</div>
                <div class="airport-details">
                    <div class="airport-name">${airport.name}</div>
                    <div class="airport-location">${airport.cityName}, ${airport.countryName}</div>
                </div>
            `;
            
            item.addEventListener('click', function() {
                input.value = `${airport.cityName} (${airport.iataCode})`;
                input.dataset.iataCode = airport.iataCode;
                container.style.display = 'none';
            });
            
            container.appendChild(item);
        });
        
        container.style.display = 'block';
    }
    
    // Handle flight search
    async function handleFlightSearch(e) {
        if (e) e.preventDefault();
        
        console.log('Flight search initiated');
        
        // Validation
        if (!fromInput || !fromInput.dataset.iataCode) {
            alert('Please select a departure airport from the suggestions');
            return;
        }
        
        if (!toInput || !toInput.dataset.iataCode) {
            alert('Please select a destination airport from the suggestions');
            return;
        }
        
        const departureDate = document.getElementById('departure-date');
        if (!departureDate || !departureDate.value) {
            alert('Please select a departure date');
            return;
        }
        
        // Show loading state
        if (resultsSection) {
            resultsSection.innerHTML = '<div class="loading">Searching for flights...</div>';
        }
        
        try {
            const searchData = {
                from: fromInput.dataset.iataCode,
                to: toInput.dataset.iataCode,
                date: departureDate.value,
                returnDate: document.getElementById('return-date')?.value || null,
                passengers: parseInt(document.getElementById('passengers')?.value) || 1
            };
            
console.log('Sending flight search request:', searchData);

const response = await fetch(`${API_BASE_URL}/flights/search`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(searchData)
});
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Flight search results:', data);
            
            // Display results
            if (resultsSection) {
                displayFlightResults(data, resultsSection);
            }
        } catch (error) {
            console.error('Error searching flights:', error);
            if (resultsSection) {
                resultsSection.innerHTML = `
                    <div class="error-message">
                        <h3>Error searching flights</h3>
                        <p>${error.message}</p>
                    </div>
                `;
            }
        }
    }
    
    // Display flight results
    function displayFlightResults(data, container) {
        if (!data.flights || data.flights.length === 0) {
            container.innerHTML = `
                <div class="no-flights">
                    <h3>No flights found</h3>
                    <p>Try different search criteria or dates</p>
                </div>
            `;
            return;
        }
        
        let html = '<div class="flight-results">';
        
        data.flights.forEach(flight => {
            html += `
                <div class="flight-card">
                    <div class="flight-header">
                        <div class="airline">${flight.airline}</div>
                        <div class="flight-number">${flight.id}</div>
                    </div>
                    <div class="flight-body">
                        <div class="flight-time">
                            <div class="departure">
                                <div class="time">${flight.departureTime}</div>
                                <div class="airport">${flight.from}</div>
                            </div>
                            <div class="flight-duration">
                                <div class="duration-line"></div>
                                <div class="duration-time">${flight.duration}</div>
                            </div>
                            <div class="arrival">
                                <div class="time">${flight.arrivalTime}</div>
                                <div class="airport">${flight.to}</div>
                            </div>
                        </div>
                    </div>
                    <div class="flight-footer">
                        <div class="price">₹${flight.price}</div>
                        <button class="select-btn">Select</button>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }
});