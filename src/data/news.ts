import { EconomicEvent, NewsFilterResult, FundamentalAnalysis, Asset } from '../types';
import { getAngolaDateTime } from '../lib/dateUtils';

export const ECONOMIC_EVENTS: EconomicEvent[] = [
  // ==================== HOJE ====================
  {
    id: 'news-today-1',
    day: 'today',
    timeAngola: '10:00',
    currency: 'EUR',
    title: 'PMI Manufatura Zona Euro',
    impact: 'Médio',
    forecast: '46.0',
    previous: '45.8',
    actual: '45.9',
    affectedCurrencies: ['EUR'],
    affectedAssets: ['EURUSD', 'EURGBP', 'EURJPY'],
    fundamentalTip: 'PMI abaixo de 50 aponta contração na indústria europeia, mantendo o Euro pressionado.'
  },
  {
    id: 'news-today-2',
    day: 'today',
    timeAngola: '13:30',
    currency: 'EUR',
    title: 'Taxa de Juro do BCE (Decisão Oficial)',
    impact: 'Alto',
    forecast: '3.25%',
    previous: '3.40%',
    actual: '3.25%',
    affectedCurrencies: ['EUR', 'USD'],
    affectedAssets: ['EURUSD', 'EURGBP', 'EURJPY', 'DAX'],
    fundamentalTip: 'Corte de taxa enfraquece o Euro a curto prazo; manutenção dá suporte temporário.'
  },
  {
    id: 'news-today-3',
    day: 'today',
    timeAngola: '14:30',
    currency: 'USD',
    title: 'CPI EUA (Inflação Anual)',
    impact: 'Alto',
    forecast: '2.6%',
    previous: '2.4%',
    affectedCurrencies: ['USD', 'GLOBAL'],
    affectedAssets: ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'BTC', 'ETH', 'US30', 'NAS100', 'SPX500'],
    fundamentalTip: 'CPI mais alto que esperado fortalece o Dólar e derruba o Ouro e Cripto.'
  },
  {
    id: 'news-today-4',
    day: 'today',
    timeAngola: '14:30',
    currency: 'USD',
    title: 'NFP EUA (Emprego Não-Agrícola)',
    impact: 'Alto',
    forecast: '175K',
    previous: '223K',
    affectedCurrencies: ['USD', 'GLOBAL'],
    affectedAssets: ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'BTC', 'US30', 'NAS100'],
    fundamentalTip: 'Criação forte de empregos afasta cortes agressivos de juros pelo FED.'
  },
  {
    id: 'news-today-5',
    day: 'today',
    timeAngola: '15:30',
    currency: 'OIL',
    title: 'Estoques de Petróleo Bruto EIA',
    impact: 'Alto',
    forecast: '-1.2M',
    previous: '+2.1M',
    affectedCurrencies: ['OIL', 'USD', 'CAD'],
    affectedAssets: ['USOIL', 'BRENT', 'USDCAD'],
    fundamentalTip: 'Queda nos estoques indica demanda firme e puxa os preços do Petróleo para cima.'
  },
  {
    id: 'news-today-6',
    day: 'today',
    timeAngola: '16:00',
    currency: 'USD',
    title: 'PMI Manufatura & Serviços S&P EUA',
    impact: 'Alto',
    forecast: '51.5',
    previous: '50.4',
    affectedCurrencies: ['USD'],
    affectedAssets: ['EURUSD', 'GBPUSD', 'XAUUSD', 'BTC', 'US30', 'NAS100'],
    fundamentalTip: 'Dados de PMI resilientes nos EUA mantêm rendimentos dos Treasuries em alta.'
  },
  {
    id: 'news-today-7',
    day: 'today',
    timeAngola: '19:00',
    currency: 'USD',
    title: 'Decisão de Taxa de Juro do FED',
    impact: 'Alto',
    forecast: '4.75%',
    previous: '4.75%',
    affectedCurrencies: ['USD', 'GLOBAL'],
    affectedAssets: ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'BTC', 'ETH', 'US30', 'NAS100'],
    fundamentalTip: 'A postura do FED dita a liquidez institucional mundial para os próximos meses.'
  },
  {
    id: 'news-today-8',
    day: 'today',
    timeAngola: '20:30',
    currency: 'USD',
    title: 'Ata da Reunião do FOMC',
    impact: 'Alto',
    forecast: 'Neutro',
    previous: 'Neutro',
    affectedCurrencies: ['USD'],
    affectedAssets: ['EURUSD', 'XAUUSD', 'BTC', 'NAS100'],
    fundamentalTip: 'Discursos de dirigentes do FED costumam provocar repiques súbitos e caça de liquidez.'
  },

  // ==================== AMANHÃ ====================
  {
    id: 'news-tom-1',
    day: 'tomorrow',
    timeAngola: '08:00',
    currency: 'GBP',
    title: 'PIB do Reino Unido (Trimestral)',
    impact: 'Médio',
    forecast: '0.2%',
    previous: '0.1%',
    affectedCurrencies: ['GBP'],
    affectedAssets: ['GBPUSD', 'EURGBP', 'GBPJPY'],
    fundamentalTip: 'Crescimento tímido no Reino Unido limita a capacidade do BoE de manter juros altos.'
  },
  {
    id: 'news-tom-2',
    day: 'tomorrow',
    timeAngola: '10:00',
    currency: 'EUR',
    title: 'IPC da Zona Euro (HICP Anual)',
    impact: 'Médio',
    forecast: '2.0%',
    previous: '2.0%',
    affectedCurrencies: ['EUR'],
    affectedAssets: ['EURUSD', 'EURGBP', 'EURJPY'],
    fundamentalTip: 'Inflação próxima da meta de 2% abre espaço para novas descidas de juros pelo BCE.'
  },
  {
    id: 'news-tom-3',
    day: 'tomorrow',
    timeAngola: '14:30',
    currency: 'USD',
    title: 'PIB dos EUA (Anualizado 3º Trimestre)',
    impact: 'Alto',
    forecast: '2.8%',
    previous: '3.0%',
    affectedCurrencies: ['USD', 'GLOBAL'],
    affectedAssets: ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'BTC', 'US30', 'NAS100'],
    fundamentalTip: 'PIB sólido sustenta o Dólar no topo e trava euforia em ativos de refúgio.'
  },
  {
    id: 'news-tom-4',
    day: 'tomorrow',
    timeAngola: '15:00',
    currency: 'USD',
    title: 'PMI ISM do Setor de Serviços EUA',
    impact: 'Alto',
    forecast: '54.2',
    previous: '54.9',
    affectedCurrencies: ['USD'],
    affectedAssets: ['EURUSD', 'XAUUSD', 'US30', 'NAS100', 'BTC'],
    fundamentalTip: 'O setor de serviços representa mais de 70% da economia norte-americana.'
  },
  {
    id: 'news-tom-5',
    day: 'tomorrow',
    timeAngola: '16:30',
    currency: 'OIL',
    title: 'Relatório Mensal da OPEP sobre Petróleo',
    impact: 'Médio',
    forecast: 'Estável',
    previous: 'Corte de Cotas',
    affectedCurrencies: ['OIL', 'USD'],
    affectedAssets: ['USOIL', 'BRENT'],
    fundamentalTip: 'Decisões da OPEP+ têm impacto direto na economia angolana e receitas de hidrocarbonetos.'
  }
];

/**
 * Verifica se um ativo está sob influência de uma notícia
 */
export function isAssetAffectedByEvent(assetSymbol: string, event: EconomicEvent): boolean {
  const sym = assetSymbol.toUpperCase();
  
  // Verificação direta na lista de ativos afetados
  if (event.affectedAssets.some(a => a.toUpperCase() === sym)) {
    return true;
  }

  // Notícias de USD afetam todos os pares de moedas com USD, Metais, Cripto e Índices dos EUA
  if (event.currency === 'USD') {
    if (sym.includes('USD') || sym === 'XAUUSD' || sym === 'BTC' || sym === 'ETH' || 
        sym.includes('US30') || sym.includes('NAS') || sym.includes('SPX')) {
      return true;
    }
  }

  // Notícias de EUR afetam pares com EUR
  if (event.currency === 'EUR' && sym.includes('EUR')) {
    return true;
  }

  // Notícias de GBP afetam pares com GBP
  if (event.currency === 'GBP' && sym.includes('GBP')) {
    return true;
  }

  // Notícias de OIL afetam USOIL, BRENT e USDCAD
  if (event.currency === 'OIL' && (sym.includes('OIL') || sym.includes('BRENT') || sym === 'USDCAD')) {
    return true;
  }

  return false;
}

/**
 * Converte string "HH:MM" para minutos desde as 00:00
 */
export function timeToMinutes(timeStr: string): number {
  const parts = timeStr.split(':').map(Number);
  if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) return 0;
  return parts[0] * 60 + parts[1];
}

/**
 * Filtro EGGY: Verifica se há notícia de Alto Impacto
 * nos próximos 60 minutos ou nos últimos 30 minutos para o ativo.
 */
export function checkHighImpactNewsForAsset(
  asset: Asset,
  simulatedTimeStr?: string
): NewsFilterResult {
  const angolaTimeStr = simulatedTimeStr || getAngolaDateTime().time;
  const currentMinutes = timeToMinutes(angolaTimeStr);

  const todayHighEvents = ECONOMIC_EVENTS.filter(
    e => e.day === 'today' && e.impact === 'Alto'
  );

  for (const event of todayHighEvents) {
    if (!isAssetAffectedByEvent(asset.symbol, event)) {
      continue;
    }

    const eventMinutes = timeToMinutes(event.timeAngola);

    // Janela: 60 min ANTES até 30 min DEPOIS da notícia
    // Próximos 60 min: eventMinutes >= currentMinutes e eventMinutes - currentMinutes <= 60
    // Últimos 30 min: currentMinutes >= eventMinutes e currentMinutes - eventMinutes <= 30
    const isUpcomingIn60Min = eventMinutes >= currentMinutes && (eventMinutes - currentMinutes) <= 60;
    const isPastIn30Min = currentMinutes >= eventMinutes && (currentMinutes - eventMinutes) <= 30;

    if (isUpcomingIn60Min || isPastIn30Min) {
      const shortTitle = event.title.split('(')[0].trim();
      return {
        isBlocked: true,
        eventTitle: shortTitle,
        eventTime: event.timeAngola,
        impact: event.impact,
        warningMessage: `⚠️ ATENÇÃO: Tem ${shortTitle} às ${event.timeAngola}. Espera a notícia passar. Sinal bloqueado por segurança.`
      };
    }
  }

  return { isBlocked: false };
}

/**
 * Gera Análise Fundamentalista em português simples para o resultado da IA
 */
export function generateFundamentalAnalysis(asset: Asset): FundamentalAnalysis {
  const sym = asset.symbol.toUpperCase();

  if (sym.includes('XAU') || sym.includes('GOLD')) {
    return {
      sentiment: 'Negativo',
      headline: 'Dólar Forte & Expectativa de Juros Altos nos EUA',
      summary: 'Os dados recentes de inflação (CPI) vieram acima das projeções, sustentando os rendimentos dos títulos do Tesouro dos EUA. Quando o Dólar se fortalece e as taxas sobem, o Ouro perde atratividade porque não paga juros.',
      impactRule: 'CPI veio mais alto que esperado = Dólar sobe = Mau para OURO, cuidado com COMPRA'
    };
  }

  if (sym === 'EURUSD') {
    return {
      sentiment: 'Negativo',
      headline: 'Divergência Monetária BCE vs FED',
      summary: 'O Banco Central Europeu sinaliza novos cortes de juros perante a fraqueza industrial da Zona Euro, enquanto a economia americana segue aquecida. Essa disparidade favorece a saída de capital do Euro em direção ao Dólar.',
      impactRule: 'BCE corta juros + FED segura taxa = Euro perde força frente ao Dólar'
    };
  }

  if (sym === 'BTC' || sym === 'ETH' || asset.type === 'crypto') {
    return {
      sentiment: 'Positivo',
      headline: 'Entradas Institucionais & Cenário Pós-Halving',
      summary: 'Apesar da cautela com taxas de juros no curto prazo, os fluxos de ETFs à vista e a acumulação de baleias mantêm a estrutura macro favorável. Ativo reage com alta volatilidade a dados de inflação.',
      impactRule: 'Inflação controlada = Liquidez aumenta = Excelente para BITCOIN e CRIPTO'
    };
  }

  if (sym.includes('OIL') || sym.includes('BRENT')) {
    return {
      sentiment: 'Positivo',
      headline: 'Queda de Estoques EIA & Disciplina da OPEP+',
      summary: 'Os relatórios de estoques nos EUA apontam consumo consistente com restrição contínua na produção da OPEP. Cenário positivo para o barril de crude e fundamental para a balança comercial angolana.',
      impactRule: 'Estoques caem + OPEP corta = Petróleo em alta'
    };
  }

  if (sym.includes('US30') || sym.includes('NAS') || sym.includes('SPX') || asset.type === 'indices') {
    return {
      sentiment: 'Neutro',
      headline: 'Temporada de Balanços vs Política Restritiva',
      summary: 'As grandes empresas de tecnologia continuam a apresentar lucros sólidos, mas os múltiplos de avaliação estão esticados perante juros reais elevados. Mercado institucional opera com cautela em topos históricos.',
      impactRule: 'Juros altos nos EUA = Pressão sobre ações de tecnologia do Nasdaq'
    };
  }

  return {
    sentiment: 'Neutro',
    headline: 'Fluxo Institucional Equilibrado',
    summary: `O ativo ${asset.name} opera dentro das médias de volatilidade da ${asset.sessions}. Ausência de catalisadores macroeconómicos disruptivos nas últimas horas permite que a análise técnica SMC reine sem ruído.`,
    impactRule: 'Sem notícias de alto impacto = Segue rigorosamente a análise técnica EGGY'
  };
}

/**
 * Mensagem para o banner no topo do Dashboard
 */
export function getTodayDashboardAlert(): { hasAlert: boolean; bannerText: string; time: string; event: string } {
  return {
    hasAlert: true,
    time: '14:30',
    event: 'NFP EUA',
    bannerText: 'Hoje 14:30 - NFP EUA - Impacto Alto - Evita operar OURO e EURUSD'
  };
}
