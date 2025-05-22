async function getWeather() {
      const cityName = document.getElementById("cityInput").value.trim();
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "Loading...";

      if (!cityName) {
        resultDiv.innerHTML = "Please enter a city name.";
        return;
      }

      try {
        // Step 1: Get coordinates
        const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
        const geoResponse = await fetch(geoURL);
        if (!geoResponse.ok) throw new Error("Geocoding API error");
        const geoData = await geoResponse.json();
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("City not found.");
        }

        const { latitude, longitude, name: city } = geoData.results[0];

        // Step 2: Get weather
        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await fetch(weatherURL);
        if (!weatherResponse.ok) throw new Error("Weather API error");
        const weatherData = await weatherResponse.json();

        if (!weatherData.current_weather) {
          throw new Error("Weather data not available.");
        }

        const { temperature, weathercode } = weatherData.current_weather;
        const description = getWeatherDescription(weathercode);

        // Display result
        resultDiv.innerHTML = `
          <strong>City:</strong> ${city}<br>
          <strong>Temperature:</strong> ${temperature}°C<br>
          <strong>Condition:</strong> ${description}
        `;
      } catch (err) {
        resultDiv.innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
      }
    }

    function getWeatherDescription(code) {
      const codes = {
        0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
        45: "Fog", 48: "Depositing rime fog",
        51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
        61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
        71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow",
        80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
        95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"
      };
      return codes[code] || "Unknown weather condition";
    }


// document.getElementById('weatherForm').addEventListener('submit', async function(e) {
//     e.preventDefault();

//     const city = document.getElementById('cityInput').value.trim();
//     const resultDiv = document.getElementById('result');

//     if (!city) {
//         resultDiv.textContent = 'Please enter a city name.';
//         return;
//     }

//     try {
//         //Step 1: Get latitude and longitude from city name
//         const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);

//         const geoData = await geoResponse.json();

//         if (!geoData.results || geoData.results.length === 0) {
//             resultDiv.textContent = 'City not found.';
//             return;
//         }
//         const { latitude, longitude } = geoData.results[0];

//         //Step 2: Fetch weather using coodinates
//         const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
//         const weatherData = await weatherResponse.json();

//         const temperature = weatherData.current_weather.temperature;

//         resultDiv.textContent = `Current Temperature in ${city} is ${temperature}°C.`;
//     } catch (error){
//         console.error(error);
//         resultDiv.textContent = 'Something went wrong. Please try again.'
//     }
//     });