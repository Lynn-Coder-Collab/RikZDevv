"use client";

import { useState, useRef, useEffect } from "react";
import { Brain, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
}

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "model", content: "Hello there! I'm your AI Mentor, powered by Zenith. What topic are we diving into today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, history: messages })
      });

      if (!response.ok) throw new Error("API failed");
      
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "model",
        content: data.text
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "model",
        content: "I'm having trouble connecting to my knowledge base right now. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] animate-in fade-in duration-500">
      <div className="flex items-center gap-3 border-b border-white/10 pb-6 mb-6 shrink-0">
        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
          <Brain className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-medium text-white tracking-tight">AI Mentor</h2>
          <p className="text-sm text-gray-400">Context-aware RAG system connected to your notes.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 space-y-6 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' 
                ? 'bg-[#FF6321] text-white' 
                : 'bg-white/10 text-white'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            
            <div className={`px-5 py-3.5 rounded-2xl max-w-[80%] ${
              msg.role === 'user'
                ? 'bg-[#FF6321] text-white rounded-tr-sm'
                : 'bg-[#111] border border-white/10 text-gray-200 rounded-tl-sm'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-5 py-3.5 rounded-2xl bg-[#111] border border-white/10 text-gray-200 rounded-tl-sm flex items-center">
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="pt-6 shrink-0 mt-auto">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your study materials..."
            className="w-full bg-[#111] border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FF6321]/50 focus:ring-1 focus:ring-[#FF6321]/50"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FF6321] text-white flex items-center justify-center hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs font-mono text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide py-1">
          <span className="text-gray-600 uppercase">Suggested:</span>
          <button onClick={() => setInput("Explain closure in JavaScript")} className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors">Explain closure in JavaScript</button>
          <button onClick={() => setInput("How do I structure Firebase Rules?")} className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors">How do I structure Firebase Rules?</button>
          <button onClick={() => setInput("Summarize my recent notes")} className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors">Summarize my recent notes</button>
        </div>
      </div>
    </div>
  );
}
