import { createContext, useContext, useState, ReactNode } from 'react';

type DomainId = 'core' | 'trust' | 'developers' | 'account' | 'admin';

type PageId =
  | 'dashboard'
  | 'verification'
  | 'activity'
  | 'trust-profile'
  | 'trust-signals'
  | 'trust-timeline'
  | 'trust-integrity'
  | 'trust-capabilities'
  | 'developers-overview'
  | 'api-keys'
  | 'settings'
  | 'profile'
  | 'security'
  | 'preferences'
  | 'reviews'
  | 'system';

interface NavigationContextType {
  currentPage: PageId;
  currentDomain: DomainId | null;
  setCurrentPage: (page: PageId) => void;
  setCurrentDomain: (domain: DomainId | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [currentDomain, setCurrentDomain] = useState<DomainId | null>(null);

  return (
    <NavigationContext.Provider value={{ currentPage, currentDomain, setCurrentPage, setCurrentDomain }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
