export interface Exercise {
  id: string;
  question: string;
  options?: string[]; // For multiple choice
  solution: string; // Explanation/Latex
  answer?: string; // Correct option key (A, B, C, D)
}

export interface Lesson {
  id: string;
  title: string;
  theory: string; // Markdown/Latex content
  exercises: Exercise[];
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}