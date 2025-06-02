# 🌦️ AI Weather App

A simple JavaScript web application that fetches and displays real-time weather information based on a user’s city input. It uses the Open-Meteo API to retrieve current weather data, including temperature and conditions, and presents them with friendly icons and dynamic background animations.

---

## 🚀 Project Overview

This app allows users to:

- 🌍 Input a city name
- 🌡 View current temperature and weather conditions
- 🌤 See weather represented by an emoji icon
- 🎨 Experience background animation based on weather type
- 🚫 Handle input errors gracefully (e.g., invalid or misspelled city names)
- 🔁 Clear previous results with a button

Built with vanilla JavaScript, modular architecture, and styled using CSS, the app demonstrates working with asynchronous API calls and error handling in a user-friendly interface.

---

## 🛠️ Installation Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jacquetta/ai-weather-app.git
   cd ai-weather-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run locally (via a simple server like `live-server`, `http-server`, or VS Code Live Server):**

   ```bash
   npx live-server public
   ```

4. **Run tests:**

   ```bash
   npm test
   ```

---

## 🔍 Usage

1. Open the app in your browser (usually at `http://127.0.0.1:8080`).
2. Enter a city name.
3. Click **Get Weather**.
4. View the current temperature, condition, emoji, and animated background!
5. Click **Clear** to reset the app.

---

## ✅ Example Output

```
Weather in: London
Temperature: 17°C
Condition: ⛅️ Partly cloudy
```

---

## 🌈 Preview

**Laptop View:** AI weather App showing current weather results, including temperature, condition, and emoji icon.

<img src="/assets/images/Mood_of_the_City_Weather_App_Results.png" alt="Laptop view of Mood of the City weather app" width="600">

**Mobile View:** Responsive layout that adapts for smaller screens using a clean, readable format.

<img src="/assets/images/Mood_of_the_City_Weather_App_Results_Mobile.png" alt="Mobile view of Mood of the City weather app" width="400">

---

## ✨ Features

- 🌐 Real-time weather via Open-Meteo API
- 🗺 City geolocation lookup
- 🌤️ Weather emoji icons
- 🎨 Animated background gradients based on weather condition
- 🚫 Error handling for invalid cities
- 🔁 Clear button to reset results
- 📦 Modular JavaScript with clean separation of concerns
- ✅ Unit tested (Jest)

---

## ⚠️ Error Handling
- Invalid or misspelled cities trigger a friendly error message.
- Handles API failures (e.g., bad responses, no results).
- Defensive programming protects against missing or malformed data.
- Input is trimmed and validated before being used.

---

## 🔗 API Information
This app uses the Open-Meteo API for:

- Geocoding: Converts city names to coordinates (latitude & longitude).
- Weather Forecast: Fetches current temperature and weather code using coordinates.
- Open-Meteo API Docs: https://open-meteo.com/

---

## 🧪 Testing
Unit tests are written using Jest.

```
npm test
```
Test Coverage Includes:
- Geolocation lookup with valid/invalid cities

- Weather data fetch with valid coordinates

- Descriptive emoji/icon mapping from weather codes

- Error handling for API failures or unexpected inputs

- Combined result function (```getWeatherForCity```) integration

Test file: ```_tests_/main.test.js```

---

## 📁 Project Structure

```
ai-weather-app/
├── _tests_/             # Unit tests (Jest)
│   └── main.test.js
├── node_modules/        # Node dependencies
├── public/
│   └── index.html       # Entry HTML file
├── src/
│   ├── styles/
│   │   └── main.css     # App styling
│   ├── main.js          # DOM and user interaction logic
│   └── weather.js       # API and weather logic
├── babel.config.js      # Babel config for Jest
├── jest.config.js       # Jest testing config
├── package.json         # Project metadata and scripts
├── package-lock.json
└── README.md            # Project documentation
```

---

## 🔮 Future Improvements

- 🌬 Add wind speed and humidity to output
- 🖼 Integrate weather icons using external SVG/PNG sets
- ⏳ Add loading indicators and animations
- 📍 Allow user geolocation (detect current city)
- 🌡 Support additional units (e.g., Fahrenheit)
- 🌍 Add support for multiple languages
- ⚡ Cache API results for better performance
---

