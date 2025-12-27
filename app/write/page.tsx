'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import RitualButton from '@/components/RitualButton';
import { Lock, Globe, Sparkles, X, ChevronRight } from 'lucide-react';

type Phase = 'WRITING' | 'CHOICE' | 'CONFIRMATION';

export default function WritePage() {
  const [phase, setPhase] = useState<Phase>('WRITING');
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // Handle Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hasStarted && timeLeft > 0 && phase === 'WRITING') {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && phase === 'WRITING') {
      setPhase('CHOICE');
    }
    return () => clearInterval(interval);
  }, [hasStarted, timeLeft, phase]);

  const handleStart = () => {
    if (!hasStarted) setHasStarted(true);
  };

  const handleSubmit = async (visibility: 'public' | 'private') => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, visibility, timezone }),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setPhase('CONFIRMATION');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.'); // Fallback error UI
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render Logic
  return (
    <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* PHASE 1: WRITING */}
        {phase === 'WRITING' && (
          <motion.div
            key="writing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col relative"
          >
            {/* Floating Timer */}
            <div className={`fixed top-8 left-0 right-0 flex justify-center pointer-events-none transition-all duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-30'}`}>
               <div className={`font-mono text-xl tracking-widest transition-colors duration-1000 ${
                 timeLeft <= 10 ? 'text-red-400/80 animate-heartbeat' : 
                 timeLeft <= 30 ? 'text-gold-400/80' : 'text-white/20'
               }`}>
                 00:{timeLeft.toString().padStart(2, '0')}
               </div>
            </div>

            {/* Main Editor */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleStart}
                placeholder={hasStarted ? "" : "Tap here to begin."}
                maxLength={500}
                autoFocus
                className="w-full max-w-4xl h-[60vh] bg-transparent text-2xl md:text-4xl lg:text-5xl font-serif text-white/90 placeholder:text-white/10 resize-none outline-none leading-relaxed text-center selection:bg-gold-500/30"
                spellCheck={false}
              />
            </div>
            
            {/* Manual Finish Button (Optional, if they finish early) */}
            {hasStarted && content.length > 0 && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="absolute bottom-12 w-full flex justify-center"
               >
                 <button 
                   onClick={() => setPhase('CHOICE')}
                   className="text-white/20 hover:text-gold-400 text-sm tracking-[0.2em] uppercase transition-colors"
                 >
                   I am done
                 </button>
               </motion.div>
            )}
          </motion.div>
        )}

        {/* PHASE 2: CHOICE */}
        {phase === 'CHOICE' && (
          <motion.div
             key="choice"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.8 }}
             className="flex-1 flex flex-col items-center justify-center p-6 gap-8 md:gap-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white/80 mb-4">Where should this go?</h2>
            
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl justify-center">
              {/* Public Card */}
              <button 
                onClick={() => handleSubmit('public')}
                disabled={isSubmitting}
                className="group flex-1 bg-white/5 border border-white/5 hover:border-gold-400/30 hover:bg-gold-900/10 p-10 rounded-xl text-left transition-all duration-500 flex flex-col gap-4 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Globe className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="font-serif text-2xl text-white group-hover:text-gold-100 transition-colors">Share with the world</h3>
                <p className="text-white/40 text-sm font-sans leading-relaxed group-hover:text-white/60 transition-colors">
                  Your words will live with others on the Wall of Tomorrow. A quiet signal in the dark.
                </p>
              </button>

              {/* Private Card */}
              <button 
                onClick={() => handleSubmit('private')}
                disabled={isSubmitting}
                className="group flex-1 bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 p-10 rounded-xl text-left transition-all duration-500 flex flex-col gap-4"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <Lock className="w-6 h-6 text-white/60" />
                </div>
                <h3 className="font-serif text-2xl text-white/60 group-hover:text-white transition-colors">Keep it for myself</h3>
                <p className="text-white/30 text-sm font-sans leading-relaxed group-hover:text-white/50 transition-colors">
                  Some truths are sacred. This message will be sent into the void, seen by no one.
                </p>
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: CONFIRMATION */}
        {phase === 'CONFIRMATION' && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-8 animate-pulse-slow" />
              <h1 className="font-serif text-4xl md:text-6xl mb-6 text-white/90">
                Your words are now<br />part of tomorrow.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="flex flex-col gap-6 items-center mt-16"
            >
              <RitualButton onClick={() => router.push('/wall')} variant="secondary">
                Read Others
              </RitualButton>
              
              <button
                onClick={() => router.push('/')}
                className="text-white/20 hover:text-white/50 text-xs uppercase tracking-widest transition-colors mt-4"
              >
                Close this moment
              </button>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}