import { useNavigation } from '../contexts/NavigationContext';
import {
  LayoutDashboard,
  CheckCircle2,
  Activity,
  Shield,
  Code,
  Key,
  Settings,
  User,
  Lock,
  Sliders,
  Database
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  domain?: string;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    label: 'CORE',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'verification', label: 'Verification', icon: CheckCircle2 },
      { id: 'activity', label: 'Activity', icon: Activity },
    ],
  },
  {
    label: 'TRUST',
    items: [
      { id: 'trust-profile', label: 'Trust', icon: Shield, domain: 'trust' },
    ],
  },
  {
    label: 'DEVELOPERS',
    items: [
      { id: 'developers-overview', label: 'Overview', icon: Code },
      { id: 'api-keys', label: 'API Keys', icon: Key },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'security', label: 'Security', icon: Lock },
      { id: 'preferences', label: 'Preferences', icon: Sliders },
    ],
  },
];

export default function Sidebar() {
  const { currentPage, currentDomain, setCurrentPage, setCurrentDomain } = useNavigation();

  const handleNavigation = (item: NavItem) => {
    setCurrentPage(item.id as any);
    if (item.domain) {
      setCurrentDomain(item.domain as any);
    } else {
      setCurrentDomain(null);
    }
  };

  return (
    <aside className="w-52 bg-[var(--bg-primary)] border-r border-[var(--border-primary)] flex flex-col h-screen">
      <div className="px-3 py-3 border-b border-[var(--border-primary)]">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-[var(--text-secondary)]" />
          <span className="font-medium text-sm text-[var(--text-primary)]">
            TrustPlane
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {navigation.map((section) => (
          <div key={section.label} className="mb-4">
            <div className="px-3 mb-1">
              <span className="text-[10px] font-medium text-[var(--text-tertiary)] tracking-wider uppercase">
                {section.label}
              </span>
            </div>
            <div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.domain ? currentDomain === item.domain : currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item)}
                    className={`
                      w-full flex items-center gap-2 px-3 py-1.5 text-sm
                      transition-colors
                      ${
                        isActive
                          ? 'bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[var(--text-primary)] font-normal border-l-2 border-blue-600 dark:border-blue-500'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] border-l-2 border-transparent'
                      }
                    `}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-3 py-2 border-t border-[var(--border-primary)]">
        <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)]">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <span>Production</span>
        </div>
      </div>
    </aside>
  );
}
