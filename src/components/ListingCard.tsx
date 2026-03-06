import React from 'react';
import { Globe, Instagram, Linkedin, Music2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ListingProps {
  listing: any;
  featuredVariant?: boolean;
}

export const ListingCard: React.FC<ListingProps> = ({ listing, featuredVariant }) => {
  const {
    name,
    tagline,
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

  return (
    <div
      className={twMerge(
        'group relative flex flex-col h-full bg-[#111111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00FF66]/50 transition-colors duration-300',
        (is_featured || is_sponsored) && 'border-[#00FF66]/30',
        featuredVariant && 'min-w-[320px] md:min-w-[400px]'
      )}
    >
      {/* Project Cover Image */}
      <div className="w-full h-48 relative bg-[#1A1A1A]">
        {project_image_url ? (
          <img 
            src={project_image_url} 
            alt={`${name} project`} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,#333_2px,transparent_2px)] bg-[size:16px_16px] opacity-20" />
        )}
        
        {/* Category Badge - Top Right */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          <span className={twMerge('px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-md', badgeColor)}>
            {category}
          </span>
          {(is_featured || is_sponsored) && (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#00FF66] text-[#111111] shadow-lg">
              {is_sponsored ? 'Sponsored' : 'Featured'}
            </span>
          )}
        </div>

        {/* Overlapping Logo */}
        <div className="absolute -bottom-8 left-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-[#111111] bg-[#1A1A1A] flex items-center justify-center shadow-lg">
            {logo_url ? (
              <img src={logo_url} alt={`${name} logo`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span className="text-2xl font-bold text-white/50">{name.charAt(0)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-12 pb-6 px-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-bold tracking-tight text-white mb-1 group-hover:text-[#00FF66] transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
            {tagline}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{district}</span>

          <div className="flex items-center gap-3">
            {website_url && (
              <a href={website_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00FF66] transition-colors" onClick={(e) => e.stopPropagation()}>
                <Globe size={16} />
              </a>
            )}
            {instagram_url && (
              <a href={instagram_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00FF66] transition-colors" onClick={(e) => e.stopPropagation()}>
                <Instagram size={16} />
              </a>
            )}
            {tiktok_url && (
              <a href={tiktok_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00FF66] transition-colors" onClick={(e) => e.stopPropagation()}>
                <Music2 size={16} />
              </a>
            )}
            {linkedin_url && (
              <a href={linkedin_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00FF66] transition-colors" onClick={(e) => e.stopPropagation()}>
                <Linkedin size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
