import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

function getSmartFallbackReply(userMsg: string): string {
  const query = userMsg.toLowerCase();

  if (query.includes('register') || query.includes('link') || query.includes('form') || query.includes('apply')) {
    return `⚡ **Registration for INTELLECTRA 2026:**\n\n• **Registration Fee:** ₹150 Per Head\n• **Official Google Form:** [Click here to open Google Form](https://docs.google.com/forms/d/e/1FAIpQLSfwXzzHsKe_EibRqaOaZpvluRSMjpsVvL84-ejFNobm0IJflQ/viewform)\n• **On-Spot Registration:** Available at the Central Library Foyer on **12th October 2026** starting from 08:30 AM.\n• **Inclusions:** Entry to all events, certificates, and complimentary hot buffet lunch!`;
  }

  if (query.includes('fee') || query.includes('cost') || query.includes('price') || query.includes('pay') || query.includes('₹')) {
    return `💰 **Registration Fee Details:**\n\n• The registration fee is **₹150 Per Head**.\n• This fee grants full delegate access to all 7 competitive tracks, participation certificates, and a complimentary grand campus dining buffet + refreshments.\n• You can register online via our Google Form or on-spot at the venue.`;
  }

  if (query.includes('lunch') || query.includes('food') || query.includes('refreshment') || query.includes('eat') || query.includes('dinner')) {
    return `🍽️ **Dining & Hospitality:**\n\n• **Free Lunch Buffet:** Yes! Every registered delegate receives a complimentary hot buffet dining pass.\n• **High-Tea & Snacks:** Morning and evening tea/refreshments are provided during symposium breaks.\n• Dining hall is located in the APEC Campus Dining Pavilion.`;
  }

  if (query.includes('prize') || query.includes('cash') || query.includes('award') || query.includes('reward')) {
    return `🏆 **Cash Prizes & Trophies:**\n\n• **Total Prize Pool:** ₹15,000 awarded across competitions!\n• **Every Event:** 🥇 Winner: ₹1,000 Cash Prize | 🥈 Runner: ₹750 Cash Prize (One winner & one runner per event).\n• Custom trophies and merit certificates are presented at the Valedictory Ceremony (03:30 PM).`;
  }

  if (query.includes('event') || query.includes('hackathon') || query.includes('competition') || query.includes('track') || query.includes('bgmi') || query.includes('ui/ux') || query.includes('paper')) {
    return `🚀 **7 Flagship Competitions at INTELLECTRA 2026:**\n\n**Technical Events:**\n1. **Paper Presentation** — IEEE & Emerging Tech Research Defense (AV Hall • 10:30 AM)\n2. **Prompt Stack** — AI Tools & Rapid Prompt Engineering (Lab 3 • 10:30 AM)\n3. **Infographix** — UI/UX Design Sprint & Figma Prototype (Lab 2 • 10:30 AM)\n\n**Non-Technical Events:**\n4. **Booyah Battle** — Mobile Tactical Esports Tournament (Seminar Hall 2 • 02:00 PM)\n5. **Neurolink** — Cognitive Brain Teaser & Lateral Aptitude (Auditorium Foyer • 02:00 PM)\n6. **Checkmate Clash** — Rapid Swiss Chess Duel (Library Arena • 02:00 PM)\n7. **Auction Arena** — IPL Style Tech & Strategy Bidding War (Main Hall • 02:00 PM)\n\n*Prize for every event: Winner ₹1,000 | Runner ₹750!*`;
  }

  if (query.includes('contact') || query.includes('phone') || query.includes('coordinator') || query.includes('number') || query.includes('call') || query.includes('help')) {
    return `📞 **Registration & Helpdesk Coordinators:**\n\n• **Mr. D. Madhavan:** +91 8122580372\n• **Ms. P. Jayasri:** +91 9655777274\n• **Mr. L. Balaji:** +91 8608802727\n• **Ms. S. Mohanapriya:** +91 6374663499\n\n**Staff Coordinators:** Mrs. T. Sujatha (AP/IT) & Mr. K. Sivakumar (AP/IT)\n**HOD:** Dr. C. Dhayanand`;
  }

  if (query.includes('venue') || query.includes('where') || query.includes('location') || query.includes('reach') || query.includes('train') || query.includes('bus') || query.includes('map')) {
    return `📍 **Venue & Location Guidance:**\n\n• **Venue:** Central Library & IT Auditorium, Adhiparasakthi Engineering College (Autonomous), Melmaruvathur - 603319.\n• **Transit:** Located on NH-45 (GST Road). All South-bound express buses stop right in front of the college gate.\n• **Train:** Melmaruvathur Railway Station (MLMR) is just 1.2 km away.`;
  }

  if (query.includes('date') || query.includes('time') || query.includes('when') || query.includes('schedule')) {
    return `📅 **Symposium Schedule:**\n\n• **Date:** Monday, 12th October 2026\n• **Registration & Helpdesk:** 08:30 AM - 09:30 AM\n• **Inaugural Ceremony:** 09:30 AM - 10:15 AM\n• **Morning Events:** 10:30 AM - 01:00 PM\n• **Buffet Lunch:** 01:00 PM - 02:00 PM\n• **Afternoon Events:** 02:00 PM - 03:30 PM\n• **Valedictory & Prize Distribution:** 03:30 PM - 04:30 PM`;
  }

  return `👋 Hello! I am the **Intellectra AI Assistant**.\n\nI can answer questions about:\n• **Registration:** ₹150 / Head & Google Form link\n• **Events:** 7 Technical & Non-Technical competitions\n• **Hospitality:** Free buffet dining & campus amenities\n• **Coordinators:** Direct student & staff contact numbers\n• **Venue & Transit:** APEC Melmaruvathur campus details\n\nWhat would you like to know?`;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const SYSTEM_INSTRUCTION = `You are "Intellectra AI Assistant", the official virtual intelligence guide for INTELLECTRA 2026 — the National Level Technical Symposium organized by the Department of Information Technology at Adhiparasakthi Engineering College (Autonomous), Melmaruvathur.

Key Symposium Facts:
- Date: Monday, 12th October 2026, 09:00 AM IST.
- Venue: Central Library & IT Department Auditorium, Adhiparasakthi Engineering College (Autonomous), Melmaruvathur (NH-45, GST Road).
- Institution: Adhiparasakthi Engineering College (Autonomous, NAAC "A" Grade, AICTE approved, affiliated to Anna University, ISO 9001:2015).
- Registration Fee: ₹150 Per Head (covers all 7 competitive tracks, participation certificates, and kits). On-Spot registration is available on October 12 from 08:30 AM at the Central Library Foyer.
- Official Google Registration Form: https://docs.google.com/forms/d/e/1FAIpQLSfwXzzHsKe_EibRqaOaZpvluRSMjpsVvL84-ejFNobm0IJflQ/viewform
- Food & Hospitality: 100% Complimentary hot buffet lunch, morning tea, and evening refreshments are provided for every delegate.
- Prizes: ₹15,000 total cash prize pool! Every single event awards: 1st Place (Winner) = ₹1,000 Cash Prize, 2nd Place (Runner) = ₹750 Cash Prize (One winner and one runner per event), plus merit certificates and shields.

All 7 Events:
Technical Events:
1. Paper Presentation - Novel IEEE paper presentation & defense (AV Hall, 10:30 AM)
2. Prompt Stack - AI Tools & rapid prompt engineering challenge (Lab 3, 10:30 AM)
3. Infographix - UI/UX design sprint & Figma prototyping (Lab 2, 10:30 AM)

Non-Technical Events:
4. Booyah Battle - Mobile tactical esports showdown (Seminar Hall 2, 02:00 PM)
5. Neurolink - Cognitive brain teaser & rapid logic challenge (Auditorium Foyer, 02:00 PM)
6. Checkmate Clash - Rapid chess tournament (Central Library Arena, 02:00 PM)
7. Auction Arena - IPL-style budget valuation & bidding war (IT Main Hall, 02:00 PM)

Key Student Coordinators:
- Mr. D. Madhavan: 8122580372
- Ms. P. Jayasri: 9655777274
- Mr. L. Balaji: 8608802727
- Ms. S. Mohanapriya: 6374663499

Staff Coordinators & Leadership:
- Head of Department: Dr. C. Dhayanand, M.Tech., Ph.D.
- Faculty Coordinators: Mrs. T. Sujatha (AP/IT) & Mr. K. Sivakumar (AP/IT)
- Patron: Dr. V. Ramasamy, Principal

How to Reach:
- APEC is located on GST Road (NH-45), Melmaruvathur, Tamil Nadu.
- Melmaruvathur Railway Station (MLMR) is only 1.2 km away.

Tone & Style:
- Professional, futuristic, cyber-themed, friendly, concise, and helpful.
- Use markdown bullet points and bold highlights for readability.
- Guide delegates to register via the official Google Form or on-spot at the Central Library.`;

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Assistant Chat Route
  app.post('/api/assistant/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required.' });
      }

      // Check if GEMINI_API_KEY is configured
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
        return res.json({
          reply: getSmartFallbackReply(message),
          source: 'local_knowledge'
        });
      }

      // Format conversation contents for gemini-3.8-flash
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item && item.role && item.text) {
            contents.push({
              role: item.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: String(item.text) }],
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const text = response.text || getSmartFallbackReply(message);
      res.json({ reply: text, source: 'gemini' });
    } catch (err: any) {
      console.error('Error generating assistant response:', err);
      res.json({
        reply: getSmartFallbackReply(req.body?.message || ''),
        source: 'local_fallback'
      });
    }
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`INTELLECTRA 2026 server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
