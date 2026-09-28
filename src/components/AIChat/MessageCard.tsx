import React, { useState } from 'react';
import { 
  Bot, 
  User, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  AlertCircle, 
  CreditCard, 
  Zap, 
  Smartphone, 
  Receipt,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { ActionCardData, ChatMessage, SupportedLanguage } from '../../types';
import { voiceService } from '../../services/voiceService';

interface MessageCardProps {
  message: ChatMessage;
  language: SupportedLanguage;
  onExecuteCardAction?: (card: ActionCardData) => void;
  onFollowUpClick?: (prompt: string) => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  message,
  language,
  onExecuteCardAction,
  onFollowUpClick
}) => {
  const [showSteps, setShowSteps] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSpeak = () => {
    if (isPlayingAudio) {
      voiceService.stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      voiceService.speak(message.content, language, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-in fade-in slide-in-from-bottom-2">
        <div className="max-w-[85%] sm:max-w-[70%] rounded-2xl rounded-tr-xs bg-[#002970] px-4 py-3 text-white shadow-md">
          {message.audioSpoken && (
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-300 mb-1">
              <span>🎤 Voice Input</span>
            </div>
          )}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-blue-200">
            <span>{message.timestamp}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-5 text-left animate-in fade-in slide-in-from-bottom-2">
      {/* Avatar */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#002970] to-[#00BAF2] text-white shadow-xs">
        <Bot className="h-5 w-5" />
      </div>

      <div className="flex-1 max-w-[92%] sm:max-w-[80%] space-y-3">
        {/* Main Bubble */}
        <div className="rounded-2xl rounded-tl-xs border border-slate-200 bg-white p-4 shadow-xs">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-[#002970]">Paytm AssistX</span>
              {message.isVerifiedResolution && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  Resolution Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeak}
                className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-md transition ${
                  isPlayingAudio
                    ? 'bg-cyan-50 text-cyan-700 font-semibold'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
                title={isPlayingAudio ? 'Stop speaking' : 'Listen to response'}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="h-3.5 w-3.5 animate-pulse" />
                    <span className="text-[10px]">Playing</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-3.5 w-3.5" />
                    <span className="text-[10px]">Listen</span>
                  </>
                )}
              </button>
              <span className="text-[10px] text-slate-400">{message.timestamp}</span>
            </div>
          </div>

          {/* Workflow Steps Collapsible */}
          {message.steps && message.steps.length > 0 && (
            <div className="mb-3 rounded-lg border border-slate-200/80 bg-slate-50/70 p-2 text-xs">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="w-full flex items-center justify-between text-left text-slate-600 font-semibold hover:text-slate-900 transition"
              >
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                  <span className="text-[11px]">
                    Autonomous Teammate Pipeline ({message.steps.length} steps executed)
                  </span>
                </div>
                {showSteps ? (
                  <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                )}
              </button>

              {showSteps && (
                <div className="mt-2.5 space-y-1.5 border-t border-slate-200/60 pt-2 text-[11px]">
                  {message.steps.map((st, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-semibold text-slate-700">{st.title}: </span>
                        <span className="text-slate-500">{st.description}</span>
                        {st.toolName && (
                          <span className="ml-1.5 font-mono text-[10px] bg-slate-200/80 px-1 py-0.5 rounded text-slate-700">
                            {st.toolName}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Assistant Text Content */}
          <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>

          {/* Action Card Rendering */}
          {message.actionCard && (
            <div className="mt-3.5">
              {/* 1. Refund / Reversal Simulation Card */}
              {message.actionCard.type === 'REFUND_SIMULATION' && (
                <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#002970] flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-teal-600" />
                      Reversal & Resolution Tracking
                    </span>
                    <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                      {message.actionCard.data.refundStatus}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs bg-white rounded-lg p-2.5 border border-teal-100 mb-2">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Transaction ID</span>
                      <span className="font-mono font-bold text-slate-800">{message.actionCard.data.transactionId}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Deducted Amount</span>
                      <span className="font-bold text-slate-900">₹{message.actionCard.data.amount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Expected Credit</span>
                      <span className="font-medium text-slate-700">{message.actionCard.data.expectedCredit}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Banking ARN</span>
                      <span className="font-mono text-[10px] text-slate-600">{message.actionCard.data.arn}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-teal-900 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                    <span>Resolution verified against bank gateway logs.</span>
                  </div>
                </div>
              )}

              {/* 2. Recharge Confirmation Card */}
              {message.actionCard.type === 'RECHARGE_CONFIRMATION' && (
                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#002970] flex items-center gap-1.5">
                      <Smartphone className="h-4 w-4 text-blue-600" />
                      Recharge Confirmation
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                      {message.actionCard.status === 'executed' ? '✓ Recharged' : 'Pending Action'}
                    </span>
                  </div>
                  <div className="bg-white rounded-lg p-2.5 border border-blue-100 space-y-1 text-xs mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mobile Number:</span>
                      <span className="font-bold text-slate-800">{message.actionCard.data.mobileNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Operator:</span>
                      <span className="font-medium text-slate-800">{message.actionCard.data.operator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Amount:</span>
                      <span className="font-bold text-[#002970]">₹{message.actionCard.data.amount}</span>
                    </div>
                    {message.actionCard.data.benefits && (
                      <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                        {message.actionCard.data.benefits}
                      </p>
                    )}
                  </div>
                  {message.actionCard.status === 'pending' && onExecuteCardAction && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onExecuteCardAction(message.actionCard!)}
                        className="flex-1 rounded-lg bg-[#002970] hover:bg-[#001f56] text-white py-2 text-xs font-semibold shadow-xs transition"
                      >
                        Confirm Recharge (₹{message.actionCard.data.amount})
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Bill Payment Confirmation Card */}
              {message.actionCard.type === 'BILL_CONFIRMATION' && (
                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#002970] flex items-center gap-1.5">
                      <Receipt className="h-4 w-4 text-blue-600" />
                      Utility Bill Payment
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                      {message.actionCard.status === 'executed' ? '✓ Paid' : 'Pending Action'}
                    </span>
                  </div>
                  <div className="bg-white rounded-lg p-2.5 border border-blue-100 space-y-1 text-xs mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Biller Name:</span>
                      <span className="font-bold text-slate-800">{message.actionCard.data.billerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Consumer ID:</span>
                      <span className="font-mono text-slate-800">{message.actionCard.data.consumerId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Bill Amount:</span>
                      <span className="font-bold text-[#002970]">₹{message.actionCard.data.amount}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Due Date:</span>
                      <span>{message.actionCard.data.dueDate}</span>
                    </div>
                  </div>
                  {message.actionCard.status === 'pending' && onExecuteCardAction && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onExecuteCardAction(message.actionCard!)}
                        className="flex-1 rounded-lg bg-[#002970] hover:bg-[#001f56] text-white py-2 text-xs font-semibold shadow-xs transition"
                      >
                        Confirm Payment (₹{message.actionCard.data.amount})
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 4. Transaction List Preview Card */}
              {message.actionCard.type === 'TRANSACTION_PREVIEW' && message.actionCard.data.transactions && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 space-y-2">
                  <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                    <span>Verified Transactions</span>
                    <span className="text-[10px] text-slate-500">{message.actionCard.data.transactions.length} items</span>
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {message.actionCard.data.transactions.map((tx: any, i: number) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-white p-2 border border-slate-200 text-xs">
                        <div>
                          <div className="font-semibold text-slate-800">{tx.counterparty}</div>
                          <div className="text-[10px] text-slate-400">{tx.date} · {tx.time} · {tx.method}</div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold ${tx.type === 'RECEIVED' ? 'text-emerald-600' : 'text-slate-900'}`}>
                            {tx.type === 'RECEIVED' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                          </span>
                          <span className="block text-[9px] uppercase font-bold text-teal-700">
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Balance Card */}
              {message.actionCard.type === 'BALANCE_CARD' && (
                <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50/40 p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Live Verified Demo Balances
                  </span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="bg-white p-2 rounded-lg border border-blue-100 text-center">
                      <span className="text-[10px] text-slate-500 block">Bank Account</span>
                      <span className="text-sm font-bold text-[#002970]">
                        ₹{message.actionCard.data.balance.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-blue-100 text-center">
                      <span className="text-[10px] text-slate-500 block">Paytm Wallet</span>
                      <span className="text-sm font-bold text-slate-800">
                        ₹{message.actionCard.data.wallet.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-blue-100 text-center">
                      <span className="text-[10px] text-slate-500 block">Postpaid Limit</span>
                      <span className="text-sm font-bold text-teal-700">
                        ₹{message.actionCard.data.postpaid.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Suggested Follow-Ups */}
        {message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && onFollowUpClick && (
          <div className="flex flex-wrap gap-1.5 pl-1">
            {message.suggestedFollowUps.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onFollowUpClick(prompt)}
                className="rounded-full bg-white hover:bg-blue-50 hover:text-[#002970] hover:border-blue-300 border border-slate-200 px-3 py-1 text-xs text-slate-600 transition shadow-2xs flex items-center gap-1 active:scale-95"
              >
                <span>{prompt}</span>
                <ArrowRight className="h-2.5 w-2.5 opacity-60" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
