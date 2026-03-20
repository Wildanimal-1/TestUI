import { useState } from 'react';
import { Plus, Copy, Eye, EyeOff, Trash2, RotateCw, CheckCircle2, Search, ChevronDown } from 'lucide-react';

const API_KEYS = [
  { id: 'key_1', name: 'Production API Key', key: 'pk_prod_abc123def456ghi789jkl012', environment: 'production', created: '2024-01-15', lastUsed: '2m ago', expires: '2024-07-15', status: 'active', requests: '48,200' },
  { id: 'key_2', name: 'Staging Environment', key: 'pk_test_xyz789abc123def456ghi012', environment: 'staging', created: '2024-02-10', lastUsed: '1h ago', expires: '2024-08-10', status: 'active', requests: '12,500' },
  { id: 'key_3', name: 'Development Key', key: 'pk_dev_mno345pqr678stu901vwx234', environment: 'development', created: '2024-03-01', lastUsed: '5h ago', expires: 'Never', status: 'active', requests: '3,200' },
  { id: 'key_4', name: 'Legacy Production', key: 'pk_prod_old987fed654cba321ihg098', environment: 'production', created: '2023-11-20', lastUsed: '30d ago', expires: '2024-03-27', status: 'expiring', requests: '125,800' },
  { id: 'key_5', name: 'CI/CD Pipeline', key: 'pk_cicd_uvw567xyz890abc123def456', environment: 'ci/cd', created: '2024-02-28', lastUsed: 'Never', expires: 'Never', status: 'inactive', requests: '0' },
];

const ENV_COLORS: Record<string, string> = {
  production: 'bg-orange-500/10 text-orange-600 dark:text-orange-500',
  staging: 'bg-blue-500/10 text-blue-600 dark:text-blue-500',
  development: 'bg-green-500/10 text-green-600 dark:text-green-500',
  'ci/cd': 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500/10 text-green-600 dark:text-green-500',
  expiring: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500',
  inactive: 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400',
};

export default function APIKeys() {
  const [showModal, setShowModal] = useState(false);
  const [deleteKey, setDeleteKey] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [filterEnv, setFilterEnv] = useState('all');
  const [search, setSearch] = useState('');

  const toggleKeyVisibility = (id: string) => {
    const next = new Set(visibleKeys);
    next.has(id) ? next.delete(id) : next.add(id);
    setVisibleKeys(next);
  };

  const copyToClipboard = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskKey = (key: string) => key.slice(0, 12) + '•'.repeat(16);

  const filtered = API_KEYS.filter((k) => {
    if (filterEnv !== 'all' && k.environment !== filterEnv) return false;
    if (search && !k.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          <Plus className="w-3 h-3" />
          Create Key
        </button>
        <div className="w-px h-4 bg-[var(--border-primary)] mx-1" />
        <div className="relative">
          <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search keys..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-6 pr-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-1 focus:ring-blue-500 w-44"
          />
        </div>
        <div className="relative">
          <select
            value={filterEnv}
            onChange={(e) => setFilterEnv(e.target.value)}
            className="appearance-none pl-2.5 pr-6 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Environments</option>
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
            <option value="ci/cd">CI/CD</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
        </div>
        <div className="flex-1" />
        <span className="text-xs font-mono text-[var(--text-tertiary)]">{filtered.length} keys</span>
      </div>

      {/* Keys Table */}
      <div className="border border-[var(--border-primary)]">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)]">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Name</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Key</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Env</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20">Status</th>
                <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Requests</th>
                <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Last Used</th>
                <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-primary)]">
              {filtered.map((k) => (
                <tr key={k.id} className="hover:bg-[var(--bg-secondary)]">
                  <td className="px-3 py-2">
                    <div className="text-[var(--text-primary)] font-medium">{k.name}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)] font-mono mt-0.5">Created {k.created}</div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <code className="text-[var(--text-secondary)] font-mono text-[10px]">
                        {visibleKeys.has(k.id) ? k.key : maskKey(k.key)}
                      </code>
                      <button onClick={() => toggleKeyVisibility(k.id)} className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]" aria-label="Toggle visibility">
                        {visibleKeys.has(k.id) ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                      <button onClick={() => copyToClipboard(k.id, k.key)} className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]" aria-label="Copy">
                        {copiedKey === k.id ? <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${ENV_COLORS[k.environment] ?? ''}`}>
                      {k.environment}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_COLORS[k.status] ?? ''}`}>
                      {k.status}
                    </span>
                    {k.expires !== 'Never' && (
                      <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">exp {k.expires}</div>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-[var(--text-primary)]">{k.requests}</td>
                  <td className="px-3 py-2 text-right text-[var(--text-secondary)]">{k.lastUsed}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]" aria-label="Rotate key">
                        <RotateCw className="w-3 h-3" />
                      </button>
                      <button onClick={() => setDeleteKey(k.id)} className="p-1 text-[var(--text-tertiary)] hover:text-red-600 dark:hover:text-red-400" aria-label="Delete key">
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

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-4 max-w-sm w-full mx-4">
            <h2 className="text-sm font-medium text-[var(--text-primary)] mb-4">Create API Key</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Name</label>
                <input type="text" placeholder="e.g., Production API Key" className="w-full px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Environment</label>
                <select className="w-full px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Production</option>
                  <option>Staging</option>
                  <option>Development</option>
                  <option>CI/CD</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Expiration</label>
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
              <button onClick={() => setShowModal(false)} className="flex-1 px-2.5 py-1.5 border border-[var(--border-primary)] text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">Cancel</button>
              <button className="flex-1 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600">Create Key</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteKey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-4 max-w-sm w-full mx-4">
            <h2 className="text-sm font-medium text-[var(--text-primary)] mb-1">Delete API Key</h2>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              This action is irreversible and will immediately invalidate all requests using this key.
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setDeleteKey(null)} className="flex-1 px-2.5 py-1.5 border border-[var(--border-primary)] text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">Cancel</button>
              <button className="flex-1 px-2.5 py-1.5 bg-red-600 dark:bg-red-500 text-white text-xs font-medium hover:bg-red-700 dark:hover:bg-red-600">Delete Key</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
