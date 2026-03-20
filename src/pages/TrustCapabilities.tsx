import { useState } from 'react';
import { CheckCircle, Lock, Search, ChevronDown, Download } from 'lucide-react';

const CAPABILITIES = [
  { id: 'cap1', name: 'API Access', category: 'Core', enabled: true, required: 70, current: 94, description: 'Full REST and GraphQL API access with rate limits' },
  { id: 'cap2', name: 'Batch Operations', category: 'Core', enabled: true, required: 75, current: 94, description: 'Process up to 1,000 operations per batch' },
  { id: 'cap3', name: 'Webhooks', category: 'Integration', enabled: true, required: 80, current: 94, description: 'Real-time event notifications to your endpoints' },
  { id: 'cap4', name: 'Advanced Analytics', category: 'Analytics', enabled: false, required: 95, current: 94, description: 'Deep insights into trust metrics and trends' },
  { id: 'cap5', name: 'Priority Support', category: 'Support', enabled: true, required: 85, current: 94, description: 'Enhanced SLA with 1-hour response time' },
  { id: 'cap6', name: 'Custom Signals', category: 'Trust', enabled: true, required: 90, current: 94, description: 'Define and integrate custom trust signals' },
  { id: 'cap7', name: 'White-label Options', category: 'Enterprise', enabled: false, required: 98, current: 94, description: 'Custom branding and domain configuration' },
  { id: 'cap8', name: 'Compliance Reports', category: 'Compliance', enabled: true, required: 85, current: 94, description: 'Automated compliance and audit reporting' },
];

export default function TrustCapabilities() {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  const categories = Array.from(new Set(CAPABILITIES.map((c) => c.category)));

  const filtered = CAPABILITIES.filter((c) => {
    if (filterCat !== 'all' && c.category !== filterCat) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const enabledCount = CAPABILITIES.filter((c) => c.enabled).length;
  const lockedCount = CAPABILITIES.filter((c) => !c.enabled).length;
  const nextUnlock = Math.min(...CAPABILITIES.filter((c) => !c.enabled).map((c) => c.required));

  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <div className="relative">
          <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search capabilities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-6 pr-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-1 focus:ring-blue-500 w-44"
          />
        </div>
        <div className="relative">
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="appearance-none pl-2.5 pr-6 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
        </div>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3 h-3" />
          Export
        </button>
        <div className="flex-1" />
        <span className="text-[10px] text-[var(--text-tertiary)]">Trust Score:</span>
        <span className="text-[10px] font-mono font-medium text-[var(--text-primary)]">94</span>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-4 border border-[var(--border-primary)] divide-x divide-[var(--border-primary)] mb-4">
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Total</div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{CAPABILITIES.length}</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Enabled</div>
          <div className="text-xl font-semibold text-green-600 dark:text-green-500 tabular-nums">{enabledCount}</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Locked</div>
          <div className="text-xl font-semibold text-neutral-500 dark:text-neutral-400 tabular-nums">{lockedCount}</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Next Unlock at</div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{nextUnlock}</div>
        </div>
      </div>

      {/* Capabilities Table */}
      <div className="border border-[var(--border-primary)]">
        <table className="w-full text-xs">
          <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-8" />
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Capability</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Category</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Req. Score</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Status</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {filtered.map((cap) => (
              <tr key={cap.id} className={`hover:bg-[var(--bg-secondary)] ${!cap.enabled ? 'opacity-70' : ''}`}>
                <td className="px-3 py-2.5">
                  {cap.enabled
                    ? <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
                    : <Lock className="w-3.5 h-3.5 text-neutral-400" />
                  }
                </td>
                <td className="px-3 py-2.5">
                  <div className="text-[var(--text-primary)] font-medium">{cap.name}</div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{cap.description}</div>
                </td>
                <td className="px-3 py-2.5 text-[var(--text-tertiary)] uppercase tracking-wide text-[10px]">{cap.category}</td>
                <td className="px-3 py-2.5 text-right font-mono text-[var(--text-secondary)]">{cap.required}</td>
                <td className="px-3 py-2.5 text-right">
                  <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                    cap.enabled
                      ? 'bg-green-500/10 text-green-600 dark:text-green-500'
                      : 'bg-neutral-500/10 text-neutral-500 dark:text-neutral-400'
                  }`}>
                    {cap.enabled ? 'Active' : 'Locked'}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right">
                  {!cap.enabled && (
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Unlock</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
