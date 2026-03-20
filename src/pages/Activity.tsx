import { Fragment, useState } from 'react';
import { Download, ChevronLeft, ChevronRight, ChevronDown, Clock, Monitor, Tag, Hash } from 'lucide-react';
import { useSystem } from '../contexts/SystemContext';

const ACTIVITIES = [
  { id: 'evt_1234567890', timestamp: '2024-03-20 14:32:15', type: 'verification.completed', resource: 'user_abc123', status: 'success', ip: '192.168.1.1', details: 'Identity verification completed successfully', duration: '284ms', region: 'us-east-1' },
  { id: 'evt_1234567889', timestamp: '2024-03-20 14:28:42', type: 'api.key.created', resource: 'pk_prod_xyz789', status: 'success', ip: '192.168.1.1', details: 'Production API key created', duration: '92ms', region: 'us-east-1' },
  { id: 'evt_1234567888', timestamp: '2024-03-20 13:15:22', type: 'trust.score.updated', resource: 'trust_profile', status: 'info', ip: 'system', details: 'Trust score increased from 92 to 94', duration: '—', region: 'global' },
  { id: 'evt_1234567887', timestamp: '2024-03-20 12:45:10', type: 'verification.failed', resource: 'user_def456', status: 'error', ip: '192.168.1.5', details: 'Document verification failed: invalid document format', duration: '1.2s', region: 'us-east-1' },
  { id: 'evt_1234567886', timestamp: '2024-03-20 11:30:05', type: 'settings.updated', resource: 'security', status: 'success', ip: '192.168.1.1', details: 'Two-factor authentication enabled', duration: '61ms', region: 'us-east-1' },
  { id: 'evt_1234567885', timestamp: '2024-03-20 10:15:33', type: 'api.request', resource: '/v1/verify', status: 'success', ip: '203.0.113.42', details: 'POST completed in 142ms', duration: '142ms', region: 'eu-west-1' },
  { id: 'evt_1234567884', timestamp: '2024-03-20 09:22:18', type: 'webhook.sent', resource: 'https://api.example.com/webhooks', status: 'success', ip: 'system', details: 'Webhook delivered (200 OK)', duration: '338ms', region: 'us-east-1' },
  { id: 'evt_1234567883', timestamp: '2024-03-20 08:45:55', type: 'verification.started', resource: 'user_ghi789', status: 'info', ip: '192.168.1.8', details: 'Email verification initiated', duration: '45ms', region: 'us-east-1' },
  { id: 'evt_1234567882', timestamp: '2024-03-19 23:30:12', type: 'api.key.revoked', resource: 'pk_test_old123', status: 'warning', ip: '192.168.1.1', details: 'Test API key manually revoked', duration: '77ms', region: 'us-east-1' },
  { id: 'evt_1234567881', timestamp: '2024-03-19 22:15:40', type: 'login', resource: 'user_session', status: 'success', ip: '192.168.1.1', details: 'User logged in successfully', duration: '120ms', region: 'us-east-1' },
];

const STATUS_COLORS: Record<string, string> = {
  success: 'bg-green-500/10 text-green-700 dark:text-green-500',
  error: 'bg-red-500/10 text-red-700 dark:text-red-500',
  warning: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-500',
  info: 'bg-blue-500/10 text-blue-700 dark:text-blue-500',
};

function EventDetailContent({ event }: { event: typeof ACTIVITIES[0] }) {
  return (
    <div className="divide-y divide-[var(--border-primary)]">
      {/* Status banner */}
      <div className={`px-4 py-2 flex items-center gap-2 ${STATUS_COLORS[event.status]}`}>
        <span className="text-xs font-medium uppercase tracking-wider">{event.status}</span>
      </div>

      {/* Core info */}
      <div className="px-4 py-3 space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Event Type</p>
          <p className="text-sm font-mono text-[var(--text-primary)]">{event.type}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Details</p>
          <p className="text-xs text-[var(--text-secondary)]">{event.details}</p>
        </div>
      </div>

      {/* Metadata grid */}
      <div className="px-4 py-3 grid grid-cols-2 gap-3">
        <div className="flex items-start gap-2">
          <Clock className="w-3 h-3 text-[var(--text-tertiary)] mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">Timestamp</p>
            <p className="text-xs font-mono text-[var(--text-secondary)] mt-0.5">{event.timestamp}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Monitor className="w-3 h-3 text-[var(--text-tertiary)] mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">Origin IP</p>
            <p className="text-xs font-mono text-[var(--text-secondary)] mt-0.5">{event.ip}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Tag className="w-3 h-3 text-[var(--text-tertiary)] mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">Region</p>
            <p className="text-xs font-mono text-[var(--text-secondary)] mt-0.5">{event.region}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="w-3 h-3 text-[var(--text-tertiary)] mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">Duration</p>
            <p className="text-xs font-mono text-[var(--text-secondary)] mt-0.5">{event.duration}</p>
          </div>
        </div>
      </div>

      {/* Resource + Event ID */}
      <div className="px-4 py-3 space-y-2">
        <div className="flex items-start gap-2">
          <Hash className="w-3 h-3 text-[var(--text-tertiary)] mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">Resource</p>
            <p className="text-xs font-mono text-[var(--text-secondary)] mt-0.5 break-all">{event.resource}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Hash className="w-3 h-3 text-[var(--text-tertiary)] mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">Event ID</p>
            <p className="text-xs font-mono text-[var(--text-secondary)] mt-0.5">{event.id}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 flex gap-2">
        <button className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          Copy Event ID
        </button>
        <button className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          View Raw Payload
        </button>
      </div>
    </div>
  );
}

export default function Activity() {
  const { openDetailPanel } = useSystem();
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filtered = ACTIVITIES.filter((a) => {
    if (selectedType !== 'all' && !a.type.startsWith(selectedType)) return false;
    if (selectedStatus !== 'all' && a.status !== selectedStatus) return false;
    return true;
  });

  const handleRowClick = (event: typeof ACTIVITIES[0]) => {
    openDetailPanel(event.type, <EventDetailContent event={event} />, event.id);
  };

  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3 h-3" />
          Export
        </button>
        <div className="w-px h-4 bg-[var(--border-primary)] mx-1" />
        <div className="relative">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="appearance-none pl-2.5 pr-6 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Events</option>
            <option value="verification">Verifications</option>
            <option value="api">API</option>
            <option value="trust">Trust</option>
            <option value="settings">Settings</option>
            <option value="webhook">Webhooks</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none pl-2.5 pr-6 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
        </div>
        <div className="flex-1" />
        <span className="text-xs font-mono text-[var(--text-tertiary)]">
          {filtered.length.toLocaleString()} / 1,247 events
        </span>
      </div>

      {/* Table */}
      <div className="border border-[var(--border-primary)]">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)]">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-36">Timestamp</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Event</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Resource</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20">Status</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-28">IP</th>
                <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-32">Event ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-primary)]">
              {filtered.map((a) => (
                <Fragment key={a.id}>
                  <tr
                    className="hover:bg-[var(--bg-secondary)] cursor-pointer group"
                    onClick={() => handleRowClick(a)}
                  >
                    <td className="px-3 py-2 text-[var(--text-tertiary)] font-mono whitespace-nowrap">{a.timestamp}</td>
                    <td className="px-3 py-2 text-[var(--text-primary)] font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{a.type}</td>
                    <td className="px-3 py-2 text-[var(--text-secondary)] font-mono truncate max-w-[200px]">{a.resource}</td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_COLORS[a.status] ?? ''}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[var(--text-secondary)] font-mono">{a.ip}</td>
                    <td className="px-3 py-2 text-[var(--text-tertiary)] font-mono text-right">{a.id}</td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-3 py-2 border-t border-[var(--border-primary)] flex items-center justify-between bg-[var(--bg-secondary)]">
          <span className="text-xs text-[var(--text-tertiary)]">
            Showing <span className="font-mono text-[var(--text-primary)]">1–10</span> of{' '}
            <span className="font-mono text-[var(--text-primary)]">1,247</span>
          </span>
          <div className="flex items-center gap-1">
            <button className="p-1 border border-[var(--border-primary)] hover:bg-[var(--bg-primary)] text-[var(--text-tertiary)] disabled:opacity-40">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="px-2 py-1 text-xs bg-blue-600 dark:bg-blue-500 text-white">1</button>
            <button className="px-2 py-1 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-primary)] text-[var(--text-secondary)]">2</button>
            <button className="px-2 py-1 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-primary)] text-[var(--text-secondary)]">3</button>
            <span className="px-1 text-[var(--text-tertiary)]">···</span>
            <button className="px-2 py-1 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-primary)] text-[var(--text-secondary)]">125</button>
            <button className="p-1 border border-[var(--border-primary)] hover:bg-[var(--bg-primary)] text-[var(--text-tertiary)]">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <p className="mt-2 text-[10px] text-[var(--text-tertiary)]">Click any row to inspect event details</p>
    </div>
  );
}
