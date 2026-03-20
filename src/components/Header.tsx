import { useState } from 'react';
import { Search, Bell, Moon, Sun, ChevronDown, HelpCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSystem } from '../contexts/SystemContext';
import { useNavigation } from '../contexts/NavigationContext';

interface HeaderProps {
  title: string;
  breadcrumbs?: { label: string }[];
  onSignOut?: () => void;
}

export default function Header({ title, breadcrumbs, onSignOut }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { system } = useSystem();
  const { setCurrentPage, setCurrentDomain } = useNavigation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const hasAlerts = system.errorCount > 0 || system.warningCount > 0;

  const quickLinks = [
    { label: 'Dashboard', page: 'dashboard', domain: null },
    { label: 'Activity Log', page: 'activity', domain: null },
    { label: 'Trust Signals', page: 'trust-signals', domain: 'trust' },
    { label: 'API Keys', page: 'api-keys', domain: null },
    { label: 'Verification', page: 'verification', domain: null },
  ];

  const filteredLinks = searchQuery
    ? quickLinks.filter((l) => l.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : quickLinks;

  const handleQuickNav = (page: string, domain: string | null) => {
    setCurrentPage(page as any);
    setCurrentDomain(domain as any);
    setShowSearch(false);
    setSearchQuery('');
  };

  return (
    <header className="bg-[var(--bg-primary)] border-b border-[var(--border-primary)] sticky top-0 z-30 shrink-0">
      <div className="flex items-center justify-between px-4 h-10 pt-[26px] pb-[26px]">
        {/* Page title + breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="opacity-40">/</span>}
                  <span className={i === breadcrumbs.length - 1 ? 'text-[var(--text-secondary)]' : ''}>{crumb.label}</span>
                </span>
              ))}
              <span className="opacity-40">/</span>
            </nav>
          )}
          <h1 className="text-xs font-medium text-[var(--text-primary)] truncate">{title}</h1>
        </div>

        {/* Global utilities */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => { setShowSearch(!showSearch); setShowNotifications(false); setShowUserMenu(false); }}
              className="flex items-center gap-1.5 px-2 py-1 text-xs text-[var(--text-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-[var(--text-tertiary)] hidden sm:block">Search</span>
              <kbd className="hidden sm:inline-flex items-center px-1 text-[10px] font-mono border border-[var(--border-primary)] text-[var(--text-tertiary)] opacity-60">⌘K</kbd>
            </button>
            {showSearch && (
              <div className="absolute right-0 mt-1 w-72 bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-xl z-50">
                <div className="flex items-center gap-2 px-2.5 py-2 border-b border-[var(--border-primary)]">
                  <Search className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                  <input
                    type="text"
                    placeholder="Search or jump to..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="flex-1 text-xs bg-transparent text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none"
                  />
                </div>
                <div className="py-1">
                  <div className="px-2.5 py-1">
                    <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Quick Navigation</span>
                  </div>
                  {filteredLinks.map((link) => (
                    <button
                      key={link.page}
                      onClick={() => handleQuickNav(link.page, link.domain)}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                    >
                      <span className="flex-1 text-left">{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Help */}
          <button
            className="p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); setShowSearch(false); }}
              className="relative p-1.5 text-[var(--text-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              {hasAlerts && (
                <span className={`absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full ${system.errorCount > 0 ? 'bg-red-500' : 'bg-yellow-500'}`} />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-1 w-80 bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-xl z-50">
                <div className="px-3 py-2 border-b border-[var(--border-primary)] flex items-center justify-between">
                  <h3 className="text-xs font-medium text-[var(--text-primary)]">Notifications</h3>
                  <button className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline">Mark all read</button>
                </div>
                {system.warningCount > 0 && (
                  <div className="px-3 py-2 border-b border-[var(--border-primary)] bg-yellow-500/5 flex items-start gap-2">
                    <AlertCircle className="w-3 h-3 text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[var(--text-primary)] font-medium">Risk assessment flagged</p>
                      <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Unusual activity pattern detected</p>
                    </div>
                  </div>
                )}
                <div className="max-h-64 overflow-y-auto divide-y divide-[var(--border-secondary)]">
                  <div className="px-3 py-2 hover:bg-[var(--bg-secondary)] cursor-pointer">
                    <p className="text-xs text-[var(--text-primary)]">API key expires in 7 days</p>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">2h ago · pk_prod_abc123</p>
                  </div>
                  <div className="px-3 py-2 hover:bg-[var(--bg-secondary)] cursor-pointer">
                    <p className="text-xs text-[var(--text-primary)]">12 verifications pending review</p>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">5h ago</p>
                  </div>
                  <div className="px-3 py-2 hover:bg-[var(--bg-secondary)] cursor-pointer">
                    <p className="text-xs text-[var(--text-primary)]">Trust score updated to 94</p>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">1d ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-4 bg-[var(--border-primary)] mx-1" />

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); setShowSearch(false); }}
              className="flex items-center gap-1.5 px-1.5 py-1 hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <div className="w-5 h-5 bg-neutral-700 dark:bg-neutral-600 rounded-full flex items-center justify-center shrink-0">
                <span className="text-[9px] font-medium text-white">{system.account.initials}</span>
              </div>
              <span className="text-xs text-[var(--text-secondary)] hidden sm:block">{system.account.name}</span>
              <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-1 w-52 bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-xl z-50">
                <div className="px-3 py-2 border-b border-[var(--border-primary)]">
                  <p className="text-xs font-medium text-[var(--text-primary)]">{system.account.name}</p>
                  <p className="text-[10px] text-[var(--text-tertiary)] font-mono mt-0.5">{system.account.email}</p>
                </div>
                <div className="py-1">
                  {['Account Settings', 'Documentation', 'Support'].map((item) => (
                    <button key={item} className="w-full text-left px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
                      {item}
                    </button>
                  ))}
                </div>
                <div className="border-t border-[var(--border-primary)] py-1">
                  <button
                    onClick={() => { setShowUserMenu(false); onSignOut?.(); }}
                    className="w-full text-left px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-[var(--bg-secondary)]"
                  >
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
