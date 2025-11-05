import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../core/Card";
import { useAppSelector } from "@/store/hooks";
import { formatTemperature, getWeatherIcon } from "@/lib/formatters";
import { ProcessedWeatherData } from "@/types";
import Dropdown, { DropdownItem } from "../core/Dropdown";
import { cn } from "@/lib/utils";

export default function HourlyForecast({ data }: { data: ProcessedWeatherData['hourly']}) {
    const { tempUnit } = useAppSelector((state) => state.settings);
    const [selectedDay, setSelectedDay] = useState(new Date().toISOString().split('T')[0]);

    const hoursForSelectedDay = data.filter(h => h.time.startsWith(selectedDay));
    const availableDays = [...new Set(data.map(h => h.time.split('T')[0]))].slice(0, 7);

    const now = new Date();
    const currentDayHours = hoursForSelectedDay.filter(h => new Date(h.time) >= now);
    const displayHours = selectedDay === now.toISOString().split('T')[0] ? currentDayHours : hoursForSelectedDay;

    const getDayName = (day: string) => new Date(day).toLocaleDateString('en-US', { weekday: 'long' });    

    const trigger = (
        <button className="bg-neutral-700 border border-neutral-600 rounded-md px-3 py-1 text-sm flex items-center text-white">
            {getDayName(selectedDay)}
            <svg className="w-4 h-4 ml-1 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
    );
    
    return (
        <Card className="h-full">
            <CardHeader className="flex-row justify-between items-center">
                <CardTitle>Hourly forecast</CardTitle>

                <Dropdown trigger={trigger} className="w-40">
                    {availableDays.map(day => (
                        <DropdownItem 
                            key={day} 
                            onClick={() => setSelectedDay(day)}
                            className={cn(day === selectedDay && 'bg-neutral-700')}
                        >
                            {getDayName(day)}
                        </DropdownItem>
                    ))}
                </Dropdown>

            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {displayHours.map(hour => (
                        <div key={hour.time} className="flex justify-between items-center p-3 rounded-md hover:bg-neutral-500/50 bg-neutral-700">
                            <div className="flex items-center space-x-3">
                                <img src={getWeatherIcon(hour.weatherCode)} alt="weather icon" className="h-8 w-8" />
                                <p className="font-medium text-neutral-300">{new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}</p>
                            </div>
                            <p className="font-semibold">{formatTemperature(hour.temperature, tempUnit)}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
