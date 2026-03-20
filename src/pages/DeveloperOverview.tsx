import { Copy, ExternalLink } from 'lucide-react';

const API_SURFACE = [
  { label: 'Base URL', value: 'https://api.veravue.com/v1', mono: true },
  { label: 'API version', value: 'v1', mono: true },
  { label: 'Authentication', value: 'Bearer token (API key)', mono: false },
  { label: 'Response format', value: 'JSON', mono: false },
  { label: 'Rate limit tier', value: 'Starter — 60 req / min', mono: false },
  { label: 'SDK support', value: 'Node.js, Python, Go, Ruby', mono: false },
];

const ENDPOINTS = [
  { category: 'Verifications', prefix: '/v1/verifications', methods: 'GET, POST', description: 'Initiate and retrieve verification records' },
  { category: 'Trust', prefix: '/v1/trust', methods: 'GET', description: 'Read trust score and signal data' },
  { category: 'Keys', prefix: '/v1/keys', methods: 'GET, POST, DELETE', description: 'Manage API keys programmatically' },
  { category: 'Webhooks', prefix: '/v1/webhooks', methods: 'GET, POST, PUT, DELETE', description: 'Configure and test webhook endpoints' },
  { category: 'Activity', prefix: '/v1/events', methods: 'GET', description: 'Query the structured event log' },
  { category: 'Account', prefix: '/v1/account', methods: 'GET', description: 'Read account and organization metadata' },
];

const RATE_LIMITS = [
  { label: 'Requests / minute', value: '60', used: '—' },
  { label: 'Requests / hour', value: '3,600', used: '—' },
  { label: 'Requests / day', value: '86,400', used: '—' },
];

export default function DeveloperOverview() {
  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <ExternalLink className="w-3 h-3" />
          View docs
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Copy className="w-3 h-3" />
          Copy base URL
        </button>
      </div>

      {/* API Surface */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">API Surface</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {API_SURFACE.map((r) => (
            <div key={r.label} className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
              <span className="text-xs text-[var(--text-secondary)]">{r.label}</span>
              <span className={`text-xs ${r.mono ? 'font-mono' : ''} text-[var(--text-primary)]`}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rate Limits */}
      <div className="grid grid-cols-3 border border-[var(--border-primary)] divide-x divide-[var(--border-primary)] mb-4">
        {RATE_LIMITS.map((r) => (
          <div key={r.label} className="px-4 py-2.5">
            <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">{r.label}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{r.value}</span>
              <span className="text-xs text-[var(--text-tertiary)]">{r.used} used</span>
            </div>
          </div>
        ))}
      </div>

      {/* Endpoints */}
      <div className="border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">API Endpoints</h2>
        </div>
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-32">Category</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-48">Prefix</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-40">Methods</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Description</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-16">Ref</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {ENDPOINTS.map((e) => (
              <tr key={e.category} className="hover:bg-[var(--bg-secondary)]">
                <td className="px-3 py-2.5 text-[var(--text-primary)] font-medium">{e.category}</td>
                <td className="px-3 py-2.5 font-mono text-[var(--text-secondary)]">{e.prefix}</td>
                <td className="px-3 py-2.5 font-mono text-[var(--text-tertiary)] text-[10px]">{e.methods}</td>
                <td className="px-3 py-2.5 text-[var(--text-secondary)]">{e.description}</td>
                <td className="px-3 py-2.5 text-right">
                  <button className="text-blue-600 dark:text-blue-400 hover:underline">Docs</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
