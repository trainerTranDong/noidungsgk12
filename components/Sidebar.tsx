import React, { useState } from 'react';
import { Chapter, Lesson } from '../types';
import { ChevronDown, ChevronRight, X, Lock, CheckCircle, PlayCircle } from 'lucide-react';

interface SidebarProps {
  data: Chapter[];
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  isOpen: boolean;
  onClose: () => void;
  unlockedLessons: string[];
  completedLessons: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  data, 
  currentLessonId, 
  onSelectLesson, 
  isOpen, 
  onClose,
  unlockedLessons,
  completedLessons
}) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>(data.map(c => c.id));

  const toggleChapter = (id: string) => {
    setExpandedChapters(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <>
       {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-full w-80 bg-surface text-white shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-slate-800
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static flex flex-col
      `}>
        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-surface">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
                <i className="fa-solid fa-graduation-cap text-primary text-xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">EduMaster AI</span>
              <span className="text-xs text-secondary">Toán 12 - Thầy Đông</span>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-secondary hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
          {data.map((chapter) => (
            <div key={chapter.id} className="mb-6">
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center justify-between mb-2 text-left text-xs font-bold text-secondary uppercase tracking-wider hover:text-primary transition-colors"
              >
                <span>{chapter.title}</span>
                {expandedChapters.includes(chapter.id) ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>

              {expandedChapters.includes(chapter.id) && (
                <div className="space-y-1">
                  {chapter.lessons.map((lesson) => {
                    const isUnlocked = unlockedLessons.includes(lesson.id);
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isActive = currentLessonId === lesson.id;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          if (isUnlocked) {
                            onSelectLesson(lesson);
                            if (window.innerWidth < 768) onClose();
                          }
                        }}
                        disabled={!isUnlocked}
                        className={`
                          w-full flex items-center justify-between text-left text-sm p-3 rounded-xl transition-all duration-200 border border-transparent
                          ${isActive 
                            ? 'bg-primary/10 border-primary/50 text-white shadow-glow' 
                            : isUnlocked 
                              ? 'text-slate-400 hover:bg-slate-800 hover:text-white' 
                              : 'text-slate-700 cursor-not-allowed'}
                        `}
                      >
                        <div className="flex items-center gap-3 w-full">
                          {isCompleted ? (
                             <CheckCircle size={16} className="text-success flex-shrink-0" />
                          ) : isActive ? (
                             <PlayCircle size={16} className="text-primary flex-shrink-0 animate-pulse" />
                          ) : isUnlocked ? (
                             <div className="w-4 h-4 rounded-full border-2 border-slate-600 flex-shrink-0"></div>
                          ) : (
                             <Lock size={16} className="text-slate-700 flex-shrink-0" />
                          )}
                          <span className="truncate font-medium">{lesson.title}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;