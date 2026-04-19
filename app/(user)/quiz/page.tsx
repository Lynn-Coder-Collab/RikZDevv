"use client";

import Link from "next/link";
import { Brain, Star, Clock, Trophy, ChevronRight } from "lucide-react";

const DUMMY_QUIZZES = [
  { id: "q1", title: "Advanced React Patterns", description: "Test your knowledge on HOCs, render props, and hooks.", difficulty: "Hard", questions: 10, time: "15 min", topic: "React" },
  { id: "q2", title: "TypeScript Fundamentals", description: "Generics, utility types, and structural typing.", difficulty: "Medium", questions: 8, time: "10 min", topic: "TypeScript" },
  { id: "q3", title: "Firestore Security Rules", description: "Mastering attribute-based access control.", difficulty: "Hard", questions: 5, time: "10 min", topic: "Firebase" },
];

export default function QuizListPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-display font-medium tracking-tight text-white mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-[#FF6321]" />
            Quiz Engine
          </h2>
          <p className="text-gray-400">Challenge yourself and earn experience points.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_QUIZZES.map((quiz) => (
          <Link 
            key={quiz.id} 
            href={`/quiz/${quiz.id}`}
            className="group flex flex-col justify-between bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-[#FF6321]/50 transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6321]/5 rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:bg-[#FF6321]/10 transition-colors"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase rounded bg-white/5 text-gray-400 border border-white/10 group-hover:border-white/20 transition-colors">
                  {quiz.topic}
                </span>
                <span className={`text-[10px] uppercase tracking-widest font-bold ${
                  quiz.difficulty === 'Hard' ? 'text-red-500' : 'text-yellow-500'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>
              
              <h3 className="text-xl font-medium text-white mb-2 leading-tight group-hover:text-[#FF6321] transition-colors">{quiz.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{quiz.description}</p>
            </div>
            
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5 relative z-10">
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-1.5 text-xs">
                  <Star className="w-3.5 h-3.5" />
                  {quiz.questions} Qs
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {quiz.time}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FF6321] text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
