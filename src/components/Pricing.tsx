import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: 'Listed',
    price: 'Free',
    desc: 'Standard listing, pending review',
    features: ['Basic directory listing', 'Category & District tags', 'Social links', 'Searchable'],
    cta: 'Submit Free',
    link: '/submit',
    featured: false,
  },
  {
    name: 'Featured',
    price: 'RM 99',
    period: '/mo',
    desc: 'Gold ring, appears in Spotlight strip',
    features: ['Everything in Listed', 'Featured badge & Gold ring', 'Spotlight strip placement', 'Priority review'],
    cta: 'Get Featured',
    link: 'mailto:hello@kedah.tech?subject=Featured%20Listing%20Inquiry',
    featured: true,
  },
  {
    name: 'Sponsored',
    price: 'Custom',
    desc: 'Top of directory, branded card, "Sponsored" badge',
    features: ['Everything in Featured', 'Top of directory placement', 'Custom branded card', 'Newsletter mention'],
    cta: 'Sponsor a Spot',
    link: 'mailto:hello@kedah.tech?subject=Sponsorship%20Inquiry',
    featured: false,
  },
];

export const Pricing: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-obsidian border-t border-ivory/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-ivory mb-6">
            The Upgrade Layer
          </h2>
          <p className="text-xl text-ivory/60 max-w-2xl mx-auto">
            Get listed for free, or upgrade to stand out in the Kedah tech ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col p-8 md:p-12 rounded-[3rem] border transition-transform duration-500 hover:-translate-y-2 ${
                tier.featured
                  ? 'bg-champagne border-champagne text-obsidian shadow-[0_20px_60px_-15px_rgba(0,255,102,0.3)] scale-105 z-10'
                  : 'bg-slate/20 border-ivory/10 text-ivory'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-obsidian text-champagne text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full border border-champagne">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${tier.featured ? 'text-obsidian' : 'text-ivory'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm ${tier.featured ? 'text-obsidian/70' : 'text-ivory/50'}`}>
                  {tier.desc}
                </p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className={`text-5xl font-bold tracking-tight ${tier.featured ? 'text-obsidian' : 'text-ivory'}`}>
                  {tier.price}
                </span>
                {tier.period && (
                  <span className={`text-lg ${tier.featured ? 'text-obsidian/70' : 'text-ivory/50'}`}>
                    {tier.period}
                  </span>
                )}
              </div>

              <ul className="flex flex-col gap-4 mb-12 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className={`shrink-0 ${tier.featured ? 'text-obsidian' : 'text-champagne'}`}
                    />
                    <span className={`text-sm ${tier.featured ? 'text-obsidian/80' : 'text-ivory/80'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {tier.link.startsWith('mailto:') ? (
                <a
                  href={tier.link}
                  className={`w-full py-4 rounded-full font-bold text-center transition-all ${
                    tier.featured
                      ? 'bg-obsidian text-champagne hover:bg-slate'
                      : 'bg-ivory/10 text-ivory hover:bg-ivory/20'
                  }`}
                >
                  {tier.cta}
                </a>
              ) : (
                <Link
                  to={tier.link}
                  className={`w-full py-4 rounded-full font-bold text-center transition-all ${
                    tier.featured
                      ? 'bg-obsidian text-champagne hover:bg-slate'
                      : 'bg-ivory/10 text-ivory hover:bg-ivory/20'
                  }`}
                >
                  {tier.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
