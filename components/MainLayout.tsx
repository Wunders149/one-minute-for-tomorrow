'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Navigation from './Navigation';

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showNavigation?: boolean;
  title?: string;
}

const MainLayout = ({ 
  children, 
  showHeader = true, 
  showNavigation = true,
  title = "One Minute for Tomorrow"
}: MainLayoutProps) => {
  const pathname = usePathname();
  
  // Don't show navigation on the writing page during the writing phase
  const isWritingPage = pathname === '/write';
  
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {showHeader && <Header title={title} />}
      
      <main className={`flex-1 ${showHeader ? 'pt-20' : ''} ${showNavigation && !isWritingPage ? 'pb-32' : 'pb-8'}`}>
        {children}
      </main>
      
      {showNavigation && !isWritingPage && <Navigation />}
    </div>
  );
};

export default MainLayout;