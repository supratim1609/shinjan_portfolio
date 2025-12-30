"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Start", href: "#hero" }, // Using "Start" instead of "Home" for a terminal vibe
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Exp", href: "#experience" },
    { name: "Projects", href: "#projects" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <Link href="/" className="text-xl font-bold font-heading tracking-widest hover:text-accent transition-colors">
                    SHINJAN_SARKAR<span className="text-accent">.DEV</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-mono text-text-muted hover:text-accent transition-colors relative group"
                        >
                            <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity mr-1">&gt;</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button (Placeholder for now) */}
                <button className="md:hidden text-accent">
                    <span className="sr-only">Menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                </button>
            </div>
        </header>
    );
}
