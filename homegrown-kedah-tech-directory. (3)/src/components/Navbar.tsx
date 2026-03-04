import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'discover', path: '/' },
    { name: 'submit', path: '/submit' },
    { name: 'grow', path: '/grow' },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="relative pointer-events-auto w-full max-w-4xl">
        {/* Green shadow/offset pill */}
        <div className="absolute inset-0 bg-[#00FF66] rounded-full translate-y-2 translate-x-1" />
        
        {/* Main dark pill */}
        <nav className="relative bg-[#1A1A1A] rounded-full px-6 md:px-10 py-4 flex items-center justify-between border border-[#1A1A1A]">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="Kedah Tech Logo" className="h-10 object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[#00FF66] text-xl font-light hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button className="text-white hover:text-[#00FF66] transition-colors">
              <Menu size={32} strokeWidth={1.5} />
            </button>
          </div>

          <button
            className="md:hidden text-white hover:text-[#00FF66] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full mt-6 left-4 right-4 p-6 bg-[#1A1A1A] rounded-3xl flex flex-col gap-6 pointer-events-auto shadow-2xl border border-[#333] md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-2xl font-light text-[#00FF66] hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
