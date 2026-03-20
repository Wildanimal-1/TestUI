import { Save, RotateCw, Plus, Trash2 } from 'lucide-react';

const WEBHOOK_EVENTS = [
  { event: 'verification.completed', enabled: false },
  { event: 'verification.failed', enabled: false },
  { event: 'trust.score.updated', enabled: false },
  { event: 'api.key.created', enabled: false },
  { event: 'api.key.revoked', enabled: false },
];

const CORS_ORIGINS = [
  { origin: 'https://example.com', added: '—' },
];

const RATE_ROWS = [
  { label: 'Requests per minute', value: '60', note: 'Plan limit' },
  { label: 'Requests per hour', value: '3,600', note: 'Plan limit' },
  { label: 'Max payload size', value: '256 KB', note: 'Fixed' },
  { label: 'Concurrent connections', value: '10', note: 'Plan limit' },
];

function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] flex items-center justify-between">
      <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">{title}</h2>
      {action}
    </div>
  );
}

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <div className={`relative inline-flex h-4 w-7 flex-shrink-0 items-center border ${enabled ? 'bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500' : 'bg-[var(--bg-secondary)] border-[var(--border-primary)]'}`}>
      <span className={`inline-block h-2.5 w-2.5 bg-white transform transition-transform ${enabled ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
    </div>
  );
}

export default function DeveloperSettings() {
  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button
          disabled
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium opacity-50 cursor-not-allowed"
        >
          <Save className="w-3 h-3" />
          Save Changes
        </button>
        <button
          disabled
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] text-[var(--text-secondary)] opacity-50 cursor-not-allowed"
        >
          <RotateCw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Webhooks */}
      <div className="border border-[var(--border-primary)] mb-4">
        <SectionHeader title="Webhooks" />
        <div className="divide-y divide-[var(--border-primary)]">
          <div className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
            <div>
              <div className="text-xs font-medium text-[var(--text-primary)]">Endpoint URL</div>
              <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">HTTPS endpoint to receive event payloads</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[var(--text-tertiary)]">Not configured</span>
              <button disabled className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] text-[var(--text-secondary)] opacity-50 cursor-not-allowed">
                Configure
              </button>
            </div>
          </div>
          <div className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
            <div>
              <div className="text-xs font-medium text-[var(--text-primary)]">Signing secret</div>
              <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Used to verify payload authenticity via HMAC-SHA256</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[var(--text-tertiary)]">Not generated</span>
              <button disabled className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] text-[var(--text-secondary)] opacity-50 cursor-not-allowed">
                Generate
              </button>
            </div>
          </div>
          <div className="border-t border-[var(--border-primary)]">
            <div className="px-3 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)]">
              <span className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Subscribed Events</span>
            </div>
            <div className="divide-y divide-[var(--border-primary)]">
              {WEBHOOK_EVENTS.map((e) => (
                <div key={e.event} className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
                  <span className="text-xs font-mono text-[var(--text-secondary)]">{e.event}</span>
                  <Toggle enabled={e.enabled} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CORS */}
      <div className="border border-[var(--border-primary)] mb-4">
        <SectionHeader
          title="CORS — Allowed Origins"
          action={
            <button disabled className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)] opacity-40 cursor-not-allowed">
              <Plus className="w-3 h-3" />
              Add origin
            </button>
          }
        />
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Origin</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-28">Added</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-16">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {CORS_ORIGINS.map((o) => (
              <tr key={o.origin} className="hover:bg-[var(--bg-secondary)]">
                <td className="px-3 py-2 font-mono text-[var(--text-primary)]">{o.origin}</td>
                <td className="px-3 py-2 text-right font-mono text-[var(--text-tertiary)]">{o.added}</td>
                <td className="px-3 py-2 text-right">
                  <button disabled className="text-[var(--text-tertiary)] opacity-40 cursor-not-allowed">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rate Limits */}
      <div className="border border-[var(--border-primary)] mb-4">
        <SectionHeader title="Rate Limits" />
        <div className="divide-y divide-[var(--border-primary)]">
          {RATE_ROWS.map((r) => (
            <div key={r.label} className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
              <span className="text-xs text-[var(--text-secondary)]">{r.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--text-primary)]">{r.value}</span>
                <span className="text-[10px] text-[var(--text-tertiary)]">{r.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IP Allowlist */}
      <div className="border border-[var(--border-primary)]">
        <SectionHeader
          title="IP Allowlist"
          action={
            <button disabled className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)] opacity-40 cursor-not-allowed">
              <Plus className="w-3 h-3" />
              Add range
            </button>
          }
        />
        <div className="px-3 py-2.5 flex items-center justify-between">
          <span className="text-xs text-[var(--text-secondary)]">Restriction mode</span>
          <span className="text-xs font-mono text-[var(--text-tertiary)]">Disabled — all IPs permitted</span>
        </div>
      </div>
    </div>
  );
}
