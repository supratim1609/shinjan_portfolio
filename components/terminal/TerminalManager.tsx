"use client";

import { useState, useRef, useEffect } from "react";
import { executeCommand } from "@/lib/commands";
import { motion } from "framer-motion";

interface HistoryItem {
    type: 'input' | 'output';
    content: string;
    cwd?: string;
    timestamp: number;
    status?: 'success' | 'error' | 'info';
}

const WELCOME_MESSAGE = `
<div class="mb-6 select-none relative group">
  <h1 class="text-4xl md:text-6xl font-bold font-heading tracking-tighter text-green-500 filter drop-shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-pulse">
    SHINJAN<span class="text-white">_</span>SARKAR
  </h1>
  <div class="text-xs md:text-sm text-zinc-500 font-mono mt-1 opacity-80">
    &gt; EST. 2024 // KICKING_ASS.EXE
  </div>
</div>
<div class="mb-4 text-zinc-300 font-mono leading-relaxed">
  Welcome to <span class="text-green-400 font-bold">ShinjanOS v1.0.0</span> (tty1)<br/>
  Based in Kolkata, India.<br/>
  Type <span class="text-cyan-400">'help'</span> to view available commands.
</div>
`;

export default function TerminalManager() {
    const [history, setHistory] = useState<HistoryItem[]>([
        { type: 'output', content: WELCOME_MESSAGE, cwd: '~', timestamp: Date.now(), status: 'info' }
    ]);
    const [input, setInput] = useState("");
    const [cwd, setCwd] = useState("~");
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            setTimeout(() => {
                scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
            }, 50);
        }
    }, [history]);

    // Focus input on click anywhere
    useEffect(() => {
        const focusInput = () => inputRef.current?.focus();
        window.addEventListener('click', focusInput);
        return () => window.removeEventListener('click', focusInput);
    }, []);

    const runCommand = (cmd: string) => {
        setHistory(prev => [...prev, { type: 'input', content: cmd, cwd, timestamp: Date.now() }]);
        const response = executeCommand(cmd, cwd);

        if (response.action === 'clear') {
            setHistory([]);
        } else {
            if (response.output) {
                setHistory(prev => [...prev, {
                    type: 'output',
                    content: response.output,
                    cwd,
                    timestamp: Date.now(),
                    status: response.type === 'error' ? 'error' : 'info'
                }]);
            }
        }

        if (response.newCwd) {
            setCwd(response.newCwd);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const command = input.trim();
            if (!command) {
                setHistory(prev => [...prev, { type: 'input', content: '', cwd, timestamp: Date.now() }]);
                return;
            }
            runCommand(command);
            setInput("");
        }
    };

    const handleCommandClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const cmdElement = target.closest('[data-cmd]');
        if (cmdElement) {
            const command = cmdElement.getAttribute('data-cmd');
            if (command) {
                runCommand(command);
            }
        }
    };

    return (
        <div
            className="flex flex-col h-full font-terminal text-lg md:text-xl p-4 overflow-hidden animate-flicker"
            onClick={(e) => {
                handleCommandClick(e);
                inputRef.current?.focus();
            }}
        >

            {/* Scrollable Container */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 mb-2 pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent min-h-0">
                {history.map((item, i) => (
                    <motion.div
                        key={item.timestamp + i}
                        initial={{ opacity: 0, x: -20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="break-words"
                    >
                        {item.type === 'input' ? (
                            <div className="flex gap-2 text-green-400 mt-4">
                                <span className="opacity-75">shinjan@dev:{item.cwd}$</span>
                                <span className="text-white">{item.content}</span>
                            </div>
                        ) : (
                            <div
                                className={`pl-0 leading-relaxed ${item.status === 'error' ? 'text-red-400' : 'text-zinc-300'}`}
                                dangerouslySetInnerHTML={{ __html: item.content }}
                            />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Input Line */}
            <div className="flex items-center gap-2 text-green-400 mb-1">
                <span className="whitespace-nowrap">shinjan@dev:{cwd}$</span>
                <div className="relative flex-1">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-white w-full h-full absolute inset-0 text-transparent caret-transparent"
                        spellCheck="false"
                        autoComplete="off"
                        autoFocus
                    />
                    {/* Rendered Text + Custom Cursor */}
                    <div className="absolute inset-0 pointer-events-none flex items-center">
                        <span className="text-white whitespace-pre">{input}</span>
                        <span className="bg-green-500 text-black animate-pulse inline-block w-[1ch] h-[1.2em] align-middle ml-[2px]">&nbsp;</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
