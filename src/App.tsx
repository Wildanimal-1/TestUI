import { ThemeProvider } from './contexts/ThemeContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import Sidebar from './components/Sidebar';
import SecondarySidebar from './components/SecondarySidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import TrustProfile from './pages/TrustProfile';
import TrustSignals from './pages/TrustSignals';
import TrustTimeline from './pages/TrustTimeline';
import TrustIntegrity from './pages/TrustIntegrity';
import TrustCapabilities from './pages/TrustCapabilities';
import Activity from './pages/Activity';
import APIKeys from './pages/APIKeys';
import PlaceholderPage from './pages/PlaceholderPage';

function AppContent() {
  const { currentPage, currentDomain } = useNavigation();

  const pageConfig: Record<string, { title: string; breadcrumbs?: { label: string }[]; content: React.ReactNode }> = {
    dashboard: {
      title: 'Dashboard',
      content: <Dashboard />,
    },
    verification: {
      title: 'Verification',
      breadcrumbs: [{ label: 'Core' }, { label: 'Verification' }],
      content: <PlaceholderPage title="Verification Center" description="Manage and review verification requests" />,
    },
    activity: {
      title: 'Activity Log',
      breadcrumbs: [{ label: 'Core' }, { label: 'Activity' }],
      content: <Activity />,
    },
    'trust-profile': {
      title: 'Trust Profile',
      breadcrumbs: [{ label: 'Trust' }, { label: 'Profile' }],
      content: <TrustProfile />,
    },
    'trust-signals': {
      title: 'Trust Signals',
      breadcrumbs: [{ label: 'Trust' }, { label: 'Signals' }],
      content: <TrustSignals />,
    },
    'trust-timeline': {
      title: 'Trust Timeline',
      breadcrumbs: [{ label: 'Trust' }, { label: 'Timeline' }],
      content: <TrustTimeline />,
    },
    'trust-integrity': {
      title: 'Integrity',
      breadcrumbs: [{ label: 'Trust' }, { label: 'Integrity' }],
      content: <TrustIntegrity />,
    },
    'trust-capabilities': {
      title: 'Capabilities',
      breadcrumbs: [{ label: 'Trust' }, { label: 'Capabilities' }],
      content: <TrustCapabilities />,
    },
    'developers-overview': {
      title: 'Developer Overview',
      breadcrumbs: [{ label: 'Developers' }, { label: 'Overview' }],
      content: <PlaceholderPage title="Developer Overview" description="API documentation and integration guides" />,
    },
    'api-keys': {
      title: 'API Keys',
      breadcrumbs: [{ label: 'Developers' }, { label: 'API Keys' }],
      content: <APIKeys />,
    },
    settings: {
      title: 'Settings',
      breadcrumbs: [{ label: 'Developers' }, { label: 'Settings' }],
      content: <PlaceholderPage title="Developer Settings" description="Configure webhooks, rate limits, and integrations" />,
    },
    profile: {
      title: 'Profile',
      breadcrumbs: [{ label: 'Account' }, { label: 'Profile' }],
      content: <PlaceholderPage title="Account Profile" description="Manage your personal information and preferences" />,
    },
    security: {
      title: 'Security',
      breadcrumbs: [{ label: 'Account' }, { label: 'Security' }],
      content: <PlaceholderPage title="Security Settings" description="Configure two-factor authentication and security options" />,
    },
    preferences: {
      title: 'Preferences',
      breadcrumbs: [{ label: 'Account' }, { label: 'Preferences' }],
      content: <PlaceholderPage title="Preferences" description="Customize your experience and notification settings" />,
    },
    reviews: {
      title: 'Reviews',
      breadcrumbs: [{ label: 'Admin' }, { label: 'Reviews' }],
      content: <PlaceholderPage title="Admin Reviews" description="Review and approve pending administrative actions" />,
    },
    system: {
      title: 'System',
      breadcrumbs: [{ label: 'Admin' }, { label: 'System' }],
      content: <PlaceholderPage title="System Administration" description="Manage system-wide configuration and monitoring" />,
    },
  };

  const trustNavItems = [
    { id: 'trust-profile', label: 'Profile' },
    { id: 'trust-signals', label: 'Signals' },
    { id: 'trust-timeline', label: 'Timeline' },
    { id: 'trust-integrity', label: 'Integrity' },
    { id: 'trust-capabilities', label: 'Capabilities' },
  ];

  const config = pageConfig[currentPage] || pageConfig.dashboard;

  return (
    <div className="flex h-screen bg-[var(--bg-secondary)]">
      <Sidebar />
      {currentDomain === 'trust' && (
        <SecondarySidebar items={trustNavItems} title="Trust Management" />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={config.title} breadcrumbs={config.breadcrumbs} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-4 py-4">
            {config.content}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App;
