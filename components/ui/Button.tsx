import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "outline", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "relative inline-flex h-12 items-center justify-center rounded-sm px-8 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background font-mono uppercase tracking-wider",
                    variant === "outline" &&
                    "border border-accent text-accent hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]",
                    variant === "primary" &&
                    "bg-accent text-background hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]",
                    variant === "ghost" && "text-text-muted hover:text-accent",
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
