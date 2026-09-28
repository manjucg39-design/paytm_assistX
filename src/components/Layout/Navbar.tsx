import React from 'react';
import { Menu, Mic, ShieldCheck, Sparkles, Activity } from 'lucide-react';
import { SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/translations';

interface NavbarProps {
  onOpenMobileMenu: () => void;
  onOpenVoice: () => void;
  isVerified: boolean;
  onOpenAuthModal: () => void;
  language: SupportedLanguage;
  onToggleActivityMobile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMobileMenu,
  onOpenVoice,
  isVerified,
  onOpenAuthModal,
  language,
  onToggleActivityMobile
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 transition"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#002970]">
              Paytm AssistX
            </span>
            <span className="h-3.5 w-px bg-slate-300"></span>
            <span className="text-xs text-slate-500 font-medium italic">
              “Ask. Understand. Act. Resolve.”
            </span>
          </div>
          <span className="sm:hidden font-bold text-sm text-[#002970]">AssistX</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Verification Status */}
        <button
          onClick={onOpenAuthModal}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
            isVerified
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
              : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
          }`}
          title={isVerified ? 'Session Authenticated' : 'Click to Authenticate'}
        >
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span className="hidden sm:inline">
            {isVerified ? 'Verified Account' : 'Verify Account'}
          </span>
          <span className="sm:hidden">
            {isVerified ? 'Verified' : 'Verify'}
          </span>
        </button>

        {/* Mobile AI Activity Toggle */}
        {onToggleActivityMobile && (
          <button
            onClick={onToggleActivityMobile}
            className="lg:hidden rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 transition"
            title="View AI Activity"
          >
            <Activity className="h-4 w-4 text-[#002970]" />
          </button>
        )}

        {/* Quick Voice Button */}
        <button
          onClick={onOpenVoice}
          className="flex items-center gap-1.5 rounded-full bg-[#002970] hover:bg-[#001f56] text-white px-3 py-1.5 text-xs font-semibold shadow-xs transition active:scale-95"
        >
          <Mic className="h-3.5 w-3.5 text-[#00BAF2]" />
          <span className="hidden sm:inline">Voice Assistant</span>
          <span className="sm:hidden">Voice</span>
        </button>
      </div>
    </header>
  );
};
