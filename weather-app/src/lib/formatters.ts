import { WeatherAPIResponse, ProcessedWeatherData } from '../types';

export const processWeatherData = (data: WeatherAPIResponse): ProcessedWeatherData => {
  return {
    current: {
      temperature: data.current.temperature_2m,
      feelsLike: data.current.apparent_temperature,
      weatherCode: data.current.weather_code,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      precipitation: data.current.precipitation,
      isDay: data.current.is_day === 1,
    },
    daily: data.daily.time.map((t, i) => ({
      time: t,
      weatherCode: data.daily.weather_code[i],
      tempMax: data.daily.temperature_2m_max[i],
      tempMin: data.daily.temperature_2m_min[i],
    })).slice(0, 7),
    hourly: data.hourly.time.map((t, i) => ({
      time: t,
      temperature: data.hourly.temperature_2m[i],
      weatherCode: data.hourly.weather_code[i],
    })),
  };
};

export const getWeatherIcon = (weatherCode: number): string => {
    const iconMap: { [key: number]: string } = {
        0: 'icon-sunny.webp',
        1: 'icon-partly-cloudy.webp',
        2: 'icon-partly-cloudy.webp',
        3: 'icon-overcast.webp',
        45: 'icon-fog.webp',
        48: 'icon-fog.webp',
        51: 'icon-drizzle.webp',
        53: 'icon-drizzle.webp',
        55: 'icon-drizzle.webp',
        61: 'icon-rain.webp',
        63: 'icon-rain.webp',
        65: 'icon-rain.webp',
        66: 'icon-rain.webp',
        67: 'icon-rain.webp',
        71: 'icon-snow.webp',
        73: 'icon-snow.webp',
        75: 'icon-snow.webp',
        77: 'icon-snow.webp',
        80: 'icon-rain.webp',
        81: 'icon-rain.webp',
        82: 'icon-rain.webp',
        85: 'icon-snow.webp',
        86: 'icon-snow.webp',
        95: 'icon-storm.webp',
        96: 'icon-storm.webp',
        99: 'icon-storm.webp',
    };
    return `/images/${iconMap[weatherCode] || 'icon-sunny.webp'}`;
};

export const formatTemperature = (temp: number, unit: 'C' | 'F'): string => {
    if (unit === 'F') {
        return `${Math.round((temp * 9/5) + 32)}°`;
    }
    return `${Math.round(temp)}°`;
};

export const formatWindSpeed = (speed: number, unit: 'km/h' | 'mph'): string => {
    if (unit === 'mph') {
        return `${Math.round(speed * 0.621371)} mph`;
    }
    return `${Math.round(speed)} km/h`;
};

export const formatPrecipitation = (precip: number, unit: 'mm' | 'in'): string => {
     if (unit === 'in') {
        return `${(precip * 0.0393701).toFixed(1)} in`;
    }
    return `${Math.round(precip)} mm`;
};
