import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { twMerge } from 'tailwind-merge';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDesktopMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll for shrinking navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Discover', path: '/' },
    { name: 'Submit', path: '/submit' },
    { name: 'Grow', path: '/grow' },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className={twMerge(
        "relative pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] mx-auto",
        isScrolled ? "w-full md:max-w-[470px]" : "w-full max-w-5xl"
      )}>
        {/* Main glass pill */}
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={twMerge(
            "relative bg-black/40 backdrop-blur-md rounded-full flex items-center justify-between border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-500",
            isScrolled ? "p-3" : "px-6 md:px-8 py-3"
          )}
        >
          {/* Logo - Enlarged 1.3x (from h-10 to h-[52px]) */}
          <Link to="/" className="flex items-center gap-2 group relative z-50 shrink-0">
            <img 
              src={isScrolled ? "/logo2.png" : "/logo.png"} 
              alt="Kedah Tech Logo" 
              className="h-[52px] object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path && link.path !== '/';
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => {
                    if (link.name.toLowerCase() === 'discover' && location.pathname === '/') {
                      e.preventDefault();
                      document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={twMerge(
                    "relative text-base font-bold uppercase tracking-wider transition-colors px-2 py-1",
                    isActive ? "text-[#00FF66]" : "text-white/70 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4 relative z-50">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
                  className={twMerge(
                    "flex items-center justify-center bg-[#00FF66] hover:bg-[#00cc52] text-black rounded-full text-sm font-bold transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-[0_0_20px_rgba(0,255,102,0.2)]",
                    isScrolled ? "px-5 py-2 gap-2 md:w-[52px] md:h-[52px] md:p-0 md:gap-0" : "px-6 h-[52px] gap-2"
                  )}
                >
                  <div className="shrink-0 flex items-center justify-center">
                    <User size={isScrolled ? 24 : 16} fill="currentColor" className="transition-all duration-500" />
                  </div>
                  <span className={twMerge(
                    "overflow-hidden whitespace-nowrap transition-all duration-500",
                    isScrolled ? "max-w-[100px] opacity-100 md:max-w-0 md:opacity-0" : "max-w-[100px] opacity-100"
                  )}>Account</span>
                </button>

                <AnimatePresence>
                  {desktopMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-8 w-56 bg-[#1A1A1A] rounded-2xl p-2 shadow-2xl border border-white/10 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/5 mb-2">
                        <p className="text-sm font-medium text-white/80 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <User size={16} className="text-[#00FF66]" fill="currentColor" /> 
                        My Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-left mt-1"
                      >
                        <LogOut size={16} fill="currentColor" /> 
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/auth"
                className={twMerge(
                  "flex items-center justify-center bg-[#00FF66] hover:bg-[#00cc52] text-black rounded-full text-sm font-bold transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-[0_0_20px_rgba(0,255,102,0.2)]",
                  isScrolled ? "px-5 py-2 gap-2 md:w-[52px] md:h-[52px] md:p-0 md:gap-0" : "px-6 h-[52px] gap-2"
                )}
              >
                <div className="shrink-0 flex items-center justify-center">
                  <User size={isScrolled ? 24 : 16} fill="currentColor" className="transition-all duration-500" />
                </div>
                <span className={twMerge(
                  "transition-all duration-500 overflow-hidden whitespace-nowrap",
                  isScrolled ? "max-w-[100px] opacity-100 md:max-w-0 md:opacity-0" : "max-w-[100px] opacity-100"
                )}>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.nav>

        {/* Mobile Fullscreen Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-4 left-0 right-0 bg-[#141414]/95 backdrop-blur-xl rounded-[2rem] p-6 pointer-events-auto shadow-2xl border border-white/10 md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      onClick={(e) => {
                        if (link.name.toLowerCase() === 'discover' && location.pathname === '/') {
                          e.preventDefault();
                          document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
                        }
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between py-4 text-2xl font-medium text-white hover:text-[#00FF66] transition-colors border-b border-white/5"
                    >
                      {link.name}
                      <ChevronRight size={20} className="text-white/20" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-8 pt-6 border-t border-white/10"
              >
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="px-4 py-3 bg-white/5 rounded-2xl mb-2">
                      <p className="text-xs text-white/50 mb-1">Signed in as</p>
                      <p className="text-sm font-medium text-white/80 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-white/10 hover:bg-white/15 rounded-full text-white font-medium transition-colors"
                    >
                      <User size={18} fill="currentColor" /> My Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center justify-center gap-2 w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full font-medium transition-colors"
                    >
                      <LogOut size={18} fill="currentColor" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#00FF66] hover:bg-[#00cc52] text-black rounded-full font-bold transition-colors shadow-[0_0_20px_rgba(0,255,102,0.2)]"
                  >
                    <User size={18} fill="currentColor" /> Sign In
                  </Link>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
