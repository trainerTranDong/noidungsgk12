import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import ChatBot from './components/ChatBot';
import MathText from './components/MathText';
import { courseData } from './data';
import { Lesson } from './types';
import { Menu, BookOpen, Calculator, CheckCircle2, XCircle, ArrowRight, Trophy, Clock, Target, Lightbulb, Share2, RotateCcw, GraduationCap, Sparkles } from 'lucide-react';

const REQUIRED_PASS_PERCENTAGE = 80;

const App: React.FC = () => {
  // --- State Management ---
  const [currentLesson, setCurrentLesson] = useState<Lesson>(courseData[0].lessons[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'theory' | 'exercise'>('theory');
  
  const [completedExercises, setCompletedExercises] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('completedExercises');
    return saved ? JSON.parse(saved) : {};
  });

  const [exerciseStatus, setExerciseStatus] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  // --- Derived State (Memoized) ---
  const allLessons = useMemo(() => courseData.flatMap(chap => chap.lessons), []);

  const currentLessonProgress = useMemo(() => {
    const completed = completedExercises[currentLesson.id] || [];
    const total = currentLesson.exercises.length;
    const percentage = total === 0 ? 100 : Math.round((completed.length / total) * 100);
    const accuracy = total === 0 ? 100 : Math.round((completed.length / (Object.keys(exerciseStatus).filter(k => k.startsWith(currentLesson.id) || completed.includes(k)).length || 1)) * 100); 
    
    return { completed: completed.length, total, percentage, accuracy: isNaN(accuracy) ? 0 : accuracy };
  }, [completedExercises, currentLesson, exerciseStatus]);

  const { unlockedLessons, completedLessons } = useMemo(() => {
    const unlocked: string[] = [allLessons[0].id];
    const completed: string[] = [];

    for (let i = 0; i < allLessons.length; i++) {
      const lesson = allLessons[i];
      const doneExs = completedExercises[lesson.id] || [];
      const totalExs = lesson.exercises.length;
      
      const isComplete = totalExs === 0 || (doneExs.length / totalExs) * 100 >= REQUIRED_PASS_PERCENTAGE;
      
      if (isComplete) {
        completed.push(lesson.id);
        if (i + 1 < allLessons.length) unlocked.push(allLessons[i+1].id);
      } else {
        break;
      }
    }
    return { unlockedLessons: unlocked, completedLessons: completed };
  }, [completedExercises, allLessons]);

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
  }, [completedExercises]);

  useEffect(() => {
    setExerciseStatus({});
    setSelectedAnswers({});
    setActiveTab('theory');
    window.scrollTo(0,0);
  }, [currentLesson]);

  // --- Handlers ---
  const handleAnswer = (exId: string, selectedOptionKey: string, correctKey: string) => {
    if (exerciseStatus[exId] === 'correct') return;

    setSelectedAnswers(prev => ({ ...prev, [exId]: selectedOptionKey }));

    if (selectedOptionKey === correctKey) {
      setExerciseStatus(prev => ({ ...prev, [exId]: 'correct' }));
      setCompletedExercises(prev => {
        const currentList = prev[currentLesson.id] || [];
        if (!currentList.includes(exId)) {
          return { ...prev, [currentLesson.id]: [...currentList, exId] };
        }
        return prev;
      });
    } else {
      setExerciseStatus(prev => ({ ...prev, [exId]: 'incorrect' }));
    }
  };

  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      setCurrentLesson(allLessons[currentIndex + 1]);
    }
  };

  const resetLesson = () => {
      setExerciseStatus({});
      setSelectedAnswers({});
      setCompletedExercises(prev => {
          const newState = {...prev};
          delete newState[currentLesson.id];
          return newState;
      });
  }

  const currentChapterTitle = courseData.find(c => c.lessons.some(l => l.id === currentLesson.id))?.title;

  return (
    <div className="flex h-screen bg-[#0B1221] overflow-hidden font-sans text-white selection:bg-primary selection:text-black">
      {/* Background Gradient Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B1221] to-[#0B1221] z-0 pointer-events-none"></div>

      <Sidebar 
        data={courseData} 
        currentLessonId={currentLesson.id}
        onSelectLesson={setCurrentLesson}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        unlockedLessons={unlockedLessons}
        completedLessons={completedLessons}
      />

      <main className="flex-1 flex flex-col h-full relative w-full overflow-hidden z-10">
        {/* Header */}
        <header className="bg-[#0B1221]/80 backdrop-blur-xl border-b border-white/5 h-16 flex items-center px-6 justify-between shrink-0 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-400 hover:bg-white/10 rounded-full md:hidden transition"
            >
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest hidden sm:block">
                {currentChapterTitle}
              </span>
              <h1 className="text-lg font-bold text-white line-clamp-1">
                {currentLesson.title}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-300">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#00E5FF]"></span>
                Học trực tuyến
             </div>
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-600 p-[1px]">
                <div className="w-full h-full rounded-full bg-[#0B1221] flex items-center justify-center text-xs font-bold text-white">
                    ME
                </div>
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin">
          <div className="max-w-6xl mx-auto pb-24">
            
            {/* View Selector Tabs */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1 bg-surface/50 p-1 rounded-xl border border-white/5 backdrop-blur-md">
                    <button
                        onClick={() => setActiveTab('theory')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'theory' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <BookOpen size={16} /> Lý thuyết
                    </button>
                    <button
                        onClick={() => setActiveTab('exercise')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'exercise' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Calculator size={16} /> Quiz & Bài tập
                    </button>
                </div>
                {activeTab === 'exercise' && (
                    <button onClick={resetLesson} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors bg-surface/50 px-4 py-2.5 rounded-xl border border-white/5 hover:border-primary/30">
                        <RotateCcw size={14} /> Làm lại
                    </button>
                )}
            </div>

            {/* View: THEORY */}
            {activeTab === 'theory' && (
              <div className="animate-slide-up space-y-8">
                
                {/* Hero Card for Lesson Title */}
                <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-emerald-600 to-teal-800 opacity-90 transition-all duration-500 group-hover:scale-105"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    
                    <div className="relative p-8 md:p-12 flex flex-col items-start gap-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold text-white uppercase tracking-wider">
                           <GraduationCap size={14} /> Chương trình Toán 12
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
                           {currentLesson.title}
                        </h1>
                        <p className="text-teal-50 text-lg md:text-xl max-w-2xl font-medium leading-relaxed opacity-90">
                           Tổng hợp kiến thức trọng tâm và các dạng bài tập quan trọng.
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-transparent"> 
                   {/* MathText automatically renders "Cards" for each section */}
                   <MathText content={currentLesson.theory} className="max-w-none" />

                   <div className="mt-12 flex justify-center">
                      <button 
                         onClick={() => setActiveTab('exercise')}
                         className="flex items-center gap-3 bg-[#162032] hover:bg-[#1E293B] border border-primary/30 text-primary px-8 py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(0,229,255,0.1)] hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transform hover:-translate-y-1 group"
                      >
                         <Sparkles size={20} className="text-yellow-400 group-hover:animate-spin" />
                         Chuyển sang làm bài tập
                         <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                </div>
              </div>
            )}

            {/* View: EXERCISES (Dashboard Style) */}
            {activeTab === 'exercise' && (
              <div className="animate-slide-up">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[
                      { label: 'Tổng điểm', value: currentLessonProgress.completed * 10, sub: `/${currentLessonProgress.total * 10}`, icon: Trophy },
                      { label: 'Độ chính xác', value: '80%', sub: 'Target met', icon: Target },
                      { label: 'Thời gian', value: '12m', sub: '45s', icon: Clock }
                    ].map((stat, i) => (
                      <div key={i} className="bg-surface/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-primary/30 transition-colors">
                          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
                              <stat.icon size={80} />
                          </div>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                          <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-black text-white tracking-tight">{stat.value}</span>
                              <span className="text-sm text-primary font-bold">{stat.sub}</span>
                          </div>
                      </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="bg-surface/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-sm text-white">Tiến độ hoàn thành</h3>
                        <span className="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">{currentLessonProgress.percentage}%</span>
                    </div>
                    <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-primary shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-1000 ease-out" style={{width: `${currentLessonProgress.percentage}%`}}></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Questions List */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <BookOpen size={20} />
                            </div>
                            <h3 className="font-bold text-xl text-white">Chi tiết câu hỏi</h3>
                        </div>

                        {currentLesson.exercises.map((ex, index) => {
                            const status = exerciseStatus[ex.id];
                            const isDone = completedExercises[currentLesson.id]?.includes(ex.id);
                            const showSolution = status === 'correct' || isDone;
                            const currentSelected = selectedAnswers[ex.id];

                            return (
                                <div key={ex.id} className="bg-surface/60 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                    {/* Header of Question Card */}
                                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#131B2D]">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider ${status === 'correct' || isDone ? 'bg-success/20 text-success border border-success/20' : status === 'incorrect' ? 'bg-error/20 text-error border border-error/20' : 'bg-slate-700/50 text-slate-300 border border-white/5'}`}>
                                                Câu {index + 1}
                                            </span>
                                            {status === 'correct' || isDone ? <span className="text-xs font-bold text-success">Chính xác</span> : null}
                                        </div>
                                        <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-white transition-colors bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/20">
                                            <Lightbulb size={14} /> Hỏi AI
                                        </button>
                                    </div>

                                    <div className="p-8">
                                        <div className="mb-8">
                                            {/* Justified Question Text */}
                                            <MathText content={ex.question} className="text-lg font-medium text-white leading-loose" />
                                        </div>

                                        <div className="space-y-4">
                                            {ex.options?.map((opt, i) => {
                                                const optKey = String.fromCharCode(65 + i);
                                                const isCorrectKey = optKey === ex.answer;
                                                const isSelected = currentSelected === optKey;
                                                
                                                let btnClass = "border-white/10 bg-[#0B1221]/50 text-slate-300 hover:bg-[#1E293B] hover:border-white/20";
                                                let circleClass = "bg-[#1E293B] text-slate-400 border border-white/10";
                                                let icon = null;

                                                if (showSolution) {
                                                    if (isCorrectKey) {
                                                        btnClass = "border-success bg-success/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]";
                                                        circleClass = "bg-success text-black font-bold border-success";
                                                        icon = <CheckCircle2 size={20} className="text-success" />;
                                                    } else if (isSelected) {
                                                        btnClass = "border-error bg-error/10 text-white";
                                                        circleClass = "bg-error text-white font-bold border-error";
                                                        icon = <XCircle size={20} className="text-error" />;
                                                    } else {
                                                        btnClass = "border-transparent bg-transparent text-slate-600 opacity-40";
                                                        circleClass = "bg-transparent border-slate-700 text-slate-700";
                                                    }
                                                } else if (isSelected) {
                                                    btnClass = "border-primary bg-primary/10 text-white shadow-[0_0_15px_rgba(0,229,255,0.15)]";
                                                    circleClass = "bg-primary text-black font-bold border-primary";
                                                }

                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleAnswer(ex.id, optKey, ex.answer || '')}
                                                        disabled={showSolution}
                                                        className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all duration-200 group ${btnClass}`}
                                                    >
                                                        <div className="flex items-center gap-4 w-full">
                                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${circleClass}`}>
                                                                {optKey}
                                                            </span>
                                                            <div className="text-base flex-1">
                                                                <MathText content={opt} className="" />
                                                            </div>
                                                        </div>
                                                        {icon}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Explanation Panel */}
                                    {showSolution && (
                                        <div className="bg-[#0f1623] border-t border-white/5 p-8 animate-slide-up">
                                            <h4 className="text-primary text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                                                <div className="bg-primary/20 p-1 rounded">
                                                   <Lightbulb size={14} /> 
                                                </div>
                                                Giải thích chi tiết
                                            </h4>
                                            <div className="text-base text-slate-300">
                                                {/* Justified Solution Text */}
                                                <MathText content={ex.solution} className="leading-relaxed" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Sidebar Widgets */}
                    <div className="space-y-8">
                        {/* Overall Result Chart */}
                        <div className="bg-surface/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 text-center shadow-lg">
                            <h3 className="text-sm font-bold text-white mb-8">Kết quả tổng quan</h3>
                            <div className="relative w-48 h-48 mx-auto mb-8">
                                <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
                                    <circle cx="96" cy="96" r="80" stroke="#1e293b" strokeWidth="12" fill="transparent" />
                                    <circle 
                                        cx="96" cy="96" r="80" 
                                        stroke="#00E5FF" strokeWidth="12" 
                                        fill="transparent" 
                                        strokeDasharray="502" 
                                        strokeDashoffset={502 - (502 * currentLessonProgress.percentage) / 100}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out shadow-[0_0_20px_#00E5FF]"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black text-white">{currentLessonProgress.percentage}%</span>
                                    <span className="text-[10px] text-primary uppercase font-bold tracking-widest mt-1">Hoàn thành</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                                Bạn đã hoàn thành <strong className="text-white">{currentLessonProgress.percentage}%</strong> nội dung bài học. Hãy tiếp tục cố gắng!
                            </p>
                            <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 border border-white/5">
                                <Share2 size={16} /> Chia sẻ kết quả
                            </button>
                        </div>

                        {/* Question Map */}
                        <div className="bg-surface/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8">
                            <h3 className="text-sm font-bold text-white mb-6">Danh sách câu hỏi</h3>
                            <div className="grid grid-cols-5 gap-3">
                                {currentLesson.exercises.map((ex, idx) => {
                                    const status = exerciseStatus[ex.id];
                                    const isDone = completedExercises[currentLesson.id]?.includes(ex.id);
                                    let bgClass = "bg-[#1E293B] text-slate-500 hover:bg-slate-700 border border-white/5";
                                    if (status === 'correct' || isDone) bgClass = "bg-success text-white shadow-lg shadow-success/20 border-success/50";
                                    if (status === 'incorrect') bgClass = "bg-error text-white shadow-lg shadow-error/20 border-error/50";

                                    return (
                                        <button 
                                            key={idx}
                                            className={`aspect-square rounded-xl font-bold text-xs flex items-center justify-center transition-all ${bgClass}`}
                                        >
                                            {idx + 1}
                                        </button>
                                    )
                                })}
                            </div>
                            <div className="flex gap-4 mt-6 text-[10px] font-bold text-slate-400 justify-center">
                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success shadow-[0_0_5px_#10B981]"></span> Đúng</span>
                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-error shadow-[0_0_5px_#EF4444]"></span> Sai</span>
                                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-600"></span> Chưa làm</span>
                            </div>
                        </div>

                        {/* AI Hint Card */}
                        <div className="bg-gradient-to-br from-slate-900 via-[#162032] to-slate-900 border border-primary/20 rounded-3xl p-8 relative overflow-hidden group shadow-lg">
                            <div className="absolute -right-10 -top-10 bg-primary/20 w-32 h-32 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4 text-primary font-bold text-sm">
                                    <div className="bg-primary text-black p-1.5 rounded-lg animate-bounce shadow-[0_0_10px_#00E5FF]">
                                        <Lightbulb size={16} />
                                    </div>
                                    Gợi ý từ AI Gemini
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed mb-6 text-justify">
                                    Bạn đang làm rất tốt! Tuy nhiên, hãy chú ý kỹ hơn ở các câu hỏi về <strong>{currentLesson.title}</strong> để đạt điểm tối đa nhé.
                                </p>
                                <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline group-hover:translate-x-1 transition-transform">
                                    Xem bài giảng gợi ý <ArrowRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Chatbot Overlay */}
      <ChatBot context={currentLesson.theory + "\n\n" + JSON.stringify(currentLesson.exercises)} />
    </div>
  );
};

export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Math Master 12 – App đã chạy</h1>
      <p>Nếu thấy dòng này, Vite + React + Vercel đã OK</p>
    </div>
  );
}
