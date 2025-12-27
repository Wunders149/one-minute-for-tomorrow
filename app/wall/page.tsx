'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Star, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/MainLayout';
import Card from '@/components/Card';
import StatsCard from '@/components/StatsCard';

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
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter messages based on search term
  const filteredMessages = messages.filter(msg =>
    msg.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const stats = [
    {
      label: "Messages",
      value: messages.length,
      icon: <Star className="w-4 h-4 text-gold-400" />,
      change: "+12%"
    },
    {
      label: "Today",
      value: messages.filter(msg => {
        const msgDate = new Date(msg.createdAt);
        const today = new Date();
        return msgDate.toDateString() === today.toDateString();
      }).length,
      icon: <Star className="w-4 h-4 text-gold-400" />
    },
    {
      label: "Public",
      value: messages.length,
      icon: <Star className="w-4 h-4 text-gold-400" />
    },
    {
      label: "Active Users",
      value: "24",
      icon: <Star className="w-4 h-4 text-gold-400" />,
      change: "+5%"
    }
  ];

  return (
    <MainLayout title="Wall of Tomorrow">
      <div className="pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
        {/* Stats Section */}
        <div className="mb-12">
          <StatsCard title="Message Statistics" stats={stats} />
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-400/30 focus:border-gold-400/50 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/80 hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Messages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMessages.map((msg) => (
            <motion.div
              key={msg._id}
              variants={itemVariants}
            >
              <Card variant="elevated" className="h-full flex flex-col">
                <div className="p-6 flex-1">
                  <p className="font-serif text-xl leading-[1.6] text-white/80 mb-6">
                    {msg.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-gold-400" />
                      <span className="text-xs uppercase tracking-[0.1em] text-white/50">
                        {msg.timezone ? msg.timezone.split('/')[1]?.replace('_', ' ') : 'Unknown'}
                      </span>
                    </div>
                    <span className="text-xs uppercase tracking-[0.1em] text-white/40">
                      {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {!loading && filteredMessages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-16 text-center"
            >
              <p className="font-serif text-2xl text-white/50 italic mb-4">The silence is loud.</p>
              <p className="text-white/40 mb-6">No messages match your search</p>
              <Link href="/write" className="text-gold-400 hover:text-gold-300 text-sm transition-colors">
                Write the first message
              </Link>
            </motion.div>
          )}
        </motion.div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400"></div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
