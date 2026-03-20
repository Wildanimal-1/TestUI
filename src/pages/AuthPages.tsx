import { useState } from 'react';
import { Eye, EyeOff, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';

type AuthView = 'login' | 'signup' | 'forgot' | 'reset' | 'verify' | 'mfa';

interface AuthPagesProps {
  onEnterConsole: () => void;
}

// ─── Shared primitives ───────────────────────────────────────────────────────

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[380px]">
        {/* Wordmark */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-neutral-900 dark:bg-neutral-100" />
            <span className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">TrustPlane</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  error?: string;
  suffix?: React.ReactNode;
}

function Field({ label, id, type = 'text', placeholder, autoComplete, hint, error, suffix }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-[var(--text-primary)]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full px-3 py-2 text-sm bg-[var(--bg-primary)] border text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:focus:ring-neutral-400 transition-colors ${
            error
              ? 'border-red-500 dark:border-red-400'
              : 'border-[var(--border-primary)] focus:border-neutral-400 dark:focus:border-neutral-500'
          } ${suffix ? 'pr-9' : ''}`}
        />
        {suffix && (
          <div className="absolute right-0 top-0 h-full flex items-center pr-2.5">{suffix}</div>
        )}
      </div>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-[var(--text-tertiary)]">{hint}</p>}
    </div>
  );
}

interface SubmitButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
}

function SubmitButton({ label, loading, disabled }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
    >
      {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
      {label}
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-[var(--border-primary)] my-6" />;
}

function PasswordInput({ id, label, placeholder, hint }: { id: string; label: string; placeholder?: string; hint?: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <Field
      id={id}
      label={label}
      type={visible ? 'text' : 'password'}
      placeholder={placeholder ?? 'Enter password'}
      autoComplete={id === 'confirm-password' ? 'new-password' : id === 'new-password' ? 'new-password' : 'current-password'}
      hint={hint}
      suffix={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
          aria-label={visible ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      }
    />
  );
}

// ─── Login ───────────────────────────────────────────────────────────────────

function Login({ onNavigate, onEnterConsole }: { onNavigate: (v: AuthView) => void; onEnterConsole: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onEnterConsole();
    }, 900);
  };

  return (
    <AuthLayout>
      <h1 className="text-base font-semibold text-[var(--text-primary)] mb-1">Sign in</h1>
      <p className="text-xs text-[var(--text-tertiary)] mb-6">Access your TrustPlane console</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field
          id="email"
          label="Email address"
          type="email"
          placeholder="user@example.com"
          autoComplete="email"
        />
        <PasswordInput id="password" label="Password" />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-3 h-3 border border-[var(--border-primary)] accent-neutral-700 dark:accent-neutral-300 focus:outline-none"
            />
            <span className="text-xs text-[var(--text-secondary)]">Remember this device</span>
          </label>
          <button
            type="button"
            onClick={() => onNavigate('forgot')}
            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline-offset-2 hover:underline transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <SubmitButton label="Sign in" loading={loading} />
      </form>

      <Divider />

      <p className="text-xs text-[var(--text-tertiary)] text-center">
        New to TrustPlane?{' '}
        <button
          onClick={() => onNavigate('signup')}
          className="text-[var(--text-primary)] hover:underline underline-offset-2 font-medium"
        >
          Create account
        </button>
      </p>
    </AuthLayout>
  );
}

// ─── Sign Up ─────────────────────────────────────────────────────────────────

function SignUp({ onNavigate, onEnterConsole }: { onNavigate: (v: AuthView) => void; onEnterConsole: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate('verify');
    }, 900);
  };

  return (
    <AuthLayout>
      <h1 className="text-base font-semibold text-[var(--text-primary)] mb-1">Create account</h1>
      <p className="text-xs text-[var(--text-tertiary)] mb-6">Set up your TrustPlane operator account</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field
          id="signup-email"
          label="Email address"
          type="email"
          placeholder="user@example.com"
          autoComplete="email"
        />
        <PasswordInput
          id="new-password"
          label="Password"
          hint="Minimum 12 characters"
        />
        <PasswordInput
          id="confirm-password"
          label="Confirm password"
        />

        <label className="flex items-start gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-3 h-3 mt-0.5 border border-[var(--border-primary)] accent-neutral-700 dark:accent-neutral-300 shrink-0"
          />
          <span className="text-xs text-[var(--text-secondary)]">
            I agree to the{' '}
            <span className="text-[var(--text-primary)] underline-offset-2 underline cursor-pointer">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="text-[var(--text-primary)] underline-offset-2 underline cursor-pointer">
              Privacy Policy
            </span>
          </span>
        </label>

        <SubmitButton label="Create account" loading={loading} />
      </form>

      <Divider />

      <p className="text-xs text-[var(--text-tertiary)] text-center">
        Already have an account?{' '}
        <button
          onClick={() => onNavigate('login')}
          className="text-[var(--text-primary)] hover:underline underline-offset-2 font-medium"
        >
          Sign in
        </button>
      </p>
    </AuthLayout>
  );
}

// ─── Forgot Password ─────────────────────────────────────────────────────────

function ForgotPassword({ onNavigate }: { onNavigate: (v: AuthView) => void }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  };

  return (
    <AuthLayout>
      <button
        onClick={() => onNavigate('login')}
        className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] mb-8 transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to sign in
      </button>

      <h1 className="text-base font-semibold text-[var(--text-primary)] mb-1">Reset password</h1>
      <p className="text-xs text-[var(--text-tertiary)] mb-6">
        Enter your email address and we'll send you a reset link.
      </p>

      {sent ? (
        <div className="flex items-start gap-3 px-3 py-3 border border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-[var(--text-primary)]">Reset link sent</p>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5">Check your inbox. The link expires in 1 hour.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field
            id="reset-email"
            label="Email address"
            type="email"
            placeholder="user@example.com"
            autoComplete="email"
          />
          <SubmitButton label="Send reset link" loading={loading} />
        </form>
      )}
    </AuthLayout>
  );
}

// ─── Reset Password ───────────────────────────────────────────────────────────

function ResetPassword({ onNavigate, onEnterConsole }: { onNavigate: (v: AuthView) => void; onEnterConsole: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onEnterConsole(), 1500);
    }, 900);
  };

  return (
    <AuthLayout>
      <h1 className="text-base font-semibold text-[var(--text-primary)] mb-1">Set new password</h1>
      <p className="text-xs text-[var(--text-tertiary)] mb-6">Choose a strong password for your account.</p>

      {success ? (
        <div className="flex items-start gap-3 px-3 py-3 border border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-[var(--text-primary)]">Password updated</p>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5">Signing you in to the console…</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <PasswordInput id="new-password" label="New password" hint="Minimum 12 characters" />
          <PasswordInput id="confirm-new-password" label="Confirm new password" />
          <SubmitButton label="Update password" loading={loading} />
        </form>
      )}

      <Divider />
      <p className="text-xs text-center">
        <button
          onClick={() => onNavigate('login')}
          className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
        >
          ← Back to sign in
        </button>
      </p>
    </AuthLayout>
  );
}

// ─── Verify Email ─────────────────────────────────────────────────────────────

function VerifyEmail({ onNavigate }: { onNavigate: (v: AuthView) => void }) {
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <AuthLayout>
      <h1 className="text-base font-semibold text-[var(--text-primary)] mb-1">Check your email</h1>
      <p className="text-xs text-[var(--text-tertiary)] mb-6">
        We sent a verification link to your address.
      </p>

      <div className="border border-[var(--border-primary)] px-3 py-3 bg-[var(--bg-secondary)] mb-6">
        <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Sent to</p>
        <p className="text-sm font-mono text-[var(--text-primary)]">user@example.com</p>
      </div>

      <div className="flex flex-col gap-2 text-xs text-[var(--text-tertiary)]">
        <p>· The link expires in 24 hours</p>
        <p>· Check your spam folder if you don't see it</p>
        <p>· Contact support if you continue to have issues</p>
      </div>

      <Divider />

      <div className="flex flex-col gap-3">
        <button
          onClick={handleResend}
          disabled={resent}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm border border-[var(--border-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] disabled:opacity-60 transition-colors"
        >
          {resent ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
              Email resent
            </>
          ) : (
            'Resend verification email'
          )}
        </button>

        <div className="flex items-center justify-center gap-4 text-xs text-[var(--text-tertiary)]">
          <button
            onClick={() => onNavigate('signup')}
            className="hover:text-[var(--text-secondary)] transition-colors"
          >
            Wrong email? Change it
          </button>
          <span>·</span>
          <button
            onClick={() => onNavigate('login')}
            className="hover:text-[var(--text-secondary)] transition-colors"
          >
            Back to sign in
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}

// ─── MFA ─────────────────────────────────────────────────────────────────────

function MFA({ onEnterConsole }: { onEnterConsole: () => void }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  const handleDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < 5) {
      const el = document.getElementById(`mfa-${index + 1}`);
      el?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const el = document.getElementById(`mfa-${index - 1}`);
      el?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onEnterConsole();
    }, 900);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  const isFilled = code.every((d) => d !== '');

  return (
    <AuthLayout>
      <h1 className="text-base font-semibold text-[var(--text-primary)] mb-1">Two-factor authentication</h1>
      <p className="text-xs text-[var(--text-tertiary)] mb-6">
        Enter the 6-digit code from your authenticator app.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="text-xs font-medium text-[var(--text-primary)] block mb-3">Verification code</label>
          <div className="flex gap-2">
            {code.map((digit, i) => (
              <input
                key={i}
                id={`mfa-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigit(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-full aspect-square text-center text-base font-mono border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors"
              />
            ))}
          </div>
        </div>

        <SubmitButton label="Verify" loading={loading} disabled={!isFilled} />
      </form>

      <Divider />

      <div className="flex items-center justify-center gap-4 text-xs text-[var(--text-tertiary)]">
        <button
          onClick={handleResend}
          disabled={resent}
          className="hover:text-[var(--text-secondary)] disabled:opacity-60 transition-colors"
        >
          {resent ? 'Code resent' : 'Resend code'}
        </button>
        <span>·</span>
        <button className="hover:text-[var(--text-secondary)] transition-colors">
          Use backup code
        </button>
      </div>
    </AuthLayout>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function AuthPages({ onEnterConsole }: AuthPagesProps) {
  const [view, setView] = useState<AuthView>('login');

  const navigate = (v: AuthView) => setView(v);

  return (
    <>
      {view === 'login' && <Login onNavigate={navigate} onEnterConsole={onEnterConsole} />}
      {view === 'signup' && <SignUp onNavigate={navigate} onEnterConsole={onEnterConsole} />}
      {view === 'forgot' && <ForgotPassword onNavigate={navigate} />}
      {view === 'reset' && <ResetPassword onNavigate={navigate} onEnterConsole={onEnterConsole} />}
      {view === 'verify' && <VerifyEmail onNavigate={navigate} />}
      {view === 'mfa' && <MFA onEnterConsole={onEnterConsole} />}
    </>
  );
}
