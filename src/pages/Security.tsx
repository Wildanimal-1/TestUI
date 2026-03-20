import { Plus, XCircle, AlertTriangle } from 'lucide-react';

const SESSIONS = [
  { id: 'ses_1', device: 'Chrome on macOS', ip: '192.168.1.1', region: 'us-east-1', lastActive: 'Active now', current: true },
  { id: 'ses_2', device: 'Safari on iPhone', ip: '192.168.1.8', region: 'us-east-1', lastActive: '2h ago', current: false },
  { id: 'ses_3', device: 'Firefox on Windows', ip: '203.0.113.42', region: 'eu-west-1', lastActive: '3d ago', current: false },
];

const SECURITY_EVENTS = [
  { type: 'login.success', detail: 'Chrome on macOS', ip: '192.168.1.1', time: '2024-03-20 14:30' },
  { type: 'settings.updated', detail: 'Password changed', ip: '192.168.1.1', time: '2024-03-15 09:12' },
  { type: 'login.success', detail: 'Safari on iPhone', ip: '192.168.1.8', time: '2024-03-14 18:45' },
  { type: 'login.failed', detail: 'Unknown device', ip: '203.0.113.99', time: '2024-03-12 03:21' },
  { type: 'login.success', detail: 'Firefox on Windows', ip: '203.0.113.42', time: '2024-03-10 11:05' },
];

const EVENT_COLORS: Record<string, string> = {
  'login.success': 'bg-green-500/10 text-green-600 dark:text-green-500',
  'login.failed': 'bg-red-500/10 text-red-600 dark:text-red-500',
  'settings.updated': 'bg-blue-500/10 text-blue-600 dark:text-blue-500',
};

export default function Security() {
  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button
          disabled
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium opacity-50 cursor-not-allowed"
        >
          <Plus className="w-3 h-3" />
          Add 2FA Method
        </button>
        <div className="w-px h-4 bg-[var(--border-primary)] mx-1" />
        <button
          disabled
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] text-red-600 dark:text-red-400 opacity-40 cursor-not-allowed"
        >
          Revoke All Sessions
        </button>
        <div className="flex-1" />
        <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Read-only environment</span>
      </div>

      {/* Authentication */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Authentication</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          <div className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
            <div>
              <div className="text-xs font-medium text-[var(--text-primary)]">Password</div>
              <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Last changed: —</div>
            </div>
            <button disabled className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] text-[var(--text-secondary)] opacity-50 cursor-not-allowed">
              Change password
            </button>
          </div>
          <div className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
            <div>
              <div className="text-xs font-medium text-[var(--text-primary)]">Two-factor authentication</div>
              <div className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5">TOTP, SMS, or hardware key</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-neutral-500/10 text-neutral-500 dark:text-neutral-400">
                Not configured
              </span>
              <button disabled className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] text-[var(--text-secondary)] opacity-50 cursor-not-allowed">
                Enable
              </button>
            </div>
          </div>
          <div className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
            <div>
              <div className="text-xs font-medium text-[var(--text-primary)]">Recovery codes</div>
              <div className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5">Emergency credential — requires active 2FA configuration</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-neutral-500/10 text-neutral-500 dark:text-neutral-400">
                Not generated
              </span>
              <button disabled className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] text-[var(--text-secondary)] opacity-50 cursor-not-allowed">
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] flex items-center justify-between">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Active Sessions</h2>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">3 sessions</span>
        </div>
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Device</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-32">IP</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Region</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-28">Last Active</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-16">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {SESSIONS.map((s) => (
              <tr key={s.id} className="hover:bg-[var(--bg-secondary)]">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--text-primary)]">{s.device}</span>
                    {s.current && (
                      <span className="inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-green-500/10 text-green-600 dark:text-green-500">
                        Current
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2 font-mono text-[var(--text-secondary)]">{s.ip}</td>
                <td className="px-3 py-2 font-mono text-[var(--text-tertiary)]">{s.region}</td>
                <td className="px-3 py-2 text-right text-[var(--text-secondary)]">{s.lastActive}</td>
                <td className="px-3 py-2 text-right">
                  {!s.current && (
                    <button className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 ml-auto">
                      <XCircle className="w-3 h-3" />
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security Events */}
      <div className="border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] flex items-center justify-between">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Recent Security Events</h2>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Last 30 days</span>
        </div>
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-36">Event</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Detail</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-32">IP</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-36">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {SECURITY_EVENTS.map((e, i) => (
              <tr key={i} className="hover:bg-[var(--bg-secondary)]">
                <td className="px-3 py-2">
                  <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${EVENT_COLORS[e.type] ?? ''}`}>
                    {e.type}
                  </span>
                </td>
                <td className="px-3 py-2 text-[var(--text-secondary)]">{e.detail}</td>
                <td className="px-3 py-2 font-mono text-[var(--text-tertiary)]">{e.ip}</td>
                <td className="px-3 py-2 text-right font-mono text-[var(--text-tertiary)]">{e.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-3 py-2 border-t border-[var(--border-primary)] flex items-center gap-1.5 bg-[var(--bg-secondary)]">
          <AlertTriangle className="w-3 h-3 text-[var(--text-tertiary)]" />
          <span className="text-[10px] text-[var(--text-tertiary)]">Failed login attempts are retained for 30 days</span>
        </div>
      </div>
    </div>
  );
}
