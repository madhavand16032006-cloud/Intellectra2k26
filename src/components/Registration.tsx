import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, CheckCircle, ExternalLink, 
  Phone, Copy, Check, Download, ShieldCheck
} from 'lucide-react';
import { COLLEGE_INFO, STUDENT_COORDINATORS } from '../data/symposiumData';

interface RegistrationProps {
  preselectedEventId?: string;
}

export const Registration: React.FC<RegistrationProps> = () => {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [copiedFormLink, setCopiedFormLink] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    // Generate real, high-resolution scannable QR code matching the exact Google Form URL
    QRCode.toDataURL(COLLEGE_INFO.googleFormUrl, {
      width: 400,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#03081A',
        light: '#FFFFFF'
      }
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code:', err));
  }, []);

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const handleCopyFormLink = () => {
    navigator.clipboard.writeText(COLLEGE_INFO.googleFormUrl);
    setCopiedFormLink(true);
    setTimeout(() => setCopiedFormLink(false), 2000);
  };

  return (
    <section id="register" className="py-16 sm:py-20 relative z-20 border-t border-cyan-500/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 text-xs font-semibold mb-3 font-mono">
            <QrCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>OFFICIAL GOOGLE REGISTRATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
            Online &amp; On-Spot Registration
          </h2>
          <p className="text-xs sm:text-base text-slate-300 mt-2 font-mono">
            INTELLECTRA 2K26 &bull; ₹150 Per Head &bull; Free Lunch &amp; Cash Prizes
          </p>
        </div>

        {/* 2-Column Responsive Layout: QR Code + Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left: Official QR & Direct Form Link (6 cols) */}
          <div className="lg:col-span-6 p-5 sm:p-8 rounded-3xl bg-[#0A1020]/90 border border-cyan-500/30 shadow-xl flex flex-col items-center text-center justify-between backdrop-blur-xl">
            <div className="w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[11px] sm:text-xs font-semibold mb-4 font-mono">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>₹150 PER HEAD &bull; ON-SPOT AVAILABLE</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Scan QR to Register
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 max-w-sm mx-auto leading-relaxed">
                Scan with Google Lens, Paytm, WhatsApp, or any mobile camera to open the official Google Registration Form.
              </p>

              {/* High-Resolution Dynamic Scannable QR Code */}
              <div className="my-5 inline-block p-3.5 sm:p-5 rounded-2xl bg-white border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-transform hover:scale-[1.02]">
                {qrCodeDataUrl ? (
                  <img 
                    src={qrCodeDataUrl} 
                    alt="Official Google Registration Form QR Code - INTELLECTRA 2026" 
                    className="w-44 h-44 sm:w-52 sm:h-52 mx-auto object-contain"
                  />
                ) : (
                  <div className="w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center text-slate-700 font-mono text-xs">
                    Generating Official QR...
                  </div>
                )}
                <p className="mt-2 text-[10px] sm:text-[11px] font-mono font-bold text-slate-900 tracking-wider">
                  SCAN TO REGISTER NOW
                </p>
              </div>
            </div>

            {/* Action Buttons for Form Link */}
            <div className="w-full space-y-2.5">
              <a
                href={COLLEGE_INFO.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-cyan-300/30"
              >
                <span>Open Official Google Registration Form</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyFormLink}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedFormLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copiedFormLink ? 'Copied Form Link!' : 'Copy Form Link'}</span>
                </button>

                {qrCodeDataUrl && (
                  <a
                    href={qrCodeDataUrl}
                    download="INTELLECTRA_2026_Registration_QR.png"
                    className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    title="Download QR Image"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Save QR</span>
                  </a>
                )}
              </div>

              <p className="text-[11px] text-slate-400 font-mono text-center pt-1">
                Adhiparasakthi Engineering College &bull; Central Library Foyer
              </p>
            </div>
          </div>

          {/* Right: Registration Highlights & Coordinators Helpdesk (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            
            {/* Highlights Box */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#0A1020]/90 border border-cyan-500/25 shadow-lg backdrop-blur-xl">
              <h4 className="text-sm sm:text-base font-bold text-white font-display mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <span>Symposium Registration Highlights</span>
              </h4>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-base sm:text-lg">💰</span>
                  <div>
                    <strong className="text-white block font-sans">Registration Fee: ₹150 Per Head</strong>
                    <span className="text-slate-400 text-[11px]">Covers all 7 technical &amp; non-technical events and participation credentials.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-base sm:text-lg">🍽️</span>
                  <div>
                    <strong className="text-white block font-sans">Free Lunch &amp; Refreshment</strong>
                    <span className="text-slate-400 text-[11px]">Complimentary campus dining buffet and morning/evening high-tea included for all delegates.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-base sm:text-lg">🏆</span>
                  <div>
                    <strong className="text-white block font-sans">Exciting Cash Prizes (₹15,000 Pool)</strong>
                    <span className="text-slate-400 text-[11px]">₹1,000 for Winner &amp; ₹750 for Runner across all events (One winner &amp; one runner per event).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-base sm:text-lg">📍</span>
                  <div>
                    <strong className="text-white block font-sans">On-Spot Registration Available</strong>
                    <span className="text-slate-400 text-[11px]">APEC Central Library Foyer on 12th October 2026 from 08:30 AM onwards.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Coordinators Helpline for Registration */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#0A1020]/90 border border-cyan-500/25 shadow-lg backdrop-blur-xl">
              <h4 className="text-xs sm:text-sm font-bold text-white font-display mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Registration Helpdesk Contacts</span>
                </span>
                <span className="text-[10px] text-cyan-400 font-mono">Student Coordinators</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STUDENT_COORDINATORS.map((coord) => (
                  <div 
                    key={coord.name}
                    className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2"
                  >
                    <div className="text-left">
                      <p className="text-xs font-bold text-white leading-tight">{coord.name}</p>
                      <p className="text-[11px] text-cyan-300 font-mono">{coord.phone}</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={`tel:${coord.phone}`}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors cursor-pointer"
                        title="Call Coordinator"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleCopyPhone(coord.phone || '')}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        title="Copy phone"
                      >
                        {copiedPhone === coord.phone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
