'use client';

import React, { useState, useEffect } from 'react';
import { AnalysisResult } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  MinusCircle, 
  ShieldCheck, 
  Target, 
  AlertTriangle, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Compass,
  Share2,
  Bookmark,
  Newspaper
} from 'lucide-react';

interface AnalysisResultCardProps {
  analysis: AnalysisResult;
  onSaveToWatchlist?: (analysis: AnalysisResult) => void;
}

export const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({
  analysis,
  onSaveToWatchlist
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setIsSaved(false);
    setShowConfirmation(false);
  }, [analysis.id]);

  const handleSave = () => {
    if (onSaveToWatchlist) {
      onSaveToWatchlist(analysis);
    }
    setIsSaved(true);
    setShowConfirmation(true);
  };

  const isBuy = analysis.direction.includes('COMPRA');
  const isSell = analysis.direction.includes('VENDA');
  const isStrong = analysis.direction.includes('FORTE');
  const isNeutral = analysis.direction === 'NEUTRO';

  // Garante exibição formatada de data + hora (ex: 20/11/2026 14:30)
  const displayDateTime = 
    analysis.timestamp && analysis.timestamp.includes('/')
      ? analysis.timestamp
      : analysis.angolaDate
      ? `${analysis.angolaDate} ${analysis.angolaTime || analysis.timestamp}`
      : analysis.timestamp;

  // Cores dinâmicas de direção
  const getBadgeStyle = () => {
    if (analysis.direction === 'COMPRA FORTE') {
      return 'bg-emerald-500 text-black border-emerald-400 font-black shadow-lg shadow-emerald-500/30';
    }
    if (analysis.direction === 'COMPRA') {
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 font-bold';
    }
    if (analysis.direction === 'VENDA') {
      return 'bg-rose-500/20 text-rose-400 border-rose-500/50 font-bold';
    }
    if (analysis.direction === 'VENDA FRACA') {
      return 'bg-amber-500/20 text-amber-400 border-amber-500/50 font-bold';
    }
    return 'bg-slate-700/50 text-slate-300 border-slate-600 font-bold';
  };

  return (
    <div className="w-full bg-[#0d1117] border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 animate-in fade-in duration-300">
      {/* Header do Cartão */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#161b22] border border-amber-500/30 flex items-center justify-center font-extrabold text-amber-400 text-sm">
            {analysis.asset.symbol.slice(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-lg text-white">
                {analysis.asset.symbol}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono">
                {analysis.timeframe}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold">
                {analysis.analysisType}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {analysis.asset.name} • {analysis.asset.sessions}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block font-mono">
            {displayDateTime}
          </span>
          <span className="text-xs font-mono font-bold text-amber-300">
            ${analysis.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* ⚠️ AVISO GRANDE DE BLOQUEIO POR NOTÍCIA DE ALTO IMPACTO */}
      {analysis.newsFilter?.isBlocked && (
        <div className="p-4 rounded-xl bg-red-950/80 border-2 border-red-500 text-white space-y-2 animate-in fade-in duration-300 shadow-xl shadow-red-950/50">
          <div className="flex items-start gap-2.5">
            <AlertTriangle size={24} className="text-red-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <div className="text-xs uppercase tracking-wider font-extrabold text-red-400">
                Alerta de Proteção de Capital EGGY
              </div>
              <div className="font-black text-sm sm:text-base text-white mt-0.5">
                {analysis.newsFilter.warningMessage || `⚠️ ATENÇÃO: Notícia de Alto Impacto ativa. Espera a notícia passar. Sinal bloqueado por segurança.`}
              </div>
            </div>
          </div>
          <p className="text-xs text-red-200/90 leading-relaxed font-medium pl-8">
            Regra EGGY: Proibido entrar 60 minutos antes e 30 minutos depois de notícias de Alto Impacto (Vermelho). O mercado institucional gera caça aos stops. Aguarda a notícia passar!
          </p>
        </div>
      )}

      {/* VEREDICTO PRINCIPAL: DIREÇÃO & FORÇA */}
      <div className="p-3.5 rounded-xl bg-[#161b22] border border-white/5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isBuy ? 'bg-emerald-500/20 text-emerald-400' : isSell ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-700/30 text-slate-400'}`}>
            {isBuy ? <TrendingUp size={24} /> : isSell ? <TrendingDown size={24} /> : <MinusCircle size={24} />}
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Decisão da IA AngoTrader
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`px-2.5 py-1 rounded-lg text-xs uppercase tracking-wider border ${getBadgeStyle()}`}>
                {analysis.direction}
              </span>
              <span className="text-xs text-slate-400">
                Confiança: <strong className="text-white">{analysis.confidence}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Barra de Força do Sinal */}
        <div className="w-full sm:w-44">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 font-medium">Força do Sinal</span>
            <span className="font-mono font-extrabold text-amber-400">
              {analysis.signalStrength}%
            </span>
          </div>
          <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                analysis.signalStrength > 70
                  ? 'bg-gradient-to-r from-emerald-500 to-amber-400'
                  : analysis.signalStrength > 50
                  ? 'bg-amber-400'
                  : 'bg-slate-500'
              }`}
              style={{ width: `${analysis.signalStrength}%` }}
            />
          </div>
        </div>
      </div>

      {/* NÍVEIS DE OPERAÇÃO: ENTRADA, STOP LOSS, TP1 E TP2 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        {/* Entrada */}
        <div className="p-2.5 rounded-xl bg-[#161b22] border border-white/5">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
            Preço de Entrada
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-white mt-0.5 block">
            {analysis.entryPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[9px] text-amber-400 font-mono">Ordem Limite</span>
        </div>

        {/* Stop Loss */}
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
          <span className="text-[10px] text-rose-300 uppercase tracking-wider font-semibold block flex items-center justify-center gap-1">
            <AlertTriangle size={10} /> Stop Loss
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-rose-400 mt-0.5 block">
            {analysis.stopLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[9px] text-rose-300/70 font-mono">Protegido abaixo de OB</span>
        </div>

        {/* Take Profit 1 */}
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold block flex items-center justify-center gap-1">
            <Target size={10} /> Alvo TP 1 (1.5R)
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400 mt-0.5 block">
            {analysis.takeProfit1.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[9px] text-emerald-300/70 font-mono">Fechar 50% & BE</span>
        </div>

        {/* Take Profit 2 */}
        <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40">
          <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold block flex items-center justify-center gap-1">
            <Sparkles size={10} /> Alvo TP 2 (Final)
          </span>
          <span className="text-xs sm:text-sm font-mono font-bold text-emerald-300 mt-0.5 block">
            {analysis.takeProfit2.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[9px] text-amber-400 font-mono font-bold">R:R {analysis.riskReward}</span>
        </div>
      </div>

      {/* EXPLICAÇÃO TÉCNICA E CONTEXTO EM PORTUGUÊS SIMPLES */}
      <div className="p-3.5 rounded-xl bg-[#161b22]/70 border border-white/5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
          <ShieldCheck size={14} />
          <span>Leitura Institucional & Disciplina EGGY</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          {analysis.explanation}
        </p>
      </div>

      {/* 📰 SECÇÃO DE ANÁLISE FUNDAMENTALISTA */}
      {analysis.fundamentalAnalysis && (
        <div className="p-3.5 rounded-xl bg-[#161b22] border border-amber-500/30 space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400">
              <Newspaper size={16} />
              <span>📰 Análise Fundamentalista:</span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
              analysis.fundamentalAnalysis.sentiment === 'Positivo'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : analysis.fundamentalAnalysis.sentiment === 'Negativo'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-slate-700/50 text-slate-300 border border-slate-600'
            }`}>
              Sentimento: {analysis.fundamentalAnalysis.sentiment}
            </span>
          </div>

          <div className="text-xs font-bold text-white">
            {analysis.fundamentalAnalysis.headline}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {analysis.fundamentalAnalysis.summary}
          </p>

          <div className="text-[11px] font-mono font-medium text-amber-300/95 bg-black/60 p-2.5 rounded-lg border border-amber-500/20 flex items-start gap-2">
            <span className="shrink-0 text-amber-400 font-bold">💡 Regra:</span>
            <span>{analysis.fundamentalAnalysis.impactRule}</span>
          </div>
        </div>
      )}

      {/* CHECKLIST DE CONFLUÊNCIAS EGGY SMC */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Checklist de Confluências Institucionais:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {analysis.confluences.map((conf) => (
            <div
              key={conf.name}
              className="p-2 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2
                  size={13}
                  className={
                    conf.status === 'bullish'
                      ? 'text-emerald-400'
                      : conf.status === 'bearish'
                      ? 'text-rose-400'
                      : 'text-slate-500'
                  }
                />
                <span className="text-slate-200 font-medium text-[11px]">{conf.name}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{conf.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BADGES DOS INDICADORES USADOS */}
      <div className="pt-2 border-t border-white/5 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-slate-500 font-semibold mr-1">Filtros:</span>
          {analysis.indicators.slice(0, 5).map((ind) => (
            <span
              key={ind}
              className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10"
            >
              {ind}
            </span>
          ))}
        </div>

        {onSaveToWatchlist && (
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaved}
            className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              isSaved
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default shadow-sm'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 active:scale-95 cursor-pointer'
            }`}
          >
            {isSaved ? (
              <span>✅ Salvo</span>
            ) : (
              <>
                <Bookmark size={13} />
                <span>Salvar Análise</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* MENSAGEM DE CONFIRMAÇÃO AO SALVAR */}
      {showConfirmation && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between gap-2 animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span className="font-semibold">
              Análise salva com sucesso no histórico!
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowConfirmation(false)}
            className="text-emerald-400 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded hover:bg-emerald-500/20 transition-colors"
            title="Fechar"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
