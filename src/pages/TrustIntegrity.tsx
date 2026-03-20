import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, RefreshCw, Download, Search } from 'lucide-react';

const CHECKS = [
  { id: 'c1', name: 'Data Integrity', status: 'healthy', lastRun: '2024-03-20 14:30', duration: '0.4s', findings: 0 },
  { id: 'c2', name: 'Signal Consistency', status: 'healthy', lastRun: '2024-03-20 14:30', duration: '0.8s', findings: 0 },
  { id: 'c3', name: 'Verification Chain', status: 'healthy', lastRun: '2024-03-20 14:30', duration: '1.2s', findings: 0 },
  { id: 'c4', name: 'Audit Log Integrity', status: 'healthy', lastRun: '2024-03-20 14:29', duration: '2.1s', findings: 0 },
  { id: 'c5', name: 'Cryptographic Signatures', status: 'healthy', lastRun: '2024-03-20 14:28', duration: '3.4s', findings: 0 },
  { id: 'c6', name: 'Timestamp Validation', status: 'warning', lastRun: '2024-03-20 14:27', duration: '0.6s', findings: 2 },
  { id: 'c7', name: 'Cross-Signal Validation', status: 'healthy', lastRun: '2024-03-20 14:26', duration: '1.8s', findings: 0 },
  { id: 'c8', name: 'Provider Response Integrity', status: 'healthy', lastRun: '2024-03-20 14:25', duration: '0.9s', findings: 0 },
];

const RECENT_SCANS = [
  { timestamp: '2024-03-20 14:30:15', duration: '8.2s', totalChecks: 8, findings: 2 },
  { timestamp: '2024-03-20 12:30:10', duration: '7.9s', totalChecks: 8, findings: 0 },
  { timestamp: '2024-03-20 10:30:08', duration: '8.1s', totalChecks: 8, findings: 1 },
  { timestamp: '2024-03-20 08:30:12', duration: '8.3s', totalChecks: 8, findings: 0 },
  { timestamp: '2024-03-20 06:30:09', duration: '8.0s', totalChecks: 8, findings: 0 },
];

export default function TrustIntegrity() {
  const [search, setSearch] = useState('');

  const filtered = CHECKS.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalFindings = CHECKS.reduce((sum, c) => sum + c.findings, 0);
  const healthyCount = CHECKS.filter((c) => c.status === 'healthy').length;

  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600">
          <RefreshCw className="w-3 h-3" />
          Run Full Scan
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3 h-3" />
          Export Report
        </button>
        <div className="w-px h-4 bg-[var(--border-primary)] mx-1" />
        <div className="relative">
          <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search checks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-6 pr-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-1 focus:ring-blue-500 w-44"
          />
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 text-xs">
          <Shield className="w-3 h-3 text-green-600 dark:text-green-500" />
          <span className="text-[var(--text-secondary)]">Overall:</span>
          <span className="font-medium text-green-600 dark:text-green-500">Healthy</span>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-4 border border-[var(--border-primary)] divide-x divide-[var(--border-primary)] mb-4">
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Overall Status</div>
          <div className="text-xl font-semibold text-green-600 dark:text-green-500">Healthy</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Last Scan</div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">2m ago</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Checks Passed</div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{healthyCount}/{CHECKS.length}</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Findings</div>
          <div className={`text-xl font-semibold tabular-nums ${totalFindings > 0 ? 'text-yellow-600 dark:text-yellow-500' : 'text-[var(--text-tertiary)]'}`}>
            {totalFindings}
          </div>
        </div>
      </div>

      {/* Integrity Checks Table */}
      <div className="border border-[var(--border-primary)] mb-6">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Integrity Checks</h2>
        </div>
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Check</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Status</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-36">Last Run</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20">Duration</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20">Findings</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-16">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-[var(--bg-secondary)]">
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    {c.status === 'healthy'
                      ? <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-500 flex-shrink-0" />
                      : <AlertTriangle className="w-3 h-3 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
                    }
                    <span className="text-[var(--text-primary)] font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                    c.status === 'healthy' ? 'bg-green-500/10 text-green-600 dark:text-green-500' : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-[var(--text-tertiary)]">{c.lastRun}</td>
                <td className="px-3 py-2.5 text-right font-mono text-[var(--text-secondary)]">{c.duration}</td>
                <td className="px-3 py-2.5 text-right font-mono">
                  <span className={c.findings > 0 ? 'text-yellow-600 dark:text-yellow-500' : 'text-[var(--text-tertiary)]'}>
                    {c.findings}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right">
                  <button className="text-blue-600 dark:text-blue-400 hover:underline">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Scans */}
      <div className="border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Recent Scans</h2>
        </div>
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Timestamp</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20">Checks</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20">Duration</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Findings</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {RECENT_SCANS.map((scan, i) => (
              <tr key={i} className="hover:bg-[var(--bg-secondary)]">
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-500 flex-shrink-0" />
                    <span className="font-mono text-[var(--text-primary)]">{scan.timestamp}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-[var(--text-secondary)]">{scan.totalChecks}</td>
                <td className="px-3 py-2.5 text-right font-mono text-[var(--text-secondary)]">{scan.duration}</td>
                <td className="px-3 py-2.5 text-right font-mono">
                  <span className={scan.findings > 0 ? 'text-yellow-600 dark:text-yellow-500' : 'text-[var(--text-tertiary)]'}>
                    {scan.findings}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right">
                  <button className="text-blue-600 dark:text-blue-400 hover:underline">View Report</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
