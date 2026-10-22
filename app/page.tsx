'use client';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setResponse(data.reply || 'Có lỗi xảy ra');
    } catch (error) {
      setResponse('Lỗi kết nối');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🤖 AI Chat với 9Router
        </h1>
        
        <div className="mb-4">
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Hỏi AI điều gì đó..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 resize-none shadow-sm"
          />
        </div>
        
        <button 
          onClick={sendMessage} 
          disabled={loading} 
          className={`w-full py-3 rounded-lg text-white font-bold transition-colors duration-200 shadow-md ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Đang suy nghĩ...' : 'Gửi tin nhắn'}
        </button>
        
        <div className="mt-8 bg-blue-50 p-5 rounded-lg border border-blue-100 min-h-[150px] shadow-inner">
          <strong className="text-blue-900 block mb-2 text-lg">AI Trả lời:</strong> 
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {response}
          </p>
        </div>
      </div>
    </div>
  );
}