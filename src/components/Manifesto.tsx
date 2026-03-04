import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [stats, setStats] = useState({ listings: 0, district: 11, categories: 6 });

  useEffect(() => {
    const fetchStats = async () => {
      const { count } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');
      if (count !== null) setStats((prev) => ({ ...prev, listings: count }));
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const words = textRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.fromTo(
        '.stat-counter',
        { innerHTML: 0 },
        {
          innerHTML: (i, target) => target.dataset.target,
          duration: 2,
          snap: { innerHTML: 1 },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-obsidian overflow-hidden border-t border-ivory/5">
      {/* Parallax Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Dark Marble Texture"
          className="w-full h-full object-cover opacity-20"
          data-speed="0.5"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="mb-12">
          <p className="text-ivory/50 text-lg md:text-xl font-medium mb-2 uppercase tracking-widest">
            Most tech spotlights focus on:
          </p>
          <p className="text-ivory/30 font-mono text-sm tracking-widest">
            [ KL · PENANG · SELANGOR ]
          </p>
        </div>

        <div className="mb-8">
          <p className="text-ivory text-xl md:text-2xl font-bold mb-6">We focus on:</p>
          <h2 ref={textRef} className="text-5xl md:text-7xl lg:text-8xl leading-tight">
            {'The builders everyone overlooks.'.split(' ').map((word, i) => (
              <span key={i} className="word inline-block mr-4 text-drama">
                {word}
              </span>
            ))}
          </h2>
        </div>

        <div className="stats-container grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 border-t border-ivory/10 pt-16">
          <div className="flex flex-col items-center gap-4">
            <span className="text-5xl md:text-7xl font-bold text-champagne font-mono">
              <span className="stat-counter" data-target={stats.listings}>0</span>+
            </span>
            <span className="text-data text-ivory/50">LISTINGS</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-5xl md:text-7xl font-bold text-ivory font-mono">
              <span className="stat-counter" data-target={stats.district}>0</span>
            </span>
            <span className="text-data text-ivory/50">DISTRICT</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-5xl md:text-7xl font-bold text-ivory font-mono">
              <span className="stat-counter" data-target={stats.categories}>0</span>
            </span>
            <span className="text-data text-ivory/50">CATEGORIES</span>
          </div>
        </div>
      </div>
    </section>
  );
};
