import { cn } from "@/lib/utils";

interface IconProps {
    name: string;
    className?: string;
}

export default function Icon({ name, className }: IconProps) {
    return (
        <img src={`/images/icon-${name}.svg`} alt={`${name} icon`} className={cn("h-6 w-6", className)} />
    )
}
