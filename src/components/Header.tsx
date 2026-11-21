'use client';

import React, { useState, useEffect } from 'react';
import { UserCredits } from '../types';
import { Sparkles, Coins, Plus, ShieldCheck, Flame } from 'lucide-react';

interface HeaderProps {
  credits: UserCredits;
  onOpenCreditModal: () => void;
  onNavigate: (page: string) => void;
  isOwner?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ credits, onOpenCreditModal, onNavigate, isOwner = false }) => {
  const [luandaTime, setLuandaTime] = useState('');
  const [activeSession, setActiveSession] = useState('Londres');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      // Horário Luanda (UTC+1)
      const hours = now.getUTCHours() + 1;
      const formattedHours = (hours % 24).toString().padStart(2, '0');
      const formattedMins = now.getUTCMinutes().toString().padStart(2, '0');
      setLuandaTime(`${formattedHours}:${formattedMins}`);

      // Sessão ativa baseada no horário UTC
      const utcHour = now.getUTCHours();
      if (utcHour >= 0 && utcHour < 8) {
        setActiveSession('Ásia (Tóquio)');
      } else if (utcHour >= 8 && utcHour < 13) {
        setActiveSession('Londres');
      } else if (utcHour >= 13 && utcHour < 17) {
        setActiveSession('Londres / Nova Iorque');
      } else if (utcHour >= 17 && utcHour < 22) {
        setActiveSession('Nova Iorque');
      } else {
        setActiveSession('Ásia (Sydney)');
      }
    };

    updateTimes();
    const interval = setInterval(updateTimes, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0a0d14]/95 backdrop-blur-md border-b border-amber-500/20 px-4 py-2.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand & Slogan */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center font-black text-black text-xl shadow-lg shadow-amber-500/20 border border-amber-300">
              AT
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-600 border-2 border-black flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping"></span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors">
                AngoTrader <span className="text-amber-400">Bot</span>
              </h1>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-600/20 text-red-400 border border-red-500/30 uppercase">
                AO PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium line-clamp-1">
              &quot;Analisa como os grandes. Opera como angolano.&quot;
            </p>
          </div>
        </div>

        {/* Status de Sessão & Saldo de Créditos */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Relógio de Luanda & Sessão (Desktop e Mobile Pequeno) */}
          <div className="hidden md:flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Luanda {luandaTime}</span>
            </div>
            <div className="text-[10px] text-amber-400 font-medium">
              {activeSession}
            </div>
          </div>

          {/* Saldo de Créditos / Status Dono */}
          {isOwner ? (
            <div 
              onClick={onOpenCreditModal}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500/25 via-yellow-400/20 to-amber-500/25 hover:from-amber-500/35 hover:to-amber-500/35 border-2 border-amber-400 rounded-xl px-3 py-1.5 cursor-pointer transition-all shadow-lg shadow-amber-500/20 group"
              title="Conta Dono - Plano Infinito Ativo"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-sm">👑</span>
                <div className="text-left leading-none">
                  <div className="text-[8px] uppercase tracking-wider text-amber-300 font-extrabold flex items-center gap-1">
                    <span>Acesso Total</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-black text-white tracking-tight whitespace-nowrap mt-0.5">
                    DONO - ∞ PRO / ∞ Simples
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              onClick={onOpenCreditModal}
              className="flex items-center gap-1.5 bg-[#161b26] hover:bg-[#1f2636] border border-amber-500/30 rounded-xl px-2.5 py-1.5 cursor-pointer transition-all shadow-sm group"
            >
              <div className="flex items-center gap-1">
                <Sparkles size={14} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                <div className="text-left leading-none">
                  <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                    Créditos
                  </div>
                  <div className="text-xs font-mono font-extrabold text-amber-300">
                    {credits.pro} <span className="text-[10px] text-slate-400">PRO</span> | {credits.simple} <span className="text-[10px] text-slate-400">SIMP</span>
                  </div>
                </div>
              </div>
              <div className="w-5 h-5 rounded-md bg-amber-500 text-black flex items-center justify-center font-bold text-xs ml-1 hover:bg-amber-400">
                <Plus size={13} strokeWidth={3} />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
