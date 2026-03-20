import { useNavigation } from '../contexts/NavigationContext';
import {
  LayoutDashboard,
  CheckCircle2,
  Activity,
  Shield,
  Clock,
  FileCheck,
  Code,
  Key,
  Settings,
  User,
  Lock,
  Sliders,
  UserCog,
  Database
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
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
      { id: 'trust-profile', label: 'Trust Profile', icon: Shield },
      { id: 'timeline', label: 'Timeline', icon: Clock },
      { id: 'integrity', label: 'Integrity', icon: FileCheck },
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
  const { currentPage, setCurrentPage } = useNavigation();

  return (
    <aside className="w-56 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen">
      <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600 dark:text-blue-500" />
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            TrustPlane
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {navigation.map((section) => (
          <div key={section.label} className="mb-6">
            <div className="px-4 mb-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
                {section.label}
              </span>
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as any)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2 text-sm
                      transition-colors duration-150
                      ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Production</span>
        </div>
      </div>
    </aside>
  );
}
