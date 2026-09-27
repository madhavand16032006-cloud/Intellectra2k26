import React from 'react';
import { Maximize2, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import officialPosterImg from '../assets/images/intellectra_official_poster_1790447046945.jpg';

interface DigitalPosterProps {
  onZoom?: () => void;
  isLightbox?: boolean;
}

export const DigitalPoster: React.FC<DigitalPosterProps> = ({ onZoom, isLightbox = false }) => {
  return (
    <div 
      onClick={onZoom}
      className={`w-full mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-500/40 shadow-[0_0_50px_rgba(0,180,255,0.25)] relative group cursor-pointer transition-all duration-300 bg-[#040816] ${
        isLightbox ? 'max-w-6xl' : 'max-w-5xl'
      }`}
    >
      {/* Laser scanner accent on hover */}
      {!isLightbox && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-400/50 backdrop-blur-md text-xs font-semibold text-cyan-300 shadow-md group-hover:scale-105 transition-transform">
          <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Click to Enlarge</span>
        </div>
      )}

      {/* 100% Authentic Official Poster Image */}
      <div className="w-full relative overflow-hidden bg-black/40 flex items-center justify-center">
        <img
          src={officialPosterImg}
          alt="INTELLECTRA 2K26 Official National Level Symposium Poster - Adhiparasakthi Engineering College"
          referrerPolicy="no-referrer"
          className={`w-full h-auto object-contain transition-transform duration-500 ${
            isLightbox ? 'max-h-[85vh] rounded-2xl' : 'group-hover:scale-[1.015]'
          }`}
          loading="eager"
        />
      </div>

      {/* Subtle Bottom Caption Bar */}
      {!isLightbox && (
        <div className="p-3 sm:p-4 bg-[#070D22]/95 border-t border-cyan-500/30 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold font-display text-white">INTELLECTRA 2K26</span>
            <span className="text-slate-500 hidden sm:inline">&bull;</span>
            <span className="text-cyan-300 hidden sm:inline">12th October 2026 &bull; Central Library</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <span className="text-amber-400 font-semibold">₹150 / Head</span>
            <span>&bull;</span>
            <span className="text-emerald-400">Free Lunch &amp; Cash Prizes</span>
          </div>
        </div>
      )}
    </div>
  );
};
