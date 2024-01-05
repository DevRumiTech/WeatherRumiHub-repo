const apiKey = '0e0734877a8e5af39063df8d0e4cb3d1';
const locationInput = document.getElementById('locationInput');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
let isMetric = true; // Default to metric units

function searchWeather() {
    const location = locationInput.value;

    if (!location) {
        alert('Please enter a location.');
        return;
    }

    fetchWeatherData(location);
}

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${isMetric ? 'metric' : 'imperial'}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            currentWeatherDiv.innerHTML = `<h2>${data.name}, ${data.sys.country}</h2>
                                           <p>Temperature: ${data.main.temp} ${isMetric ? '°C' : '°F'}</p>
                                           <p>Weather: ${data.weather[0].description}</p>`;

            // Implement logic for fetching and displaying forecast information
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data. Please try again.');
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Fetch and display weather data for the user's location
    fetchWeatherData(`${latitude},${longitude}`);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred while fetching location.');
            break;
    }
}

function toggleUnits() {
    isMetric = !isMetric;
    // Update UI with selected units (Celsius/Fahrenheit, metric/imperial)
    const location = locationInput.value;
    if (location) {
        fetchWeatherData(location);
    }
}
