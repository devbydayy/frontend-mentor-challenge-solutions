import { GeocodingApiResponse, WeatherAPIResponse } from "@/types";

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchLocations = async (query: string): Promise<GeocodingApiResponse> => {
    if (query.length < 2) return { results: [] };
    const response = await fetch(`${GEOCODING_API_URL}?name=${query}&count=5`);
    if (!response.ok) {
        throw new Error('Failed to fetch locations.');
    }
    return response.json();
};


export const fetchWeatherForLocation = async (lat: number, lon: number): Promise<WeatherAPIResponse> => {
    const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lon.toString(),
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
        hourly: 'temperature_2m,weather_code',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: 'auto',
    });

    const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data.');
    }
    return response.json();
};
