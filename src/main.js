// src/main.js

import {
  getCoordinates,
  getWeather,
  getWeatherDescription,
  getWeatherForCity
} from './weather.js';

document.getElementById("weatherForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const cityInput = document.getElementById("city").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  resultDiv.innerHTML = "";

  if (!cityInput) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  try {
    const result = await getWeatherForCity(cityInput);
    resultDiv.innerHTML = `
      <p><strong>Weather in:</strong> ${result.city}<br></p>
      <p><strong>Temperature:</strong> ${result.temperature}°C<br></p>
      <p><strong>Condition:</strong> ${result.icon} ${result.description}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
  }
});
