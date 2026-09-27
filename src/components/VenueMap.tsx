import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { COLLEGE_INFO } from '../data/symposiumData';

export const VenueMap: React.FC = () => {
  return (
    <section id="venue" className="py-20 relative z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2 font-mono">
            Campus Location &bull; Melmaruvathur
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
            Symposium Venue &amp; Navigation
          </h2>
          <p className="text-base text-slate-300 mt-3">
            Central Library, Adhiparasakthi Engineering College (Autonomous), Melmaruvathur &ndash; 603319.
          </p>
        </div>

        {/* Map Frame */}
        <div className="rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_35px_rgba(0,0,0,0.6)] relative min-h-[420px] bg-slate-900 flex flex-col">
          <iframe
            title="Adhiparasakthi Engineering College Google Map"
            src={COLLEGE_INFO.mapsEmbedUrl}
            width="100%"
            height="100%"
            className="w-full h-[420px] border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          
          {/* Overlay badge on map bottom */}
          <div className="p-4 bg-[#0A1020]/95 backdrop-blur-md border-t border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-semibold text-white">
                Central Library, Adhiparasakthi Engineering College, Melmaruvathur - 603319
              </span>
            </div>
            
            <a
              href={COLLEGE_INFO.mapsDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 text-xs font-bold transition-all cursor-pointer shrink-0"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
