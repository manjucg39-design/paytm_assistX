type AuthListener = (verified: boolean) => void;

class AuthService {
  private verified: boolean = false;
  private listeners: Set<AuthListener> = new Set();

  public isVerified(): boolean {
    return this.verified;
  }

  public subscribe(listener: AuthListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.verified));
  }

  public verifyWithOtp(otp: string): { success: boolean; message: string } {
    if (otp.trim() === '123456') {
      this.verified = true;
      this.notify();
      return { success: true, message: 'Account securely verified with Demo OTP.' };
    }
    return { success: false, message: 'Incorrect Demo OTP. Please enter 123456.' };
  }

  public verifyWithBiometrics(): { success: boolean; message: string } {
    this.verified = true;
    this.notify();
    return { success: true, message: 'Biometric verification confirmed.' };
  }

  public resetAuth(): void {
    this.verified = false;
    this.notify();
  }
}

export const authService = new AuthService();
