'use client';

import React from 'react';
import { UserCredits, AnalysisResult } from '../../types';
import { User, Sparkles, Coins, ShieldCheck, History, RefreshCcw, Smartphone, Plus } from 'lucide-react';

interface ProfileViewProps {
  credits: UserCredits;
  onOpenCreditModal: () => void;
  recentAnalyses: AnalysisResult[];
  onResetCredits: () => void;
  isOwner?: boolean;
  userEmail?: string;
  onUpdateEmail?: (email: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  credits,
  onOpenCreditModal,
  recentAnalyses,
  onResetCredits,
  isOwner = false,
  userEmail = 'edgar84inacio@gmail.com',
  onUpdateEmail,
}) => {
  const [emailInput, setEmailInput] = React.useState(userEmail);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateEmail) {
      onUpdateEmail(emailInput.trim());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      <div>
        <div className="flex items-center gap-2">
          <User size={24} className="text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Perfil & Créditos
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Gestão de conta, saldo de créditos e histórico de operações salvas
        </p>
      </div>

      {/* Cartão de Identidade */}
      <div className="p-5 rounded-2xl bg-[#0d1117] border border-amber-500/30 flex items-center justify-between flex-wrap gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-black font-black text-2xl flex items-center justify-center shadow-lg border border-amber-200">
            {isOwner ? '👑' : 'AO'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-white">
                {isOwner ? 'Edgar Inácio (Dono)' : 'Trader AngoTrader'}
              </h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase ${
                isOwner ? 'bg-amber-500 text-black border border-amber-300' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {isOwner ? '👑 DONO DO SISTEMA' : 'Membro Ativo'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">{userEmail} • Luanda (UTC+1)</p>
            <div className="text-[11px] text-amber-400 font-medium mt-1">
              Plano: {isOwner ? 'Plano Infinito Dono (∞ PRO / ∞ Simples)' : 'AngoTrader Bot PRO com Estratégia EGGY'}
            </div>
          </div>
        </div>

        {!isOwner && (
          <button
            onClick={onOpenCreditModal}
            className="px-4 py-2.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs hover:bg-amber-400 shadow-md flex items-center gap-2 transition-all active:scale-95"
          >
            <Plus size={16} strokeWidth={3} />
            <span>Comprar Mais Créditos</span>
          </button>
        )}
      </div>

      {/* Gestão de E-mail / Identificação */}
      <div className="p-4 rounded-xl bg-[#161b22] border border-white/5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300">Email da Conta (Identificação do Dono):</span>
          {isOwner && (
            <span className="text-emerald-400 font-bold font-mono text-[11px]">
              ✓ Reconhecido como Dono: Análises gratuitas e infinitas
            </span>
          )}
        </div>
        <form onSubmit={handleSaveEmail} className="flex gap-2">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="edgar84inacio@gmail.com"
            className="flex-1 bg-[#0d1117] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition-all"
          >
            Guardar Email
          </button>
        </form>
        {savedSuccess && (
          <p className="text-xs text-emerald-400 font-medium">Email atualizado com sucesso!</p>
        )}
      </div>

      {/* Saldo de Créditos Detalhado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Créditos PRO */}
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-amber-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
              Créditos Institucionais PRO
            </span>
            <Sparkles size={18} className="text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {isOwner ? (
              <span className="text-amber-400">∞ <span className="text-xs font-sans text-slate-300">ILIMITADO (DONO)</span></span>
            ) : (
              <>{credits.pro} <span className="text-xs text-amber-400 font-sans font-bold">restantes</span></>
            )}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Permite rodar o motor completo EGGY com confluência de Order Blocks, Wyckoff Spring e níveis exatos de Stop e Take Profit.
          </p>
        </div>

        {/* Créditos Simples */}
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
              Créditos de Análise Rápida
            </span>
            <Coins size={18} className="text-slate-400" />
          </div>
          <div className="text-3xl font-black text-slate-200 font-mono">
            {isOwner ? (
              <span className="text-emerald-400">∞ <span className="text-xs font-sans text-slate-300">ILIMITADO (DONO)</span></span>
            ) : (
              <>{credits.simple} <span className="text-xs text-slate-400 font-sans font-bold">restantes</span></>
            )}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Para checagens rápidas de suporte, resistência e tendência simples de curto prazo em qualquer timeframe.
          </p>
        </div>
      </div>

      {/* Histórico de Análises Salvas */}
      <div className="p-5 rounded-2xl bg-[#0d1117] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={18} className="text-amber-400" />
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
              Histórico no Dispositivo ({recentAnalyses.length})
            </h4>
          </div>

          <button
            onClick={onResetCredits}
            className="text-xs text-slate-500 hover:text-amber-400 flex items-center gap-1"
          >
            <RefreshCcw size={12} />
            <span>Restaurar Saldo Inicial</span>
          </button>
        </div>

        {recentAnalyses.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            Ainda não realizaste nenhuma análise. As tuas análises geradas ficarão salvas automaticamente aqui.
          </p>
        ) : (
          <div className="space-y-2">
            {recentAnalyses.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-[#161b22] border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-amber-400">
                    {item.asset.symbol}
                  </span>
                  <span className="text-slate-400 font-mono">
                    {item.timeframe}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.direction.includes('COMPRA') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {item.direction}
                  </span>
                </div>
                <span className="text-slate-500 font-mono text-[11px]">
                  {item.angolaDate && !item.timestamp.includes('/') ? `${item.angolaDate} ${item.timestamp}` : item.timestamp}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
