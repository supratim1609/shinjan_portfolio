"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

interface WindowFrameProps {
    title: string;
    children: ReactNode;
    initialPosition?: { x: number | string; y: number | string };
    initialSize?: { width: number | string; height: number | string };
    isActive?: boolean;
    onClose?: () => void;
    onMinimize?: () => void;
}

export default function WindowFrame({
    title,
    children,
    initialPosition = { x: 50, y: 50 },
    initialSize = { width: 800, height: 600 },
    isActive = true,
    onClose,
    onMinimize
}: WindowFrameProps) {
    // 3D Borders logic
    // Outer: White (TL), Black (BR)
    // Inner: Gray (TL), DarkGray (BR)

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{
                scale: 0.9,
                opacity: 0
            }}
            animate={{
                scale: 1,
                opacity: 1
            }}
            className={`absolute flex flex-col bg-[#c0c0c0] p-[2px] shadow-xl ${isActive ? 'z-50' : 'z-10'}`}
            style={{
                left: initialPosition.x,
                top: initialPosition.y,
                width: initialSize.width,
                height: initialSize.height,
                boxShadow: "inset 1px 1px 0px #fdfdfd, inset -1px -1px 0px #0a0a0a, 1px 1px 0px 0px #000"
            }}
        >
            {/* Window Content Container with Classic Border */}
            <div className="flex flex-col h-full border-t border-l border-[#dfdfdf] border-r border-b border-[#808080] outline outline-1 outline-[#c0c0c0]">

                {/* Title Bar */}
                <div
                    className={`h-[18px] md:h-[24px] flex items-center px-1 select-none mb-[2px] ${isActive ? 'bg-gradient-to-r from-[#000080] to-[#1084d0]' : 'bg-[#808080]'}`}
                >
                    {/* Icon */}
                    <img src="/icons/terminal.png" alt="" className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" onError={(e) => e.currentTarget.style.display = 'none'} />

                    <span className="text-white font-bold text-xs md:text-sm font-pixel tracking-wide truncate flex-1 leading-none pt-[2px]">
                        {title}
                    </span>

                    {/* Window Controls */}
                    <div className="flex gap-[2px] ml-2">
                        <button
                            onClick={onMinimize}
                            className="w-4 h-4 md:w-5 md:h-5 bg-[#c0c0c0] flex items-center justify-center border-t border-l border-white border-b border-r border-black active:border-l-black active:border-t-black active:border-r-white active:border-b-white focus:outline-none"
                        >
                            <span className="font-bold text-xs -mt-1">_</span>
                        </button>
                        <button
                            className="w-4 h-4 md:w-5 md:h-5 bg-[#c0c0c0] flex items-center justify-center border-t border-l border-white border-b border-r border-black active:border-l-black active:border-t-black active:border-r-white active:border-b-white focus:outline-none"
                        >
                            <div className="w-2 h-2 border border-black border-t-[2px]"></div>
                        </button>
                        <button
                            onClick={onClose}
                            className="w-4 h-4 md:w-5 md:h-5 bg-[#c0c0c0] flex items-center justify-center border-t border-l border-white border-b border-r border-black active:border-l-black active:border-t-black active:border-r-white active:border-b-white focus:outline-none ml-[2px]"
                        >
                            <X size={12} strokeWidth={3} className="text-black" />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-black text-white font-mono overflow-auto border-t-[2px] border-l-[2px] border-[#808080] border-r border-b border-white">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
