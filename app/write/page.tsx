'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import RitualButton from '@/components/RitualButton';
import { Lock, Globe, Sparkles, ChevronRight, X, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';

type Phase = 'WRITING' | 'CHOICE' | 'CONFIRMATION';

export default function WritePage() {
  const [phase, setPhase] = useState<Phase>('WRITING');
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // Handle Timer & Background Darkening
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
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic Background Overlay opacity based on time left
  const darknessOpacity = hasStarted ? Math.min(0.8, (60 - timeLeft) / 60) : 0;

  return (
    <div className="flex-1 flex flex-col relative w-full h-full min-h-screen overflow-hidden">
      {/* Show header only in non-writing phases */}
      {phase !== 'WRITING' && <Header title="Write" />}

      {/* Background Darkener */}
      <div
        className="fixed inset-0 bg-black pointer-events-none transition-opacity duration-1000 z-0"
        style={{ opacity: darknessOpacity }}
      />

      <AnimatePresence mode="wait">

        {/* PHASE 1: WRITING */}
        {phase === 'WRITING' && (
          <motion.div
            key="writing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="flex-1 flex flex-col relative z-10"
          >
            {/* Floating Timer */}
            <div className={`fixed top-12 left-0 right-0 flex justify-center pointer-events-none transition-all duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-40'}`}>
               <div className={`font-mono text-xl tracking-[0.3em] transition-colors duration-1000 ${
                 timeLeft <= 10 ? 'text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.5)] animate-heartbeat' :
                 timeLeft <= 30 ? 'text-gold-400' : 'text-white/20'
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
                className="w-full max-w-4xl h-[60vh] bg-transparent text-3xl md:text-5xl lg:text-6xl font-serif text-white/90 placeholder:text-white/10 resize-none outline-none leading-[1.4] text-center selection:bg-gold-500/20 border-none focus:ring-0"
                spellCheck={false}
              />
            </div>

            {/* Manual Finish */}
            {hasStarted && content.length > 0 && (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="fixed bottom-12 left-0 right-0 flex justify-center"
               >
                 <button
                   onClick={() => setPhase('CHOICE')}
                   className="text-white/20 hover:text-gold-400 text-xs tracking-[0.3em] uppercase transition-colors duration-500 flex items-center gap-2"
                 >
                   Finish Early <ChevronRight className="w-3 h-3" />
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
             exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
             transition={{ duration: 0.8 }}
             className="flex-1 flex flex-col items-center justify-center p-6 gap-8 md:gap-16 z-10 pt-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="font-serif text-3xl md:text-5xl text-white/90 mb-2 text-center">Where should this go?</h2>
              <p className="text-white/40 text-base text-center">Choose the visibility of your message</p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl justify-center items-stretch px-4">
              {/* Public Card */}
              <Card
                variant="elevated"
                hoverEffect={true}
                onClick={() => handleSubmit('public')}
                className="flex-1 p-6 md:p-12 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-white/80 mb-2">Share with the world</h3>
                    <p className="text-white/40 text-base font-sans leading-relaxed">
                      Your words will live with others on the Wall of Tomorrow.<br/>A quiet signal in the dark.
                    </p>
                  </div>
                  <Globe className="w-8 h-8 text-gold-400 ml-4" />
                </div>

                <RitualButton variant="outlined" className="w-full mt-6">
                  Make Public
                </RitualButton>
              </Card>

              {/* Private Card */}
              <Card
                variant="elevated"
                hoverEffect={true}
                onClick={() => handleSubmit('private')}
                className="flex-1 p-6 md:p-12 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-white/60 mb-2">Keep it for myself</h3>
                    <p className="text-white/30 text-base font-sans leading-relaxed">
                      Some truths are sacred.<br/>This message will be sent into the void, seen by no one.
                    </p>
                  </div>
                  <Lock className="w-8 h-8 text-white/60 ml-4" />
                </div>

                <RitualButton variant="outlined" className="w-full mt-6">
                  Keep Private
                </RitualButton>
              </Card>
            </div>

            <button
              onClick={() => setPhase('WRITING')}
              className="mt-8 flex items-center text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to writing
            </button>
          </motion.div>
        )}

        {/* PHASE 3: CONFIRMATION */}
        {phase === 'CONFIRMATION' && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center z-10 pt-20"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            >
              <Sparkles className="w-12 h-12 text-gold-400 mx-auto mb-6 animate-pulse-slow opacity-80" />
              <h1 className="font-serif text-4xl md:text-6xl mb-4 text-white/90 leading-tight">
                Your words are now<br />part of tomorrow.
              </h1>
              <p className="text-white/50 max-w-md mx-auto">
                Your message has been recorded and will remain as part of this experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="flex flex-col gap-6 items-center mt-12 w-full max-w-sm"
            >
              <RitualButton
                onClick={() => router.push('/wall')}
                variant="filled"
                size="lg"
                className="w-full"
              >
                Read Others
              </RitualButton>

              <RitualButton
                onClick={() => router.push('/')}
                variant="secondary"
                className="w-full"
              >
                Return Home
              </RitualButton>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Show navigation only in non-writing phases */}
      {phase !== 'WRITING' && <Navigation />}
    </div>
  );
}
