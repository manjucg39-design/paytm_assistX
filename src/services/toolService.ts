import { INITIAL_TRANSACTIONS } from '../data/transactions';
import { INITIAL_USER } from '../data/users';
import { Transaction, UserAccount } from '../types';

// In-memory state for the active session
let currentTransactions: Transaction[] = [...INITIAL_TRANSACTIONS];
let currentUser: UserAccount = { ...INITIAL_USER };

export const toolService = {
  // Reset demo data to pristine initial state
  resetData: () => {
    currentTransactions = JSON.parse(JSON.stringify(INITIAL_TRANSACTIONS));
    currentUser = JSON.parse(JSON.stringify(INITIAL_USER));
    return { success: true, message: 'Synthetic demo data has been reset to defaults.' };
  },

  getAllTransactions: (): Transaction[] => {
    return [...currentTransactions];
  },

  getUserAccount: (): UserAccount => {
    return { ...currentUser };
  },

  // Tool 1: get_transaction
  getTransaction: async (query: string | number): Promise<{ success: boolean; transaction?: Transaction; message?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    
    const queryStr = String(query).toLowerCase().trim();
    const queryNum = parseFloat(queryStr.replace(/[^0-9.]/g, ''));

    // Check exact or partial ID match
    let found = currentTransactions.find(t => t.id.toLowerCase() === queryStr);

    // Check amount match if query mentions 850, 2000, 1500, etc.
    if (!found && !isNaN(queryNum) && queryNum > 0) {
      found = currentTransactions.find(t => t.amount === queryNum);
    }

    // Check counterparty match
    if (!found) {
      found = currentTransactions.find(t => 
        t.counterparty.toLowerCase().includes(queryStr) || 
        queryStr.includes(t.counterparty.toLowerCase())
      );
    }

    if (found) {
      return { success: true, transaction: { ...found } };
    }

    return { 
      success: false, 
      message: `No transaction found matching "${query}". Try providing an amount like ₹850 or Transaction ID.` 
    };
  },

  // Tool 2: check_payment_status
  checkPaymentStatus: async (txnId: string): Promise<{ 
    success: boolean; 
    status?: string; 
    reason?: string; 
    bankRef?: string; 
    amount?: number;
    transaction?: Transaction;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const txn = currentTransactions.find(t => t.id === txnId) || currentTransactions.find(t => t.amount === 850);
    
    if (!txn) {
      return { success: false, reason: 'Transaction record not found' };
    }

    return {
      success: true,
      status: txn.status,
      amount: txn.amount,
      reason: txn.failureReason || 'Completed successfully',
      bankRef: txn.bankRef,
      transaction: { ...txn }
    };
  },

  // Tool 3: check_refund_status
  checkRefundStatus: async (txnId: string): Promise<{
    success: boolean;
    refundStatus: string;
    expectedDate: string;
    timeline: string;
    arn: string;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const txn = currentTransactions.find(t => t.id === txnId) || currentTransactions.find(t => t.amount === 850);
    
    return {
      success: true,
      refundStatus: txn?.refundStatus || 'REVERSAL_INITIATED',
      expectedDate: 'Within 24-48 business hours (T+2 banking turnaround)',
      timeline: 'NPCI Bank Gateway Reversal in progress. Amount will reflect in source UPI account automatically.',
      arn: 'ARN/PAYTM/REV' + Math.floor(100000000 + Math.random() * 900000000)
    };
  },

  // Tool 4: initiate_refund
  initiateRefund: async (txnId: string): Promise<{
    success: boolean;
    ticketId: string;
    status: string;
    message: string;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const txn = currentTransactions.find(t => t.id === txnId) || currentTransactions.find(t => t.amount === 850);
    
    if (txn) {
      txn.refundStatus = 'REVERSAL_INITIATED';
    }

    return {
      success: true,
      ticketId: 'PAYTM-REV-' + Math.floor(10000 + Math.random() * 90000),
      status: 'REVERSAL_ACCELERATED',
      message: 'Automated banking reversal ticket dispatched to beneficiary bank switch.'
    };
  },

  // Tool 5: search_transactions
  searchTransactions: async (params: {
    name?: string;
    type?: string;
    minAmount?: number;
    maxAmount?: number;
    dateFilter?: 'today' | 'yesterday' | 'all';
  }): Promise<{ success: boolean; count: number; transactions: Transaction[] }> => {
    await new Promise((resolve) => setTimeout(resolve, 350));

    let results = [...currentTransactions];

    if (params.name) {
      const q = params.name.toLowerCase();
      results = results.filter(t => t.counterparty.toLowerCase().includes(q) || (t.note && t.note.toLowerCase().includes(q)));
    }

    if (params.type) {
      results = results.filter(t => t.type.toLowerCase() === params.type?.toLowerCase());
    }

    if (params.minAmount !== undefined) {
      results = results.filter(t => t.amount >= params.minAmount!);
    }

    if (params.maxAmount !== undefined) {
      results = results.filter(t => t.amount <= params.maxAmount!);
    }

    if (params.dateFilter === 'today') {
      results = results.filter(t => t.date.toLowerCase() === 'today');
    } else if (params.dateFilter === 'yesterday') {
      results = results.filter(t => t.date.toLowerCase() === 'yesterday');
    }

    return {
      success: true,
      count: results.length,
      transactions: results
    };
  },

  // Tool 6: get_balance
  getBalance: async (): Promise<{
    success: boolean;
    balance: number;
    walletBalance: number;
    postpaidAvailable: number;
    lastUpdated: string;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      balance: currentUser.balance,
      walletBalance: currentUser.walletBalance,
      postpaidAvailable: currentUser.postpaidLimit - currentUser.postpaidUsed,
      lastUpdated: 'Live from Demo Primary Bank Account'
    };
  },

  // Tool 7: recharge
  recharge: async (params: {
    mobileNumber: string;
    amount: number;
    operator?: string;
  }): Promise<{
    success: boolean;
    transactionId: string;
    newBalance: number;
    message: string;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 550));
    
    const txnId = 'TXN' + Math.floor(10000 + Math.random() * 90000);
    const newTxn: Transaction = {
      id: txnId,
      counterparty: `Mobile Recharge (${params.operator || 'Jio'})`,
      amount: params.amount,
      type: 'RECHARGE',
      status: 'SUCCESS',
      date: 'Today',
      time: 'Just now',
      category: 'Recharge',
      method: 'WALLET',
      refundStatus: 'NONE',
      bankRef: 'WAL/' + txnId,
      note: `Mobile ${params.mobileNumber} · Demo pack`
    };

    currentTransactions.unshift(newTxn);
    currentUser.balance -= params.amount;
    currentUser.totalSpentMonth += params.amount;

    return {
      success: true,
      transactionId: txnId,
      newBalance: currentUser.balance,
      message: `Recharge of ₹${params.amount} to ${params.mobileNumber} was completed successfully.`
    };
  },

  // Tool 8: bill_payment
  billPayment: async (params: {
    billerName: string;
    consumerId: string;
    amount: number;
  }): Promise<{
    success: boolean;
    transactionId: string;
    bbpsRef: string;
    newBalance: number;
    message: string;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 550));

    const txnId = 'TXN' + Math.floor(10000 + Math.random() * 90000);
    const bbpsRef = 'BBPS/' + Math.floor(100000000 + Math.random() * 900000000);
    const newTxn: Transaction = {
      id: txnId,
      counterparty: params.billerName,
      amount: params.amount,
      type: 'BILL',
      status: 'SUCCESS',
      date: 'Today',
      time: 'Just now',
      category: 'Bills',
      method: 'UPI',
      refundStatus: 'NONE',
      bankRef: bbpsRef,
      note: `Consumer ID: ${params.consumerId} · BBPS verified`
    };

    currentTransactions.unshift(newTxn);
    currentUser.balance -= params.amount;
    currentUser.totalSpentMonth += params.amount;

    return {
      success: true,
      transactionId: txnId,
      bbpsRef,
      newBalance: currentUser.balance,
      message: `Bill payment of ₹${params.amount} to ${params.billerName} has been confirmed.`
    };
  }
};
