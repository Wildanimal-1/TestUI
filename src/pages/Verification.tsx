import { CheckCircle2, XCircle, Mail, Phone, Fingerprint, Globe, MapPin, ArrowRight } from 'lucide-react';
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
      {/* Overview */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Verification Overview</h2>
        </div>
        <div className="px-3 py-3 flex items-start gap-6">
          <div>
            <div className="text-2xl font-semibold tabular-nums text-[var(--text-primary)]">{verifiedCount}/{total}</div>
            <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mt-0.5">Methods complete</div>
          </div>
          <div className="flex-1 pt-1">
            <div className="h-1.5 bg-[var(--bg-secondary)] mb-2 w-full">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500"
                style={{ width: `${(verifiedCount / total) * 100}%` }}
              />
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Complete verifications to increase trust level. Required verifications must be completed before advanced capabilities are unlocked.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Methods */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Verification Methods</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {METHODS.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.id} className="px-3 py-3 flex items-center gap-4 hover:bg-[var(--bg-secondary)]">
                <Icon className="w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{method.label}</span>
                    <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">{method.weight}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {method.description}
                    {method.note && (
                      <span className="ml-2 text-[var(--text-tertiary)]">— {method.note}</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <StatusBadge status={method.status} />
                    <div className="text-[10px] text-[var(--text-tertiary)] mt-1 font-mono">
                      Last updated: {method.lastUpdated}
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentPage(method.id as any)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] flex-shrink-0"
                  >
                    {method.status === 'verified' ? 'View' : 'Verify'}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Signals */}
      <div className="border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Additional Trust Signals</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {ADDITIONAL.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="px-3 py-3 flex items-center gap-4 hover:bg-[var(--bg-secondary)]">
                <Icon className="w-4 h-4 text-[var(--text-tertiary)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{item.label}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">{item.description}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
