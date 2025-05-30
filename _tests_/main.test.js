// tests/weather.test.js
import { getCoordinates, getWeather, getWeatherDescription, getWeatherForCity } from '../src/weather.js';

// Mock fetch
global.fetch = jest.fn();

describe('Weather App Tests', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  //Checks to see if valid city returns correct lat/lon
  test('getCoordinates returns correct lat/lon for a valid city', async () => {
    const mockGeoResponse = {
      results: [{ latitude: 40.7128, longitude: -74.0060, name: "New York" }]
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockGeoResponse
    });

    const coords = await getCoordinates("New York");
    expect(coords).toEqual({ latitude: 40.7128, longitude: -74.0060, name: "New York" });
  });

  //Checks to see if invalid city throws error
  test('getCoordinates throws error for unknown city', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] })
    });

    await expect(getCoordinates("FakeCity")).rejects.toThrow("City not found.");
  });

  //Checks to see if it returns temperature and weather code
  test('getWeather returns temperature and code', async () => {
    const mockWeatherResponse = {
      current_weather: { temperature: 23.5, weathercode: 2 }
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherResponse
    });

    const data = await getWeather(40.7128, -74.0060);
    expect(data).toEqual({ temperature: 23.5, weathercode: 2 });
  });

  // Checks to see if known code returns correct icon and text
  test('getWeatherDescription returns correct description', () => {
  expect(getWeatherDescription(1)).toEqual({ text: "Mainly clear", icon: "🌤" });
  expect(getWeatherDescription(99)).toEqual({ text: "Thunderstorm with heavy hail", icon: "🌩️" });
  expect(getWeatherDescription(999)).toEqual({ text: "Unknown weather condition", icon: "?" });
  });

  //Checks for apps resilience to external API failures
  test('getCoordinates throws error on fetch failure', async () => {
  fetch.mockRejectedValueOnce(new Error("Network error"));
  await expect(getCoordinates("New York")).rejects.toThrow("Network error");
  });  

  //Stimulates a bad API response
  test('getWeather throws on bad API response', async () => {
  fetch.mockResolvedValueOnce({ ok: false, status: 500 });
  await expect(getWeather(40.7128, -74.0060)).rejects.toThrow("Failed to fetch weather data");
});

//Test to hit the fallback in getWeatherDescription
test('getWeatherDescription handles undefined or invalid code', () => {
  expect(getWeatherDescription(undefined)).toEqual({ text: "Unknown weather condition", icon: "?" });
});

// When `results` is undefined
test('getCoordinates handles missing results key', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({})
  });
  await expect(getCoordinates("Nowhere")).rejects.toThrow("City not found.");
});

// Checks that getWeather throws an error if latitude or longitude are NOT numbers
test('getWeather throws if latitude or longitude are not numbers', async () => {
  await expect(getWeather("notANumber", 100)).rejects.toThrow("Latitude and longitude must be numbers");
  await expect(getWeather(40, null)).rejects.toThrow("Latitude and longitude must be numbers");
});

// Tests the combined getWeatherForCity function:
// - Mocks fetch calls for both coordinate and weather APIs
// - Ensures it returns the full weather info with city name, temperature, description, and icon
test('getWeatherForCity returns combined weather data', async () => {
  // Mock first fetch for getCoordinates
  jest.spyOn(global, 'fetch')
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [{ latitude: 10, longitude: 20, name: 'TestCity' }] })
    })
    // Mock second fetch for getWeather
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ current_weather: { temperature: 25, weathercode: 0 } })
    });

  const result = await getWeatherForCity('TestCity');

  // Assert the combined return structure and values
  expect(result).toEqual({
    city: 'TestCity',
    temperature: 25,
    description: "Clear sky",
    icon: '☀️',
  });
});

});


