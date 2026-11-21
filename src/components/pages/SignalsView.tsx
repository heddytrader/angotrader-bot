'use client';

import React, { useState } from 'react';
import { AnalysisResult } from '../../types';
import { ALL_ASSETS } from '../../data/assets';
import { 
  Radio, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert,
  Search
} from 'lucide-react';

interface SignalsViewProps {
  analyses: AnalysisResult[];
  onSelectSignal: (analysis: AnalysisResult) => void;
  onNavigateToAnalysis: () => void;
}

export const SignalsView: React.FC<SignalsViewProps> = ({
  analyses,
  onSelectSignal,
  onNavigateToAnalysis,
}) => {
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all');
  const [search, setSearch] = useState('');

  // Sinais mock padrão caso o usuário ainda não tenha gerado muitos
  const defaultSignals: AnalysisResult[] = [
    {
      id: 'sig-default-1',
      asset: ALL_ASSETS.find(a => a.symbol === 'XAUUSD') || ALL_ASSETS[0],
      timeframe: '15m',
      analysisType: 'SMC (Smart Money)',
      timestamp: '20/11/2026 11:30',
      angolaDate: '20/11/2026',
      angolaTime: '11:30',
      angolaFullHeader: '📅 Data: 20/11/2026 - Hora Angola: 11:30 (GMT+1)',
      angolaCardHeader: '📅 20/11/2026 | 🕒 11:30 Angola',
      direction: 'COMPRA FORTE',
      currentPrice: 2668.50,
      entryPrice: 2670.00,
      stopLoss: 2655.00,
      takeProfit1: 2692.00,
      takeProfit2: 2710.00,
      riskReward: '1:2.8',
      signalStrength: 82,
      confidence: 'Alta',
      explanation: 'Wyckoff Spring limpo na mínima da sessão asiática de XAUUSD com mitigação de Order Block institucional em Londres. Alvo em 2710.',
      indicators: ['Order Block 15m', 'Wyckoff Spring', 'RSI Divergência'],
      confluences: [
        { name: 'Varredura de Liquidez', status: 'bullish', detail: 'Spring validado' },
        { name: 'Order Block', status: 'bullish', detail: 'Mitigação com vela de absorção' }
      ],
      eggyLogic: {
        springSweep: true,
        orderBlockConfirmed: true,
        fvgMitigation: true,
        rsiStatus: 'RSI saindo de sobrevenda',
        verdict: 'Setup de alta probabilidade'
      }
    },
    {
      id: 'sig-default-2',
      asset: ALL_ASSETS.find(a => a.symbol === 'EURUSD') || ALL_ASSETS[0],
      timeframe: '1h',
      analysisType: 'SMC (Smart Money)',
      timestamp: '20/11/2026 10:45',
      angolaDate: '20/11/2026',
      angolaTime: '10:45',
      angolaFullHeader: '📅 Data: 20/11/2026 - Hora Angola: 10:45 (GMT+1)',
      angolaCardHeader: '📅 20/11/2026 | 🕒 10:45 Angola',
      direction: 'VENDA',
      currentPrice: 1.0542,
      entryPrice: 1.0540,
      stopLoss: 1.0575,
      takeProfit1: 1.0490,
      takeProfit2: 1.0440,
      riskReward: '1:2.9',
      signalStrength: 71,
      confidence: 'Alta',
      explanation: 'Rejeição na resistência do Order Block de baixa em EURUSD. Quebra de estrutura interna (CHoCH) na abertura de Londres.',
      indicators: ['EMA 200', 'Order Block 1h', 'FVG'],
      confluences: [
        { name: 'CHoCH', status: 'bearish', detail: 'Quebra de estrutura confirmada' },
        { name: 'Order Block', status: 'bearish', detail: 'Defesa de vendedores' }
      ],
      eggyLogic: {
        springSweep: true,
        orderBlockConfirmed: true,
        fvgMitigation: true,
        rsiStatus: 'RSI em 64 perdendo ímpeto',
        verdict: 'Continuidade de tendência de baixa'
      }
    },
    {
      id: 'sig-default-3',
      asset: ALL_ASSETS.find(a => a.symbol === 'BTC') || ALL_ASSETS[0],
      timeframe: '4h',
      analysisType: 'SMC (Smart Money)',
      timestamp: '20/11/2026 09:15',
      angolaDate: '20/11/2026',
      angolaTime: '09:15',
      angolaFullHeader: '📅 Data: 20/11/2026 - Hora Angola: 09:15 (GMT+1)',
      angolaCardHeader: '📅 20/11/2026 | 🕒 09:15 Angola',
      direction: 'COMPRA',
      currentPrice: 91450.00,
      entryPrice: 91600.00,
      stopLoss: 89800.00,
      takeProfit1: 94200.00,
      takeProfit2: 96500.00,
      riskReward: '1:2.7',
      signalStrength: 76,
      confidence: 'Alta',
      explanation: 'Consolidação acima da média institucional de 50 períodos com absorção de vendas agressivas. Continuação da expansão.',
      indicators: ['Volume Profile', 'EMA 50', 'Fibonacci 61.8%'],
      confluences: [
        { name: 'Retração Fib', status: 'bullish', detail: 'Respeito aos 61.8%' },
        { name: 'Order Flow', status: 'bullish', detail: 'Delta comprador positivo' }
      ],
      eggyLogic: {
        springSweep: true,
        orderBlockConfirmed: true,
        fvgMitigation: false,
        rsiStatus: 'RSI em 54 apontando para cima',
        verdict: 'Tendência primária de alta intacta'
      }
    }
  ];

  const allSignals = [...analyses, ...defaultSignals];

  const filteredSignals = allSignals.filter((s) => {
    if (filter === 'buy' && !s.direction.includes('COMPRA')) return false;
    if (filter === 'sell' && !s.direction.includes('VENDA')) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        s.asset.symbol.toLowerCase().includes(q) ||
        s.asset.name.toLowerCase().includes(q) ||
        s.direction.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 pb-20">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Radio size={20} className="text-amber-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Sinais IA AngoTrader
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Oportunidades geradas pelo motor com validação de risco institucional
          </p>
        </div>

        <button
          onClick={onNavigateToAnalysis}
          className="px-4 py-2 rounded-xl bg-amber-500 text-black font-extrabold text-xs shadow-md hover:bg-amber-400 transition-all"
        >
          + Gerar Meu Sinal
        </button>
      </div>

      {/* Barra de Filtro e Pesquisa */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar sinal (ex: XAUUSD, BTC, EUR)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161b22] text-xs text-white pl-8 pr-3 py-2.5 rounded-xl border border-white/10 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-amber-500 text-black'
                : 'bg-[#161b22] text-slate-400 hover:text-white'
            }`}
          >
            Todos ({allSignals.length})
          </button>
          <button
            onClick={() => setFilter('buy')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              filter === 'buy'
                ? 'bg-emerald-500 text-black'
                : 'bg-[#161b22] text-emerald-400 hover:bg-emerald-500/20'
            }`}
          >
            Compras
          </button>
          <button
            onClick={() => setFilter('sell')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              filter === 'sell'
                ? 'bg-rose-500 text-white'
                : 'bg-[#161b22] text-rose-400 hover:bg-rose-500/20'
            }`}
          >
            Vendas
          </button>
        </div>
      </div>

      {/* Lista de Sinais */}
      <div className="space-y-3">
        {filteredSignals.map((signal) => {
          const isBuy = signal.direction.includes('COMPRA');

          return (
            <div
              key={signal.id}
              onClick={() => onSelectSignal(signal)}
              className="p-4 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-amber-500/40 cursor-pointer transition-all space-y-3 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${isBuy ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    {isBuy ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-white text-base">
                        {signal.asset.symbol}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono">
                        {signal.timeframe}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-extrabold uppercase ${
                        isBuy ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {signal.direction}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {signal.asset.name} • {signal.asset.sessions}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    Força {signal.signalStrength}%
                  </span>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    {signal.angolaDate && !signal.timestamp.includes('/') ? `${signal.angolaDate} ${signal.timestamp}` : signal.timestamp}
                  </span>
                </div>
              </div>

              {/* Linha de Dados de Preço */}
              <div className="grid grid-cols-3 gap-2 bg-[#161b22] p-2.5 rounded-xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Entrada</span>
                  <span className="font-mono font-bold text-white">
                    {signal.entryPrice}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-rose-400 block">Stop Loss</span>
                  <span className="font-mono font-bold text-rose-300">
                    {signal.stopLoss}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 block">Take Profit 2</span>
                  <span className="font-mono font-bold text-emerald-300">
                    {signal.takeProfit2}
                  </span>
                </div>
              </div>

              {/* Explicação Rápida */}
              <p className="text-xs text-slate-300 line-clamp-2">
                {signal.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
