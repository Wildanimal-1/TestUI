import { useState } from 'react';
import { Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Activity() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const activities = [
    {
      id: 'evt_1234567890',
      timestamp: '2024-03-20 14:32:15',
      type: 'verification.completed',
      resource: 'user_abc123',
      status: 'success',
      ip: '192.168.1.1',
      details: 'Identity verification completed successfully',
    },
    {
      id: 'evt_1234567889',
      timestamp: '2024-03-20 14:28:42',
      type: 'api.key.created',
      resource: 'pk_prod_xyz789',
      status: 'success',
      ip: '192.168.1.1',
      details: 'Production API key created',
    },
    {
      id: 'evt_1234567888',
      timestamp: '2024-03-20 13:15:22',
      type: 'trust.score.updated',
      resource: 'trust_profile',
      status: 'info',
      ip: 'system',
      details: 'Trust score increased from 92 to 94',
    },
    {
      id: 'evt_1234567887',
      timestamp: '2024-03-20 12:45:10',
      type: 'verification.failed',
      resource: 'user_def456',
      status: 'error',
      ip: '192.168.1.5',
      details: 'Document verification failed: invalid document format',
    },
    {
      id: 'evt_1234567886',
      timestamp: '2024-03-20 11:30:05',
      type: 'settings.updated',
      resource: 'security',
      status: 'success',
      ip: '192.168.1.1',
      details: 'Two-factor authentication enabled',
    },
    {
      id: 'evt_1234567885',
      timestamp: '2024-03-20 10:15:33',
      type: 'api.request',
      resource: '/v1/verify',
      status: 'success',
      ip: '203.0.113.42',
      details: 'POST request completed in 142ms',
    },
    {
      id: 'evt_1234567884',
      timestamp: '2024-03-20 09:22:18',
      type: 'webhook.sent',
      resource: 'https://api.example.com/webhooks',
      status: 'success',
      ip: 'system',
      details: 'Webhook delivered successfully (200 OK)',
    },
    {
      id: 'evt_1234567883',
      timestamp: '2024-03-20 08:45:55',
      type: 'verification.started',
      resource: 'user_ghi789',
      status: 'info',
      ip: '192.168.1.8',
      details: 'Email verification initiated',
    },
    {
      id: 'evt_1234567882',
      timestamp: '2024-03-19 23:30:12',
      type: 'api.key.revoked',
      resource: 'pk_test_old123',
      status: 'warning',
      ip: '192.168.1.1',
      details: 'Test API key manually revoked',
    },
    {
      id: 'evt_1234567881',
      timestamp: '2024-03-19 22:15:40',
      type: 'login',
      resource: 'user_session',
      status: 'success',
      ip: '192.168.1.1',
      details: 'User logged in successfully',
    },
  ];

  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'verification', label: 'Verifications' },
    { value: 'api', label: 'API Events' },
    { value: 'trust', label: 'Trust Updates' },
    { value: 'settings', label: 'Settings' },
    { value: 'webhook', label: 'Webhooks' },
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'success', label: 'Success' },
    { value: 'error', label: 'Error' },
    { value: 'warning', label: 'Warning' },
    { value: 'info', label: 'Info' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>

      <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)]">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)]">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Timestamp
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Event Type
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Resource
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Status
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  IP Address
                </th>
                <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Event ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-primary)]">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-[var(--bg-secondary)] cursor-pointer">
                  <td className="px-3 py-2 text-[var(--text-primary)] font-mono whitespace-nowrap">
                    {activity.timestamp}
                  </td>
                  <td className="px-3 py-2">
                    <div>
                      <p className="text-[var(--text-primary)] font-medium">{activity.type}</p>
                      <p className="text-[var(--text-tertiary)] mt-0.5">{activity.details}</p>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-[var(--text-secondary)] font-mono">
                    {activity.resource}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                        activity.status === 'success'
                          ? 'bg-green-500/10 text-green-600 dark:text-green-500'
                          : activity.status === 'error'
                          ? 'bg-red-500/10 text-red-600 dark:text-red-500'
                          : activity.status === 'warning'
                          ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-500'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-[var(--text-secondary)] font-mono">
                    {activity.ip}
                  </td>
                  <td className="px-3 py-2 text-[var(--text-tertiary)] font-mono text-right">
                    {activity.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-3 py-2 border-t border-[var(--border-primary)] flex items-center justify-between">
          <div className="text-xs text-[var(--text-tertiary)]">
            Showing <span className="font-mono text-[var(--text-secondary)]">1-10</span> of{' '}
            <span className="font-mono text-[var(--text-secondary)]">1,247</span> events
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-tertiary)] disabled:opacity-50">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="px-2 py-1 text-xs bg-blue-600 dark:bg-blue-500 text-white">
              1
            </button>
            <button className="px-2 py-1 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              2
            </button>
            <button className="px-2 py-1 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              3
            </button>
            <span className="px-1 text-[var(--text-tertiary)]">...</span>
            <button className="px-2 py-1 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              125
            </button>
            <button className="p-1 border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-tertiary)]">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
