import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';

const words = ['Startup', 'Company', 'Tech', 'Project', 'Community'];

export const Hero: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      const { data } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(7);
      
      if (data && data.length > 0) {
        let paddedData = [...data];
        // Ensure we have exactly 7 items for the 7 positions (5 visible + 2 hidden buffers)
        while (paddedData.length < 7) {
          paddedData = [...paddedData, ...data];
        }
        setListings(paddedData.slice(0, 7));
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    if (listings.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % listings.length);
    }, 6000); // Continuous 6s interval
    return () => clearInterval(interval);
  }, [listings]);

  const getPositionStyle = (index: number) => {
    if (listings.length === 0) return {};
    
    let diff = (index - activeIndex) % listings.length;
    if (diff < -3) diff += listings.length;
    if (diff > 3) diff -= listings.length;

    // When a card wraps from the far left (-3) to the far right (3), 
    // we disable the transition so it doesn't fly across the screen.
    const isWrapping = diff === 3;

    const baseStyle: React.CSSProperties = {
      transition: isWrapping ? 'none' : 'all 6000ms linear',
    };

    switch (diff) {
      case -3:
        return { ...baseStyle, transform: 'translateX(-330%) translateY(225px) rotate(-36deg)', zIndex: 0, opacity: 0 };
      case -2:
        return { ...baseStyle, transform: 'translateX(-220%) translateY(100px) rotate(-24deg)', zIndex: 10, opacity: 0.4 };
      case -1:
        return { ...baseStyle, transform: 'translateX(-110%) translateY(25px) rotate(-12deg)', zIndex: 20, opacity: 0.8 };
      case 0:
        return { ...baseStyle, transform: 'translateX(0) translateY(0) rotate(0deg)', zIndex: 30, opacity: 1, boxShadow: '0 30px 60px rgba(0,0,0,0.4)' };
      case 1:
        return { ...baseStyle, transform: 'translateX(110%) translateY(25px) rotate(12deg)', zIndex: 20, opacity: 0.8 };
      case 2:
        return { ...baseStyle, transform: 'translateX(220%) translateY(100px) rotate(24deg)', zIndex: 10, opacity: 0.4 };
      case 3:
        return { ...baseStyle, transform: 'translateX(330%) translateY(225px) rotate(36deg)', zIndex: 0, opacity: 0 };
      default:
        return { ...baseStyle, opacity: 0, pointerEvents: 'none' };
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#F5F5F5] pt-40 pb-24 px-6 overflow-hidden flex flex-col items-center">
      
      {/* Headlines */}
      <div className="text-center z-10 max-w-5xl mx-auto my-12">
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-[#111111] leading-[0.9] uppercase">
          Homegrown&nbsp;&nbsp;Kedah<br />Tech&nbsp;&nbsp;Directory
        </h1>
        
        <h2 className="text-2xl md:text-4xl lg:text-[2.75rem] font-light text-[#111111] mt-8 leading-tight">
          While they look south,<br />we build up north.
        </h2>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="flex -space-x-3">
            <img className="w-8 h-8 rounded-full border-2 border-[#F5F5F5] object-cover" src="https://i.pravatar.cc/100?img=11" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-[#F5F5F5] object-cover" src="https://i.pravatar.cc/100?img=12" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-[#F5F5F5] object-cover" src="https://i.pravatar.cc/100?img=13" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-[#F5F5F5] object-cover" src="https://i.pravatar.cc/100?img=14" alt="User" />
          </div>
          <span className="text-sm font-medium text-[#111111]">Join 1.8K+ others</span>
        </div>
      </div>

      {/* Curved Cards Slider */}
      <div className="relative w-full max-w-[1200px] mx-auto h-[300px] md:h-[450px] mt-16 flex justify-center items-center pointer-events-none">
        
        {listings.map((listing, index) => {
          const style = getPositionStyle(index);
          return (
            <div 
              key={`${listing.id}-${index}`}
              className="absolute w-48 md:w-72 aspect-[4/3] bg-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl"
              style={style}
            >
              {listing.project_image_url ? (
                <img src={listing.project_image_url} className="w-full h-full object-cover opacity-80" alt={listing.name} referrerPolicy="no-referrer" />
              ) : listing.logo_url ? (
                <img src={listing.logo_url} className="w-full h-full object-cover opacity-80" alt={listing.name} referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,#444_4px,transparent_4px)] bg-[size:24px_24px] opacity-50" />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/20 to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="text-white text-lg md:text-xl font-bold tracking-tight truncate">{listing.name}</div>
                <div className="text-white/70 text-xs md:text-sm truncate mt-1">{listing.tagline}</div>
              </div>
            </div>
          );
        })}

      </div>

      {/* CTA Button */}
      <div className="mt-16 z-20">
        <Link 
          to="/submit"
          className="inline-flex items-center gap-2 bg-[#00FF66] text-[#111111] font-black text-lg md:text-xl tracking-tight uppercase px-8 py-4 rounded-lg border-2 border-[#111111] shadow-[6px_6px_0px_0px_#111111] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#111111] transition-all"
        >
          <span>Submit Your</span>
          <span className="relative h-[1em] overflow-hidden text-left inline-flex items-center leading-[1]">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={words[wordIndex]}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.5, ease: 'circOut' }}
                className="block leading-[1] whitespace-nowrap"
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </Link>
      </div>

    </section>
  );
};
