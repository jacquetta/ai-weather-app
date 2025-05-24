// tests/weather.test.js
import { getCoordinates, getWeather, getWeatherDescription } from '../src/weather.js';

// Mock fetch
global.fetch = jest.fn();

describe('Weather App Tests', () => {
  afterEach(() => {
    fetch.mockClear();
  });

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

  test('getCoordinates throws error for unknown city', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] })
    });

    await expect(getCoordinates("FakeCity")).rejects.toThrow("City not found.");
  });

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

  test('getWeatherDescription returns correct description', () => {
    expect(getWeatherDescription(1)).toBe("Mainly clear");
    expect(getWeatherDescription(99)).toBe("Thunderstorm with heavy hail");
    expect(getWeatherDescription(999)).toBe("Unknown weather condition");
  });
});
