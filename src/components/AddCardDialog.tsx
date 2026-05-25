/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { SEED_CARDS, CardTemplate } from '@/lib/seedData';
import CreditCard from './CreditCard';

export interface AddCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCardDialog({ isOpen, onClose, onSuccess }: AddCardDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [bank, setBank] = useState('');
  const [variant, setVariant] = useState('');
  const [network, setNetwork] = useState<'Visa' | 'Mastercard' | 'RuPay' | 'Amex'>('Visa');
  const [nickname, setNickname] = useState('');
  const [suggestions, setSuggestions] = useState<CardTemplate[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestionRef = useRef<HTMLDivElement>(null);

  // Sync suggestion dropdown
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = SEED_CARDS.filter(
        c =>
          c.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.variant.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Click outside listener for suggestions dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleSelectSuggestion = (card: CardTemplate) => {
    setBank(card.bank);
    setVariant(card.variant);
    setNetwork(card.network);
    setSearchQuery(`${card.bank} ${card.variant}`);
    setShowSuggestions(false);
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bank.trim() || !variant.trim()) {
      setErrorMsg('Please specify both Bank name and Card variant.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bank: bank.trim(),
          variant: variant.trim(),
          network,
          nickname: nickname.trim() || undefined
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to add card');
      }

      // Success
      setSearchQuery('');
      setBank('');
      setVariant('');
      setNetwork('Visa');
      setNickname('');
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Error adding card:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark blur backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dialog Panel */}
      <div className="relative w-full max-w-4xl glass-panel rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:max-h-[600px] z-10 animate-float-delayed">
        
        {/* Real-time Digital Card Preview (Left Side) */}
        <div className="flex-1 bg-slate-950/60 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 space-y-6">
          <div className="text-center">
            <span className="text-[10px] tracking-widest text-indigo-400 font-bold uppercase flex items-center justify-center space-x-1.5">
              <Sparkles className="h-3 w-3" />
              <span>Real-Time Card Preview</span>
            </span>
            <p className="text-xs text-slate-400 mt-1">Watch your digital card adjust live as you type</p>
          </div>
          
          <div className="scale-90 md:scale-100 transition-transform duration-300">
            <CreditCard
              id="preview"
              bank={bank || 'CardNest Partner Bank'}
              variant={variant || 'Select Variant'}
              network={network}
              nickname={nickname}
              active={true}
            />
          </div>

          <div className="hidden md:block text-[10px] text-center text-slate-500 font-mono">
            MANUAL BANK CARD DEFINITION • SECURE & ENCRYPTED
          </div>
        </div>

        {/* Input Form Fields (Right Side) */}
        <form onSubmit={handleSubmit} className="flex-1 p-8 flex flex-col justify-between overflow-y-auto no-scrollbar">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold tracking-tight text-white">Add Card manually</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Search Autocomplete */}
            <div className="relative mb-5" ref={suggestionRef}>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Quick Search Popular Cards
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Infinia, SBI Cashback..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-900/60 border border-white/10 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition shadow-inner"
                />
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-20 mt-1 max-h-40 overflow-y-auto glass-panel rounded-lg border border-white/10 shadow-lg text-sm">
                  {suggestions.map((card, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelectSuggestion(card)}
                      className="px-4 py-2 hover:bg-indigo-600/30 cursor-pointer flex justify-between items-center transition"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-100">{card.variant}</span>
                        <span className="text-[10px] text-slate-400">{card.bank}</span>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-white/5 uppercase">
                        {card.network}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px bg-white/5 my-4" />

            {/* Manual Entries */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Bank Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HDFC Bank"
                  value={bank}
                  onChange={(e) => {
                    setBank(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full px-3 py-1.5 bg-slate-900/60 border border-white/10 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition shadow-inner"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Card Variant
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Infinia"
                  value={variant}
                  onChange={(e) => {
                    setVariant(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full px-3 py-1.5 bg-slate-900/60 border border-white/10 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition shadow-inner"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Card Network
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Visa', 'Mastercard', 'RuPay', 'Amex'] as const).map((net) => (
                  <button
                    key={net}
                    type="button"
                    onClick={() => setNetwork(net)}
                    className={`py-2 text-xs font-medium rounded-lg border transition ${
                      network === net
                        ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                        : 'bg-slate-900/30 text-slate-400 border-white/5 hover:bg-white/5 hover:text-slate-300'
                    }`}
                  >
                    {net}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Card Nickname <span className="text-[10px] text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Groceries Card, Travel Points"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={25}
                className="w-full px-3 py-1.5 bg-slate-900/60 border border-white/10 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition shadow-inner"
              />
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-lg bg-red-950/30 border border-red-500/20 text-xs text-red-400 font-medium">
                {errorMsg}
              </div>
            )}
          </div>

          <div className="flex space-x-3 mt-6 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-2 text-sm font-semibold rounded-lg bg-slate-900 text-slate-300 border border-white/5 hover:bg-slate-800 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 transition duration-300 shadow-[0_4px_16px_rgba(99,102,241,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding...' : 'Add to Nest'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
