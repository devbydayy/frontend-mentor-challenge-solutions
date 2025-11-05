export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface GeocodingApiResponse {
  results?: {
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
  }[];
}

export interface WeatherAPIResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    is_day: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}

export interface ProcessedWeatherData {
  current: {
    temperature: number;
    feelsLike: number;
    weatherCode: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    isDay: boolean;
  };
  daily: {
    time: string;
    weatherCode: number;
    tempMax: number;
    tempMin: number;
  }[];
  hourly: {
    time: string;
    temperature: number;
    weatherCode: number;
  }[];
}
