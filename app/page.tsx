import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      
      <FadeIn delay={0.2} className="z-10 max-w-2xl">
        <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight tracking-tight text-white/90">
          You have one minute.<br />Say what matters.
        </h1>
      </FadeIn>

      <FadeIn delay={0.8} className="z-10">
        <p className="text-lg md:text-xl text-white/50 mb-12 font-light">
          When the clock starts, be honest.
        </p>
      </FadeIn>

      <FadeIn delay={1.2} className="z-10">
        <Link 
          href="/write"
          className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-white/10 group-hover:translate-x-0 ease">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Begin</span>
          <span className="relative invisible">Begin</span>
        </Link>
      </FadeIn>

      {/* Subtle footer */}
      <div className="absolute bottom-8 text-white/20 text-xs uppercase tracking-widest">
        One Minute For Tomorrow
      </div>
    </div>
  );
}