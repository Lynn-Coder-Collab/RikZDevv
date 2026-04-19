"use client";

import { useAuthStore } from "@/store/authStore";
import { Cpu, Users, Zap, Database } from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-display font-medium text-white mb-2 tracking-tight">System Overview</h2>
        <p className="text-gray-400">Welcome back, Commander {user?.name}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Learners", value: "1,248" },
          { icon: Database, label: "Quizzes Active", value: "34" },
          { icon: Cpu, label: "AI Requests (24h)", value: "8,942" },
          { icon: Zap, label: "System Health", value: "99.9%" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#111] border border-white/10 rounded-xl p-6">
            <stat.icon className="w-5 h-5 text-purple-500 mb-4" />
            <div className="text-3xl font-display font-medium text-white mb-1">{stat.value}</div>
            <div className="text-xs font-mono text-gray-500 tracking-widest uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl p-6 h-[400px] flex items-center justify-center text-gray-500 font-mono text-sm border-dashed">
        Analytics Dashboard Visualization Pipeline Initializing...
      </div>
    </div>
  );
}
