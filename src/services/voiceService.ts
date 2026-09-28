import { SupportedLanguage } from '../types';

export interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  error: string | null;
}

type VoiceListener = (state: VoiceState) => void;

class VoiceService {
  private recognition: any = null;
  private state: VoiceState = {
    isListening: false,
    isSpeaking: false,
    transcript: '',
    error: null
  };
  private listeners: Set<VoiceListener> = new Set();
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = false;
          this.recognition.interimResults = true;
          this.recognition.maxAlternatives = 1;
        } catch (e) {
          console.warn('SpeechRecognition initialization error:', e);
        }
      }
    }
  }

  public subscribe(listener: VoiceListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private updateState(partial: Partial<VoiceState>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach(cb => cb(this.state));
  }

  public getLanguageCode(lang: SupportedLanguage): string {
    switch (lang) {
      case 'kn': return 'kn-IN';
      case 'hi': return 'hi-IN';
      case 'ta': return 'ta-IN';
      case 'te': return 'te-IN';
      case 'en':
      default: return 'en-IN';
    }
  }

  public startListening(
    lang: SupportedLanguage,
    onResult: (finalText: string) => void,
    onError?: (err: string) => void
  ) {
    this.stopSpeaking();
    this.updateState({ isListening: true, transcript: '', error: null });

    if (!this.recognition) {
      // Graceful fallback for environments/browsers where Web Speech API is not supported
      this.updateState({ error: 'Web Speech API not available on this browser. Use manual input or sample prompts.' });
      if (onError) onError('Speech recognition not supported');
      return;
    }

    try {
      this.recognition.lang = this.getLanguageCode(lang);
      
      this.recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        const currentText = final || interim;
        this.updateState({ transcript: currentText });

        if (final && final.trim().length > 0) {
          this.updateState({ isListening: false });
          onResult(final.trim());
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn('Speech recognition error event:', event.error);
        this.updateState({ isListening: false, error: event.error === 'not-allowed' ? 'Microphone permission denied.' : 'Voice recognition ended.' });
        if (onError) onError(event.error);
      };

      this.recognition.onend = () => {
        this.updateState({ isListening: false });
      };

      this.recognition.start();
    } catch (e: any) {
      console.warn('Could not start recognition:', e);
      this.updateState({ isListening: false, error: 'Could not access microphone.' });
      if (onError) onError(e.message);
    }
  }

  public stopListening() {
    if (this.recognition && this.state.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
    this.updateState({ isListening: false });
  }

  public speak(text: string, lang: SupportedLanguage = 'en', onDone?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    this.stopSpeaking();

    // Clean text of markdown asterisks, emojis or formatting for crisp voice readout
    const cleanText = text
      .replace(/[*#_~`]/g, '')
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '')
      .trim();

    if (!cleanText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = this.getLanguageCode(lang);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Select natural sounding Indian English or regional voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(v => v.lang.startsWith(lang) || v.lang.includes(lang));
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => {
        this.updateState({ isSpeaking: true });
      };

      utterance.onend = () => {
        this.updateState({ isSpeaking: false });
        if (onDone) onDone();
      };

      utterance.onerror = () => {
        this.updateState({ isSpeaking: false });
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      this.updateState({ isSpeaking: false });
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.updateState({ isSpeaking: false });
  }
}

export const voiceService = new VoiceService();
