import React from 'react';
import { 
  Calendar, Clock, Trophy, Utensils, 
  Award, MapPin, ArrowRight, Code2, Sparkles 
} from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreEventsClick: () => void;
  onPosterClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onRegisterClick,
  onExploreEventsClick,
}) => {
  return (
    <section className="relative pt-20 pb-14 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 overflow-hidden bg-[#030717]">
      {/* ============================================================== */}
      {/* LUMINOUS SILK WAVE CURVES & NEBULA LIGHT                       */}
      {/* ============================================================== */}
      {/* Cosmic background radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none -z-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, #08163E 0%, #03081A 50%, #020512 100%)'
        }}
      />

      {/* Flowing blue silk light wave on left */}
      <div 
        className="absolute top-10 -left-40 w-[350px] sm:w-[600px] h-[500px] sm:h-[750px] pointer-events-none -z-10 opacity-70 blur-2xl animate-wave-silk"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 180, 255, 0.35) 0%, rgba(37, 99, 235, 0.2) 40%, transparent 70%)'
        }}
        aria-hidden="true"
      />

      {/* Flowing purple/magenta silk light wave on right */}
      <div 
        className="absolute top-20 -right-40 w-[380px] sm:w-[650px] h-[550px] sm:h-[800px] pointer-events-none -z-10 opacity-75 blur-3xl animate-wave-silk"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.3) 0%, rgba(217, 70, 239, 0.22) 45%, transparent 75%)',
          animationDelay: '-4s'
        }}
        aria-hidden="true"
      />

      {/* Deep electric blue bottom-center wave glow */}
      <div 
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] sm:w-[900px] h-[250px] sm:h-[400px] pointer-events-none -z-10 opacity-60 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.25) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 80%)'
        }}
        aria-hidden="true"
      />

      {/* Fine ambient cyber grid texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-20" />

      {/* ============================================================== */}
      {/* MAIN HERO CONTENT CONTAINER (Pixel-Matched & Fully Responsive) */}
      {/* ============================================================== */}
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 text-center relative z-10 w-full overflow-hidden">
        
        {/* TOP LEFT INSTITUTION KICKER */}
        <div className="text-left mb-6 sm:mb-10 max-w-xs sm:max-w-md">
          <p className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-slate-200 uppercase font-sans leading-tight">
            ADHIPARASAKTHI
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-slate-300 uppercase font-sans leading-tight mt-0.5">
            ENGINEERING COLLEGE
          </p>
          {/* Magenta to Cyan Accent Underline */}
          <div className="w-12 sm:w-16 h-1 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400 mt-2 shadow-[0_0_8px_#EC4899]" />
        </div>

        {/* ============================================================== */}
        {/* CENTERED FUTURISTIC HEXAGONAL/CHAMFERED DATE & TIME BADGE      */}
        {/* ============================================================== */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="hex-chamfer-border inline-block max-w-full">
            <div 
              className="flex items-center justify-center gap-2 sm:gap-4 px-4 sm:px-8 py-2 sm:py-2.5 rounded-full bg-[#040C2A] text-white backdrop-blur-xl shadow-inner text-xs sm:text-sm"
            >
              {/* Date Box with glowing Cyan Calendar icon */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.6)] shrink-0">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-300" />
                </div>
                <span className="font-semibold tracking-wide text-slate-100 font-sans whitespace-nowrap">
                  12th October 2026
                </span>
              </div>

              {/* Vertical divider */}
              <span className="text-cyan-500/60 font-bold text-xs sm:text-sm">|</span>

              {/* Time Box with glowing Clock icon */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.6)] shrink-0">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-300" />
                </div>
                <span className="font-semibold tracking-wide text-slate-100 font-sans whitespace-nowrap">
                  09:00 AM IST
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DEPARTMENT PROUDLY PRESENTS LINE                               */}
        {/* ============================================================== */}
        <div className="max-w-2xl mx-auto mb-3 sm:mb-4 px-2">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-1">
            <span className="h-[1.5px] w-6 sm:w-16 bg-gradient-to-r from-transparent via-cyan-400 to-cyan-400 shadow-[0_0_8px_#00F0FF] shrink" />
            <p className="text-[10px] min-[360px]:text-[11px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] text-cyan-300 uppercase font-mono whitespace-nowrap">
              DEPARTMENT OF INFORMATION TECHNOLOGY
            </p>
            <span className="h-[1.5px] w-6 sm:w-16 bg-gradient-to-l from-transparent via-cyan-400 to-cyan-400 shadow-[0_0_8px_#00F0FF] shrink" />
          </div>
          <p className="text-[9px] min-[360px]:text-[10px] sm:text-xs font-semibold tracking-[0.25em] sm:tracking-[0.3em] text-slate-300 uppercase font-mono">
            PROUDLY PRESENTS
          </p>
        </div>

        {/* ============================================================== */}
        {/* MAIN COLLEGE NAME (Big Bold White Typography)                  */}
        {/* ============================================================== */}
        <div className="mb-4 sm:mb-6 px-1">
          <h2 className="text-lg min-[360px]:text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-display uppercase tracking-tight leading-[1.2] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            ADHIPARASAKTHI<br />
            ENGINEERING COLLEGE,<br />
            MELMARUVATHUR
          </h2>
          <p className="text-[10px] min-[360px]:text-[11px] sm:text-xs text-slate-300 font-medium mt-2 sm:mt-3 max-w-xl mx-auto leading-relaxed px-2">
            Approved by AICTE, New Delhi &bull; Affiliated to Anna University, Chennai &bull; ISO 9001:2015 Certified
          </p>
        </div>

        {/* ============================================================== */}
        {/* GRAND SYMPOSIUM TITLE - INTELLECTRA 2026 (100% RESPONSIVE)     */}
        {/* ============================================================== */}
        <div className="mt-3 sm:mt-6 mb-4 relative inline-block w-full max-w-full px-1">
          {/* Main Metallic Cyber Wordmark - Uses fluid responsive clamp so it NEVER wraps or overflows */}
          <div className="flex items-center justify-center w-full">
            <h1 className="text-[clamp(1.55rem,7.3vw,7.5rem)] font-black tracking-normal sm:tracking-tight font-display uppercase select-none leading-none inline-flex flex-nowrap items-center justify-center whitespace-nowrap">
              <span className="cyber-metallic-text">
                INTELLECT
              </span>
              <span className="cyber-magenta-text">
                RA
              </span>
            </h1>
          </div>

          {/* 2026 with Cyber Wing Chevrons */}
          <div className="flex items-center justify-center gap-2 sm:gap-5 mt-1 sm:mt-3">
            {/* Left cyber wing slashes (hidden on ultra-narrow, responsive on mobile) */}
            <div className="hidden min-[380px]:flex items-center gap-1 sm:gap-1.5 opacity-90 shrink-0">
              <span className="h-[2px] w-4 sm:w-12 bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="w-2 sm:w-3.5 h-[2px] sm:h-[3px] bg-cyan-400 -skew-x-[35deg] shadow-[0_0_6px_#00F0FF]" />
              <span className="w-2 sm:w-3.5 h-[2px] sm:h-[3px] bg-cyan-400 -skew-x-[35deg] shadow-[0_0_6px_#00F0FF]" />
              <span className="h-[2px] w-2 sm:w-6 bg-cyan-400" />
            </div>

            {/* Glowing 2026 Numbers */}
            <span className="text-3xl min-[360px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,240,255,0.7)] leading-tight">
              2026
            </span>

            {/* Right cyber wing slashes */}
            <div className="hidden min-[380px]:flex items-center gap-1 sm:gap-1.5 opacity-90 shrink-0">
              <span className="h-[2px] w-2 sm:w-6 bg-fuchsia-400" />
              <span className="w-2 sm:w-3.5 h-[2px] sm:h-[3px] bg-fuchsia-400 skew-x-[35deg] shadow-[0_0_6px_#EC4899]" />
              <span className="w-2 sm:w-3.5 h-[2px] sm:h-[3px] bg-fuchsia-400 skew-x-[35deg] shadow-[0_0_6px_#EC4899]" />
              <span className="h-[2px] w-4 sm:w-12 bg-gradient-to-l from-transparent to-fuchsia-400" />
            </div>
          </div>

          {/* Subtitle flanked by cyan lines */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2 sm:mt-4 px-2">
            <span className="h-[1.5px] w-5 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400 shadow-[0_0_8px_#00F0FF] shrink" />
            <p className="text-[10px] min-[360px]:text-xs sm:text-sm font-bold text-cyan-300 tracking-[0.12em] sm:tracking-[0.25em] uppercase font-mono whitespace-nowrap">
              NATIONAL LEVEL TECHNICAL SYMPOSIUM
            </p>
            <span className="h-[1.5px] w-5 sm:w-16 bg-gradient-to-l from-transparent to-cyan-400 shadow-[0_0_8px_#00F0FF] shrink" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* ACTION CTA BUTTONS (Register & Explore Events Only)            */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 mb-10 sm:mb-12 max-w-md sm:max-w-xl mx-auto w-full px-2">
          <button
            onClick={onRegisterClick}
            className="w-full sm:flex-1 px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 rounded-2xl transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2 group cursor-pointer border border-cyan-300/30"
          >
            <span>Register Now (₹150 / Head)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform shrink-0" />
          </button>

          <button
            onClick={onExploreEventsClick}
            className="w-full sm:flex-1 px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-cyan-300 bg-[#071330]/90 hover:bg-[#0B1E48] border border-cyan-400/50 hover:border-cyan-300 rounded-2xl transition-all shadow-[0_0_18px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:-translate-y-1 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Explore Events</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* KEY HIGHLIGHT BADGES GRID                                      */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-4xl mx-auto">
          <div className="p-3.5 sm:p-4 rounded-2xl glass-panel text-left hover-glow">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 mb-2">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_#F59E0B]" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight text-white">₹15,000 Prize Pool</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400">₹1,000 Winner &bull; ₹750 Runner</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl glass-panel text-left hover-glow">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 mb-2">
              <Utensils className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_#10B981]" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight text-white">Free Lunch &amp; Snacks</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400">Provided for every delegate</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl glass-panel text-left hover-glow">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30 mb-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_#00F0FF]" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight text-white">Autonomous College</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400">40+ Years Academic Heritage</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl glass-panel text-left hover-glow">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30 mb-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_#A855F7]" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight text-white">APEC Central Library</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400">Melmaruvathur Campus</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
