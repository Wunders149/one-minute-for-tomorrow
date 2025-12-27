'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, Globe, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/write', label: 'Write', icon: MessageCircle },
    { href: '/wall', label: 'Wall', icon: Globe },
  ];

  return (
    <motion.nav 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
    >
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex justify-around">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center py-3 px-6 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-gold-400 bg-gold-900/20 border border-gold-400/30' 
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;