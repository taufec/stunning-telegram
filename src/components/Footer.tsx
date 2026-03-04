import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate rounded-t-[4rem] px-6 md:px-12 lg:px-24 pt-24 pb-12 mt-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center text-obsidian font-bold text-lg group-hover:scale-105 transition-transform">
                KT
              </div>
              <span className="text-2xl font-bold tracking-tight text-ivory">Homegrown Kedah Tech</span>
            </Link>
            <p className="text-ivory/60 text-lg max-w-sm">
              Built in the North. Built to Last. A curated directory of tech builders from Kedah, Malaysia.
            </p>
            
            <div className="flex items-center gap-3 mt-4 px-4 py-2 bg-obsidian/50 rounded-full w-fit border border-ivory/5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-data text-ivory/70">DIRECTORY OPERATIONAL</span>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-8 flex flex-col gap-4">
            <h4 className="text-ivory font-bold mb-4">Platform</h4>
            <Link to="/" className="text-ivory/60 hover:text-champagne transition-colors">Directory</Link>
            <Link to="/submit" className="text-ivory/60 hover:text-champagne transition-colors">Submit a Listing</Link>
            <Link to="/pricing" className="text-ivory/60 hover:text-champagne transition-colors">Pricing</Link>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-ivory font-bold mb-4">Connect</h4>
            <a href="#" className="flex items-center gap-2 text-ivory/60 hover:text-champagne transition-colors">
              <Twitter size={16} /> Twitter
            </a>
            <a href="#" className="flex items-center gap-2 text-ivory/60 hover:text-champagne transition-colors">
              <Github size={16} /> GitHub
            </a>
            <a href="#" className="flex items-center gap-2 text-ivory/60 hover:text-champagne transition-colors">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>

        <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory/40 text-sm">
            © {new Date().getFullYear()} Homegrown Kedah Tech · Built in the North.
          </p>
          <div className="flex gap-6 text-sm text-ivory/40">
            <a href="#" className="hover:text-ivory transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ivory transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
