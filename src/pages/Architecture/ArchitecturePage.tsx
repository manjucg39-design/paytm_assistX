import React from 'react';
import { 
  Cpu, 
  Layers, 
  Terminal, 
  Code2, 
  Database, 
  Mic, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Server
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-[#002970] mb-2">
          <Cpu className="h-3.5 w-3.5 text-[#00BAF2]" />
          <span>System Architecture & Engineering Specification</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-black text-[#002970] tracking-tight">
          Paytm AssistX Technical Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1">
          How AssistX bridges natural language requests to deterministic banking tools, security checkpoints, and verification loops.
        </p>
      </div>

      {/* End-to-End Autonomous Pipeline Diagram */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#002970] flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#00BAF2]" />
          End-to-End Autonomous Flow Diagram
        </h2>

        <div className="rounded-2xl bg-gradient-to-br from-[#001740] via-[#002970] to-[#001f56] p-6 text-white font-mono text-xs overflow-x-auto">
          <pre className="text-blue-100 leading-relaxed">
{`CUSTOMER
   ↓ [Text Query or Voice Audio]
REACT + TYPESCRIPT CLIENT (Web Speech STT / TTS)
   ↓
API / SERVICE LAYER (FastAPI / Agent Orchestrator)
   ↓
INTENT ROUTER + CONTEXT MEMORY
   ├── Intent Classification (Payment Issue | Search | Balance | Recharge | Bill | RAG)
   └── Security Boundary (OTP / Biometric Challenge if sensitive)
   ↓
WORKFLOW SELECTION ENGINE
   ↓
TOOL CALLING LAYER
   ├── get_transaction(query)
   ├── check_payment_status(txnId)
   ├── check_refund_status(txnId)
   ├── initiate_refund(txnId)
   ├── search_transactions(params)
   ├── get_balance()
   ├── recharge(phone, amount)
   └── billPayment(biller, amount)
   ↓
RESULT VERIFICATION GATE
   └── Confirms NPCI reversal reference / Bank UTR / Operator Token
   ↓
NATURAL LANGUAGE + VOICE SYNTHESIS (Multilingual: EN, KN, HI, TA, TE)
   ↓
CUSTOMER RECEIVES VERIFIED RESOLUTION`}
          </pre>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#002970]">
          Technology Stack Components
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Frontend Client
            </span>
            <h3 className="font-bold text-slate-900 text-sm">React 19 + TypeScript + Tailwind</h3>
            <p className="text-xs text-slate-500">
              High-performance responsive single page application, Web Speech API integration, real-time activity status monitor.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
              Backend Service
            </span>
            <h3 className="font-bold text-slate-900 text-sm">Python + FastAPI Architecture</h3>
            <p className="text-xs text-slate-500">
              Modular tool services, asynchronous API contracts, and deterministic banking simulator for hackathon deployment.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              AI Teammate Core
            </span>
            <h3 className="font-bold text-slate-900 text-sm">Agent Orchestrator & Tool Calling</h3>
            <p className="text-xs text-slate-500">
              Semantic parsing, multi-intent decomposition, conversation turn memory, and self-verifying resolution gates.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              Voice AI Engine
            </span>
            <h3 className="font-bold text-slate-900 text-sm">Speech-To-Text & Speech Synthesis</h3>
            <p className="text-xs text-slate-500">
              Bi-directional voice interaction supporting regional Indian accents and multilingual outputs.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
              Knowledge Base
            </span>
            <h3 className="font-bold text-slate-900 text-sm">RAG & Policy Grounding</h3>
            <p className="text-xs text-slate-500">
              Indexed documentation for Paytm Postpaid, BBPS utility bill protocols, UPI Lite regulations, and refund policies.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              Synthetic Data Layer
            </span>
            <h3 className="font-bold text-slate-900 text-sm">PostgreSQL / In-Memory Mock Store</h3>
            <p className="text-xs text-slate-500">
              Realistic customer balance profiles, transaction ledgers, failure codes, and reversal ticket tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Team Details & Hackathon Attribution */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Hackathon Project Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Project Name:</span>
            <span className="font-bold text-[#002970] text-sm">Paytm AssistX</span>
          </div>
          <div>
            <span className="text-slate-400 block">Team:</span>
            <span className="font-bold text-slate-800 text-sm">DUOMIND</span>
          </div>
          <div>
            <span className="text-slate-400 block">Team Members:</span>
            <span className="font-semibold text-slate-800">Manju C G · Sharath H N</span>
          </div>
          <div>
            <span className="text-slate-400 block">Evaluation Principle:</span>
            <span className="font-semibold text-slate-800">“Ask. Understand. Act. Resolve.”</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 border-t border-slate-100 pt-2 leading-relaxed">
          <strong>Notice:</strong> This web application is an autonomous AI agent prototype designed for demonstration purposes using synthetic customer data and simulated APIs. It does not access Paytm internal databases, live UPI payment switches, or customer bank accounts.
        </p>
      </div>
    </div>
  );
};
