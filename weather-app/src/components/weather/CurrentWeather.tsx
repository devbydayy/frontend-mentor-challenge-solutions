import { useAppSelector } from "@/store/hooks";
import { formatTemperature, getWeatherIcon } from "@/lib/formatters";
import { ProcessedWeatherData, Location } from "@/types";

interface CurrentWeatherProps {
    data: ProcessedWeatherData['current'];
    location: Location;
}

export default function CurrentWeather({ data, location }: CurrentWeatherProps) {
    const { tempUnit } = useAppSelector((state) => state.settings);
    const weatherIcon = getWeatherIcon(data.weatherCode);

    return (
        <div 
            className="rounded-lg p-6 md:p-20 min-h-64 md:min-h-0 bg-gradient-to-br from-blue-700 to-blue-500 
                       flex flex-col md:flex-row justify-center md:justify-between items-center 
                       bg-cover bg-center" 
            style={{ backgroundImage: "url('/images/bg-today-large.svg')"}}
        >

            <div className="w-full md:w-auto mb-4 md:mb-0 text-center md:text-left"> 
                <h2 className="text-2xl font-bold">{location.name}, {location.country}</h2>
                <p className="text-neutral-200">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
            </div>
            

            <div className="flex items-center space-x-4 justify-center w-full md:w-auto md:justify-end">
                <img src={weatherIcon} alt="Weather icon" className="h-20 w-20 inline-block" />
                <p className="text-7xl font-bold italic">{formatTemperature(data.temperature, tempUnit)}</p>
            </div>
        </div>
    );
}
