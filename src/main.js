import {
  getCoordinates,
  getWeather,
  getWeatherDescription,
  getWeatherForCity
} from './weather.js';

// HTML elements you'll use
const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("city");
const weatherContainer = document.getElementById('weatherContainer');
const resultDiv = document.getElementById("weatherResult"); // Use just one container for simplicity
const clearBtn = document.getElementById("clearBtn");
let isLoading = false; // Declare the lock for form submission

// Hide Clear button by default
clearBtn.style.display = 'none';
clearBtn.setAttribute('aria-hidden', 'true'); // Better for screen readers

// Escape user-influenced content before using innerHTML
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

// When the form is submitted
weatherForm.addEventListener("submit", async function (event) {
  event.preventDefault(); // Stop the page from refreshing
  if (isLoading) return // Prevent multiple submissions
  isLoading = true; // Set loading state to true

  const cityName = cityInput.value.trim(); // Get what the user typed

  // Clear any previous weather info
  resultDiv.innerHTML = '';
  clearBtn.style.display = 'none';
  clearBtn.setAttribute('aria-hidden', 'true');

  // Show an error if city is blank
  if (!cityName) {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Please enter a city name.";
    errorMsg.style.color = "red";
    resultDiv.appendChild(errorMsg);
    isLoading = false; // Reset loading state
    return;
  }

  try {
    // Get weather data from your API functions
    const result = await getWeatherForCity(cityName);

    // Create container for styled weather info
    const container = document.createElement("div");
    container.style.padding = "1rem";
    container.style.border = "1px solid #ccc";
    container.style.borderRadius = "8px";
    container.style.backgroundColor = "#f9f9f9";

    // Create and fill paragraphs with safe, escaped data
    const cityPara = document.createElement("p");
    cityPara.innerHTML = `<strong>Weather in:</strong> ${escapeHTML(result.city)}`;

    const tempPara = document.createElement("p");
    tempPara.innerHTML = `<strong>Temperature:</strong> ${escapeHTML(result.temperature.toString())}°C`;

    const condPara = document.createElement("p");
    condPara.innerHTML = `<strong>Condition:</strong> ${escapeHTML(result.icon)} ${escapeHTML(result.description)}`;

    // Put all paragraphs into the container, then into the result div
    container.appendChild(cityPara);
    container.appendChild(tempPara);
    container.appendChild(condPara);
    resultDiv.appendChild(container);

    //Show the result container
    resultDiv.style.display = 'block';

    // Show the Clear button now that we have content
    clearBtn.style.display = 'inline-block';
    clearBtn.removeAttribute('aria-hidden');

  } catch (error) {
    // If something goes wrong, show an error message
    const errorPara = document.createElement("p");
    errorPara.textContent = `Error: ${error.message}`;
    errorPara.style.color = "red";
    resultDiv.appendChild(errorPara);
  } finally {
    isLoading = false; // Reset loading state after the operation
  }
});

// Clear button logic
clearBtn.addEventListener('click', () => {
  resultDiv.innerHTML = '';         // Clear the weather info display
  resultDiv.style.display = 'none'; // Hide the weather info display
  cityInput.value = '';             // Clear the city input field in the form
  clearBtn.style.display = 'none'; // Hide the Clear button again
  clearBtn.setAttribute('aria-hidden', 'true'); // Accessibility: mark it as hidden
});

