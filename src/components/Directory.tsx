import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '../lib/supabase';
import { ListingCard } from './ListingCard';
import { ListingModal } from './ListingModal';
import { AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, Search, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Education', 'Fintech', 'SaaS', 'Content', 'Marketing', 'Infra', 'Healthcare', 'Media', 'Agritech', 'AI / ML', 'E-commerce', 'Others'];
const DISTRICT_OPTIONS = ['All Districts', 'Kota Setar', 'Kubang Pasu', 'Kulim', 'Langkawi', 'Baling', 'Sik', 'Padang Terap', 'Pendang', 'Yan', 'Bandar Baharu', 'Pokok Sena', 'Kuala Muda'];
const SORT_OPTIONS = ['Newest', 'A-Z', 'Featured First'];

export const Directory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [district, setDistrict] = useState('All Districts');
  const [sort, setSort] = useState('Newest');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [selectedListing, setSelectedListing] = useState<any>(null);
  
  const gridRef = useRef<HTMLDivElement>(null);

  const fetchListings = async (reset = false) => {
    setLoading(true);
    let query = supabase.from('listings').select('*').eq('status', 'approved');

    if (category !== 'All') query = query.eq('category', category);
    if (district !== 'All Districts') query = query.eq('district', district);
    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,tagline.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
    }

    if (sort === 'Newest') query = query.order('created_at', { ascending: false });
    if (sort === 'A-Z') query = query.order('name', { ascending: true });
    if (sort === 'Featured First') {
      query = query.order('is_featured', { ascending: false }).order('is_sponsored', { ascending: false }).order('created_at', { ascending: false });
    }

    const from = reset ? 0 : (page - 1) * 18;
    const to = from + 17;
    query = query.range(from, to);

    const { data, error } = await query;
    
    if (data) {
      if (reset) {
        setListings(data);
      } else {
        setListings((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === 18);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchListings(true);
  }, [category, district, sort, searchQuery]);

  useEffect(() => {
    if (page > 1) fetchListings();
  }, [page]);

  useEffect(() => {
    if (listings.length > 0 && gridRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.listing-card-anim',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'all'
          }
        );
      }, gridRef);
      
      // Refresh ScrollTrigger to recalculate positions after Directory expands
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => ctx.revert();
    } else if (listings.length === 0 && !loading) {
      // Refresh even if empty to ensure correct layout
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [listings, loading]);

  const activeFiltersCount = (category !== 'All' ? 1 : 0) + (district !== 'All Districts' ? 1 : 0) + (searchQuery ? 1 : 0);

  return (
    <section id="directory" className="py-24 px-6 md:px-12 lg:px-24 bg-[#ffffff] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-obsidian my-16 text-center">
          Look for tech. Stay for the people.
        </h2>
        
        <div className="py-6 border-b border-obsidian/10 mb-12 flex flex-col gap-6">
          <div className="relative w-full">
            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-obsidian/40" />
            <input
              type="text"
              placeholder="Search builders, projects, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-obsidian/5 border border-obsidian/10 rounded-full py-4 pl-14 pr-6 text-lg font-medium text-obsidian placeholder:text-obsidian/40 focus:outline-none focus:border-champagne/50 transition-colors"
            />
          </div>

          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="relative flex-grow overflow-hidden max-w-full">
              <div className="flex items-center gap-4 overflow-x-auto pb-2 xl:pb-0 hide-scrollbar pr-12">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      category === cat
                        ? 'bg-champagne text-obsidian shadow-[0_0_20px_rgba(0,255,102,0.3)]'
                        : 'bg-obsidian/5 text-obsidian hover:bg-obsidian/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#ffffff] to-transparent pointer-events-none flex items-center justify-end pr-0 pb-2 xl:pb-0">
                <div className="bg-white/80 rounded-full p-1 backdrop-blur-sm mr-1">
                  <ChevronRight size={16} className="text-obsidian animate-pulse" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="relative group">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="appearance-none bg-obsidian/5 border border-obsidian/10 rounded-full px-5 py-2 pr-10 text-sm font-medium text-obsidian focus:outline-none focus:border-champagne/50 cursor-pointer"
                >
                  {DISTRICT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-white text-obsidian">
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-obsidian/50 pointer-events-none group-hover:text-obsidian transition-colors" />
              </div>

              <div className="relative group">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-obsidian/5 border border-obsidian/10 rounded-full px-5 py-2 pr-10 text-sm font-medium text-obsidian focus:outline-none focus:border-champagne/50 cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-white text-obsidian">
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-obsidian/50 pointer-events-none group-hover:text-obsidian transition-colors" />
              </div>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 text-xs font-mono text-obsidian">
              <Filter size={14} />
              <span>{activeFiltersCount} ACTIVE FILTER{activeFiltersCount > 1 ? 'S' : ''}</span>
              {searchQuery && <span className="text-obsidian/50 ml-2">Searching: "{searchQuery}"</span>}
            </div>
          )}
        </div>

        {loading && listings.length === 0 ? (
          <div className="flex justify-center py-24">
            <div className="w-12 h-12 border-4 border-obsidian/10 border-t-champagne rounded-full animate-spin" />
          </div>
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-obsidian/20 rounded-[3rem] bg-obsidian/5">
            <div className="w-24 h-24 bg-slate rounded-full flex items-center justify-center mb-6 text-4xl">
              🏜️
            </div>
            <h3 className="text-2xl font-bold text-obsidian mb-2">No builders found</h3>
            <p className="text-obsidian/60 mb-8 max-w-md">
              We couldn't find any listings matching your current filters. Be the first to put this category on the map.
            </p>
            <a
              href="/submit"
              className="px-8 py-4 bg-champagne text-obsidian rounded-full font-bold btn-magnetic"
            >
              Submit a Listing
            </a>
          </div>
        ) : (
          <>
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {listings.map((listing) => (
                <div key={listing.id} className="listing-card-anim cursor-pointer" onClick={() => setSelectedListing(listing)}>
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>

            <AnimatePresence>
              {selectedListing && (
                <ListingModal 
                  listing={selectedListing} 
                  onClose={() => setSelectedListing(null)} 
                />
              )}
            </AnimatePresence>

            {hasMore && (
              <div className="flex justify-center mt-16">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loading}
                  className="px-8 py-4 border border-obsidian/20 rounded-full font-medium text-obsidian hover:border-obsidian hover:bg-obsidian/5 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More Builders'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
