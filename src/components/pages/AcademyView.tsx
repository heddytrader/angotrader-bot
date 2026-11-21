'use client';

import React from 'react';
import { GraduationCap, BookOpen, ShieldCheck, Zap, Award, Target, Play } from 'lucide-react';

export const AcademyView: React.FC = () => {
  const lessons = [
    {
      title: '1. A Lógica EGGY: Varredura de Liquidez (Spring & Upthrust)',
      level: 'Essencial',
      duration: '6 min de leitura',
      content: 'Como os bancos e formadores de mercado caçam o Stop Loss dos operadores amadores antes de moverem o preço. Aprende a identificar o Spring na mínima e o Upthrust na máxima.',
      tags: ['SMC', 'Wyckoff', 'EGGY Core']
    },
    {
      title: '2. Mitigação de Order Block e Entrada FVG',
      level: 'Intermédio',
      duration: '8 min de leitura',
      content: 'Um Order Block é a última vela contrária antes de uma expansão forte com desequilíbrio (Fair Value Gap). Descobre como esperar o retorno do preço ao bloco sem antecipar a ordem.',
      tags: ['Order Blocks', 'FVG', 'Institucional']
    },
    {
      title: '3. Gestão de Risco Inquebrável & Lote Exato',
      level: 'Obrigatório',
      duration: '5 min de leitura',
      content: 'Regra de ouro: nunca arriscar mais de 1% a 2% do capital por trade. Como dimensionar o tamanho do lote para que um Stop Loss nunca destrua a tua conta.',
      tags: ['Psicologia', 'Money Management']
    },
    {
      title: '4. As 3 Grandes Sessões: Ásia, Londres e Nova Iorque',
      level: 'Operacional',
      duration: '7 min de leitura',
      content: 'Horários de Luanda (UTC+1): Londres abre às 09:00 e Nova Iorque às 14:30. A sobreposição (14:30 - 17:30) é o período com maior liquidez e volume no Forex e Ouro.',
      tags: ['Timing', 'Horários', 'Sessões']
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20">
      <div>
        <div className="flex items-center gap-2">
          <GraduationCap size={24} className="text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            AngoTrader Academy
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Aprende a mentalidade institucional dos grandes fundos para operar com confiança
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.title}
            className="p-5 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-amber-500/30 transition-all space-y-3 shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                  {lesson.level}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {lesson.duration}
                </span>
              </div>
              <h3 className="font-extrabold text-white text-base leading-snug">
                {lesson.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {lesson.content}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                {lesson.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 font-mono">
                    {t}
                  </span>
                ))}
              </div>
              <button className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1">
                <BookOpen size={13} /> Ler Aula
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
