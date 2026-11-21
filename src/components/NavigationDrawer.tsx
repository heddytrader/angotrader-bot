'use client';

import React from 'react';
import { 
  X, 
  LayoutDashboard, 
  Bot, 
  Radio, 
  Crown, 
  Activity, 
  Grid, 
  GraduationCap, 
  Users, 
  User, 
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Newspaper
} from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  proCredits: number;
  isOwner?: boolean;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  proCredits,
  isOwner = false,
}) => {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'dashboard', label: '1. Dashboard', desc: 'Resumo, saldo e últimas análises', icon: LayoutDashboard },
    { id: 'nova-analise', label: '2. Nova Análise', desc: 'Motor EGGY SMC com todos os ativos', icon: Bot, highlight: true },
    { id: 'signals', label: '3. Sinais IA', desc: 'Sinais abertos e histórico de trades', icon: Radio },
    { id: 'premium', label: '4. Sinais Premium', desc: 'Setups VIP de alta confluência institucional', icon: Crown, badge: 'VIP' },
    { id: 'live', label: '5. Live Trading 24/7', desc: 'Cotações em tempo real e radar de mercado', icon: Activity },
    { id: 'heatmap', label: '6. Heatmap', desc: 'Mapa de calor dos mercados globais', icon: Grid },
    { id: 'academy', label: '7. Academy', desc: 'Aulas: Lógica EGGY, SMC & Gestão de Risco', icon: GraduationCap },
    { id: 'community', label: '8. Comunidade', desc: 'Feed de resultados de traders angolanos', icon: Users },
    { id: 'profile', label: '9. Perfil / Créditos', desc: 'Gestão de conta, recargas e histórico', icon: User },
    { id: 'news', label: '10. Notícias & Calendário', desc: 'Calendário económico de alto impacto (GMT+1)', icon: Newspaper, badge: 'NOVO' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-xs sm:max-w-sm h-full bg-[#0d1117] border-l border-amber-500/20 shadow-2xl flex flex-col p-4 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center font-black text-sm">
              AT
            </div>
            <div>
              <div className="font-extrabold text-sm text-white">AngoTrader Bot</div>
              <div className="text-[10px] text-slate-400">Navegação Completa</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Items List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-amber-500 text-black font-bold shadow-md'
                    : item.highlight
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-black/20 text-black' : 'bg-white/5 text-amber-400'}`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold flex items-center gap-2">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold ${isActive ? 'bg-black text-amber-400' : 'bg-red-600 text-white'}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className={`text-[11px] truncate ${isActive ? 'text-black/75' : 'text-slate-400'}`}>
                      {item.desc}
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} className={`shrink-0 ${isActive ? 'text-black' : 'text-slate-500'}`} />
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
          <span>{isOwner ? '👑 Conta Dono' : 'Versão 2.4 Pro'}</span>
          <span className="text-amber-400 font-semibold flex items-center gap-1">
            <Sparkles size={12} /> {isOwner ? '∞ PRO' : `${proCredits} Créditos PRO`}
          </span>
        </div>
      </div>
    </div>
  );
};
