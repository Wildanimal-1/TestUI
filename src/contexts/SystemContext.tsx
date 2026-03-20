import { createContext, useContext, useState, ReactNode } from 'react';

export type ServiceStatus = 'ok' | 'degraded' | 'error';

export interface SystemState {
  account: {
    name: string;
    email: string;
    initials: string;
    orgId: string;
  };
  environment: 'production' | 'staging' | 'development';
  trustScore: number;
  trustDelta: number;
  services: {
    api: ServiceStatus;
    verification: ServiceStatus;
    database: ServiceStatus;
  };
  pendingCount: number;
  warningCount: number;
  errorCount: number;
}

export interface DetailPanelState {
  open: boolean;
  title: string;
  subtitle?: string;
  content: ReactNode;
}

interface SystemContextType {
  system: SystemState;
  detailPanel: DetailPanelState;
  openDetailPanel: (title: string, content: ReactNode, subtitle?: string) => void;
  closeDetailPanel: () => void;
}

const SYSTEM_STATE: SystemState = {
  account: {
    name: 'John Doe',
    email: 'john@example.com',
    initials: 'JD',
    orgId: 'trust_profile_001',
  },
  environment: 'production',
  trustScore: 94,
  trustDelta: 2.1,
  services: {
    api: 'ok',
    verification: 'ok',
    database: 'ok',
  },
  pendingCount: 3,
  warningCount: 1,
  errorCount: 0,
};

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [detailPanel, setDetailPanel] = useState<DetailPanelState>({
    open: false,
    title: '',
    subtitle: undefined,
    content: null,
  });

  const openDetailPanel = (title: string, content: ReactNode, subtitle?: string) => {
    setDetailPanel({ open: true, title, subtitle, content });
  };

  const closeDetailPanel = () => {
    setDetailPanel((prev) => ({ ...prev, open: false }));
  };

  return (
    <SystemContext.Provider value={{ system: SYSTEM_STATE, detailPanel, openDetailPanel, closeDetailPanel }}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const ctx = useContext(SystemContext);
  if (!ctx) throw new Error('useSystem must be used within SystemProvider');
  return ctx;
}
