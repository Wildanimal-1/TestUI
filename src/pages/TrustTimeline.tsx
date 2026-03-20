import { useState } from 'react';
import { TrendingUp, TrendingDown, Filter, Download, ChevronDown } from 'lucide-react';

export default function TrustTimeline() {
  const [timeRange, setTimeRange] = useState('30d');
  const [eventFilter, setEventFilter] = useState('all');

  const events = [
    { date: '2024-03-20', time: '14:32', type: 'score_increase', delta: '+2', score: 94, reason: 'Identity verification completed', severity: 'info' },
    { date: '2024-03-20', time: '12:05', type: 'warning', delta: '0', score: 92, reason: 'Risk assessment flagged unusual activity', severity: 'warning' },
    { date: '2024-03-18', time: '16:42', type: 'score_increase', delta: '+3', score: 92, reason: 'Document verification successful', severity: 'info' },
    { date: '2024-03-15', time: '09:20', type: 'score_decrease', delta: '-1', score: 89, reason: 'Failed phone verification attempt', severity: 'warning' },
    { date: '2024-03-12', time: '11:15', type: 'score_increase', delta: '+5', score: 90, reason: 'Biometric verification completed', severity: 'info' },
    { date: '2024-03-10', time: '08:30', type: 'score_increase', delta: '+2', score: 85, reason: 'Email verification confirmed', severity: 'info' },
    { date: '2024-03-08', time: '14:50', type: 'score_increase', delta: '+4', score: 83, reason: 'AML screening cleared', severity: 'info' },
    { date: '2024-03-05', time: '16:20', type: 'warning', delta: '0', score: 79, reason: 'Multiple login attempts detected', severity: 'warning' },
    { date: '2024-03-03', time: '10:10', type: 'score_increase', delta: '+6', score: 79, reason: 'Address verification completed', severity: 'info' },
    { date: '2024-03-01', time: '13:45', type: 'score_increase', delta: '+3', score: 73, reason: 'Phone verification successful', severity: 'info' },
  ];

  const filteredEvents = events.filter(event => {
    if (eventFilter === 'all') return true;
    if (eventFilter === 'increases') return event.type === 'score_increase';
    if (eventFilter === 'decreases') return event.type === 'score_decrease';
    if (eventFilter === 'warnings') return event.type === 'warning';
    return true;
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
          <option value="all">All time</option>
        </select>

        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
          className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Events</option>
          <option value="increases">Score Increases</option>
          <option value="decreases">Score Decreases</option>
          <option value="warnings">Warnings</option>
        </select>

        <div className="flex-1"></div>

        <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
          <Download className="w-3.5 h-3.5" />
          Export Timeline
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Current Score</span>
            <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-500" />
          </div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">94</div>
          <div className="text-xs text-green-600 dark:text-green-500 mt-1">+21 since start</div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Total Events</span>
          </div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">{events.length}</div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Increases</span>
          </div>
          <div className="text-xl font-semibold text-green-600 dark:text-green-500 tabular-nums">
            {events.filter(e => e.type === 'score_increase').length}
          </div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Warnings</span>
          </div>
          <div className="text-xl font-semibold text-yellow-600 dark:text-yellow-500 tabular-nums">
            {events.filter(e => e.type === 'warning').length}
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)]">
        <div className="px-3 py-2 border-b border-[var(--border-primary)]">
          <h2 className="text-xs font-medium text-[var(--text-primary)] uppercase tracking-wide">Timeline Events</h2>
        </div>
        <div className="divide-y divide-[var(--border-primary)]">
          {filteredEvents.map((event, index) => (
            <div key={index} className="px-3 py-2.5 flex items-start gap-3 hover:bg-[var(--bg-secondary)]">
              <div className="flex flex-col items-center">
                <div
                  className={`w-2 h-2 rounded-full ${
                    event.type === 'score_increase'
                      ? 'bg-green-600 dark:bg-green-500'
                      : event.type === 'score_decrease'
                      ? 'bg-red-600 dark:bg-red-500'
                      : 'bg-yellow-600 dark:bg-yellow-500'
                  }`}
                ></div>
                {index < filteredEvents.length - 1 && (
                  <div className="w-px h-full bg-[var(--border-primary)] mt-1"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[var(--text-primary)]">{event.reason}</span>
                      {event.type === 'score_increase' && (
                        <span className="inline-flex items-center gap-0.5 text-xs font-mono text-green-600 dark:text-green-500">
                          <TrendingUp className="w-3 h-3" />
                          {event.delta}
                        </span>
                      )}
                      {event.type === 'score_decrease' && (
                        <span className="inline-flex items-center gap-0.5 text-xs font-mono text-red-600 dark:text-red-500">
                          <TrendingDown className="w-3 h-3" />
                          {event.delta}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                      <span className="font-mono">{event.date}</span>
                      <span className="font-mono">{event.time}</span>
                      <span className="font-mono">Score: {event.score}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
