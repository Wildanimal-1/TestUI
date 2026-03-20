import { useState } from 'react';
import { Search, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function Header({ title, breadcrumbs }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-[var(--bg-primary)] border-b border-[var(--border-primary)] sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3 flex-1">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-1.5">
                  {index > 0 && <span>/</span>}
                  <span className={index === breadcrumbs.length - 1 ? 'text-[var(--text-primary)]' : ''}>
                    {crumb.label}
                  </span>
                </span>
              ))}
            </nav>
          )}
          <h1 className="text-sm font-medium text-[var(--text-primary)]">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
            <input
              type="text"
              placeholder="Search..."
              className="w-56 pl-8 pr-2.5 py-1.5 text-xs bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
            />
          </div>

          <button
            onClick={toggleTheme}
            className="p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--bg-secondary)] rounded transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--bg-secondary)] rounded transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-1 w-72 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded shadow-xl">
                <div className="p-2.5 border-b border-[var(--border-primary)]">
                  <h3 className="text-xs font-medium text-[var(--text-primary)]">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-2.5 border-b border-[var(--border-secondary)] hover:bg-[var(--bg-secondary)] cursor-pointer">
                    <p className="text-xs text-[var(--text-primary)]">API key expires in 7 days</p>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">2 hours ago</p>
                  </div>
                  <div className="p-2.5 border-b border-[var(--border-secondary)] hover:bg-[var(--bg-secondary)] cursor-pointer">
                    <p className="text-xs text-[var(--text-primary)]">Trust score updated</p>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">5 hours ago</p>
                  </div>
                  <div className="p-2.5 hover:bg-[var(--bg-secondary)] cursor-pointer">
                    <p className="text-xs text-[var(--text-primary)]">New verification completed</p>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">1 day ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-1.5 px-1.5 py-1 hover:bg-[var(--bg-secondary)] rounded transition-colors"
            >
              <div className="w-6 h-6 bg-neutral-700 dark:bg-neutral-600 rounded-full flex items-center justify-center">
                <span className="text-[10px] font-medium text-white">JD</span>
              </div>
              <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-1 w-52 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded shadow-xl">
                <div className="p-2.5 border-b border-[var(--border-primary)]">
                  <p className="text-xs font-medium text-[var(--text-primary)]">John Doe</p>
                  <p className="text-[10px] text-[var(--text-tertiary)]">john@example.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full text-left px-2.5 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
                    Account Settings
                  </button>
                  <button className="w-full text-left px-2.5 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
                    Documentation
                  </button>
                  <button className="w-full text-left px-2.5 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
                    Support
                  </button>
                </div>
                <div className="border-t border-[var(--border-primary)] py-1">
                  <button className="w-full text-left px-2.5 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-[var(--bg-secondary)]">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
