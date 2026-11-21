export type AssetType = 'forex' | 'crypto' | 'stocks' | 'indices' | 'commodities';

export type Timeframe = '1m' | '2m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '3h' | '4h' | '1D' | '1S' | '1M';

export type AnalysisType = 'Técnica' | 'Fundamentalista' | 'SMC (Smart Money)';

export type MarketSession = 'Londres' | 'Nova Iorque' | 'Ásia (Tóquio/Sydney)' | 'Global 24/7' | 'B3 / São Paulo';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  subType?: 'major' | 'minor' | 'exotic' | 'crypto' | 'tech' | 'b3' | 'metal' | 'energy' | 'agriculture';
  sessions: string; // e.g. "Sessão Londres / Nova Iorque"
  basePrice: number;
  decimals: number;
  pipSize: number;
  unit?: string;
  tag?: string;
  activeSessions?: ('London' | 'New York' | 'Asia' | '24/7')[];
}

export type SignalDirection = 'COMPRA FORTE' | 'COMPRA' | 'VENDA' | 'VENDA FRACA' | 'NEUTRO';

export type NewsImpact = 'Baixo' | 'Médio' | 'Alto';

export interface EconomicEvent {
  id: string;
  day: 'today' | 'tomorrow';
  timeAngola: string; // ex: "14:30" (GMT+1)
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'OIL' | 'GLOBAL';
  title: string;
  impact: NewsImpact;
  forecast: string;
  previous: string;
  actual?: string;
  affectedCurrencies: string[];
  affectedAssets: string[];
  fundamentalTip: string;
}

export interface FundamentalAnalysis {
  sentiment: 'Positivo' | 'Negativo' | 'Neutro';
  headline: string;
  summary: string; // 2-3 linhas em português simples
  impactRule: string; // ex: "CPI veio mais alto que esperado = Dólar sobe = Mau para OURO, cuidado com COMPRA"
}

export interface NewsFilterResult {
  isBlocked: boolean;
  warningMessage?: string;
  eventTitle?: string;
  eventTime?: string;
  impact?: NewsImpact;
}

export interface AnalysisResult {
  id: string;
  asset: Asset;
  timeframe: Timeframe;
  analysisType: AnalysisType;
  timestamp: string;
  angolaDate?: string;
  angolaTime?: string;
  angolaFullHeader?: string;
  angolaCardHeader?: string;
  direction: SignalDirection;
  currentPrice: number;
  entryPrice: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  riskReward: string;
  signalStrength: number; // 0 to 100%
  confidence: string; // "Alta", "Média", "Baixa"
  explanation: string;
  indicators: string[];
  confluences: {
    name: string;
    status: 'bullish' | 'bearish' | 'neutral';
    detail: string;
  }[];
  eggyLogic: {
    springSweep: boolean;
    orderBlockConfirmed: boolean;
    fvgMitigation: boolean;
    rsiStatus: string;
    verdict: string;
  };
  fundamentalAnalysis?: FundamentalAnalysis;
  newsFilter?: NewsFilterResult;
}

export interface UserCredits {
  pro: number;
  simple: number;
}
