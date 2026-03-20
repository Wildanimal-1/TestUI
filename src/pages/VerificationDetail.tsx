import { XCircle, Mail, Phone, Fingerprint, ArrowLeft, Info } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

type VerificationType = 'email' | 'phone' | 'identity';

interface DetailConfig {
  icon: React.ElementType;
  label: string;
  description: string;
  requirements: string[];
  status: 'not-verified';
  actionLabel: string;
  note?: string;
}

const configs: Record<VerificationType, DetailConfig> = {
  email: {
    icon: Mail,
    label: 'Email Verification',
    description:
      'Email verification confirms that you have access to and control over the email address associated with your account. A verified email is required for account recovery, critical security notices, and enables basic trust capabilities.',
    requirements: [
      'A valid email address must be set on your account',
      'Access to the email inbox to receive a verification message',
      'Verification links expire after 24 hours',
    ],
    status: 'not-verified',
    actionLabel: 'Send Verification Email',
  },
  phone: {
    icon: Phone,
    label: 'Phone Verification',
    description:
      'Phone verification confirms that you have access to a mobile phone number. A verified phone number is used for two-factor authentication, account recovery, and increases your overall trust score.',
    requirements: [
      'A valid mobile phone number capable of receiving SMS',
      'Phone number must not be already verified by another account',
      'Verification codes expire after 10 minutes',
    ],
    status: 'not-verified',
    actionLabel: 'Send Verification Code',
  },
  identity: {
    icon: Fingerprint,
    label: 'Identity Verification',
    description:
      'Identity verification confirms that you are a real person using a government-issued document. This verification is required to unlock the highest trust tiers and all associated platform capabilities.',
    requirements: [
      'A valid, unexpired government-issued photo ID (passport, national ID, or driver\'s licence)',
      'ID must be issued in a supported country',
      'Document must be clearly legible — damaged or obscured documents will not be accepted',
    ],
    status: 'not-verified',
    actionLabel: 'Begin Identity Verification',
    note: 'Identity verification is handled by a third-party verification partner. No document data is stored on TrustPlane servers.',
  },
};

interface Props {
  type: VerificationType;
}

export default function VerificationDetail({ type }: Props) {
  const { setCurrentPage } = useNavigation();
  const config = configs[type];
  const Icon = config.icon;

  return (
    <div>
      {/* Back navigation */}
      <button
        onClick={() => setCurrentPage('verification')}
        className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-4"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to Verification
      </button>

      {/* Header row */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <Icon className="w-4 h-4 text-[var(--text-secondary)]" />
        <h1 className="text-sm font-medium text-[var(--text-primary)]">{config.label}</h1>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-neutral-500/10 text-neutral-500 dark:text-neutral-400">
          <XCircle className="w-2.5 h-2.5" />
          Not verified
        </span>
      </div>

      {/* Description */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Overview</h2>
        </div>
        <div className="px-3 py-2.5 flex items-start justify-between gap-8">
          <span className="text-xs text-[var(--text-secondary)]">{config.description}</span>
        </div>
      </div>

      {/* Requirements */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Requirements</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {config.requirements.map((req, i) => (
            <div key={i} className="px-3 py-2.5 flex items-start gap-2">
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-xs text-[var(--text-secondary)]">{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Status</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          <div className="px-3 py-2.5 flex items-center justify-between">
            <span className="text-xs text-[var(--text-secondary)]">Current status</span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-neutral-500/10 text-neutral-500 dark:text-neutral-400">
              <XCircle className="w-2.5 h-2.5" />
              Not verified
            </span>
          </div>
          <div className="px-3 py-2.5 flex items-center justify-between">
            <span className="text-xs text-[var(--text-secondary)]">Last attempt</span>
            <span className="text-xs font-mono text-[var(--text-secondary)]">—</span>
          </div>
          <div className="px-3 py-2.5 flex items-center justify-between">
            <span className="text-xs text-[var(--text-secondary)]">Expires</span>
            <span className="text-xs font-mono text-[var(--text-secondary)]">—</span>
          </div>
        </div>
      </div>

      {/* Note */}
      {config.note && (
        <div className="flex items-start gap-2 px-3 py-2.5 border border-[var(--border-primary)] mb-4 bg-[var(--bg-secondary)]">
          <Info className="w-3.5 h-3.5 text-[var(--text-tertiary)] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[var(--text-secondary)]">{config.note}</p>
        </div>
      )}

      {/* Action */}
      <div className="border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Initiate Verification</h2>
        </div>
        <div className="px-3 py-2.5 flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--text-secondary)]">{config.actionLabel}</div>
            <div className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5">Read-only environment — action unavailable</div>
          </div>
          <button
            disabled
            className="px-3 py-1.5 text-xs font-medium bg-blue-600 dark:bg-blue-500 text-white opacity-40 cursor-not-allowed flex-shrink-0"
          >
            {config.actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
