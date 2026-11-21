'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Asset, AnalysisResult } from '../types';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Maximize2, 
  Zap, 
  ShieldCheck, 
  Target, 
  AlertTriangle,
  Layers
} from 'lucide-react';

interface LiveCandlestickChartProps {
  asset: Asset;
  analysis?: AnalysisResult;
  initialTimeframe?: '1m' | '5m' | '15m';
  height?: number;
  showDetailsHeader?: boolean;
}

export const LiveCandlestickChart: React.FC<LiveCandlestickChartProps> = ({
  asset,
  analysis,
  initialTimeframe = '15m',
  height = 360,
  showDetailsHeader = true,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTf, setSelectedTf] = useState<'1m' | '5m' | '15m'>(initialTimeframe);
  const [livePrice, setLivePrice] = useState<number>(asset.basePrice);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [priceFlash, setPriceFlash] = useState<'up' | 'down' | null>(null);
  const [isNearEntry, setIsNearEntry] = useState<boolean>(false);

  // Referências para o gráfico do Lightweight Charts
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const lastCandleRef = useRef<{ time: number; open: number; high: number; low: number; close: number } | null>(null);
  const priceLinesRef = useRef<any[]>([]);

  // Timeframe em segundos
  const getTfSeconds = (tf: '1m' | '5m' | '15m'): number => {
    if (tf === '1m') return 60;
    if (tf === '5m') return 300;
    return 900;
  };

  // Gerador de histórico realista de velas
  const generateHistoryCandles = (baseP: number, count = 60, tfSec = 900) => {
    const candles = [];
    const nowSec = Math.floor(Date.now() / 1000);
    const startSec = nowSec - count * tfSec;

    let prevClose = baseP * (1 - 0.008);
    const volFactor = asset.type === 'crypto' ? 0.004 : asset.type === 'indices' ? 0.002 : 0.001;

    for (let i = 0; i < count; i++) {
      const time = (startSec + i * tfSec) as any;
      const change = (Math.random() - 0.49) * prevClose * volFactor * (tfSec / 60);
      const open = prevClose;
      const close = Number((open + change).toFixed(asset.decimals));
      const high = Number((Math.max(open, close) + Math.random() * prevClose * volFactor * 0.8).toFixed(asset.decimals));
      const low = Number((Math.min(open, close) - Math.random() * prevClose * volFactor * 0.8).toFixed(asset.decimals));

      candles.push({ time, open, high, low, close });
      prevClose = close;
    }

    return candles;
  };

  // Inicializar e configurar o gráfico com lightweight-charts
  useEffect(() => {
    let isMounted = true;
    let chartInstance: any = null;

    const initChart = async () => {
      if (!chartContainerRef.current) return;

      // Limpar conteúdo anterior
      chartContainerRef.current.innerHTML = '';

      // Import dinâmico para garantir compatibilidade no cliente Next.js
      const { createChart, CandlestickSeries, ColorType, LineStyle } = await import('lightweight-charts');
      if (!isMounted || !chartContainerRef.current) return;

      const containerWidth = chartContainerRef.current.clientWidth || 600;

      // Configuração elegante preto + dourado
      chartInstance = createChart(chartContainerRef.current, {
        width: containerWidth,
        height: height,
        layout: {
          background: { type: ColorType.Solid, color: '#090d14' },
          textColor: '#94a3b8',
          fontSize: 11,
          fontFamily: 'monospace',
        },
        grid: {
          vertLines: { color: 'rgba(255, 255, 255, 0.03)' },
          horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
        },
        crosshair: {
          vertLine: { color: '#f59e0b', width: 1, style: LineStyle.Dashed },
          horzLine: { color: '#f59e0b', width: 1, style: LineStyle.Dashed },
        },
        rightPriceScale: {
          visible: true,
          autoScale: true,
          minimumWidth: 75, // Garante 70px+ de espaço dedicado para a escala no telemóvel e desktop
          borderVisible: true,
          borderColor: 'rgba(245, 158, 11, 0.3)',
          textColor: '#cbd5e1',
          entireTextOnly: false,
          ticksVisible: true,
          scaleMargins: { top: 0.15, bottom: 0.15 },
        },
        timeScale: {
          visible: true,
          borderVisible: true,
          borderColor: 'rgba(245, 158, 11, 0.2)',
          timeVisible: true,
          secondsVisible: selectedTf === '1m',
        },
      });

      chartRef.current = chartInstance;

      // Precisão decimal oficial do ativo (ex: 5 casas decimais para forex como EURUSD: 1.26129)
      const decimals = asset.decimals !== undefined ? asset.decimals : 5;
      const minMove = Number(Math.pow(10, -decimals).toFixed(decimals));

      // Adicionar série de velas com escala configurada com casas decimais exatas
      const candlestickSeries = chartInstance.addSeries(CandlestickSeries, {
        upColor: '#10b981',
        downColor: '#ef4444',
        borderVisible: true,
        borderUpColor: '#34d399',
        borderDownColor: '#f87171',
        wickUpColor: '#10b981',
        wickDownColor: '#ef4444',
        priceFormat: {
          type: 'price',
          precision: decimals,
          minMove: minMove,
        },
        priceScaleId: 'right',
        lastValueVisible: true,
        priceLineVisible: true,
        priceLineWidth: 1,
        priceLineColor: '#10b981',
        priceLineStyle: LineStyle.Dotted,
      });

      seriesRef.current = candlestickSeries;

      // Gerar e popular histórico de velas
      const tfSec = getTfSeconds(selectedTf);
      const candles = generateHistoryCandles(asset.basePrice, 50, tfSec);
      candlestickSeries.setData(candles);

      const last = candles[candles.length - 1];
      lastCandleRef.current = last;
      setLivePrice(last.close);

      // DESENHAR LINHAS DA ANÁLISE EGGY NO GRÁFICO (COM PREÇOS NA ESCALA DA DIREITA)
      if (analysis) {
        priceLinesRef.current = [];

        // 1. Linha de ENTRADA (Amarela Dourada com etiqueta na escala)
        const entryLine = candlestickSeries.createPriceLine({
          price: analysis.entryPrice,
          color: '#f59e0b', // Amarelo EGGY
          lineWidth: 2,
          lineStyle: LineStyle.Solid,
          axisLabelVisible: true,
          axisLabelColor: '#f59e0b',
          axisLabelTextColor: '#000000',
          title: `ENTRADA: ${analysis.entryPrice.toFixed(decimals)}`,
        });
        priceLinesRef.current.push(entryLine);

        // 2. Linha de STOP LOSS (Vermelha com etiqueta na escala)
        const slLine = candlestickSeries.createPriceLine({
          price: analysis.stopLoss,
          color: '#ef4444', // Vermelho
          lineWidth: 2,
          lineStyle: LineStyle.Dashed,
          axisLabelVisible: true,
          axisLabelColor: '#ef4444',
          axisLabelTextColor: '#ffffff',
          title: `STOP LOSS: ${analysis.stopLoss.toFixed(decimals)}`,
        });
        priceLinesRef.current.push(slLine);

        // 3. Linha de TAKE PROFIT 1 (Verde com etiqueta na escala)
        const tp1Line = candlestickSeries.createPriceLine({
          price: analysis.takeProfit1,
          color: '#10b981', // Verde
          lineWidth: 2,
          lineStyle: LineStyle.Dashed,
          axisLabelVisible: true,
          axisLabelColor: '#10b981',
          axisLabelTextColor: '#000000',
          title: `ALVO TP 1: ${analysis.takeProfit1.toFixed(decimals)}`,
        });
        priceLinesRef.current.push(tp1Line);

        // 4. Linha de TAKE PROFIT 2 (Verde Forte com etiqueta na escala)
        const tp2Line = candlestickSeries.createPriceLine({
          price: analysis.takeProfit2,
          color: '#059669', // Verde Esmeralda Final
          lineWidth: 2,
          lineStyle: LineStyle.Solid,
          axisLabelVisible: true,
          axisLabelColor: '#059669',
          axisLabelTextColor: '#ffffff',
          title: `ALVO TP 2: ${analysis.takeProfit2.toFixed(decimals)}`,
        });
        priceLinesRef.current.push(tp2Line);
      }

      chartInstance.timeScale().fitContent();

      // Responsividade em resize
      const handleResize = () => {
        if (chartContainerRef.current && chartInstance) {
          chartInstance.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    initChart();

    return () => {
      isMounted = false;
      if (chartRef.current) {
        try {
          chartRef.current.remove();
        } catch (e) {}
        chartRef.current = null;
        seriesRef.current = null;
      }
    };
  }, [asset.id, selectedTf, analysis?.id]);

  // ATUALIZAÇÃO AO VIVO A CADA SEGUNDO (TEMPO REAL SEM RECARREGAR)
  useEffect(() => {
    const tfSec = getTfSeconds(selectedTf);
    const interval = setInterval(() => {
      if (!seriesRef.current || !lastCandleRef.current) return;

      const last = lastCandleRef.current;
      const nowSec = Math.floor(Date.now() / 1000);

      // Volatilidade realista do tick
      const volDelta = asset.pipSize * (Math.random() - 0.49) * 2;
      const newClose = Number((last.close + volDelta).toFixed(asset.decimals));
      const newHigh = Number(Math.max(last.high, newClose).toFixed(asset.decimals));
      const newLow = Number(Math.min(last.low, newClose).toFixed(asset.decimals));

      // Feedback visual do tick (verde se a subir, vermelho se a descer)
      const isUp = newClose >= last.close;
      const tickColor = isUp ? '#10b981' : '#ef4444';
      setPriceFlash(isUp ? 'up' : 'down');
      setLivePrice(newClose);
      const chg = ((newClose - asset.basePrice) / asset.basePrice) * 100;
      setPriceChange(chg);

      // Atualizar a etiqueta colorida no lado direito (TradingView style)
      if (seriesRef.current) {
        seriesRef.current.applyOptions({
          priceLineColor: tickColor,
        });
      }

      // Verificar proximidade da linha de entrada (piscar quando próximo de 0.2%)
      if (analysis) {
        const dist = Math.abs(newClose - analysis.entryPrice) / analysis.entryPrice;
        setIsNearEntry(dist < 0.0025);
      }

      // Verificar se a vela atual completou o período do timeframe
      const candleAge = nowSec - (last.time as number);
      if (candleAge >= tfSec) {
        // Criar nova vela
        const newCandle = {
          time: (last.time as number) + tfSec,
          open: newClose,
          high: newClose,
          low: newClose,
          close: newClose,
        };
        lastCandleRef.current = newCandle;
        seriesRef.current.update(newCandle);
      } else {
        // Atualizar vela em formação
        const updated = {
          time: last.time,
          open: last.open,
          high: newHigh,
          low: newLow,
          close: newClose,
        };
        lastCandleRef.current = updated;
        seriesRef.current.update(updated);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [asset, selectedTf, analysis]);

  return (
    <div
      className={`w-full rounded-2xl bg-[#090d14] border transition-all duration-300 relative overflow-hidden shadow-2xl ${
        isNearEntry
          ? 'border-amber-400 ring-4 ring-amber-400/70 shadow-amber-500/40 animate-pulse'
          : 'border-amber-500/30'
      }`}
    >
      {/* ALERTA VISUAL: PREÇO NA ZONA DE ENTRADA (QUANDO O PREÇO CHEGA PERTO) */}
      {isNearEntry && analysis && (
        <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black px-4 py-2 font-black text-xs sm:text-sm flex items-center justify-between animate-pulse shadow-lg">
          <div className="flex items-center gap-2">
            <Zap size={18} className="fill-black" />
            <span>⚡ PREÇO NA ZONA DE ENTRADA EGGY! PREPARA A ORDEM: ${analysis.entryPrice}</span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black text-amber-300 font-bold hidden sm:inline-block">
            {analysis.direction}
          </span>
        </div>
      )}

      {/* CABEÇALHO DO GRÁFICO AO VIVO */}
      {showDetailsHeader && (
        <div className="p-3.5 sm:p-4 border-b border-white/5 flex items-center justify-between flex-wrap gap-2.5 bg-[#0d1117]/80 backdrop-blur-md">
          {/* Informações do Ativo & Preço ao Vivo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="font-black text-base sm:text-lg text-white font-mono">
                {asset.symbol}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold uppercase border border-amber-500/30">
                {asset.type}
              </span>
            </div>

            {/* Preço ao Vivo a Mexer a cada segundo */}
            <div className="flex items-center gap-2">
              <span
                className={`font-mono font-black text-base sm:text-xl transition-colors duration-200 ${
                  priceFlash === 'up'
                    ? 'text-emerald-400'
                    : priceFlash === 'down'
                    ? 'text-rose-400'
                    : 'text-amber-400'
                }`}
              >
                ${livePrice.toLocaleString('en-US', {
                  minimumFractionDigits: asset.decimals <= 2 ? 2 : asset.decimals,
                })}
              </span>

              <span
                className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  priceChange >= 0
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {priceChange >= 0 ? '+' : ''}
                {priceChange.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Seletores de Timeframe (1M / 5M / 15M) & Zona Vortex */}
          <div className="flex items-center gap-2">
            {/* Tag da Zona de Vortex / Liquidez Institucional */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/50 border border-amber-500/30 text-[10px] font-bold text-amber-300 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Zona Vortex / Liquidez</span>
            </div>

            {/* Botões de Timeframe */}
            <div className="flex items-center gap-1 bg-[#161b22] p-1 rounded-xl border border-white/5">
              {(['1m', '5m', '15m'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTf(tf)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black transition-all ${
                    selectedTf === tf
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30 scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tf.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEGENDA DAS LINHAS INSTITUCIONAIS DESENHADAS */}
      {analysis && (
        <div className="px-3.5 py-1.5 bg-[#0d1117]/95 border-b border-white/5 flex items-center justify-between text-[11px] font-mono flex-wrap gap-2 text-slate-300">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-2.5 h-0.5 bg-amber-400 inline-block" />
              Entrada: {analysis.entryPrice}
            </span>
            <span className="flex items-center gap-1.5 text-rose-400 font-bold">
              <span className="w-2.5 h-0.5 bg-rose-500 inline-block" />
              Stop Loss: {analysis.stopLoss}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" />
              Alvo TP1: {analysis.takeProfit1}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <span className="w-2.5 h-0.5 bg-emerald-500 inline-block" />
              Alvo TP2: {analysis.takeProfit2}
            </span>
          </div>

          <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">
            Linhas traçadas pelo motor EGGY SMC
          </span>
        </div>
      )}

      {/* ÁREA DE RENDERIZAÇÃO DO CANVAS (LIGHTWEIGHT-CHARTS) */}
      <div
        ref={chartContainerRef}
        className="w-full relative"
        style={{ minHeight: `${height}px` }}
      />

      {/* RODAPÉ DO GRÁFICO: STATUS AO VIVO */}
      <div className="px-3.5 py-1.5 bg-[#0d1117]/80 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Candlestick Engine TradingView • Atualização ao vivo (1s)</span>
        </span>
        <span className="text-amber-400/80 font-bold">
          Sessão: {asset.sessions}
        </span>
      </div>
    </div>
  );
};
