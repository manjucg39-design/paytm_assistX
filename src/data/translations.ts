import { LanguageOption, SupportedLanguage } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' }
];

export interface TranslationStrings {
  appTitle: string;
  tagline: string;
  voiceTagline: string;
  heroSubtitle: string;
  startAssistant: string;
  tryVoice: string;
  failedPaymentPrompt: string;
  transactionSearchPrompt: string;
  balancePrompt: string;
  postpaidPrompt: string;
  voiceExamplePrompt: string;
  inputPlaceholder: string;
  listening: string;
  speaking: string;
  listenResponse: string;
  youSaid: string;
  resolutionVerified: string;
  authRequired: string;
  authDescription: string;
  verifyAccount: string;
  demoOtpLabel: string;
  cancel: string;
  confirm: string;
  recentTransactions: string;
  noTransactions: string;
  askAboutTransactions: string;
  insightsTitle: string;
  spendingBreakdown: string;
  knowledgeTitle: string;
  searchKnowledge: string;
  demoModeBadge: string;
  resetDemoData: string;
  loadHackathonDemo: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationStrings> = {
  en: {
    appTitle: 'Paytm AssistX',
    tagline: 'Ask. Understand. Act. Resolve.',
    voiceTagline: 'Speak or type. Your AI teammate understands and gets it done.',
    heroSubtitle: 'Speak or type what you need. AssistX understands the context, chooses the right workflow, securely uses the required tools, takes supported actions, verifies the result, and responds.',
    startAssistant: 'Start with AI Assistant',
    tryVoice: 'Try Voice Assistant',
    failedPaymentPrompt: 'My payment failed and ₹850 was deducted.',
    transactionSearchPrompt: 'Who sent me money today?',
    balancePrompt: 'What is my current balance?',
    postpaidPrompt: 'What is Paytm Postpaid?',
    voiceExamplePrompt: 'Did Rahul send me money today?',
    inputPlaceholder: 'Ask anything about your payment, transactions or Paytm services…',
    listening: 'Listening...',
    speaking: 'Playing audio response...',
    listenResponse: 'Listen',
    youSaid: 'You said:',
    resolutionVerified: 'Resolution Verified',
    authRequired: 'Secure Verification Required',
    authDescription: 'This request requires sensitive account verification.',
    verifyAccount: 'Verify Account',
    demoOtpLabel: 'Demo OTP: 123456',
    cancel: 'Cancel',
    confirm: 'Confirm',
    recentTransactions: 'Recent Transactions',
    noTransactions: 'No matching transactions found.',
    askAboutTransactions: 'Ask about your transactions…',
    insightsTitle: 'Financial Insights',
    spendingBreakdown: 'Monthly Spending Breakdown',
    knowledgeTitle: 'Paytm Knowledge Assistant',
    searchKnowledge: 'Search Paytm topics or guides...',
    demoModeBadge: 'Demo Mode · Synthetic Data',
    resetDemoData: 'Reset Demo Data',
    loadHackathonDemo: 'Load Hackathon Demo'
  },
  kn: {
    appTitle: 'Paytm AssistX',
    tagline: 'ಕೇಳಿ. ಅರ್ಥೈಸಿಕೊಳ್ಳಿ. ಕಾರ್ಯನಿರ್ವಹಿಸಿ. ಪರಿಹರಿಸಿ.',
    voiceTagline: 'ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ. ನಿಮ್ಮ AI ಸಹಯೋಗಿ ಅರ್ಥಮಾಡಿಕೊಂಡು ಕೆಲಸ ಪೂರ್ಣಗೊಳಿಸುತ್ತದೆ.',
    heroSubtitle: 'ನಿಮಗೆ ಬೇಕಾದುದನ್ನು ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ. AssistX ಸಂದರ್ಭವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತದೆ, ಸರಿಯಾದ ಕಾರ್ಯವಿಧಾನವನ್ನು ಆಯ್ಕೆ ಮಾಡುತ್ತದೆ, ಸುರಕ್ಷಿತವಾಗಿ ಉಪಕರಣಗಳನ್ನು ಬಳಸುತ್ತದೆ ಮತ್ತು ಪರಿಹಾರವನ್ನು ನೀಡುತ್ತದೆ.',
    startAssistant: 'AI ಸಹಾಯಕ ಪ್ರಾರಂಭಿಸಿ',
    tryVoice: 'ಧ್ವನಿ ಸಹಾಯಕ ಬಳಸಿ',
    failedPaymentPrompt: 'ನನ್ನ ಪಾವತಿ ವಿಫಲವಾಗಿದೆ ಮತ್ತು ₹850 ಕಡಿತಗೊಂಡಿದೆ.',
    transactionSearchPrompt: 'ನನಗೆ ಇವತ್ತು ಯಾರು ಹಣ ಕಳುಹಿಸಿದ್ದಾರೆ?',
    balancePrompt: 'ನನ್ನ ಖಾತೆಯ ಶಿಲ್ಕು ಎಷ್ಟು?',
    postpaidPrompt: 'Paytm Postpaid ಎಂದರೇನು?',
    voiceExamplePrompt: 'ರಾಹುಲ್ ನನಗೆ ಇಂದು ಹಣ ಕಳುಹಿಸಿದ್ದಾನೆಯೇ?',
    inputPlaceholder: 'ನಿಮ್ಮ ಪಾವತಿ, ವಹಿವಾಟು ಅಥವಾ ಸೇವೆಗಳ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ…',
    listening: 'ಆಲಿಸುತ್ತಿದೆ...',
    speaking: 'ಧ್ವನಿ ಪ್ಲೇ ಆಗುತ್ತಿದೆ...',
    listenResponse: 'ಕೇಳಿ',
    youSaid: 'ನೀವು ಹೇಳಿದ್ದು:',
    resolutionVerified: 'ಪರಿಹಾರ ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
    authRequired: 'ಸುರಕ್ಷಿತ ದೃಢೀಕರಣದ ಅಗತ್ಯವಿದೆ',
    authDescription: 'ಈ ಕ್ರಿಯೆಗೆ ಖಾತೆಯ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ.',
    verifyAccount: 'ಖಾತೆ ಪರಿಶೀಲಿಸಿ',
    demoOtpLabel: 'ಡೆಮೊ OTP: 123456',
    cancel: 'ರದ್ದುಗೊಳಿಸಿ',
    confirm: 'ದೃಢೀಕರಿಸಿ',
    recentTransactions: 'ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು',
    noTransactions: 'ಹೊಂದಿಕೆಯಾಗುವ ವಹಿವಾಟುಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
    askAboutTransactions: 'ನಿಮ್ಮ ವಹಿವಾಟುಗಳ ಬಗ್ಗೆ ಕೇಳಿ…',
    insightsTitle: 'ಹಣಕಾಸು ಒಳನೋಟಗಳು',
    spendingBreakdown: 'ಮಾಸಿಕ ಖರ್ಚಿನ ವಿವರ',
    knowledgeTitle: 'Paytm ಜ್ಞಾನ ಸಹಾಯಕ',
    searchKnowledge: 'ವಿಷಯಗಳು ಅಥವಾ ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಹುಡುಕಿ...',
    demoModeBadge: 'ಡೆಮೊ ಮೋಡ್ · ಸಿಂಥೆಟಿಕ್ ಡೇಟಾ',
    resetDemoData: 'ಡೆಮೊ ಡೇಟಾ ಮರುಹೊಂದಿಸಿ',
    loadHackathonDemo: 'ಹ್ಯಾಕಥಾನ್ ಡೆಮೊ ಲೋಡ್ ಮಾಡಿ'
  },
  hi: {
    appTitle: 'Paytm AssistX',
    tagline: 'पूछें। समझें। कार्य करें। समाधान पाएं।',
    voiceTagline: 'बोलें या टाइप करें। आपका AI साथी समझेगा और काम पूरा करेगा।',
    heroSubtitle: 'बोलें या टाइप करें कि आपको क्या चाहिए। AssistX संदर्भ को समझता है, सही वर्कफ़्लो चुनता है, सुरक्षित रूप से एक्शन लेता है और समाधान देता है।',
    startAssistant: 'AI असिस्टेंट शुरू करें',
    tryVoice: 'वॉइस असिस्टेंट आज़माएं',
    failedPaymentPrompt: 'मेरा पेमेंट फेल हो गया और ₹850 कट गए।',
    transactionSearchPrompt: 'आज मुझे किसने पैसे भेजे?',
    balancePrompt: 'मेरा वर्तमान बैलेंस क्या है?',
    postpaidPrompt: 'Paytm Postpaid क्या है?',
    voiceExamplePrompt: 'क्या राहुल ने आज मुझे पैसे भेजे?',
    inputPlaceholder: 'अपने पेमेंट, ट्रांज़ैक्शन या Paytm सेवाओं के बारे में कुछ भी पूछें…',
    listening: 'सुन रहा है...',
    speaking: 'ऑडियो चल रहा है...',
    listenResponse: 'सुनें',
    youSaid: 'आपने कहा:',
    resolutionVerified: 'समाधान सत्यापित',
    authRequired: 'सुरक्षित सत्यापन आवश्यक है',
    authDescription: 'इस अनुरोध के लिए खाता सत्यापन आवश्यक है।',
    verifyAccount: 'खाता सत्यापित करें',
    demoOtpLabel: 'डेमो OTP: 123456',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    recentTransactions: 'हाल के लेन-देन',
    noTransactions: 'कोई मिलता-जुलता लेन-देन नहीं मिला।',
    askAboutTransactions: 'अपने लेन-देन के बारे में पूछें…',
    insightsTitle: 'वित्तीय विश्लेषण',
    spendingBreakdown: 'मासिक व्यय विवरण',
    knowledgeTitle: 'Paytm नॉलेज असिस्टेंट',
    searchKnowledge: 'विषय या गाइड खोजें...',
    demoModeBadge: 'डेमो मोड · सिंथेटिक डेटा',
    resetDemoData: 'डेमो डेटा रीसेट करें',
    loadHackathonDemo: 'हैकथॉन डेमो लोड करें'
  },
  ta: {
    appTitle: 'Paytm AssistX',
    tagline: 'கேளுங்கள். புரிந்து கொள்ளுங்கள். செயல்படுங்கள். தீர்வு காணுங்கள்.',
    voiceTagline: 'பேசுங்கள் அல்லது தட்டச்சு செய்யுங்கள். உங்கள் AI தோழர் புரிந்து கொண்டு செய்து முடிப்பார்.',
    heroSubtitle: 'உங்களுக்கு தேவையானதை பேசுங்கள் அல்லது தட்டச்சு செய்யுங்கள். AssistX உங்கள் தேவையை உணர்ந்து தீர்வு வழங்குகிறது.',
    startAssistant: 'AI உதவியாளரைத் தொடங்குங்கள்',
    tryVoice: 'குரல் உதவியாளரை முயற்சிக்கவும்',
    failedPaymentPrompt: 'எனது பணம் செலுத்துதல் தோல்வியடைந்தது, ₹850 கழிக்கப்பட்டது.',
    transactionSearchPrompt: 'இன்று எனக்கு யார் பணம் அனுப்பினார்கள்?',
    balancePrompt: 'எனது தற்போதைய இருப்பு என்ன?',
    postpaidPrompt: 'Paytm Postpaid என்றால் என்ன?',
    voiceExamplePrompt: 'ராகுல் இன்று எனக்கு பணம் அனுப்பினாரா?',
    inputPlaceholder: 'உங்கள் பணம் செலுத்துதல் அல்லது பரிவர்த்தனை பற்றி கேளுங்கள்…',
    listening: 'கேட்கிறது...',
    speaking: 'ஆடியோ ஒலிக்கிறது...',
    listenResponse: 'கேளுங்கள்',
    youSaid: 'நீங்கள் கூறியது:',
    resolutionVerified: 'தீர்வு சரிபார்க்கப்பட்டது',
    authRequired: 'பாதுகாப்பான சரிபார்ப்பு தேவை',
    authDescription: 'இந்த கோரிக்கைக்கு கணக்கு சரிபார்ப்பு தேவைப்படுகிறது.',
    verifyAccount: 'கணக்கைச் சரிபார்க்கவும்',
    demoOtpLabel: 'டெமோ OTP: 123456',
    cancel: 'ரத்துசெய்',
    confirm: 'உறுதிசெய்',
    recentTransactions: 'சமீபத்திய பரிவர்த்தனைகள்',
    noTransactions: 'பொருந்தும் பரிவர்த்தனைகள் எதுவும் இல்லை.',
    askAboutTransactions: 'பரிவர்த்தனைகளைப் பற்றி கேளுங்கள்…',
    insightsTitle: 'நிதி நுண்ணறிவு',
    spendingBreakdown: 'மாதாந்திர செலவு விவரம்',
    knowledgeTitle: 'Paytm அறிவு உதவியாளர்',
    searchKnowledge: 'வழிகாட்டிகளைத் தேடுங்கள்...',
    demoModeBadge: 'டெமோ பயன்முறை · மாதிரி தரவு',
    resetDemoData: 'டெமோ தரவை மீட்டமைக்கவும்',
    loadHackathonDemo: 'ஹேக்கத்தான் டெமோவை ஏற்றவும்'
  },
  te: {
    appTitle: 'Paytm AssistX',
    tagline: 'అడగండి. అర్థం చేసుకోండి. చర్య తీసుకోండి. పరిష్కరించండి.',
    voiceTagline: 'మాట్లాడండి లేదా టైప్ చేయండి. మీ AI సహచరుడు అర్థం చేసుకుని పూర్తి చేస్తాడు.',
    heroSubtitle: 'మీకు ఏమి కావాలో మాట్లాడండి లేదా టైప్ చేయండి. AssistX సరైన వర్క్‌ఫ్లోను ఎంచుకుని పరిష్కారాన్ని అందిస్తుంది.',
    startAssistant: 'AI అసిస్టెంట్‌ని ప్రారంభించండి',
    tryVoice: 'వాయిస్ అసిస్టెంట్‌ని ప్రయత్నించండి',
    failedPaymentPrompt: 'నా చెల్లింపు విఫలమైంది మరియు ₹850 కట్ అయ్యాయి.',
    transactionSearchPrompt: 'ఈ రోజు నాకు ఎవరు డబ్బు పంపారు?',
    balancePrompt: 'నా ప్రస్తుత బ్యాలెన్స్ ఎంత?',
    postpaidPrompt: 'Paytm Postpaid అంటే ఏమిటి?',
    voiceExamplePrompt: 'ఈ రోజు రాహుల్ నాకు డబ్బు పంపారా?',
    inputPlaceholder: 'మీ చెల్లింపులు, లావాదేవీల గురించి ఏదైనా అడగండి…',
    listening: 'వింటున్నది...',
    speaking: 'ఆడియో ప్లే అవుతోంది...',
    listenResponse: 'వినండి',
    youSaid: 'మీరు చెప్పినది:',
    resolutionVerified: 'పరిష్కారం ధృవీకరించబడింది',
    authRequired: 'సురక్షిత ధృవీకరణ అవసరం',
    authDescription: 'ఈ అభ్యర్థన కోసం ఖాతా ధృవీకరణ అవసరం.',
    verifyAccount: 'ఖాతాను ధృవీకరించండి',
    demoOtpLabel: 'డెమో OTP: 123456',
    cancel: 'రద్దు చేయి',
    confirm: 'ధృవీకరించు',
    recentTransactions: 'ఇటీవలి లావాదేవీలు',
    noTransactions: 'సరిపోలే లావాదేవీలు కనుగొనబడలేదు.',
    askAboutTransactions: 'లావాదేవీల గురించి అడగండి…',
    insightsTitle: 'ఆర్థిక గణాంకాలు',
    spendingBreakdown: 'నెలవారీ ఖర్చు వివరాలు',
    knowledgeTitle: 'Paytm నాలెడ్జ్ అసిస్టెంట్',
    searchKnowledge: 'గైడ్‌లను శోధించండి...',
    demoModeBadge: 'డెమో మోడ్ · సింథటిక్ ڈیٹا',
    resetDemoData: 'డెమో డేటాను రీసెట్ చేయండి',
    loadHackathonDemo: 'హ్యాకథాన్ డెమోని లోడ్ చేయండి'
  }
};
