import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: '01',
    title: 'Your next co-founder might be 10 relong away',
    desc: "They're already grinding with or without you.",
    canvas: (
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute inset-0 border border-champagne/20 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-4 border border-champagne/40 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
        <div className="absolute inset-8 border border-champagne/60 rounded-full animate-[spin_6s_linear_infinite]" />
        <div className="w-16 h-16 bg-champagne rounded-full shadow-[0_0_40px_rgba(0,255,102,0.5)]" />
      </div>
    ),
  },
  {
    id: '02',
    title: "Your project doesn't belong in a drawer.",
    desc: "Ship it. List it. Let the right people find it.",
    canvas: (
      <div className="relative w-64 h-64 border border-ivory/10 rounded-3xl overflow-hidden bg-slate/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-champagne shadow-[0_0_20px_rgba(0,255,102,0.8)] animate-[scan_3s_ease-in-out_infinite_alternate]" />
      </div>
    ),
  },
  {
    id: '03',
    title: "Skills don't grow by watching from the sideline.",
    desc: "Join events, hackathons, and courses built for builders in the north. Show up. Level up.",
    canvas: (
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-champagne stroke-2 fill-none animate-pulse">
          <path d="M0,50 L20,50 L30,20 L40,80 L50,40 L60,60 L70,50 L100,50" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },
];

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.step-card') as HTMLElement[];

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
          scrub: true,
          animation: gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(20px)',
            ease: 'none',
          }),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-obsidian relative">
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(256px); }
        }
      `}</style>
      
      {steps.map((step, i) => (
        <div
          key={step.id}
          className="step-card h-screen w-full flex items-center justify-center bg-obsidian border-t border-ivory/5"
          style={{ zIndex: i }}
        >
          <div className="max-w-6xl w-full px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <span className="text-data text-champagne">STEP {step.id}</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-ivory leading-tight">
                {step.title}
              </h2>
              <p className="text-xl text-ivory/60 leading-relaxed max-w-md">
                {step.desc}
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-md aspect-square bg-slate/10 border border-ivory/10 rounded-[3rem] flex items-center justify-center relative overflow-hidden">
                {step.canvas}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
