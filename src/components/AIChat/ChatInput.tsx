import React, { useState } from 'react';
import { Send, Mic, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../data/translations';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onOpenVoice: () => void;
  isLoading: boolean;
  language: SupportedLanguage;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onOpenVoice,
  isLoading,
  language
}) => {
  const [input, setInput] = useState('');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const getQuickChips = (lang: SupportedLanguage) => {
    switch (lang) {
      case 'kn':
        return [
          { label: 'ಪಾವತಿ ವಿಫಲ ₹850', text: t.failedPaymentPrompt },
          { label: 'ಯಾರು ಹಣ ಕಳುಹಿಸಿದ್ದಾರೆ?', text: t.transactionSearchPrompt },
          { label: 'ರಾಹುಲ್ ಎಷ್ಟು ಕಳುಹಿಸಿದ್ದಾನೆ?', text: 'ರಾಹುಲ್ ಎಷ್ಟು ಕಳುಹಿಸಿದ್ದಾನೆ?' },
          { label: 'ಖಾತೆಯ ಶಿಲ್ಕು', text: t.balancePrompt },
          { label: 'Paytm Postpaid', text: t.postpaidPrompt },
          { label: 'ರೀಚಾರ್ಜ್ ಮಾಡುವುದು ಹೇಗೆ?', text: 'ರೀಚಾರ್ಜ್ ಮಾಡುವುದು ಹೇಗೆ?' },
          { label: 'ವಿದ್ಯುತ್ ಬಿಲ್ ಪಾವತಿ', text: 'ವಿದ್ಯುತ್ ಬಿಲ್ ಪಾವತಿಸುವುದು ಹೇಗೆ?' },
          { label: 'UPI ಎಂದರೇನು?', text: 'UPI ಎಂದರೇನು?' }
        ];
      case 'hi':
        return [
          { label: 'पेमेंट फेल ₹850', text: t.failedPaymentPrompt },
          { label: 'किसने पैसे भेजे?', text: t.transactionSearchPrompt },
          { label: 'राहुल ने कितने भेजे?', text: 'राहुल ने कितने भेजे?' },
          { label: 'खाता बैलेंस', text: t.balancePrompt },
          { label: 'Paytm Postpaid', text: t.postpaidPrompt },
          { label: 'रिचार्ज कैसे करें?', text: 'रिचार्ज कैसे करें?' },
          { label: 'बिजली बिल कैसे भरें?', text: 'बिजली बिल कैसे भरें?' },
          { label: 'UPI क्या है?', text: 'UPI क्या है?' }
        ];
      case 'ta':
        return [
          { label: 'தோல்வி ₹850', text: t.failedPaymentPrompt },
          { label: 'யார் பணம் அனுப்பினார்கள்?', text: t.transactionSearchPrompt },
          { label: 'ராகுல் எவ்வளவு அனுப்பினார்?', text: 'ராகுல் எவ்வளவு அனுப்பினார்?' },
          { label: 'கணக்கு இருப்பு', text: t.balancePrompt },
          { label: 'Paytm Postpaid', text: t.postpaidPrompt },
          { label: 'ரீசார்ஜ் செய்வது எப்படி?', text: 'ரீசார்ஜ் செய்வது எப்படி?' },
          { label: 'UPI என்றால் என்ன?', text: 'UPI என்றால் என்ன?' }
        ];
      case 'te':
        return [
          { label: 'చెల్లింపు విఫలమైంది ₹850', text: t.failedPaymentPrompt },
          { label: 'ఎవరు డబ్బు పంపారు?', text: t.transactionSearchPrompt },
          { label: 'రాహుల్ ఎంత పంపారు?', text: 'రాహుల్ ఎంత పంపారు?' },
          { label: 'ఖాతా బ్యాలెన్స్', text: t.balancePrompt },
          { label: 'Paytm Postpaid', text: t.postpaidPrompt },
          { label: 'రీఛార్జ్ ఎలా చేయాలి?', text: 'రీఛార్జ్ ఎలా చేయాలి?' },
          { label: 'UPI అంటే ఏమిటి?', text: 'UPI అంటే ఏమిటి?' }
        ];
      case 'en':
      default:
        return [
          { label: 'Failed ₹850 Payment', text: t.failedPaymentPrompt },
          { label: 'Who sent money today?', text: t.transactionSearchPrompt },
          { label: 'How much did Rahul send?', text: 'How much did Rahul send?' },
          { label: 'Check Balance', text: t.balancePrompt },
          { label: 'Multi-Intent Demo', text: 'My payment failed, did Rahul send me money, and what is my balance?' },
          { label: 'What is Paytm Postpaid?', text: 'What is Paytm Postpaid?' },
          { label: 'How do I recharge?', text: 'How do I recharge?' },
          { label: 'Electricity Bill', text: 'How can I pay my electricity bill?' },
          { label: 'What is UPI?', text: 'What is UPI?' },
          { label: 'What is Paytm Wallet?', text: 'What is Paytm Wallet?' },
          { label: 'How does Paytm work?', text: 'How does Paytm work?' }
        ];
    }
  };

  const quickChips = getQuickChips(language);

  return (
    <div className="border-t border-slate-200 bg-white/95 backdrop-blur-xs p-3 sm:p-4">
      {/* Quick Prompts Chips */}
      <div className="mb-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-[#00BAF2]" /> Quick Prompts:
        </span>
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSendMessage(chip.text)}
            className="shrink-0 rounded-full border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 hover:text-[#002970] px-3 py-1 text-xs font-medium text-slate-600 transition shadow-2xs active:scale-95"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={t.inputPlaceholder}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition focus:border-[#00BAF2] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00BAF2]/20 disabled:opacity-60"
          />
        </div>

        {/* 🎤 Voice Button */}
        <button
          type="button"
          onClick={onOpenVoice}
          title="Open Voice Assistant"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 hover:bg-cyan-100 text-[#002970] border border-cyan-200 transition shadow-xs active:scale-95 group"
        >
          <Mic className="h-5 w-5 text-[#00BAF2] group-hover:scale-110 transition-transform" />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#002970] hover:bg-[#001f56] text-white shadow-md shadow-blue-900/10 transition disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};
