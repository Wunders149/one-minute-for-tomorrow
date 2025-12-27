'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
  showNotifications?: boolean;
}

const Header = ({ title = "One Minute for Tomorrow", showMenu = true, showNotifications = true }: HeaderProps) => {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10 py-4 px-6 flex items-center justify-between"
    >
      <div className="flex items-center">
        {showMenu && (
          <button className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors">
            <Menu className="w-5 h-5 text-white/80" />
          </button>
        )}
        <Link href="/" className="font-serif text-xl font-bold text-white/90 tracking-tight">
          {title}
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        {showNotifications && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
            <Bell className="w-5 h-5 text-white/80" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        )}
      </div>
    </motion.header>
  );
};

export default Header;