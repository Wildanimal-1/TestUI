import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, RotateCw, Download, ChevronDown } from 'lucide-react';

const SIGNALS = [
  { id: 's1', name: 'Identity Verification', status: 'verified', score: 25, lastCheck: '2024-03-20 14:32', weight: 'high', provider: 'Onfido' },
  { id: 's2', name: 'Email Verification', status: 'verified', score: 15, lastCheck: '2024-03-19 08:15', weight: 'medium', provider: 'Internal' },
  { id: 's3', name: 'Phone Verification', status: 'verified', score: 15, lastCheck: '2024-03-19 08:16', weight: 'medium', provider: 'Twilio' },
  { id: 's4', name: 'Address Verification', status: 'pending', score: 0, lastCheck: 'Never', weight: 'low', provider: 'USPS' },
  { id: 's5', name: 'Document Verification', status: 'verified', score: 20, lastCheck: '2024-03-18 16:42', weight: 'high', provider: 'Onfido' },
  { id: 's6', name: 'Behavioral Analysis', status: 'verified', score: 19, lastCheck: '2024-03-20 14:28', weight: 'high', provider: 'Internal' },
  { id: 's7', name: 'Risk Assessment', status: 'warning', score: 0, lastCheck: '2024-03-20 12:05', weight: 'critical', provider: 'Internal' },
  { id: 's8', name: 'Biometric Match', status: 'verified', score: 25, lastCheck: '2024-03-20 14:32', weight: 'critical', provider: 'Onfido' },
  { id: 's9', name: 'Device Fingerprint', status: 'verified', score: 10, lastCheck: '2024-03-20 14:30', weight: 'low', provider: 'Internal' },
  { id: 's10', name: 'AML Screening', status: 'verified', score: 20, lastCheck: '2024-03-20 09:12', weight: 'high', provider: 'ComplyAdvantage' },
];

const WEIGHT_COLORS: Record<string, string> = {
  critical: 'text-red-600 dark:text-red-500',
  high: 'text-orange-600 dark:text-orange-500',
  medium: 'text-blue-600 dark:text-blue-500',
  low: 'text-[var(--text-tertiary)]',
};

const STATUS_ICON = {
  verified: <CheckCircle className="w-2.5 h-2.5" />,
  warning: <AlertTriangle className="w-2.5 h-2.5" />,
  pending: <XCircle className="w-2.5 h-2.5" />,
};

const STATUS_CLASS: Record<string, string> = {
  verified: 'bg-green-500/10 text-green-600 dark:text-green-500',
  warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500',
  pending: 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400',
};

export default function TrustSignals() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterWeight, setFilterWeight] = useState('all');

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedRows(next);
  };

  const toggleAll = () => {
    setSelectedRows(selectedRows.size === filtered.length ? new Set() : new Set(filtered.map((s) => s.id)));
  };

  const filtered = SIGNALS.filter((s) => {
    if (filterStatus !== 'all' && s.status !== filterStatus) return false;
    if (filterWeight !== 'all' && s.weight !== filterWeight) return false;
    return true;
  });

  const totalScore = SIGNALS.reduce((sum, s) => sum + s.score, 0);
  const verifiedCount = SIGNALS.filter((s) => s.status === 'verified').length;
  const pendingCount = SIGNALS.filter((s) => s.status === 'pending').length;
  const warningCount = SIGNALS.filter((s) => s.status === 'warning').length;

  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600">
          <RotateCw className="w-3 h-3" />
          Run All
        </button>
        {selectedRows.size > 0 && (
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
            <RotateCw className="w-3 h-3" />
            Verify {selectedRows.size} selected
          </button>
        )}
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3 h-3" />
          Export
        </button>
        <div className="w-px h-4 bg-[var(--border-primary)] mx-1" />
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none pl-2.5 pr-6 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="warning">Warning</option>
            <option value="pending">Pending</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={filterWeight}
            onChange={(e) => setFilterWeight(e.target.value)}
            className="appearance-none pl-2.5 pr-6 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Weights</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
        </div>
        <div className="flex-1" />
        <span className="text-xs font-mono text-[var(--text-tertiary)]">{filtered.length} signals</span>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-4 border border-[var(--border-primary)] divide-x divide-[var(--border-primary)] mb-4">
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Total Signals</div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{SIGNALS.length}</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Verified</div>
          <div className="text-xl font-semibold text-green-600 dark:text-green-500 tabular-nums">{verifiedCount}</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Needs Attention</div>
          <div className="text-xl font-semibold tabular-nums">
            <span className={warningCount > 0 ? 'text-yellow-600 dark:text-yellow-500' : 'text-[var(--text-tertiary)]'}>{warningCount + pendingCount}</span>
          </div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Total Score</div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{totalScore}</div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[var(--border-primary)]">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)]">
              <tr>
                <th className="px-3 py-2 w-8">
                  <input type="checkbox" checked={selectedRows.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="w-3 h-3" />
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Signal</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Provider</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Status</th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20">Weight</th>
                <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-16">Score</th>
                <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-36">Last Check</th>
                <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-16">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-primary)]">
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className={`cursor-pointer hover:bg-[var(--bg-secondary)] ${selectedRows.has(s.id) ? 'bg-blue-500/5' : ''}`}
                  onClick={() => toggleRow(s.id)}
                >
                  <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={selectedRows.has(s.id)} onChange={() => toggleRow(s.id)} className="w-3 h-3" />
                  </td>
                  <td className="px-3 py-2 text-[var(--text-primary)] font-medium">{s.name}</td>
                  <td className="px-3 py-2 text-[var(--text-secondary)]">{s.provider}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_CLASS[s.status] ?? ''}`}>
                      {STATUS_ICON[s.status as keyof typeof STATUS_ICON]}
                      {s.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`text-[10px] font-medium uppercase tracking-wide ${WEIGHT_COLORS[s.weight] ?? ''}`}>{s.weight}</span>
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-[var(--text-primary)]">
                    {s.score > 0 ? `+${s.score}` : s.score}
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-[var(--text-tertiary)]">{s.lastCheck}</td>
                  <td className="px-3 py-2 text-right" onClick={(e) => e.stopPropagation()}>
                    <button className="text-blue-600 dark:text-blue-400 hover:underline">Verify</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
