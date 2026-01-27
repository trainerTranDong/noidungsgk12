import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is set securely.

// Initializing GenAI Client
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string,
  context: string
): Promise<string> => {
  if (!apiKey) {
    return "Lỗi: Chưa cấu hình API Key. Vui lòng kiểm tra cài đặt.";
  }

  try {
    const systemInstruction = `
      Bạn là một gia sư Toán học lớp 12 thân thiện và am hiểu, chuyên về chương trình Cánh Diều của Việt Nam.
      
      Dưới đây là nội dung bài học hiện tại mà học sinh đang xem:
      ---
      ${context}
      ---
      
      Hãy trả lời câu hỏi của học sinh dựa trên ngữ cảnh này. 
      - Nếu câu hỏi liên quan đến bài học, hãy giải thích chi tiết, sử dụng công thức toán học định dạng LaTeX bọc trong dấu $ (ví dụ: $x^2$).
      - Nếu câu hỏi là bài tập, hãy hướng dẫn từng bước (step-by-step) thay vì chỉ đưa ra đáp án cuối cùng.
      - Luôn khích lệ tinh thần học tập.
      - Trả lời bằng tiếng Việt.
    `;

    // We use the simpler generateContent for a single turn with context context, 
    // but building a chat history string manually is often more reliable for short context apps 
    // unless we strictly use the chat API. Let's use chat API but reconstructed each time 
    // or just generateContent with history appended. 
    // For simplicity and robustness with the provided instruction, let's use generateContent.

    // Format history for the prompt
    const conversation = history.map(msg => 
      `${msg.role === 'user' ? 'Học sinh' : 'Gia sư'}: ${msg.text}`
    ).join('\n');

    const fullPrompt = `${systemInstruction}\n\nLịch sử trò chuyện:\n${conversation}\n\nHọc sinh: ${newMessage}\nGia sư:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: fullPrompt,
    });

    return response.text || "Xin lỗi, tôi không thể trả lời lúc này.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.";
  }
};