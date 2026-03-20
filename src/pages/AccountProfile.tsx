import { User, Download, ExternalLink } from 'lucide-react';

const IDENTITY_ROWS = [
  { label: 'Display name', value: 'Not set', mono: false },
  { label: 'Email address', value: 'user@example.com', mono: true },
  { label: 'Username / handle', value: '@username', mono: true },
  { label: 'Account role', value: 'Owner', mono: false },
  { label: 'Account ID', value: 'uid_000000000000', mono: true },
];

const ORG_ROWS = [
  { label: 'Organization ID', value: 'trust_profile_001', mono: true },
  { label: 'Organization name', value: 'Not configured', mono: false },
  { label: 'Plan tier', value: 'Starter', mono: false },
  { label: 'Member since', value: '—', mono: true },
  { label: 'Billing contact', value: 'Not set', mono: false },
];

function Row({ label, value, mono, action }: { label: string; value: string; mono: boolean; action?: React.ReactNode }) {
  return (
    <div className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
      <span className="text-xs text-[var(--text-secondary)]">{label}</span>
      <div className="flex items-center gap-3">
        <span className={`text-xs ${mono ? 'font-mono' : ''} text-[var(--text-primary)]`}>{value}</span>
        {action}
      </div>
    </div>
  );
}

export default function AccountProfile() {
  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button
          disabled
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium opacity-50 cursor-not-allowed"
        >
          <User className="w-3 h-3" />
          Edit Profile
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3 h-3" />
          Export Data
        </button>
      </div>

      {/* Avatar + identity summary */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Identity</h2>
        </div>
        <div className="px-3 py-2.5 flex items-center justify-between border-b border-[var(--border-primary)] hover:bg-[var(--bg-secondary)]">
          <span className="text-xs text-[var(--text-secondary)]">Profile photo</span>
          <span className="text-xs font-mono text-[var(--text-tertiary)]">Not configured</span>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {IDENTITY_ROWS.map((r) => (
            <Row key={r.label} {...r} />
          ))}
        </div>
      </div>

      {/* Organization */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Organization</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {ORG_ROWS.map((r) => (
            <Row key={r.label} {...r} />
          ))}
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Data &amp; Privacy</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          <div className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
            <div>
              <div className="text-xs font-medium text-[var(--text-primary)]">Export account data</div>
              <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Download a copy of all data associated with this account</div>
            </div>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              <ExternalLink className="w-3 h-3" />
              Request export
            </button>
          </div>
          <div className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
            <div>
              <div className="text-xs font-medium text-red-600 dark:text-red-400">Delete account</div>
              <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Permanently remove this account and all associated data. This action is irreversible.</div>
            </div>
            <button
              disabled
              className="px-2.5 py-1.5 text-xs border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 opacity-50 cursor-not-allowed"
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
