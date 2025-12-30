import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function Card({ children, className, hoverEffect = true }: CardProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-sm border border-white/5 bg-[#151515] p-6 transition-all duration-300",
                hoverEffect && "hover:border-accent/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.05)] bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat hover:bg-[position:200%_0,0_0] hover:transition-[background-position_0.6s_ease-in-out]",
                className
            )}
        >
            {children}
        </div>
    );
}
