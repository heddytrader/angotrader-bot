'use client';

import AuthView from '@/components/AuthView'
import React, { useState, useEffect } from 'react';
import { UserCredits, AnalysisResult, Asset } from '../types';
import { ALL_ASSETS } from '../data/assets';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { NavigationDrawer } from '../components/NavigationDrawer';
import { CreditModal } from '../components/CreditModal';
import { DashboardView } from '../components/pages/DashboardView';
import { AnalysisView } from '../components/pages/AnalysisView';
import { SignalsView } from '../components/pages/SignalsView';
import { PremiumSignalsView } from '../components/pages/PremiumSignalsView';
import { LiveTradingView } from '../components/pages/LiveTradingView';
import { HeatmapView } from '../components/pages/HeatmapView';
import { AcademyView } from '../components/pages/AcademyView';
import { CommunityView } from '../components/pages/CommunityView';
import { ProfileView } from '../components/pages/ProfileView';
import { NewsView } from '../components/pages/NewsView';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('nova-analise');
  const [credits, setCredits] = useState<UserCredits>({ pro: 3, simple: 6 });
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState<string>('edgar84inacio@gmail.com');
  const [isOwner, setIsOwner] = useState<boolean>(true);
  const [recentAnalyses, setRecentAnalyses] = useState<AnalysisResult[]>([]);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Verificar Dono e carregar do localStorage
  useEffect(() => {
    try {
      const isLocalhost = typeof window !== 'undefined' && (
        window.location.host.includes('localhost:3000') ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
      );

      const savedEmail = localStorage.getItem('angotrader_user_email');
      const email = savedEmail || (isLocalhost ? 'edgar84inacio@gmail.com' : 'edgar84inacio@gmail.com');
      setUserEmail(email);

      const ownerStatus = email.trim().toLowerCase() === 'edgar84inacio@gmail.com' || isLocalhost;
      setIsOwner(ownerStatus);

      const savedCredits = localStorage.getItem('angotrader_credits');
      if (savedCredits) {
        setCredits(JSON.parse(savedCredits));
      } else {
        localStorage.setItem('angotrader_credits', JSON.stringify({ pro: 3, simple: 6 }));
      }

      const savedAnalyses = localStorage.getItem('angotrader_analyses');
      if (savedAnalyses) {
        setRecentAnalyses(JSON.parse(savedAnalyses));
      }
    } catch (e) {
      console.error('Erro ao ler localStorage', e);
    }
    const sess = localStorage.getItem('angotrader_session')
      if (sess) { const s = JSON.parse(sess); setIsLoggedIn(true); setUserName(s.name); setUserEmail(s.email) }
      setLoaded(true);
  }, []);

  // Atualizar email e recalcular Dono
  const handleUpdateEmail = (newEmail: string) => {
    setUserEmail(newEmail);
    try {
      localStorage.setItem('angotrader_user_email', newEmail);
    } catch (e) {}
    const isLocalhost = typeof window !== 'undefined' && (
      window.location.host.includes('localhost:3000') ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    );
    setIsOwner(newEmail.trim().toLowerCase() === 'edgar84inacio@gmail.com' || isLocalhost);
  };

  // Salvar créditos no localStorage
  const updateCredits = (newCredits: UserCredits) => {
    setCredits(newCredits);
    try {
      localStorage.setItem('angotrader_credits', JSON.stringify(newCredits));
    } catch (e) {
      console.error('Erro ao salvar créditos', e);
    }
  };

  // Deduzir 1 crédito por análise (DONO NUNCA GASTA)
  const handleDeductCredit = (isPro: boolean): boolean => {
    if (isOwner) {
      // Dono com plano infinito: NÃO desconta nada, fica sempre infinito!
      return true;
    }
    if (isPro) {
      if (credits.pro <= 0) return false;
      updateCredits({ ...credits, pro: credits.pro - 1 });
      return true;
    } else {
      if (credits.simple <= 0) return false;
      updateCredits({ ...credits, simple: credits.simple - 1 });
      return true;
    }
  };

  // Adicionar créditos
  const handleAddCredits = (pro: number, simple: number) => {
    updateCredits({
      pro: credits.pro + pro,
      simple: credits.simple + simple
    });
  };

  // Resetar créditos para o inicial (3 PRO + 6 Simples)
  const handleResetCredits = () => {
    updateCredits({ pro: 3, simple: 6 });
  };

  // Salvar nova análise
  const handleSaveAnalysis = (analysis: AnalysisResult) => {
    setRecentAnalyses((prev) => {
      const updated = [analysis, ...prev.filter(a => a.id !== analysis.id)].slice(0, 20);
      try {
        localStorage.setItem('angotrader_analyses', JSON.stringify(updated));
      } catch (e) {
        console.error('Erro ao salvar análises', e);
      }
      return updated;
    });
  };

  // Selecionar ativo vindo do Live ou Heatmap
  const handleSelectAssetForAnalysis = (asset: Asset) => {
    setActiveTab('nova-analise');
  };

  if (!loaded) return null
  if (!isLoggedIn) return <AuthView onLogin={(name, email) => { setUserName(name); setUserEmail(email); setIsLoggedIn(true) }} />

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Header Principal */}
      <Header
        credits={credits}
        onOpenCreditModal={() => setIsCreditModalOpen(true)}
        onNavigate={(tab) => setActiveTab(tab)}
        isOwner={isOwner}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 px-3 sm:px-6 pt-4 pb-12 max-w-6xl mx-auto w-full">
        {activeTab === 'dashboard' && (
          <DashboardView
            credits={credits}
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenCreditModal={() => setIsCreditModalOpen(true)}
            recentAnalyses={recentAnalyses}
          />
        )}

        {activeTab === 'nova-analise' && (
          <AnalysisView
            credits={credits}
            onDeductCredit={handleDeductCredit}
            onOpenCreditModal={() => setIsCreditModalOpen(true)}
            onSaveAnalysis={handleSaveAnalysis}
            recentAnalyses={recentAnalyses}
            isOwner={isOwner}
          />
        )}

        {activeTab === 'signals' && (
          <SignalsView
            analyses={recentAnalyses}
            onSelectSignal={(sig) => {
              setActiveTab('nova-analise');
            }}
            onNavigateToAnalysis={() => setActiveTab('nova-analise')}
          />
        )}

        {activeTab === 'premium' && (
          <PremiumSignalsView
            onOpenCreditModal={() => setIsCreditModalOpen(true)}
            onNavigateToAnalysis={() => setActiveTab('nova-analise')}
          />
        )}

        {activeTab === 'live' && (
          <LiveTradingView
            onSelectAssetForAnalysis={handleSelectAssetForAnalysis}
          />
        )}

        {activeTab === 'heatmap' && (
          <HeatmapView
            onSelectAssetForAnalysis={handleSelectAssetForAnalysis}
          />
        )}

        {activeTab === 'academy' && <AcademyView />}

        {activeTab === 'community' && <CommunityView />}

        {activeTab === 'profile' && (
          <ProfileView
            credits={credits}
            onOpenCreditModal={() => setIsCreditModalOpen(true)}
            recentAnalyses={recentAnalyses}
            onResetCredits={handleResetCredits}
            isOwner={isOwner}
            userEmail={userEmail}
            onUpdateEmail={handleUpdateEmail}
          />
        )}

        {activeTab === 'news' && (
          <NewsView
            onNavigateToAnalysisWithAsset={(symbol) => {
              setActiveTab('nova-analise');
            }}
          />
        )}
      </main>

      {/* Navegação Inferior Mobile */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenMoreMenu={() => setIsNavDrawerOpen(true)}
      />

      {/* Gaveta de Navegação das 10 Páginas */}
      <NavigationDrawer
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        proCredits={credits.pro}
        isOwner={isOwner}
      />

      {/* Modal de Créditos */}
      <CreditModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
        credits={credits}
        onAddCredits={handleAddCredits}
        isOwner={isOwner}
      />
    </div>
  );
}