import { AlertCircle, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Trust Score</span>
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">94</span>
            <span className="text-sm text-green-600 dark:text-green-500 ml-2">+2.1%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Verifications</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">1,247</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">total</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">API Calls</span>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">48.2K</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">this month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
            <TrendingDown className="w-4 h-4 text-green-600 dark:text-green-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">142ms</span>
            <span className="text-sm text-green-600 dark:text-green-500 ml-2">-8ms</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">System Status</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">API Services</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">All systems operational</p>
              </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">99.99% uptime</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Verification Engine</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Running smoothly</p>
              </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">100% uptime</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Database Cluster</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Healthy</p>
              </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">99.98% uptime</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Action Items</h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">3 items</span>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          <div className="px-4 py-3 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">API key expiring soon</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Production key "pk_prod_abc123..." expires in 7 days
              </p>
            </div>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0">
              Renew
            </button>
          </div>
          <div className="px-4 py-3 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Review pending verifications</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                12 verifications awaiting manual review
              </p>
            </div>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0">
              Review
            </button>
          </div>
          <div className="px-4 py-3 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Update security settings</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Enable 2FA for enhanced account security
              </p>
            </div>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0">
              Configure
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h2>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            View all
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {[
            { event: 'Verification completed', resource: 'user_abc123', time: '2 minutes ago', status: 'success' },
            { event: 'API key created', resource: 'pk_prod_xyz789', time: '1 hour ago', status: 'success' },
            { event: 'Trust score updated', resource: 'Trust Profile', time: '3 hours ago', status: 'info' },
            { event: 'Verification failed', resource: 'user_def456', time: '5 hours ago', status: 'error' },
            { event: 'Settings updated', resource: 'Security', time: '1 day ago', status: 'success' },
          ].map((activity, index) => (
            <div key={index} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    activity.status === 'success'
                      ? 'bg-green-500'
                      : activity.status === 'error'
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                  }`}
                ></div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{activity.event}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{activity.resource}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
