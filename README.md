# 🌦️ AI Weather App

A simple JavaScript web application that fetches and displays real-time weather information based on a user’s city input. It uses the Open-Meteo API to retrieve current weather data, including temperature and condition, and shows friendly icons and messages.

---

## 🚀 Project Overview

This app allows users to:

* Input a city name
* View current temperature and weather conditions
* See weather represented by an emoji icon
* Handle input errors gracefully (e.g., invalid or misspelled city names)

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
4. View the current temperature and condition with an emoji!

---

## ✅ Example Output

```
Weather in: London
Temperature: 17°C
Condition: ⛅️ Partly cloudy
```

---

## ✨ Features

* 🌐 Real-time weather via Open-Meteo API
* 🗺 City geolocation lookup
* 🌤️ Weather emoji icons
* 🚫 Error handling for invalid cities
* 📦 Modular JavaScript with clean separation of concerns
* ✅ Unit tested (Jest)

---

## 🔮 Future Improvements

* Add wind speed and humidity to output
* Integrate weather icons using external SVG/PNG sets
* Add loading indicators and animations
* Allow user geolocation (detect current city)
* Support additional languages or units (e.g., Fahrenheit)
* Cache API results for better performance

---

