import React from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  CreditCard, 
  Wallet, 
  Building2, 
  Smartphone, 
  Lock, 
  QrCode, 
  ArrowUpRight, 
  ArrowDownLeft,
  KeyRound
} from 'lucide-react';
import { UserAccount } from '../../types';

interface AccountPageProps {
  user: UserAccount;
  isVerified: boolean;
  onOpenAuthModal: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  user,
  isVerified,
  onOpenAuthModal
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#002970] tracking-tight">
            My Account & Security
          </h1>
          <p className="text-xs text-slate-500">
            Synthetic demo customer identity & linked digital payment instruments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAuthModal}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition shadow-xs ${
              isVerified
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'bg-[#002970] text-white hover:bg-[#001f56]'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{isVerified ? '✓ Session Verified' : 'Verify Account with OTP'}</span>
          </button>
        </div>
      </div>

      {/* Security Status Banner */}
      <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/90 to-cyan-50/50 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#002970] text-white shadow-xs">
            <Lock className="h-5 w-5 text-[#00BAF2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#002970]">
                {isVerified ? '🔒 Verified account data' : 'Restricted demo session'}
              </span>
              <span className="text-[10px] bg-white border border-blue-200 text-blue-800 px-2 py-0.5 rounded font-mono font-bold">
                Level 2 Security
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Autonomous workflows check this status prior to querying balances or triggering refunds.
            </p>
          </div>
        </div>

        {!isVerified && (
          <button
            onClick={onOpenAuthModal}
            className="rounded-xl bg-[#002970] hover:bg-[#001f56] text-white px-4 py-2 text-xs font-bold transition"
          >
            Authenticate Session
          </button>
        )}
      </div>

      {/* Profile & Balances Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Customer Profile Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#002970] font-bold text-lg">
              AS
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{user.name}</h3>
              <span className="text-xs font-mono text-slate-400">{user.id}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Phone Number:</span>
              <span className="font-medium text-slate-800">{user.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Email:</span>
              <span className="font-medium text-slate-800">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Primary UPI ID:</span>
              <span className="font-mono font-bold text-[#002970]">{user.upiId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">KYC Status:</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                <ShieldCheck className="h-3 w-3" /> VERIFIED
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/70 text-center">
            <QrCode className="h-14 w-14 mx-auto text-[#002970] mb-1 opacity-80" />
            <span className="text-[10px] text-slate-500 font-mono">Scan to pay {user.upiId}</span>
          </div>
        </div>

        {/* Primary Bank Balance Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Demo Primary Bank</h3>
            </div>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-600">
              Savings A/C ····8942
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Available Account Balance
            </span>
            <div className="text-3xl font-black text-[#002970] tracking-tight mt-1">
              ₹{user.balance.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
              ✓ Synchronized with Demo Core Banking API
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <div className="rounded-xl bg-emerald-50/60 p-2.5 border border-emerald-100">
              <span className="text-[10px] text-slate-500 block">Received This Month</span>
              <span className="text-sm font-bold text-emerald-700">
                +₹{user.totalReceivedMonth.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Spent This Month</span>
              <span className="text-sm font-bold text-slate-800">
                -₹{user.totalSpentMonth.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Wallet & Postpaid Limits Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-cyan-600" />
              <h3 className="font-bold text-slate-900 text-sm">Wallet & BNPL Limit</h3>
            </div>
            <span className="text-[10px] bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded font-bold">
              Active
            </span>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Paytm Wallet Balance:</span>
              <span className="font-bold text-slate-900 text-sm">₹{user.walletBalance}</span>
            </div>
            <span className="text-[10px] text-slate-400 block">Fast PIN-less merchant checkouts</span>
          </div>

          <div className="rounded-xl bg-blue-50/50 p-3 border border-blue-100 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#002970] font-bold">Paytm Postpaid Credit:</span>
              <span className="font-extrabold text-[#002970] text-sm">
                ₹{(user.postpaidLimit - user.postpaidUsed).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#00BAF2] h-full rounded-full" 
                style={{ width: `${(user.postpaidUsed / user.postpaidLimit) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Used: ₹{user.postpaidUsed}</span>
              <span>Total Limit: ₹{user.postpaidLimit.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
