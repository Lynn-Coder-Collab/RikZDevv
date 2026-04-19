"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, TerminalSquare, Rocket } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase/client";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export default function LandingPage() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      // 1. Authenticate anonymously with Firebase
      const userCredential = await signInAnonymously(auth);
      const uid = userCredential.user.uid;

      // 2. Check or create user profile in Firestore
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      const isSpecialAdmin = name.toLowerCase() === "admin" || name.toLowerCase() === "zenith";

      let userData;
      if (!userSnap.exists()) {
        userData = {
          uid,
          name: name.trim(),
          role: isSpecialAdmin ? "admin" : "user",
          streak: 0,
          score: 0,
          studyTime: 0,
          createdAt: Date.now()
        };
        // Save initial state to Firestore
        await setDoc(userRef, { ...userData, createdAt: serverTimestamp() });
      } else {
        const data = userSnap.data();
        userData = {
          uid,
          name: data.name,
          role: data.role || "user",
          streak: data.streak || 0,
          score: data.score || 0,
          studyTime: data.studyTime || 0,
          createdAt: data.createdAt?.toMillis() || Date.now()
        };
      }

      // 3. Save to Zustand explicitly enforcing the type
      login(userData as any);

      // 4. Redirect
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Failed to sign in. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,99,33,0.15),rgba(255,255,255,0))]">
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center z-10 relative">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/abstract/1920/1080?blur=10')] opacity-5 mix-blend-overlay"></div>
        <div className="max-w-3xl space-y-8 relative z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#FF6321] font-medium mb-4">
            <BrainCircuit className="w-4 h-4" /> 
            <span>Welcome to the future of learning</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-bold md:font-extrabold tracking-tighter leading-none">
            Study with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-[#FF6321]">Zenith</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 font-sans max-w-2xl mx-auto font-light leading-relaxed">
            An AI-powered learning environment designed to gamify your workflow, accelerate understanding, and unlock your peak potential.
          </p>
          
          <form onSubmit={handleLogin} className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full sm:w-auto px-6 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-[#FF6321]/50 focus:ring-1 focus:ring-[#FF6321]/50 text-white placeholder:text-gray-600 transition-all"
              required
            />
            
            <button 
              type="submit"
              disabled={isLoading || !name.trim()}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium tracking-wide hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TerminalSquare className="w-5 h-5" />
              <span>{isLoading ? "Entering..." : "Enter Workspace"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="pt-4">
            <Link 
              href="/admin/dashboard"
              className="text-xs text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" /> Go to Admin Portal
            </Link>
          </div>

        </div>
      </main>
      
      <footer className="py-6 text-center text-xs text-white/30 uppercase tracking-widest border-t border-white/5">
        ZENITH SYSTEM v1.0.0 &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
