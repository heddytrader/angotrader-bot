'use client';

import React, { useState, useEffect } from 'react';
import { Asset, AnalysisType, Timeframe } from '../types';
import { Cpu, CheckCircle2, Loader2, Sparkles, Shield, Compass, Activity } from 'lucide-react';

interface AnalysisStepModalProps {
  isOpen: boolean;
  asset: Asset;
  timeframe: Timeframe;
  analysisType: AnalysisType;
  onComplete: () => void;
}

export const AnalysisStepModal: React.FC<AnalysisStepModalProps> = ({
  isOpen,
  asset,
  timeframe,
  analysisType,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Análise Técnica', detail: 'Cálculo de RSI, Médias Móveis (EMA 50/200) e suporte/resistência chave' },
    { label: 'Análise Fundamentalista', detail: 'Verificação do calendário macroeconómico e sentimento do mercado' },
    { label: 'Análise de Timing', detail: `Liquidez da ${asset.sessions} no timeframe ${timeframe}` },
    { label: 'Estratégia EGGY (SMC)', detail: 'Varredura de liquidez (Spring/Upthrust), Order Blocks e FVG' },
    { label: 'Força do Sinal', detail: 'Validação de confluência institucional e risco/retorno' }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 600); // 3 seconds total

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.round(((currentStep + 1) / steps.length) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#0d1117] border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-center flex flex-col items-center">
        {/* Pulsing Core */}
        <div className="relative mb-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
            <Cpu size={32} className="animate-spin duration-3000" />
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-amber-500/20 blur-md animate-pulse -z-10" />
        </div>

        <h3 className="text-white font-extrabold text-lg flex items-center gap-2">
          AI Engine a Analisar...
        </h3>
        <p className="text-xs text-amber-400 font-mono mt-0.5 font-bold">
          {asset.symbol} • {timeframe} • {analysisType}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-[#161b22] rounded-full h-2 my-5 overflow-hidden border border-white/5">
          <div
            className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Steps List */}
        <div className="w-full space-y-2.5 text-left">
          {steps.map((st, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={st.label}
                className={`p-2.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : isDone
                    ? 'bg-white/[0.02] border-white/5 text-slate-300'
                    : 'bg-transparent border-transparent text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isDone ? (
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 size={16} className="text-amber-400 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span className="text-xs font-semibold">{st.label}</span>
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] uppercase font-mono text-amber-400 animate-pulse font-bold">
                      A processar
                    </span>
                  )}
                </div>
                {isCurrent && (
                  <p className="text-[10px] text-slate-400 mt-1 pl-6 leading-tight">
                    {st.detail}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-[11px] text-slate-400 flex items-center gap-1.5">
          <Sparkles size={12} className="text-amber-400" />
          <span>Estratégia EGGY: Validação Institucional em tempo real</span>
        </div>
      </div>
    </div>
  );
};
