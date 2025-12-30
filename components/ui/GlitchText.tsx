"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
    text: string;
    className?: string;
    typingSpeed?: number;
    startDelay?: number;
}

export default function GlitchText({
    text,
    className = "",
    typingSpeed = 50,
    startDelay = 0,
}: GlitchTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        // Start delay
        const startTimeout = setTimeout(() => {
            setIsTyping(true);
            let currentIndex = 0;

            const typeChar = () => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                    timeout = setTimeout(typeChar, typingSpeed + Math.random() * 20); // Add variance
                } else {
                    setIsTyping(false);
                }
            };

            typeChar();
        }, startDelay);

        return () => {
            clearTimeout(startTimeout);
            clearTimeout(timeout);
        };
    }, [text, typingSpeed, startDelay]);

    return (
        <span className={`${className} inline-block`}>
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.5, 0.5, 1]
                }}
                className="inline-block w-[1ch] bg-accent ml-1 align-middle h-[1.2em]"
            />
        </span>
    );
}
