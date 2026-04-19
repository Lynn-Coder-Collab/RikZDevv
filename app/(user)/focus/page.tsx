"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

export default function FocusPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (soundEnabled) {
        // play notification sound
        new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg").play().catch(e => console.error(e));
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, soundEnabled]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: "focus" | "break") => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === "focus" ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in duration-500 relative">
      {/* Background ambient effect */}
      <div className={`absolute inset-0 transition-opacity duration-1000 blur-3xl -z-10 ${isRunning ? 'opacity-30' : 'opacity-10'}`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full mix-blend-screen  ${mode === 'focus' ? 'bg-[#FF6321]/30' : 'bg-blue-500/30'}`}></div>
      </div>
    
      <div className="bg-[#111] border border-white/10 rounded-[40px] p-12 max-w-lg w-full flex flex-col items-center shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6321] to-transparent opacity-50"></div>
        
        <div className="flex gap-2 p-1.5 bg-black/50 rounded-full border border-white/5 mb-12">
          <button 
            onClick={() => switchMode("focus")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${mode === "focus" ? "bg-[#FF6321] text-white shadow-[0_0_15px_rgba(255,99,33,0.4)]" : "text-gray-400 hover:text-white"}`}
          >
            Deep Focus
          </button>
          <button 
            onClick={() => switchMode("break")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${mode === "break" ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]" : "text-gray-400 hover:text-white"}`}
          >
            Short Break
          </button>
        </div>

        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-[#FF6321] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-full"></div>
          <h1 className="text-8xl md:text-9xl font-display font-medium tabular-nums tracking-tighter text-white relative z-10 drop-shadow-lg">
            {formatTime(timeLeft)}
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={resetTimer}
            className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all hover:-rotate-45"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          
          <button 
            onClick={toggleTimer}
            className="w-20 h-20 rounded-full bg-white text-black hover:bg-gray-200 border-4 border-black/50 flex items-center justify-center transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            {isRunning ? <Pause className="w-8 h-8 fill-black" /> : <Play className="w-8 h-8 fill-black ml-1" />}
          </button>

          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${soundEnabled ? 'bg-[#FF6321]/10 border-[#FF6321]/30 text-[#FF6321]' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'}`}
          >
            {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-500 font-mono tracking-widest uppercase">
        {isRunning ? "Stay frosty. Focus active." : "Ready when you are."}
      </p>
    </div>
  );
}
