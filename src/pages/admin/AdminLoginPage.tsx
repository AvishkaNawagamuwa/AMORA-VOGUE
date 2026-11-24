import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import { authService } from '../../services/authService';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rateStatus, setRateStatus] = useState(authService.getRateLimitStatus());

  // Prevent indexing
  useEffect(() => {
    let metaTag = document.querySelector('meta[name="robots"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'robots');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', 'noindex, nofollow');
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  // Countdown timer if rate-limited
  useEffect(() => {
    if (!rateStatus.isLocked) return;

    const interval = setInterval(() => {
      const status = authService.getRateLimitStatus();
      setRateStatus(status);
      if (!status.isLocked) {
        setError(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rateStatus.isLocked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.login(username, password);
      if (result.success) {
        const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Authentication failed');
        setRateStatus(authService.getRateLimitStatus());
      }
    } catch (err: any) {
      setError(err?.message || 'A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 font-sans select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        {/* Monogram Logo */}
        <div className="w-16 h-16 mx-auto rounded-full bg-white border border-gold/40 flex items-center justify-center shadow-sm mb-4">
          <img
            src="/logo.png"
            alt="AMORA VOGUE"
            className="w-11 h-11 object-contain"
          />
        </div>
        <h1 className="font-editorial text-3xl font-semibold text-charcoal tracking-wider uppercase">
          AMORA VOGUE
        </h1>
        <p className="mt-1 text-xs tracking-widestPlus uppercase text-gold-dark font-medium">
          Colombo • Boutique Management
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-olive/15 rounded-xl sm:px-10">
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-gray-100">
            <ShieldCheck className="w-5 h-5 text-olive" />
            <h2 className="text-sm font-semibold text-charcoal uppercase tracking-wider">
              Store Owner Sign In
            </h2>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="text-xs text-red-700 leading-relaxed font-normal">
                {error}
              </div>
            </div>
          )}

          {rateStatus.isLocked && (
            <div className="mb-5 p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center justify-between">
              <span>Account locked for security</span>
              <span className="font-mono font-bold text-amber-900">
                {Math.floor(rateStatus.remainingSeconds / 60)}:
                {(rateStatus.remainingSeconds % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1.5"
              >
                Username or Email
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal/40">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  disabled={rateStatus.isLocked || loading}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="block w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive focus:border-olive bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1.5"
              >
                Password
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  disabled={rateStatus.isLocked || loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive focus:border-olive bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-charcoal/40 hover:text-charcoal focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={rateStatus.isLocked || loading}
                className="w-full py-3 px-4 bg-olive text-ivory hover:bg-olive-dark rounded-md text-xs tracking-widestPlus uppercase font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <span>Enter Administration</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-[11px] text-charcoal/50 font-light">
              Restricted area. Authorized AMORA VOGUE personnel only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
