'use client';

import { useEffect, useState } from 'react';
import FadeIn from '@/components/FadeIn';
import Link from 'next/link';

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
    <div className="flex-1 flex flex-col p-6 md:p-12 relative">
      <header className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-serif text-3xl md:text-5xl text-white/90 mb-2">
            Wall of Tomorrow
          </h1>
          <p className="text-white/40 text-sm">
            Voices from around the world.
          </p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={fetchMessages}
             className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors"
           >
             Refresh
           </button>
           <Link 
             href="/write"
             className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors"
           >
             Write Yours
           </Link>
        </div>
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-white/20 animate-pulse">
          Listening...
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {messages.map((msg, index) => (
            <FadeIn key={msg._id} delay={index * 0.1} className="break-inside-avoid">
              <div className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors duration-500 group">
                <p className="font-serif text-lg leading-relaxed text-white/80 mb-4 whitespace-pre-wrap">
                  {msg.content}
                </p>
                <div className="flex justify-between items-center text-xs text-white/20 uppercase tracking-wider">
                  <span>{msg.timezone ? msg.timezone.split('/')[1]?.replace('_', ' ') || 'Unknown' : 'Anonymous'}</span>
                  <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </FadeIn>
          ))}
          
          {messages.length === 0 && (
            <div className="col-span-full text-center text-white/30 py-20">
              The wall is silent. Be the first to speak.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
