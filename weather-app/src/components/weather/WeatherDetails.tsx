import { Card, CardContent, CardHeader, CardTitle } from "../core/Card";
import { useAppSelector } from "@/store/hooks";
import { formatTemperature, formatWindSpeed, formatPrecipitation } from "@/lib/formatters";
import { ProcessedWeatherData } from "@/types";

interface WeatherDetailsProps {
    data: ProcessedWeatherData['current'];
}

export default function WeatherDetails({ data }: WeatherDetailsProps) {
    const { tempUnit, speedUnit, precipUnit } = useAppSelector((state) => state.settings);

    const details = [
        { label: "Feels Like", value: formatTemperature(data.feelsLike, tempUnit) },
        { label: "Humidity", value: `${data.humidity}%`},
        { label: "Wind", value: formatWindSpeed(data.windSpeed, speedUnit) },
        { label: "Precipitation", value: formatPrecipitation(data.precipitation, precipUnit)}
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {details.map(detail => (
                 <Card key={detail.label} className="border border-white/10">
                    <CardHeader>
                        <CardTitle className="text-neutral-300 text-base">{detail.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl">{detail.value}</p>
                    </CardContent>
                 </Card>
            ))}
        </div>
    );
}
