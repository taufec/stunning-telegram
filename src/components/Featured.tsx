import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { supabase } from '../lib/supabase';
import { ListingCard } from './ListingCard';

export const Featured: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [featuredListings, setFeaturedListings] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'approved')
        .or('is_featured.eq.true,is_sponsored.eq.true');
      if (data) setFeaturedListings(data);
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    if (featuredListings.length === 0) return;

    const ctx = gsap.context(() => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) return;

      const totalWidth = scrollElement.scrollWidth / 2;
      
      gsap.to(scrollElement, {
        x: -totalWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth)
        }
      });

      scrollElement.addEventListener('mouseenter', () => gsap.globalTimeline.pause());
      scrollElement.addEventListener('mouseleave', () => gsap.globalTimeline.play());
    }, containerRef);

    return () => ctx.revert();
  }, [featuredListings]);

  if (featuredListings.length === 0) return null;

  return (
    <section ref={containerRef} className="py-24 bg-obsidian overflow-hidden border-b border-ivory/5">
      <div className="px-6 md:px-12 lg:px-24 mb-12">
        <h2 className="flex items-baseline gap-4">
          <span className="text-2xl font-bold tracking-tight text-ivory">Spotlight</span>
          <span className="text-4xl text-drama">Featured Listings.</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 px-6 md:px-12 lg:px-24 w-max"
        >
          {/* Duplicate for seamless looping */}
          {[...featuredListings, ...featuredListings].map((listing, i) => (
            <div key={`${listing.id}-${i}`} className="w-[320px] md:w-[400px] shrink-0">
              <ListingCard listing={listing} featuredVariant />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
