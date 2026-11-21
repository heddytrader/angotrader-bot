'use client';

import React, { useState } from 'react';
import { Asset, AssetType, Timeframe, AnalysisType, AnalysisResult, UserCredits } from '../../types';
import { ALL_ASSETS, ASSET_TYPES } from '../../data/assets';
import { generateEggyAnalysis } from '../../lib/eggyEngine';
import { checkHighImpactNewsForAsset } from '../../data/news';
import { AssetSearchModal } from '../AssetSearchModal';
import { AnalysisStepModal } from '../AnalysisStepModal';
import { AnalysisResultCard } from '../AnalysisResultCard';
import { LiveCandlestickChart } from '../LiveCandlestickChart';
import { 
  Bot, 
  Search, 
  Clock, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  ChevronDown, 
  AlertCircle,
  AlertTriangle,
  Coins,
  History
} from 'lucide-react';

interface AnalysisViewProps {
  credits: UserCredits;
  isOwner?: boolean;
  onDeductCredit: (isPro: boolean) => boolean;
  onOpenCreditModal: () => void;
  onSaveAnalysis: (result: AnalysisResult) => void;
  recentAnalyses: AnalysisResult[];
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({
  credits,
  onDeductCredit,
  onOpenCreditModal,
  onSaveAnalysis,
  recentAnalyses,
}) => {
  // Estado de Seleção
  const [selectedType, setSelectedType] = useState<AssetType>('forex');
  const [selectedAsset, setSelectedAsset] = useState<Asset>(ALL_ASSETS[0]); // EURUSD default
  const [timeframe, setTimeframe] = useState<Timeframe>('15m');
  const [analysisType, setAnalysisType] = useState<AnalysisType>('SMC (Smart Money)');
  const [useProCredit, setUseProCredit] = useState(true);

  // Modais
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [latestResult, setLatestResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [simulateNewsTime, setSimulateNewsTime] = useState<string | null>(null);

  // Timeframes disponíveis
  const timeframes: Timeframe[] = ['1m', '5m', '15m', '1h', '4h', '1D'];

  // Tipos de análise
  const analysisTypes: AnalysisType[] = [
    'SMC (Smart Money)',
    'Técnica',
    'Fundamentalista'
  ];

  // Trocar categoria de ativo
  const handleTypeChange = (type: AssetType) => {
    setSelectedType(type);
    // Selecionar o primeiro ativo dessa categoria
    const firstOfCategory = ALL_ASSETS.find((a) => a.type === type);
    if (firstOfCategory) {
      setSelectedAsset(firstOfCategory);
    }
  };

  // Executar análise IA
  const handleStartAnalysis = () => {
    setErrorMessage(null);

    // Verificar créditos
    const hasSufficient = useProCredit ? credits.pro > 0 : credits.simple > 0;
    if (!hasSufficient) {
      setErrorMessage(
        `Saldo insuficiente de créditos ${useProCredit ? 'PRO' : 'Simples'}. Por favor recarrega para continuar.`
      );
      onOpenCreditModal();
      return;
    }

    // Deduzir crédito
    const deducted = onDeductCredit(useProCredit);
    if (!deducted) {
      setErrorMessage('Erro ao descontar crédito. Verifica o teu saldo.');
      return;
    }

    // Iniciar animação do motor
    setIsAnalyzing(true);
  };

  // Concluir passos da análise
  const handleAnalysisComplete = () => {
    const result = generateEggyAnalysis(
      selectedAsset, 
      timeframe, 
      analysisType, 
      undefined, 
      simulateNewsTime || undefined
    );
    setLatestResult(result);
    onSaveAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      {/* Cabeçalho da Página */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Nova Análise IA
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Motor EGGY SMC: Varredura de liquidez, Order Blocks e probabilidade real.
          </p>
        </div>

        {/* Botão de Pesquisa Rápida Global */}
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-semibold transition-all shadow-sm active:scale-95"
        >
          <Search size={15} />
          <span className="hidden sm:inline">Pesquisar Todos os Ativos</span>
          <span className="sm:hidden">Pesquisar</span>
        </button>
      </div>

      {/* PAINEL DE CONFIGURAÇÃO DA ANÁLISE */}
      <div className="bg-[#0d1117] border border-amber-500/25 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-5">
        {/* 1. SELETOR DE TIPO DE ATIVO */}
        <div>
          <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>1. Tipo de Ativo</span>
            <span className="text-[11px] text-amber-400 font-normal">
              5 Categorias • {ALL_ASSETS.length} Ativos
            </span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {ASSET_TYPES.map((cat) => {
              const isSelected = selectedType === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleTypeChange(cat.id)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-black font-extrabold border-amber-400 shadow-md scale-[1.02]'
                      : 'bg-[#161b22] text-slate-300 border-white/5 hover:border-amber-500/30 hover:bg-[#1a202c]'
                  }`}
                >
                  <span className="text-xl mb-1">{cat.icon}</span>
                  <span className="text-xs font-bold">{cat.label}</span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-black/80 font-mono font-bold' : 'text-slate-400'}`}>
                    {cat.count} ativos
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. CAMPO ATIVO COM BOTÃO DE BUSCA & BARRA */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
              2. Ativo Selecionado (Clica para pesquisar)
            </label>
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <Search size={12} />
              <span>Ver todos os {ALL_ASSETS.filter(a => a.type === selectedType).length} desta lista</span>
            </button>
          </div>

          {/* Ativo Selecionado em Destaque Interativo */}
          <div
            onClick={() => setIsSearchModalOpen(true)}
            className="p-3.5 sm:p-4 rounded-xl bg-[#161b22] border-2 border-amber-500/40 hover:border-amber-400 cursor-pointer transition-all flex items-center justify-between group shadow-sm active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-black flex items-center justify-center font-black text-base shadow-md group-hover:scale-105 transition-transform shrink-0">
                {selectedAsset.symbol.slice(0, 3)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {selectedAsset.symbol}
                  </span>
                  {selectedAsset.tag && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-200 font-mono">
                      {selectedAsset.tag}
                    </span>
                  )}
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 uppercase font-bold tracking-wider">
                    {selectedAsset.type}
                  </span>
                </div>
                <div className="text-xs text-slate-300 truncate mt-0.5 font-medium">
                  {selectedAsset.name}
                </div>

                {/* SESSÃO DO ATIVO DESTACADA */}
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mt-1">
                  <Clock size={12} className="shrink-0" />
                  <span className="truncate">{selectedAsset.sessions}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 pl-2">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-mono font-bold text-white">
                  {selectedAsset.type === 'crypto' && '$'}
                  {selectedAsset.basePrice.toLocaleString('en-US', {
                    minimumFractionDigits: selectedAsset.decimals <= 2 ? 2 : selectedAsset.decimals,
                  })}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {selectedAsset.unit || 'Preço Base'}
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1 group-hover:bg-amber-500 group-hover:text-black transition-all">
                <span>Trocar</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* GRÁFICO AO VIVO PRELIMINAR ANTES DE GERAR RESULTADO */}
          {!latestResult && (
            <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Gráfico de Velas ao Vivo ({selectedAsset.symbol}):
                </span>
                <span className="text-[11px] text-amber-400 font-mono">
                  Tempo Real • 1s
                </span>
              </div>
              <LiveCandlestickChart
                asset={selectedAsset}
                initialTimeframe={timeframe === '1m' || timeframe === '5m' || timeframe === '15m' ? timeframe : '15m'}
                height={280}
              />
            </div>
          )}
        </div>

        {/* 3. TIMEFRAME & TIPO DE ANÁLISE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Timeframe */}
          <div>
            <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2 block">
              3. Timeframe Gráfico
            </label>
            <div className="grid grid-cols-6 gap-1.5">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`py-2 rounded-lg font-mono text-xs font-bold transition-all border ${
                    timeframe === tf
                      ? 'bg-amber-500 text-black border-amber-400 shadow-sm'
                      : 'bg-[#161b22] text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de Análise */}
          <div>
            <label className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2 block">
              4. Modalidade de Análise
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {analysisTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setAnalysisType(t)}
                  className={`py-2 px-1 text-[11px] rounded-lg font-bold transition-all truncate border ${
                    analysisType === t
                      ? 'bg-amber-500 text-black border-amber-400 shadow-sm'
                      : 'bg-[#161b22] text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  {t.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TIPO DE CRÉDITO A GASTAR */}
        <div className="p-3 rounded-xl bg-[#161b22] border border-white/5 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Coins size={16} className="text-amber-400" />
            <span className="text-slate-300 font-medium">Gastar para esta análise:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setUseProCredit(true)}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  useProCredit
                    ? 'bg-amber-500 text-black shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                1 PRO ({credits.pro})
              </button>
              <button
                onClick={() => setUseProCredit(false)}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  !useProCredit
                    ? 'bg-amber-500 text-black shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                1 Simples ({credits.simple})
              </button>
            </div>
          </div>

          <button
            onClick={onOpenCreditModal}
            className="text-amber-400 hover:underline font-bold text-[11px]"
          >
            Recarregar Créditos
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-600/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ALERTA DE NOTÍCIA ATIVA PARA O ATIVO SELECIONADO */}
        {(() => {
          const activeNews = checkHighImpactNewsForAsset(selectedAsset, simulateNewsTime || undefined);
          if (activeNews.isBlocked) {
            return (
              <div className="p-3.5 rounded-xl bg-red-950/80 border-2 border-red-500 text-red-200 text-xs space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 font-black text-red-400">
                  <AlertTriangle size={17} className="animate-pulse shrink-0" />
                  <span>FILTRO DE NOTÍCIAS DE ALTO IMPACTO ATIVO</span>
                </div>
                <p className="font-bold text-white">
                  {activeNews.warningMessage}
                </p>
                <p className="text-[11px] text-red-300/80">
                  O motor EGGY rebaixará automaticamente a direção para <strong>NEUTRO / ESPERAR</strong> por proteção de capital.
                </p>
              </div>
            );
          }
          return null;
        })()}

        {/* SIMULADOR RÁPIDO DE NOTÍCIA (ÚTIL PARA TESTAR CPI 14:30) */}
        <div className="flex items-center justify-between text-xs pt-1 px-1 flex-wrap gap-2">
          <span className="text-slate-400 text-[11px]">Teste do Filtro de Notícias:</span>
          <button
            type="button"
            onClick={() => setSimulateNewsTime(simulateNewsTime ? null : '14:30')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all border ${
              simulateNewsTime === '14:30'
                ? 'bg-red-600 text-white border-red-500 shadow-sm'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            {simulateNewsTime === '14:30' ? '🚨 Simulação CPI 14:30 Ativa (Clique p/ Desativar)' : 'Testar Bloqueio CPI (14:30)'}
          </button>
        </div>

        {/* BOTÃO PRINCIPAL: GERAR ANÁLISE IA */}
        <button
          onClick={handleStartAnalysis}
          disabled={isAnalyzing}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-black text-base sm:text-lg tracking-wide shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Bot size={22} className="text-black" />
          <span>GERAR ANÁLISE IA COM ESTRATÉGIA EGGY</span>
          <ArrowRight size={20} className="text-black" />
        </button>
      </div>

      {/* RESULTADO DA ANÁLISE */}
      {latestResult && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400" />
              Resultado da Análise Gerada
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Estratégia EGGY SMC • Luanda (GMT+1)
            </span>
          </div>

          {/* 1. GRÁFICO AO VIVO EM CIMA DA ANÁLISE COM NÍVEIS EGGY */}
          <LiveCandlestickChart
            asset={latestResult.asset}
            analysis={latestResult}
            initialTimeframe={latestResult.timeframe === '1m' || latestResult.timeframe === '5m' || latestResult.timeframe === '15m' ? latestResult.timeframe : '15m'}
            height={360}
          />

          {/* 2. POR BAIXO DO GRÁFICO, A ANÁLISE NORMAL */}
          <AnalysisResultCard
            analysis={latestResult}
            onSaveToWatchlist={onSaveAnalysis}
          />
        </div>
      )}

      {/* ÚLTIMAS ANÁLISES SALVAS */}
      {recentAnalyses.length > 0 && !latestResult && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
            <History size={16} className="text-amber-400" />
            <span>Últimas Análises Realizadas</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {recentAnalyses.slice(0, 3).map((hist) => (
              <AnalysisResultCard key={hist.id} analysis={hist} />
            ))}
          </div>
        </div>
      )}

      {/* MODAL DE PESQUISA COMPLETA DE ATIVOS */}
      <AssetSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectAsset={(asset) => {
          setSelectedAsset(asset);
          setSelectedType(asset.type);
        }}
        selectedAsset={selectedAsset}
        initialCategory={selectedType}
      />

      {/* MODAL DE ANIMAÇÃO DO MOTOR IA (5 PASSOS) */}
      <AnalysisStepModal
        isOpen={isAnalyzing}
        asset={selectedAsset}
        timeframe={timeframe}
        analysisType={analysisType}
        onComplete={handleAnalysisComplete}
      />
    </div>
  );
};
