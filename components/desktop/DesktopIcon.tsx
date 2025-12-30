"use client";

interface DesktopIconProps {
    label: string;
    iconSrc: string;
    onClick?: () => void;
}

export default function DesktopIcon({ label, iconSrc, onClick }: DesktopIconProps) {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center gap-1 w-20 cursor-pointer group active:opacity-50"
        >
            <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center">
                <img src={iconSrc} alt={label} className="w-full h-full object-contain filter drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]" />
            </div>
            <span className="text-white font-pixel text-xs md:text-sm text-center px-1 border border-transparent group-hover:bg-[#000080] group-hover:border-dotted group-hover:border-white/50 truncate w-full shadow-[1px_1px_1px_black]">
                {label}
            </span>
        </div>
    );
}
