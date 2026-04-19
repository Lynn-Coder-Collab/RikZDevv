"use client";

import { useState } from "react";
import { Search, BookMarked, Brain, FileText, ArrowUpRight } from "lucide-react";

export default function SemanticSearchPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // MOCK RESULTS
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    // Simulate AI vector search
    setTimeout(() => {
      setResults([
        { id: 1, title: "Understanding React Hooks", type: "note", content: "React hooks allow you to use state and lifecycle features in function components...", score: 0.98 },
        { id: 2, title: "Advanced React Patterns", type: "quiz", content: "Test your knowledge on HOCs, render props, and hooks.", score: 0.85 },
        { id: 3, title: "Study session transcript", type: "mentor", content: "You asked the mentor about managing complex state. The mentor suggested Zustand...", score: 0.72 },
      ]);
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center py-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <h2 className="text-4xl font-display font-medium text-white mb-4 tracking-tight relative z-10">Semantic Cortex Search</h2>
        <p className="text-gray-400 relative z-10 max-w-lg mx-auto">
          Search across all your notes, quizzes, and mentor conversations using natural language. We understand concepts, not just keywords.
        </p>
      </div>

      <div className="relative z-20">
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'What was that pattern for sharing state?'"
            className="w-full bg-[#111]/80 backdrop-blur-xl border border-white/20 rounded-full py-4 pl-14 pr-32 text-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 shadow-2xl"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
          <button 
            type="submit"
            disabled={!query.trim() || isSearching}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {results.length > 0 && (
        <div className="pt-8 space-y-4">
          <p className="text-sm font-mono text-gray-500 uppercase tracking-widest pl-2">Found {results.length} results</p>
          
          <div className="grid gap-4">
            {results.map((result) => (
              <div key={result.id} className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-blue-500/30 transition-colors group">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {result.type === 'note' && <FileText className="w-5 h-5 text-emerald-500" />}
                    {result.type === 'quiz' && <BookMarked className="w-5 h-5 text-[#FF6321]" />}
                    {result.type === 'mentor' && <Brain className="w-5 h-5 text-purple-500" />}
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-400">{result.type}</span>
                  </div>
                  <span className="text-xs font-mono text-blue-500/70 border border-blue-500/20 px-2 py-0.5 rounded bg-blue-500/10">
                    {(result.score * 100).toFixed(0)}% MATCH
                  </span>
                </div>
                
                <h3 className="text-xl font-medium text-white mb-2 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  {result.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {result.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
