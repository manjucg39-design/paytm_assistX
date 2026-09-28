export type TransactionType = 'RECEIVED' | 'PAYMENT' | 'RECHARGE' | 'BILL' | 'REFUND';
export type TransactionStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'REVERSED';
export type PaymentMethod = 'UPI' | 'WALLET' | 'BANK' | 'POSTPAID';
export type RefundStatus = 'NONE' | 'ELIGIBLE' | 'REVERSAL_INITIATED' | 'COMPLETED';

export interface Transaction {
  id: string;
  counterparty: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  date: string;
  time: string;
  category: 'Transfers' | 'Recharge' | 'Bills' | 'Food' | 'Shopping' | 'Travel';
  method: PaymentMethod;
  refundStatus: RefundStatus;
  failureReason?: string;
  bankRef?: string;
  upiId?: string;
  note?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  email: string;
  upiId: string;
  balance: number;
  walletBalance: number;
  postpaidLimit: number;
  postpaidUsed: number;
  totalReceivedMonth: number;
  totalSpentMonth: number;
  kycStatus: 'VERIFIED' | 'PENDING';
  isSecuredSession: boolean;
}

export type SupportedLanguage = 'en' | 'kn' | 'hi' | 'ta' | 'te';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export type MainBranch = 'PAYMENT_SUPPORT' | 'TRANSACTION_ACCOUNT' | 'GENERAL_KNOWLEDGE' | 'UNKNOWN';

export interface StructuredIntentAnalysis {
  mainBranch: MainBranch;
  intents: IntentType[];
  language: SupportedLanguage;
  requiresAuth: boolean;
  requiresTool: boolean;
  requiresRag: boolean;
  confidence: number;
}

export type IntentType =
  | 'PAYMENT_ISSUE'
  | 'TRANSACTION_SEARCH'
  | 'ACCOUNT_BALANCE'
  | 'RECHARGE'
  | 'BILL_PAYMENT'
  | 'REFUND_STATUS'
  | 'GENERAL_KNOWLEDGE'
  | 'MULTI_INTENT'
  | 'UNKNOWN';

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  timestamp: string;
  toolName?: string;
  resultSummary?: string;
}

export interface ActionCardData {
  type: 'REFUND_SIMULATION' | 'RECHARGE_CONFIRMATION' | 'BILL_CONFIRMATION' | 'TRANSACTION_PREVIEW' | 'BALANCE_CARD';
  data: any;
  status: 'pending' | 'confirmed' | 'cancelled' | 'executed';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  language?: SupportedLanguage;
  intents?: IntentType[];
  mainBranch?: MainBranch;
  steps?: WorkflowStep[];
  actionCard?: ActionCardData;
  isVerifiedResolution?: boolean;
  audioSpoken?: boolean;
  toolsUsed?: string[];
  suggestedFollowUps?: string[];
}

export interface AIActivityState {
  currentIntent: string;
  mainBranch?: MainBranch;
  authRequired: boolean;
  authVerified: boolean;
  activeTool: string | null;
  workflowStage: string;
  verificationStatus: 'idle' | 'in_progress' | 'verified' | 'failed';
  recentEvents: Array<{
    id: string;
    text: string;
    type: 'intent' | 'auth' | 'tool' | 'action' | 'verify' | 'info';
    time: string;
    done: boolean;
  }>;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  keywords: string[];
  translations?: Partial<Record<SupportedLanguage, { title?: string; summary?: string; content: string }>>;
}
