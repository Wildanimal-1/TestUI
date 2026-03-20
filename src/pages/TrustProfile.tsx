import { CheckCircle, XCircle, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';

export default function TrustProfile() {
  const signals = [
    { name: 'Identity Verification', status: 'verified', score: 25, lastCheck: '2024-03-20' },
    { name: 'Email Verification', status: 'verified', score: 15, lastCheck: '2024-03-19' },
    { name: 'Phone Verification', status: 'verified', score: 15, lastCheck: '2024-03-19' },
    { name: 'Address Verification', status: 'pending', score: 0, lastCheck: 'Never' },
    { name: 'Document Verification', status: 'verified', score: 20, lastCheck: '2024-03-18' },
    { name: 'Behavioral Analysis', status: 'verified', score: 19, lastCheck: '2024-03-20' },
    { name: 'Risk Assessment', status: 'warning', score: 0, lastCheck: '2024-03-20' },
  ];

  const capabilities = [
    { name: 'API Access', enabled: true, description: 'Full access to REST and GraphQL APIs' },
    { name: 'Batch Operations', enabled: true, description: 'Process up to 1000 operations per batch' },
    { name: 'Webhooks', enabled: true, description: 'Receive real-time event notifications' },
    { name: 'Advanced Analytics', enabled: false, description: 'Requires trust score above 95' },
    { name: 'Priority Support', enabled: true, description: 'Enhanced support response times' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 mb-4">
              <span className="text-4xl font-bold text-white">94</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Trust Score</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Excellent standing</p>
            <div className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-500">
              <TrendingUp className="w-4 h-4" />
              <span>+2.1% this month</span>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Score Breakdown</h2>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">Identity Signals</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">55/60</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '91.67%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">Behavioral Signals</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">19/20</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">Activity Signals</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">20/20</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Trust Signals</h2>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            Run verification
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Signal
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Check
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {signals.map((signal, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{signal.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        signal.status === 'verified'
                          ? 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400'
                          : signal.status === 'warning'
                          ? 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {signal.status === 'verified' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : signal.status === 'warning' ? (
                        <AlertTriangle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {signal.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
                    {signal.score > 0 ? `+${signal.score}` : signal.score}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{signal.lastCheck}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Capabilities</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {capabilities.map((capability, index) => (
            <div key={index} className="px-4 py-3 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    capability.enabled
                      ? 'bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500'
                      : 'border-gray-300 dark:border-gray-700'
                  }`}
                >
                  {capability.enabled && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{capability.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{capability.description}</p>
                </div>
              </div>
              {!capability.enabled && (
                <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  Upgrade
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
