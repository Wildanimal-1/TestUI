import { useState } from 'react';
import { AlertCircle, TrendingUp, TrendingDown, RefreshCw, Download, ChevronDown } from 'lucide-react';

const ACTIVITY = [
  { event: 'Verification completed', resource: 'user_abc123', time: '2m ago', status: 'success' },
  { event: 'API key created', resource: 'pk_prod_xyz789', time: '1h ago', status: 'success' },
  { event: 'Trust score updated', resource: 'trust_profile_001', time: '3h ago', status: 'info' },
  { event: 'Verification failed', resource: 'user_def456', time: '5h ago', status: 'error' },
  { event: 'Settings updated', resource: 'security_config', time: '1d ago', status: 'success' },
];

const ACTION_ITEMS = [
  { severity: 'warning', title: 'API key expiring soon', detail: 'pk_prod_abc123... · expires in 7 days', action: 'Renew' },
  { severity: 'info', title: 'Review pending verifications', detail: '12 verifications awaiting manual review', action: 'Review' },
  { severity: 'info', title: 'Enable two-factor authentication', detail: 'Recommended for enhanced account security', action: 'Configure' },
];

const SYSTEM_STATUS = [
  { name: 'API Services', state: 'Operational', uptime: '99.99%' },
  { name: 'Verification', state: 'Operational', uptime: '100%' },
  { name: 'Database', state: 'Healthy', uptime: '99.98%' },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600">
          <RefreshCw className="w-3 h-3" />
          Run Verification
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3 h-3" />
          Export
        </button>
        <div className="w-px h-4 bg-[var(--border-primary)] mx-1" />
        <div className="relative">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="appearance-none pl-2.5 pr-6 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="24h">Last 24h</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
        </div>
        <div className="flex-1" />
        <span className="flex items-center gap-1.5 text-xs text-yellow-600 dark:text-yellow-500">
          <AlertCircle className="w-3 h-3" />
          3 action items
        </span>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-4 border border-[var(--border-primary)] divide-x divide-[var(--border-primary)] mb-4">
        <div className="px-4 py-3">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Trust Score</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-[var(--text-primary)] tabular-nums leading-none">94</span>
            <span className="text-xs text-green-600 dark:text-green-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />+2.1%
            </span>
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Verifications</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-[var(--text-primary)] tabular-nums leading-none">1,247</span>
            <span className="text-xs text-[var(--text-tertiary)]">total</span>
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">API Calls</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-[var(--text-primary)] tabular-nums leading-none">48.2K</span>
            <span className="text-xs text-[var(--text-tertiary)]">this month</span>
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Response Time</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-[var(--text-primary)] tabular-nums leading-none">142ms</span>
            <span className="text-xs text-green-600 dark:text-green-500 flex items-center gap-0.5">
              <TrendingDown className="w-3 h-3" />-8ms
            </span>
          </div>
        </div>
      </div>

      {/* Action Items — critical, shown first */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] flex items-center justify-between bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Action Items</h2>
          <span className="text-[10px] text-[var(--text-tertiary)] font-mono">3 pending</span>
        </div>
        <table className="w-full text-xs">
          <tbody className="divide-y divide-[var(--border-primary)]">
            {ACTION_ITEMS.map((item, i) => (
              <tr key={i} className="hover:bg-[var(--bg-secondary)]">
                <td className="px-3 py-2.5 w-5">
                  <AlertCircle
                    className={`w-3 h-3 flex-shrink-0 ${item.severity === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`}
                  />
                </td>
                <td className="px-3 py-2.5">
                  <div className="text-[var(--text-primary)] font-medium">{item.title}</div>
                  <div className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5">{item.detail}</div>
                </td>
                <td className="px-3 py-2.5 text-right">
                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium whitespace-nowrap">
                    {item.action} →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* System Status + Recent Activity */}
      <div className="grid grid-cols-3 gap-3">
        <div className="border border-[var(--border-primary)]">
          <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
            <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">System Status</h2>
          </div>
          <table className="w-full text-xs">
            <tbody className="divide-y divide-[var(--border-primary)]">
              {SYSTEM_STATUS.map((svc) => (
                <tr key={svc.name} className="hover:bg-[var(--bg-secondary)]">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 flex-shrink-0" />
                      <span className="text-[var(--text-primary)] font-medium">{svc.name}</span>
                    </div>
                    <div className="text-[10px] text-[var(--text-tertiary)] ml-3.5 mt-0.5">{svc.state}</div>
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-[var(--text-tertiary)]">{svc.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-2 border border-[var(--border-primary)]">
          <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] flex items-center justify-between">
            <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Recent Activity</h2>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">5 of 1,247</span>
          </div>
          <table className="w-full text-xs">
            <tbody className="divide-y divide-[var(--border-primary)]">
              {ACTIVITY.map((a, i) => (
                <tr key={i} className="hover:bg-[var(--bg-secondary)] cursor-pointer">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-1 h-1 flex-shrink-0 ${
                        a.status === 'success' ? 'bg-green-500' : a.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`} />
                      <span className="text-[var(--text-primary)]">{a.event}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 font-mono text-[var(--text-tertiary)]">{a.resource}</td>
                  <td className="px-3 py-2 text-right font-mono text-[var(--text-tertiary)] whitespace-nowrap">{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
