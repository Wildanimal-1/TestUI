import { AlertCircle, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Trust Score</span>
            <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-[var(--text-primary)] tabular-nums">94</span>
            <span className="text-xs text-green-600 dark:text-green-500">+2.1%</span>
          </div>
        </div>

        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Verifications</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-[var(--text-primary)] tabular-nums">1,247</span>
            <span className="text-xs text-[var(--text-tertiary)]">total</span>
          </div>
        </div>

        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">API Calls</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-[var(--text-primary)] tabular-nums">48.2K</span>
            <span className="text-xs text-[var(--text-tertiary)]">this month</span>
          </div>
        </div>

        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Response Time</span>
            <TrendingDown className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-[var(--text-primary)] tabular-nums">142ms</span>
            <span className="text-xs text-green-600 dark:text-green-500">-8ms</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 bg-[var(--bg-primary)] border border-[var(--border-primary)]">
          <div className="px-3 py-2 border-b border-[var(--border-primary)] flex items-center justify-between">
            <h2 className="text-xs font-medium text-[var(--text-primary)] uppercase tracking-wide">Action Items</h2>
            <span className="text-xs text-[var(--text-tertiary)]">3 items</span>
          </div>
          <div className="divide-y divide-[var(--border-primary)]">
            <div className="px-3 py-2.5 flex items-start gap-2.5 hover:bg-[var(--bg-secondary)] cursor-pointer">
              <AlertCircle className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[var(--text-primary)]">API key expiring soon</p>
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5 font-mono">
                  pk_prod_abc123... expires in 7 days
                </p>
              </div>
              <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0">
                Renew
              </button>
            </div>
            <div className="px-3 py-2.5 flex items-start gap-2.5 hover:bg-[var(--bg-secondary)] cursor-pointer">
              <AlertCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[var(--text-primary)]">Review pending verifications</p>
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                  12 verifications awaiting manual review
                </p>
              </div>
              <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0">
                Review
              </button>
            </div>
            <div className="px-3 py-2.5 flex items-start gap-2.5 hover:bg-[var(--bg-secondary)] cursor-pointer">
              <AlertCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[var(--text-primary)]">Update security settings</p>
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                  Enable 2FA for enhanced account security
                </p>
              </div>
              <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0">
                Configure
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)]">
          <div className="px-3 py-2 border-b border-[var(--border-primary)]">
            <h2 className="text-xs font-medium text-[var(--text-primary)] uppercase tracking-wide">System Status</h2>
          </div>
          <div className="divide-y divide-[var(--border-primary)]">
            <div className="px-3 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-primary)]">API Services</p>
                  <p className="text-[10px] text-[var(--text-tertiary)]">Operational</p>
                </div>
              </div>
              <span className="text-[10px] text-[var(--text-tertiary)] font-mono">99.99%</span>
            </div>
            <div className="px-3 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-primary)]">Verification</p>
                  <p className="text-[10px] text-[var(--text-tertiary)]">Operational</p>
                </div>
              </div>
              <span className="text-[10px] text-[var(--text-tertiary)] font-mono">100%</span>
            </div>
            <div className="px-3 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-primary)]">Database</p>
                  <p className="text-[10px] text-[var(--text-tertiary)]">Healthy</p>
                </div>
              </div>
              <span className="text-[10px] text-[var(--text-tertiary)] font-mono">99.98%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] flex items-center justify-between">
          <h2 className="text-xs font-medium text-[var(--text-primary)] uppercase tracking-wide">Recent Activity</h2>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            View all
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {[
            { event: 'Verification completed', resource: 'user_abc123', time: '2 minutes ago', status: 'success' },
            { event: 'API key created', resource: 'pk_prod_xyz789', time: '1 hour ago', status: 'success' },
            { event: 'Trust score updated', resource: 'trust_profile_001', time: '3 hours ago', status: 'info' },
            { event: 'Verification failed', resource: 'user_def456', time: '5 hours ago', status: 'error' },
            { event: 'Settings updated', resource: 'security_config', time: '1 day ago', status: 'success' },
          ].map((activity, index) => (
            <div key={index} className="px-3 py-2 flex items-center justify-between hover:bg-[var(--bg-secondary)] cursor-pointer">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div
                  className={`w-1 h-1 rounded-full flex-shrink-0 ${
                    activity.status === 'success'
                      ? 'bg-green-500'
                      : activity.status === 'error'
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                  }`}
                ></div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-primary)]">{activity.event}</p>
                  <p className="text-[10px] text-[var(--text-tertiary)] font-mono truncate">{activity.resource}</p>
                </div>
              </div>
              <span className="text-[10px] text-[var(--text-tertiary)] flex-shrink-0 ml-2">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
