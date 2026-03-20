import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { SystemProvider } from './contexts/SystemContext';
import Sidebar from './components/Sidebar';
import SecondarySidebar from './components/SecondarySidebar';
import Header from './components/Header';
import ContextBar from './components/ContextBar';
import DetailPanel from './components/DetailPanel';
import AuthPages from './pages/AuthPages';
import Dashboard from './pages/Dashboard';
import TrustProfile from './pages/TrustProfile';
import TrustSignals from './pages/TrustSignals';
import TrustTimeline from './pages/TrustTimeline';
import TrustIntegrity from './pages/TrustIntegrity';
import TrustCapabilities from './pages/TrustCapabilities';
import Activity from './pages/Activity';
import APIKeys from './pages/APIKeys';
import Verification from './pages/Verification';
import VerificationDetail from './pages/VerificationDetail';
import PublicProfile from './pages/PublicProfile';
import PlaceholderPage from './pages/PlaceholderPage';

function AppContent({ onSignOut }: { onSignOut: () => void }) {
  const { currentPage, currentDomain } = useNavigation();

  const pageConfig: Record<string, { title: string; breadcrumbs?: { label: string }[]; content: React.ReactNode }> = {
    dashboard: {
      title: 'Dashboard',
      content: <Dashboard />,
    },
    verification: {
      title: 'Verification',
      breadcrumbs: [{ label: 'Core' }, { label: 'Verification' }],
      content: <Verification />,
    },
    'verification-email': {
      title: 'Email Verification',
      breadcrumbs: [{ label: 'Core' }, { label: 'Verification' }, { label: 'Email' }],
      content: <VerificationDetail type="email" />,
    },
    'verification-phone': {
      title: 'Phone Verification',
      breadcrumbs: [{ label: 'Core' }, { label: 'Verification' }, { label: 'Phone' }],
      content: <VerificationDetail type="phone" />,
    },
    'verification-identity': {
      title: 'Identity Verification',
      breadcrumbs: [{ label: 'Core' }, { label: 'Verification' }, { label: 'Identity' }],
      content: <VerificationDetail type="identity" />,
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
    'public-profile': {
      title: 'Public Profile',
      breadcrumbs: [{ label: 'Account' }, { label: 'Public Profile' }],
      content: <PublicProfile />,
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

  const verificationNavItems = [
    { id: 'verification', label: 'Overview' },
    { id: 'verification-email', label: 'Email' },
    { id: 'verification-phone', label: 'Phone' },
    { id: 'verification-identity', label: 'Identity' },
  ];

  const config = pageConfig[currentPage] || pageConfig.dashboard;

  return (
    <div className="flex h-screen bg-[var(--bg-secondary)] overflow-hidden">
      <Sidebar />
      {currentDomain === 'trust' && (
        <SecondarySidebar items={trustNavItems} title="Trust Management" />
      )}
      {currentDomain === 'verification' && (
        <SecondarySidebar items={verificationNavItems} title="Verification" />
      )}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header title={config.title} breadcrumbs={config.breadcrumbs} onSignOut={onSignOut} />
        <ContextBar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-4 py-4">
            {config.content}
          </div>
        </main>
      </div>
      <DetailPanel />
    </div>
  );
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <ThemeProvider>
      {authenticated ? (
        <SystemProvider>
          <NavigationProvider>
            <AppContent onSignOut={() => setAuthenticated(false)} />
          </NavigationProvider>
        </SystemProvider>
      ) : (
        <AuthPages onEnterConsole={() => setAuthenticated(true)} />
      )}
    </ThemeProvider>
  );
}

export default App;
