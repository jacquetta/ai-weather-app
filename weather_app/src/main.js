 // Wait for the form to be submitted
    document.getElementById("weatherForm").addEventListener("submit", async function(event) {
      event.preventDefault(); // Prevent form from refreshing the page

      const cityInput = document.getElementById("city").value.trim(); // Get city name from input
      const resultDiv = document.getElementById("weatherResult"); // Div to show results

      // Clear previous results
      resultDiv.innerHTML = "";

      if (!cityInput) {
        resultDiv.innerHTML = "Please enter a city name.";
        return;
      }

      try {
        // === Step 1: Get Latitude and Longitude ===
        const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityInput)}&count=1`;
        const geoResponse = await fetch(geoURL);

        if (!geoResponse.ok) {
          throw new Error("Failed to fetch location data.");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("City not found. Please check the name and try again.");
        }

        // Extract the first result's latitude, longitude, and official name
        const { latitude, longitude, name: matchedCity } = geoData.results[0];

        // === Step 2: Get Weather Data ===
        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
          throw new Error("Failed to fetch weather data.");
        }

        const weatherData = await weatherResponse.json();

        if (!weatherData.current_weather) {
          throw new Error("Current weather data is unavailable.");
        }

        const { temperature, weathercode } = weatherData.current_weather;

        // Get readable weather description from weather code
        const description = getWeatherDescription(weathercode);

        // === Step 3: Display Results ===
        resultDiv.innerHTML = `
          <strong>City:</strong> ${matchedCity}<br>
          <strong>Temperature:</strong> ${temperature}°C<br>
          <strong>Weather:</strong> ${description}
        `;
      } catch (error) {
        // Display a readable error message
        resultDiv.innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
      }
    });

    // === Helper Function to Translate Weather Code into Description ===
    function getWeatherDescription(code) {
      const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
      };
      return weatherCodes[code] || "Unknown weather condition";
    }
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