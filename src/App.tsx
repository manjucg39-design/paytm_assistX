/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ActionCardData, 
  AIActivityState, 
  ChatMessage, 
  SupportedLanguage, 
  Transaction, 
  UserAccount 
} from './types';
import { toolService } from './services/toolService';
import { authService } from './services/authService';
import { voiceService } from './services/voiceService';
import { aiAgent } from './services/aiAgent';
import { TRANSLATIONS } from './data/translations';

// Components
import { Sidebar, NavTab } from './components/Layout/Sidebar';
import { Navbar } from './components/Layout/Navbar';
import { AuthModal } from './components/AuthModal/AuthModal';
import { VoiceModal } from './components/VoiceAssistant/VoiceModal';

// Pages
import { HomePage } from './pages/Home/HomePage';
import { AssistantPage } from './pages/Assistant/AssistantPage';
import { TransactionsPage } from './pages/Transactions/TransactionsPage';
import { AccountPage } from './pages/Account/AccountPage';
import { InsightsPage } from './pages/Insights/InsightsPage';
import { KnowledgePage } from './pages/Knowledge/KnowledgePage';
import { ArchitecturePage } from './pages/Architecture/ArchitecturePage';

const INITIAL_ACTIVITY_STATE: AIActivityState = {
  currentIntent: 'None',
  authRequired: false,
  authVerified: false,
  activeTool: null,
  workflowStage: 'Ready',
  verificationStatus: 'idle',
  recentEvents: [
    {
      id: 'init-1',
      text: 'AI Teammate Engine Initialized',
      type: 'info',
      time: '12:00:00',
      done: true
    },
    {
      id: 'init-2',
      text: 'Synthetic Payment APIs & Reversal Switch Online',
      type: 'tool',
      time: '12:00:01',
      done: true
    }
  ]
};

const getInitialMessages = (lang: SupportedLanguage): ChatMessage[] => {
  let content = '';
  let followUps: string[] = [];
  switch (lang) {
    case 'kn':
      content = `ನಮಸ್ಕಾರ! ನಾನು **Paytm AssistX**, ಪಾವತಿಗಳು ಮತ್ತು ಗ್ರಾಹಕ ಬೆಂಬಲಕ್ಕಾಗಿ ನಿಮ್ಮ ಸ್ವಾಯತ್ತ AI ಸಹಯೋಗಿ.\n\nನಾನು ಕೇವಲ ಉತ್ತರಿಸುವುದಿಲ್ಲ—ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಂಡು, ವಹಿವಾಟು ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ಬ್ಯಾಂಕಿಂಗ್ ಉಪಕರಣಗಳನ್ನು ಬಳಸಿ ಪಾವತಿ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸುತ್ತೇನೆ.\n\nವಿಫಲ ಪಾವತಿಯ ಬಗ್ಗೆ ಕೇಳಿ, ಇಂದು ಯಾರು ಹಣ ಕಳುಹಿಸಿದ್ದಾರೆಂದು ಹುಡುಕಿ, ಅಥವಾ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲಿಸಿ.`;
      followUps = [
        'ನನ್ನ ಪಾವತಿ ವಿಫಲವಾಗಿದೆ ಮತ್ತು ₹850 ಕಡಿತಗೊಂಡಿದೆ.',
        'ನನಗೆ ಇವತ್ತು ಯಾರು ಹಣ ಕಳುಹಿಸಿದ್ದಾರೆ?',
        'ನನ್ನ ಖಾತೆಯ ಶಿಲ್ಕು ಎಷ್ಟು?',
        'Paytm Postpaid ಎಂದರೇನು?'
      ];
      break;
    case 'hi':
      content = `नमस्ते! मैं **Paytm AssistX** हूँ, भुगतान और ग्राहक सहायता के लिए आपका स्वायत्त AI साथी।\n\nमैं केवल प्रश्नों का उत्तर नहीं देता—आपकी समस्या को समझकर, लेन-देन की जांच करता हूँ और समस्याओं का समाधान करता हूँ।\n\nविफल भुगतान के बारे में पूछें, आज किसने पैसे भेजे हैं खोजें, या अपना बैंक बैलेंस जांचें।`;
      followUps = [
        'मेरा पेमेंट फेल हो गया और ₹850 कट गए।',
        'आज मुझे किसने पैसे भेजे?',
        'मेरा वर्तमान बैलेंस क्या है?',
        'Paytm Postpaid क्या है?'
      ];
      break;
    case 'ta':
      content = `வணக்கம்! நான் **Paytm AssistX**, பணம் செலுத்துதல் மற்றும் வாடிக்கையாளர் ஆதரவிற்கான உங்கள் AI தோழர்.\n\nதோல்வியடைந்த கட்டணம் குறித்து கேளுங்கள், இன்று யார் பணம் அனுப்பினார்கள் என்று சரிபாருங்கள், அல்லது கணக்கு இருப்பை அறியுங்கள்.`;
      followUps = [
        'எனது பணம் செலுத்துதல் தோல்வியடைந்தது, ₹850 கழிக்கப்பட்டது.',
        'இன்று எனக்கு யார் பணம் அனுப்பினார்கள்?',
        'எனது தற்போதைய இருப்பு என்ன?',
        'Paytm Postpaid என்றால் என்ன?'
      ];
      break;
    case 'te':
      content = `నమస్కారం! నేను **Paytm AssistX**, చెల్లింపులు మరియు కస్టమర్ సపోర్ట్ కోసం మీ స్వయంప్రతిపత్తి AI సహచరుడిని.\n\nవిఫలమైన చెల్లింపుల గురించి అడగండి, ఈ రోజు ఎవరు డబ్బు పంపారో తెలుసుకోండి, లేదా మీ బ్యాంక్ బ్యాలెన్స్ తనిఖీ చేయండి.`;
      followUps = [
        'నా చెల్లింపు విఫలమైంది మరియు ₹850 కట్ అయ్యాయి.',
        'ఈ రోజు నాకు ఎవరు డబ్బు పంపారు?',
        'నా ప్రస్తుత బ్యాలెన్స్ ఎంత?',
        'Paytm Postpaid అంటే ఏమిటి?'
      ];
      break;
    case 'en':
    default:
      content = `Hello! I'm **Paytm AssistX**, your autonomous AI teammate for payments and customer support.\n\nI don't just answer questions—I understand your issue, inspect transaction records, run simulated banking tools, verify reversals, and resolve payment problems end-to-end.\n\nTry asking about a failed payment, search who sent you money today, or check your account balance.`;
      followUps = [
        'My payment failed and ₹850 was deducted.',
        'Who sent me money today?',
        'What is my current balance?',
        'What is Paytm Postpaid?'
      ];
      break;
  }

  return [{
    id: 'welcome-msg',
    role: 'assistant',
    content,
    timestamp: 'Just now',
    suggestedFollowUps: followUps,
    language: lang
  }];
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  
  // Data State
  const [transactions, setTransactions] = useState<Transaction[]>(() => toolService.getAllTransactions());
  const [user, setUser] = useState<UserAccount>(() => toolService.getUserAccount());
  const [isVerified, setIsVerified] = useState<boolean>(() => authService.isVerified());

  // Conversation & AI State
  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages('en'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activityState, setActivityState] = useState<AIActivityState>(INITIAL_ACTIVITY_STATE);

  // Modals & Drawers
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showMobileActivity, setShowMobileActivity] = useState<boolean>(false);

  // Synchronize authService subscription
  useEffect(() => {
    const unsub = authService.subscribe((verified) => {
      setIsVerified(verified);
      setActivityState(prev => ({
        ...prev,
        authVerified: verified,
        recentEvents: [
          ...prev.recentEvents,
          {
            id: 'auth-evt-' + Date.now(),
            text: verified ? '✓ Account Verified with Demo Credentials' : 'Session Unverified',
            type: 'auth',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            done: verified
          }
        ]
      }));
    });
    return () => unsub();
  }, []);

  // Handle explicit language change
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    aiAgent.setLanguage(lang);

    // If only welcome message is present, refresh it to the chosen language
    setMessages(prev => {
      if (prev.length <= 1) {
        return getInitialMessages(lang);
      }
      return prev;
    });
  };

  // Send query into autonomous AI teammate pipeline
  const handleSendMessage = async (queryText: string, isVoice: boolean = false) => {
    if (!queryText.trim() || isLoading) return;

    // Switch to Assistant tab if not already on it
    if (currentTab !== 'assistant') {
      setCurrentTab('assistant');
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: queryText,
      timestamp,
      audioSpoken: isVoice,
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Update activity state
    setActivityState(prev => ({
      ...prev,
      workflowStage: 'Processing Query',
      verificationStatus: 'in_progress',
      recentEvents: [
        ...prev.recentEvents,
        {
          id: 'query-' + Date.now(),
          text: `Query received: "${queryText.length > 35 ? queryText.slice(0, 35) + '...' : queryText}"`,
          type: 'info',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          done: true
        }
      ]
    }));

    try {
      const responseMsg = await aiAgent.processQuery(queryText, currentLanguage, {
        onStepUpdate: (step) => {
          // Live step telemetry
        },
        onActivityEvent: (event) => {
          setActivityState(prev => ({
            ...prev,
            recentEvents: [...prev.recentEvents, event]
          }));
        },
        onIntentIdentified: (intents, mainBranch) => {
          setActivityState(prev => ({
            ...prev,
            currentIntent: intents.join(', '),
            mainBranch: mainBranch
          }));
        },
        onToolActive: (toolName) => {
          setActivityState(prev => ({
            ...prev,
            activeTool: toolName
          }));
        },
        onAuthRequired: () => {
          setActivityState(prev => ({
            ...prev,
            authRequired: true
          }));
          setIsAuthModalOpen(true);
        }
      });

      // Synchronize language if regional script was detected
      if (responseMsg.language && responseMsg.language !== currentLanguage) {
        setCurrentLanguage(responseMsg.language);
      }

      // Update state with final message
      setMessages(prev => [...prev, responseMsg]);

      // If user queried with voice, automatically speak the AI response in active language
      if (isVoice) {
        voiceService.speak(responseMsg.content, responseMsg.language || currentLanguage);
      }

      // Refresh memory data in case tools modified balance or transactions
      setTransactions(toolService.getAllTransactions());
      setUser(toolService.getUserAccount());

      setActivityState(prev => ({
        ...prev,
        activeTool: null,
        mainBranch: responseMsg.mainBranch,
        workflowStage: 'Completed',
        verificationStatus: responseMsg.isVerifiedResolution ? 'verified' : 'idle',
        recentEvents: [
          ...prev.recentEvents,
          {
            id: 'resp-' + Date.now(),
            text: `✓ Response dispatched to customer in ${(responseMsg.language || currentLanguage).toUpperCase()}`,
            type: 'verify',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            done: true
          }
        ]
      }));
    } catch (err: any) {
      console.error('AI processing error:', err);
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: `I encountered an unexpected issue while accessing the demo banking service. Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Execute interactive card action (e.g. Confirm Recharge, Confirm Bill Payment)
  const handleExecuteCardAction = async (card: ActionCardData) => {
    setIsLoading(true);
    setActivityState(prev => ({
      ...prev,
      activeTool: card.type === 'RECHARGE_CONFIRMATION' ? 'recharge()' : 'billPayment()',
      workflowStage: 'Executing Action',
      verificationStatus: 'in_progress'
    }));

    try {
      const result = await aiAgent.executeCardAction(card);

      // Update the card in message
      setMessages(prev => {
        return prev.map(m => {
          if (m.actionCard === card) {
            return {
              ...m,
              actionCard: result.updatedCard,
              steps: [...(m.steps || []), ...result.steps]
            };
          }
          return m;
        });
      });

      // Add a confirmation response message
      const confirmMsg: ChatMessage = {
        id: 'confirm-' + Date.now(),
        role: 'assistant',
        content: result.confirmationText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isVerifiedResolution: true,
        steps: result.steps
      };

      setMessages(prev => [...prev, confirmMsg]);

      // Refresh data
      setTransactions(toolService.getAllTransactions());
      setUser(toolService.getUserAccount());

      setActivityState(prev => ({
        ...prev,
        activeTool: null,
        workflowStage: 'Action Verified',
        verificationStatus: 'verified',
        recentEvents: [
          ...prev.recentEvents,
          {
            id: 'action-done-' + Date.now(),
            text: `✓ Action completed and verified with banking switch`,
            type: 'verify',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            done: true
          }
        ]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Reset demo data to pristine state
  const handleResetDemo = () => {
    toolService.resetData();
    authService.resetAuth();
    aiAgent.resetContext();
    aiAgent.setLanguage(currentLanguage);
    voiceService.stopSpeaking();
    voiceService.stopListening();

    setTransactions(toolService.getAllTransactions());
    setUser(toolService.getUserAccount());
    setIsVerified(false);
    setMessages(getInitialMessages(currentLanguage));
    setActivityState(INITIAL_ACTIVITY_STATE);
  };

  // Pre-load the Primary Benchmark Scenario:
  // "My payment failed and ₹850 was deducted."
  const handleLoadHackathonDemo = () => {
    handleResetDemo();
    setCurrentTab('assistant');
    setTimeout(() => {
      handleSendMessage('My payment failed and ₹850 was deducted.');
    }, 200);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-slate-900 font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onResetDemo={handleResetDemo}
        onLoadHackathonDemo={handleLoadHackathonDemo}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenVoice={() => setIsVoiceModalOpen(true)}
          isVerified={isVerified}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          language={currentLanguage}
          onToggleActivityMobile={currentTab === 'assistant' ? () => setShowMobileActivity(!showMobileActivity) : undefined}
        />

        {/* Tab Route Content */}
        <main className="flex-1 flex overflow-hidden">
          {currentTab === 'home' && (
            <HomePage
              onStartAssistant={() => setCurrentTab('assistant')}
              onOpenVoice={() => setIsVoiceModalOpen(true)}
              onSelectPrompt={(p) => {
                setCurrentTab('assistant');
                handleSendMessage(p);
              }}
              language={currentLanguage}
            />
          )}

          {currentTab === 'assistant' && (
            <AssistantPage
              messages={messages}
              onSendMessage={(txt) => handleSendMessage(txt)}
              onOpenVoice={() => setIsVoiceModalOpen(true)}
              isLoading={isLoading}
              language={currentLanguage}
              activityState={activityState}
              onExecuteCardAction={handleExecuteCardAction}
              onResetChat={() => {
                aiAgent.resetContext();
                aiAgent.setLanguage(currentLanguage);
                setMessages(getInitialMessages(currentLanguage));
              }}
              showMobileActivity={showMobileActivity}
              onCloseMobileActivity={() => setShowMobileActivity(false)}
            />
          )}

          {currentTab === 'transactions' && (
            <TransactionsPage
              transactions={transactions}
              onAskAIAboutTxn={(query) => {
                setCurrentTab('assistant');
                handleSendMessage(query);
              }}
            />
          )}

          {currentTab === 'account' && (
            <AccountPage
              user={user}
              isVerified={isVerified}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
            />
          )}

          {currentTab === 'insights' && (
            <InsightsPage
              user={user}
              transactions={transactions}
              onAskAIAboutSpending={(q) => {
                setCurrentTab('assistant');
                handleSendMessage(q);
              }}
            />
          )}

          {currentTab === 'knowledge' && (
            <KnowledgePage
              onAskAIQuery={(q) => {
                setCurrentTab('assistant');
                handleSendMessage(q);
              }}
            />
          )}

          {currentTab === 'architecture' && (
            <ArchitecturePage />
          )}
        </main>
      </div>

      {/* Global Simulated Auth Modal (OTP 123456 / Biometric) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsVerified(true);
        }}
      />

      {/* Global Voice Assistant Modal */}
      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onQuerySubmit={(text, isVoice) => handleSendMessage(text, isVoice)}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}
