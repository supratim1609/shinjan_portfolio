"use client";

import { useState, useEffect } from "react";

export default function Taskbar() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full h-[28px] md:h-[35px] bg-[#c0c0c0] border-t-2 border-white flex items-center justify-between px-1 z-[1000] shadow-md select-none">

            {/* Start Button */}
            <div className="h-[22px] md:h-[28px] px-2 md:px-3 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black active:border-l-black active:border-t-black active:border-r-white active:border-b-white flex items-center gap-1 cursor-pointer shadow-sm">
                <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" alt="logo" className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold text-black text-sm md:text-base font-pixel pt-[2px]">Start</span>
            </div>

            {/* Active Task (Simple representation) */}
            <div className="flex-1 px-2 flex items-center">
                <div className="h-[22px] md:h-[28px] w-40 bg-[#c0c0c0] border-t-2 border-l-2 border-black border-b-2 border-r-2 border-white flex items-center gap-2 px-2 shadow-inner active:bg-[#d4d0c8]">
                    <img src="https://win98icons.alexmeub.com/icons/png/console_prompt-0.png" alt="term" className="w-4 h-4" />
                    <span className="text-xs md:text-sm font-bold truncate pt-[1px]">ShinjanOS Terminal</span>
                </div>
            </div>

            {/* System Tray */}
            <div className="h-[22px] md:h-[28px] bg-[#c0c0c0] border-t-2 border-l-2 border-[#808080] border-b-2 border-r-2 border-white flex items-center px-3 gap-2 shadow-inner">
                <img src="https://win98icons.alexmeub.com/icons/png/loudspeaker_rays-0.png" alt="sound" className="w-4 h-4" />
                <span className="text-xs md:text-sm font-pixel pt-[1px]">{time}</span>
            </div>
        </div>
    );
}
