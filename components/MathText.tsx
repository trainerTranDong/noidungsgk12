import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    MathJax: any;
  }
}

interface MathTextProps {
  content: string;
  className?: string;
}

const MathText: React.FC<MathTextProps> = ({ content, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.MathJax && containerRef.current) {
      containerRef.current.innerHTML = formatContent(content);
      window.MathJax.typesetPromise([containerRef.current]).catch((err: any) => console.log(err));
    }
  }, [content]);

  const formatContent = (text: string) => {
    // Check if this content is structured theory (has headers) or simple text (exercises)
    const hasHeaders = text.includes('###');

    if (!hasHeaders) {
        // --- SIMPLE MODE (For Exercises/Options) ---
        return processBody(text);
    }

    // --- SECTION MODE (For Theory) ---
    // Split by headers (###)
    // The regex looks ahead for ### or end of string
    const parts = text.split(/(?=### )/g);

    return parts.map(part => {
        const headerMatch = part.match(/^###\s*(?:<i.*?>.*?<\/i>)?\s*(.*)(?:\n|$)/);
        
        let title = '';
        let body = part;

        if (headerMatch) {
            title = headerMatch[1].trim();
            // Remove the header line to get the body
            body = part.replace(/^### .*(\n|$)/, '');
        }

        // If the part is empty (e.g. text before first header), skip unless it has content
        if (!title && !body.trim()) return '';

        const processedBody = processBody(body);

        // Render as a Knowledge Card
        return `
            <div class="bg-[#162032]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 mb-6 shadow-lg hover:border-primary/20 transition-all duration-300">
                ${title ? `
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-primary/10 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,229,255,0.15)] border border-primary/20">
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-white tracking-tight">${title}</h3>
                    </div>
                ` : ''}
                <div class="text-slate-300 leading-relaxed text-justify space-y-4">
                    ${processedBody}
                </div>
            </div>
        `;
    }).join('');
  };

  const processBody = (text: string) => {
      let formatted = text.trim();

      // 1. Lists (* item) -> Compact 2-Column Grid
      formatted = formatted.replace(/((?:^\* .*(?:\n|$))+)/gm, (match) => {
        const items = match.trim().split('\n').map(line => {
          let content = line.replace(/^\* /, '').trim();
          return `
            <div class="flex gap-3 items-start h-full p-3 rounded-lg bg-[#0B1221]/50 border border-white/5 hover:border-primary/30 transition-colors">
              <div class="text-primary mt-1 flex-shrink-0">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div class="text-sm text-slate-300 leading-relaxed">${content}</div>
            </div>
          `;
        }).join('');
        // Grid Container
        return `<div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">${items}</div>`;
      });

      // 2. Bold (**text**) -> Highlighted
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold bg-white/5 px-1 rounded">$1</strong>');

      // 3. Newlines -> Line Breaks (Handle Paragraphs)
      // Only replace single newlines that aren't inside the HTML tags we just generated.
      // Simple approach: Since lists removed their newlines, remaining newlines are usually paragraph breaks.
      formatted = formatted.replace(/\n/g, '<div class="h-2"></div>'); 

      return formatted;
  };

  return (
    <div 
      ref={containerRef} 
      className={`math-content w-full ${className}`}
    />
  );
};

export default MathText;