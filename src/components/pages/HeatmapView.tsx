'use client';

import React, { useState } from 'react';
import { ALL_ASSETS } from '../../data/assets';
import { Asset } from '../../types';
import { Flame, Grid, TrendingUp, TrendingDown } from 'lucide-react';

interface HeatmapViewProps {
  onSelectAssetForAnalysis: (asset: Asset) => void;
}

export const HeatmapView: React.FC<HeatmapViewProps> = ({ onSelectAssetForAnalysis }) => {
  const [filterType, setFilterType] = useState<string>('all');

  const assetsWithChanges = ALL_ASSETS.map((asset, i) => {
    // Variação percentual determinística realista para o heatmap
    const change = Number((Math.sin(i * 1.7) * 4.2).toFixed(2));
    return {
      ...asset,
      change,
    };
  });

  const filtered = filterType === 'all'
    ? assetsWithChanges
    : assetsWithChanges.filter((a) => a.type === filterType);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 pb-20">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Flame size={22} className="text-red-500 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Heatmap dos Mercados
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Mapa visual de força e fluxo de liquidez por classe de ativo
          </p>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {['all', 'forex', 'crypto', 'commodities', 'indices', 'stocks'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === t
                  ? 'bg-amber-500 text-black'
                  : 'bg-[#161b22] text-slate-400 hover:text-white'
              }`}
            >
              {t === 'all' ? 'Todos' : t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid do Heatmap */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {filtered.map((asset) => {
          const isUp = asset.change >= 0;
          const intensity = Math.min(Math.abs(asset.change) / 4, 1);

          return (
            <div
              key={asset.id}
              onClick={() => onSelectAssetForAnalysis(asset)}
              className={`p-3 rounded-xl cursor-pointer transition-all border flex flex-col justify-between h-24 hover:scale-[1.03] active:scale-95 shadow-md ${
                isUp
                  ? 'bg-emerald-950/60 border-emerald-500/40 hover:border-emerald-400'
                  : 'bg-rose-950/60 border-rose-500/40 hover:border-rose-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-white text-sm">
                  {asset.symbol}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">
                  {asset.type.slice(0, 4)}
                </span>
              </div>

              <div className="text-[11px] text-slate-300 truncate">
                {asset.name}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-mono font-bold text-white">
                  ${asset.basePrice.toLocaleString('en-US', {
                    maximumFractionDigits: asset.decimals <= 2 ? 2 : 4,
                  })}
                </span>
                <span
                  className={`text-xs font-mono font-extrabold flex items-center gap-0.5 ${
                    isUp ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span>{isUp ? '+' : ''}{asset.change}%</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
