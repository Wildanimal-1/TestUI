import { RefreshCw, Download, CheckCircle, AlertTriangle } from 'lucide-react';

const SYSTEM_INFO = [
  { label: 'Console version', value: '0.1.0-prototype', mono: true },
  { label: 'API version', value: 'v1', mono: true },
  { label: 'Region', value: 'us-east-1', mono: true },
  { label: 'Deployment environment', value: 'Production', mono: false },
  { label: 'Uptime', value: '—', mono: true },
  { label: 'Last restart', value: '—', mono: true },
];

const CONFIG = [
  { key: 'trust.score.algorithm', value: 'weighted_composite_v2', type: 'string' },
  { key: 'trust.score.min_signals', value: '3', type: 'integer' },
  { key: 'verification.expiry_days', value: '365', type: 'integer' },
  { key: 'api.rate_limit.default', value: '60', type: 'integer' },
  { key: 'api.rate_limit.burst', value: '120', type: 'integer' },
  { key: 'webhook.max_retries', value: '5', type: 'integer' },
  { key: 'webhook.retry_interval', value: '60s', type: 'duration' },
  { key: 'session.ttl', value: '86400s', type: 'duration' },
];

const SERVICES = [
  { name: 'API Gateway', version: 'v1.4.2', status: 'ok', latency: '12ms' },
  { name: 'Verification Engine', version: 'v2.1.0', status: 'ok', latency: '84ms' },
  { name: 'Trust Scoring', version: 'v1.9.5', status: 'ok', latency: '38ms' },
  { name: 'Audit Logger', version: 'v1.2.1', status: 'ok', latency: '6ms' },
  { name: 'Webhook Dispatcher', version: 'v1.3.0', status: 'degraded', latency: '240ms' },
  { name: 'Identity Provider Bridge', version: 'v2.0.4', status: 'ok', latency: '120ms' },
];

const MAINTENANCE = [
  { label: 'Last maintenance window', value: '—' },
  { label: 'Next scheduled window', value: 'Not scheduled' },
  { label: 'Database migrations', value: 'Up to date' },
  { label: 'Certificate expiry (TLS)', value: '—' },
  { label: 'Backup status', value: '—' },
];

export default function AdminSystem() {
  const healthyCount = SERVICES.filter((s) => s.status === 'ok').length;

  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button
          disabled
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium opacity-50 cursor-not-allowed"
        >
          <RefreshCw className="w-3 h-3" />
          Run Health Check
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3 h-3" />
          Export Config
        </button>
      </div>

      {/* System Info */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">System Information</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {SYSTEM_INFO.map((r) => (
            <div key={r.label} className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
              <span className="text-xs text-[var(--text-secondary)]">{r.label}</span>
              <span className={`text-xs ${r.mono ? 'font-mono' : ''} text-[var(--text-primary)]`}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Registered Services */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] flex items-center justify-between">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Registered Services</h2>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{healthyCount}/{SERVICES.length} healthy</span>
        </div>
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Service</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Version</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Status</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {SERVICES.map((s) => (
              <tr key={s.name} className="hover:bg-[var(--bg-secondary)]">
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    {s.status === 'ok'
                      ? <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-500 flex-shrink-0" />
                      : <AlertTriangle className="w-3 h-3 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
                    }
                    <span className="text-[var(--text-primary)] font-medium">{s.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 font-mono text-[var(--text-tertiary)]">{s.version}</td>
                <td className="px-3 py-2.5">
                  <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                    s.status === 'ok'
                      ? 'bg-green-500/10 text-green-600 dark:text-green-500'
                      : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500'
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-[var(--text-secondary)]">{s.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Configuration */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Configuration</h2>
        </div>
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Key</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Type</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {CONFIG.map((c) => (
              <tr key={c.key} className="hover:bg-[var(--bg-secondary)]">
                <td className="px-3 py-2 font-mono text-[var(--text-primary)]">{c.key}</td>
                <td className="px-3 py-2 text-[var(--text-tertiary)] uppercase text-[10px] tracking-wide">{c.type}</td>
                <td className="px-3 py-2 text-right font-mono text-[var(--text-secondary)]">{c.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Maintenance */}
      <div className="border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Maintenance</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {MAINTENANCE.map((r) => (
            <div key={r.label} className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
              <span className="text-xs text-[var(--text-secondary)]">{r.label}</span>
              <span className="text-xs font-mono text-[var(--text-primary)]">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
