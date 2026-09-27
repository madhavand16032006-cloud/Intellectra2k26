import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, X, Send, Sparkles, MessageSquare, 
  ExternalLink, Calendar, Phone, MapPin, RefreshCw,
  ChevronDown, ArrowRight, Zap, Trophy, Shield
} from 'lucide-react';
import { COLLEGE_INFO, STUDENT_COORDINATORS } from '../data/symposiumData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionType?: 'register' | 'events' | 'contact' | 'venue';
}

interface IntellectraAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
  onRegisterClick?: () => void;
}

export const IntellectraAssistant: React.FC<IntellectraAssistantProps> = ({
  onRegisterClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: `⚡ **Welcome to INTELLECTRA 2026 Assistant!**\n\nI am your dedicated virtual guide for the National Level Technical Symposium on **October 12, 2026** at Adhiparasakthi Engineering College.\n\nAsk me anything about registrations, technical & non-technical events, ₹15,000 cash prizes (₹1,000 Winner & ₹750 Runner in every event), free buffet lunch, or coordinator contacts!`,
      timestamp: 'Just now',
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen, isMinimized]);

  const quickPrompts = [
    { label: '📝 How to Register', text: 'How do I register for INTELLECTRA 2026?' },
    { label: '💰 Fee & Lunch', text: 'What is the registration fee and is lunch provided?' },
    { label: '🏆 Prize Pool', text: 'What are the cash prizes for events?' },
    { label: '🚀 All 7 Events', text: 'What competitions and events are being conducted?' },
    { label: '📞 Helpdesk Phone', text: 'How can I contact student coordinators?' },
    { label: '📍 Venue & Transit', text: 'Where is the symposium and how do I reach?' },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "I am available to assist you with any questions regarding INTELLECTRA 2026!";

      let actionType: Message['actionType'] = undefined;
      const lower = text.toLowerCase();
      if (lower.includes('register') || lower.includes('fee')) actionType = 'register';
      else if (lower.includes('event') || lower.includes('competition')) actionType = 'events';
      else if (lower.includes('contact') || lower.includes('coordinator')) actionType = 'contact';
      else if (lower.includes('venue') || lower.includes('where') || lower.includes('reach')) actionType = 'venue';

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionType,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Failed to communicate with assistant endpoint:', err);
      // Smart offline fallback response
      const fallbackReply = `⚡ **INTELLECTRA 2026 Quick Info:**\n\n• **Date:** Monday, 12th October 2026 (09:00 AM IST)\n• **Venue:** Central Library, Adhiparasakthi Engineering College, Melmaruvathur\n• **Registration Fee:** ₹150 Per Head (Free hot buffet lunch & certificates included)\n• **Online Registration:** [Google Form Link](${COLLEGE_INFO.googleFormUrl})\n• **Coordinator Hotline:** +91 8122580372`;
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionType: 'register',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: `⚡ Conversation refreshed! How can I help you regarding **INTELLECTRA 2026**?`,
        timestamp: 'Just now',
      }
    ]);
  };

  // Render markdown bold and links cleanly
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      // Parse markdown bold **text** and links [text](url)
      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

      return (
        <p key={lineIdx} className={line === '' ? 'h-2' : 'leading-relaxed'}>
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className="text-white font-bold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
              const textMatch = part.match(/\[(.*?)\]/);
              const urlMatch = part.match(/\((.*?)\)/);
              const linkText = textMatch ? textMatch[1] : 'Link';
              const linkUrl = urlMatch ? urlMatch[1] : '#';
              return (
                <a
                  key={partIdx}
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 underline font-semibold hover:text-cyan-200 inline-flex items-center gap-0.5 ml-1"
                >
                  <span>{linkText}</span>
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
              );
            }
            return <span key={partIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Cyber Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#071330] via-[#0B1E48] to-[#140E36] border-2 border-cyan-400/70 hover:border-cyan-300 text-white shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl"
            aria-label="Open Intellectra AI Assistant"
          >
            {/* Pulsing indicator ring */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border border-slate-900"></span>
            </span>

            {/* Glowing Bot / Lightning Icon */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_12px_#00F0FF]">
              <Zap className="w-4 h-4 fill-white animate-pulse" />
            </div>

            <div className="text-left hidden min-[360px]:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black tracking-wider font-display uppercase text-white">
                  INTELLECTRA
                </span>
                <span className="px-1.5 py-0.2 rounded-sm bg-cyan-400/20 text-[9px] font-mono font-bold text-cyan-300 border border-cyan-400/40">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-cyan-300/90 font-mono font-semibold">
                Online &bull; Ask Questions
              </p>
            </div>
          </button>
        </div>
      )}

      {/* Cyberpunk Chat Assistant Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col ${
            isMinimized
              ? 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-72 sm:w-80 h-14'
              : 'bottom-2 right-2 sm:bottom-6 sm:right-6 w-[calc(100vw-16px)] sm:w-[420px] md:w-[460px] h-[580px] max-h-[90vh]'
          } rounded-2xl sm:rounded-3xl bg-[#060D24]/98 border border-cyan-400/60 shadow-[0_0_40px_rgba(0,240,255,0.25)] backdrop-blur-2xl overflow-hidden`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#08153A] via-[#091D4E] to-[#120B30] border-b border-cyan-500/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-[0_0_10px_#00F0FF] shrink-0">
                <Zap className="w-4 h-4 fill-white" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-black text-white font-display uppercase tracking-wider">
                    INTELLECTRA ASSISTANT
                  </h3>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/60 text-emerald-300 text-[9px] font-mono font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-[10px] text-cyan-300/80 font-mono">
                  Symposium Intelligence &bull; Gemini 3.8
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1">
              {!isMinimized && (
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition-colors cursor-pointer"
                  title="Reset Chat"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800/60 transition-colors cursor-pointer"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body when not minimized */}
          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-slate-200">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] p-3 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-xs shadow-md border border-cyan-400/40'
                          : 'bg-[#0B1736] border border-cyan-500/25 text-slate-200 rounded-bl-xs shadow-lg'
                      }`}
                    >
                      {renderFormattedText(msg.text)}

                      {/* Interactive Context Action Button */}
                      {msg.actionType === 'register' && (
                        <div className="mt-2.5 pt-2 border-t border-cyan-500/20 flex flex-wrap gap-1.5">
                          <a
                            href={COLLEGE_INFO.googleFormUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-[10px] font-mono shadow-sm cursor-pointer"
                          >
                            <span>Open Official Google Form</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                      {msg.actionType === 'events' && (
                        <div className="mt-2.5 pt-2 border-t border-cyan-500/20 flex flex-wrap gap-1.5">
                          <a
                            href="#events"
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-[10px] font-mono border border-cyan-400/30 cursor-pointer"
                          >
                            <span>Browse 7 Competition Tracks</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                      {msg.actionType === 'contact' && (
                        <div className="mt-2.5 pt-2 border-t border-cyan-500/20 flex flex-wrap gap-1.5">
                          <a
                            href={`tel:${STUDENT_COORDINATORS[0].phone}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] font-mono shadow-sm cursor-pointer"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Lead Coordinator</span>
                          </a>
                        </div>
                      )}
                    </div>

                    <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#0B1736] border border-cyan-500/25 w-36">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-[10px] text-cyan-300 font-mono">Thinking...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Chips */}
              <div className="px-3 py-2 bg-[#04091B] border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {quickPrompts.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip.text)}
                    disabled={isLoading}
                    className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-cyan-500/20 border border-slate-700/80 hover:border-cyan-400/50 text-[10px] font-mono text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-[#050C24] border-t border-cyan-500/25 flex items-center gap-2 shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about events, fee, food, contacts..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900/90 text-xs text-white border border-slate-700 focus:border-cyan-400 focus:outline-hidden font-sans placeholder:text-slate-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-white font-bold transition-all shadow-[0_0_12px_rgba(0,240,255,0.4)] cursor-pointer shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};
