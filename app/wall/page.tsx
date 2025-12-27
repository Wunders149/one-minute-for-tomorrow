'use client';

import { useEffect, useState } from 'react';
import FadeIn from '@/components/FadeIn';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  _id: string;
  content: string;
  createdAt: string;
  timezone?: string;
}

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
      <header className="flex justify-between items-start mb-16 md:mb-24 relative z-10">
        <Link 
          href="/"
          className="group flex items-center gap-2 text-white/30 hover:text-gold-100 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-xs uppercase tracking-widest">Home</span>
        </Link>

        <div className="text-right">
          <h1 className="font-serif text-2xl md:text-4xl text-white/90 mb-2">
            Wall of Tomorrow
          </h1>
          <div className="flex items-center justify-end gap-2 text-white/30 text-xs tracking-wider">
            <span>Voices from the void</span>
            <button onClick={fetchMessages} className="hover:text-white transition-colors p-1">
               <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 pb-20 max-w-7xl mx-auto w-full">
        {messages.map((msg, index) => (
          <FadeIn key={msg._id} delay={index * 0.05} className="break-inside-avoid mb-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative bg-white/[0.02] border border-white/[0.05] p-8 rounded-sm hover:bg-white/[0.04] hover:border-gold-400/20 transition-all duration-700 group"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-gold-400/50 transition-colors duration-700" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-gold-400/50 transition-colors duration-700" />

              <p className="font-serif text-lg md:text-xl leading-relaxed text-white/80 mb-6 whitespace-pre-wrap">
                {msg.content}
              </p>
              
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-white/10 group-hover:bg-gold-400/30 transition-colors" />
                <span className="text-[10px] uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
                  {msg.timezone ? msg.timezone.split('/')[1]?.replace('_', ' ') : 'Anonymous'}
                </span>
              </div>
            </motion.div>
          </FadeIn>
        ))}
        
        {!loading && messages.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center opacity-50">
            <p className="font-serif text-2xl text-white/40 italic">The silence is loud.</p>
            <Link href="/write" className="mt-4 text-gold-400 underline underline-offset-4 text-sm">
              Break it.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}