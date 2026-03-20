import { ThemeProvider } from './contexts/ThemeContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import TrustProfile from './pages/TrustProfile';
import Activity from './pages/Activity';
import APIKeys from './pages/APIKeys';
import PlaceholderPage from './pages/PlaceholderPage';

function AppContent() {
  const { currentPage } = useNavigation();

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
      breadcrumbs: [{ label: 'Trust' }, { label: 'Trust Profile' }],
      content: <TrustProfile />,
    },
    timeline: {
      title: 'Timeline',
      breadcrumbs: [{ label: 'Trust' }, { label: 'Timeline' }],
      content: <PlaceholderPage title="Trust Timeline" description="View historical trust score changes and events" />,
    },
    integrity: {
      title: 'Integrity',
      breadcrumbs: [{ label: 'Trust' }, { label: 'Integrity' }],
      content: <PlaceholderPage title="Integrity Monitoring" description="Monitor system integrity and security status" />,
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

  const config = pageConfig[currentPage] || pageConfig.dashboard;

  return (
    <MainLayout title={config.title} breadcrumbs={config.breadcrumbs}>
      {config.content}
    </MainLayout>
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
