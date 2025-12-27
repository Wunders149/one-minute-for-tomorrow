'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import RitualButton from '@/components/RitualButton';
import { ArrowRight } from 'lucide-react';
import MainLayout from '@/components/MainLayout';

export default function Home() {
  return (
    <MainLayout title="Home">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">

        {/* Centered Headline with Breathing Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="z-10 max-w-4xl relative"
        >
          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-9xl mb-12 leading-[1.0] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 mix-blend-overlay"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
          >
            You have one minute.<br />
            <span className="text-gold-100 block mt-4 font-light italic text-4xl md:text-6xl lg:text-7xl opacity-80">
              Say what matters.
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-sm md:text-base text-white/30 mb-16 font-sans tracking-[0.2em] uppercase"
        >
          When the clock starts, be honest.
        </motion.p>

        {/* Ritual Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="z-10"
        >
          <Link href="/write">
            <RitualButton variant="filled" size="lg">
              Begin <ArrowRight className="w-5 h-5 ml-2 opacity-50" />
            </RitualButton>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="absolute bottom-8 text-white/10 text-[10px] uppercase tracking-[0.5em]"
        >
          One Minute For Tomorrow
        </motion.div>
      </div>
    </MainLayout>
  );
}