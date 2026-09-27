import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { About } from './components/About';
import { Events } from './components/Events';
import { PerksAndFaq } from './components/PerksAndFaq';
import { PosterSection } from './components/PosterSection';
import { Schedule } from './components/Schedule';
import { Registration } from './components/Registration';
import { VenueMap } from './components/VenueMap';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { IntellectraAssistant } from './components/IntellectraAssistant';

export default function App() {
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(undefined);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  const handleRegisterClick = () => {
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreEventsClick = () => {
    const el = document.getElementById('events');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectEventForRegistration = (eventId: string) => {
    setSelectedEventId(eventId);
    handleRegisterClick();
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 relative bg-[#060913] text-slate-100 overflow-x-hidden">
        {/* Dynamic Canvas Animated Background */}
        <AnimatedBackground />

        {/* Top Header Navbar */}
        <Navbar
          onRegisterClick={handleRegisterClick}
          onPosterClick={() => setIsPosterModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">
          {/* Hero Section */}
          <Hero
            onRegisterClick={handleRegisterClick}
            onExploreEventsClick={handleExploreEventsClick}
            onPosterClick={() => setIsPosterModalOpen(true)}
          />

          {/* Live Countdown Timer Section */}
          <Countdown />

          {/* About Section */}
          <About />

          {/* Official Poster Section (100% Authentic Official Poster Image) */}
          <PosterSection
            isModalOpen={isPosterModalOpen}
            onCloseModal={() => setIsPosterModalOpen(false)}
          />

          {/* Events Showcase */}
          <Events
            onSelectEventForRegistration={handleSelectEventForRegistration}
          />

          {/* Delegate Perks & Guidelines */}
          <PerksAndFaq
            onSelectEvent={handleSelectEventForRegistration}
          />

          {/* Schedule Timeline */}
          <Schedule />

          {/* Registration Section (Official QR Code & Direct Registration Link) */}
          <Registration
            preselectedEventId={selectedEventId}
          />

          {/* Map & Venue Guidance */}
          <VenueMap />

          {/* Contact & Support Desk */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Intellectra AI Assistant Floating Hub */}
        <IntellectraAssistant
          onRegisterClick={handleRegisterClick}
        />
      </div>
    </ThemeProvider>
  );
}
