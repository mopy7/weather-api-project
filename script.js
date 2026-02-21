// NOTHING WEATHER UI LOGIC
const timeDisplay = document.getElementById('time-display');
const weatherDisplay = document.getElementById('weather-display');
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

// Update Clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    timeDisplay.textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

// Mock Weather Data for Initial UI Test
function showMockData() {
    weatherDisplay.innerHTML = `
        <div class="city-name">LONDON // UK</div>
        <div class="temp-main">12°C</div>
        <div class="weather-desc">CLOUDY_</div>
        
        <div class="details-grid">
            <div class="detail-item">
                HUMIDITY
                <div class="detail-value">72%</div>
            </div>
            <div class="detail-item">
                WIND SPEED
                <div class="detail-value">14 KM/H</div>
            </div>
            <div class="detail-item">
                FEELS LIKE
                <div class="detail-value">10°C</div>
            </div>
            <div class="detail-item">
                PRESSURE
                <div class="detail-value">1012 MB</div>
            </div>
        </div>
    `;
}

// Initial Call
showMockData();

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if(city) {
        weatherDisplay.innerHTML = `<div class="loading">FETCHING_${city}...</div>`;
        // Real API implementation will go here
        setTimeout(showMockData, 1500); // Simulate API call
    }
});
