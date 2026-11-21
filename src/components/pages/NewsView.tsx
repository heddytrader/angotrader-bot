'use client';

import React, { useState } from 'react';
import { ECONOMIC_EVENTS } from '../../data/news';
import { EconomicEvent, NewsImpact } from '../../types';
import { 
  Newspaper, 
  Calendar, 
  AlertTriangle, 
  Clock, 
  Filter, 
  ShieldAlert, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Info
} from 'lucide-react';

interface NewsViewProps {
  onNavigateToAnalysisWithAsset?: (symbol: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ onNavigateToAnalysisWithAsset }) => {
  const [selectedDay, setSelectedDay] = useState<'today' | 'tomorrow'>('today');
  const [selectedImpact, setSelectedImpact] = useState<string>('all');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('all');

  const filteredEvents = ECONOMIC_EVENTS.filter((e) => {
    if (e.day !== selectedDay) return false;
    if (selectedImpact === 'Alto' && e.impact !== 'Alto') return false;
    if (selectedImpact === 'Médio' && e.impact !== 'Médio') return false;
    if (selectedImpact === 'Baixo' && e.impact !== 'Baixo') return false;
    if (selectedCurrency !== 'all' && e.currency !== selectedCurrency) return false;
    return true;
  });

  const highImpactCount = ECONOMIC_EVENTS.filter(
    (e) => e.day === selectedDay && e.impact === 'Alto'
  ).length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 pb-20">
      {/* Cabeçalho da Página */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400">
              <Newspaper size={18} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Notícias & Calendário Económico
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fuso Horário Oficial: <strong className="text-amber-400">Hora de Angola (GMT+1 / Luanda)</strong>
          </p>
        </div>

        {/* Badge Informativo de Alto Impacto */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs">
          <AlertTriangle size={15} className="text-red-400 animate-pulse" />
          <span className="text-red-300 font-bold">
            {highImpactCount} Notícias de Alto Impacto {selectedDay === 'today' ? 'Hoje' : 'Amanhã'}
          </span>
        </div>
      </div>

      {/* BANNER DA REGRA DE OURO ANGOTRADER */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/70 via-[#161b22] to-[#0d1117] border-2 border-red-500/50 space-y-2 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-black text-red-400 uppercase tracking-wider">
          <ShieldAlert size={16} className="text-red-400 shrink-0" />
          <span>Regra de Ouro EGGY: Proteção de Capital</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">
          Nos <strong className="text-red-400">60 minutos antes</strong> e <strong className="text-red-400">30 minutos depois</strong> de eventos de <strong className="text-red-400">Alto Impacto (Vermelho)</strong>, as corretoras aumentam os spreads e as baleias institucionais caçam stops de retalho. O robô AngoTrader bloqueia os sinais automaticamente nestes períodos para evitar perdas desnecessárias.
        </p>
      </div>

      {/* SELETOR DE DIA: HOJE vs AMANHÃ */}
      <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-[#0d1117] border border-amber-500/20">
        <button
          onClick={() => setSelectedDay('today')}
          className={`py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
            selectedDay === 'today'
              ? 'bg-amber-500 text-black shadow-lg font-extrabold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calendar size={16} />
          <span>Notícias de Hoje</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedDay === 'today' ? 'bg-black text-amber-400' : 'bg-white/10 text-slate-300'}`}>
            {ECONOMIC_EVENTS.filter(e => e.day === 'today').length}
          </span>
        </button>

        <button
          onClick={() => setSelectedDay('tomorrow')}
          className={`py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
            selectedDay === 'tomorrow'
              ? 'bg-amber-500 text-black shadow-lg font-extrabold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calendar size={16} />
          <span>Notícias de Amanhã</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedDay === 'tomorrow' ? 'bg-black text-amber-400' : 'bg-white/10 text-slate-300'}`}>
            {ECONOMIC_EVENTS.filter(e => e.day === 'tomorrow').length}
          </span>
        </button>
      </div>

      {/* FILTROS RÁPIDOS (IMPACTO E MOEDA) */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
        {/* Filtro de Impacto */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-400 text-[11px] font-semibold mr-1">Impacto:</span>
          <button
            onClick={() => setSelectedImpact('all')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              selectedImpact === 'all'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedImpact('Alto')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all border ${
              selectedImpact === 'Alto'
                ? 'bg-red-600 text-white border-red-500 shadow-md'
                : 'bg-red-950/40 text-red-400 border-red-500/30 hover:bg-red-950/80'
            }`}
          >
            🚨 Alto (Vermelho)
          </button>
          <button
            onClick={() => setSelectedImpact('Médio')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              selectedImpact === 'Médio'
                ? 'bg-amber-500 text-black font-bold'
                : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
            }`}
          >
            Médio
          </button>
          <button
            onClick={() => setSelectedImpact('Baixo')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              selectedImpact === 'Baixo'
                ? 'bg-slate-600 text-white font-bold'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Baixo
          </button>
        </div>

        {/* Filtro de Moeda */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-[11px] font-semibold">Moeda:</span>
          {['all', 'USD', 'EUR', 'GBP', 'OIL'].map((curr) => (
            <button
              key={curr}
              onClick={() => setSelectedCurrency(curr)}
              className={`px-2 py-1 rounded-md font-mono text-[11px] font-bold transition-all ${
                selectedCurrency === curr
                  ? 'bg-amber-500 text-black'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {curr === 'all' ? 'Todas' : curr}
            </button>
          ))}
        </div>
      </div>

      {/* TABELA / LISTA DE NOTÍCIAS RESPONSIVA */}
      <div className="space-y-2.5">
        {filteredEvents.map((event) => {
          const isHigh = event.impact === 'Alto';
          const isMedium = event.impact === 'Médio';

          return (
            <div
              key={event.id}
              className={`rounded-2xl p-4 transition-all border ${
                isHigh
                  ? 'bg-gradient-to-r from-red-950/40 via-[#161b22] to-[#0d1117] border-red-500/60 shadow-lg shadow-red-950/30 hover:border-red-400'
                  : isMedium
                  ? 'bg-[#161b22] border-amber-500/30 hover:border-amber-500/50'
                  : 'bg-[#0d1117] border-white/5'
              }`}
            >
              {/* Linha Principal com Colunas */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* 1. Hora Angola & Moeda */}
                <div className="flex items-center gap-3">
                  <div className={`px-2.5 py-1.5 rounded-xl font-mono text-xs font-black flex items-center gap-1.5 ${
                    isHigh
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-[#0a0d14] text-amber-400 border border-amber-500/30'
                  }`}>
                    <Clock size={13} />
                    <span>{event.timeAngola}</span>
                    <span className="text-[9px] opacity-80">WAT</span>
                  </div>

                  <div className="w-10 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center font-mono font-black text-xs text-white">
                    {event.currency}
                  </div>

                  {/* 2. Título da Notícia */}
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                      {event.title}
                      {isHigh && (
                        <span className="text-red-400 animate-pulse text-xs">⚠️</span>
                      )}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Afeta: {event.affectedAssets.slice(0, 4).join(', ')}
                    </span>
                  </div>
                </div>

                {/* 3. Impacto, Previsão e Anterior */}
                <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  {/* Badge de Impacto */}
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block sm:hidden">
                      Impacto
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider inline-flex items-center gap-1 border ${
                      isHigh
                        ? 'bg-red-600 text-white border-red-400 shadow-md animate-pulse'
                        : isMedium
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-slate-700/40 text-slate-400 border-slate-600'
                    }`}>
                      {isHigh && <AlertTriangle size={12} />}
                      {event.impact}
                    </span>
                  </div>

                  {/* Previsão */}
                  <div className="text-center sm:text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                      Previsão
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-white">
                      {event.forecast}
                    </span>
                  </div>

                  {/* Anterior */}
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                      Anterior
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-slate-300">
                      {event.previous}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dica de Impacto Fundamentalista */}
              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                  <span className="text-amber-400 font-bold">💡 Análise Rápida:</span>
                  <span>{event.fundamentalTip}</span>
                </div>

                {onNavigateToAnalysisWithAsset && event.affectedAssets[0] && (
                  <button
                    onClick={() => onNavigateToAnalysisWithAsset(event.affectedAssets[0])}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 hover:underline ml-auto"
                  >
                    <span>Analisar {event.affectedAssets[0]}</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="p-8 rounded-2xl bg-[#0d1117] border border-white/5 text-center text-slate-400 text-xs">
            Nenhuma notícia encontrada para os filtros selecionados.
          </div>
        )}
      </div>
    </div>
  );
};
