'use client';

import React from 'react';
import { UserCredits, AnalysisResult } from '../../types';
import { ALL_ASSETS } from '../../data/assets';
import { LiveCandlestickChart } from '../LiveCandlestickChart';
import { 
  Bot, 
  Sparkles, 
  Radio, 
  Flame, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  GraduationCap,
  Activity,
  Zap,
  Target,
  AlertTriangle,
  Newspaper
} from 'lucide-react';

interface DashboardViewProps {
  credits: UserCredits;
  isOwner?: boolean;
  onNavigate: (tab: string) => void;
  onOpenCreditModal: () => void;
  recentAnalyses: AnalysisResult[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  credits,
  onNavigate,
  onOpenCreditModal,
  recentAnalyses,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      {/* 🚨 ALERTA NO DASHBOARD: NOTÍCIA DE ALTO IMPACTO HOJE */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/90 via-[#161b22] to-black border-2 border-red-500/70 p-4 sm:p-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/30 border border-red-500/60 flex items-center justify-center shrink-0 text-red-400 animate-pulse">
              <AlertTriangle size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-red-600 text-white font-black animate-pulse">
                  ALTO IMPACTO HOJE
                </span>
                <span className="text-xs text-amber-400 font-mono font-bold">
                  Horário Angola (GMT+1)
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-white mt-1">
                Hoje 14:30 - NFP EUA - Impacto Alto - Evita operar OURO e EURUSD
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Volatilidade extrema e caça de liquidez institucional. O motor EGGY bloqueia os sinais por segurança.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('news')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:brightness-110 text-white font-extrabold text-xs transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30"
          >
            <Newspaper size={14} />
            <span>Ver Calendário Completo</span>
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Banner de Boas-Vindas Estilo AngoTrader */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#161b26] via-[#0d1117] to-black border border-amber-500/30 p-5 sm:p-7 shadow-2xl">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sessões Ativas • Mercado a Negociar</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Olá, Trader Angolano! 👋
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
            &quot;Analisa como os grandes. Opera como angolano.&quot; O teu robô com IA institucional e estratégia EGGY está pronto.
          </p>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('nova-analise')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-sm shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Bot size={18} />
              <span>Fazer Nova Análise IA</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate('live')}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/10 transition-colors flex items-center gap-2"
            >
              <Activity size={18} className="text-emerald-400" />
              <span>Ver Cotações Ao Vivo</span>
            </button>
          </div>
        </div>

        {/* Efeito decorativo dourado de fundo */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Cartões Rápidos de Resumo e Saldo */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Saldo PRO */}
        <div 
          onClick={onOpenCreditModal}
          className="p-4 rounded-xl bg-[#0d1117] border border-amber-500/20 hover:border-amber-500/40 cursor-pointer transition-all shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Créditos PRO</span>
            <Sparkles size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono mt-1">
            {credits.pro}
          </div>
          <span className="text-[10px] text-amber-400 font-semibold mt-1 block">
            + Recarregar
          </span>
        </div>

        {/* Saldo Simples */}
        <div 
          onClick={onOpenCreditModal}
          className="p-4 rounded-xl bg-[#0d1117] border border-white/5 hover:border-amber-500/30 cursor-pointer transition-all shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Créditos Simples</span>
            <Zap size={16} className="text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-200 font-mono mt-1">
            {credits.simple}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Análises Rápidas
          </span>
        </div>

        {/* Ativos Cobertos */}
        <div 
          onClick={() => onNavigate('nova-analise')}
          className="p-4 rounded-xl bg-[#0d1117] border border-white/5 hover:border-amber-500/30 cursor-pointer transition-all shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Ativos Cobertos</span>
            <Target size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono mt-1">
            {ALL_ASSETS.length}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
            Forex, Cripto & Mais
          </span>
        </div>

        {/* Precisão Média EGGY */}
        <div className="p-4 rounded-xl bg-[#0d1117] border border-white/5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Filtro de Risco</span>
            <ShieldCheck size={16} className="text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono mt-1">
            1:2.8R
          </div>
          <span className="text-[10px] text-sky-400 font-semibold mt-1 block">
            Risco/Retorno Mínimo
          </span>
        </div>
      </div>

      {/* RADAR DE MERCADO: GRÁFICO AO VIVO NO DASHBOARD */}
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
              Radar de Mercado Ao Vivo (Ouro • XAUUSD)
            </h3>
          </div>
          <button
            onClick={() => onNavigate('live')}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 hover:underline"
          >
            <span>Ver Todos os Gráficos na aba Ao Vivo</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <LiveCandlestickChart
          asset={ALL_ASSETS.find(a => a.symbol === 'XAUUSD') || ALL_ASSETS[0]}
          height={280}
          initialTimeframe="15m"
        />
      </div>

      {/* Acesso Rápido às 9 Páginas */}
      <div>
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">
          Atalhos da Plataforma
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => onNavigate('signals')}
            className="p-3 rounded-xl bg-[#161b22] border border-white/5 hover:border-amber-500/30 text-left transition-all group"
          >
            <Radio size={20} className="text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Sinais IA</div>
            <div className="text-[10px] text-slate-400">Feed de sinais abertos</div>
          </button>

          <button
            onClick={() => onNavigate('premium')}
            className="p-3 rounded-xl bg-[#161b22] border border-amber-500/30 hover:border-amber-400 text-left transition-all group"
          >
            <Sparkles size={20} className="text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-amber-300">Sinais Premium</div>
            <div className="text-[10px] text-slate-400">Setups VIP institucionais</div>
          </button>

          <button
            onClick={() => onNavigate('heatmap')}
            className="p-3 rounded-xl bg-[#161b22] border border-white/5 hover:border-amber-500/30 text-left transition-all group"
          >
            <Flame size={20} className="text-red-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Heatmap</div>
            <div className="text-[10px] text-slate-400">Mapa de calor do mercado</div>
          </button>

          <button
            onClick={() => onNavigate('academy')}
            className="p-3 rounded-xl bg-[#161b22] border border-white/5 hover:border-amber-500/30 text-left transition-all group"
          >
            <GraduationCap size={20} className="text-sky-400 mb-1.5 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Academy</div>
            <div className="text-[10px] text-slate-400">Aulas da estratégia EGGY</div>
          </button>
        </div>
      </div>

      {/* Destaque das Últimas Análises Salvas */}
      {recentAnalyses.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Últimas Análises Realizadas
            </h3>
            <button
              onClick={() => onNavigate('signals')}
              className="text-xs text-amber-400 hover:underline font-semibold"
            >
              Ver todas
            </button>
          </div>

          <div className="space-y-2">
            {recentAnalyses.slice(0, 2).map((a) => (
              <div
                key={a.id}
                onClick={() => onNavigate('nova-analise')}
                className="p-3 rounded-xl bg-[#0d1117] border border-white/5 hover:border-amber-500/30 cursor-pointer flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-xs">
                    {a.asset.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-sm">
                        {a.asset.symbol}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        a.direction.includes('COMPRA') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {a.direction}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Entrada: {a.entryPrice} • Alvo: {a.takeProfit2}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {a.signalStrength}%
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    {a.angolaDate && !a.timestamp.includes('/') ? `${a.angolaDate} ${a.timestamp}` : a.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
