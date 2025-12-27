'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  _id: string;
  content: string;
  createdAt: string;
  timezone?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function WallPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/wall', { cache: 'no-store' });
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Failed to load wall:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex-1 flex flex-col p-6 md:p-12 relative min-h-screen">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex justify-between items-start mb-20 md:mb-32 relative z-10"
      >
        <Link 
          href="/"
          className="group flex items-center gap-3 text-white/30 hover:text-gold-100 transition-colors duration-500"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-[10px] uppercase tracking-[0.2em]">Home</span>
        </Link>

        <div className="text-right">
          <h1 className="font-serif text-3xl md:text-5xl text-white/90 mb-3 tracking-tight">
            Wall of Tomorrow
          </h1>
          <div className="flex items-center justify-end gap-3 text-white/30 text-[10px] tracking-[0.2em] uppercase">
            <span>Voices from the void</span>
            <button onClick={fetchMessages} className="hover:text-white transition-colors p-1">
               <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12 pb-32 max-w-8xl mx-auto w-full"
      >
        {messages.map((msg) => (
          <motion.div 
            key={msg._id} 
            variants={itemVariants}
            className="break-inside-avoid relative group"
          >
            <div className="relative p-8 md:p-10 transition-all duration-1000 group-hover:bg-white/[0.02] rounded-sm border-l border-white/5 hover:border-gold-400/30">
              
              {/* Subtle Quotes */}
              <span className="absolute top-6 left-4 text-4xl font-serif text-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">“</span>

              <p className="font-serif text-xl md:text-2xl leading-[1.6] text-white/70 group-hover:text-white/90 transition-colors duration-700 whitespace-pre-wrap">
                {msg.content}
              </p>
              
              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4 group-hover:border-white/10 transition-colors duration-700">
                <div className="flex items-center gap-2">
                   <Star className="w-2 h-2 text-gold-400 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                   <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 group-hover:text-gold-100/50 transition-colors">
                     {msg.timezone ? msg.timezone.split('/')[1]?.replace('_', ' ') : 'Unknown'}
                   </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/10 group-hover:text-white/30 transition-colors">
                   {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
        
        {!loading && messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="col-span-full flex flex-col items-center justify-center py-32 text-center opacity-50"
          >
            <p className="font-serif text-3xl text-white/40 italic mb-4">The silence is loud.</p>
            <Link href="/write" className="text-gold-400/60 hover:text-gold-400 text-xs tracking-[0.2em] uppercase transition-colors">
              Be the first to break it
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
