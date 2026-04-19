"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { Brain, Flame, Target, Trophy, Bot, Star, Link2, BookOpen, Clock, Activity, Medal } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 flex-grow">
        
        {/* Row 1 */}
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col relative overflow-hidden transition-colors">
          <div className="text-xs text-text-dim uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>🔥</span> Daily Streak
          </div>
          <div className="text-3xl font-bold text-text-main">{user?.streak || 0} Days</div>
          <div className="text-success text-xs mt-1">+1 from yesterday</div>
          <div className="absolute -right-2 -bottom-2 text-7xl opacity-10 -rotate-12 select-none">🔥</div>
        </div>

        <div className="md:col-span-2 bg-card border border-border rounded-2xl p-5 flex flex-col relative overflow-hidden transition-colors">
          <div className="text-xs text-text-dim uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>📊</span> Activity Heatmap
          </div>
          <div className="grid grid-cols-20 gap-1 mt-2">
            {Array.from({ length: 40 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-full aspect-square rounded-[2px] ${
                  Math.random() > 0.8 ? 'bg-accent' : 
                  Math.random() > 0.5 ? 'bg-accent/40' : 'bg-[#27272a]'
                }`}
              ></div>
            ))}
          </div>
          <div className="mt-auto pt-3 flex justify-between text-[11px] text-text-dim">
            <span>Last 30 days: 84 hours total</span>
            <span>Peak: Tuesday</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col relative overflow-hidden transition-colors">
          <div className="text-xs text-text-dim uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>⚡</span> Velocity
          </div>
          <div className="text-3xl font-bold text-text-main">+12.4%</div>
          <div className="h-2 bg-[#27272a] rounded-full mt-3 relative overflow-hidden">
            <div className="w-[72%] h-full bg-success rounded-full"></div>
          </div>
          <p className="text-[11px] mt-2 text-text-dim leading-snug">Retention rate improved by 4% since last session.</p>
        </div>

        {/* Row 2 */}
        <div className="md:row-span-2 md:col-span-2 bg-card border border-border rounded-2xl p-5 flex flex-col relative overflow-hidden transition-colors">
          <div className="text-xs text-text-dim uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>🤖</span> AI Mentor Zenith
          </div>
          <p className="text-lg font-medium mb-5 text-white">Ready for your next breakthrough?</p>
          <div className="mt-auto bg-bg border border-border rounded-lg p-3 text-[13px]">
            <div className="text-text-dim leading-relaxed">
              "I noticed you struggled with <strong>Data Structures</strong> last night. Should we review the Hash Map concepts before today's quiz?"
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              <Link href="/mentor" className="text-[11px] bg-[#27272a] px-2 py-1 rounded text-accent hover:bg-[#3f3f46] transition-colors">Yes, let's start</Link>
              <Link href="/mentor" className="text-[11px] bg-[#27272a] px-2 py-1 rounded text-accent hover:bg-[#3f3f46] transition-colors">Summary first</Link>
              <Link href="/mentor" className="text-[11px] bg-[#27272a] px-2 py-1 rounded text-accent hover:bg-[#3f3f46] transition-colors">Try practice</Link>
            </div>
          </div>
          <div className="mt-5 pt-4 text-[11px] border-t border-border text-text-dim">
            <p><strong className="text-gray-300">RAG context:</strong> Semester 1 Notes, Last Quiz, Recent Chat history.</p>
          </div>
        </div>

        <div className="bg-gradient-to-tr from-[#1e1b4b] to-[#312e81] border border-[#4338ca] rounded-2xl p-5 flex flex-col relative overflow-hidden transition-colors">
          <div className="text-xs text-white/70 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>📝</span> Active Challenge
          </div>
          <div className="text-xl font-semibold my-2 text-white">OS Fundamentals</div>
          <div className="text-xs opacity-80 mb-5 text-white/80">15 Questions • 2 Lives Remaining</div>
          <Link href="/quiz/q1" className="mt-auto bg-white text-black text-center w-full p-2.5 rounded-lg border-none font-semibold hover:bg-gray-200 transition-colors">
            Resume Quiz
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col relative overflow-hidden transition-colors">
          <div className="text-xs text-text-dim uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>🏆</span> Leaderboard
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex justify-between text-sm font-semibold text-white">
              <span>1. Sarah J.</span>
              <span>4,250 XP</span>
            </div>
            <div className="flex justify-between text-sm text-accent font-medium">
              <span>2. You</span>
              <span>{user?.score || 3890} XP</span>
            </div>
            <div className="flex justify-between text-sm text-gray-300">
              <span>3. Mike R.</span>
              <span>3,700 XP</span>
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col relative overflow-hidden transition-colors">
          <div className="text-xs text-text-dim uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>⏱️</span> Study Time
          </div>
          <div className="text-3xl font-bold text-text-main">42.5h</div>
          <p className="text-[11px] mt-1 text-text-dim">Current Week</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col relative overflow-hidden transition-colors">
          <div className="text-xs text-text-dim uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>🌟</span> Recent Achievements
          </div>
          <div className="flex items-center gap-3 py-2 border-b border-[#27272a]">
            <div className="w-8 h-8 flex items-center justify-center bg-[#27272a] rounded-md text-sm">🦉</div>
            <div className="text-[13px] text-white">Night Owl (3 AM Session)</div>
          </div>
          <div className="flex items-center gap-3 py-2">
            <div className="w-8 h-8 flex items-center justify-center bg-[#27272a] rounded-md text-sm">🎯</div>
            <div className="text-[13px] text-white">Perfect Quiz Score</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 flex flex-col relative overflow-hidden transition-colors">
          <div className="text-xs text-text-dim uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span>🔗</span> Real-time Room
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2.5 h-2.5 rounded-full bg-success"></div>
            <span className="text-sm text-white">CS-101 Study Group</span>
          </div>
          <p className="text-xs text-text-dim mt-2">12 active students now studying</p>
          <Link href="/room" className="text-[11px] mt-auto text-accent hover:underline">Join Live Session</Link>
        </div>

      </div>
    </div>
  );
}
