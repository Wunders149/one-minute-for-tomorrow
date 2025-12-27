import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  hoverEffect?: boolean;
  onClick?: () => void;
}

const Card = ({ 
  children, 
  className, 
  variant = 'default', 
  hoverEffect = true,
  onClick
}: CardProps) => {
  const baseClasses = "rounded-2xl border transition-all duration-300 overflow-hidden";
  
  const variantClasses = {
    default: "bg-white/5 border-white/10",
    elevated: "bg-white/10 border-white/20 shadow-lg shadow-black/20",
    outlined: "bg-transparent border-gold-400/30",
  };
  
  const hoverClasses = hoverEffect 
    ? "hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-black/30" 
    : "";
  
  const clickableClasses = onClick ? "cursor-pointer" : "";
  
  const cardClasses = twMerge(
    baseClasses,
    variantClasses[variant],
    hoverClasses,
    clickableClasses,
    className
  );
  
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={cardClasses}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;