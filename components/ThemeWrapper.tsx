'use client';

import { useEffect, useState } from 'react';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      
      // Midnight mode active between 00:00 and 05:00
      if (hour >= 0 && hour < 5) {
        document.body.classList.add('midnight-mode');
      } else {
        document.body.classList.remove('midnight-mode');
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return <main className="min-h-screen flex flex-col">{children}</main>;
}
