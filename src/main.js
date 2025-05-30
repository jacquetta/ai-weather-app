import {
  getCoordinates,
  getWeather,
  getWeatherDescription,
  getWeatherForCity
} from './weather.js';

// Add event listener for form submission
document.getElementById("weatherForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form from submitting and reloading the page

  const cityInput = document.getElementById("city").value.trim(); // Get city input from user
  const resultDiv = document.getElementById("weatherResult"); // Where the weather result will be displayed

  // Clear any previous results
  resultDiv.innerHTML = ""; // Safe because we're clearing trusted content we created earlier

  // Show a message if no city is entered
  if (!cityInput) {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Please enter a city name."; // textContent automatically escapes any potential HTML
    errorMsg.style.color = "red";
    resultDiv.appendChild(errorMsg);
    return;
  }

  try {
    // Call your function to get weather data for the entered city
    const result = await getWeatherForCity(cityInput);

    // Create a styled container to hold the result
    const container = document.createElement("div");
    container.style.padding = "1rem";
    container.style.border = "1px solid #ccc";
    container.style.borderRadius = "8px";
    container.style.backgroundColor = "#f9f9f9";

    // Create each paragraph separately and escape any dynamic content
    const cityPara = document.createElement("p");
    cityPara.innerHTML = `<strong>Weather in:</strong> ${escapeHTML(result.city)}`;
    // Using escapeHTML ensures that even if result.city had malicious code, it will be safely displayed as plain text

    const tempPara = document.createElement("p");
    tempPara.innerHTML = `<strong>Temperature:</strong> ${escapeHTML(result.temperature.toString())}°C`;

    const condPara = document.createElement("p");
    condPara.innerHTML = `<strong>Condition:</strong> ${escapeHTML(result.icon)} ${escapeHTML(result.description)}`;

    // Append all paragraphs to the container, then to the result div
    container.appendChild(cityPara);
    container.appendChild(tempPara);
    container.appendChild(condPara);
    resultDiv.appendChild(container);

  } catch (error) {
    // Show error message safely
    const errorPara = document.createElement("p");
    errorPara.style.color = "red";
    errorPara.textContent = `Error: ${error.message}`; // textContent keeps error message safe from XSS
    resultDiv.appendChild(errorPara);
  }
});

/**
 * escapeHTML
 * Escapes special HTML characters in a string to prevent XSS.
 * This is essential when inserting user-influenced data using innerHTML.
 */
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (match) {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return escapeMap[match];
  });
}
