"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Brain, Heart, Timer, Trophy, ArrowRight, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

// Example mock data
const QUIZ_DATA = {
  id: "q1",
  title: "Advanced React Patterns",
  questions: [
    {
      id: "1",
      question: "Which pattern uses a component that takes a function as a child to share state or logic?",
      options: ["Higher-Order Components", "Render Props", "Compound Components", "Custom Hooks"],
      correctIndex: 1,
    },
    {
      id: "2",
      question: "What is the primary benefit of the Compound Components pattern?",
      options: ["Performance optimization", "Implicit state sharing among child components", "Code splitting", "Automatic memoization"],
      correctIndex: 1,
    }
  ]
};

export default function QuizSession() {
  const params = useParams();
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  const question = QUIZ_DATA.questions[currentIdx];

  // Timer logic
  useEffect(() => {
    if (isAnswered || isGameOver) return;
    if (timeLeft === 0) {
      handleTimeOut();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isGameOver]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    const newLives = lives - 1;
    setLives(newLives);
    setStreak(0);
    setAiFeedback("Time's up! Speed is key, but understanding comes first.");
    if (newLives <= 0) setIsGameOver(true);
  };

  const handleAnswer = async (idx: number) => {
    if (isAnswered) return;
    
    setSelectedOption(idx);
    setIsAnswered(true);
    
    const isCorrect = idx === question.correctIndex;
    if (isCorrect) {
      const points = 100 + (streak * 10) + Math.floor(timeLeft * 2);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setAiFeedback(`Excellent! You correctly identified the answer. Keep this momentum!`);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setStreak(0);
      setAiFeedback(`Not quite. The correct answer was "${question.options[question.correctIndex]}". Think about how this pattern shares logic implicitly.`);
      if (newLives <= 0) setIsGameOver(true);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < QUIZ_DATA.questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setAiFeedback(null);
      setTimeLeft(30);
    } else {
      setIsGameOver(true);
    }
  };

  const finishQuiz = () => {
    if (user) {
      updateUser({ 
        score: (user.score || 0) + score,
        streak: (user.streak || 0) + 1 
      });
    }
    router.push("/dashboard");
  };

  if (isGameOver) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 rounded-full bg-orange-500/10 flex items-center justify-center text-[#FF6321] mb-6">
          {lives > 0 ? <Trophy className="w-12 h-12" /> : <Heart className="w-12 h-12 text-gray-600" />}
        </div>
        <h1 className="text-5xl font-display font-medium text-white mb-2 tracking-tight">
          {lives > 0 ? "Quiz Complete!" : "Game Over"}
        </h1>
        <p className="text-gray-400 mb-8">{lives > 0 ? "You survived the challenge." : "You ran out of lives."}</p>
        
        <div className="flex gap-8 mb-12">
          <div className="text-center">
            <p className="text-sm text-gray-500 font-mono uppercase mb-1">Final Score</p>
            <p className="text-4xl font-display text-white">{score}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 font-mono uppercase mb-1">Max Streak</p>
            <p className="text-4xl font-display text-white">{streak}</p>
          </div>
        </div>

        <button 
          onClick={finishQuiz}
          className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* HUD */}
      <div className="flex items-center justify-between bg-[#111] p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Heart className={`w-5 h-5 ${lives > 0 ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
            <Heart className={`w-5 h-5 ${lives > 1 ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
            <Heart className={`w-5 h-5 ${lives > 2 ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
          </div>
          <div className="flex items-center gap-2 text-sm font-mono">
            <Trophy className="w-4 h-4 text-emerald-500" />
            <span className="text-white">{score}</span>
          </div>
          {streak >= 2 && (
            <div className="flex items-center gap-1 text-sm font-mono text-orange-500 animate-pulse">
              🔥 x{streak}
            </div>
          )}
        </div>
        
        <div className={`flex items-center gap-2 font-mono text-xl ${timeLeft <= 5 ? 'text-red-500' : 'text-white'}`}>
          <Timer className="w-5 h-5" />
          {timeLeft}s
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#FF6321] transition-all duration-500 ease-out"
          style={{ width: `${((currentIdx + 1) / QUIZ_DATA.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6321]/5 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        
        <p className="text-xs font-mono tracking-widest uppercase text-[#FF6321] mb-6 block relative z-10">
          Question {currentIdx + 1} of {QUIZ_DATA.questions.length}
        </p>
        
        <h2 className="text-2xl md:text-3xl font-medium text-white mb-10 leading-snug relative z-10">
          {question.question}
        </h2>

        <div className="space-y-3 relative z-10">
          {question.options.map((opt, idx) => {
            let stateClass = "border-white/10 hover:border-[#FF6321]/50 hover:bg-white/5";
            let icon = null;
            
            if (isAnswered) {
              if (idx === question.correctIndex) {
                stateClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-50";
                icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
              } else if (idx === selectedOption) {
                stateClass = "border-red-500/50 bg-red-500/10 text-red-50";
                icon = <XCircle className="w-5 h-5 text-red-500" />;
              } else {
                stateClass = "border-white/5 opacity-50 cursor-not-allowed";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 md:p-5 rounded-xl border flex items-center justify-between transition-all duration-300 ${stateClass}`}
              >
                <span className="text-base md:text-lg">{opt}</span>
                {icon}
              </button>
            )
          })}
        </div>

        {/* AI Feedback */}
        {isAnswered && (
          <div className="mt-8 pt-8 border-t border-white/10 animate-in slide-in-from-bottom flex flex-col items-start gap-4">
            <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 w-full">
              <Brain className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-400 mb-1">Mentor Feedback</p>
                <p className="text-blue-100 text-sm leading-relaxed">{aiFeedback}</p>
              </div>
            </div>
            
            <button 
              onClick={nextQuestion}
              className="px-6 py-3 bg-white text-black font-medium rounded-full flex items-center gap-2 self-end hover:bg-gray-200 transition-colors"
            >
              {currentIdx < QUIZ_DATA.questions.length - 1 ? "Next Question" : "View Results"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
