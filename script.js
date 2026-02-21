// WHAT'S THE WEATHER UI LOGIC
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

// Simulated Weather Data Pool
const MOCK_CONDITIONS = ['CLEAR_', 'CLOUDY_', 'RAINY_', 'STORM_', 'MISTY_'];

function generateMockWeather(city) {
    const condition = MOCK_CONDITIONS[Math.floor(Math.random() * MOCK_CONDITIONS.length)];
    const temp = Math.floor(Math.random() * 30) - 5; // -5 to 25
    
    return {
        city: city.toUpperCase(),
        country: 'SIM',
        temp: temp,
        condition: condition,
        humidity: Math.floor(Math.random() * 60) + 30,
        wind: Math.floor(Math.random() * 30),
        feelsLike: temp - 2,
        pressure: 1000 + Math.floor(Math.random() * 30)
    };
}

function updateUI(data) {
    weatherDisplay.innerHTML = `
        <div class="city-name">${data.city} // ${data.country}</div>
        <div class="temp-main">${data.temp}°C</div>
        <div class="weather-desc">${data.condition}</div>
        
        <div class="details-grid">
            <div class="detail-item">
                HUMIDITY
                <div class="detail-value">${data.humidity}%</div>
            </div>
            <div class="detail-item">
                WIND SPEED
                <div class="detail-value">${data.wind} KM/H</div>
            </div>
            <div class="detail-item">
                FEELS LIKE
                <div class="detail-value">${data.feelsLike}°C</div>
            </div>
            <div class="detail-item">
                PRESSURE
                <div class="detail-value">${data.pressure} MB</div>
            </div>
        </div>
    `;
}

function showError(msg) {
    weatherDisplay.innerHTML = `
        <div class="city-name">ERROR_</div>
        <div class="temp-main" style="font-size: 2rem; margin: 2rem 0;">${msg}</div>
        <div class="loading" style="animation: none; cursor: pointer;" onclick="location.reload()">RETRY?</div>
    `;
}

async function fetchWeather(city) {
    weatherDisplay.innerHTML = `<div class="loading">FETCHING_${city.toUpperCase()}...</div>`;
    
    // Simulate Network Latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate "City Not Found" for specific keyword
    if (city.toLowerCase() === 'error') {
        showError('CITY_NOT_FOUND');
        return;
    }

    const data = generateMockWeather(city);
    updateUI(data);
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if(city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if(city) fetchWeather(city);
    }
});

// Initial View
fetchWeather('LONDON');
