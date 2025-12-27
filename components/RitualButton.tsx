'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface RitualButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'filled' | 'outlined';
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function RitualButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: RitualButtonProps) {

  const baseStyles = "relative inline-flex items-center justify-center font-serif tracking-widest uppercase transition-all duration-300 ease-out rounded-full group disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  const variants = {
    primary: "border border-gold-400/30 text-gold-100 hover:border-gold-400/60 bg-gold-900/10 hover:bg-gold-900/20",
    secondary: "border border-white/10 text-white/60 hover:text-white hover:border-white/30 bg-white/5 hover:bg-white/10",
    ghost: "text-white/40 hover:text-white hover:tracking-[0.2em]",
    filled: "bg-gold-500 text-black hover:bg-gold-400 border border-transparent",
    outlined: "border border-gold-400/50 text-gold-300 hover:bg-gold-400/10 bg-transparent"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={twMerge(baseStyles, sizeClasses[size], variants[variant], className)}
      {...props}
    >
      {/* Glow Effect */}
      {(variant === 'primary' || variant === 'filled') && (
        <span className="absolute inset-0 w-full h-full bg-gold-400/5 blur-xl group-hover:bg-gold-400/10 transition-colors duration-700" />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}