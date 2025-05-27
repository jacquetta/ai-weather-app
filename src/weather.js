// src/weather.js

// Fetch coordinates based on city name
export async function getCoordinates(city) {
  const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const geoResponse = await fetch(geoURL);

  if (!geoResponse.ok) throw new Error("Failed to fetch location data.");

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found. Please check the name and try again.");
  }

  const { latitude, longitude, name } = geoData.results[0];
  return { latitude, longitude, name };
}

// Fetch weather data based on coordinates and includes try/catch to catch issues early (e.g., if undefined or non-numbers provided) 
export async function getWeather(latitude, longitude) {
  try {
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      throw new Error("Latitude and longitude must be numbers.");
    }

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await fetch(weatherURL);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.current_weather) {
      throw new Error("Current weather data is unavailable.");
    }

    return data.current_weather;
  } catch (error) {
    // Re-throw with additional context
    throw new Error(`getWeather error: ${error.message}`);
  }
}


// Convert weather code to description
export function getWeatherDescription(code) {
  const weatherCodes = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Depositing rime fog", 51: "Light drizzle", 53: "Moderate drizzle",
    55: "Dense drizzle", 61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
    71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow", 80: "Slight rain showers",
    81: "Moderate rain showers", 82: "Violent rain showers", 95: "Thunderstorm",
    96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"
  };
  const weatherIcons = {
    0: '☀️',
    1: '🌤',
    2: '⛅️',
    3: '☁️',
    45: '🌫',
    48: '🌫',
    51: '🌦',
    61: '🌧',
    63: '🌧️',
    65: '🌧️',
    71: '🌨️',
    75: '❄️',
    80: '🌧️',
    95: '⛈️',
    99: '🌩️'
  };
return{
  text: weatherCodes[code] || "Unknown weather condition",
  icon: weatherIcons[code] || '?'
}
}

// Combined function to use in tests
export async function getWeatherForCity(city) {
  const { latitude, longitude, name } = await getCoordinates(city);
  const { temperature, weathercode } = await getWeather(latitude, longitude);
  const { text, icon } = getWeatherDescription(weathercode);
  return {
    city: name,
    temperature,
    description: text,
    icon
  };
}

