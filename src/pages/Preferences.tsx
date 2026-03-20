import { RotateCcw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <div className={`relative inline-flex h-4 w-7 flex-shrink-0 items-center border ${enabled ? 'bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500' : 'bg-[var(--bg-secondary)] border-[var(--border-primary)]'}`}>
      <span className={`inline-block h-2.5 w-2.5 bg-white transform transition-transform ${enabled ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
      <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">{title}</h2>
    </div>
  );
}

const NOTIFICATION_PREFS = [
  { label: 'Verification status changes', description: 'Notify when a verification completes or fails', enabled: false },
  { label: 'Trust score updates', description: 'Notify when your trust score changes', enabled: false },
  { label: 'API key expiry warnings', description: 'Notify 7 days before an API key expires', enabled: false },
  { label: 'Security events', description: 'Notify on new logins or suspicious activity', enabled: false },
  { label: 'System status changes', description: 'Notify when a service becomes degraded or restored', enabled: false },
];

const REGIONAL = [
  { label: 'Language', value: 'English (US)' },
  { label: 'Timezone', value: 'Not set' },
  { label: 'Date format', value: 'YYYY-MM-DD' },
  { label: 'Time format', value: '24-hour' },
];

export default function Preferences() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      {/* Command Bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-primary)]">
        <button
          disabled
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-[var(--border-primary)] text-[var(--text-secondary)] opacity-40 cursor-not-allowed"
        >
          <RotateCcw className="w-3 h-3" />
          Reset to defaults
        </button>
        <div className="flex-1" />
        <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Read-only environment</span>
      </div>

      {/* Display */}
      <div className="border border-[var(--border-primary)] mb-4">
        <SectionHeader title="Display" />
        <div className="divide-y divide-[var(--border-primary)]">
          <div className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
            <div>
              <div className="text-xs font-medium text-[var(--text-primary)]">Theme</div>
              <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Controls the visual appearance of the console</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--text-secondary)] capitalize">{theme}</span>
              <button
                onClick={toggleTheme}
                className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
              >
                Toggle
              </button>
            </div>
          </div>
          <div className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
            <div>
              <div className="text-xs font-medium text-[var(--text-primary)]">Information density</div>
              <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Controls table row height and whitespace</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--text-secondary)]">Compact</span>
              <button disabled className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] text-[var(--text-secondary)] opacity-50 cursor-not-allowed">
                Change
              </button>
            </div>
          </div>
          <div className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
            <div>
              <div className="text-xs font-medium text-[var(--text-primary)]">Sidebar behavior</div>
              <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Whether the sidebar collapses automatically</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--text-secondary)]">Always visible</span>
              <button disabled className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] text-[var(--text-secondary)] opacity-50 cursor-not-allowed">
                Change
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="border border-[var(--border-primary)] mb-4">
        <SectionHeader title="Email Notifications" />
        <div className="divide-y divide-[var(--border-primary)]">
          {NOTIFICATION_PREFS.map((pref) => (
            <div key={pref.label} className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
              <div>
                <div className="text-xs font-medium text-[var(--text-primary)]">{pref.label}</div>
                <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{pref.description}</div>
              </div>
              <Toggle enabled={pref.enabled} />
            </div>
          ))}
        </div>
      </div>

      {/* Regional */}
      <div className="border border-[var(--border-primary)]">
        <SectionHeader title="Regional Settings" />
        <div className="divide-y divide-[var(--border-primary)]">
          {REGIONAL.map((r) => (
            <div key={r.label} className="px-3 py-2.5 flex items-center justify-between hover:bg-[var(--bg-secondary)]">
              <span className="text-xs text-[var(--text-secondary)]">{r.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--text-primary)]">{r.value}</span>
                <button disabled className="px-2 py-1 text-xs border border-[var(--border-primary)] text-[var(--text-secondary)] opacity-50 cursor-not-allowed">
                  Change
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
