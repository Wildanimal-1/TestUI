import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, RefreshCw, Download } from 'lucide-react';

export default function TrustIntegrity() {
  const [selectedScan, setSelectedScan] = useState<string | null>(null);

  const checks = [
    { id: 'c1', name: 'Data Integrity', status: 'healthy', lastRun: '2024-03-20 14:30', duration: '0.4s', findings: 0 },
    { id: 'c2', name: 'Signal Consistency', status: 'healthy', lastRun: '2024-03-20 14:30', duration: '0.8s', findings: 0 },
    { id: 'c3', name: 'Verification Chain', status: 'healthy', lastRun: '2024-03-20 14:30', duration: '1.2s', findings: 0 },
    { id: 'c4', name: 'Audit Log Integrity', status: 'healthy', lastRun: '2024-03-20 14:29', duration: '2.1s', findings: 0 },
    { id: 'c5', name: 'Cryptographic Signatures', status: 'healthy', lastRun: '2024-03-20 14:28', duration: '3.4s', findings: 0 },
    { id: 'c6', name: 'Timestamp Validation', status: 'warning', lastRun: '2024-03-20 14:27', duration: '0.6s', findings: 2 },
    { id: 'c7', name: 'Cross-Signal Validation', status: 'healthy', lastRun: '2024-03-20 14:26', duration: '1.8s', findings: 0 },
    { id: 'c8', name: 'Provider Response Integrity', status: 'healthy', lastRun: '2024-03-20 14:25', duration: '0.9s', findings: 0 },
  ];

  const recentScans = [
    { timestamp: '2024-03-20 14:30:15', result: 'healthy', duration: '8.2s', totalChecks: 8, findings: 2 },
    { timestamp: '2024-03-20 12:30:10', result: 'healthy', duration: '7.9s', totalChecks: 8, findings: 0 },
    { timestamp: '2024-03-20 10:30:08', result: 'healthy', duration: '8.1s', totalChecks: 8, findings: 1 },
    { timestamp: '2024-03-20 08:30:12', result: 'healthy', duration: '8.3s', totalChecks: 8, findings: 0 },
    { timestamp: '2024-03-20 06:30:09', result: 'healthy', duration: '8.0s', totalChecks: 8, findings: 0 },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search integrity checks..."
          className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <div className="flex-1"></div>

        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3.5 h-3.5" />
          Export Report
        </button>

        <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600">
          <RefreshCw className="w-3.5 h-3.5" />
          Run Full Scan
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Overall Status</span>
            <Shield className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
          </div>
          <div className="text-xl font-semibold text-green-600 dark:text-green-500">Healthy</div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Last Scan</span>
          </div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">2m ago</div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Checks Passed</span>
          </div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">
            {checks.filter(c => c.status === 'healthy').length}/{checks.length}
          </div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Total Findings</span>
          </div>
          <div className="text-xl font-semibold text-yellow-600 dark:text-yellow-500 tabular-nums">
            {checks.reduce((sum, c) => sum + c.findings, 0)}
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)]">
          <h2 className="text-xs font-medium text-[var(--text-primary)] uppercase tracking-wide">Integrity Checks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)]">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Check
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Status
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Last Run
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Duration
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Findings
                </th>
                <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-primary)]">
              {checks.map((check) => (
                <tr key={check.id} className="hover:bg-[var(--bg-secondary)]">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      {check.status === 'healthy' ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-500" />
                      )}
                      <span className="text-[var(--text-primary)] font-medium">{check.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                        check.status === 'healthy'
                          ? 'bg-green-500/10 text-green-600 dark:text-green-500'
                          : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500'
                      }`}
                    >
                      {check.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-[var(--text-secondary)] font-mono">{check.lastRun}</td>
                  <td className="px-3 py-2 text-[var(--text-secondary)] font-mono">{check.duration}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`font-mono ${
                        check.findings > 0
                          ? 'text-yellow-600 dark:text-yellow-500'
                          : 'text-[var(--text-tertiary)]'
                      }`}
                    >
                      {check.findings}
                    </span>
                  </td>
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
          <h2 className="text-xs font-medium text-[var(--text-primary)] uppercase tracking-wide">Recent Scans</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {recentScans.map((scan, index) => (
            <div key={index} className="px-3 py-2 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
                <div>
                  <p className="text-xs text-[var(--text-primary)] font-mono">{scan.timestamp}</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                    {scan.totalChecks} checks completed in {scan.duration}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {scan.findings > 0 && (
                  <span className="text-xs text-yellow-600 dark:text-yellow-500">
                    {scan.findings} findings
                  </span>
                )}
                <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
