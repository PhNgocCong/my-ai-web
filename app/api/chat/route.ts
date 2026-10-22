import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: process.env.NINEROUTER_URL || 'http://localhost:20128/v1', 
  apiKey: process.env.NINEROUTER_API_KEY || 'sk-91eacf762ef4ce26-zmbqzg-4e04e044', 
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const response = await openai.chat.completions.create({
      model: 'gemini/gemini-3.1-pro-preview', // Hãy chắc chắn tên này giống 100% trên 9Router
      messages: [{ role: 'user', content: message }],
    });
    
    return Response.json({ reply: response.choices[0].message.content });
  } catch (error: any) {
    // Dòng này sẽ in chi tiết nguyên nhân lỗi ra Terminal của bạn
    console.error("LỖI CHI TIẾT:", error); 
    
    return Response.json({ error: error.message }, { status: 500 });
  }
}