import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, QrCode } from 'lucide-react';

interface NavbarProps {
  onRegisterClick: () => void;
  onPosterClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onRegisterClick, 
  onPosterClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Perks', href: '#perks' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Poster', href: '#poster' },
    { label: 'Venue', href: '#venue' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Futuristic Cockpit Navbar Shell */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 pt-2 sm:pt-3">
        <nav
          className={`relative transition-all duration-300 rounded-2xl md:rounded-3xl border border-cyan-500/40 bg-[#050C24]/95 backdrop-blur-2xl shadow-[0_0_25px_rgba(0,180,255,0.2)] px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between ${
            isScrolled ? 'shadow-[0_10px_35px_rgba(0,0,0,0.8)] border-cyan-400/60' : ''
          }`}
          style={{
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
          }}
        >
          {/* Subtle neon top-right accent strip */}
          <div className="absolute top-0 right-6 sm:right-16 w-16 sm:w-36 h-[2px] bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-500 shadow-[0_0_12px_#EC4899]" />
          {/* Subtle neon bottom-left accent strip */}
          <div className="absolute bottom-0 left-6 sm:left-16 w-14 sm:w-28 h-[2px] bg-cyan-400 shadow-[0_0_10px_#00F0FF]" />

          {/* Left: Electric Lightning Bolt & Brand Block (NO TRUNCATION) */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group cursor-pointer shrink-0">
            {/* High-Tech Glowing Bolt Icon */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-400/25 via-blue-600/30 to-purple-600/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.35)] group-hover:scale-105 transition-transform shrink-0">
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300 drop-shadow-[0_0_8px_#00F0FF]" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
            </div>

            {/* Typography: INTELLECTRA + '26 + IDEAS • CODE • IMPACT */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-sm min-[360px]:text-base sm:text-2xl tracking-wide text-white font-display uppercase leading-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] whitespace-nowrap">
                  INTELLECTRA
                </span>
                
                {/* '26 Badge */}
                <span className="px-1.5 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/70 text-cyan-300 text-[9px] min-[360px]:text-[10px] sm:text-xs font-mono font-bold shadow-[0_0_8px_rgba(0,240,255,0.35)] shrink-0">
                  '26
                </span>
              </div>
              <span className="text-[7.5px] min-[360px]:text-[8.5px] sm:text-[10px] font-mono tracking-[0.14em] sm:tracking-[0.22em] text-cyan-300/80 font-semibold uppercase mt-0.5 whitespace-nowrap">
                IDEAS &bull; CODE &bull; IMPACT
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold tracking-wider text-slate-300 hover:text-cyan-300 transition-colors uppercase font-mono py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </div>

          {/* Right: Quick CTA & Menu Button */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              onClick={onRegisterClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-pointer border border-cyan-300/30"
            >
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl bg-[#09132E] border border-cyan-400/50 text-cyan-300 hover:text-white hover:border-cyan-300 hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="mt-2 rounded-2xl bg-[#060D24]/98 border border-cyan-500/40 p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl animate-in fade-in duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-3.5 border-b border-slate-800">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 text-xs font-semibold text-center border border-slate-800 hover:border-cyan-500/40 transition-colors uppercase font-mono"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3.5 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPosterClick();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-semibold text-slate-200 hover:text-cyan-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Official Poster</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRegisterClick();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Register Now (₹150 / Head)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
