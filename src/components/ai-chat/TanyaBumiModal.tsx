import React, { useState } from 'react';
import { askBumi, AskBumiResponse } from '../../lib/aiService';
import { sound } from '../../lib/soundEngine';
import { BumiAvatar } from '../common/BumiAvatar';
import { Bot, Send, Sparkles, MessageCircle, ArrowLeft } from 'lucide-react';

interface TanyaBumiModalProps {
  onClose: () => void;
}

export const TanyaBumiModal: React.FC<TanyaBumiModalProps> = ({ onClose }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dialogHistory, setDialogHistory] = useState<
    { sender: 'user' | 'bumi'; text: string; followUp?: string; emotion?: 'happy' | 'thinking' | 'excited' | 'caring' }[]
  >([
    {
      sender: 'bumi',
      text: 'Hai Guardian! Aku BUMI! 🤖🌿 Kamu punya rasa penasaran tentang laut, hutan, atau cara menyelamatkan hewan? Tanyakan padaku!',
      followUp: 'Kamu bisa klik pertanyaan seru di bawah atau tulis pertanyaanmu sendiri!',
      emotion: 'happy',
    },
  ]);

  const presetQuestions = [
    'Kenapa laut tidak boleh kotor?',
    'Kenapa kita harus menanam pohon?',
    'Kenapa plastik berbahaya untuk penyu?',
    'Bagaimana cara memilah sampah yang benar?',
  ];

  const handleAsk = async (queryText: string) => {
    const q = queryText.trim();
    if (!q || isLoading) return;

    sound.playPop(520);
    setDialogHistory(prev => [...prev, { sender: 'user', text: q }]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response: AskBumiResponse = await askBumi(q);
      sound.playSuccess();
      setDialogHistory(prev => [
        ...prev,
        {
          sender: 'bumi',
          text: response.answer,
          followUp: response.followUpQuestion,
          emotion: response.emotion,
        },
      ]);
    } catch {
      setDialogHistory(prev => [
        ...prev,
        {
          sender: 'bumi',
          text: 'Alam semesta kita sangat luas dan saling terhubung! Yuk kita terus jaga kebersihan bumi bersama-sama! 🌍✨',
          emotion: 'happy',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col p-4 sm:p-6 bg-gradient-to-b from-teal-100 via-emerald-50 to-sky-100 select-none">
      {/* Top Header */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between gap-3 mb-3">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border-2 border-teal-400 flex items-center gap-3">
          <Bot className="w-6 h-6 text-teal-600" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Tanya Robot BUMI 🤖
            </h2>
            <p className="text-xs font-bold text-slate-600">
              Sahabat AI ramah lingkungan khusus anak SD
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-white transition shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>
      </div>

      {/* Main Chat Feed Container */}
      <div className="max-w-3xl mx-auto w-full flex-1 card-game p-4 sm:p-6 border-4 border-white shadow-2xl bg-white/80 flex flex-col justify-between overflow-hidden min-h-[450px]">
        {/* Messages scroll area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 max-h-[380px]">
          {dialogHistory.map((item, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {item.sender === 'bumi' && (
                <div className="shrink-0">
                  <BumiAvatar size={50} emotion={item.emotion || 'happy'} isFloating={false} />
                </div>
              )}

              <div
                className={`max-w-[82%] sm:max-w-[75%] p-3.5 sm:p-4 rounded-3xl shadow-sm ${
                  item.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none font-bold text-sm sm:text-base'
                    : 'bg-emerald-50 text-slate-900 border-2 border-emerald-300 rounded-bl-none'
                }`}
              >
                <p className="font-extrabold text-sm sm:text-base leading-relaxed">{item.text}</p>
                {item.followUp && (
                  <div className="mt-2.5 pt-2 border-t border-emerald-200 text-xs sm:text-sm font-bold text-emerald-800 flex items-start gap-1.5">
                    <span className="text-base">💭</span>
                    <span>{item.followUp}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-500 font-black text-xs sm:text-sm italic animate-pulse">
              <BumiAvatar size={45} emotion="thinking" isFloating={false} />
              <span>BUMI sedang berpikir sambil memutar baling-baling... 🌿</span>
            </div>
          )}
        </div>

        {/* Preset Question Pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          {presetQuestions.map((pq, i) => (
            <button
              key={i}
              onClick={() => handleAsk(pq)}
              className="text-xs font-black bg-teal-50 hover:bg-teal-100 text-teal-900 px-3 py-1.5 rounded-full border border-teal-300 transition shadow-2xs active:scale-95 text-left"
            >
              💡 {pq}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleAsk(inputQuery);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder="Tulis pertanyaanmu di sini..."
            className="flex-1 bg-slate-100 border-2 border-emerald-300 rounded-2xl px-4 py-3 font-bold text-slate-900 outline-none focus:border-emerald-500 shadow-inner text-sm sm:text-base"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="btn-green px-5 py-3 flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">Tanya</span>
          </button>
        </form>
      </div>
    </div>
  );
};
