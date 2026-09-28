import React from 'react';
import { 
  Bot, 
  Mic, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  Search, 
  Languages, 
  MessageSquare, 
  Sparkles,
  Layers,
  ArrowDown
} from 'lucide-react';
import { SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/translations';

interface HomePageProps {
  onStartAssistant: () => void;
  onOpenVoice: () => void;
  onSelectPrompt: (prompt: string) => void;
  language: SupportedLanguage;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartAssistant,
  onOpenVoice,
  onSelectPrompt,
  language
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const quickDemos = [
    {
      title: '1. Failed Payment',
      query: t.failedPaymentPrompt,
      badge: 'Primary Demo',
      desc: 'Simulate failed ₹850 merchant checkout and automatic NPCI bank reversal.'
    },
    {
      title: '2. Transaction Search',
      query: t.transactionSearchPrompt,
      badge: 'Natural Language',
      desc: 'Retrieve today\'s incoming UPI credits from Rahul & Priya.'
    },
    {
      title: '3. Check Balance',
      query: t.balancePrompt,
      badge: 'Security / Auth',
      desc: 'Verify bank account balance, wallet reserve & postpaid line.'
    },
    {
      title: '4. Refund Tracking',
      query: 'Where is my refund for ₹850?',
      badge: 'Resolution',
      desc: 'Track banking ARN reference and source account turnaround.'
    },
    {
      title: '5. Paytm Postpaid (RAG)',
      query: t.postpaidPrompt,
      badge: 'Knowledge',
      desc: 'Retrieve verified BNPL limits, billing cycles, and policies.'
    },
    {
      title: '6. Voice Interaction',
      query: t.voiceExamplePrompt,
      badge: 'Voice AI',
      desc: 'Ask contextual follow-up questions using speech input.'
    }
  ];

  const features = [
    {
      icon: Cpu,
      title: 'Autonomous Customer Support',
      desc: 'Understands payment problems and executes full recovery workflows, not just pre-written responses.'
    },
    {
      icon: Mic,
      title: 'Voice + Text Unified',
      desc: 'Speak naturally or type your request into the exact same AI teammate with native STT and TTS.'
    },
    {
      icon: Search,
      title: 'Natural Language Transactions',
      desc: 'Ask conversational questions about transactions without tedious date/filter forms.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Autonomous Actions',
      desc: 'Built-in security boundary ensures sensitive banking operations require verified authorization.'
    },
    {
      icon: Languages,
      title: 'Multilingual Regional Support',
      desc: 'Native support for English, Kannada (ಕನ್ನಡ), Hindi (हिन्दी), Tamil (தமிழ்), and Telugu (తెలుగు).'
    },
    {
      icon: MessageSquare,
      title: 'Contextual Multi-Turn Memory',
      desc: 'Understands pronouns and references in follow-up queries without repeating the full question.'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4 sm:p-6 lg:p-10 space-y-12 text-slate-800">
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl text-center space-y-5 pt-4">
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/80 px-3.5 py-1 text-xs font-semibold text-[#002970]">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Paytm AssistX · Hackathon Prototype</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">Synthetic Data & Simulated APIs</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#002970] tracking-tight leading-tight">
          Your Autonomous AI Teammate for Payments & Customer Support
        </h1>

        <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 font-medium">
          “{t.tagline}”
        </p>

        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-500 leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onStartAssistant}
            className="flex items-center gap-2 rounded-2xl bg-[#002970] hover:bg-[#001f56] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition active:scale-95"
          >
            <Bot className="h-4 w-4 text-[#00BAF2]" />
            <span>{t.startAssistant}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onOpenVoice}
            className="flex items-center gap-2 rounded-2xl bg-white hover:bg-cyan-50/70 border border-cyan-300 px-6 py-3.5 text-sm font-bold text-[#002970] shadow-sm transition active:scale-95"
          >
            <Mic className="h-4 w-4 text-[#00BAF2]" />
            <span>{t.tryVoice}</span>
          </button>
        </div>

        {/* Voice Tagline Quote */}
        <p className="text-xs text-slate-400 italic">
          “{t.voiceTagline}”
        </p>
      </section>

      {/* 8-Step Autonomous Pipeline Flow Graphic */}
      <section className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-[#001740] via-[#002970] to-[#001f56] p-6 sm:p-8 text-white shadow-xl">
        <div className="text-center space-y-1 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00BAF2]">
            The Autonomous Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            How AssistX Resolves Issues End-to-End
          </h2>
          <p className="text-xs text-blue-200">
            Visible operational telemetry ensures full transparency without exposing private LLM tokens
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
          {[
            { step: '1', title: 'UNDERSTAND', desc: 'Semantic parser' },
            { step: '2', title: 'IDENTIFY', desc: 'Multi-intent routing' },
            { step: '3', title: 'AUTH', desc: 'Secure verification' },
            { step: '4', title: 'PLAN', desc: 'Workflow selection' },
            { step: '5', title: 'TOOLS', desc: 'Simulated APIs' },
            { step: '6', title: 'ACT', desc: 'Execute resolution' },
            { step: '7', title: 'VERIFY', desc: 'Bank confirmation' },
            { step: '8', title: 'RESPOND', desc: 'Text & voice readout' },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="relative rounded-xl bg-white/10 p-3 border border-white/10 hover:border-[#00BAF2] transition text-left sm:text-center group"
            >
              <span className="text-[10px] font-mono font-bold text-[#00BAF2] block mb-1">
                STEP {item.step}
              </span>
              <div className="font-extrabold text-[11px] tracking-wide text-white">
                {item.title}
              </div>
              <div className="text-[9px] text-blue-200 mt-0.5">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Launch Interactive Hackathon Demos */}
      <section className="mx-auto max-w-5xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-lg font-bold text-[#002970]">
              Interactive Hackathon Scenarios
            </h2>
            <p className="text-xs text-slate-500">
              Click any scenario below to immediately trigger the autonomous AI teammate workflow:
            </p>
          </div>
          <span className="text-xs font-mono text-[#00BAF2] font-semibold">
            6 Ready Demos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {quickDemos.map((demo, idx) => (
            <div
              key={idx}
              onClick={() => onSelectPrompt(demo.query)}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-xs hover:border-[#00BAF2] hover:shadow-md transition active:scale-[0.99] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#002970]">{demo.title}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">
                    {demo.badge}
                  </span>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 mb-2 border border-slate-100 font-mono">
                  “{demo.query}”
                </div>
                <p className="text-[11px] text-slate-500">{demo.desc}</p>
              </div>

              <div className="mt-3 flex items-center justify-end text-xs font-bold text-[#002970] gap-1 pt-2 border-t border-slate-100">
                <span>Run Autonomous Demo</span>
                <ArrowRight className="h-3 w-3 text-[#00BAF2]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiator Section: From Chatbot to AI Teammate */}
      <section className="mx-auto max-w-5xl rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00BAF2]">
            Product Differentiator
          </span>
          <h2 className="text-2xl font-bold text-[#002970]">
            From Chatbot to Autonomous AI Teammate
          </h2>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Why AssistX solves problems while conventional chatbots merely output FAQs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Normal Chatbot */}
          <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200 text-left space-y-3">
            <span className="text-xs font-bold uppercase text-slate-400">
              Standard Support Chatbot
            </span>
            <div className="space-y-2 text-xs font-medium text-slate-600">
              <div className="p-2 rounded bg-white border border-slate-200">Customer: "My payment failed and ₹850 deducted"</div>
              <div className="text-center text-slate-400">↓</div>
              <div className="p-2 rounded bg-rose-50 text-rose-800 border border-rose-200">
                Generic Answer: "Please check your bank passbook or raise a ticket on form #4928"
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              ❌ Does not access tools, cannot verify reversal, leaves customer stranded.
            </p>
          </div>

          {/* Paytm AssistX Teammate */}
          <div className="rounded-2xl bg-blue-50/70 p-5 border border-blue-200 text-left space-y-3">
            <span className="text-xs font-bold uppercase text-[#002970]">
              Paytm AssistX Teammate
            </span>
            <div className="space-y-1.5 text-xs font-medium text-slate-700">
              <div className="p-1.5 rounded bg-white border border-blue-100">Customer: "My payment failed and ₹850 deducted"</div>
              <div className="text-center text-blue-400">↓</div>
              <div className="p-1.5 rounded bg-blue-100/70 text-[#002970] font-mono text-[11px]">
                Checks auth → Calls get_transaction(850) → Queries gateway → Initiates reversal → Verifies banking ARN
              </div>
              <div className="text-center text-blue-400">↓</div>
              <div className="p-1.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                ✓ Resolution Verified: TXN85042 reversal active, credited in 24-48 hrs.
              </div>
            </div>
            <p className="text-[11px] text-[#002970] font-semibold">
              ✅ "The goal is not just to answer the customer. The goal is to get the job done."
            </p>
          </div>
        </div>
      </section>

      {/* 6 Core Feature Cards */}
      <section className="mx-auto max-w-5xl space-y-4">
        <h2 className="text-lg font-bold text-[#002970]">
          Engineered for Real-World Payments Support
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#002970] border border-blue-100">
                  <Icon className="h-5 w-5 text-[#00BAF2]" />
                </div>
                <h3 className="font-bold text-sm text-[#002970]">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Branding & Disclaimer */}
      <footer className="mx-auto max-w-5xl border-t border-slate-200 pt-6 text-center space-y-2">
        <div className="text-xs font-bold text-[#002970]">
          Paytm AssistX · Built by Team DUOMIND (Manju C G · Sharath H N)
        </div>
        <p className="text-[11px] text-slate-400 max-w-xl mx-auto leading-normal">
          This hackathon prototype uses synthetic customer/transaction data and simulated APIs. It does not access Paytm's real internal systems, databases, UPI systems, or live banking accounts.
        </p>
      </footer>
    </div>
  );
};
