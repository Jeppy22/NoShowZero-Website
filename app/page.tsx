"use client";

import { useState, useEffect, useRef } from "react";

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── COUNT-UP HOOK ────────────────────────────────────────────────────────────
function useCountUp(
  target: number,
  durationMs: number,
  triggered: boolean
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    if (target === 0) {
      setValue(0);
      return;
    }
    let rafId = 0;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [triggered, target, durationMs]);

  return value;
}

// ─── PARTICLES ────────────────────────────────────────────────────────────────
const PARTICLES = [
  { left: "4%",  size: 3, duration: 14, delay: 0  },
  { left: "11%", size: 2, duration: 19, delay: 4  },
  { left: "18%", size: 4, duration: 12, delay: 8  },
  { left: "26%", size: 2, duration: 22, delay: 2  },
  { left: "33%", size: 3, duration: 16, delay: 10 },
  { left: "41%", size: 2, duration: 25, delay: 5  },
  { left: "57%", size: 2, duration: 20, delay: 7  },
  { left: "65%", size: 4, duration: 15, delay: 1  },
  { left: "73%", size: 2, duration: 23, delay: 9  },
  { left: "81%", size: 3, duration: 18, delay: 6  },
  { left: "96%", size: 3, duration: 17, delay: 3  },
];

function Particles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

// ─── EMAIL MOCKUP (static — mobile) ──────────────────────────────────────────
function StaticEmailMockup() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-[#060c18] px-4 py-3 flex items-center gap-3 border-b border-navy-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <div className="w-3 h-3 rounded-full bg-green-400/70" />
        </div>
        <span className="text-xs text-text-muted font-body truncate">
          Inbox — sarah.johnson@gmail.com
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <p className="text-xs text-text-muted mb-0.5">
              From:{" "}
              <span className="text-teal font-semibold">Bright Smile Dental</span>
            </p>
            <p className="text-xs text-text-muted truncate">
              To: sarah.johnson@gmail.com
            </p>
          </div>
          <span className="text-xs bg-teal/10 text-teal border border-teal/20 px-2 py-0.5 rounded-full flex-shrink-0">
            Automated
          </span>
        </div>

        <h4 className="font-body font-semibold text-text-primary text-sm mb-3 leading-snug">
          Hi Sarah — your appointment is this Friday at 2:00 PM 👋
        </h4>

        <div className="bg-teal/10 border border-teal/30 rounded-xl p-3 mb-4">
          <p className="text-teal text-xs font-semibold mb-1">
            ↩ Reply Y to confirm your appointment
          </p>
          <p className="text-text-muted text-xs">
            Takes 2 seconds. No login required.
          </p>
        </div>
      </div>

      <div className="bg-[#060c18] px-5 py-3 border-t border-navy-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-teal rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-navy text-xs font-bold">✓</span>
          </div>
          <span className="text-text-primary text-xs font-semibold">
            Sarah confirmed!
          </span>
          <span className="text-text-muted text-xs">Replied Y · just now</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-teal rounded-full" />
          <span className="text-xs text-teal">Confirmed</span>
        </div>
      </div>
    </div>
  );
}

// ─── EMAIL MOCKUP (animated) ──────────────────────────────────────────────────
const STATUS_TEXT = "status: awaiting Y reply";

function EmailMockup() {
  const [typedLen, setTypedLen] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setTypedLen(i);
      if (i >= STATUS_TEXT.length) {
        clearInterval(typeInterval);
        setTimeout(() => setConfirmed(true), 1000);
      }
    }, 55);
    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
      {/* Window chrome */}
      <div className="bg-[#060c18] px-4 py-3 flex items-center gap-3 border-b border-navy-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <div className="w-3 h-3 rounded-full bg-green-400/70" />
        </div>
        <span className="text-xs text-text-muted font-body truncate">
          Inbox — sarah.johnson@gmail.com
        </span>
      </div>

      {/* Sidebar + email */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col w-28 border-r border-navy-border/60 p-3 gap-1.5 bg-navy/50 flex-shrink-0">
          {["Inbox (3)", "Sent", "Drafts", "Archive"].map((label, i) => (
            <div
              key={label}
              className={`text-xs px-2 py-1.5 rounded-lg ${
                i === 0
                  ? "bg-teal/20 text-teal font-semibold"
                  : "text-text-muted"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Email body */}
        <div className="flex-1 p-5 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-4">
            <div>
              <p className="text-xs text-text-muted mb-0.5">
                From:{" "}
                <span className="text-teal font-semibold">
                  Bright Smile Dental
                </span>
              </p>
              <p className="text-xs text-text-muted truncate">
                To: sarah.johnson@gmail.com
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-text-muted">Tue 9:41 AM</p>
              <span className="text-xs bg-teal/10 text-teal border border-teal/20 px-2 py-0.5 rounded-full mt-1 inline-block">
                Automated
              </span>
            </div>
          </div>

          <h4 className="font-body font-semibold text-text-primary text-sm mb-3 leading-snug">
            Hi Sarah — your appointment is this Friday at 2:00 PM 👋
          </h4>

          <div className="text-text-muted text-xs leading-relaxed space-y-2 mb-4">
            <p>
              Just a quick reminder that you have your cleaning &amp; checkup
              scheduled at Bright Smile Dental this Friday, April 25th at
              2:00 PM.
            </p>
            <p>Dr. Martinez is looking forward to seeing you.</p>
          </div>

          <div className="bg-teal/10 border border-teal/30 rounded-xl p-3 mb-4">
            <p className="text-teal text-xs font-semibold mb-1">
              ↩ Reply Y to confirm your appointment
            </p>
            <p className="text-text-muted text-xs">
              Takes 2 seconds. No login required.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-navy-border/60">
            <div className="w-5 h-5 bg-teal rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-navy text-[9px] font-black">AI</span>
            </div>
            <span className="text-xs text-text-muted truncate">
              Sent via NoShowZero AI · Personalized
            </span>
          </div>
        </div>
      </div>

      {/* Animated status bar */}
      <div className="bg-[#060c18] px-5 py-3 border-t border-navy-border flex items-center justify-between min-h-[46px]">
        {confirmed ? (
          <>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-teal rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-navy text-xs font-bold">✓</span>
              </div>
              <span className="text-text-primary text-xs font-semibold">
                Sarah confirmed!
              </span>
              <span className="text-text-muted text-xs">
                Replied Y · just now
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-teal rounded-full" />
              <span className="text-xs text-teal">Confirmed</span>
            </div>
          </>
        ) : (
          <span className="text-xs text-text-muted font-body">
            {STATUS_TEXT.slice(0, typedLen)}
            <span className="animate-blink text-teal">|</span>
          </span>
        )}
      </div>
    </div>
  );
}

// ─── PILOT BANNER ─────────────────────────────────────────────────────────────
function PilotBanner() {
  return (
    <div className="w-full bg-teal text-navy text-center text-sm font-body font-bold py-2.5 px-4 z-[60] relative">
      🟢 1 Free Pilot Spot Available — First Practice to Book Gets the First Month Free
    </div>
  );
}

// ─── 1. NAVBAR ────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/90 backdrop-blur-md border-b border-navy-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-teal rounded-md flex items-center justify-center">
            <span className="text-navy font-body font-black text-sm leading-none">
              N
            </span>
          </div>
          <span className="font-body font-bold text-lg text-text-primary">
            NoShow<span className="text-teal">Zero</span>
          </span>
        </div>
        <a
          href="#book-demo"
          className="bg-teal text-navy font-body font-bold text-sm px-5 py-2.5 rounded-full hover:bg-teal-hover transition-all hover:scale-[1.02]"
        >
          Claim Free Pilot Spot
        </a>
      </div>
    </nav>
  );
}

// ─── 2. HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-grid pt-20 pb-16 overflow-hidden">
      {/* Ambient orb */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] bg-teal/3 rounded-full blur-3xl pointer-events-none" />

      <Particles />

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — headline + CTAs */}
          <div>
            <div className="inline-flex items-center gap-2 border border-navy-border rounded-full px-4 py-2 text-sm text-text-muted mb-8 animate-fade-up">
              <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
              AI Automation for Dental Practices
            </div>

            <h1
              className="font-display text-7xl md:text-8xl leading-none mb-6 animate-fade-up"
              style={{ animationDelay: "100ms", animationFillMode: "both" }}
            >
              ZERO NO-SHOWS.
              <br />
              <span className="text-teal">ZERO EFFORT.</span>
            </h1>

            <p
              className="text-text-muted text-xl max-w-xl mb-10 leading-relaxed animate-fade-up"
              style={{ animationDelay: "200ms", animationFillMode: "both" }}
            >
              AI-powered reminders, instant confirmation tracking, and patient
              reactivation — all running 24/7 with zero staff involvement.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: "300ms", animationFillMode: "both" }}
            >
              <a
                href="#book-demo"
                className="bg-teal text-navy font-body font-bold text-lg px-8 py-4 rounded-full hover:bg-teal-hover transition-all hover:scale-[1.02] glow-teal text-center"
              >
                Claim Free Pilot Spot
              </a>
              <a
                href="#how-it-works"
                className="border border-navy-border text-text-primary font-body font-semibold text-lg px-8 py-4 rounded-full hover:border-teal hover:text-teal transition-colors text-center"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Right — animated email mockup */}
          <div
            className="hidden lg:block relative animate-fade-up"
            style={{ animationDelay: "220ms", animationFillMode: "both" }}
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal/10 rounded-full blur-2xl" />

            <div className="flex justify-end mb-3">
              <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 rounded-full px-3 py-1.5 text-xs text-teal">
                <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />
                Live system running
              </div>
            </div>

            <EmailMockup />
          </div>
        </div>

        {/* Mobile — static email mockup (shown below CTAs on small screens) */}
        <div
          className="block lg:hidden mt-10 animate-fade-up"
          style={{ animationDelay: "320ms", animationFillMode: "both" }}
        >
          <div className="flex justify-end mb-3">
            <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 rounded-full px-3 py-1.5 text-xs text-teal">
              <span className="w-1.5 h-1.5 bg-teal rounded-full" />
              Live system running
            </div>
          </div>
          <StaticEmailMockup />
        </div>
      </div>
    </section>
  );
}

// ─── 3. STATS BAR ─────────────────────────────────────────────────────────────
function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const c300 = useCountUp(300, 1500, triggered);
  const c15 = useCountUp(15, 1500, triggered);

  return (
    <div ref={ref} className="py-14 bg-navy-surface border-y border-navy-border">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-3">
        <div className="text-center px-4 md:px-8 border-r border-navy-border">
          <div className="font-display text-5xl md:text-6xl text-teal">
            ${c300}
          </div>
          <div className="text-text-muted text-xs md:text-sm mt-2">
            avg. cost per no-show
          </div>
        </div>
        <div className="text-center px-4 md:px-8 border-r border-navy-border">
          <div className="font-display text-5xl md:text-6xl text-teal">
            {c15}%
          </div>
          <div className="text-text-muted text-xs md:text-sm mt-2">
            industry no-show rate
          </div>
        </div>
        <div className="text-center px-4 md:px-8">
          <div className="font-display text-5xl md:text-6xl text-teal">
            0 HRS
          </div>
          <div className="text-text-muted text-xs md:text-sm mt-2">
            staff time required
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. PROBLEM ───────────────────────────────────────────────────────────────
function Problem() {
  const cards = [
    {
      icon: "💸",
      title: "$4,500+ Lost Monthly",
      body: "A practice with 15 no-shows per month at $300 each is leaving $54,000 on the table every year.",
    },
    {
      icon: "📞",
      title: "Staff Burnout",
      body: "Your front desk spends hours each week on reminder calls that patients ignore anyway.",
    },
    {
      icon: "📅",
      title: "Wasted Chair Time",
      body: "Every empty chair is a patient who needed care, and revenue you'll never recover.",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-teal font-body text-sm font-semibold tracking-widest uppercase mb-4">
            The Problem
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none">
            NO-SHOWS ARE SILENTLY
            <br />
            DRAINING YOUR PRACTICE
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <div className="glass-card rounded-2xl p-8 hover:border-teal/30 hover:-translate-y-1 transition-all group h-full">
                <div className="text-4xl mb-5">{c.icon}</div>
                <h3 className="font-body font-bold text-xl text-text-primary mb-3 group-hover:text-teal transition-colors">
                  {c.title}
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ROI CALCULATOR ───────────────────────────────────────────────────────────
function ROICalculator() {
  const [appointments, setAppointments] = useState(150);
  const [noShowRate, setNoShowRate] = useState(15);

  const monthlyNoShows = Math.round((appointments * noShowRate) / 100);
  const monthlyLoss = monthlyNoShows * 300;
  const annualLoss = monthlyLoss * 12;
  const fiveYrLoss = annualLoss * 5;
  const annualCost = 5761; // $997 setup + $397 × 12
  const netSavings = annualLoss - annualCost;
  const paybackMonths = monthlyLoss > 0 ? Math.ceil(annualCost / monthlyLoss) : 0;

  return (
    <section className="py-24 px-6 bg-navy-surface border-y border-navy-border">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-teal font-body text-sm font-semibold tracking-widest uppercase mb-4">
            ROI Calculator
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none">
            SEE WHAT NO-SHOWS
            <br />
            COST YOUR PRACTICE
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Sliders */}
          <Reveal>
            <div className="glass-card rounded-2xl p-8 space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-body font-semibold text-text-primary text-sm">
                    Monthly Appointments
                  </label>
                  <span className="text-teal font-display text-2xl">
                    {appointments}
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={appointments}
                  onChange={(e) => setAppointments(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-text-muted text-xs mt-1">
                  <span>50</span>
                  <span>500</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-body font-semibold text-text-primary text-sm">
                    No-Show Rate
                  </label>
                  <span className="text-teal font-display text-2xl">
                    {noShowRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={noShowRate}
                  onChange={(e) => setNoShowRate(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-text-muted text-xs mt-1">
                  <span>5%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Results */}
          <Reveal delay={100}>
            <div className="glass-card rounded-2xl p-8 space-y-5">
              <div className="flex justify-between items-center border-b border-navy-border pb-4">
                <span className="text-text-muted text-sm">Monthly loss</span>
                <span className="text-text-primary font-body font-bold text-xl">
                  ${monthlyLoss.toLocaleString("en-US")}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-navy-border pb-4">
                <span className="text-text-muted text-sm">Annual loss</span>
                <span className="text-text-primary font-body font-bold text-xl">
                  ${annualLoss.toLocaleString("en-US")}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-navy-border pb-4">
                <span className="text-text-muted text-sm">5-year loss</span>
                <span className="text-text-primary font-body font-bold text-xl">
                  ${fiveYrLoss.toLocaleString("en-US")}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-navy-border pb-4">
                <span className="text-text-muted text-sm">
                  Annual NoShowZero cost
                </span>
                <span className="text-text-muted font-body font-bold text-xl">
                  ${annualCost.toLocaleString("en-US")}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-body font-bold text-text-primary">
                  Net annual savings
                </span>
                <span
                  className={`font-display text-3xl ${
                    netSavings >= 0 ? "text-teal" : "text-red-400"
                  }`}
                >
                  {netSavings >= 0 ? "$" : "-$"}
                  {Math.abs(netSavings).toLocaleString("en-US")}
                </span>
              </div>
              {paybackMonths > 0 && (
                <p className="text-text-muted text-xs text-center pt-2">
                  System pays for itself in{" "}
                  <span className="text-teal font-semibold">
                    {paybackMonths} month{paybackMonths !== 1 ? "s" : ""}
                  </span>
                </p>
              )}
              <a
                href="#book-demo"
                className="block w-full bg-teal text-navy font-body font-bold text-sm py-3 rounded-full text-center hover:bg-teal-hover transition-all mt-4"
              >
                Eliminate These Losses →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── 5. HOW IT WORKS ──────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "We Connect Your System",
      body: "We integrate with your existing email and patient list. Setup takes 48 hours. No new software required.",
    },
    {
      n: "02",
      title: "AI Sends Personalized Reminders",
      body: "Each patient gets a personalized, human-sounding reminder with a one-touch confirmation.",
    },
    {
      n: "03",
      title: "You See Zero No-Shows",
      body: "Confirmed appointments. Real-time tracking. No staff involvement.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 bg-navy-surface border-y border-navy-border"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-5">
          <p className="text-teal font-body text-sm font-semibold tracking-widest uppercase mb-4">
            How It Works
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none mb-4">
            SET IT UP ONCE.
            <br />
            IT RUNS FOREVER.
          </h2>
          <p className="text-text-muted text-lg">
            Three steps. No new software. No training required.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 relative mt-16">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gradient-to-r from-teal/20 via-teal/50 to-teal/20" />

          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 120}>
              <div className="relative glass-card rounded-2xl p-8 hover:border-teal/40 hover:-translate-y-1 transition-all h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-6xl text-navy-border">
                    {step.n}
                  </span>
                  {i < 2 && (
                    <div className="hidden md:flex absolute -right-3 top-10 w-6 h-6 bg-teal rounded-full items-center justify-center z-10 text-navy text-xs font-bold">
                      →
                    </div>
                  )}
                </div>
                <h3 className="font-body font-bold text-xl text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. WHAT YOU GET ──────────────────────────────────────────────────────────
function Features() {
  const items = [
    {
      title: "AI-Personalized Emails",
      body: "Reminders that sound human, not robotic",
    },
    {
      title: "One-Touch Confirmation",
      body: "Patients reply Y. That's it.",
    },
    {
      title: "Auto Follow-Up Sequences",
      body: "Catches patients who don't respond the first time",
    },
    {
      title: "Reply Detection",
      body: "We know instantly when a patient confirms",
    },
    {
      title: "Real-Time Dashboard",
      body: "See exactly who's confirmed, who hasn't",
    },
    {
      title: "Zero Staff Time",
      body: "Runs 24/7 with no manual effort required",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-teal font-body text-sm font-semibold tracking-widest uppercase mb-4">
            What You Get
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none">
            EVERYTHING YOUR
            <br />
            PRACTICE NEEDS
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="glass-card rounded-2xl p-7 hover:border-teal/35 hover:-translate-y-1 transition-all group h-full">
                <div className="text-teal text-2xl mb-4">✦</div>
                <h3 className="font-body font-bold text-lg text-text-primary mb-2 group-hover:text-teal transition-colors">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. PILOT PROGRAM ─────────────────────────────────────────────────────────
function PilotProgram() {
  const stats = [
    { value: "1", label: "Free pilot spot remaining" },
    { value: "$0", label: "Risk — cancel anytime" },
    { value: "48 hrs", label: "From contract to live system" },
  ];

  return (
    <section className="py-24 px-6 bg-navy-surface border-y border-navy-border">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-14">
          <span className="inline-block bg-teal/10 border border-teal/30 text-teal text-xs font-body font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Pilot Program · Worcester, MA
          </span>
          <h2 className="font-display text-5xl md:text-6xl leading-none mb-5">
            WORCESTER&apos;S
            <br />
            FOUNDING COHORT
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed">
            We&apos;re selecting 5 Worcester-area dental practices for our
            founding cohort. Founding members get locked-in pricing and direct
            access to our team.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <div className="glass-card rounded-2xl p-8 text-center hover:border-teal/30 hover:-translate-y-1 transition-all">
                <div className="font-display text-5xl text-teal mb-2">
                  {s.value}
                </div>
                <div className="text-text-muted text-sm">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="text-center">
          <a
            href="#book-demo"
            className="inline-block bg-teal text-navy font-body font-bold text-lg px-10 py-4 rounded-full hover:bg-teal-hover transition-all hover:scale-[1.02] glow-teal"
          >
            Claim the Free Pilot Spot
          </a>
          <p className="text-text-muted text-sm mt-4">
            Free spot is first-come, first-served.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 8. PRICING ───────────────────────────────────────────────────────────────
function Pricing() {
  const features = [
    "Full AI automation setup",
    "Personalized email sequences",
    "Reply detection & tracking",
    "Real-time reporting dashboard",
    "Ongoing optimization",
    "Direct support from Jeffrey",
  ];

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-lg mx-auto text-center">
        <Reveal>
          <p className="text-teal font-body text-sm font-semibold tracking-widest uppercase mb-4">
            Pricing
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none mb-4">
            SIMPLE, TRANSPARENT
            <br />
            PRICING
          </h2>
          <p className="text-text-muted text-lg mb-12">
            One practice. One price. Everything included.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="border-2 border-teal rounded-2xl p-10 pricing-glow text-left">
            {/* Badge */}
            <div className="text-center mb-8">
              <span className="bg-teal/10 border border-teal/30 text-teal font-body font-semibold text-sm px-4 py-2 rounded-full">
                NoShowZero Complete
              </span>
            </div>

            {/* Pricing */}
            <div className="flex flex-col items-center gap-2 mb-8 text-center">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-7xl text-text-primary">
                  $997
                </span>
                <span className="text-text-muted text-sm">one-time setup</span>
              </div>
              <div className="text-teal text-xl">+</div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-7xl text-text-primary">
                  $397
                </span>
                <span className="text-text-muted text-sm">
                  /mo · cancel anytime
                </span>
              </div>
            </div>

            {/* Feature list */}
            <ul className="space-y-3 mb-10">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-text-primary"
                >
                  <span className="text-teal flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#book-demo"
              className="block w-full bg-teal text-navy font-body font-bold text-lg py-4 rounded-full text-center hover:bg-teal-hover transition-all hover:scale-[1.02]"
            >
              Book Your Free Demo
            </a>

            <p className="text-text-muted text-sm text-center mt-4">
              Demo is free. No commitment. We&apos;ll show you exactly how it
              works for your practice.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 9. FAQ ───────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long does setup take?",
      a: "48 hours from when you sign. We handle everything technical.",
    },
    {
      q: "Do my patients need to download anything?",
      a: "No. They just reply to an email with Y. That's the entire patient experience.",
    },
    {
      q: "What if a patient doesn't respond?",
      a: "The system automatically sends a follow-up sequence and flags non-responders for your review.",
    },
    {
      q: "Does this work with my existing software?",
      a: "Yes. We connect to your email system. No EHR integration required.",
    },
    {
      q: "What if I want to cancel?",
      a: "Cancel anytime, no questions asked. Month-to-month only.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-navy-surface border-t border-navy-border">
      <div className="max-w-2xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-teal font-body text-sm font-semibold tracking-widest uppercase mb-4">
            FAQ
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none">
            COMMON QUESTIONS
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="glass-card rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-teal/5 transition-colors"
                >
                  <span className="font-body font-semibold text-text-primary pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`text-teal text-xl flex-shrink-0 transition-transform duration-300 ${
                      open === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div className={`faq-body ${open === i ? "open" : ""}`}>
                  <div>
                    <p className="text-text-muted leading-relaxed px-6 pb-5 text-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 10. FINAL CTA ────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section
      id="book-demo"
      className="py-32 px-6 border-t border-navy-border"
    >
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <h2 className="font-display text-6xl md:text-8xl leading-none text-text-primary mb-6">
            READY TO ELIMINATE
            <br />
            NO-SHOWS?
          </h2>
          <p className="text-text-muted text-xl mb-8 max-w-xl mx-auto leading-relaxed">
            Book a free 20-minute demo. We&apos;ll show you the system live and
            answer every question.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="inline-flex items-center gap-2 border border-teal/30 bg-teal/10 text-teal text-sm px-5 py-2.5 rounded-full mb-10">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            1 free pilot spot left — all others pay after this
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/jeffrey-noshowzero/noshowzero-20min-demo?background_color=0b1120&text_color=ffffff&primary_color=00e5c0"
            style={{ minWidth: "320px", height: "700px" }}
          />
        </Reveal>
      </div>
    </section>
  );
}

// ─── 11. FOOTER ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-navy-border py-10 px-6 bg-navy-surface">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-teal rounded-md flex items-center justify-center">
              <span className="text-navy font-body font-black text-xs leading-none">
                N
              </span>
            </div>
            <span className="font-body font-bold text-text-primary">
              NoShow<span className="text-teal">Zero</span>
            </span>
          </div>
          <p className="text-text-muted text-sm">
            AI automation for dental practices.
          </p>
          <a
            href="mailto:jeffrey.noshowzero@gmail.com"
            className="text-text-muted text-sm hover:text-teal transition-colors"
          >
            jeffrey.noshowzero@gmail.com
          </a>
        </div>
        <div className="border-t border-navy-border/60 pt-6 text-center text-text-muted text-xs">
          © 2026 NoShowZero · Built by Jeffrey Madden
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <PilotBanner />
      <Navbar />
      <Hero />
      <StatsBar />
      <Problem />
      <ROICalculator />
      <HowItWorks />
      <Features />
      <PilotProgram />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
