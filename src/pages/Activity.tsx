import { useState } from 'react';
import { Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Activity() {
  const [filterOpen, setFilterOpen] = useState(false);
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Event Type
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Event ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-mono whitespace-nowrap">
                    {activity.timestamp}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">{activity.type}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{activity.details}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-mono">
                    {activity.resource}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        activity.status === 'success'
                          ? 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400'
                          : activity.status === 'error'
                          ? 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400'
                          : activity.status === 'warning'
                          ? 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400'
                          : 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-mono">
                    {activity.ip}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 font-mono text-right">
                    {activity.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium text-gray-700 dark:text-gray-300">1-10</span> of{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">1,247</span> events
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded-md">
              1
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
              2
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
              3
            </button>
            <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
            <button className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
              125
            </button>
            <button className="p-1.5 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
