'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Compass, Sparkles, ArrowRight, Wallet, Check } from 'lucide-react';
import CreditCard from '@/components/CreditCard';

export default function Home() {
  return (
    <div className="font-sans min-h-screen text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Premium Glassmorphic Header */}
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
          
          <Link
            href="/dashboard"
            className="px-4 py-1.5 text-xs font-bold rounded-lg border border-white/10 bg-slate-900/60 hover:bg-slate-800/80 hover:text-white hover:border-white/20 transition duration-300 flex items-center space-x-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
          >
            <span>Enter Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Hero Text */}
        <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center justify-center lg:justify-start space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 self-center lg:self-start">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Zero Banking Credentials • Privacy First Approach</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] text-white">
            Unlock the hidden perks of your{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              Credit Cards
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
            CardNest aggregates cashback rates, airport lounge permissions, dining discounts, and milestone rewards across all your cards in one high-fidelity visual dashboard. Manual selection means absolute privacy.
          </p>

          {/* Core Benefit Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300 max-w-lg mx-auto lg:mx-0 text-left">
            <div className="flex items-center space-x-2.5">
              <div className="p-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="font-medium">No Card Numbers required</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="p-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="font-medium">Airport Lounge visits details</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="p-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="font-medium">Aggregated cashback search</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <div className="p-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Check className="h-3.5 w-3.5" />
              </div>
              <span className="font-medium">1-Click Offline Demo Mode</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold hover:from-indigo-500 hover:to-indigo-400 transition duration-300 text-center shadow-[0_4px_24px_rgba(99,102,241,0.35)] flex items-center justify-center space-x-2 border border-indigo-400/20"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="px-6 py-3 rounded-xl bg-slate-900 border border-white/5 text-slate-300 font-semibold hover:bg-slate-800 hover:text-white transition duration-300 text-center"
            >
              Learn How It Works
            </a>
          </div>
        </div>

        {/* Right Side Visual Float Cards Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-8 lg:mt-0">
          {/* Neon mesh background highlights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />
          <div className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />

          {/* Floating Stack */}
          <div className="flex flex-col space-y-4 relative w-full items-center">
            {/* Floating Infinia Card */}
            <div className="animate-float z-10 hover:z-30 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <CreditCard
                id="landing-inf"
                bank="HDFC Bank"
                variant="Infinia"
                network="Visa"
                nickname="Primary Vault"
                active={true}
              />
            </div>

            {/* Floating SBI Cashback Card */}
            <div className="animate-float-delayed -mt-16 ml-8 z-20 hover:z-30 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <CreditCard
                id="landing-sbi"
                bank="SBI Card"
                variant="Cashback"
                network="Visa"
                nickname="Online Groceries"
                active={false}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Feature section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-white/5 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            Designed for convenience. Engineered for privacy.
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-3 leading-relaxed">
            CardNest provides all the benefits of credit trackers with none of the security liabilities. You maintain complete sovereignty over your data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel border border-white/5 rounded-2xl p-6 flex flex-col space-y-4 hover:border-white/10 transition-colors duration-300">
            <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Absolute Sovereignty</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We never prompt for account numbers, passwords, OTPs, or API integrations. You manually select card variants, keeping your digital footprint 100% sterile.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel border border-white/5 rounded-2xl p-6 flex flex-col space-y-4 hover:border-white/10 transition-colors duration-300">
            <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Unified Perks Explorer</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              No need to scour bank brochures. Aggregate your lounge availability, reward multipliers, dining tables, and milestone waiver statuses inside a single tabbed panel.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel border border-white/5 rounded-2xl p-6 flex flex-col space-y-4 hover:border-white/10 transition-colors duration-300">
            <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Spectacular Visuals</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Experience dynamic UI reflections, dark theme layers, custom SVGs, contactless glows, and smooth transitions that render credit cards like high-end artwork.
            </p>
          </div>
        </div>
      </section>

      {/* Modern minimal footer */}
      <footer className="border-t border-white/5 bg-slate-950/40 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <Wallet className="h-4 w-4 text-slate-600" />
            <span>© {new Date().getFullYear()} CardNest. Built with Next.js & Tailwind.</span>
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-slate-400 transition cursor-help">Privacy-First</span>
            <span className="hover:text-slate-400 transition cursor-help">Local Cache Only</span>
            <span className="hover:text-slate-400 transition cursor-help">Secure TLS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
