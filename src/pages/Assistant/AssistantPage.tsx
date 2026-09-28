import React, { useRef, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  Volume2, 
  Mic, 
  Layers 
} from 'lucide-react';
import { 
  ActionCardData, 
  AIActivityState, 
  ChatMessage, 
  SupportedLanguage 
} from '../../types';
import { TRANSLATIONS } from '../../data/translations';
import { MessageCard } from '../../components/AIChat/MessageCard';
import { ChatInput } from '../../components/AIChat/ChatInput';
import { ActivityPanel } from '../../components/ActivityPanel/ActivityPanel';

interface AssistantPageProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onOpenVoice: () => void;
  isLoading: boolean;
  language: SupportedLanguage;
  activityState: AIActivityState;
  onExecuteCardAction: (card: ActionCardData) => void;
  onResetChat: () => void;
  showMobileActivity: boolean;
  onCloseMobileActivity: () => void;
}

export const AssistantPage: React.FC<AssistantPageProps> = ({
  messages,
  onSendMessage,
  onOpenVoice,
  isLoading,
  language,
  activityState,
  onExecuteCardAction,
  onResetChat,
  showMobileActivity,
  onCloseMobileActivity
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-1 h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-50/50">
      {/* Central Chat Workspace */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-white border-r border-slate-200">
        {/* Workspace Sub-header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-white/95">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-[#002970]">
              <Bot className="h-4 w-4 text-[#002970]" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-[#002970]">AI Assistant Workspace</h2>
              <p className="text-[10px] text-slate-400">
                Your AI teammate for payments, transactions and Paytm services.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onResetChat}
              title="Reset conversation"
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-2.5 py-1 rounded-md transition"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="hidden sm:inline">Reset Chat</span>
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <MessageCard
              key={msg.id}
              message={msg}
              language={language}
              onExecuteCardAction={onExecuteCardAction}
              onFollowUpClick={(prompt) => onSendMessage(prompt)}
            />
          ))}

          {/* Real-time processing indicator */}
          {isLoading && (
            <div className="flex items-center gap-3 text-xs text-slate-500 bg-blue-50/60 p-3 rounded-2xl border border-blue-100 animate-pulse w-fit">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#002970] text-white">
                <Sparkles className="h-3.5 w-3.5 text-[#00BAF2]" />
              </div>
              <div>
                <span className="font-semibold text-[#002970]">
                  AssistX is processing request...
                </span>
                <span className="block text-[10px] text-slate-500">
                  {activityState.activeTool ? `Executing ${activityState.activeTool}` : 'Identifying intent & checking workflows'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area */}
        <ChatInput
          onSendMessage={onSendMessage}
          onOpenVoice={onOpenVoice}
          isLoading={isLoading}
          language={language}
        />
      </div>

      {/* Right-Side AI Activity / Action Status Panel (Desktop) */}
      <div className="hidden lg:block h-full">
        <ActivityPanel activity={activityState} />
      </div>

      {/* Mobile Drawer for AI Activity */}
      {showMobileActivity && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div 
            onClick={onCloseMobileActivity}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" 
          />
          <div className="relative z-10 w-80 h-full bg-white shadow-2xl">
            <ActivityPanel activity={activityState} onResetActivity={onCloseMobileActivity} />
          </div>
        </div>
      )}
    </div>
  );
};
