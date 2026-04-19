"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuthStore } from "@/store/authStore";
import { 
  LayoutDashboard, 
  Timer, 
  Brain, 
  Trophy, 
  Search, 
  NotebookPen, 
  LogOut,
  Users
} from "lucide-react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Focus Mode", href: "/focus", icon: Timer },
    { name: "Quiz Engine", href: "/quiz", icon: Brain },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Semantic Search", href: "/search", icon: Search },
    { name: "Notes", href: "/notes", icon: NotebookPen },
    { name: "Study Room", href: "/room", icon: Users },
  ];

  return (
    <AuthGuard>
      <div className="flex h-screen bg-bg text-text-main overflow-hidden selection:bg-accent/30 selection:text-white">
        {/* Sidebar */}
        <aside className="w-64 flex flex-col border-r border-[#27272a] bg-card">
          <div className="p-6 border-b border-[#27272a] flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-fuchsia-500 rounded-lg"></div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Zenith
            </h2>
          </div>
          
          <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-accent text-white font-medium" 
                      : "text-text-dim hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#27272a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{user?.name}</span>
                <span className="text-xs text-text-dim tracking-wide">{user?.role === 'admin' ? 'Level 99 Admin' : 'Level 24 Scholar'}</span>
              </div>
            </div>
            
            <button 
              onClick={() => logout()}
              className="p-1.5 rounded-md hover:bg-white/10 text-text-dim hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-bg">
          <header className="h-16 flex items-center justify-between px-4 md:px-8 shrink-0">
            <h1 className="text-lg font-medium tracking-tight text-white/90">
              {navigation.find(n => pathname.startsWith(n.href))?.name || "Workspace"}
            </h1>
            <div className="flex items-center gap-4">
              <Link href="/focus" className="bg-accent text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-accent/90 transition-colors">
                Enter Focus Mode
              </Link>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-0">
            <div className="max-w-5xl mx-auto h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
