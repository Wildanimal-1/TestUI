import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Filter, RotateCw, Download, ChevronDown } from 'lucide-react';

export default function TrustSignals() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterWeight, setFilterWeight] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const signals = [
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

  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    if (selectedRows.size === signals.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(signals.map(s => s.id)));
    }
  };

  const filteredSignals = signals.filter(signal => {
    if (filterStatus !== 'all' && signal.status !== filterStatus) return false;
    if (filterWeight !== 'all' && signal.weight !== filterWeight) return false;
    return true;
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
          >
            <Filter className="w-3.5 h-3.5" />
            Filters
            <ChevronDown className="w-3 h-3" />
          </button>
          {showFilterMenu && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-xl z-10">
              <div className="p-2 space-y-2">
                <div>
                  <label className="block text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-1">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="verified">Verified</option>
                    <option value="warning">Warning</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide mb-1">
                    Weight
                  </label>
                  <select
                    value={filterWeight}
                    onChange={(e) => setFilterWeight(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Search signals..."
          className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <div className="flex-1"></div>

        {selectedRows.size > 0 && (
          <>
            <span className="text-xs text-[var(--text-tertiary)]">
              {selectedRows.size} selected
            </span>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
              <RotateCw className="w-3.5 h-3.5" />
              Verify Selected
            </button>
          </>
        )}

        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3.5 h-3.5" />
          Export
        </button>

        <button className="px-2.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600">
          Run All Verifications
        </button>
      </div>

      <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)]">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)]">
              <tr>
                <th className="px-3 py-2 text-left w-8">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === signals.length}
                    onChange={toggleAll}
                    className="w-3 h-3"
                  />
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Signal
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Provider
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Status
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Weight
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Score
                </th>
                <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Last Check
                </th>
                <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-primary)]">
              {filteredSignals.map((signal) => (
                <tr
                  key={signal.id}
                  className={`hover:bg-[var(--bg-secondary)] cursor-pointer ${
                    selectedRows.has(signal.id) ? 'bg-blue-500/5' : ''
                  }`}
                  onClick={() => toggleRow(signal.id)}
                >
                  <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(signal.id)}
                      onChange={() => toggleRow(signal.id)}
                      className="w-3 h-3"
                    />
                  </td>
                  <td className="px-3 py-2 text-[var(--text-primary)] font-medium">{signal.name}</td>
                  <td className="px-3 py-2 text-[var(--text-secondary)]">{signal.provider}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                        signal.status === 'verified'
                          ? 'bg-green-500/10 text-green-600 dark:text-green-500'
                          : signal.status === 'warning'
                          ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500'
                          : 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {signal.status === 'verified' ? (
                        <CheckCircle className="w-2.5 h-2.5" />
                      ) : signal.status === 'warning' ? (
                        <AlertTriangle className="w-2.5 h-2.5" />
                      ) : (
                        <XCircle className="w-2.5 h-2.5" />
                      )}
                      {signal.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wide ${
                        signal.weight === 'critical'
                          ? 'text-red-600 dark:text-red-500'
                          : signal.weight === 'high'
                          ? 'text-orange-600 dark:text-orange-500'
                          : signal.weight === 'medium'
                          ? 'text-blue-600 dark:text-blue-500'
                          : 'text-[var(--text-tertiary)]'
                      }`}
                    >
                      {signal.weight}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-[var(--text-primary)] font-mono">
                    {signal.score > 0 ? `+${signal.score}` : signal.score}
                  </td>
                  <td className="px-3 py-2 text-[var(--text-secondary)] font-mono">{signal.lastCheck}</td>
                  <td className="px-3 py-2 text-right" onClick={(e) => e.stopPropagation()}>
                    <button className="text-blue-600 dark:text-blue-400 hover:underline">
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Total Signals</span>
          </div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{signals.length}</div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Verified</span>
          </div>
          <div className="text-xl font-semibold text-green-600 dark:text-green-500 tabular-nums">
            {signals.filter(s => s.status === 'verified').length}
          </div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Pending</span>
          </div>
          <div className="text-xl font-semibold text-neutral-600 dark:text-neutral-400 tabular-nums">
            {signals.filter(s => s.status === 'pending').length}
          </div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Total Score</span>
          </div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">
            {signals.reduce((sum, s) => sum + s.score, 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
