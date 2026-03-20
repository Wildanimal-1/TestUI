import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function MainLayout({ children, title, breadcrumbs }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-[var(--bg-secondary)]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} breadcrumbs={breadcrumbs} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-4 py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
