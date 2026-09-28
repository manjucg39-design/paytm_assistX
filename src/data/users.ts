import { UserAccount } from '../types';

export const INITIAL_USER: UserAccount = {
  id: 'USR-894120',
  name: 'Arjun Sharma',
  phone: '+91 98765 43210',
  email: 'arjun.sharma@example.com',
  upiId: 'arjun.sharma@paytm',
  balance: 24580,
  walletBalance: 1450,
  postpaidLimit: 25000,
  postpaidUsed: 420,
  totalReceivedMonth: 4350,
  totalSpentMonth: 12978,
  kycStatus: 'VERIFIED',
  isSecuredSession: false
};
