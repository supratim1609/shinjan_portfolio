"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BootScreenProps {
    onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Small delay after 100%
                    return 100;
                }
                return prev + Math.random() * 10; // Random increment
            });
        }, 300);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-[#008080] flex flex-col items-center justify-center z-[9999] cursor-none font-pixel select-none">
            {/* Background Cloud Image (Optional implementation, using CSS gradient for now) */}
            <div className="absolute inset-0 bg-[url('https://cdn.wallpaperhub.app/cloudcache/1/b/6/0/9/5/1b609559d3e86c07aa22e707521e075841029471.jpg')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>

            {/* Boot Logo Container */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="flex items-end gap-2">
                    <div className="text-4xl md:text-6xl font-bold italic text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] tracking-tighter">
                        Shinjan<span className="font-light">OS</span>
                    </div>
                    <div className="text-xl md:text-2xl text-white font-bold mb-1 drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
                        95
                    </div>
                </div>

                {/* Progress Bar Container */}
                <div className="w-64 md:w-80 h-6 bg-[#c0c0c0] border-t-2 border-l-2 border-[#808080] border-b-2 border-r-2 border-white p-1 relative">
                    {/* Progress Bar Chunks */}
                    <div className="h-full flex gap-[2px]">
                        {/* Creating the chunked progress bar effect */}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className={`h-full flex-1 bg-[#000080]`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: (i / 20) * 100 < progress ? 1 : 0 }}
                                transition={{ duration: 0 }}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-white text-shadow-sm animate-pulse">
                    Starting up...
                </div>
            </div>

            {/* Bottom Copy */}
            <div className="absolute bottom-4 text-white text-xs opacity-60">
                Copyright © 1995-2024 Shinjan Corp.
            </div>
        </div>
    );
}
