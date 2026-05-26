/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Wallet,
  Sparkles,
  AlertCircle,
  FolderLock,
  ArrowLeft
} from 'lucide-react';
import CreditCard from '@/components/CreditCard';
import AddCardDialog from '@/components/AddCardDialog';
import BenefitsConsole, { BenefitItem } from '@/components/BenefitsConsole';

interface CardItem {
  id?: string;
  _id?: string;
  bank: string;
  variant: string;
  network: 'Visa' | 'Mastercard' | 'RuPay' | 'Amex';
  nickname?: string;
  createdAt: string;
}

export default function Dashboard() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [benefits, setBenefits] = useState<BenefitItem[]>([]);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [isLoadingBenefits, setIsLoadingBenefits] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeSection, setActiveSection] = useState<'wallet' | 'explore'>('wallet');

  // Fetch all added cards
  const fetchCards = async () => {
    setIsLoadingCards(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/cards');
      if (!res.ok) throw new Error('Failed to fetch cards');
      const json = await res.json();
      setCards(json.data || []);
      setIsDemoMode(json.source === 'mock');
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not load cards. Please refresh.');
    } finally {
      setIsLoadingCards(false);
    }
  };

  // Fetch benefits (can filter by active card)
  const fetchBenefits = async (cardId: string | null = null) => {
    setIsLoadingBenefits(true);
    try {
      let url = '/api/benefits';
      if (cardId) {
        url += `?cardId=${cardId}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch benefits');
      const json = await res.json();
      setBenefits(json.data || []);
    } catch (err) {
      console.error('Benefits fetch error:', err);
    } finally {
      setIsLoadingBenefits(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchCards();
  }, []);

  // Sync benefits when cards list or active selection changes
  useEffect(() => {
    fetchBenefits(activeCardId);
  }, [cards, activeCardId]);

  // Handle card deletion
  const handleDeleteCard = async (id: string) => {
    try {
      const res = await fetch(`/api/cards/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete card');
      
      // If deleted card was active, reset selection
      if (activeCardId === id) {
        setActiveCardId(null);
      }
      
      fetchCards();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to delete card');
    }
  };

  // Toggle selection
  const handleSelectCard = (id: string) => {
    if (activeCardId === id) {
      setActiveCardId(null); // Deselect to show all
    } else {
      setActiveCardId(id);
      setActiveSection('explore'); // Automatically switch to explore tab to see benefits!
    }
  };

  return (
    <div className="font-sans min-h-screen text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="p-2 rounded-xl bg-indigo-600/10 border border-indigo-500/20 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/30 transition-all duration-300">
              <Wallet className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              CardNest
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Demo badge indicator */}
            {isDemoMode && (
              <span className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 animate-pulse">
                <Sparkles className="h-3 w-3" />
                <span>Demo Mode</span>
              </span>
            )}
            
            <Link
              href="/"
              className="px-4 py-1.5 text-xs font-bold rounded-lg border border-white/5 bg-slate-900/60 hover:bg-slate-800/80 hover:text-white transition duration-300 flex items-center space-x-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard Portal */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-8 flex flex-col space-y-8">
        
        {/* Demo Mode Information Banner */}
        {isDemoMode && (
          <div className="w-full glass-panel rounded-2xl border border-amber-500/20 bg-amber-950/10 p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-[0_4px_30px_rgba(245,158,11,0.05)]">
            <div className="flex items-start space-x-3.5">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-0.5 sm:mt-0 shrink-0">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
                  <span>Running in Offline Demo Mode</span>
                  <span className="text-[10px] bg-slate-800 text-amber-300/80 px-2 py-0.25 rounded border border-white/5 uppercase">
                    local only
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  Clerk Auth and MongoDB credentials were not found in your <code className="bg-black/40 text-amber-300 px-1 py-0.5 rounded font-mono text-[10px]">.env.local</code>. CardNest is operating securely in demo mode, persisting your manually entered cards in browser <code className="bg-black/40 text-amber-300 px-1 py-0.5 rounded font-mono text-[10px]">localStorage</code>.
                </p>
              </div>
            </div>
            
            <div className="text-[11px] text-slate-500 italic flex items-center space-x-1 shrink-0">
              <FolderLock className="h-3.5 w-3.5 text-slate-600" />
              <span>Zero external uploads</span>
            </div>
          </div>
        )}

        {/* Dashboard Title & Quick Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              My Cards Nest
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Select a card below to focus on its specific perks, or click elsewhere to view aggregated benefits.
            </p>
          </div>
        </div>

        {/* Sections Selector Tabs (Segmented Control) */}
        <div className="flex border-b border-white/5 pb-2">
          <div className="flex space-x-1.5 p-1 bg-slate-950/60 border border-white/10 rounded-xl w-fit">
            <button
              onClick={() => setActiveSection('wallet')}
              className={`px-6 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeSection === 'wallet'
                  ? 'bg-indigo-600 text-white shadow-[0_2px_12px_rgba(99,102,241,0.35)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              My Wallet
            </button>
            <button
              onClick={() => setActiveSection('explore')}
              className={`px-6 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeSection === 'explore'
                  ? 'bg-indigo-600 text-white shadow-[0_2px_12px_rgba(99,102,241,0.35)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Explore Perks
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-sm text-red-400 flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Section 1: Wallet Section */}
        {activeSection === 'wallet' && (
          <div className="w-full flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                My Wallet ({cards.length} cards)
              </span>
              {activeCardId && (
                <button
                  onClick={() => setActiveCardId(null)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline transition"
                >
                  Clear selection (Show all)
                </button>
              )}
            </div>

            {isLoadingCards ? (
              // Cards skeletons
              <div className="flex flex-wrap gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="h-48 w-80 rounded-2xl border border-white/5 bg-slate-900/10 animate-shimmer" />
                ))}
              </div>
            ) : cards.length === 0 ? (
              // Empty wallet state
              <div
                onClick={() => setIsAddOpen(true)}
                className="group border border-dashed border-white/10 hover:border-indigo-500/40 bg-slate-900/10 hover:bg-slate-900/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer transition-all duration-300 max-w-sm"
              >
                <div className="p-3.5 rounded-full bg-slate-950/80 border border-white/5 text-slate-400 group-hover:text-indigo-400 group-hover:scale-105 transition-all duration-300">
                  <Plus className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200">No cards in your nest</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Click here to manually select credit cards variants and unlock catalog benefit details instantly!
                  </p>
                </div>
              </div>
            ) : (
              // Grid of credit cards
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cards.map((card) => (
                  <CreditCard
                    key={card.id || card._id}
                    id={card.id || card._id || ''}
                    bank={card.bank}
                    variant={card.variant}
                    network={card.network}
                    nickname={card.nickname}
                    onDelete={handleDeleteCard}
                    onClick={() => handleSelectCard(card.id || card._id || '')}
                    active={activeCardId === (card.id || card._id)}
                  />
                ))}

                {/* Glowing empty quick-add slot card */}
                <div
                  onClick={() => setIsAddOpen(true)}
                  className="h-48 w-full md:w-80 border border-dashed border-white/10 hover:border-indigo-500/40 bg-slate-900/5 hover:bg-indigo-950/5 rounded-2xl flex flex-col items-center justify-center text-center p-6 cursor-pointer group transition-all duration-300 select-none"
                >
                  <div className="p-2 rounded-xl bg-slate-900 border border-white/5 text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/20 group-hover:scale-105 transition-all duration-300 shadow-inner">
                    <Plus className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition duration-300 mt-3">
                    Add another card variant
                  </span>
                  <span className="text-[10px] text-slate-600 mt-1 uppercase tracking-widest font-mono">
                    manual entry
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section 2: Explore Section */}
        {activeSection === 'explore' && (
          <div className="pt-2 animate-fade-in">
            <BenefitsConsole benefits={benefits} isLoading={isLoadingBenefits} />
          </div>
        )}

      </main>

      {/* Modern minimal footer */}
      <footer className="border-t border-white/5 bg-slate-950/40 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <Wallet className="h-4 w-4 text-slate-600" />
            <span>© {new Date().getFullYear()} CardNest. Privacy-first benefit visuals.</span>
          </div>
          <div className="flex space-x-6 text-[10px] font-mono">
            <span>DATABASE: {isDemoMode ? 'LOCAL_STORAGE_MOCK' : 'MONGO_DB_ACTIVE'}</span>
            <span>AUTH: {isDemoMode ? 'CREDENTIAL_BYPASS' : 'CLERK_PROTECTED'}</span>
          </div>
        </div>
      </footer>

      {/* Floating Add Card Drawer */}
      <AddCardDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={fetchCards}
      />
    </div>
  );
}
