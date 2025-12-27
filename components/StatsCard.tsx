import { motion } from 'framer-motion';
import { MessageCircle, Globe, Lock, Users } from 'lucide-react';

interface StatItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
}

interface StatsCardProps {
  title: string;
  stats: StatItem[];
}

const StatsCard = ({ title, stats }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
    >
      <h3 className="font-serif text-xl text-white/90 mb-6">{title}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 rounded-xl p-4 border border-white/5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gold-900/20 rounded-lg">
                {stat.icon}
              </div>
              <span className="text-white/60 text-sm">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">{stat.value}</span>
              {stat.change && (
                <span className={`text-xs ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsCard;