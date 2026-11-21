'use client';

import React from 'react';
import { Crown, Sparkles, ShieldCheck, Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import { ALL_ASSETS } from '../../data/assets';

interface PremiumSignalsViewProps {
  onOpenCreditModal: () => void;
  onNavigateToAnalysis: () => void;
}

export const PremiumSignalsView: React.FC<PremiumSignalsViewProps> = ({
  onOpenCreditModal,
  onNavigateToAnalysis,
}) => {
  const vipSignals = [
    {
      symbol: 'XAUUSD',
      name: 'Ouro Spot',
      session: 'Sessão Londres / Nova Iorque',
      type: 'COMPRA FORTE',
      entry: '2665.00',
      sl: '2650.00',
      tp1: '2690.00',
      tp2: '2725.00',
      rr: '1:4.0',
      winrate: '84%',
      strategy: 'EGGY Spring 15m + Wyckoff Acumulação',
      status: 'EM ANDAMENTO (ATIVO)'
    },
    {
      symbol: 'US30',
      name: 'Dow Jones 30',
      session: 'Sessão Nova Iorque',
      type: 'VENDA FORTE',
      entry: '43820.00',
      sl: '44010.00',
      tp1: '43400.00',
      tp2: '43100.00',
      rr: '1:3.8',
      winrate: '81%',
      strategy: 'Upthrust After Distribution (UTAD) + FVG',
      status: 'PRONTO PARA ENTRADA'
    },
    {
      symbol: 'GBPJPY',
      name: 'Dragão Forex',
      session: 'Sessão Londres',
      type: 'COMPRA',
      entry: '195.10',
      sl: '194.30',
      tp1: '196.80',
      tp2: '198.50',
      rr: '1:4.2',
      winrate: '79%',
      strategy: 'London Open Breakout + Order Block 1h',
      status: 'ALVO 1 ATINGIDO (+170 PIPS)'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      {/* VIP Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600/30 via-[#161b26] to-black border-2 border-amber-500/50 p-6 shadow-2xl">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold w-fit border border-amber-500/40 mb-3">
          <Crown size={14} />
          <span>SALA VIP ANGOTRADER ELITE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Sinais Premium Institucionais
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
          Setups filtrados com tripla confirmação institucional (EGGY SMC + Liquidez Interbancária + Order Flow). Apenas operações com risco/retorno mínimo de 1:3R.
        </p>
      </div>

      {/* Sinais VIP Cards */}
      <div className="space-y-4">
        {vipSignals.map((vip) => (
          <div
            key={vip.symbol}
            className="p-5 rounded-2xl bg-[#0d1117] border border-amber-500/30 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-black flex items-center justify-center font-black text-base shadow-md">
                  {vip.symbol.slice(0, 3)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-lg">{vip.symbol}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-extrabold">
                      {vip.type}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                      {vip.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {vip.name} • {vip.session}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Risco/Retorno</span>
                <span className="text-base font-black text-amber-400 font-mono">
                  {vip.rr}
                </span>
              </div>
            </div>

            {/* Níveis Exatos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#161b22] p-3 rounded-xl text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Entrada Limite</span>
                <span className="font-mono font-bold text-white text-sm">{vip.entry}</span>
              </div>
              <div>
                <span className="text-[10px] text-rose-400 block font-semibold">Stop Loss Protegido</span>
                <span className="font-mono font-bold text-rose-300 text-sm">{vip.sl}</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 block font-semibold">TP 1 (Parcial 50%)</span>
                <span className="font-mono font-bold text-emerald-300 text-sm">{vip.tp1}</span>
              </div>
              <div>
                <span className="text-[10px] text-amber-400 block font-semibold">TP 2 (Final)</span>
                <span className="font-mono font-bold text-amber-300 text-sm">{vip.tp2}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-amber-300">
                <ShieldCheck size={14} /> {vip.strategy}
              </span>
              <button
                onClick={onNavigateToAnalysis}
                className="text-amber-400 hover:underline font-bold"
              >
                Analisar no Robô →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
