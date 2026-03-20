import { CheckCircle2, XCircle, Mail, Phone, Fingerprint, Globe, MapPin, ArrowRight, Download } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

const METHODS = [
  {
    id: 'verification-email',
    icon: Mail,
    label: 'Email Verification',
    description: 'Confirm ownership of your email address',
    status: 'not-verified' as const,
    lastUpdated: '—',
    weight: 'Required',
  },
  {
    id: 'verification-phone',
    icon: Phone,
    label: 'Phone Verification',
    description: 'Confirm ownership of a mobile phone number',
    status: 'not-verified' as const,
    lastUpdated: '—',
    weight: 'Required',
  },
  {
    id: 'verification-identity',
    icon: Fingerprint,
    label: 'Identity Verification',
    description: 'Verify your identity using a government-issued document',
    status: 'not-verified' as const,
    lastUpdated: '—',
    weight: 'Required',
    note: 'Requires government ID',
  },
];

const ADDITIONAL = [
  {
    icon: Globe,
    label: 'Social Account Verification',
    description: 'Link a verified social account as a trust signal',
    status: 'optional' as const,
  },
  {
    icon: MapPin,
    label: 'Address Verification',
    description: 'Confirm a physical mailing address',
    status: 'optional' as const,
  },
];

const verifiedCount = METHODS.filter((m) => m.status === 'verified').length;
const total = METHODS.length;

function StatusBadge({ status }: { status: 'verified' | 'not-verified' | 'optional' }) {
  if (status === 'verified') {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-green-500/10 text-green-600 dark:text-green-500">
        <CheckCircle2 className="w-2.5 h-2.5" />
        Verified
      </span>
    );
  }
  if (status === 'not-verified') {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-neutral-500/10 text-neutral-500 dark:text-neutral-400">
        <XCircle className="w-2.5 h-2.5" />
        Not verified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-neutral-500/10 text-neutral-500 dark:text-neutral-400">
      Optional
    </span>
  );
}

export default function Verification() {
  const { setCurrentPage } = useNavigation();

  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3 h-3" />
          Export Status
        </button>
        <div className="flex-1" />
        <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{verifiedCount}/{total} methods verified</span>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-3 border border-[var(--border-primary)] divide-x divide-[var(--border-primary)] mb-4">
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Methods Complete</div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{verifiedCount}/{total}</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Completion</div>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex-1 h-1 bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
              <div className="h-full bg-blue-600 dark:bg-blue-500" style={{ width: `${(verifiedCount / total) * 100}%` }} />
            </div>
            <span className="text-xs font-mono text-[var(--text-tertiary)] flex-shrink-0">{Math.round((verifiedCount / total) * 100)}%</span>
          </div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Remaining</div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{total - verifiedCount}</div>
        </div>
      </div>

      {/* Verification Methods */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Verification Methods</h2>
        </div>
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-8" />
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Method</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20">Required</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-28">Last Updated</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Status</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {METHODS.map((method) => {
              const Icon = method.icon;
              return (
                <tr key={method.id} className="hover:bg-[var(--bg-secondary)]">
                  <td className="px-3 py-2.5">
                    <Icon className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="text-[var(--text-primary)] font-medium">{method.label}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                      {method.description}
                      {method.note && <span className="ml-1">— {method.note}</span>}
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="text-[10px] uppercase tracking-wide text-[var(--text-tertiary)]">{method.weight}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-[var(--text-tertiary)]">{method.lastUpdated}</td>
                  <td className="px-3 py-2.5 text-right">
                    <StatusBadge status={method.status} />
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <button
                      onClick={() => setCurrentPage(method.id as any)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-[10px] border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                    >
                      {method.status === 'verified' ? 'View' : 'Verify'}
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Additional Signals */}
      <div className="border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Additional Trust Signals</h2>
        </div>
        <table className="w-full text-xs">
          <tbody className="divide-y divide-[var(--border-primary)]">
            {ADDITIONAL.map((item) => {
              const Icon = item.icon;
              return (
                <tr key={item.label} className="hover:bg-[var(--bg-secondary)]">
                  <td className="px-3 py-2.5 w-8">
                    <Icon className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="text-[var(--text-primary)] font-medium">{item.label}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{item.description}</div>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
