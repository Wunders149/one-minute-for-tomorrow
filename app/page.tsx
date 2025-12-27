import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import RitualButton from '@/components/RitualButton';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative">
      
      <FadeIn delay={0.2} className="z-10 max-w-3xl">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] tracking-tight text-white mix-blend-overlay opacity-90">
          You have one minute.<br />
          <span className="text-gold-100/90 italic">Say what matters.</span>
        </h1>
      </FadeIn>

      <FadeIn delay={1.2} className="z-10">
        <p className="text-lg md:text-xl text-white/40 mb-16 font-light tracking-wide font-serif">
          When the clock starts, be honest.
        </p>
      </FadeIn>

      <FadeIn delay={1.8} className="z-10">
        <Link href="/write">
          <RitualButton variant="primary">
            Begin <ArrowRight className="w-4 h-4 opacity-50" />
          </RitualButton>
        </Link>
      </FadeIn>

      {/* Subtle footer */}
      <FadeIn delay={2.5} className="absolute bottom-8 text-white/10 text-[10px] uppercase tracking-[0.3em]">
        One Minute For Tomorrow
      </FadeIn>
    </div>
  );
}
