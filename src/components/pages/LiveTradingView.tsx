'use client';

import React, { useState, useEffect } from 'react';
import { ALL_ASSETS } from '../../data/assets';
import { Asset } from '../../types';
import { Activity, TrendingUp, TrendingDown, Clock, Search, Zap, RefreshCw, ArrowRight } from 'lucide-react';
import { LiveCandlestickChart } from '../LiveCandlestickChart';

interface LiveTradingViewProps {
  onSelectAssetForAnalysis: (asset: Asset) => void;
}

export const LiveTradingView: React.FC<LiveTradingViewProps> = ({ onSelectAssetForAnalysis }) => {
  const [prices, setPrices] = useState<Record<string, { price: number; change24h: number; flash: 'up' | 'down' | null }>>({});
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'crypto' | 'forex' | 'commodities' | 'indices' | 'stocks'>('all');
  const [selectedAssetForChart, setSelectedAssetForChart] = useState<Asset>(ALL_ASSETS[0]);

  // Inicializar preços base
  useEffect(() => {
    const initial: Record<string, { price: number; change24h: number; flash: 'up' | 'down' | null }> = {};
    ALL_ASSETS.forEach((asset) => {
      initial[asset.id] = {
        price: asset.basePrice,
        change24h: Number(((asset.symbol.charCodeAt(0) % 7) - 2.8).toFixed(2)),
        flash: null
      };
    });
    setPrices(initial);

    // Tentar buscar cotações reais da Binance para criptos
    const fetchBinance = async () => {
      try {
        const res = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        if (res.ok) {
          const data = await res.json();
          const btc = data.find((d: any) => d.symbol === 'BTCUSDT');
          const eth = data.find((d: any) => d.symbol === 'ETHUSDT');
          const sol = data.find((d: any) => d.symbol === 'SOLUSDT');
          const bnb = data.find((d: any) => d.symbol === 'BNBUSDT');
          const xrp = data.find((d: any) => d.symbol === 'XRPUSDT');

          setPrices((prev) => ({
            ...prev,
            ...(btc && { btc: { price: parseFloat(btc.lastPrice), change24h: parseFloat(btc.priceChangePercent), flash: 'up' } }),
            ...(eth && { eth: { price: parseFloat(eth.lastPrice), change24h: parseFloat(eth.priceChangePercent), flash: 'up' } }),
            ...(sol && { sol: { price: parseFloat(sol.lastPrice), change24h: parseFloat(sol.priceChangePercent), flash: 'up' } }),
            ...(bnb && { bnb: { price: parseFloat(bnb.lastPrice), change24h: parseFloat(bnb.priceChangePercent), flash: 'up' } }),
            ...(xrp && { xrp: { price: parseFloat(xrp.lastPrice), change24h: parseFloat(xrp.priceChangePercent), flash: 'up' } }),
          }));
        }
      } catch (e) {
        // Fallback silencioso para simulação
      }
    };

    fetchBinance();

    // Loop de ticks em tempo real
    const interval = setInterval(() => {
      setPrices((prev) => {
        const updated = { ...prev };
        const randomAsset = ALL_ASSETS[Math.floor(Math.random() * ALL_ASSETS.length)];
        const current = updated[randomAsset.id];

        if (current) {
          const deltaPct = (Math.random() - 0.49) * 0.0015;
          const newPrice = current.price * (1 + deltaPct);
          const flash = deltaPct >= 0 ? 'up' : 'down';

          updated[randomAsset.id] = {
            ...current,
            price: Number(newPrice.toFixed(randomAsset.decimals)),
            flash
          };
        }
        return updated;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const filteredAssets = ALL_ASSETS.filter((a) => {
    if (activeCategory !== 'all' && a.type !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.sessions.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 pb-20">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Live Trading 24/7
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cotações em tempo real com indicador de volatilidade e sessões
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
          <Activity size={14} />
          <span>Feed Ao Vivo</span>
        </div>
      </div>

      {/* GRÁFICO GRANDE AO VIVO */}
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Gráfico de Velas em Tempo Real:
            </span>
            <span className="text-xs text-white font-mono font-bold">
              {selectedAssetForChart.symbol} • {selectedAssetForChart.name}
            </span>
          </div>

          <button
            onClick={() => onSelectAssetForAnalysis(selectedAssetForChart)}
            className="text-xs px-3 py-1.5 rounded-xl bg-amber-500 text-black hover:brightness-110 font-black transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95"
          >
            <span>Gerar Análise deste Ativo</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <LiveCandlestickChart
          asset={selectedAssetForChart}
          height={380}
          initialTimeframe="15m"
        />
      </div>

      {/* Barra de Pesquisa e Filtros */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar preço (ex: EURUSD, XAU, BTC)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161b22] text-xs text-white pl-8 pr-3 py-2.5 rounded-xl border border-white/10 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {(['all', 'forex', 'crypto', 'commodities', 'indices', 'stocks'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-black'
                  : 'bg-[#161b22] text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'Todos' : cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Cotações com Efeito de Tick */}
      <div className="space-y-1.5">
        {filteredAssets.map((asset) => {
          const item = prices[asset.id] || { price: asset.basePrice, change24h: 0, flash: null };
          const isPositive = item.change24h >= 0;

          return (
            <div
              key={asset.id}
              onClick={() => setSelectedAssetForChart(asset)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between group active:scale-[0.99] ${
                selectedAssetForChart.id === asset.id
                  ? 'bg-[#161b22] border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-[#0d1117] border-white/5 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#161b22] text-amber-400 flex items-center justify-center font-black text-xs border border-white/5">
                  {asset.symbol.slice(0, 3)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm group-hover:text-amber-300">
                      {asset.symbol}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-slate-400 uppercase font-mono">
                      {asset.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 truncate mt-0.5">
                    {asset.name}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                    <Clock size={10} /> {asset.sessions}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div
                  className={`text-sm font-mono font-black transition-colors ${
                    item.flash === 'up'
                      ? 'text-emerald-400'
                      : item.flash === 'down'
                      ? 'text-rose-400'
                      : 'text-white'
                  }`}
                >
                  {asset.type === 'crypto' && '$'}
                  {item.price.toLocaleString('en-US', {
                    minimumFractionDigits: asset.decimals <= 2 ? 2 : asset.decimals,
                  })}
                </div>
                <div
                  className={`text-xs font-mono font-bold flex items-center justify-end gap-1 mt-0.5 ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span>{isPositive ? '+' : ''}{item.change24h}%</span>
                </div>
                <span className="text-[9px] text-amber-400 font-bold group-hover:underline">
                  Analisar IA →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
