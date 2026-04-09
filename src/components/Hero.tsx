import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';

const words = ['Startup', 'Company', 'Tech', 'Project', 'Community'];

export const Hero: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

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
      
      let paddedData = [];
      if (data && data.length > 0) {
        paddedData = [...data];
        while (paddedData.length < 7) {
          paddedData = [...paddedData, ...data];
        }
      } else {
        // Fallback mock data so the slider is always visible even if DB is empty
        const mock = { id: 'mock', name: 'Kedah Tech', tagline: 'Building the future', project_image_url: 'https://picsum.photos/seed/tech/400/300' };
        paddedData = Array(7).fill(mock).map((m, i) => ({ ...m, id: `mock-${i}` }));
      }
      setListings(paddedData.slice(0, 7));
    };
    fetchListings();
  }, []);

  useEffect(() => {
    if (listings.length === 0) return;
    
    let interval: NodeJS.Timeout;
    let initTimer: NodeJS.Timeout;
    let moveTimer: NodeJS.Timeout;
    let visibilityTimer: NodeJS.Timeout;
    let visibilityMoveTimer: NodeJS.Timeout;

    const startSliding = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % listings.length);
      }, 6000);
    };

    // 1. Wait for the browser to fully paint the initial static positions (transition: none)
    initTimer = setTimeout(() => {
      setIsInitialized(true);
      
      // 2. Wait a tiny bit more to ensure the transition property is updated
      // before we trigger the first movement
      moveTimer = setTimeout(() => {
        setActiveIndex(1);
        startSliding();
      }, 50);
    }, 200);

    // Handle tab switching to prevent wild catch-up animations
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        // Tab is active again. Disable transitions briefly to snap cards 
        // to their current positions without flying across the screen.
        setIsInitialized(false);
        clearInterval(interval);
        
        visibilityTimer = setTimeout(() => {
          setIsInitialized(true);
          visibilityMoveTimer = setTimeout(() => {
            setActiveIndex((current) => (current + 1) % listings.length);
            startSliding();
          }, 50);
        }, 50);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(moveTimer);
      clearTimeout(visibilityTimer);
      clearTimeout(visibilityMoveTimer);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [listings.length]);

  const getPositionStyle = (index: number) => {
    if (listings.length === 0) return {};
    
    let diff = (index - activeIndex) % listings.length;
    if (diff < -3) diff += listings.length;
    if (diff > 3) diff -= listings.length;

    const isWrapping = diff === 3;

    const baseStyle: React.CSSProperties = {
      transition: (!isInitialized || isWrapping) ? 'none' : 'all 6000ms linear',
      transformOrigin: 'bottom center',
    };

    switch (diff) {
      case -3:
        return { ...baseStyle, transform: 'translateX(-330%) translateY(180px) rotate(-30deg)', zIndex: 0, opacity: 0 };
      case -2:
        return { ...baseStyle, transform: 'translateX(-220%) translateY(80px) rotate(-20deg)', zIndex: 10, opacity: 1 };
      case -1:
        return { ...baseStyle, transform: 'translateX(-110%) translateY(20px) rotate(-10deg)', zIndex: 20, opacity: 1 };
      case 0:
        return { ...baseStyle, transform: 'translateX(0) translateY(0) rotate(0deg)', zIndex: 30, opacity: 1, boxShadow: '0 30px 60px rgba(0,0,0,0.4)' };
      case 1:
        return { ...baseStyle, transform: 'translateX(110%) translateY(20px) rotate(10deg)', zIndex: 20, opacity: 1 };
      case 2:
        return { ...baseStyle, transform: 'translateX(220%) translateY(80px) rotate(20deg)', zIndex: 10, opacity: 1 };
      case 3:
        return { ...baseStyle, transform: 'translateX(330%) translateY(180px) rotate(30deg)', zIndex: 0, opacity: 0 };
      default:
        return { ...baseStyle, opacity: 0, pointerEvents: 'none' };
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#111111] pt-40 pb-24 px-6 overflow-hidden flex flex-col items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/herobg.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Headlines */}
      <div className="text-center z-10 max-w-5xl mx-auto my-12 relative">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-white leading-[1.1] md:leading-[0.9] uppercase">
          <span className="block lg:hidden">
            Homegrown<br />Kedah&nbsp;&nbsp;Tech<br />Directory
          </span>
          <span className="hidden lg:block">
            Homegrown&nbsp;&nbsp;Kedah<br />Tech&nbsp;&nbsp;Directory
          </span>
        </h1>
        
        <h2 className="text-2xl md:text-4xl lg:text-[2.75rem] font-light text-white/80 mt-8 leading-tight">
          While they look south,<br />we build up north.
        </h2>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="flex -space-x-3">
            <img className="w-8 h-8 rounded-full border-2 border-[#111111] object-cover" src="https://i.pravatar.cc/100?img=11" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-[#111111] object-cover" src="https://i.pravatar.cc/100?img=12" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-[#111111] object-cover" src="https://i.pravatar.cc/100?img=13" alt="User" />
            <img className="w-8 h-8 rounded-full border-2 border-[#111111] object-cover" src="https://i.pravatar.cc/100?img=14" alt="User" />
          </div>
          <span className="text-sm font-medium text-white/80">Join 1.8K+ others</span>
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
                <img src={listing.project_image_url} className="w-full h-full object-cover" alt={listing.name} referrerPolicy="no-referrer" />
              ) : listing.logo_url ? (
                <img src={listing.logo_url} className="w-full h-full object-cover" alt={listing.name} referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,#444_4px,transparent_4px)] bg-[size:24px_24px] opacity-50" />
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white text-lg md:text-xl font-bold tracking-tight truncate">{listing.name}</div>
              </div>
            </div>
          );
        })}

      </div>

      {/* CTA Button */}
      <div className="mt-16 z-20">
        <Link to="/submit" className="block outline-none">
          <motion.div 
            layout
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            whileHover={{ y: -2, x: -2, boxShadow: "8px 8px 0px 0px #00FF66" }}
            whileTap={{ y: 6, x: 6, boxShadow: "0px 0px 0px 0px #00FF66" }}
            className="inline-flex items-center gap-2 bg-[#00FF66] text-[#111111] font-black text-lg md:text-xl tracking-tight uppercase px-8 py-4 rounded-lg border-2 border-[#00FF66] shadow-[6px_6px_0px_0px_#00FF66] transition-colors"
          >
            <span>Submit Your</span>
            <span className="relative h-[1em] overflow-hidden text-left inline-flex items-center leading-[1]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={words[wordIndex]}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                  className="block leading-[1] whitespace-nowrap"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>
        </Link>
      </div>

    </section>
  );
};
