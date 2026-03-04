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
    'Education': 'bg-blue-500/20 text-blue-400',
    'Fintech': 'bg-emerald-500/20 text-emerald-400',
    'SaaS': 'bg-purple-500/20 text-purple-400',
    'Content': 'bg-orange-500/20 text-orange-400',
    'Marketing': 'bg-pink-500/20 text-pink-400',
    'Infra': 'bg-slate-500/20 text-slate-400',
    'Healthcare': 'bg-red-500/20 text-red-400',
    'Media': 'bg-indigo-500/20 text-indigo-400',
    'Agritech': 'bg-green-500/20 text-green-400',
    'AI / ML': 'bg-cyan-500/20 text-cyan-400',
    'E-commerce': 'bg-yellow-500/20 text-yellow-400',
    'Others': 'bg-ivory/10 text-ivory',
  };

  const badgeColor = categoryColors[category] || 'bg-ivory/10 text-ivory';

  return (
    <div
      className={twMerge(
        'group relative flex flex-col h-full bg-obsidian border border-ivory/10 rounded-[2rem] card-hover overflow-hidden',
        (is_featured || is_sponsored) && 'border-champagne/20',
        featuredVariant && 'min-w-[320px] md:min-w-[400px]'
      )}
    >
      {/* Project Cover Image */}
      {project_image_url && (
        <div className="w-full h-48 overflow-hidden relative">
          <img 
            src={project_image_url} 
            alt={`${name} project`} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
        </div>
      )}

      {/* Background Glow for Featured */}
      {(is_featured || is_sponsored) && (
        <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}

      <div className={twMerge("p-6 md:p-8 flex flex-col h-full", project_image_url && "pt-4")}>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div
            className={twMerge(
              'w-12 h-12 rounded-full overflow-hidden border border-ivory/10 bg-slate flex items-center justify-center shrink-0',
              (is_featured || is_sponsored) && 'ring-2 ring-champagne ring-offset-2 ring-offset-obsidian'
            )}
          >
            {logo_url ? (
              <img src={logo_url} alt={`${name} logo`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span className="text-lg font-bold text-ivory/50">{name.charAt(0)}</span>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={twMerge('px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase', badgeColor)}>
              {category}
            </span>
            {(is_featured || is_sponsored) && (
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-champagne text-obsidian font-bold">
                {is_sponsored ? 'Sponsored' : 'Featured'}
              </span>
            )}
          </div>
        </div>

        <div className="flex-grow relative z-10">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-ivory mb-2 group-hover:text-champagne transition-colors">
            {name}
          </h3>
          <p className="text-ivory/60 text-sm leading-relaxed line-clamp-2 mb-6">
            {tagline}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-ivory/10 relative z-10">
          <span className="text-data text-ivory/40">{district}</span>

          <div className="flex items-center gap-3">
            {website_url && (
              <a href={website_url} target="_blank" rel="noopener noreferrer" className="text-ivory/40 hover:text-champagne transition-colors">
                <Globe size={16} />
              </a>
            )}
            {instagram_url && (
              <a href={instagram_url} target="_blank" rel="noopener noreferrer" className="text-ivory/40 hover:text-champagne transition-colors">
                <Instagram size={16} />
              </a>
            )}
            {tiktok_url && (
              <a href={tiktok_url} target="_blank" rel="noopener noreferrer" className="text-ivory/40 hover:text-champagne transition-colors">
                <Music2 size={16} />
              </a>
            )}
            {linkedin_url && (
              <a href={linkedin_url} target="_blank" rel="noopener noreferrer" className="text-ivory/40 hover:text-champagne transition-colors">
                <Linkedin size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
