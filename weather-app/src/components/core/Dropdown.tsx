
import { cn } from "@/lib/utils";

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export default function Dropdown({ trigger, children, className }: DropdownProps) {
    return (
        <div className="relative inline-block text-left group">
            <div>{trigger}</div>
            <div className={cn("origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-neutral-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-focus-within:block group-hover:block z-50", className)}>
                <div className="py-1" role="menu" aria-orientation="vertical">
                    {children}
                </div>
            </div>
        </div>
    );
}


export const DropdownItem = ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => {
    return (
        <a
          href="#"
          className="flex justify-center py-1 px-2 text-sm w-full" 
          role="menuitem"
          onClick={onClick}
        >
            <div
                className={cn(
                    "w-full flex items-center px-2 py-2 text-neutral-200 hover:bg-neutral-700 rounded-md", 
                    className
                )}
            >
                {children}
            </div>
        </a>
    )
}
