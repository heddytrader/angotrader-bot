'use client';

import React, { useState } from 'react';
import { UserCredits } from '../types';
import { X, Sparkles, Check, Zap, ShieldCheck, CreditCard, Smartphone } from 'lucide-react';

interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  credits: UserCredits;
  onAddCredits: (pro: number, simple: number) => void;
  isOwner?: boolean;
}

export const CreditModal: React.FC<CreditModalProps> = ({
  isOpen,
  onClose,
  credits,
  onAddCredits,
  isOwner = false,
}) => {
  const [purchased, setPurchased] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPackage = (pro: number, simple: number, name: string) => {
    setSelectedPlan(name);
    // Simular recarga instantânea
    setTimeout(() => {
      onAddCredits(pro, simple);
      setPurchased(true);
      setTimeout(() => {
        setPurchased(false);
        setSelectedPlan(null);
        onClose();
      }, 1500);
    }, 800);
  };

  const packages = [
    {
      id: 'pack-starter',
      name: 'Pacote Kambas',
      pro: 5,
      simple: 15,
      priceKz: '2.500 Kz',
      priceUsd: '$3.00',
      popular: false,
      desc: 'Ideal para traders que estão a começar a validar setups.'
    },
    {
      id: 'pack-pro',
      name: 'Pacote Luanda PRO',
      pro: 20,
      simple: 50,
      priceKz: '7.500 Kz',
      priceUsd: '$9.00',
      popular: true,
      desc: 'Mais escolhido! Dá acesso a análises institucionais diárias.'
    },
    {
      id: 'pack-whale',
      name: 'Pacote Tubarão VIP',
      pro: 60,
      simple: 150,
      priceKz: '19.000 Kz',
      priceUsd: '$22.00',
      popular: false,
      desc: 'Para traders ativos em múltiplos ativos com alertas 24/7.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0d1117] border border-amber-500/30 rounded-2xl p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center font-bold">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-white font-extrabold text-base">Créditos de Análise IA</h3>
              <p className="text-xs text-slate-400">Recarga segura e instantânea</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Saldo Atual */}
        <div className="my-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-500/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">
              {isOwner ? '👑 Conta do Dono' : 'Saldo Atual'}
            </span>
            <span className="text-sm font-extrabold text-white">
              {isOwner ? (
                <span className="text-amber-400">DONO - ∞ PRO / ∞ Simples</span>
              ) : (
                <>{credits.pro} <span className="text-amber-400">PRO</span> + {credits.simple} Simples</>
              )}
            </span>
          </div>
          <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${
            isOwner ? 'bg-amber-500 text-black' : 'bg-amber-500/20 text-amber-300'
          }`}>
            {isOwner ? '∞ Plano Infinito' : 'Conta Ativa'}
          </span>
        </div>

        {purchased ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
              <Check size={28} strokeWidth={3} />
            </div>
            <h4 className="text-lg font-bold text-white">Recarga Confirmada!</h4>
            <p className="text-xs text-slate-300">
              Créditos adicionados com sucesso à tua conta do AngoTrader Bot.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-xs text-slate-400 font-medium">
              Escolhe o pacote que melhor se adapta ao teu plano de trading:
            </div>

            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => handleSelectPackage(pkg.pro, pkg.simple, pkg.name)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all relative ${
                  pkg.popular
                    ? 'bg-amber-500/10 border-amber-500/50 hover:bg-amber-500/15'
                    : 'bg-[#161b22] border-white/10 hover:border-amber-500/30'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-2.5 right-3 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-black shadow-sm">
                    MAIS POPULAR
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white text-sm">{pkg.name}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{pkg.desc}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        +{pkg.pro} Créditos PRO
                      </span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs font-mono text-slate-300">
                        +{pkg.simple} Simples
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-extrabold text-white font-mono">
                      {pkg.priceKz}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      ({pkg.priceUsd})
                    </div>
                    <button className="mt-2 text-xs px-2.5 py-1 rounded-lg bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors">
                      Carregar
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
              <Smartphone size={13} className="text-amber-400" />
              <span>Multicaixa Express • BAI Direto • USDT Binance</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
