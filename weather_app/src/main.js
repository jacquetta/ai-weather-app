document.getElementById('weatherForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('result');

    if (!city) {
        resultDiv.textContent = 'Please enter a city name.';
        return;
    }

    try {
        //Step 1: Get latitude and longitude from city name
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            resultDiv.textContent = 'City not found.';
            return;
        }
        const { latitude, longitude } = geoData.results[0];

        //Step 2: Fetch weather using coodinates
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        const temperature = weatherData.current_weather.temperature;

        resultDiv.textContent = `Current Temperature in ${city} is ${temperature}°C.`;
    } catch (error){
        console.error(error);
        resultDiv.textContent = 'Something went wrong. Please try again.'
    }
    });