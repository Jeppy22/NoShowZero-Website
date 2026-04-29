# NoShowZero — Claude Code Project Instructions

## What This Project Is
NoShowZero is a B2B SaaS landing page for an AI automation agency that helps dental and medical practices:
- Reduce no-shows with AI-personalized reminder emails
- Auto-detect patient confirmations (Y reply detection)
- Reactivate inactive/no-show patients automatically
- Notify office managers in real time

**Owner:** Jeffrey Madden  
**Email:** jeffrey@noshowzero.tech  
**Domain:** noshowzero.vercel.app  
**Tagline:** Zero No-Shows. Zero Effort.

---

## Tech Stack
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Email:** Nodemailer (contact form submissions)
- **Deployment:** Vercel
- **Fonts:** Use Google Fonts via next/font — NOT Inter or Roboto

## Design System
```
Background:    #0D1B2A  (dark navy)
Surface:       #132236  (card background)
Border:        #1E3A5F  (subtle borders)
Accent:        #00C2A8  (teal — primary CTA color)
Accent Hover:  #00A896
Text Primary:  #F0F4F8
Text Muted:    #8CA0B5
Danger:        #FF6B6B
Success:       #00C2A8
```

**Typography:** 
- Display/Headlines: `Syne` (Google Font) — bold, geometric
- Body: `DM Sans` (Google Font) — clean, readable
- Mono/Stats: `JetBrains Mono` — for numbers and metrics

**Component rules:**
- Buttons: teal background, navy text, rounded-full, font-bold
- Cards: surface background, border border-color, rounded-2xl
- Section padding: py-24 px-6 max-w-6xl mx-auto
- Never use white backgrounds — always dark navy or surface

---

## Project File Map
```
chairfill-ai/
├── CLAUDE.md                     ← You are here
├── app/
│   ├── layout.tsx                ← Root layout, fonts, metadata
│   ├── page.tsx                  ← Full landing page
│   ├── globals.css               ← Tailwind + custom CSS
│   └── api/
│       └── contact/
│           └── route.ts          ← Contact form API (Nodemailer)
├── components/
│   ├── Navbar.tsx                ← Sticky nav with CTA
│   ├── Hero.tsx                  ← Hero section
│   ├── ProblemSection.tsx        ← 3 pain points
│   ├── HowItWorks.tsx            ← 3-step flow diagram
│   ├── Results.tsx               ← Stats / social proof
│   ├── Pricing.tsx               ← Pricing card
│   ├── ContactForm.tsx           ← Lead capture form
│   └── Footer.tsx                ← Footer
├── public/
│   └── og-image.png              ← Social share image (create later)
├── .env.local                    ← Never commit — local secrets
├── .env.example                  ← Commit this — shows required vars
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## Environment Variables Required
```bash
# .env.local (never commit)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=jeffrey@noshowzero.tech
SMTP_PASS=your-gmail-app-password
CONTACT_EMAIL=jeffrey@noshowzero.tech
```

To get Gmail App Password:
1. Enable 2FA on Google account
2. Go to myaccount.google.com → Security → App Passwords
3. Generate password for "Mail"
4. Paste into SMTP_PASS

---

## Landing Page Sections (in order)
1. **Navbar** — Logo left, "Book a Demo" CTA right, sticky
2. **Hero** — Big headline, subheadline, two CTAs (Book Demo + See How It Works)
3. **Problem** — 3 pain point cards (no-shows cost money, manual follow-up fails, inactive patients disappear)
4. **How It Works** — 3-step numbered flow (Reminder → Confirmation → Reactivation)
5. **Results** — 3 stat callouts (50% no-show reduction, 2 appointments = ROI, 0 staff hours)
6. **Pricing** — Single plan card: $997 setup + $397/month retainer. Include ROI calculator text.
7. **Contact Form** — Name, Practice Name, Phone, Email, Message. Submits to /api/contact
8. **Footer** — Logo, tagline, jeffrey@noshowzero.tech, © 2026 NoShowZero

---

## Contact Form Behavior
- On submit: show loading spinner
- On success: replace form with "We'll be in touch within 24 hours" message (green)
- On error: show inline error message (red), keep form data intact
- Validate: all fields required, valid email format
- API route sends email to jeffrey@noshowzero.tech with all fields

---

## Deployment Checklist
- [ ] `npm run build` passes with zero errors
- [ ] Contact form submits and email arrives
- [ ] Mobile responsive (test at 375px)
- [ ] Page load under 3s
- [x] Meta title: "NoShowZero — Zero No-Shows. Zero Effort."
- [ ] Meta description: "AI-powered appointment reminders, confirmation tracking, and patient reactivation for dental practices. Zero staff required."
- [ ] Deploy to Vercel, add environment variables in dashboard
- [ ] Point noshowzero.vercel.app DNS to Vercel

---

## Commands
```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
```

---

## Style Rules (Never Break These)
1. Never use white or light backgrounds — always dark navy (#0D1B2A)
2. Never use Inter, Roboto, or Arial — use Syne + DM Sans
3. All CTA buttons use teal (#00C2A8) with navy text
4. All section headings use Syne font, font-bold
5. Keep copy sharp and benefit-focused — no fluff
6. Mobile-first responsive design on every component
