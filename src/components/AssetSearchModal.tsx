'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Asset, AssetType } from '../types';
import { ALL_ASSETS, ASSET_TYPES } from '../data/assets';
import { 
  Search, X, Check, Globe, Sparkles, Filter, 
  Layers, Clock, ChevronRight, Zap
} from 'lucide-react';

interface AssetSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAsset: (asset: Asset) => void;
  selectedAsset?: Asset;
  initialCategory?: AssetType | 'all';
}

export const AssetSearchModal: React.FC<AssetSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAsset,
  selectedAsset,
  initialCategory = 'all'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<AssetType | 'all'>(initialCategory);
  const [subFilter, setSubFilter] = useState<string>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sincronizar categoria inicial quando abre
  useEffect(() => {
    if (isOpen) {
      setActiveCategory(initialCategory);
      setSubFilter('all');
      // Autofocus na pesquisa no telemóvel/desktop
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    } else {
      setSearchTerm('');
    }
  }, [isOpen, initialCategory]);

  // Subfiltros dinâmicos com base na categoria
  const subFilterOptions = useMemo(() => {
    if (activeCategory === 'forex') {
      return [
        { id: 'all', label: 'Todos' },
        { id: 'major', label: 'Maiores (Majors)' },
        { id: 'minor', label: 'Menores (Minors)' },
        { id: 'exotic', label: 'Exóticos' },
        { id: 'londres', label: 'Sessão Londres' },
        { id: 'ny', label: 'Sessão Nova Iorque' },
        { id: 'asia', label: 'Sessão Ásia' },
      ];
    }
    if (activeCategory === 'stocks') {
      return [
        { id: 'all', label: 'Todas' },
        { id: 'tech', label: 'Tech EUA' },
        { id: 'b3', label: 'B3 Brasil' },
      ];
    }
    if (activeCategory === 'commodities') {
      return [
        { id: 'all', label: 'Todas' },
        { id: 'metal', label: 'Metais (Ouro/Prata)' },
        { id: 'energy', label: 'Energia (Petróleo/Gás)' },
        { id: 'agriculture', label: 'Agrícolas' },
      ];
    }
    if (activeCategory === 'crypto') {
      return [
        { id: 'all', label: 'Todas' },
        { id: 'top', label: 'Top Cap' },
        { id: 'meme', label: 'Memes' },
        { id: 'ai', label: 'IA & Infra' },
      ];
    }
    return [{ id: 'all', label: 'Todos os Ativos' }];
  }, [activeCategory]);

  // Filtragem ultra-rápida sem travar
  const filteredAssets = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return ALL_ASSETS.filter((asset) => {
      // 1. Filtro de Categoria
      if (activeCategory !== 'all' && asset.type !== activeCategory) {
        return false;
      }

      // 2. Sub-filtro
      if (subFilter !== 'all') {
        if (activeCategory === 'forex') {
          if (subFilter === 'major' && asset.subType !== 'major') return false;
          if (subFilter === 'minor' && asset.subType !== 'minor') return false;
          if (subFilter === 'exotic' && asset.subType !== 'exotic') return false;
          if (subFilter === 'londres' && !asset.sessions.toLowerCase().includes('londres')) return false;
          if (subFilter === 'ny' && !asset.sessions.toLowerCase().includes('nova iorque')) return false;
          if (subFilter === 'asia' && !asset.sessions.toLowerCase().includes('ásia') && !asset.sessions.toLowerCase().includes('tóquio')) return false;
        } else if (activeCategory === 'stocks') {
          if (subFilter === 'tech' && asset.subType !== 'tech') return false;
          if (subFilter === 'b3' && asset.subType !== 'b3') return false;
        } else if (activeCategory === 'commodities') {
          if (subFilter === 'metal' && asset.subType !== 'metal') return false;
          if (subFilter === 'energy' && asset.subType !== 'energy') return false;
          if (subFilter === 'agriculture' && asset.subType !== 'agriculture') return false;
        } else if (activeCategory === 'crypto') {
          if (subFilter === 'top' && !['BTC', 'ETH', 'SOL', 'BNB', 'XRP'].includes(asset.symbol)) return false;
          if (subFilter === 'meme' && !['DOGE', 'PEPE', 'SHIB'].includes(asset.symbol)) return false;
          if (subFilter === 'ai' && !['NEAR', 'RENDER', 'FET'].includes(asset.symbol)) return false;
        }
      }

      // 3. Termo de Pesquisa
      if (!term) return true;

      const symbolMatch = asset.symbol.toLowerCase().includes(term);
      const nameMatch = asset.name.toLowerCase().includes(term);
      const sessionsMatch = asset.sessions.toLowerCase().includes(term);
      const tagMatch = asset.tag?.toLowerCase().includes(term);
      const typeMatch = asset.type.toLowerCase().includes(term);

      return symbolMatch || nameMatch || sessionsMatch || tagMatch || typeMatch;
    });
  }, [searchTerm, activeCategory, subFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center bg-black/80 backdrop-blur-md transition-all duration-200">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div 
        className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-[#0d1117] border border-amber-500/20 rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Superior */}
        <div className="p-4 border-b border-white/10 bg-[#161b22]/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-extrabold text-sm shadow-md">
              AT
            </div>
            <div>
              <h2 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                Selecionar Ativo
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono border border-amber-500/30">
                  {filteredAssets.length} disponíveis
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Lista completa sem cortes • Digite ou filtre por sessão
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Barra de Pesquisa Fixa */}
        <div className="p-3 bg-[#0d1117] border-b border-white/5 space-y-2.5">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 text-amber-400" size={18} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar ativo (ex: EUR, BTC, TSLA, Ouro, Londres)..."
              className="w-full bg-[#161b22] text-white pl-10 pr-10 py-3 rounded-xl border border-white/10 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm placeholder:text-slate-500 transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Categorias Principais (Scroll Horizontal no Telemóvel) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-medium">
            <button
              onClick={() => {
                setActiveCategory('all');
                setSubFilter('all');
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-sm'
                  : 'bg-[#161b22] text-slate-300 border-white/5 hover:border-amber-500/30'
              }`}
            >
              <Layers size={13} />
              Todos ({ALL_ASSETS.length})
            </button>
            {ASSET_TYPES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSubFilter('all');
                }}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-sm'
                    : 'bg-[#161b22] text-slate-300 border-white/5 hover:border-amber-500/30'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="opacity-75 text-[10px]">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Sub-Filtros para a Categoria Ativa */}
          {subFilterOptions.length > 1 && (
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-0.5 text-[11px]">
              <span className="text-slate-400 flex items-center gap-1 mr-1">
                <Filter size={10} className="text-amber-400" /> Filtro:
              </span>
              {subFilterOptions.map((sf) => (
                <button
                  key={sf.id}
                  onClick={() => setSubFilter(sf.id)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-all ${
                    subFilter === sf.id
                      ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  {sf.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* LISTA COMPLETA COM SCROLL OTIMIZADO */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-2 space-y-1.5 divide-y divide-white/5">
          {filteredAssets.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="mx-auto mb-3 text-slate-600" size={36} />
              <p className="text-sm font-semibold text-slate-300">
                Nenhum ativo encontrado para &quot;{searchTerm}&quot;
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Tente pesquisar por &quot;EUR&quot;, &quot;BTC&quot;, &quot;Ouro&quot;, &quot;Petróleo&quot; ou altere a categoria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                  setSubFilter('all');
                }}
                className="mt-4 px-4 py-2 text-xs rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30 transition-all font-semibold"
              >
                Limpar todos os filtros
              </button>
            </div>
          ) : (
            filteredAssets.map((asset) => {
              const isSelected = selectedAsset?.id === asset.id;

              return (
                <div
                  key={asset.id}
                  onClick={() => {
                    onSelectAsset(asset);
                    onClose();
                  }}
                  className={`pt-1.5 first:pt-0 group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500/15 border border-amber-500/40 shadow-sm'
                      : 'hover:bg-white/[0.04] border border-transparent active:scale-[0.99]'
                  }`}
                >
                  {/* Lado Esquerdo: Símbolo, Nome e Categoria */}
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-base tracking-wide text-amber-400 group-hover:text-amber-300">
                        {asset.symbol}
                      </span>

                      {/* Tag de Tipo/Subtipo */}
                      {asset.tag && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 font-mono">
                          {asset.tag}
                        </span>
                      )}

                      {/* Badge de Categoria se visualizando Todos */}
                      {activeCategory === 'all' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase tracking-wider font-semibold">
                          {asset.type}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-300 truncate mt-0.5 font-medium">
                      {asset.name}
                    </div>

                    {/* DESTAQUE DA SESSÃO CONFORME PEDIDO EXPRESSO DO USUÁRIO */}
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                      <Clock size={12} className="text-emerald-400 shrink-0" />
                      <span className="truncate">{asset.sessions}</span>
                    </div>
                  </div>

                  {/* Lado Direito: Preço Referência & Ação */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-white">
                        {asset.type === 'crypto' && '$'}
                        {asset.basePrice.toLocaleString('en-US', {
                          minimumFractionDigits: asset.decimals <= 2 ? 2 : asset.decimals,
                          maximumFractionDigits: asset.decimals,
                        })}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {asset.unit || (asset.type === 'forex' ? 'Cotação' : 'USD')}
                      </div>
                    </div>

                    {isSelected ? (
                      <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-black shadow-sm">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                        <ChevronRight size={16} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Rodapé Informativo */}
        <div className="p-3 bg-[#161b22] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Zap size={13} className="text-amber-400" />
            <span>AngoTrader Bot • Cobertura 100% dos mercados</span>
          </div>
          <button
            onClick={onClose}
            className="text-amber-400 font-bold hover:underline"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
