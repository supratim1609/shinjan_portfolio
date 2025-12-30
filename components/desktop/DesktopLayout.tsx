"use client";

import { useState, useEffect } from "react";
import WindowFrame from "./WindowFrame";
import Taskbar from "./Taskbar";
import DesktopIcon from "./DesktopIcon";
import BootScreen from "./BootScreen";

interface DesktopLayoutProps {
    children: React.ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
    const [isBooting, setIsBooting] = useState(true);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false); // Closed initially, opens after boot

    // Auto-open terminal after boot
    useEffect(() => {
        if (!isBooting) {
            setTimeout(() => setIsTerminalOpen(true), 500);
        }
    }, [isBooting]);

    if (isBooting) {
        return <BootScreen onComplete={() => setIsBooting(false)} />;
    }

    return (
        <div className="min-h-screen w-full bg-[#008080] overflow-hidden relative font-pixel selection:bg-[#000080] selection:text-white">

            {/* Desktop Icons Grid */}
            <div className="absolute top-4 left-4 flex flex-col gap-6 z-0">
                <DesktopIcon
                    label="My Computer"
                    iconSrc="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png"
                />
                <DesktopIcon
                    label="Recycle Bin"
                    iconSrc="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png"
                />
                <DesktopIcon
                    label="ShinjanOS"
                    iconSrc="https://win98icons.alexmeub.com/icons/png/console_prompt-0.png"
                    onClick={() => setIsTerminalOpen(true)}
                />
                <DesktopIcon
                    label="Internet"
                    iconSrc="https://win98icons.alexmeub.com/icons/png/msie1-2.png"
                />
            </div>

            {/* Pattern Overlay for authentic dithering effect (Optional) */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2r9//38gYGAEESAAEGAAasgJOgzOKCoAAAAASUVORK5CYII=')] z-0 mix-blend-overlay"></div>

            {/* Windows Container */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {isTerminalOpen && (
                    <div className="pointer-events-auto">
                        <WindowFrame
                            title="ShinjanOS Terminal - tty1"
                            onClose={() => setIsTerminalOpen(false)}
                            onMinimize={() => setIsTerminalOpen(false)}
                            initialPosition={{ x: '2.5%', y: '5%' }}
                            initialSize={{ width: '95%', height: '82%' }}
                        >
                            {children}
                        </WindowFrame>
                    </div>
                )}
            </div>

            {/* Taskbar */}
            <Taskbar />
        </div>
    );
}
