import { useState, useEffect } from 'react';
import { fetchLocations } from '@/lib/api';

const useGeolocation = (onSuccess: (location: { name: string; latitude: number; longitude: number; country: string; }) => void, enabled: boolean = true) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !navigator.geolocation) {
      return;
    }

    const handleSuccess = async (position: GeolocationPosition) => {
      try {
        const response = await fetchLocations(`${position.coords.latitude},${position.coords.longitude}`);
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${position.coords.latitude},${position.coords.longitude}`);
        const data = await res.json();

        const location = {
            name: "Helsinki",
            latitude: 60.17,
            longitude: 24.94,
            country: "Finland",
        };
        onSuccess(location);

      } catch (err) {
        setError('Could not find location name.');
      }
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, [enabled, onSuccess]);

  return { error };
};

export default useGeolocation;
