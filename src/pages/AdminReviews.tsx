import { RefreshCw, Download, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const QUEUE = [
  { id: 'rev_001', subject: 'Identity verification appeal', type: 'Appeal', submitted: '2024-03-20 09:14', priority: 'high', assignee: 'Unassigned', status: 'pending' },
  { id: 'rev_002', subject: 'Duplicate account flag', type: 'Flag', submitted: '2024-03-20 08:30', priority: 'medium', assignee: 'Unassigned', status: 'pending' },
  { id: 'rev_003', subject: 'Document re-submission', type: 'Resubmission', submitted: '2024-03-19 17:45', priority: 'low', assignee: 'Unassigned', status: 'pending' },
  { id: 'rev_004', subject: 'AML screening match', type: 'Compliance', submitted: '2024-03-19 14:20', priority: 'high', assignee: 'Unassigned', status: 'pending' },
  { id: 'rev_005', subject: 'Behavioral anomaly review', type: 'Flag', submitted: '2024-03-19 11:05', priority: 'medium', assignee: 'Unassigned', status: 'in-review' },
];

const DECISIONS = [
  { id: 'rev_998', subject: 'Risk score override request', decision: 'approved', reviewer: 'admin', timestamp: '2024-03-18 16:30' },
  { id: 'rev_997', subject: 'Phone number conflict', decision: 'rejected', reviewer: 'admin', timestamp: '2024-03-18 14:10' },
  { id: 'rev_996', subject: 'Identity mismatch — manual review', decision: 'approved', reviewer: 'admin', timestamp: '2024-03-17 11:55' },
  { id: 'rev_995', subject: 'Expired document appeal', decision: 'rejected', reviewer: 'admin', timestamp: '2024-03-16 09:40' },
];

const PRIORITY_COLORS: Record<string, string> = {
  high: 'bg-red-500/10 text-red-600 dark:text-red-500',
  medium: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500',
  low: 'bg-neutral-500/10 text-neutral-500 dark:text-neutral-400',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-neutral-500/10 text-neutral-500 dark:text-neutral-400',
  'in-review': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-500',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-500',
};

export default function AdminReviews() {
  const [typeFilter, setTypeFilter] = useState('all');

  const pendingCount = QUEUE.filter((r) => r.status === 'pending').length;
  const inReviewCount = QUEUE.filter((r) => r.status === 'in-review').length;
  const highPriorityCount = QUEUE.filter((r) => r.priority === 'high').length;

  const filtered = QUEUE.filter((r) => typeFilter === 'all' || r.type === typeFilter);

  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <RefreshCw className="w-3 h-3" />
          Refresh
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3 h-3" />
          Export
        </button>
        <div className="w-px h-4 bg-[var(--border-primary)] mx-1" />
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="appearance-none pl-2.5 pr-6 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="Appeal">Appeal</option>
            <option value="Flag">Flag</option>
            <option value="Resubmission">Resubmission</option>
            <option value="Compliance">Compliance</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
        </div>
        <div className="flex-1" />
        <span className="text-xs font-mono text-[var(--text-tertiary)]">{filtered.length} items</span>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-4 border border-[var(--border-primary)] divide-x divide-[var(--border-primary)] mb-4">
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Queue Total</div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{QUEUE.length}</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Pending</div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{pendingCount}</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">In Review</div>
          <div className="text-xl font-semibold text-blue-600 dark:text-blue-400 tabular-nums">{inReviewCount}</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">High Priority</div>
          <div className="text-xl font-semibold text-red-600 dark:text-red-500 tabular-nums">{highPriorityCount}</div>
        </div>
      </div>

      {/* Review Queue */}
      <div className="border border-[var(--border-primary)] mb-4">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Review Queue</h2>
        </div>
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Subject</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-28">Type</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20">Priority</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-20">Status</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-36">Submitted</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-[var(--bg-secondary)]">
                <td className="px-3 py-2.5">
                  <div className="text-[var(--text-primary)] font-medium">{r.subject}</div>
                  <div className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5">{r.id}</div>
                </td>
                <td className="px-3 py-2.5 text-[var(--text-secondary)]">{r.type}</td>
                <td className="px-3 py-2.5">
                  <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${PRIORITY_COLORS[r.priority]}`}>
                    {r.priority}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_COLORS[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-[var(--text-tertiary)]">{r.submitted}</td>
                <td className="px-3 py-2.5 text-right">
                  <button disabled className="text-xs text-blue-600 dark:text-blue-400 opacity-40 cursor-not-allowed">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Decisions */}
      <div className="border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Recent Decisions</h2>
        </div>
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Subject</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Decision</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-24">Reviewer</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-36">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {DECISIONS.map((d) => (
              <tr key={d.id} className="hover:bg-[var(--bg-secondary)]">
                <td className="px-3 py-2.5">
                  <div className="text-[var(--text-primary)]">{d.subject}</div>
                  <div className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5">{d.id}</div>
                </td>
                <td className="px-3 py-2.5">
                  <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_COLORS[d.decision]}`}>
                    {d.decision}
                  </span>
                </td>
                <td className="px-3 py-2.5 font-mono text-[var(--text-secondary)]">{d.reviewer}</td>
                <td className="px-3 py-2.5 text-right font-mono text-[var(--text-tertiary)]">{d.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
