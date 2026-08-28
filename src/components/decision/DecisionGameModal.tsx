import React, { useState } from 'react';
import { DECISION_SCENARIOS } from '../../lib/missionData';
import { DecisionScenario } from '../../types/game';
import { sound } from '../../lib/soundEngine';
import { BumiAvatar } from '../common/BumiAvatar';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface DecisionGameModalProps {
  onSuccess: (points: number, xp: number) => void;
  onClose: () => void;
}

export const DecisionGameModal: React.FC<DecisionGameModalProps> = ({
  onSuccess,
  onClose,
}) => {
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);

  const scenario = DECISION_SCENARIOS[currentScenarioIdx % DECISION_SCENARIOS.length];
  const chosenOption = scenario.options.find(o => o.id === selectedOptionId);

  const handleChoose = (optId: string) => {
    if (isEvaluated) return;
    sound.playPop(520);
    setSelectedOptionId(optId);
  };

  const handleConfirm = () => {
    if (!chosenOption) return;
    setIsEvaluated(true);
    if (chosenOption.isCorrect) {
      sound.playSuccess();
      onSuccess(30, 50);
    } else {
      sound.playGentle();
    }
  };

  const handleNext = () => {
    sound.playPop();
    if (currentScenarioIdx + 1 < DECISION_SCENARIOS.length) {
      setCurrentScenarioIdx(c => c + 1);
      setSelectedOptionId(null);
      setIsEvaluated(false);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn select-none">
      <div className="card-game w-full max-w-xl p-6 sm:p-8 relative border-4 border-amber-400 bg-gradient-to-b from-white to-amber-50 shadow-2xl text-slate-900">
        <div className="flex items-center gap-3 mb-4">
          <BumiAvatar size={65} emotion={isEvaluated ? (chosenOption?.isCorrect ? 'excited' : 'thinking') : 'happy'} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Skenario Keputusan Penjaga Bumi
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight mt-1">
              {scenario.title}
            </h3>
          </div>
        </div>

        {/* Situation Description */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-4 text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
          {scenario.situation}
        </div>

        <p className="text-sm font-black text-slate-900 mb-3">
          ❓ {scenario.question}
        </p>

        {/* Options */}
        <div className="space-y-2.5 mb-5">
          {scenario.options.map(opt => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <button
                key={opt.id}
                disabled={isEvaluated}
                onClick={() => handleChoose(opt.id)}
                className={`w-full text-left p-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all border-2 flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-300'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <span>{opt.text}</span>
                {isSelected && <span className="text-lg">👉</span>}
              </button>
            );
          })}
        </div>

        {/* Evaluation feedback box */}
        {isEvaluated && chosenOption && (
          <div
            className={`p-4 rounded-2xl border-2 mb-4 animate-fadeIn ${
              chosenOption.isCorrect
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                : 'bg-sky-50 border-sky-400 text-sky-950'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-sm mb-1">
              <span>{chosenOption.isCorrect ? '🌟 BUMI berkata:' : '🤔 BUMI berkata:'}</span>
            </div>
            <p className="text-xs sm:text-sm font-bold leading-relaxed">
              {chosenOption.feedback}
            </p>
          </div>
        )}

        {/* Actions */}
        {!isEvaluated ? (
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="w-1/3 py-3 rounded-2xl font-black text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Nanti Saja
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedOptionId}
              className="btn-green flex-1 py-3 text-sm sm:text-base font-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              PILIH JAWABAN INI! ✨
            </button>
          </div>
        ) : (
          <button
            onClick={handleNext}
            className="btn-green w-full py-3.5 text-base font-black flex items-center justify-center gap-2"
          >
            <span>{currentScenarioIdx + 1 < DECISION_SCENARIOS.length ? 'SKENARIO BERIKUTNYA' : 'SELESAI!'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
