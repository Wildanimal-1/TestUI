import { AlertTriangle, AlertCircle, ChevronRight, Zap } from 'lucide-react';
import { useSystem } from '../contexts/SystemContext';

function ServiceDot({ status }: { status: 'ok' | 'degraded' | 'error' }) {
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full ${
        status === 'ok'
          ? 'bg-green-500'
          : status === 'degraded'
          ? 'bg-yellow-500'
          : 'bg-red-500'
      }`}
    />
  );
}

export default function ContextBar() {
  const { system } = useSystem();

  const envColors: Record<string, string> = {
    production: 'text-orange-600 dark:text-orange-400 bg-orange-500/8',
    staging: 'text-blue-600 dark:text-blue-400 bg-blue-500/8',
    development: 'text-green-600 dark:text-green-400 bg-green-500/8',
  };

  const allServicesOk =
    system.services.api === 'ok' &&
    system.services.verification === 'ok' &&
    system.services.database === 'ok';

  return (
    <div className="border-b border-[var(--border-primary)] flex items-center px-4 h-7 shrink-0 text-[11px] select-none opacity-[1] bg-[#ffffff00]">
      {/* Left: Account + Env scope */}
      <div className="flex items-center gap-0 text-[var(--text-tertiary)]">
        <span className="font-mono">{system.account.orgId}</span>
        <ChevronRight className="w-3 h-3 mx-1 opacity-40" />
        <span
          className={`px-1.5 py-0.5 font-medium uppercase tracking-wider text-[10px] ${envColors[system.environment]}`}
        >
          {system.environment}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-3.5 bg-[var(--border-primary)] mx-3" />

      {/* Center: Service health */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-[var(--text-tertiary)]">
          <ServiceDot status={system.services.api} />
          <span className={system.services.api !== 'ok' ? 'text-yellow-600 dark:text-yellow-400' : ''}>
            API
          </span>
        </span>
        <span className="flex items-center gap-1 text-[var(--text-tertiary)]">
          <ServiceDot status={system.services.verification} />
          <span className={system.services.verification !== 'ok' ? 'text-yellow-600 dark:text-yellow-400' : ''}>
            Verification
          </span>
        </span>
        <span className="flex items-center gap-1 text-[var(--text-tertiary)]">
          <ServiceDot status={system.services.database} />
          <span className={system.services.database !== 'ok' ? 'text-yellow-600 dark:text-yellow-400' : ''}>
            Database
          </span>
        </span>
        {allServicesOk && (
          <span className="text-[var(--text-tertiary)] opacity-60">All systems operational</span>
        )}
      </div>

      <div className="flex-1" />

      {/* Right: Alerts + Trust score */}
      <div className="flex items-center gap-3">
        {system.errorCount > 0 && (
          <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
            <AlertCircle className="w-3 h-3" />
            {system.errorCount} error{system.errorCount !== 1 ? 's' : ''}
          </span>
        )}
        {system.warningCount > 0 && (
          <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
            <AlertTriangle className="w-3 h-3" />
            {system.warningCount} warning{system.warningCount !== 1 ? 's' : ''}
          </span>
        )}
        {system.pendingCount > 0 && (
          <span className="text-[var(--text-tertiary)]">
            <span className="font-medium text-[var(--text-secondary)]">{system.pendingCount}</span> pending
          </span>
        )}

        <div className="w-px h-3.5 bg-[var(--border-primary)]" />

        <span className="flex items-center gap-1 text-[var(--text-tertiary)]">
          <Zap className="w-3 h-3 text-blue-500" />
          <span>Trust</span>
          <span className="font-semibold font-mono text-[var(--text-primary)] ml-0.5">{system.trustScore}</span>
          <span className="text-green-600 dark:text-green-400 ml-0.5">+{system.trustDelta}%</span>
        </span>
      </div>
    </div>
  );
}
