"use client";

import { useState, useEffect, useRef } from "react";
import { Users, Send, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { db } from "@/lib/firebase/client";
import { collection, query, orderBy, limit, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

interface RoomMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  timestamp: any;
}

export default function StudyRoomPage() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen to Firebase room
    const q = query(collection(db, "room_messages"), orderBy("timestamp", "asc"), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: RoomMessage[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as RoomMessage);
      });
      setMessages(msgs);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !user) return;

    const text = input;
    setInput("");

    try {
      await addDoc(collection(db, "room_messages"), {
        text,
        userId: user.uid,
        userName: user.name,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-[85vh] flex gap-6 animate-in fade-in duration-500">
      {/* Participant sidebar */}
      <div className="w-64 border border-white/10 rounded-2xl bg-[#111] overflow-hidden flex flex-col hidden lg:flex">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-500" />
          <h2 className="font-medium text-white">Active Learners</h2>
        </div>
        <div className="flex-1 p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-[#FF6321] flex items-center justify-center text-xs font-bold text-white shadow-lg">
              {user?.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{user?.name}</span>
              <span className="text-[10px] text-emerald-500 font-mono uppercase">Online</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            Other learners using the room will appear here based on active presence tracking.
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 border border-white/10 rounded-2xl bg-[#111] flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none"></div>
        
        <div className="p-4 border-b border-white/10 bg-black/20 backdrop-blur-md relative z-10">
          <h2 className="font-medium text-white">Global Study Chat</h2>
          <p className="text-xs text-gray-400">Share tips, ask questions, or just say hi.</p>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4 relative z-10 scrollbar-hide">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-10 font-mono text-sm">
              No messages yet. Be the first to start the conversation!
            </div>
          )}
          {messages.map((msg) => {
            const isMe = msg.userId === user?.uid;
            return (
              <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isMe ? 'bg-[#FF6321] text-white' : 'bg-white/10 text-gray-300'}`}>
                  {isMe ? msg.userName.charAt(0) : <User className="w-4 h-4" />}
                </div>
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <span className="text-xs text-gray-500 mb-1 mx-1">{msg.userName}</span>
                  <div className={`px-4 py-2 rounded-2xl ${isMe ? 'bg-[#FF6321] text-white rounded-tr-sm' : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'}`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md relative z-10">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message to the study room..."
              className="w-full bg-black border border-white/10 rounded-full py-3 pl-6 pr-14 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
            />
            <button 
              type="submit"
              disabled={!input.trim() || !user}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
