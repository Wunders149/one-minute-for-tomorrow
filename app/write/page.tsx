'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';

export default function WritePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [error, setError] = useState('');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // Submit Handler
  const handleSubmit = useCallback(async () => {
    if (isSubmitting || isSubmitted) return;
    setIsSubmitting(true);
    
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, visibility, timezone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  }, [content, visibility, isSubmitting, isSubmitted]);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hasStarted && timeLeft > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
    return () => clearInterval(interval);
  }, [hasStarted, timeLeft, isSubmitted, handleSubmit]);

  const handleStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <FadeIn>
          <h1 className="font-serif text-4xl md:text-6xl mb-6 text-white/90">
            Your words are now<br />part of tomorrow.
          </h1>
          <div className="flex flex-col gap-4 items-center mt-12">
            <button
              onClick={() => router.push('/wall')}
              className="px-8 py-3 text-sm tracking-widest uppercase border border-white/20 hover:bg-white/10 transition-colors rounded-full"
            >
              Visit the Wall
            </button>
            <button
              onClick={() => router.push('/')}
              className="text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              Return Home
            </button>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-6 md:p-12 relative">
      {/* Header / Timer */}
      <div className="flex justify-between items-center mb-12">
        <div className={`text-sm tracking-widest uppercase transition-opacity duration-500 ${hasStarted ? 'opacity-50' : 'opacity-100'}`}>
          {hasStarted ? 'Writing...' : 'One Minute'}
        </div>
        <div className={`font-mono text-2xl md:text-4xl transition-colors duration-500 ${timeLeft <= 10 ? 'text-red-400' : 'text-white/80'}`}>
          00:{timeLeft.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={handleStart}
          disabled={isSubmitting}
          placeholder={hasStarted ? "" : "Tap here to begin. The clock starts immediately."}
          maxLength={500}
          className="w-full h-[50vh] bg-transparent text-2xl md:text-4xl font-serif text-white/90 placeholder:text-white/20 resize-none outline-none leading-relaxed"
          spellCheck={false}
        />
        
        {/* Character Count */}
        <div className="absolute bottom-4 right-0 text-white/20 text-sm">
          {content.length}/500
        </div>
      </div>

      {/* Controls */}
      <AnimatePresence>
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            {/* Visibility Toggle */}
            <div className="flex items-center gap-4 bg-white/5 p-1 rounded-full">
              <button
                onClick={() => setVisibility('public')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${visibility === 'public' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
              >
                Public
              </button>
              <button
                onClick={() => setVisibility('private')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${visibility === 'private' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
              >
                Private
              </button>
            </div>

            <div className="flex flex-col items-end gap-2">
               {error && <span className="text-red-400 text-sm">{error}</span>}
               <button
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting || content.length === 0}
                  className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? 'Sending...' : 'Send to Tomorrow'}
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
