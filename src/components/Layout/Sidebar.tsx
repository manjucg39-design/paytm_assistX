import React from 'react';
import { 
  Bot, 
  ArrowLeftRight, 
  UserCheck, 
  BarChart3, 
  BookOpen, 
  Cpu, 
  Languages, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  Home
} from 'lucide-react';
import { LanguageOption, SupportedLanguage } from '../../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../../data/translations';

export type NavTab = 'home' | 'assistant' | 'transactions' | 'account' | 'insights' | 'knowledge' | 'architecture';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onResetDemo: () => void;
  onLoadHackathonDemo: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentLanguage,
  onLanguageChange,
  onResetDemo,
  onLoadHackathonDemo,
  isMobileOpen,
  onMobileClose
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home / Overview', icon: Home, badge: 'Hero' },
    { id: 'assistant', label: 'AI Assistant', icon: Bot, badge: 'Core' },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'account', label: 'Account', icon: UserCheck },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
    { id: 'knowledge', label: 'Knowledge (RAG)', icon: BookOpen },
    { id: 'architecture', label: 'Architecture', icon: Cpu }
  ];

  const content = (
    <div className="flex h-full flex-col justify-between p-4 bg-white border-r border-slate-200">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#002970] text-white shadow-md shadow-blue-900/20">
            <span className="font-extrabold text-lg tracking-tighter">P</span>
            <span className="text-[#00BAF2] font-black text-xl leading-none">.</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold text-[#002970] tracking-tight">Paytm AssistX</h1>
            </div>
            <p className="text-[10px] font-semibold text-[#00BAF2] tracking-wide uppercase">
              AI Teammate for Payments
            </p>
          </div>
        </div>

        {/* Demo Mode Pill */}
        <div className="mt-3 mx-1 flex items-center justify-between rounded-lg bg-blue-50/70 border border-blue-200/60 px-2.5 py-1.5 text-xs text-[#002970]">
          <span className="flex items-center gap-1.5 font-bold text-[10px] tracking-wider uppercase text-blue-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Demo Mode Active
          </span>
          <span className="text-[9px] bg-white border border-blue-200 text-blue-700 px-1.5 py-0.5 rounded font-mono">
            Synthetic
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onMobileClose();
                }}
                className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[#002970] text-white shadow-md shadow-blue-900/15'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#00BAF2]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#002970]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls: Language, Demo Presets, Team */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        {/* Language Selector */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-1">
            <Languages className="h-3.5 w-3.5 text-[#00BAF2]" />
            Language / ಭಾಷೆ / भाषा
          </label>
          <select
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#00BAF2] focus:bg-white focus:outline-hidden"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>

        {/* Hackathon Preset Buttons */}
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={onLoadHackathonDemo}
            className="flex items-center justify-center gap-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#002970] border border-blue-200 py-2 text-[11px] font-semibold transition"
          >
            <Sparkles className="h-3 w-3 text-[#00BAF2]" />
            <span>Load Demo</span>
          </button>
          <button
            onClick={onResetDemo}
            className="flex items-center justify-center gap-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 py-2 text-[11px] font-semibold transition"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Data</span>
          </button>
        </div>

        {/* Team Credits */}
        <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/70 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Team DUOMIND</div>
          <div className="text-[11px] font-bold text-[#002970]">Manju C G · Sharath H N</div>
          <div className="text-[9px] text-slate-400 mt-0.5">Hackathon Prototype · 2026</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            onClick={onMobileClose} 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
          />
          <div className="relative z-10 w-72 h-full shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
