'use client';

import { useState } from 'react';
import SearchBar from '@/components/weather/SearchBar';
import CurrentWeather from '@/components/weather/CurrentWeather';
import WeatherDetails from '@/components/weather/WeatherDetails';
import DailyForecast from '@/components/weather/DailyForecast';
import HourlyForecast from '@/components/weather/HourlyForecast';
import useWeatherAPI from '@/hooks/useWeatherAPI';
import useGeolocation from '@/hooks/useGeolocation';
import { Location } from '@/types';
import WeatherSkeleton from '@/components/weather/WeatherSkeleton'; 
import '@/styles/globals.css';

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const { weatherData, isLoading, error, fetchWeather } = useWeatherAPI();

  useGeolocation(
    (location) => {
      setSelectedLocation(location);
      fetchWeather(location.latitude, location.longitude);
    },
    !selectedLocation
  );

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    fetchWeather(location.latitude, location.longitude);
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 max-w-desktop">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-grotesque font-bold mb-14">
          How’s the sky looking today?
        </h1>
        <SearchBar onLocationSelect={handleLocationSelect} />
      </div>

      {isLoading && (
        <WeatherSkeleton /> 
      )}
      {error && !isLoading && (
         <div className="text-center p-8 bg-neutral-800 rounded-lg">
            <p className="text-lg text-red-400">{error}</p>
         </div>
      )}
      {weatherData && !isLoading && !error && selectedLocation && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CurrentWeather
              data={weatherData.current}
              location={selectedLocation}
            />
            <WeatherDetails data={weatherData.current} />
            <DailyForecast data={weatherData.daily} />
          </div>
          <div className="lg:col-span-1">
            <HourlyForecast data={weatherData.hourly} />
          </div>
        </div>
      )}
       {!weatherData && !isLoading && !error && (
        <div className="text-center p-16 bg-neutral-800/50 rounded-lg mt-8">
            <p className="text-neutral-300">Search for a place to see the weather forecast.</p>
        </div>
       )}
    </div>
  );
}
