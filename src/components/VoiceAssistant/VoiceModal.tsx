import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, ArrowRight, CornerDownLeft, AlertCircle } from 'lucide-react';
import { voiceService, VoiceState } from '../../services/voiceService';
import { SupportedLanguage } from '../../types';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuerySubmit: (query: string, isVoice: boolean) => void;
  currentLanguage: SupportedLanguage;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  onQuerySubmit,
  currentLanguage
}) => {
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    transcript: '',
    error: null
  });

  const [simulatedQuery, setSimulatedQuery] = useState('');

  useEffect(() => {
    const unsubscribe = voiceService.subscribe(setVoiceState);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen) {
      handleStartListening();
    } else {
      voiceService.stopListening();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    voiceService.startListening(
      currentLanguage,
      (finalText) => {
        if (finalText) {
          onQuerySubmit(finalText, true);
          onClose();
        }
      },
      (err) => {
        console.warn('Voice error:', err);
      }
    );
  };

  const handleStopListening = () => {
    voiceService.stopListening();
  };

  const handleSimulatedVoice = (text: string) => {
    voiceService.stopListening();
    onQuerySubmit(text, true);
    onClose();
  };

  const getSampleVoicePrompts = (lang: SupportedLanguage) => {
    switch (lang) {
      case 'kn':
        return [
          'ನನ್ನ ಪಾವತಿ ವಿಫಲವಾಗಿದೆ ಮತ್ತು ₹850 ಕಡಿತಗೊಂಡಿದೆ.',
          'ನನಗೆ ಇವತ್ತು ಯಾರು ಹಣ ಕಳುಹಿಸಿದ್ದಾರೆ?',
          'ರಾಹುಲ್ ಎಷ್ಟು ಕಳುಹಿಸಿದ್ದಾನೆ?',
          'ನನ್ನ ಖಾತೆಯ ಶಿಲ್ಕು ಎಷ್ಟು?',
          'Paytm Postpaid ಎಂದರೇನು?'
        ];
      case 'hi':
        return [
          'मेरा पेमेंट फेल हो गया और ₹850 कट गए।',
          'आज मुझे किसने पैसे भेजे?',
          'राहुल ने कितने भेजे?',
          'मेरा बैलेंस क्या है?',
          'Paytm Postpaid क्या है?'
        ];
      case 'ta':
        return [
          'எனது பணம் செலுத்துதல் தோல்வியடைந்தது, ₹850 கழிக்கப்பட்டது.',
          'இன்று எனக்கு யார் பணம் அனுப்பினார்கள்?',
          'எனது இருப்பு என்ன?',
          'Paytm Postpaid என்றால் என்ன?'
        ];
      case 'te':
        return [
          'నా చెల్లింపు విఫలమైంది మరియు ₹850 కట్ అయ్యాయి.',
          'ఈ రోజు నాకు ఎవరు డబ్బు పంపారు?',
          'నా బ్యాలెన్స్ ఎంత?',
          'Paytm Postpaid అంటే ఏమిటి?'
        ];
      case 'en':
      default:
        return [
          'My payment failed and ₹850 was deducted.',
          'Who sent me money today?',
          'Did Rahul send me money today?',
          'How much did Rahul send?',
          'What is my current balance?'
        ];
    }
  };

  const sampleVoicePrompts = getSampleVoicePrompts(currentLanguage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          aria-label="Close voice assistant"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Technology Label Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/80 px-3 py-1 text-xs font-semibold text-[#002970] mb-4">
          <Sparkles className="h-3.5 w-3.5 text-[#00BAF2]" />
          <span>Voice AI · Speech-to-Text & Processing</span>
        </div>

        <h3 className="text-xl font-bold text-[#002970]">
          {voiceState.isListening ? 'Listening...' : 'Voice Assistant Ready'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Speak your request in {currentLanguage.toUpperCase()}. AssistX will transcribe, execute the workflow, and respond.
        </p>

        {/* Animated Pulse & Microphone */}
        <div className="my-8 flex justify-center items-center">
          <div className="relative flex items-center justify-center">
            {voiceState.isListening && (
              <>
                <div className="absolute h-36 w-36 rounded-full bg-cyan-400/20 animate-ping duration-1000" />
                <div className="absolute h-28 w-28 rounded-full bg-blue-500/20 animate-pulse duration-700" />
              </>
            )}
            
            <button
              onClick={voiceState.isListening ? handleStopListening : handleStartListening}
              className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xl transition-transform active:scale-95 ${
                voiceState.isListening 
                  ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/30' 
                  : 'bg-[#002970] hover:bg-[#001f56] shadow-blue-900/30'
              }`}
              title={voiceState.isListening ? 'Click to stop listening' : 'Click to start recording'}
            >
              {voiceState.isListening ? (
                <Mic className="h-9 w-9 animate-bounce" />
              ) : (
                <MicOff className="h-9 w-9 text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Live Audio Waves Simulation */}
        {voiceState.isListening && (
          <div className="flex items-center justify-center gap-1.5 h-6 mb-4">
            <span className="w-1 bg-[#00BAF2] rounded-full h-3 animate-pulse" />
            <span className="w-1 bg-[#002970] rounded-full h-6 animate-pulse delay-75" />
            <span className="w-1 bg-[#00BAF2] rounded-full h-4 animate-pulse delay-150" />
            <span className="w-1 bg-[#002970] rounded-full h-5 animate-pulse delay-100" />
            <span className="w-1 bg-[#00BAF2] rounded-full h-2 animate-pulse" />
          </div>
        )}

        {/* Live Transcription Box */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-left min-h-[75px] max-h-32 overflow-y-auto mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            {voiceState.transcript ? 'You said:' : 'Live Transcription'}
          </span>
          {voiceState.transcript ? (
            <p className="text-sm font-semibold text-slate-800">
              "{voiceState.transcript}"
            </p>
          ) : (
            <p className="text-xs text-slate-400 italic">
              {voiceState.isListening ? 'Speak naturally into your microphone...' : 'Press microphone to begin speaking.'}
            </p>
          )}
        </div>

        {voiceState.error && (
          <div className="mb-4 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-800 border border-amber-200 flex items-center justify-center gap-1.5 text-left">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
            <span>{voiceState.error} You can also tap any sample prompt below.</span>
          </div>
        )}

        {/* Quick Voice Demo Options (Accessible for users without mic or noisy room) */}
        <div className="text-left border-t border-slate-100 pt-3">
          <span className="text-[11px] font-semibold text-slate-500 block mb-2">
            Or test simulated voice phrases:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleVoicePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulatedVoice(prompt)}
                className="rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-[#002970] hover:border-blue-200 border border-slate-200 px-2.5 py-1 text-xs text-slate-700 transition flex items-center gap-1.5"
              >
                <span>🗣️ {prompt}</span>
                <ArrowRight className="h-3 w-3 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
