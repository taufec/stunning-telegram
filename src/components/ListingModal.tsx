import React, { useEffect } from 'react';
import { X, Globe, Instagram, Linkedin, Music2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface ListingModalProps {
  listing: any;
  onClose: () => void;
}

export const ListingModal: React.FC<ListingModalProps> = ({ listing, onClose }) => {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (listing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [listing]);

  if (!listing) return null;

  const {
    name,
    tagline,
    description,
    category,
    district,
    logo_url,
    project_image_url,
    website_url,
    instagram_url,
    tiktok_url,
    linkedin_url,
    is_featured,
    is_sponsored,
  } = listing;

  const categoryColors: Record<string, string> = {
    'Education': 'bg-blue-600 text-white',
    'Fintech': 'bg-emerald-600 text-white',
    'SaaS': 'bg-purple-600 text-white',
    'Content': 'bg-orange-600 text-white',
    'Marketing': 'bg-pink-600 text-white',
    'Infra': 'bg-slate-600 text-white',
    'Healthcare': 'bg-red-600 text-white',
    'Media': 'bg-indigo-600 text-white',
    'Agritech': 'bg-green-600 text-white',
    'AI / ML': 'bg-cyan-600 text-white',
    'E-commerce': 'bg-yellow-500 text-black',
    'Others': 'bg-white text-black',
  };

  const badgeColor = categoryColors[category] || 'bg-white text-black';

  const formatUrl = (url: string | null | undefined) => {
    if (!url) return '';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12 md:p-16" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto relative shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-md text-white/70 hover:text-white rounded-full hover:bg-black/80 transition-colors border border-white/10"
        >
          <X size={20} />
        </button>

        {/* Project Cover Image */}
        <div className="w-full h-64 sm:h-80 relative bg-[#1A1A1A]">
          {project_image_url ? (
            <img 
              src={project_image_url} 
              alt={`${name} project`} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,#333_2px,transparent_2px)] bg-[size:16px_16px] opacity-20" />
          )}
          
          {/* Category Badge - Top Left */}
          <div className="absolute top-4 left-4 flex flex-col items-start gap-2 z-10">
            <span className={twMerge('px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-md', badgeColor)}>
              {category}
            </span>
            {(is_featured || is_sponsored) && (
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#00FF66] text-[#111111] shadow-lg">
                {is_sponsored ? 'Sponsored' : 'Featured'}
              </span>
            )}
          </div>

          {/* Overlapping Logo */}
          <div className="absolute -bottom-10 left-8 z-10">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#111111] bg-[#1A1A1A] flex items-center justify-center shadow-lg">
              {logo_url ? (
                <img src={logo_url} alt={`${name} logo`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span className="text-4xl font-bold text-white/50">{name.charAt(0)}</span>
              )}
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div className="flex-grow">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">{name}</h2>
              <p className="text-white/60 text-lg font-medium leading-relaxed">{tagline}</p>
            </div>
            <div className="flex shrink-0">
              <span className="px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase bg-white/5 text-white border border-white/10">
                📍 {district}
              </span>
            </div>
          </div>

          <div className="mb-10">
            <h4 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-4">About</h4>
            <p className="text-white/80 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
              {description || 'No description provided.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-white/10 mt-auto">
            {website_url && (
              <a href={formatUrl(website_url)} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#00FF66] text-[#111111] hover:bg-[#00CC55] px-8 py-3 rounded-full font-bold transition-colors">
                <Globe size={18} /> Visit Website
              </a>
            )}
            <div className="flex items-center gap-3 w-full sm:w-auto sm:ml-auto justify-center sm:justify-end mt-4 sm:mt-0">
              {instagram_url && (
                <a href={formatUrl(instagram_url)} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00FF66] hover:border-[#00FF66]/50 transition-colors bg-white/5">
                  <Instagram size={20} />
                </a>
              )}
              {tiktok_url && (
                <a href={formatUrl(tiktok_url)} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00FF66] hover:border-[#00FF66]/50 transition-colors bg-white/5">
                  <Music2 size={20} />
                </a>
              )}
              {linkedin_url && (
                <a href={formatUrl(linkedin_url)} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00FF66] hover:border-[#00FF66]/50 transition-colors bg-white/5">
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
