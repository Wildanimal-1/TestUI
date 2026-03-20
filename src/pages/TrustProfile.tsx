import { CheckCircle, XCircle, AlertTriangle, TrendingUp } from 'lucide-react';

export default function TrustProfile() {
  const signals = [
    { name: 'Identity Verification', status: 'verified', score: 25, lastCheck: '2024-03-20', weight: 'high' },
    { name: 'Email Verification', status: 'verified', score: 15, lastCheck: '2024-03-19', weight: 'medium' },
    { name: 'Phone Verification', status: 'verified', score: 15, lastCheck: '2024-03-19', weight: 'medium' },
    { name: 'Address Verification', status: 'pending', score: 0, lastCheck: 'Never', weight: 'low' },
    { name: 'Document Verification', status: 'verified', score: 20, lastCheck: '2024-03-18', weight: 'high' },
    { name: 'Behavioral Analysis', status: 'verified', score: 19, lastCheck: '2024-03-20', weight: 'high' },
    { name: 'Risk Assessment', status: 'warning', score: 0, lastCheck: '2024-03-20', weight: 'critical' },
  ];

  const capabilities = [
    { name: 'API Access', enabled: true, description: 'Full REST and GraphQL API access' },
    { name: 'Batch Operations', enabled: true, description: 'Process up to 1000 operations per batch' },
    { name: 'Webhooks', enabled: true, description: 'Real-time event notifications' },
    { name: 'Advanced Analytics', enabled: false, description: 'Requires trust score ≥95' },
    { name: 'Priority Support', enabled: true, description: 'Enhanced SLA response times' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-3 bg-[var(--bg-primary)] border border-[var(--border-primary)] p-4">
          <div className="flex flex-col items-center">
            <div className="relative inline-flex items-center justify-center w-28 h-28 mb-3">
              <svg className="w-28 h-28 -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  stroke="var(--border-primary)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(94 / 100) * 314} 314`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-3xl font-semibold text-[var(--text-primary)] tabular-nums">94</span>
            </div>
            <h3 className="text-xs font-medium text-[var(--text-primary)] uppercase tracking-wide">Trust Score</h3>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5">Excellent standing</p>
            <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-500 mt-2">
              <TrendingUp className="w-3 h-3" />
              <span>+2.1% this month</span>
            </div>
          </div>
        </div>

        <div className="col-span-9 bg-[var(--bg-primary)] border border-[var(--border-primary)]">
          <div className="px-3 py-2 border-b border-[var(--border-primary)]">
            <h2 className="text-xs font-medium text-[var(--text-primary)] uppercase tracking-wide">Score Breakdown</h2>
          </div>
          <div className="p-3 space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[var(--text-secondary)]">Identity Signals</span>
                <span className="font-mono text-[var(--text-primary)]">55/60</span>
              </div>
              <div className="h-1.5 bg-[var(--bg-secondary)] overflow-hidden">
                <div className="h-full bg-blue-600 dark:bg-blue-500" style={{ width: '91.67%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[var(--text-secondary)]">Behavioral Signals</span>
                <span className="font-mono text-[var(--text-primary)]">19/20</span>
              </div>
              <div className="h-1.5 bg-[var(--bg-secondary)] overflow-hidden">
                <div className="h-full bg-blue-600 dark:bg-blue-500" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[var(--text-secondary)]">Activity Signals</span>
                <span className="font-mono text-[var(--text-primary)]">20/20</span>
              </div>
              <div className="h-1.5 bg-[var(--bg-secondary)] overflow-hidden">
                <div className="h-full bg-blue-600 dark:bg-blue-500" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] flex items-center justify-between">
          <h2 className="text-xs font-medium text-[var(--text-primary)] uppercase tracking-wide">Trust Signals</h2>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            Run verification
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)]">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Signal
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Status
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Weight
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Score
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Last Check
                </th>
                <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-primary)]">
              {signals.map((signal, index) => (
                <tr key={index} className="hover:bg-[var(--bg-secondary)]">
                  <td className="px-3 py-2 text-[var(--text-primary)]">{signal.name}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                        signal.status === 'verified'
                          ? 'bg-green-500/10 text-green-600 dark:text-green-500'
                          : signal.status === 'warning'
                          ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500'
                          : 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {signal.status === 'verified' ? (
                        <CheckCircle className="w-2.5 h-2.5" />
                      ) : signal.status === 'warning' ? (
                        <AlertTriangle className="w-2.5 h-2.5" />
                      ) : (
                        <XCircle className="w-2.5 h-2.5" />
                      )}
                      {signal.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-[var(--text-tertiary)] uppercase tracking-wide">{signal.weight}</span>
                  </td>
                  <td className="px-3 py-2 text-[var(--text-primary)] font-mono">
                    {signal.score > 0 ? `+${signal.score}` : signal.score}
                  </td>
                  <td className="px-3 py-2 text-[var(--text-tertiary)] font-mono">{signal.lastCheck}</td>
                  <td className="px-3 py-2 text-right">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)]">
          <h2 className="text-xs font-medium text-[var(--text-primary)] uppercase tracking-wide">Capabilities</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {capabilities.map((capability, index) => (
            <div key={index} className="px-3 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-3.5 h-3.5 border flex items-center justify-center flex-shrink-0 ${
                    capability.enabled
                      ? 'bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500'
                      : 'border-[var(--border-primary)]'
                  }`}
                >
                  {capability.enabled && <CheckCircle className="w-2.5 h-2.5 text-white" />}
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-primary)]">{capability.name}</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{capability.description}</p>
                </div>
              </div>
              {!capability.enabled && (
                <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  Upgrade
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
