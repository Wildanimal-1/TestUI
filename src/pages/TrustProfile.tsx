import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, RotateCw, Download } from 'lucide-react';

const SIGNALS = [
  { name: 'Identity Verification', status: 'verified', score: 25, lastCheck: '2024-03-20', weight: 'high' },
  { name: 'Email Verification', status: 'verified', score: 15, lastCheck: '2024-03-19', weight: 'medium' },
  { name: 'Phone Verification', status: 'verified', score: 15, lastCheck: '2024-03-19', weight: 'medium' },
  { name: 'Address Verification', status: 'pending', score: 0, lastCheck: 'Never', weight: 'low' },
  { name: 'Document Verification', status: 'verified', score: 20, lastCheck: '2024-03-18', weight: 'high' },
  { name: 'Behavioral Analysis', status: 'verified', score: 19, lastCheck: '2024-03-20', weight: 'high' },
  { name: 'Risk Assessment', status: 'warning', score: 0, lastCheck: '2024-03-20', weight: 'critical' },
];

const CAPABILITIES = [
  { name: 'API Access', enabled: true, description: 'Full REST and GraphQL API access' },
  { name: 'Batch Operations', enabled: true, description: 'Up to 1,000 operations per batch' },
  { name: 'Webhooks', enabled: true, description: 'Real-time event notifications' },
  { name: 'Advanced Analytics', enabled: false, description: 'Requires trust score ≥ 95' },
  { name: 'Priority Support', enabled: true, description: 'Enhanced SLA response times' },
];

const BREAKDOWN = [
  { label: 'Identity Signals', value: 55, max: 60 },
  { label: 'Behavioral Signals', value: 19, max: 20 },
  { label: 'Activity Signals', value: 20, max: 20 },
];

export default function TrustProfile() {
  const [capExpanded, setCapExpanded] = useState(false);

  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600">
          <RotateCw className="w-3 h-3" />
          Run Verification
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3 h-3" />
          Export Report
        </button>
        <div className="flex-1" />
        <span className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-500">
          <TrendingUp className="w-3 h-3" />
          +2.1% this month
        </span>
      </div>

      {/* Score + Breakdown */}
      <div className="grid grid-cols-12 gap-3 mb-4">
        <div className="col-span-2 border border-[var(--border-primary)] flex flex-col justify-center px-4 py-4">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Trust Score</div>
          <div className="text-4xl font-semibold text-[var(--text-primary)] tabular-nums leading-none">94</div>
          <div className="text-[10px] text-[var(--text-tertiary)] mt-1.5 font-mono">/ 100 · Excellent</div>
        </div>

        <div className="col-span-10 border border-[var(--border-primary)]">
          <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
            <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Score Breakdown</h2>
          </div>
          <div className="p-3 space-y-2.5">
            {BREAKDOWN.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[var(--text-secondary)]">{b.label}</span>
                  <span className="font-mono text-[var(--text-primary)] tabular-nums">{b.value}/{b.max}</span>
                </div>
                <div className="h-1 bg-[var(--bg-secondary)]">
                  <div className="h-full bg-blue-600 dark:bg-blue-500" style={{ width: `${(b.value / b.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Signals Table */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Trust Signals</h2>
        </div>
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Signal</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Status</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20">Weight</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-16">Score</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-28">Last Check</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-16">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {SIGNALS.map((s, i) => (
              <tr key={i} className="hover:bg-[var(--bg-secondary)]">
                <td className="px-3 py-2 text-[var(--text-primary)]">{s.name}</td>
                <td className="px-3 py-2">
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                    s.status === 'verified' ? 'bg-green-500/10 text-green-600 dark:text-green-500'
                    : s.status === 'warning' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500'
                    : 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400'
                  }`}>
                    {s.status === 'verified' ? <CheckCircle className="w-2.5 h-2.5" /> : s.status === 'warning' ? <AlertTriangle className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
                    {s.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-[var(--text-tertiary)] uppercase tracking-wide text-[10px]">{s.weight}</td>
                <td className="px-3 py-2 text-right font-mono text-[var(--text-primary)]">{s.score > 0 ? `+${s.score}` : s.score}</td>
                <td className="px-3 py-2 text-right font-mono text-[var(--text-tertiary)]">{s.lastCheck}</td>
                <td className="px-3 py-2 text-right"><button className="text-blue-600 dark:text-blue-400 hover:underline">Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Capabilities — collapsible */}
      <div className="border border-[var(--border-primary)]">
        <button
          className="w-full px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] flex items-center justify-between hover:bg-[var(--bg-secondary)]"
          onClick={() => setCapExpanded(!capExpanded)}
        >
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Capabilities</h2>
          <span className="text-[10px] text-[var(--text-tertiary)]">
            {CAPABILITIES.filter((c) => c.enabled).length}/{CAPABILITIES.length} enabled {capExpanded ? '▲' : '▼'}
          </span>
        </button>
        {capExpanded && (
          <table className="w-full text-xs">
            <tbody className="divide-y divide-[var(--border-primary)]">
              {CAPABILITIES.map((cap, i) => (
                <tr key={i} className="hover:bg-[var(--bg-secondary)]">
                  <td className="px-3 py-2 w-8">
                    <div className={`w-3 h-3 border flex items-center justify-center ${cap.enabled ? 'bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500' : 'border-[var(--border-primary)]'}`}>
                      {cap.enabled && <CheckCircle className="w-2 h-2 text-white" />}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-[var(--text-primary)] font-medium">{cap.name}</td>
                  <td className="px-3 py-2 text-[var(--text-tertiary)]">{cap.description}</td>
                  <td className="px-3 py-2 text-right">
                    {!cap.enabled && <button className="text-blue-600 dark:text-blue-400 hover:underline">Upgrade</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
