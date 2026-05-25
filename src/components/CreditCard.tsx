import { Trash2, Wifi } from 'lucide-react';
import { SEED_CARDS } from '@/lib/seedData';

export interface CreditCardProps {
  id: string;
  bank: string;
  variant: string;
  network: 'Visa' | 'Mastercard' | 'RuPay' | 'Amex';
  nickname?: string;
  onDelete?: (id: string) => void;
  onClick?: () => void;
  active?: boolean;
}

export default function CreditCard({
  id,
  bank,
  variant,
  network,
  nickname,
  onDelete,
  onClick,
  active = false
}: CreditCardProps) {
  // Find predefined theme or fall back
  const predefined = SEED_CARDS.find(
    c =>
      c.bank.toLowerCase() === bank.toLowerCase() &&
      c.variant.toLowerCase() === variant.toLowerCase()
  );

  const defaultTheme = {
    bgGradient:
      network === 'Visa'
        ? 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)'
        : network === 'Mastercard'
        ? 'linear-gradient(135deg, #7c2d12 0%, #1c1917 100%)'
        : network === 'RuPay'
        ? 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)'
        : 'linear-gradient(135deg, #334155 0%, #0f172a 100%)',
    textColor: '#f8fafc',
    glowColor: 'rgba(255, 255, 255, 0.05)',
    accentColor: '#94a3b8'
  };

  const theme = predefined?.theme || defaultTheme;

  // Render network logos in custom SVGs for high-end feel
  const renderNetworkLogo = () => {
    switch (network) {
      case 'Visa':
        return (
          <svg className="h-4 w-12 text-slate-100 fill-current" viewBox="0 0 1000 300">
            <path d="M381 292l49-301h80L461 292zM609 5c-15-6-39-12-68-12-75 0-128 40-129 97-1 42 38 66 67 80 30 14 40 24 40 37 0 20-24 29-46 29-31 0-54-5-83-18l-12-7-12 79c21 10 61 18 102 18 80 0 132-40 133-101 1-34-20-60-66-82-27-14-44-23-44-37 0-13 14-26 44-26 25-1 43 5 57 11l7 3 11-73M833 3h-62c-19 0-35 11-42 28l-149 261h84l17-47h103l10 47h74L833 3zm-68 174l31-86 18 86h-49M237 3L159 203 151 159c-10-33-40-69-74-87l68 220h85L356 3h-85" />
          </svg>
        );
      case 'Mastercard':
        return (
          <div className="flex items-center space-x-1">
            <div className="w-5 h-5 rounded-full bg-red-500 opacity-90" />
            <div className="w-5 h-5 rounded-full bg-amber-500 opacity-90 -ml-3" />
          </div>
        );
      case 'Amex':
        return (
          <div className="px-1.5 py-0.5 border border-sky-400/30 bg-sky-950/40 rounded text-[10px] font-bold tracking-widest text-sky-400">
            AMEX
          </div>
        );
      case 'RuPay':
        return (
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-black italic tracking-tighter text-emerald-400">RuPay</span>
            <span className="text-[6px] tracking-widest text-slate-400 uppercase -mt-1 font-bold">select</span>
          </div>
        );
      default:
        return <span className="text-xs font-bold tracking-wider">{network}</span>;
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        background: theme.bgGradient,
        color: theme.textColor,
        boxShadow: active
          ? `0 0 25px 3px ${theme.glowColor}, 0 10px 25px -5px rgba(0, 0, 0, 0.5)`
          : `0 4px 20px -2px rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)`,
        borderColor: active ? theme.accentColor : 'rgba(255, 255, 255, 0.08)'
      }}
      className={`relative h-48 w-full md:w-80 rounded-2xl p-6 border transition-all duration-500 select-none cursor-pointer group glass-card-shine ${
        active ? 'scale-[1.02] z-10' : 'hover:scale-[1.01] hover:border-white/20'
      }`}
    >
      {/* Glare Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-2xl pointer-events-none" />

      {/* Glow Ambient Layer */}
      {active && (
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-40 blur-sm pointer-events-none transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${theme.accentColor}, transparent)`
          }}
        />
      )}

      {/* Card Header */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest opacity-60 font-medium">
            {bank}
          </span>
          <span className="text-lg font-bold tracking-wide mt-0.5">
            {variant}
          </span>
        </div>
        <div className="h-6 flex items-center">{renderNetworkLogo()}</div>
      </div>

      {/* Chip & Wireless */}
      <div className="flex items-center space-x-3 mt-4">
        {/* Sleek Golden Smart Chip */}
        <div className="relative w-8 h-6 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 rounded-md overflow-hidden flex flex-wrap p-[3px] border border-amber-300/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
          <div className="w-[8px] h-[5px] border-r border-b border-amber-900/20" />
          <div className="w-[10px] h-[5px] border-r border-b border-amber-900/20" />
          <div className="w-[8px] h-[5px] border-b border-amber-900/20" />
          <div className="w-[8px] h-[8px] border-r border-b border-amber-900/20 mt-[1px]" />
          <div className="w-[10px] h-[8px] border-r border-b border-amber-900/20 mt-[1px] bg-gradient-to-br from-yellow-300 to-yellow-500" />
          <div className="w-[8px] h-[8px] border-b border-amber-900/20 mt-[1px]" />
        </div>
        
        {/* Contactless Wifi Icon */}
        <Wifi className="h-4 w-4 rotate-90 opacity-40" />
      </div>

      {/* Card Footer / Nickname / Owner info */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <div className="flex flex-col">
          {nickname ? (
            <span className="text-xs tracking-wide font-mono opacity-80 bg-black/10 px-2 py-0.5 rounded border border-white/5 truncate max-w-[150px]">
              {nickname}
            </span>
          ) : (
            <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">
              MANUAL VARIANT
            </span>
          )}
          <span className="text-[9px] tracking-[0.2em] font-mono opacity-30 mt-1">
            •••• •••• •••• 8888
          </span>
        </div>

        {/* Delete Trigger Button */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Avoid triggering card click/active state
              if (confirm(`Remove this ${bank} ${variant} from your collection?`)) {
                onDelete(id);
              }
            }}
            style={{
              borderColor: 'rgba(239, 68, 68, 0.2)'
            }}
            className="p-1.5 rounded-lg bg-red-950/30 text-red-400 hover:bg-red-500 hover:text-white border transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-[0_2px_8px_rgba(239,68,68,0.2)] hover:scale-105"
            title="Delete Card"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
