"use client";

import { useAuthStore } from "@/store/authStore";
import { Trophy, Medal, Star, Target } from "lucide-react";

const LEADERBOARD_DATA = [
  { rank: 1, name: "Alice Quantum", score: 14500, streak: 45, role: "user" },
  { rank: 2, name: "Bob Builder", score: 12200, streak: 30, role: "user" },
  { rank: 3, name: "Charlie Delta", score: 11050, streak: 22, role: "user" },
  { rank: 4, name: "Admin Zenith", score: 9800, streak: 15, role: "admin" },
  { rank: 5, name: "Eve Online", score: 8750, streak: 12, role: "user" },
];

export default function LeaderboardPage() {
  const { user } = useAuthStore();
  // Simulate appending current user if not in top 5
  const displayData = [...LEADERBOARD_DATA];
  const userRank = user && !displayData.find(d => d.name === user.name) 
    ? { rank: 42, name: user.name, score: user.score || 0, streak: user.streak || 0, role: user.role }
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center py-10 border-b border-white/10 relative overflow-hidden rounded-3xl bg-[#111]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6321]/10 rounded-full blur-3xl pointer-events-none"></div>
        <Trophy className="w-16 h-16 mx-auto mb-6 text-[#FF6321] relative z-10" />
        <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-4 relative z-10 tracking-tight">Global Rankings</h2>
        <p className="text-gray-400 relative z-10 max-w-lg mx-auto">Compete with learners worldwide. Earn points through quizzes and maintain your streak to climb the ladder.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-xs font-mono text-gray-500 uppercase tracking-widest bg-white/5">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6">Learner</div>
          <div className="col-span-2 text-center">Streak</div>
          <div className="col-span-2 text-right pr-4">Score</div>
        </div>

        <div className="divide-y divide-white/5">
          {displayData.map((data, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors">
              <div className="col-span-2 flex justify-center">
                {data.rank === 1 ? <Medal className="w-6 h-6 text-yellow-400" /> : 
                 data.rank === 2 ? <Medal className="w-6 h-6 text-gray-400" /> : 
                 data.rank === 3 ? <Medal className="w-6 h-6 text-orange-700" /> : 
                 <span className="font-mono text-gray-500 font-medium">#{data.rank}</span>}
              </div>
              <div className="col-span-6 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg ${data.name === user?.name ? 'bg-gradient-to-tr from-orange-500 to-[#FF6321]' : 'bg-gray-800'}`}>
                  {data.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-200">{data.name}</div>
                  {data.role === 'admin' && <span className="text-[10px] font-mono text-orange-500 uppercase">Admin</span>}
                </div>
              </div>
              <div className="col-span-2 flex justify-center text-orange-500 font-mono text-sm">
                {data.streak > 0 ? `${data.streak} 🔥` : '-'}
              </div>
              <div className="col-span-2 text-right pr-4 font-display font-medium text-white">
                {data.score.toLocaleString()}
              </div>
            </div>
          ))}

          {userRank && (
            <>
              <div className="grid grid-cols-12 gap-4 p-4 items-center bg-white/5 border-y border-dashed border-white/10">
                <div className="col-span-12 text-center text-xs font-mono text-gray-500 tracking-widest uppercase">
                  ...
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 p-4 items-center bg-[#FF6321]/5 border-t border-[#FF6321]/20">
                <div className="col-span-2 flex justify-center">
                  <span className="font-mono text-[#FF6321] font-bold">#{userRank.rank}</span>
                </div>
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-[#FF6321] flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    {userRank.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-white">{userRank.name} (You)</div>
                    {userRank.role === 'admin' && <span className="text-[10px] font-mono text-orange-500 uppercase">Admin</span>}
                  </div>
                </div>
                <div className="col-span-2 flex justify-center text-orange-500 font-mono text-sm">
                  {userRank.streak > 0 ? `${userRank.streak} 🔥` : '-'}
                </div>
                <div className="col-span-2 text-right pr-4 font-display font-medium text-[#FF6321]">
                  {userRank.score.toLocaleString()}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
