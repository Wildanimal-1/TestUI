import { useState } from 'react';
import { Plus, Copy, Eye, EyeOff, Trash2, RotateCw, CheckCircle2 } from 'lucide-react';

export default function APIKeys() {
  const [showModal, setShowModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const apiKeys = [
    {
      id: 'key_1',
      name: 'Production API Key',
      key: 'pk_prod_abc123def456ghi789jkl012',
      environment: 'production',
      created: '2024-01-15',
      lastUsed: '2 minutes ago',
      expires: '2024-07-15',
      status: 'active',
      requests: '48.2K',
    },
    {
      id: 'key_2',
      name: 'Staging Environment',
      key: 'pk_test_xyz789abc123def456ghi012',
      environment: 'staging',
      created: '2024-02-10',
      lastUsed: '1 hour ago',
      expires: '2024-08-10',
      status: 'active',
      requests: '12.5K',
    },
    {
      id: 'key_3',
      name: 'Development Key',
      key: 'pk_dev_mno345pqr678stu901vwx234',
      environment: 'development',
      created: '2024-03-01',
      lastUsed: '5 hours ago',
      expires: 'Never',
      status: 'active',
      requests: '3.2K',
    },
    {
      id: 'key_4',
      name: 'Legacy Production',
      key: 'pk_prod_old987fed654cba321ihg098',
      environment: 'production',
      created: '2023-11-20',
      lastUsed: '30 days ago',
      expires: '2024-03-27',
      status: 'expiring',
      requests: '125.8K',
    },
    {
      id: 'key_5',
      name: 'CI/CD Pipeline',
      key: 'pk_cicd_uvw567xyz890abc123def456',
      environment: 'ci/cd',
      created: '2024-02-28',
      lastUsed: 'Never',
      expires: 'Never',
      status: 'inactive',
      requests: '0',
    },
  ];

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (keyId: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskKey = (key: string) => {
    return key.slice(0, 12) + '•'.repeat(20);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage API keys for accessing the TrustPlane API. Keep your keys secure and rotate them regularly.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          Create API Key
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  API Key
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Environment
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Used
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Requests
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {apiKeys.map((apiKey) => (
                <tr key={apiKey.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{apiKey.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Created {apiKey.created}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                        {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        aria-label="Toggle visibility"
                      >
                        {visibleKeys.has(apiKey.id) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.id, apiKey.key)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        aria-label="Copy key"
                      >
                        {copiedKey === apiKey.id ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        apiKey.environment === 'production'
                          ? 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400'
                          : apiKey.environment === 'staging'
                          ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400'
                          : apiKey.environment === 'development'
                          ? 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {apiKey.environment}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        apiKey.status === 'active'
                          ? 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400'
                          : apiKey.status === 'expiring'
                          ? 'bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {apiKey.status}
                    </span>
                    {apiKey.expires !== 'Never' && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Expires {apiKey.expires}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {apiKey.lastUsed}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
                    {apiKey.requests}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        aria-label="Rotate key"
                      >
                        <RotateCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteKey(apiKey.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        aria-label="Delete key"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">API Key Security Best Practices</h3>
        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
          <li>Never commit API keys to version control</li>
          <li>Rotate keys regularly and before they expire</li>
          <li>Use environment-specific keys for different deployment stages</li>
          <li>Revoke unused or compromised keys immediately</li>
          <li>Monitor API key usage for suspicious activity</li>
        </ul>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Create New API Key</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Key Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Production API Key"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Environment
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Production</option>
                  <option>Staging</option>
                  <option>Development</option>
                  <option>CI/CD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiration
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>180 days</option>
                  <option>1 year</option>
                  <option>Never</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-700 dark:hover:bg-blue-600">
                Create Key
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteKey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Delete API Key</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this API key? This action cannot be undone and may break integrations using this key.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteKey(null)}
                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-red-600 dark:bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-700 dark:hover:bg-red-600">
                Delete Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
