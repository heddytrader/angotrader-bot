'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Radio, 
  Flame, 
  Menu,
  GraduationCap,
  Users,
  User,
  Activity
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenMoreMenu: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenMoreMenu
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#0a0d14]/95 backdrop-blur-lg border-t border-amber-500/20 px-2 py-1.5 sm:py-2">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {/* Dashboard */}
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`flex flex-col items-center justify-center p-1.5 transition-all ${
            activeTab === 'dashboard'
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="text-[10px] mt-1">Painel</span>
        </button>

        {/* Sinais IA */}
        <button
          onClick={() => onSelectTab('signals')}
          className={`flex flex-col items-center justify-center p-1.5 transition-all ${
            activeTab === 'signals'
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio size={20} />
          <span className="text-[10px] mt-1">Sinais IA</span>
        </button>

        {/* NOVA ANÁLISE - BOTÃO CENTRAL PROMINENTE */}
        <button
          onClick={() => onSelectTab('nova-analise')}
          className="flex flex-col items-center justify-center -mt-5 group"
        >
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/30 group-active:scale-95 transition-transform">
            <div className="w-full h-full bg-[#0d1117] group-hover:bg-[#161b26] rounded-[14px] flex items-center justify-center">
              <Bot size={24} className="text-amber-400 group-hover:text-amber-300" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-400 mt-1">Análise IA</span>
        </button>

        {/* Live Trading */}
        <button
          onClick={() => onSelectTab('live')}
          className={`flex flex-col items-center justify-center p-1.5 transition-all ${
            activeTab === 'live'
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity size={20} />
          <span className="text-[10px] mt-1">Ao Vivo</span>
        </button>

        {/* Menu Geral (Todas as 10 páginas) */}
        <button
          onClick={onOpenMoreMenu}
          className={`flex flex-col items-center justify-center p-1.5 transition-all ${
            ['premium', 'heatmap', 'academy', 'community', 'profile', 'news'].includes(activeTab)
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Menu size={20} />
          <span className="text-[10px] mt-1">Mais</span>
        </button>
      </div>
    </nav>
  );
};
