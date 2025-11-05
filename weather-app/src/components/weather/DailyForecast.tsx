import { Card, CardContent, CardHeader, CardTitle } from "../core/Card";
import { useAppSelector } from "@/store/hooks";
import { formatTemperature, getWeatherIcon } from "@/lib/formatters";
import { ProcessedWeatherData } from "@/types";

interface DailyForecastProps {
    data: ProcessedWeatherData['daily'];
}

export default function DailyForecast({ data }: DailyForecastProps) {
    const { tempUnit } = useAppSelector((state) => state.settings);
    
    return (
        <Card className="bg-transparent shadow-none p-0">
            <CardHeader className="mt-12">
                <CardTitle>Daily forecast</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-4">
                    {data.map((day, index) => (
                        <div key={day.time} className="flex flex-col bg-neutral-800 border border-white/10 items-center px-3 py-3 rounded-lg">
                            <p className="text-m text-neutral-200">{new Date(day.time).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                            <img src={getWeatherIcon(day.weatherCode)} alt="weather icon" className="h-14 w-14 my-5"/>
                            <div className="text-m flex justify-between w-full">
                                <span>{formatTemperature(day.tempMax, tempUnit)}</span>
                                <span className="text-neutral-300 ml-1">{formatTemperature(day.tempMin, tempUnit)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
