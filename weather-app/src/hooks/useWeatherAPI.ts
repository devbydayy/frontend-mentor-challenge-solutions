import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherForLocation } from '@/lib/api';
import { processWeatherData } from '@/lib/formatters';
import { ProcessedWeatherData } from '@/types';

const useWeatherAPI = () => {
  const [latLon, setLatLon] = useState<{ lat: number; lon: number } | null>(null);

  const { data: weatherData, isLoading, error } = useQuery<ProcessedWeatherData, Error>({
    queryKey: ['weather', latLon],
    queryFn: async () => {
      if (!latLon) throw new Error("Location not provided.");
      const rawData = await fetchWeatherForLocation(latLon.lat, latLon.lon);
      return processWeatherData(rawData);
    },
    enabled: !!latLon,
    staleTime: 1000 * 60 * 15,
    retry: 1,
  });

  const fetchWeather = (lat: number, lon: number) => {
    setLatLon({ lat, lon });
  };
  
  return { weatherData, isLoading, error: error?.message || null, fetchWeather };
};

export default useWeatherAPI;
