# NoShowZero — Landing Page

AI automation for dental and medical practices. Built with Next.js 16, Tailwind CSS, and Nodemailer.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in your SMTP credentials in .env.local

# 3. Start development server
npm run dev
# Open http://localhost:3000
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Your Gmail address |
| `SMTP_PASS` | Gmail App Password (not your real password) |
| `CONTACT_EMAIL` | Where form submissions go |

### Getting a Gmail App Password
1. Enable 2-Step Verification on your Google account
2. Go to [myaccount.google.com](https://myaccount.google.com) → Security → App Passwords
3. Select "Mail" and generate
4. Paste the 16-character password into `SMTP_PASS`

---

## Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
# Follow prompts, add env vars when asked
```

### Option B — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Add environment variables in Project Settings → Environment Variables
4. Deploy

### Point Your Domain
1. Register `noshowzero.tech` (Namecheap, GoDaddy, etc.)
2. In Vercel: Project → Settings → Domains → Add Domain
3. Follow Vercel's DNS instructions for your registrar

---

## Project Structure

```
noshowzero/
├── CLAUDE.md          ← Claude Code project instructions (read this first)
├── app/
│   ├── layout.tsx     ← Fonts, metadata, root layout
│   ├── page.tsx       ← Full landing page (all sections)
│   ├── globals.css    ← Tailwind + custom design tokens
│   └── api/contact/
│       └── route.ts   ← Contact form API (Nodemailer)
├── .env.example       ← Required env var template
├── .env.local         ← Your secrets (never commit)
├── tailwind.config.ts ← Design system tokens
├── next.config.ts
└── vercel.json
```

---

## Making Changes with Claude Code

Open this project in Claude Code — it will automatically read `CLAUDE.md` for full context on the design system, tech stack, and component structure.

Example prompts:
- *"Add a testimonials section after the Results section"*
- *"Change the pricing to $497/month and update the ROI copy"*
- *"Add a FAQ section with 5 common objections"*
- *"Make the hero headline animate in word by word"*

---

## Commands

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Navy | `#0D1B2A` | Page background |
| Surface | `#132236` | Card backgrounds |
| Border | `#1E3A5F` | Borders, dividers |
| Teal | `#00C2A8` | CTAs, accents |
| Text Primary | `#F0F4F8` | Headlines, body |
| Text Muted | `#8CA0B5` | Subtitles, labels |

**Fonts:** Syne (display) + DM Sans (body) + JetBrains Mono (numbers)

---

Built by Jeffrey Madden — NoShowZero © 2026
