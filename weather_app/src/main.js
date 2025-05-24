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
      <strong>City:</strong> ${result.city}<br>
      <strong>Temperature:</strong> ${result.temperature}°C<br>
      <strong>Weather:</strong> ${result.description}
    `;
  } catch (error) {
    resultDiv.innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
  }
});
