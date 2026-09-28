import React, { useState } from 'react';
import { ShieldCheck, Lock, Fingerprint, KeyRound, AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { authService } from '../../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'otp' | 'biometric'>('otp');

  if (!isOpen) return null;

  const handleVerifyOtp = (codeToUse?: string) => {
    const code = codeToUse || otp;
    const res = authService.verifyWithOtp(code);
    if (res.success) {
      setSuccessMsg(res.message);
      setError(null);
      setTimeout(() => {
        setSuccessMsg(null);
        setOtp('');
        onSuccess();
        onClose();
      }, 700);
    } else {
      setError(res.message);
    }
  };

  const handleBiometric = () => {
    const res = authService.verifyWithBiometrics();
    setSuccessMsg(res.message);
    setError(null);
    setTimeout(() => {
      setSuccessMsg(null);
      onSuccess();
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#002970] border border-blue-100">
            <ShieldCheck className="h-6 w-6 text-[#00BAF2]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#002970]">Secure Verification Required</h3>
            <p className="text-xs text-slate-500">Autonomous action requires simulated authorization</p>
          </div>
        </div>

        <div className="flex rounded-lg bg-slate-100 p-1 mb-5">
          <button
            onClick={() => setActiveTab('otp')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition ${
              activeTab === 'otp' ? 'bg-white text-[#002970] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <KeyRound className="h-3.5 w-3.5" />
            Demo OTP Verification
          </button>
          <button
            onClick={() => setActiveTab('biometric')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition ${
              activeTab === 'biometric' ? 'bg-white text-[#002970] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Fingerprint className="h-3.5 w-3.5" />
            Demo Biometric
          </button>
        </div>

        {activeTab === 'otp' ? (
          <div className="space-y-4">
            <div className="rounded-xl bg-blue-50/70 p-3.5 border border-blue-100/80 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">Simulated Security Code</span>
                <span className="inline-flex items-center gap-1 rounded bg-[#002970] px-2 py-0.5 text-xs font-mono font-bold text-white tracking-widest">
                  123456
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                For this hackathon prototype, use the demo OTP code above to authenticate account access.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Enter 6-Digit Verification Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setError(null);
                  }}
                  placeholder="e.g. 123456"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-center text-lg font-mono tracking-widest text-[#002970] focus:border-[#00BAF2] focus:outline-hidden focus:ring-2 focus:ring-[#00BAF2]/20"
                />
                <button
                  type="button"
                  onClick={() => {
                    setOtp('123456');
                    handleVerifyOtp('123456');
                  }}
                  className="shrink-0 rounded-xl bg-slate-100 hover:bg-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition"
                >
                  Autofill
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                {error}
              </p>
            )}

            {successMsg && (
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                {successMsg}
              </p>
            )}

            <button
              onClick={() => handleVerifyOtp()}
              className="w-full rounded-xl bg-[#002970] hover:bg-[#001f56] py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/10 transition active:scale-[0.99]"
            >
              Verify & Proceed
            </button>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 border-2 border-cyan-200 text-[#00BAF2] animate-pulse">
              <Fingerprint className="h-10 w-10" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 text-sm">Simulate Biometric Verification</h4>
              <p className="text-xs text-slate-500 mt-1">
                One-touch simulated FaceID / Fingerprint authorization
              </p>
            </div>
            <button
              onClick={handleBiometric}
              className="w-full rounded-xl bg-[#002970] hover:bg-[#001f56] py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/10 transition"
            >
              Simulate Biometric Scan
            </button>
          </div>
        )}

        <div className="mt-5 rounded-lg bg-amber-50 p-2.5 border border-amber-200/60 flex items-start gap-2 text-left">
          <Lock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-900 leading-tight">
            <strong>Security Notice:</strong> Never share your real UPI PIN or banking credentials in chat or voice. Paytm AssistX never requests your PIN.
          </p>
        </div>
      </div>
    </div>
  );
};
