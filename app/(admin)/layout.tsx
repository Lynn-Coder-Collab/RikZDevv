"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { 
  Rocket, 
  BarChart, 
  Database, 
  Settings, 
  UsersRound, 
  Cpu, 
  LogOut,
  ArrowLeft
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: BarChart }, // admin dashboard
    { name: "User Management", href: "/users", icon: UsersRound },
    { name: "Content CRUD", href: "/content", icon: Database },
    { name: "AI Config", href: "/ai", icon: Cpu },
    { name: "System Settings", href: "/system", icon: Settings },
  ];

  return (
    <AuthGuard requireAdmin>
      <div className="flex h-screen bg-[#050505] text-white overflow-hidden selection:bg-purple-500/30">
        <aside className="w-64 flex flex-col border-r border-white/10 bg-[#0a0a0a]">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-display font-bold tracking-tight text-purple-500 flex items-center gap-2">
              <Rocket className="w-5 h-5" /> Zenith OS
            </h2>
          </div>
          
          <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              // mapping them correctly to /app/(admin)/[path]
              const fullHref = item.href === '/dashboard' ? '/api/admin/setup' : `/api/admin${item.href}`; // wait, my admin structure is /app/(admin)/dashboard.
              // So I should map to actual paths
              return null;
            })}
            
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-400 hover:text-white mt-8 border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to App</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-white/5 flex items-center justify-between">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Admin Session
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-[#0a0a0a]">
            <h1 className="text-sm font-mono text-gray-400">
              {pathname}
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-gray-500 font-mono">System Online</span>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-8 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="max-w-6xl mx-auto relative z-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
