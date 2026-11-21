'use client';

import React, { useState } from 'react';
import { Users, Heart, MessageSquare, TrendingUp, Sparkles, Send } from 'lucide-react';

export const CommunityView: React.FC = () => {
  const [likes, setLikes] = useState<Record<string, number>>({
    'c1': 48,
    'c2': 73,
    'c3': 115
  });

  const posts = [
    {
      id: 'c1',
      author: 'Edvaldo Cassoma (Luanda)',
      badge: 'PRO Trader',
      time: 'Há 25 minutos',
      symbol: 'XAUUSD',
      gain: '+380.000 Kz ($420)',
      pips: '+95 Pips',
      text: 'O robô apanhou o Spring em 2665 na abertura da sessão de Londres! Bateu no TP 2 limpo. Disciplina angolana no topo!',
      isBuy: true
    },
    {
      id: 'c2',
      author: 'Kelson de Oliveira (Benguela)',
      badge: 'VIP Member',
      time: 'Há 1 hora',
      symbol: 'EURUSD',
      gain: '+190.000 Kz ($210)',
      pips: '+45 Pips',
      text: 'Venda rápida respeitando o Order Block de 15m. Parei no TP 1 e protegi o breakeven. Lucro no bolso.',
      isBuy: false
    },
    {
      id: 'c3',
      author: 'Yara Miguel (Talatona)',
      badge: 'Academy Graduate',
      time: 'Há 3 horas',
      symbol: 'US30',
      gain: '+740.000 Kz ($815)',
      pips: '+260 Pontos',
      text: 'Quem seguiu a estratégia EGGY no US30 ontem pegou o movimento inteiro. AngoTrader Bot está a mudar o meu jogo.',
      isBuy: true
    }
  ];

  const handleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      <div>
        <div className="flex items-center gap-2">
          <Users size={24} className="text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Comunidade AngoTrader
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Feed social com partilha de resultados e análises entre traders angolanos
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-2xl bg-[#0d1117] border border-white/5 space-y-3 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-extrabold flex items-center justify-center text-sm shadow">
                  {post.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm">
                      {post.author}
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                      {post.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{post.time}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-extrabold text-emerald-400 block">
                  {post.gain}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {post.pips}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#161b22] border border-white/5 text-xs text-slate-200 leading-relaxed">
              <div className="flex items-center gap-2 mb-1.5 font-bold">
                <span className="text-amber-400">{post.symbol}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded uppercase ${post.isBuy ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  {post.isBuy ? 'COMPRA' : 'VENDA'}
                </span>
              </div>
              {post.text}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
              >
                <Heart size={15} className="text-red-500 fill-red-500/20" />
                <span>{likes[post.id]} Curtidas</span>
              </button>

              <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MessageSquare size={15} />
                <span>Comentar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
