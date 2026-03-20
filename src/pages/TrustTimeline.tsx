import { useState } from 'react';
import { TrendingUp, TrendingDown, Download, ChevronDown } from 'lucide-react';

const EVENTS = [
  { date: '2024-03-20', time: '14:32', type: 'score_increase', delta: '+2', score: 94, reason: 'Identity verification completed' },
  { date: '2024-03-20', time: '12:05', type: 'warning', delta: '0', score: 92, reason: 'Risk assessment flagged unusual activity' },
  { date: '2024-03-18', time: '16:42', type: 'score_increase', delta: '+3', score: 92, reason: 'Document verification successful' },
  { date: '2024-03-15', time: '09:20', type: 'score_decrease', delta: '-1', score: 89, reason: 'Failed phone verification attempt' },
  { date: '2024-03-12', time: '11:15', type: 'score_increase', delta: '+5', score: 90, reason: 'Biometric verification completed' },
  { date: '2024-03-10', time: '08:30', type: 'score_increase', delta: '+2', score: 85, reason: 'Email verification confirmed' },
  { date: '2024-03-08', time: '14:50', type: 'score_increase', delta: '+4', score: 83, reason: 'AML screening cleared' },
  { date: '2024-03-05', time: '16:20', type: 'warning', delta: '0', score: 79, reason: 'Multiple login attempts detected' },
  { date: '2024-03-03', time: '10:10', type: 'score_increase', delta: '+6', score: 79, reason: 'Address verification completed' },
  { date: '2024-03-01', time: '13:45', type: 'score_increase', delta: '+3', score: 73, reason: 'Phone verification successful' },
];

export default function TrustTimeline() {
  const [timeRange, setTimeRange] = useState('30d');
  const [eventFilter, setEventFilter] = useState('all');

  const filtered = EVENTS.filter((e) => {
    if (eventFilter === 'increases') return e.type === 'score_increase';
    if (eventFilter === 'decreases') return e.type === 'score_decrease';
    if (eventFilter === 'warnings') return e.type === 'warning';
    return true;
  });

  const increases = EVENTS.filter((e) => e.type === 'score_increase').length;
  const warnings = EVENTS.filter((e) => e.type === 'warning').length;

  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3 h-3" />
          Export Timeline
        </button>
        <div className="w-px h-4 bg-[var(--border-primary)] mx-1" />
        <div className="relative">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="appearance-none pl-2.5 pr-6 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
            <option value="all">All time</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="appearance-none pl-2.5 pr-6 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Events</option>
            <option value="increases">Increases</option>
            <option value="decreases">Decreases</option>
            <option value="warnings">Warnings</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
        </div>
        <div className="flex-1" />
        <span className="text-xs font-mono text-[var(--text-tertiary)]">{filtered.length} events</span>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-4 border border-[var(--border-primary)] divide-x divide-[var(--border-primary)] mb-4">
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Current Score</div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">94</span>
            <span className="text-xs text-green-600 dark:text-green-500">+21 since start</span>
          </div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Total Events</div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{EVENTS.length}</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Increases</div>
          <div className="text-xl font-semibold text-green-600 dark:text-green-500 tabular-nums">{increases}</div>
        </div>
        <div className="px-4 py-2.5">
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Warnings</div>
          <div className="text-xl font-semibold text-yellow-600 dark:text-yellow-500 tabular-nums">{warnings}</div>
        </div>
      </div>

      {/* Timeline Table */}
      <div className="border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Timeline Events</h2>
        </div>
        <table className="w-full text-xs">
          <thead className="border-b border-[var(--border-primary)]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-28">Date</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-16">Time</th>
              <th className="px-3 py-2 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Event</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-16">Delta</th>
              <th className="px-3 py-2 text-right font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-16">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)]">
            {filtered.map((e, i) => (
              <tr key={i} className="hover:bg-[var(--bg-secondary)] cursor-pointer">
                <td className="px-3 py-2 font-mono text-[var(--text-tertiary)]">{e.date}</td>
                <td className="px-3 py-2 font-mono text-[var(--text-tertiary)]">{e.time}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 flex-shrink-0 ${
                      e.type === 'score_increase' ? 'bg-green-500' : e.type === 'score_decrease' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <span className="text-[var(--text-primary)]">{e.reason}</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-right font-mono">
                  {e.type === 'score_increase' && (
                    <span className="text-green-600 dark:text-green-500 flex items-center justify-end gap-0.5">
                      <TrendingUp className="w-3 h-3" />{e.delta}
                    </span>
                  )}
                  {e.type === 'score_decrease' && (
                    <span className="text-red-600 dark:text-red-500 flex items-center justify-end gap-0.5">
                      <TrendingDown className="w-3 h-3" />{e.delta}
                    </span>
                  )}
                  {e.type === 'warning' && <span className="text-[var(--text-tertiary)]">—</span>}
                </td>
                <td className="px-3 py-2 text-right font-mono text-[var(--text-primary)]">{e.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
