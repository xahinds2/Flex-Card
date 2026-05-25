import React, { useState } from 'react';
import {
  CreditCard,
  Gift,
  Utensils,
  Plane,
  Fuel,
  Compass,
  Search,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export interface BenefitItem {
  _id?: string;
  cardId: string;
  bank: string;
  variant: string;
  network: string;
  category: 'cashback' | 'lounge' | 'rewards' | 'dining' | 'fuel' | 'milestone';
  title: string;
  description: string;
  value: string;
  conditions?: string;
}

export interface BenefitsConsoleProps {
  benefits: BenefitItem[];
  isLoading: boolean;
}

const CATEGORIES = [
  { id: 'all', label: 'All Perks', icon: Compass, color: 'text-indigo-400 border-indigo-500' },
  { id: 'cashback', label: 'Cashback', icon: CreditCard, color: 'text-emerald-400 border-emerald-500' },
  { id: 'lounge', label: 'Lounge Access', icon: Plane, color: 'text-sky-400 border-sky-500' },
  { id: 'rewards', label: 'Rewards', icon: Gift, color: 'text-amber-400 border-amber-500' },
  { id: 'dining', label: 'Dining Offers', icon: Utensils, color: 'text-rose-400 border-rose-500' },
  { id: 'fuel', label: 'Fuel Waiver', icon: Fuel, color: 'text-teal-400 border-teal-500' },
  { id: 'milestone', label: 'Milestones', icon: AlertCircle, color: 'text-indigo-400 border-indigo-500' }
] as const;

export default function BenefitsConsole({ benefits, isLoading }: BenefitsConsoleProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering benefits
  const filteredBenefits = benefits.filter((b) => {
    const matchesTab = activeTab === 'all' || b.category === activeTab;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.conditions && b.conditions.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'cashback':
        return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', label: 'Cashback' };
      case 'lounge':
        return { bg: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-400', label: 'Lounge' };
      case 'rewards':
        return { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', label: 'Rewards' };
      case 'dining':
        return { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', label: 'Dining' };
      case 'fuel':
        return { bg: 'bg-teal-500/10', border: 'border-teal-500/20', text: 'text-teal-400', label: 'Fuel Waiver' };
      default:
        return { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400', label: 'Milestone' };
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-white/10 p-6 md:p-8 flex flex-col space-y-6">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center space-x-2">
            <Compass className="h-5 w-5 text-indigo-400" />
            <span>Benefits Explorer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Aggregate and filter perks across all credit cards in your wallet
          </p>
        </div>

        {/* Local Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search cashback, restaurants, airport lounges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950/60 border border-white/10 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition shadow-inner"
          />
        </div>
      </div>

      {/* Categories horizontal tabs */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-white/5 pb-2 -mx-6 px-6 md:mx-0 md:px-0">
        <div className="flex space-x-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-indigo-600/20 border-indigo-500/80 text-white shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                    : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Benefits Content */}
      {isLoading ? (
        // Grid skeleton loader
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-xl border border-white/5 animate-shimmer" />
          ))}
        </div>
      ) : filteredBenefits.length === 0 ? (
        // Empty state
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-white/5 rounded-xl bg-slate-950/20">
          <HelpCircle className="h-10 w-10 text-slate-600 animate-pulse" />
          <div>
            <h3 className="text-sm font-semibold text-slate-300">No matching benefits found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              {benefits.length === 0
                ? "You haven't added any cards to your wallet yet. Add credit cards to extract and aggregate their benefits instantly!"
                : "No benefits match your active category tab or search query filters. Try checking other tabs or expanding your query."}
            </p>
          </div>
        </div>
      ) : (
        // Cards/Grid Layout
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBenefits.map((benefit, index) => {
            const theme = getCategoryTheme(benefit.category);
            return (
              <div
                key={benefit._id || index}
                style={{
                  boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.2)'
                }}
                className="group relative rounded-xl p-5 border border-white/5 bg-slate-900/30 hover:bg-slate-900/50 hover:border-white/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Category Pill Flare */}
                <div className={`absolute top-0 right-0 h-1.5 w-16 rounded-bl-lg ${benefit.category === 'cashback' ? 'bg-emerald-500' : benefit.category === 'lounge' ? 'bg-sky-500' : benefit.category === 'rewards' ? 'bg-amber-500' : benefit.category === 'dining' ? 'bg-rose-500' : benefit.category === 'fuel' ? 'bg-teal-500' : 'bg-indigo-500'}`} />

                <div>
                  {/* Top line info */}
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${theme.bg} ${theme.text} border ${theme.border}`}>
                      {theme.label}
                    </span>

                    {/* Prominent glowing value badge */}
                    <span className={`text-sm font-bold font-mono tracking-tight text-right ${theme.text} drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]`}>
                      {benefit.value}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition duration-300 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Card Attribution Capsule & Conditions */}
                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-2 items-center justify-between">
                  {/* Card Badge capsule mimicking a small digital card */}
                  <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-white/10 text-[10px] font-medium text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span>{benefit.bank} {benefit.variant}</span>
                    <span className="text-[8px] text-slate-500 font-mono">({benefit.network})</span>
                  </div>

                  {benefit.conditions && (
                    <div className="text-[9px] text-slate-500 italic max-w-full flex items-center space-x-1 truncate" title={`Terms: ${benefit.conditions}`}>
                      <AlertCircle className="h-3 w-3 text-slate-600 shrink-0" />
                      <span className="truncate">{benefit.conditions}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
