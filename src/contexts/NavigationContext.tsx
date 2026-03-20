import { createContext, useContext, useState, ReactNode } from 'react';

type PageId =
  | 'dashboard'
  | 'verification'
  | 'activity'
  | 'trust-profile'
  | 'timeline'
  | 'integrity'
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
  setCurrentPage: (page: PageId) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
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
