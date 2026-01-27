import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { Send, Bot, X, MessageCircle, Loader2 } from 'lucide-react';
import MathText from './MathText';

interface ChatBotProps {
  context: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Chào em! Thầy Đông đây. Em cần thầy giải thích thêm về bài học hay muốn thầy hướng dẫn giải bài tập nào không?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messages, input, context);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 z-50"
          aria-label="Open Chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Interface */}
      <div className={`
        fixed bottom-0 right-0 z-50 bg-white shadow-2xl transition-all duration-300 ease-in-out border border-teal-100
        ${isOpen ? 'w-full h-full md:w-96 md:h-[600px] md:bottom-6 md:right-6 md:rounded-2xl opacity-100' : 'w-0 h-0 opacity-0 overflow-hidden'}
      `}>
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 text-white flex justify-between items-center rounded-t-none md:rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-full">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold">Chat với Thầy Đông</h3>
              <p className="text-xs text-teal-100">Gia sư AI Toán 12</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 h-[calc(100%-130px)] scrollbar-thin">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[85%] p-3 rounded-2xl shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-teal-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-gray-200 rounded-bl-none'}
              `}>
                <MathText content={msg.text} className={msg.role === 'user' ? 'text-white' : ''} />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
               <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex items-center gap-2 text-slate-500">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-xs">Thầy Đông đang soạn tin...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-teal-500 focus-within:bg-white transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Nhập câu hỏi..."
              className="flex-1 bg-transparent outline-none text-sm py-1"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-full transition-colors ${input.trim() ? 'text-teal-600 hover:bg-teal-50' : 'text-gray-400'}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;