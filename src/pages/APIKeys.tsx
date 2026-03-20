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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--text-secondary)]">
          Manage API keys for accessing the TrustPlane API
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          <Plus className="w-3.5 h-3.5" />
          Create API Key
        </button>
      </div>

      <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)]">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)]">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Name
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  API Key
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Environment
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Status
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Last Used
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Requests
                </th>
                <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-primary)]">
              {apiKeys.map((apiKey) => (
                <tr key={apiKey.id} className="hover:bg-[var(--bg-secondary)]">
                  <td className="px-3 py-2">
                    <div>
                      <p className="text-[var(--text-primary)] font-medium">{apiKey.name}</p>
                      <p className="text-[var(--text-tertiary)] mt-0.5">
                        Created {apiKey.created}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <code className="text-[var(--text-secondary)] font-mono">
                        {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                        aria-label="Toggle visibility"
                      >
                        {visibleKeys.has(apiKey.id) ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.id, apiKey.key)}
                        className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                        aria-label="Copy key"
                      >
                        {copiedKey === apiKey.id ? (
                          <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                        apiKey.environment === 'production'
                          ? 'bg-orange-500/10 text-orange-600 dark:text-orange-500'
                          : apiKey.environment === 'staging'
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-500'
                          : apiKey.environment === 'development'
                          ? 'bg-green-500/10 text-green-600 dark:text-green-500'
                          : 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {apiKey.environment}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                        apiKey.status === 'active'
                          ? 'bg-green-500/10 text-green-600 dark:text-green-500'
                          : apiKey.status === 'expiring'
                          ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500'
                          : 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {apiKey.status}
                    </span>
                    {apiKey.expires !== 'Never' && (
                      <p className="text-[var(--text-tertiary)] mt-0.5">
                        Expires {apiKey.expires}
                      </p>
                    )}
                  </td>
                  <td className="px-3 py-2 text-[var(--text-secondary)]">
                    {apiKey.lastUsed}
                  </td>
                  <td className="px-3 py-2 text-[var(--text-primary)] font-mono">
                    {apiKey.requests}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="p-1 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                        aria-label="Rotate key"
                      >
                        <RotateCw className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setDeleteKey(apiKey.id)}
                        className="p-1 text-[var(--text-tertiary)] hover:text-red-600 dark:hover:text-red-400"
                        aria-label="Delete key"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/20 p-3">
        <h3 className="text-xs font-medium text-blue-600 dark:text-blue-500 mb-1.5">API Key Security Best Practices</h3>
        <ul className="text-xs text-blue-600/80 dark:text-blue-500/80 space-y-1 list-disc list-inside">
          <li>Never commit API keys to version control</li>
          <li>Rotate keys regularly and before they expire</li>
          <li>Use environment-specific keys for different deployment stages</li>
          <li>Revoke unused or compromised keys immediately</li>
          <li>Monitor API key usage for suspicious activity</li>
        </ul>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-4 max-w-md w-full mx-4">
            <h2 className="text-sm font-medium text-[var(--text-primary)] mb-3">Create New API Key</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                  Key Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Production API Key"
                  className="w-full px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                  Environment
                </label>
                <select className="w-full px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Production</option>
                  <option>Staging</option>
                  <option>Development</option>
                  <option>CI/CD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                  Expiration
                </label>
                <select className="w-full px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>180 days</option>
                  <option>1 year</option>
                  <option>Never</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-2.5 py-1.5 border border-[var(--border-primary)] text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
              >
                Cancel
              </button>
              <button className="flex-1 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600">
                Create Key
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteKey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-4 max-w-md w-full mx-4">
            <h2 className="text-sm font-medium text-[var(--text-primary)] mb-2">Delete API Key</h2>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              Are you sure you want to delete this API key? This action cannot be undone and may break integrations using this key.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeleteKey(null)}
                className="flex-1 px-2.5 py-1.5 border border-[var(--border-primary)] text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
              >
                Cancel
              </button>
              <button className="flex-1 px-2.5 py-1.5 bg-red-600 dark:bg-red-500 text-white text-xs font-medium hover:bg-red-700 dark:hover:bg-red-600">
                Delete Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
