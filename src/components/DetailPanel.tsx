import { X } from 'lucide-react';
import { useSystem } from '../contexts/SystemContext';

export default function DetailPanel() {
  const { detailPanel, closeDetailPanel } = useSystem();

  return (
    <>
      {/* Backdrop */}
      {detailPanel.open && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeDetailPanel}
        />
      )}

      {/* Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[440px] z-50
          bg-[var(--bg-primary)] border-l border-[var(--border-primary)]
          flex flex-col
          transition-transform duration-200 ease-out
          ${detailPanel.open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Panel Header */}
        <div className="flex items-start justify-between px-4 py-3 border-b border-[var(--border-primary)] shrink-0">
          <div>
            <h2 className="text-sm font-medium text-[var(--text-primary)]">{detailPanel.title}</h2>
            {detailPanel.subtitle && (
              <p className="text-xs text-[var(--text-tertiary)] font-mono mt-0.5">{detailPanel.subtitle}</p>
            )}
          </div>
          <button
            onClick={closeDetailPanel}
            className="p-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors ml-4 shrink-0"
            aria-label="Close panel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto">
          {detailPanel.content}
        </div>
      </div>
    </>
  );
}
