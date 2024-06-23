const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

async function getWeatherData(city) {
    const apiUrl = `https://www.metaweather.com/api/location/search/?query=${city}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.length === 0) {
            locationNotFound.style.display = 'block';
            weatherBody.style.display = 'none';
        } else {
            const woeid = data[0].woeid;
            const weatherUrl = `https://www.metaweather.com/api/location/${woeid}/`;

            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            locationNotFound.style.display = 'none';
            weatherBody.style.display = 'flex';

            // Update UI with weather information
            const currentWeather = weatherData.consolidated_weather[0];
            temperature.innerHTML = `${Math.round(currentWeather.the_temp)} <sup>°C</sup>`;
            description.innerHTML = currentWeather.weather_state_name;
            humidity.innerHTML = `${currentWeather.humidity}%`;
            windSpeed.innerHTML = `${Math.round(currentWeather.wind_speed)} Km/H`;

            // You can set weather image based on weather state abbreviation
            const weatherStateAbbr = currentWeather.weather_state_abbr;
            weatherImg.src = `https://www.metaweather.com/static/img/weather/${weatherStateAbbr}.svg`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Display "Location not found" or handle specific errors
        locationNotFound.style.display = 'block';
        weatherBody.style.display = 'none';
    }
}

// Event listener for search button click
searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a location.');
    }
});
