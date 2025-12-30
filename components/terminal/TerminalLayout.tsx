"use client";

import { ReactNode } from "react";

export default function TerminalLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0d0d0d] text-[#e0e0e0] font-terminal flex items-center justify-center p-4">
            {/* CRT Screen Container */}
            <div className="w-full max-w-5xl h-[80vh] md:h-[90vh] bg-black border border-white/10 rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.1)] relative overflow-hidden flex flex-col animate-turn-on">

                {/* Window Controls */}
                <div className="h-8 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/5 sticky top-0 z-10 w-full">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80" />
                    <div className="ml-auto text-xs text-zinc-600">shinjan_sarkar — -zsh — 80x24</div>
                </div>

                {/* Terminal Content */}
                <div className="flex-1 relative min-h-0">
                    {/* Scanline Effect Overlay (Optional, keeping it subtle) */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20" />
                    {children}
                </div>
            </div>
        </div>
    );
}
