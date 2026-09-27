import React, { useState } from 'react';
import { 
  Users, Clock, Trophy, CheckCircle2, ChevronRight, X, 
  PhoneCall, Zap, Target, ArrowRight, Sparkles, FileText, 
  Code2, Palette, Gamepad2, Brain, Crown, Gavel, Award, Medal
} from 'lucide-react';
import { EVENTS } from '../data/symposiumData';
import { EventItem } from '../types';
import { audioFX } from '../utils/audioFX';
import { EventHologramIcon } from './EventHologramIcon';

interface EventsProps {
  onSelectEventForRegistration: (eventId: string) => void;
}

export const Events: React.FC<EventsProps> = ({ onSelectEventForRegistration }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'technical' | 'non-technical'>('all');
  const [selectedModalEvent, setSelectedModalEvent] = useState<EventItem | null>(null);

  const technicalEvents = EVENTS.filter((e) => e.category === 'technical');
  const nonTechnicalEvents = EVENTS.filter((e) => e.category === 'non-technical');

  const getEventIcon = (id: string) => {
    switch (id) {
      case 'paper-presentation':
        return <FileText className="w-4 h-4 text-cyan-400" />;
      case 'prompt-stack':
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'infographix-uiux':
        return <Palette className="w-4 h-4 text-cyan-400" />;
      case 'booyah-battle':
        return <Gamepad2 className="w-4 h-4 text-cyan-400" />;
      case 'neurolink':
        return <Brain className="w-4 h-4 text-cyan-400" />;
      case 'checkmate-clash':
        return <Crown className="w-4 h-4 text-cyan-400" />;
      case 'auction-arena':
        return <Gavel className="w-4 h-4 text-cyan-400" />;
      default:
        return <Zap className="w-4 h-4 text-cyan-400" />;
    }
  };

  // Render a single Cyberpunk HUD Card matching the uploaded reference UI
  const renderEventCard = (event: EventItem) => {
    const isTech = event.category === 'technical';

    return (
      <div
        key={event.id}
        className="group relative rounded-[28px] bg-gradient-to-b from-[#050C24] via-[#04091E] to-[#030718] border border-cyan-500/35 p-6 sm:p-7 flex flex-col justify-between shadow-[0_0_30px_rgba(0,180,255,0.14)] hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] hover:border-cyan-400/80 transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-xl"
      >
        {/* ============================================================== */}
        {/* SCI-FI COCKPIT CORNER BRACKETS / NOTCHES                       */}
        {/* ============================================================== */}
        <span className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400/70 rounded-tl-sm pointer-events-none group-hover:border-cyan-300 transition-colors" />
        <span className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400/70 rounded-tr-sm pointer-events-none group-hover:border-cyan-300 transition-colors" />
        <span className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400/70 rounded-bl-sm pointer-events-none group-hover:border-cyan-300 transition-colors" />
        <span className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400/70 rounded-br-sm pointer-events-none group-hover:border-cyan-300 transition-colors" />

        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" />

        <div>
          {/* ============================================================ */}
          {/* TOP BADGE (Exact Match to Reference UI)                       */}
          {/* ============================================================ */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08153A]/90 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
              {getEventIcon(event.id)}
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-cyan-300">
                {event.badgeLabel || event.title.toUpperCase()}
              </span>
            </div>

            {/* Track badge */}
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
              isTech 
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40' 
                : 'bg-purple-950/80 text-purple-300 border-purple-500/40'
            }`}>
              {isTech ? '⚡ TECHNICAL' : '🎯 NON-TECH'}
            </span>
          </div>

          {/* ============================================================ */}
          {/* CENTRAL 3D HOLOGRAM WITH ORBITAL RING & SPARKLE               */}
          {/* ============================================================ */}
          <div className="py-2 flex items-center justify-center">
            <EventHologramIcon eventId={event.id} className="w-full h-44" />
          </div>

          {/* ============================================================ */}
          {/* BOLD TWO-TONE TITLE (Exact Match to Reference UI)            */}
          {/* ============================================================ */}
          <div className="mt-2 text-left">
            <h3 className="tracking-tight leading-none">
              <span className="text-white text-3xl sm:text-4xl font-extrabold font-display block">
                {event.titleLine1 || event.title.split(' ')[0]}
              </span>
              <span className="cyber-metallic-text text-3xl sm:text-4xl font-extrabold font-display block mt-1 drop-shadow-[0_0_16px_rgba(0,240,255,0.4)]">
                {event.titleLine2 || event.title.split(' ').slice(1).join(' ') || event.title}
              </span>
            </h3>
          </div>

          {/* ============================================================ */}
          {/* SUBTITLE DESCRIPTION (Clean Multi-Line Prose)                */}
          {/* ============================================================ */}
          <p className="text-sm text-slate-300 mt-3 leading-relaxed text-left min-h-[42px] line-clamp-2">
            {event.shortTagline}
          </p>

          {/* ============================================================ */}
          {/* ACCENT GRADIENT BAR (Exact Match to Reference UI)             */}
          {/* ============================================================ */}
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 my-4 shadow-[0_0_10px_#00F0FF]" />

          {/* ============================================================ */}
          {/* METADATA STATS ROW (1-3 Members | 10:30 AM)                   */}
          {/* ============================================================ */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono py-1">
            <div className="flex items-center gap-2 text-slate-200">
              <Users className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{event.teamSize}</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-300">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{event.time}</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* PRIZE BREAKDOWN (Winner: ₹1,000 | Runner: ₹750)              */}
          {/* ============================================================ */}
          <div className="mt-3 p-3 rounded-2xl bg-[#081436]/90 border border-cyan-500/30 flex items-center justify-between text-xs font-mono shadow-inner">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 text-sm">🥇</span>
              <span className="text-slate-300">Winner:</span>
              <span className="text-amber-300 font-bold text-sm">₹1,000</span>
            </div>
            <span className="text-cyan-500/50">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-300 text-sm">🥈</span>
              <span className="text-slate-300">Runner:</span>
              <span className="text-cyan-300 font-bold text-sm">₹750</span>
            </div>
          </div>
          <div className="text-[10px] text-cyan-400/80 font-mono text-center mt-1">
            &bull; 1 Winner &bull; 1 Runner &bull; Official Trophies &bull;
          </div>

          {/* ============================================================ */}
          {/* HAIRLINE DIVIDER & FOCUS SKILLS TAGS                         */}
          {/* ============================================================ */}
          <div className="border-t border-cyan-500/20 my-4 pt-3 text-left">
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold mb-1">
              <Target className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Focus</span>
            </div>
            <p className="text-xs text-slate-300 font-mono">
              {event.skills.join('  •  ')}
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BOTTOM ACTION BUTTON (Pill with Gradient Border & Arrow Circle) */}
        {/* ============================================================== */}
        <div className="mt-5 space-y-2">
          {/* Primary Action Button (Matches Reference UI) */}
          <button
            onClick={() => {
              audioFX.playLaserWhoosh();
              onSelectEventForRegistration(event.id);
            }}
            className="group/btn relative w-full p-[1.5px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_18px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all cursor-pointer overflow-hidden active:scale-[0.99]"
          >
            <div className="flex items-center justify-between w-full px-4 sm:px-5 py-3 rounded-full bg-[#071330] group-hover/btn:bg-[#0B1E48] transition-colors">
              <div className="flex items-center gap-2.5 truncate">
                {getEventIcon(event.id)}
                <span className="font-mono text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                  {event.title}
                </span>
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shrink-0 ml-2 group-hover/btn:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* Secondary Details & Rules Button */}
          <button
            onClick={() => {
              audioFX.playClick();
              setSelectedModalEvent(event);
            }}
            className="w-full py-2 px-3 text-[11px] font-mono font-medium text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
          >
            <span>View Rounds, Rules &amp; Coordinators</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="events" className="py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* SECTION HEADER & PRIZE POOL ANNOUNCEMENT                       */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2 font-mono">
            National Technical Symposium &bull; Oct 12, 2026
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight text-balance">
            Symposium Event Arenas
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            Choose your battleground. High-stakes technical challenges and strategic non-technical tournaments.
          </p>

          {/* ============================================================ */}
          {/* OFFICIAL PRIZE POOL BANNER (₹15,000 Total Pool)              */}
          {/* ============================================================ */}
          <div className="mt-6 p-4 rounded-3xl bg-gradient-to-r from-[#071330] via-[#0B1E48] to-[#120B30] border border-cyan-400/50 shadow-[0_0_30px_rgba(0,240,255,0.2)] max-w-2xl mx-auto backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_#F59E0B]" />
                <span className="font-extrabold text-sm sm:text-base text-white">₹15,000 Prize Pool</span>
              </div>
              <span className="text-cyan-500 font-bold hidden sm:inline">&bull;</span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-bold">
                  🥇 Winner: ₹1,000
                </span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-bold">
                  🥈 Runner: ₹750
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 font-mono mt-2 text-center">
              All events award <strong className="text-white">One Winner (₹1,000)</strong> and <strong className="text-white">One Runner (₹750)</strong> + Merit Certificates &amp; Trophies!
            </p>
          </div>

          {/* ============================================================ */}
          {/* INTERACTIVE SEGMENTED CATEGORY TABS                          */}
          {/* ============================================================ */}
          <div className="inline-flex items-center p-1.5 bg-[#08122A]/90 border border-cyan-500/35 rounded-2xl shadow-xl mt-8 backdrop-blur-md">
            <button
              onClick={() => {
                audioFX.playClick();
                setActiveTab('all');
              }}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer font-mono ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              All Events ({EVENTS.length})
            </button>

            <button
              onClick={() => {
                audioFX.playClick();
                setActiveTab('technical');
              }}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer font-mono flex items-center gap-1.5 ${
                activeTab === 'technical'
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>⚡ Technical</span>
              <span className="opacity-80">({technicalEvents.length})</span>
            </button>

            <button
              onClick={() => {
                audioFX.playClick();
                setActiveTab('non-technical');
              }}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer font-mono flex items-center gap-1.5 ${
                activeTab === 'non-technical'
                  ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>🎯 Non-Technical</span>
              <span className="opacity-80">({nonTechnicalEvents.length})</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TRACK 1: TECHNICAL EVENTS SECTION                              */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'technical') && (
          <div className="mb-16">
            <div className="flex items-center justify-between border-b border-cyan-500/25 pb-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Morning Session &bull; 10:30 AM Tracks</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-0.5">
                  Technical Events Track
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300">
                3 Events &bull; ₹1,000 / ₹750 Each
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {technicalEvents.map(renderEventCard)}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TRACK 2: NON-TECHNICAL EVENTS SECTION                          */}
        {/* ============================================================== */}
        {(activeTab === 'all' || activeTab === 'non-technical') && (
          <div>
            <div className="flex items-center justify-between border-b border-purple-500/25 pb-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span>Afternoon Session &bull; 02:00 PM Tracks</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-0.5">
                  Non-Technical Events Track
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/40 text-purple-300">
                4 Events &bull; ₹1,000 / ₹750 Each
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {nonTechnicalEvents.map(renderEventCard)}
            </div>
          </div>
        )}

      </div>

      {/* ================================================================ */}
      {/* DETAILED EVENT SPECIFICATION MODAL                               */}
      {/* ================================================================ */}
      {selectedModalEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedModalEvent(null)}
        >
          <div 
            className="bg-[#050C24] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-cyan-400/60 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedModalEvent(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title & Category */}
            <div className="mb-4 pr-10">
              <span className="text-xs font-bold tracking-wider uppercase text-cyan-400 block mb-1 font-mono">
                {selectedModalEvent.category === 'technical' ? '⚡ Technical Event Track' : '🎯 Non-Technical Event Track'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {selectedModalEvent.title}
              </h3>
              <p className="text-sm font-semibold text-slate-300 mt-1 font-mono">
                {selectedModalEvent.shortTagline}
              </p>
            </div>

            {/* Prize & Spec Card */}
            <div className="p-4 rounded-2xl bg-[#091538] border border-cyan-500/40 mb-6">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 pb-3 border-b border-cyan-500/20">
                <span className="flex items-center gap-1.5 font-bold">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Award Allocation:</span>
                </span>
                <span className="text-white font-bold">1 Winner &amp; 1 Runner</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <span className="text-slate-400 text-[11px] block">🥇 1st Place (Winner)</span>
                  <span className="text-amber-300 font-extrabold text-base">₹1,000 Cash Prize</span>
                  <span className="text-[10px] text-slate-400 block">+ Merit Certificate &amp; Trophy</span>
                </div>
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                  <span className="text-slate-400 text-[11px] block">🥈 2nd Place (Runner)</span>
                  <span className="text-cyan-300 font-extrabold text-base">₹750 Cash Prize</span>
                  <span className="text-[10px] text-slate-400 block">+ Merit Certificate &amp; Shield</span>
                </div>
              </div>
            </div>

            {/* Event Key Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs mb-6 font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">Team Size</span>
                <span className="font-bold text-slate-100">{selectedModalEvent.teamSize}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Timing</span>
                <span className="font-bold text-cyan-300">{selectedModalEvent.time}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[10px]">Venue</span>
                <span className="font-bold text-slate-100 truncate block" title={selectedModalEvent.venue}>
                  {selectedModalEvent.venue}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">
                Event Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedModalEvent.description}
              </p>
            </div>

            {/* Rounds */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">
                Competition Rounds
              </h4>
              <div className="space-y-2">
                {selectedModalEvent.rounds.map((round, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{round}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">
                Rules &amp; Guidelines
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedModalEvent.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Event Coordinators */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">
                Event Student Coordinators
              </h4>
              <div className="flex flex-wrap gap-4 text-xs">
                {selectedModalEvent.coordinators.map((coord) => (
                  <a
                    key={coord.name}
                    href={`tel:${coord.phone}`}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 font-semibold"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{coord.name} ({coord.phone})</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedModalEvent(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const eventId = selectedModalEvent.id;
                  setSelectedModalEvent(null);
                  audioFX.playLaserWhoosh();
                  onSelectEventForRegistration(eventId);
                }}
                className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
              >
                Proceed to Register for {selectedModalEvent.title}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
