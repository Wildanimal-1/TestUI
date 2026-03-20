import { useNavigation } from '../contexts/NavigationContext';

interface SecondaryNavItem {
  id: string;
  label: string;
}

interface SecondarySidebarProps {
  items: SecondaryNavItem[];
  title: string;
}

export default function SecondarySidebar({ items, title }: SecondarySidebarProps) {
  const { currentPage, setCurrentPage } = useNavigation();

  return (
    <aside className="w-48 bg-[var(--bg-primary)] border-r border-[var(--border-primary)] flex flex-col h-full">
      <div className="px-3 py-2 border-b border-[var(--border-primary)]">
        <h2 className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
          {title}
        </h2>
      </div>
      <nav className="flex-1 py-2">
        {items.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as any)}
              className={`
                w-full text-left px-3 py-1.5 text-xs
                transition-colors
                ${
                  isActive
                    ? 'bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[var(--text-primary)] font-medium border-l-2 border-blue-600 dark:border-blue-500'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] border-l-2 border-transparent'
                }
              `}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
