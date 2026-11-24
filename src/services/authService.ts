import { AdminUser } from '../types/store';

const SESSION_KEY = 'amora_vogue_admin_session';
const AUTH_STORE_KEY = 'amora_vogue_admin_auth_state';
const RATE_LIMIT_KEY = 'amora_vogue_admin_rate_limit';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// Default initial admin credentials (can be overridden via environment variables)
const DEFAULT_INITIAL_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
const DEFAULT_INITIAL_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'AmoraVogue@2026';

interface StoredAuth {
  username: string;
  passwordHash: string;
  salt: string;
  updatedAt: string;
}

interface RateLimitState {
  failedAttempts: number;
  lockoutUntil: number | null;
}

interface AdminSession {
  token: string;
  user: AdminUser;
  expiresAt: number;
}

// SHA-256 with salt using native Web Crypto API
async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}:${password}:amora_vogue_salt_secret`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function generateRandomSalt(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array).map((b) => b.toString(16).padStart(2, '0')).join('');
}

class AuthService {
  private currentSession: AdminSession | null = null;
  private authInitialized = false;

  constructor() {
    this.init();
  }

  private async init() {
    if (this.authInitialized) return;

    // Check if initial admin is provisioned
    const stored = localStorage.getItem(AUTH_STORE_KEY);
    if (!stored) {
      const salt = generateRandomSalt();
      const passwordHash = await hashPassword(DEFAULT_INITIAL_PASSWORD, salt);
      const initialAuth: StoredAuth = {
        username: DEFAULT_INITIAL_USERNAME,
        passwordHash,
        salt,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(AUTH_STORE_KEY, JSON.stringify(initialAuth));
    }

    // Check existing session
    const sessionStr = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (sessionStr) {
      try {
        const session: AdminSession = JSON.parse(sessionStr);
        if (session.expiresAt > Date.now()) {
          this.currentSession = session;
        } else {
          this.logout();
        }
      } catch {
        this.logout();
      }
    }

    this.authInitialized = true;
  }

  public getRateLimitStatus(): { isLocked: boolean; remainingSeconds: number; attemptsRemaining: number } {
    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      if (!stored) return { isLocked: false, remainingSeconds: 0, attemptsRemaining: MAX_FAILED_ATTEMPTS };

      const state: RateLimitState = JSON.parse(stored);
      if (state.lockoutUntil && state.lockoutUntil > Date.now()) {
        const remainingSeconds = Math.ceil((state.lockoutUntil - Date.now()) / 1000);
        return { isLocked: true, remainingSeconds, attemptsRemaining: 0 };
      }

      // If lockout passed, reset
      if (state.lockoutUntil && state.lockoutUntil <= Date.now()) {
        localStorage.removeItem(RATE_LIMIT_KEY);
        return { isLocked: false, remainingSeconds: 0, attemptsRemaining: MAX_FAILED_ATTEMPTS };
      }

      const attemptsRemaining = Math.max(0, MAX_FAILED_ATTEMPTS - (state.failedAttempts || 0));
      return { isLocked: false, remainingSeconds: 0, attemptsRemaining };
    } catch {
      return { isLocked: false, remainingSeconds: 0, attemptsRemaining: MAX_FAILED_ATTEMPTS };
    }
  }

  private recordFailedAttempt() {
    try {
      const current = this.getRateLimitStatus();
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      const state: RateLimitState = stored ? JSON.parse(stored) : { failedAttempts: 0, lockoutUntil: null };

      state.failedAttempts = (state.failedAttempts || 0) + 1;
      if (state.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        state.lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
      }
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to record rate limit:', e);
    }
  }

  private resetRateLimit() {
    localStorage.removeItem(RATE_LIMIT_KEY);
  }

  public async login(usernameInput: string, passwordInput: string): Promise<{ success: boolean; error?: string }> {
    await this.init();

    const rateStatus = this.getRateLimitStatus();
    if (rateStatus.isLocked) {
      return {
        success: false,
        error: `Too many failed attempts. Please wait ${rateStatus.remainingSeconds} seconds before trying again.`,
      };
    }

    const storedStr = localStorage.getItem(AUTH_STORE_KEY);
    if (!storedStr) {
      return { success: false, error: 'Authentication service not initialized' };
    }

    const stored: StoredAuth = JSON.parse(storedStr);

    const cleanInputUsername = usernameInput.trim().toLowerCase();
    const cleanStoredUsername = stored.username.trim().toLowerCase();

    if (cleanInputUsername !== cleanStoredUsername) {
      this.recordFailedAttempt();
      const updatedStatus = this.getRateLimitStatus();
      return {
        success: false,
        error: updatedStatus.isLocked
          ? `Account temporarily locked for 5 minutes due to multiple failed attempts.`
          : `Invalid username or password. (${updatedStatus.attemptsRemaining} attempts remaining)`,
      };
    }

    const computedHash = await hashPassword(passwordInput, stored.salt);
    if (computedHash !== stored.passwordHash) {
      this.recordFailedAttempt();
      const updatedStatus = this.getRateLimitStatus();
      return {
        success: false,
        error: updatedStatus.isLocked
          ? `Account temporarily locked for 5 minutes due to multiple failed attempts.`
          : `Invalid username or password. (${updatedStatus.attemptsRemaining} attempts remaining)`,
      };
    }

    // Success: create 24-hour admin session
    this.resetRateLimit();

    const tokenArray = new Uint8Array(32);
    crypto.getRandomValues(tokenArray);
    const token = Array.from(tokenArray).map((b) => b.toString(16).padStart(2, '0')).join('');

    const session: AdminSession = {
      token,
      user: {
        id: 'admin-01',
        username: stored.username,
        email: 'care@amoravogue.lk',
        role: 'superadmin',
        createdAt: stored.updatedAt,
      },
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };

    this.currentSession = session;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    return { success: true };
  }

  public logout() {
    this.currentSession = null;
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  }

  public isAuthenticated(): boolean {
    if (!this.currentSession) {
      const sessionStr = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
      if (sessionStr) {
        try {
          const session: AdminSession = JSON.parse(sessionStr);
          if (session.expiresAt > Date.now()) {
            this.currentSession = session;
            return true;
          }
        } catch {
          return false;
        }
      }
      return false;
    }

    if (this.currentSession.expiresAt <= Date.now()) {
      this.logout();
      return false;
    }

    return true;
  }

  public getCurrentUser(): AdminUser | null {
    if (this.isAuthenticated() && this.currentSession) {
      return this.currentSession.user;
    }
    return null;
  }

  public async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    await this.init();

    if (!this.isAuthenticated()) {
      return { success: false, error: 'Unauthorized. Please log in first.' };
    }

    if (newPassword.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters long.' };
    }

    const storedStr = localStorage.getItem(AUTH_STORE_KEY);
    if (!storedStr) return { success: false, error: 'Auth store missing' };

    const stored: StoredAuth = JSON.parse(storedStr);
    const currentHash = await hashPassword(currentPassword, stored.salt);

    if (currentHash !== stored.passwordHash) {
      return { success: false, error: 'Incorrect current password.' };
    }

    const newSalt = generateRandomSalt();
    const newHash = await hashPassword(newPassword, newSalt);

    stored.passwordHash = newHash;
    stored.salt = newSalt;
    stored.updatedAt = new Date().toISOString();

    localStorage.setItem(AUTH_STORE_KEY, JSON.stringify(stored));
    return { success: true };
  }
}

export const authService = new AuthService();
