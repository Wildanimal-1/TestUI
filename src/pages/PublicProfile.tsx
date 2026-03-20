import { CheckCircle2, Copy, Eye, EyeOff, Shield, User } from 'lucide-react';

const VERIFIED_ITEMS = [
  { label: 'Email address', verified: false },
  { label: 'Phone number', verified: false },
  { label: 'Government identity', verified: false },
];

const TRUST_SIGNALS = [
  { label: 'Account integrity', description: 'No policy violations or flags on record', active: true },
  { label: 'Verification completion', description: 'Percentage of required verifications completed', active: false },
  { label: 'Activity reliability', description: 'Consistent, uninterrupted account activity', active: true },
  { label: 'API usage compliance', description: 'API calls within expected usage patterns', active: true },
];

const VISIBILITY_CONTROLS = [
  { label: 'Show trust score publicly', enabled: false },
  { label: 'Show verification status', enabled: false },
  { label: 'Allow profile discovery', enabled: false },
];

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <div
      className={`relative inline-flex h-4 w-7 flex-shrink-0 items-center border ${
        enabled
          ? 'bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500'
          : 'bg-[var(--bg-secondary)] border-[var(--border-primary)]'
      }`}
    >
      <span
        className={`inline-block h-2.5 w-2.5 bg-white transform transition-transform ${
          enabled ? 'translate-x-3.5' : 'translate-x-0.5'
        }`}
      />
    </div>
  );
}

export default function PublicProfile() {
  return (
    <div>
      {/* Profile Header */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Profile</h2>
        </div>
        <div className="px-3 py-2.5 flex items-center gap-4">
          <div className="w-10 h-10 border border-[var(--border-primary)] bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-[var(--text-tertiary)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--text-primary)]">Display name</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-neutral-500/10 text-neutral-500 dark:text-neutral-400">
                <Shield className="w-2.5 h-2.5" />
                Level 0
              </span>
            </div>
            <div className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5">@username · uid_000000000000</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-0.5">Trust Score</div>
            <div className="text-xl font-semibold tabular-nums text-[var(--text-primary)]">—</div>
            <div className="text-[10px] font-mono text-[var(--text-tertiary)]">0 of 3 verifications</div>
          </div>
        </div>
      </div>

      {/* Verification Summary */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Verification Summary</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {VERIFIED_ITEMS.map((item) => (
            <div key={item.label} className="px-3 py-2.5 flex items-center justify-between">
              <span className="text-xs text-[var(--text-secondary)]">{item.label}</span>
              {item.verified ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-green-600 dark:text-green-500">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              ) : (
                <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Not verified
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trust Signals / Capabilities */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Trust Signals</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {TRUST_SIGNALS.map((signal) => (
            <div key={signal.label} className="px-3 py-2.5 flex items-center gap-3">
              <div
                className={`w-2 h-2 flex-shrink-0 ${
                  signal.active ? 'bg-green-500' : 'bg-[var(--border-primary)]'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-[var(--text-primary)]">{signal.label}</div>
                <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{signal.description}</div>
              </div>
              <span
                className={`text-[10px] font-medium uppercase tracking-wide flex-shrink-0 ${
                  signal.active ? 'text-green-600 dark:text-green-500' : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {signal.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Public URL */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Public URL</h2>
        </div>
        <div className="px-3 py-2.5 flex items-center justify-between gap-3">
          <code className="text-xs font-mono text-[var(--text-primary)]">veravue.com/u/username</code>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="flex items-center gap-1.5 px-2 py-1 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              <Copy className="w-3 h-3" />
              Copy
            </button>
            <button className="flex items-center gap-1.5 px-2 py-1 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              <Eye className="w-3 h-3" />
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Visibility Controls */}
      <div className="border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Visibility Controls</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {VISIBILITY_CONTROLS.map((control) => (
            <div key={control.label} className="px-3 py-2.5 flex items-center justify-between">
              <span className="text-xs text-[var(--text-secondary)]">{control.label}</span>
              <div className="flex items-center gap-2">
                {control.enabled ? (
                  <Eye className="w-3 h-3 text-[var(--text-tertiary)]" />
                ) : (
                  <EyeOff className="w-3 h-3 text-[var(--text-tertiary)]" />
                )}
                <Toggle enabled={control.enabled} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
