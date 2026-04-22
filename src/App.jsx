import { useState, useEffect, useRef } from "react";

/* ─── Global Styles ─────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #070707; color: #f0ebe0; font-family: 'Outfit', sans-serif; overflow-x: hidden; }

    ::-webkit-scrollbar { width: 2px; }
    ::-webkit-scrollbar-track { background: #070707; }
    ::-webkit-scrollbar-thumb { background: #c8a96e; border-radius: 2px; }

    .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
    .sans  { font-family: 'Outfit', sans-serif; }

    @keyframes shimmerGold {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes grain {
      0%,100%{ transform:translate(0,0); }
      10%    { transform:translate(-1%,-1%); }
      30%    { transform:translate(-1%,1%); }
      70%    { transform:translate(0%,1%); }
    }
    @keyframes barBounce {
      0%,100% { transform: scaleY(0.4); }
      50%     { transform: scaleY(1); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%,100% { opacity: 0.4; }
      50%     { opacity: 1; }
    }

    .gold-text {
      background: linear-gradient(90deg,#c8a96e,#e8d5b0,#d4af70,#c8a96e);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmerGold 4s linear infinite;
    }

    .grain-overlay::after {
      content: '';
      position: fixed; inset: -50%;
      width: 200%; height: 200%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 9999; opacity: 0.3;
      animation: grain 0.5s steps(1) infinite;
    }

    .nav-glass {
      background: rgba(7,7,7,0.88);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-bottom: 1px solid rgba(200,169,110,0.08);
    }

    .tag-pill {
      background: rgba(200,169,110,0.08);
      border: 1px solid rgba(200,169,110,0.2);
      color: #c8a96e;
      font-size: 0.65rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .project-card {
      background: #0f0f0f;
      border: 1px solid rgba(200,169,110,0.08);
      transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
    }
    .project-card:hover {
      border-color: rgba(200,169,110,0.35);
      transform: translateY(-3px);
      box-shadow: 0 24px 60px rgba(200,169,110,0.08);
    }

    .featured-card {
      background: #0a0a0a;
      border: 1px solid rgba(200,169,110,0.12);
      transition: border-color 0.4s, box-shadow 0.4s;
    }
    .featured-card:hover {
      border-color: rgba(200,169,110,0.4);
      box-shadow: 0 32px 80px rgba(200,169,110,0.06);
    }

    .metric-card {
      background: #0c0c0c;
      border: 1px solid rgba(200,169,110,0.1);
      transition: all 0.4s;
    }
    .metric-card:hover {
      background: rgba(200,169,110,0.04);
      border-color: rgba(200,169,110,0.4);
      transform: translateY(-2px);
    }

    .insta-btn {
      background: rgba(200,169,110,0.06);
      border: 1px solid rgba(200,169,110,0.2);
      color: #c8a96e;
      transition: all 0.3s;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 16px;
      border-radius: 2px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.72rem;
      letter-spacing: 0.06em;
      cursor: pointer;
    }
    .insta-btn:hover {
      background: rgba(200,169,110,0.14);
      border-color: rgba(200,169,110,0.6);
      transform: translateY(-1px);
    }

    .marquee-inner {
      display: flex; gap: 3rem;
      animation: marquee 22s linear infinite;
      white-space: nowrap;
    }

    .bar {
      width: 2px; border-radius: 2px;
      transform-origin: bottom;
    }

    .profile-ring {
      position: relative;
      width: 200px; height: 200px;
      flex-shrink: 0;
    }
    .profile-ring::before {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      background: conic-gradient(#c8a96e 0%, #e8d5b0 25%, #c8a96e 50%, transparent 50%);
      animation: shimmerGold 3s linear infinite;
    }
    .profile-ring-inner {
      position: relative;
      width: 100%; height: 100%;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid #070707;
    }

    @media (max-width: 768px) {
      .hero-grid { flex-direction: column !important; }
      .profile-ring { width: 140px !important; height: 140px !important; }
    }
  `}</style>
);

/* ─── Data ───────────────────────────────────────────────────── */
const METRICS = [
  { val: "1.23M+", label: "Viral Views", sub: "single reel" },
  { val: "2M+", label: "Engagement", sub: "in 3 months" },
  { val: "8.5K", label: "Followers Grown", sub: "new brand, 7 months" },
  { val: "892K", label: "Campaign Reach", sub: "Pasha doner campaign" },
  { val: "104K", label: "Festival Reach", sub: "Ottomans Diwali" },
];

const PROJECTS = [
  {
    isFeatured: true,
    num: "01",
    accent: "#d4873a",
    gradColors: "radial-gradient(ellipse at 20% 30%,#3d1a00 0%,#1a0800 40%,#070707 70%)",
    name: "Ottomans Turkish Baklava",
    category: "Social Media Consultant · Content Strategist",
    tagline: "Positioning baklava as the premium gifting sweet of the season.",
    description: "Built content aligned with authentic Turkish positioning and developed a Diwali campaign with a clear objective: make baklava a go-to premium gifting choice. Achieved 104K views and drove meaningful brand awareness in a niche, competitive market — while maintaining consistent brand storytelling across all content.",
    results: ["104K campaign views", "Premium gifting positioning", "Niche market penetration"],
    tags: ["Content Strategy", "Diwali Campaign", "Brand Positioning"],
    videoSrc: "/videos/otto.MOV",
    insta: "https://www.instagram.com/ottomans_baklava?igsh=Zmk4ZGNvMXd0cWcw",
  },
  {
    isFeatured: true,
    num: "02",
    accent: "#3da870",
    gradColors: "radial-gradient(ellipse at 30% 70%,#003d1a 0%,#001a08 40%,#070707 70%)",
    name: "Pasha Burgers & Kebab",
    category: "End-to-End Social Media Strategist",
    tagline: "Launched a brand. Built a following. Made it go viral.",
    description: "Launched and scaled a new Middle Eastern food brand from August 2025. Led content strategy & execution, authentic doner brand storytelling, Google Business setup, and creative food photography. The result: a viral campaign that hit 1,235,650 views and 892,788 reach — and a community of 8.5K followers built in 7 months.",
    results: ["8.5K followers in 7 months", "2M+ engagement in 3 months", "1,235,650 views · 892,788 reach"],
    tags: ["Growth Strategy", "Video Direction", "Food Photography", "Brand Launch"],
    videoSrc: "/videos/pasha.MOV",
    insta: "https://www.instagram.com/pashaburgers?igsh=MXQ3anF4dDVwNXZoYw==",
  },
  {
    isFeatured: true,
    num: "03",
    accent: "#9b8fd4",
    gradColors: "radial-gradient(ellipse at 50% 20%,#1a0d3d 0%,#0d0820 40%,#070707 70%)",
    name: "Cream Story",
    category: "Content Strategist · Social Media Consultant",
    tagline: "Every season deserves a story worth remembering.",
    description: "Designed and executed campaigns across Laban Festival, Christmas, and Summer — focused on seasonal storytelling and sharp product positioning. Created content that blends fun, emotion, and brand recall to build lasting audience connection.",
    results: ["3 seasonal campaigns executed", "Fun + emotion-led content", "Strong brand recall"],
    tags: ["Seasonal Strategy", "Brand Storytelling", "Creative Direction"],
    videoSrc: "/videos/cs.MOV",
    insta: "https://www.instagram.com/creamstory_official?igsh=YTZ2aHoyNHFnOHNy",
  },
  {
    isFeatured: false,
    name: "Zum Zum Hotel",
    category: "Social Media Management",
    desc: "Social media management and content strategy. Brand-aligned video content marketing for a hospitality brand.",
    tags: ["Social Media", "Video Marketing", "Brand Strategy"],
    insta: "https://www.instagram.com/zumzum.1969?igsh=cjVzY2tjdzhtOXZ3&utm_source=qr",
    
  },
  {
    isFeatured: false,
    name: "Tab Café",
    category: "Brand Positioning · Consulting",
    desc: "Social media consulting — refined brand positioning and communication tone to elevate content quality and audience connection.",
    tags: ["Brand Consulting", "Content Strategy", "Communication"],
    insta: "https://www.instagram.com/tab.nagercoil?igsh=MWkyZTlibmtoajJiaA==",
    
  },
  {
    isFeatured: false,
    name: "FinLit",
    category: "Financial Storytelling · Video",
    desc: "Content strategist and video marketer — built story-driven financial content to make complex concepts accessible and engaging for a wide audience.",
    tags: ["Video Production", "Finance Content", "Storytelling"],
    insta: "https://www.instagram.com/official.finlit?igsh=eWZ0dHpmamM4aWZw",
    
  },
    {
    isFeatured: false,
    name: "Sleek (Footwear & Bags)",
    category: "Content Marketing · Fashion",
    desc: "Content marketing through shoot and edit. Created high-impact Christmas campaign visuals for a multi-brand footwear and bags label.",
    tags: ["Creative Direction", "Shoot Production", "Fashion"],
    insta: "https://drive.google.com/drive/folders/1CqsbmnhtHGJZdUm54-6fSPqnJSeXBV17",
    
    linkLabel: "View on Drive",
    videoSrc:'/videos/sleek.MOV'
  },
];

const FEATURED = PROJECTS.filter(p => p.isFeatured);
const OTHER = PROJECTS.filter(p => !p.isFeatured);

const SERVICES = [
  { icon: "◎", title: "Strategic Thinking", desc: "Creative execution backed by clear strategy and audience insight." },
  { icon: "◈", title: "Brand Storytelling", desc: "Content that builds positioning, narrative, and emotional recall." },
  { icon: "◉", title: "Campaign Ideation", desc: "End-to-end campaign design from concept through to results." },
  { icon: "◇", title: "Social Media Growth", desc: "Systems that scale brands from zero to momentum, organically." },
  { icon: "◆", title: "Video & Content Production", desc: "Creative direction, shoot, edit — built for performance." },
  { icon: "◐", title: "Performance-Led Strategy", desc: "Every piece of content measured and iterated for real growth." },
];

/* ─── Playing Bars ───────────────────────────────────────────── */
function PlayingBars({ color }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "14px" }}>
      {[0.5, 1, 0.7, 1.1, 0.6].map((d, i) => (
        <div key={i} className="bar" style={{
          width: "2px", height: `${8 + i * 2}px`, background: color, borderRadius: "2px",
          transformOrigin: "bottom",
          animation: `barBounce ${d}s ease-in-out ${i * 0.1}s infinite`,
        }} />
      ))}
    </div>
  );
}

/* ─── Instagram Icon ─────────────────────────────────────────── */
const InstaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

/* ─── External Link Icon ─────────────────────────────────────── */
const LinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ─── Featured Card ──────────────────────────────────────────── */
function FeaturedCard({ project, index }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [vis, setVis] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const hasVideo = !!project.videoSrc;

  return (
    <>
      <style>{`
        .fc-wrap { border-radius: 4px; overflow: hidden; }

        /* Always stacked: video on top, content below — on ALL screen sizes */
        .fc-stack {
          display: flex;
          flex-direction: column;
        }

        /* Video panel — full width, 16:9 ratio */
        .fc-vid {
          position: relative;
          width: 100%;
          padding-bottom: 52%;   /* ~16:9, tweak to taste */
          overflow: hidden;
          background: #080808;
          flex-shrink: 0;
        }
        .fc-vid video,
        .fc-vid .fc-grad-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Content panel — full width below video */
        .fc-info {
          padding: clamp(1.8rem, 4vw, 3rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #0a0a0a;
        }
      `}</style>

      <div
        ref={wrapRef}
        className="featured-card fc-wrap"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(40px)",
          transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`,
        }}
      >
        <div className="fc-stack">

          {/* ── Video panel (full width) ── */}
          <div className="fc-vid">
            {/* gradient background always fills */}
            <div
              className="fc-grad-bg"
              style={{ background: project.gradColors, zIndex: 1 }}
            />

            {hasVideo && (
              <video
                ref={videoRef}
                src={project.videoSrc}
                muted
                loop
                playsInline
                style={{ zIndex: 2 }}
              />
            )}

            {/* cinematic overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top,rgba(7,7,7,0.7) 0%,rgba(7,7,7,0.1) 55%,transparent 100%)",
              zIndex: 3,
            }} />

            {/* number watermark */}
            <div className="serif" style={{
              position: "absolute", top: "1rem", right: "1.5rem",
              fontSize: "clamp(5rem,10vw,8rem)", fontWeight: 300,
              color: "rgba(200,169,110,0.06)", lineHeight: 1,
              pointerEvents: "none", userSelect: "none", zIndex: 4,
            }}>
              {project.num}
            </div>

            {/* playing badge */}
            {hasVideo && playing && (
              <div style={{
                position: "absolute", bottom: "14px", left: "14px", zIndex: 5,
                display: "flex", alignItems: "center", gap: "8px",
              }}>
                <PlayingBars color={project.accent} />
                <span className="sans" style={{
                  fontSize: "0.58rem", color: project.accent,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                }}>Playing on loop</span>
              </div>
            )}
          </div>

          {/* ── Content panel (full width below) ── */}
          <div className="fc-info">
            <span className="sans tag-pill" style={{
              padding: "3px 10px", borderRadius: "2px",
              fontSize: "0.6rem", marginBottom: "1.2rem", alignSelf: "flex-start",
            }}>
              {project.category}
            </span>

            <h3 className="serif" style={{
              fontSize: "clamp(1.6rem,2.8vw,2.4rem)", fontWeight: 300,
              color: "#f0ebe0", lineHeight: 1.15, marginBottom: "0.8rem",
            }}>
              {project.name}
            </h3>

            <p className="serif" style={{
              fontSize: "1rem", fontStyle: "italic",
              color: project.accent, marginBottom: "1.2rem", lineHeight: 1.5,
            }}>
              {project.tagline}
            </p>

            <p className="sans" style={{
              fontSize: "0.86rem", color: "#555",
              lineHeight: 1.78, marginBottom: "1.6rem",
            }}>
              {project.description}
            </p>

            <div style={{ marginBottom: "1.6rem" }}>
              <span className="sans" style={{
                fontSize: "0.6rem", letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#c8a96e",
                display: "block", marginBottom: "0.8rem",
              }}>Results</span>
              {project.results.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: project.accent, flexShrink: 0 }} />
                  <span className="sans" style={{ fontSize: "0.83rem", color: "#c8a96e", fontWeight: 500 }}>{r}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.6rem" }}>
              {project.tags.map((t, i) => (
                <span key={i} className="sans tag-pill" style={{ padding: "3px 10px", borderRadius: "2px", fontSize: "0.6rem" }}>{t}</span>
              ))}
            </div>

            {project.insta && (
              <a
                href={project.insta}
                target="_blank"
                rel="noopener noreferrer"
                className="insta-btn"
                style={{ alignSelf: "flex-start" }}
              >
                <InstaIcon />
                View on Instagram
              </a>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = ["Work", "About", "Services", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => { setOpen(false); document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div className="nav-glass" style={{ padding: "0 clamp(1rem,4vw,3rem)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="serif"
            style={{ fontSize: "1.4rem", fontWeight: 400, color: "#c8a96e", letterSpacing: "0.05em", background: "none", border: "none", cursor: "pointer" }}>NR</button>

          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="desktop-nav">
            <style>{`.desktop-nav { display: flex; } @media(max-width:768px){.desktop-nav{display:none!important;}}`}</style>
            {links.map(l => (
              <button key={l} onClick={() => go(l)} className="sans"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#666", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#c8a96e"} onMouseLeave={e => e.target.style.color = "#666"}>{l}</button>
            ))}
            <a href="mailto:rkenaveen@gmail.com" className="sans"
              style={{ background: "rgba(200,169,110,0.1)", border: "1px solid rgba(200,169,110,0.3)", color: "#c8a96e", padding: "8px 20px", borderRadius: "2px", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(200,169,110,0.2)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(200,169,110,0.1)"}>Let's Talk</a>
          </div>

          <button onClick={() => setOpen(!open)} style={{ display: "none", flexDirection: "column", gap: "5px", padding: "8px", background: "none", border: "none", cursor: "pointer" }} className="ham-btn">
            <style>{`.ham-btn { display: none; } @media(max-width:768px){.ham-btn{display:flex!important;}}`}</style>
            {[0, 1, 2].map(i => <span key={i} style={{
              display: "block", width: "22px", height: "1px", background: "#c8a96e", transition: "all 0.3s",
              transform: open ? (i === 0 ? "rotate(45deg) translateY(6px)" : i === 2 ? "rotate(-45deg) translateY(-6px)" : "scale(0)") : "none"
            }} />)}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 0", gap: "1.5rem", background: "rgba(7,7,7,0.98)", backdropFilter: "blur(30px)", borderTop: "1px solid rgba(200,169,110,0.1)" }}>
          {links.map(l => <button key={l} onClick={() => go(l)} className="sans" style={{ background: "none", border: "none", cursor: "pointer", color: "#f0ebe0", fontSize: "1.1rem", letterSpacing: "0.1em" }}>{l}</button>)}
          <a href="mailto:rkenaveen@gmail.com" style={{ color: "#c8a96e", fontSize: "0.9rem", textDecoration: "none" }}>rkenaveen@gmail.com</a>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);
  const fu = (d) => ({ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)", transition: `opacity 0.8s ease ${d}s, transform 0.8s ease ${d}s` });

  return (
    <section style={{ minHeight: "100svh", background: "#070707", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 30%,rgba(200,169,110,0.04) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "clamp(20px,5vw,60px)", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom,transparent,rgba(200,169,110,0.12) 30%,rgba(200,169,110,0.12) 70%,transparent)" }} />

      <div style={{ padding: "100px clamp(1.5rem,6vw,6rem) 80px", maxWidth: "1200px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(2rem,5vw,4rem)", flexWrap: "wrap", ...fu(0.1) }} className="hero-grid">

          {/* Profile photo */}
          <div className="profile-ring" style={{ width: "clamp(130px,18vw,200px)", height: "clamp(130px,18vw,200px)", flexShrink: 0 }}>
            <div className="profile-ring-inner">
              <img src="/profile.png" alt="Naveen RKE"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={e => {
                  // Fallback if image not found
                  e.target.style.display = "none";
                  e.target.parentElement.style.background = "linear-gradient(135deg, #1a0d00, #3d1a00)";
                  e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:Cormorant Garamond,serif;font-size:3rem;color:#c8a96e;font-weight:300;">NR</div>';
                }}
              />
            </div>
          </div>

          {/* Text */}
          <div>
            {/* <div style={fu(0.15)}>
              <span className="sans tag-pill" style={{ padding: "4px 14px", borderRadius: "2px", display: "inline-block", marginBottom: "1.4rem" }}>
                Available for Projects · Chennai, India
              </span>Available for Projects
            </div> */}
            <h1 className="serif" style={{ fontSize: "clamp(3rem,8vw,7rem)", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em", color: "#f0ebe0", marginBottom: "0.3rem", ...fu(0.25) }}>
              Naveen RKE<br /><span className="gold-text"></span>
            </h1>
            <p className="sans" style={{ fontSize: "clamp(0.75rem,1.5vw,0.95rem)", color: "#505050", letterSpacing: "0.15em", textTransform: "uppercase", margin: "1.2rem 0 1.6rem", ...fu(0.35) }}>
              Social Media Strategist&nbsp;&nbsp;·&nbsp;&nbsp;Content Marketing Consultant
            </p>
            <p className="serif" style={{ fontSize: "clamp(1rem,2vw,1.4rem)", color: "#c8a96e", fontStyle: "italic", fontWeight: 300, maxWidth: "520px", lineHeight: 1.55, marginBottom: "2.4rem", ...fu(0.45) }}>
              "Good content gets attention. Strategic content builds brands, communities, and revenue."
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", ...fu(0.55) }}>
              <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "#c8a96e", color: "#070707", padding: "13px 28px", border: "none", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e8d5b0"} onMouseLeave={e => e.currentTarget.style.background = "#c8a96e"}>View Work</button>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "transparent", color: "#f0ebe0", padding: "13px 28px", border: "1px solid rgba(240,235,224,0.2)", cursor: "pointer", fontFamily: "'Outfit',sans-serif", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8a96e"; e.currentTarget.style.color = "#c8a96e"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(240,235,224,0.2)"; e.currentTarget.style.color = "#f0ebe0"; }}>Get In Touch</button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — no overlapping text */}
      <div style={{ position: "absolute", bottom: "2rem", right: "clamp(1.5rem,4vw,4rem)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <span className="sans" style={{ fontSize: "0.58rem", letterSpacing: "0.22em", color: "#252525", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
        <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom,#c8a96e,transparent)" }} />
      </div>
    </section>
  );
}

/* ─── Marquee ────────────────────────────────────────────────── */
function MarqueeStrip() {
  const items = ["Social Media Strategy", "Content Marketing", "Brand Storytelling", "Campaign Planning", "Video Production", "Creative Direction", "Growth Marketing", "Digital Branding"];
  return (
    <div style={{ borderTop: "1px solid rgba(200,169,110,0.1)", borderBottom: "1px solid rgba(200,169,110,0.1)", padding: "14px 0", overflow: "hidden", background: "#0a0a0a" }}>
      <div className="marquee-inner" style={{ width: "max-content" }}>
        {[...items, ...items].map((it, i) => (
          <span key={i} className="sans" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3a3a3a" }}>
            {it}&nbsp;&nbsp;<span style={{ color: "#c8a96e" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Metrics ────────────────────────────────────────────────── */
function Metrics() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: "80px 0", background: "#070707" }}>
      <div style={{ padding: "0 clamp(1.5rem,6vw,6rem)", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="sans" style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8a96e" }}>FEATURED METRICS</span>
          <div style={{ width: "40px", height: "1px", background: "#c8a96e", marginTop: "10px" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
          {METRICS.map((m, i) => (
            <div key={i} className="metric-card" style={{ padding: "1.8rem 1.5rem", borderRadius: "2px", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `all 0.6s ease ${i * 0.1}s` }}>
              <div className="serif gold-text" style={{ fontSize: "clamp(1.8rem,3.5vw,2.4rem)", fontWeight: 600, lineHeight: 1 }}>{m.val}</div>
              <div className="sans" style={{ fontSize: "0.8rem", color: "#f0ebe0", marginTop: "0.5rem", fontWeight: 500 }}>{m.label}</div>
              <div className="sans" style={{ fontSize: "0.65rem", color: "#3a3a3a", marginTop: "0.25rem", letterSpacing: "0.05em" }}>{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Other Project Card (with optional video) ───────────────── */
function OtherCard({ project, index }) {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const [vis, setVis] = useState(false);
  const [playing, setPlaying] = useState(false);
  const hasVideo = !!project.videoSrc;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.play().then(() => setPlaying(true)).catch(() => { });
  }, []);

  return (
    <div ref={wrapRef} className="project-card" style={{
      borderRadius: "2px", overflow: "hidden",
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)",
      transition: `all 0.7s ease ${(index + FEATURED.length) * 0.08}s`,
      display: "flex", flexDirection: "column",
    }}>
      {/* Video thumbnail if available */}
      {hasVideo && (
        <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", background: "#0a0a0a", flexShrink: 0 }}>
          <video ref={videoRef} src={project.videoSrc} muted loop playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(7,7,7,0.6) 0%,transparent 60%)", zIndex: 1 }} />
          {playing && (
            <div style={{ position: "absolute", bottom: "10px", left: "12px", zIndex: 2, display: "flex", alignItems: "center", gap: "6px" }}>
              <PlayingBars color="#c8a96e" />
              <span className="sans" style={{ fontSize: "0.55rem", color: "#c8a96e", letterSpacing: "0.1em", textTransform: "uppercase" }}>Loop</span>
            </div>
          )}
        </div>
      )}

      {/* Card content */}
      <div style={{ padding: "1.6rem", flex: 1, display: "flex", flexDirection: "column" }}>
        {!hasVideo && <div style={{ fontSize: "1.7rem", marginBottom: "0.8rem" }}>{project.icon}</div>}
        <span className="sans" style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#3a3a3a" }}>{project.category}</span>
        <h3 className="serif" style={{ fontSize: "1.25rem", fontWeight: 400, color: "#f0ebe0", margin: "0.35rem 0 0.7rem" }}>{project.name}</h3>
        <p className="sans" style={{ fontSize: "0.82rem", color: "#444", lineHeight: 1.65, marginBottom: "1.2rem", flex: 1 }}>{project.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.2rem" }}>
          {project.tags.map((t, ti) => <span key={ti} className="sans tag-pill" style={{ padding: "2px 8px", borderRadius: "2px", fontSize: "0.58rem" }}>{t}</span>)}
        </div>
        {project.insta && (
          <a href={project.insta} target="_blank" rel="noopener noreferrer" className="insta-btn">
            {project.linkLabel ? <LinkIcon /> : <InstaIcon />}
            {project.linkLabel || "View on Instagram"}
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── All Projects (Featured + Other) ───────────────────────── */
function AllProjects() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" ref={ref} style={{ background: "#070707", paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ padding: "0 clamp(1.5rem,6vw,6rem)", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <span className="sans" style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8a96e" }}>Work</span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginTop: "0.8rem" }}>
            <h2 className="serif" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 300, color: "#f0ebe0", lineHeight: 1 }}>
              All <span className="gold-text">Projects</span>
            </h2>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#c8a96e", display: "inline-block" }} />
              <span className="sans" style={{ fontSize: "0.72rem", color: "#333", letterSpacing: "0.08em" }}>
                ★ Featured projects highlighted
              </span>
            </div>
          </div>
        </div>

        {/* Featured cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "4rem" }}>
          {FEATURED.map((p, i) => (
            <div key={i} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(40px)", transition: `all 0.8s ease ${i * 0.15}s` }}>
              {/* Featured badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8a96e" }} />
                <span className="sans" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a96e" }}>Featured</span>
              </div>
              <FeaturedCard project={p} index={i} />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(200,169,110,0.08)", marginBottom: "3rem", paddingTop: "3rem" }}>
          <span className="sans" style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#333" }}>More Work</span>
        </div>

        {/* Other projects grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {OTHER.map((p, i) => (
            <OtherCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────── */
function About() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} style={{ padding: "80px 0", background: "#070707", borderTop: "1px solid rgba(200,169,110,0.06)" }}>
      <div style={{ padding: "0 clamp(1.5rem,6vw,6rem)", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(2rem,5vw,5rem)", alignItems: "flex-start" }}>

          <div style={{ flex: "1 1 340px", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-30px)", transition: "all 0.8s ease" }}>
            <span className="sans" style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8a96e" }}>About Me</span>
            <h2 className="serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#f0ebe0", marginTop: "0.8rem", marginBottom: "1.4rem", lineHeight: 1.1 }}>
              Stories People<br />Actually <span className="gold-text">Care About</span>
            </h2>
            <div style={{ width: "40px", height: "1px", background: "#c8a96e", marginBottom: "1.8rem" }} />
            {[
              "I'm Naveen R, a social media strategist focused on turning brands into stories people actually care about.",
              "I don't just create content — I build positioning, narrative, and performance-driven ecosystems across platforms.",
              "My work sits at the intersection of creativity, audience psychology, and data, where every post, reel, and campaign serves a clear purpose — whether it's awareness, engagement, or conversion.",
              "With experience across F&B, lifestyle, retail, and financial consulting, I've also worked as a Content Strategist at a company owned by Madan Gowri, contributing to YouTube content for a large-scale audience.",
            ].map((t, i) => <p key={i} className="sans" style={{ fontSize: "0.88rem", color: "#505050", lineHeight: 1.8, marginBottom: "1rem" }}>{t}</p>)}
            <div style={{ marginTop: "1.4rem" }}>
              <span className="sans" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a96e", display: "block", marginBottom: "0.8rem" }}>I specialize in</span>
              {["Brand storytelling through content", "Campaign ideation & execution", "Social media growth systems", "Performance-led content strategies"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#c8a96e", flexShrink: 0 }} />
                  <span className="sans" style={{ fontSize: "0.82rem", color: "#444" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "0.8rem", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(30px)", transition: "all 0.8s ease 0.2s" }}>
            <div style={{ marginBottom: "0.6rem" }}>
              <span className="sans" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a96e" }}>My Approach</span>
            </div>
            {[
              { num: "01", title: "Brand Alignment", desc: "Understanding the brand voice, positioning, and audience behavior." },
              { num: "02", title: "Content Strategy", desc: "Designing content pillars that balance value, relatability, and virality." },
              { num: "03", title: "Execution Excellence", desc: "From ideation → shoot → edit → publish → optimize." },
              { num: "04", title: "Performance Tracking", desc: "Every piece measured — reach, engagement, retention, and growth." },
              { num: "05", title: "Iteration & Scaling", desc: "Doubling down on what works and evolving continuously." },
            ].map((a, i) => (
              <div key={i} style={{ padding: "1.2rem 1.6rem", background: "#0c0c0c", border: "1px solid rgba(200,169,110,0.08)", borderRadius: "2px", display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                <span className="serif" style={{ fontSize: "0.72rem", color: "#c8a96e", opacity: 0.4, flexShrink: 0, marginTop: "2px" }}>{a.num}</span>
                <div>
                  <div className="sans" style={{ fontSize: "0.88rem", color: "#f0ebe0", fontWeight: 500, marginBottom: "0.3rem" }}>{a.title}</div>
                  <div className="sans" style={{ fontSize: "0.8rem", color: "#444", lineHeight: 1.6 }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────── */
function Services() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} style={{ padding: "80px 0", background: "#0a0a0a", borderTop: "1px solid rgba(200,169,110,0.06)" }}>
      <div style={{ padding: "0 clamp(1.5rem,6vw,6rem)", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="sans" style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8a96e" }}>What I Do</span>
          <h2 className="serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#f0ebe0", marginTop: "0.5rem" }}>Services</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{ padding: "2rem", background: "#0d0d0d", border: "1px solid rgba(200,169,110,0.08)", borderRadius: "2px", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: `all 0.6s ease ${i * 0.08}s`, cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,169,110,0.35)"; e.currentTarget.style.background = "rgba(200,169,110,0.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,169,110,0.08)"; e.currentTarget.style.background = "#0d0d0d"; }}>
              <span style={{ fontSize: "1.3rem", color: "#c8a96e", marginBottom: "1rem", display: "block" }}>{s.icon}</span>
              <div className="sans" style={{ fontSize: "0.9rem", color: "#f0ebe0", fontWeight: 500, marginBottom: "0.5rem" }}>{s.title}</div>
              <div className="sans" style={{ fontSize: "0.82rem", color: "#404040", lineHeight: 1.65 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Quote ──────────────────────────────────────────────────── */
function Quote() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: "100px 24px", background: "#070707", textAlign: "center", borderTop: "1px solid rgba(200,169,110,0.06)" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: "all 1s ease" }}>
        <span style={{ fontSize: "3rem", color: "rgba(200,169,110,0.15)", fontFamily: "Georgia,serif", lineHeight: 1 }}>"</span>
        <p className="serif" style={{ fontSize: "clamp(1.4rem,3.5vw,2.2rem)", fontWeight: 300, color: "#f0ebe0", lineHeight: 1.4, fontStyle: "italic", margin: "-1rem 0 1.5rem" }}>
          I don't just manage social media —<br /><span className="gold-text">I build brands that people remember,<br />engage with, and come back to.</span>
        </p>
        <span className="sans" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2a2a2a" }}>— Naveen R</span>
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────── */
function Contact() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} style={{ padding: "80px 0 60px", background: "#0a0a0a", borderTop: "1px solid rgba(200,169,110,0.1)" }}>
      <div style={{ padding: "0 clamp(1.5rem,6vw,6rem)", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(2rem,5vw,4rem)", alignItems: "flex-start", justifyContent: "space-between" }}>

          <div style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.8s ease", flex: "1 1 300px" }}>
            <span className="sans" style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c8a96e" }}>Let's Connect</span>
            <h2 className="serif" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", fontWeight: 300, color: "#f0ebe0", marginTop: "0.8rem", lineHeight: 1.1 }}>
              Ready to Build<br />Something<br /><span className="gold-text">Impactful?</span>
            </h2>
            <p className="sans" style={{ fontSize: "0.88rem", color: "#404040", lineHeight: 1.7, marginTop: "1.5rem", maxWidth: "340px" }}>
              Whether you're launching a brand, scaling a campaign, or rethinking your content strategy — let's talk.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.8s ease 0.2s", flex: "1 1 320px", maxWidth: "420px" }}>
            {[
              {
                href: "mailto:rkenaveen@gmail.com", label: "Email", value: "rkenaveen@gmail.com",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              },
              {
                href: "https://www.linkedin.com/in/naveen-rke-50163021b", label: "LinkedIn", value: "Naveen Rke",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="#c8a96e"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              },
            ].map(({ href, label, value, icon }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{ padding: "1.4rem 1.8rem", background: "#0d0d0d", border: "1px solid rgba(200,169,110,0.12)", borderRadius: "2px", textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem", transition: "all 0.35s ease" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8a96e"; e.currentTarget.style.background = "rgba(200,169,110,0.04)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,169,110,0.12)"; e.currentTarget.style.background = "#0d0d0d"; e.currentTarget.style.transform = "none"; }}>
                <div style={{ width: "40px", height: "40px", border: "1px solid rgba(200,169,110,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {icon}
                </div>
                <div>
                  <div className="sans" style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#2a2a2a", marginBottom: "2px" }}>{label}</div>
                  <div className="sans" style={{ fontSize: "0.86rem", color: "#c8a96e" }}>{value}</div>
                </div>
              </a>
            ))}

            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.6rem 1.8rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c8a96e", opacity: 0.35, animation: "pulse 2s ease-in-out infinite" }} />
              {/* <span className="sans" style={{ fontSize: "0.76rem", color: "#2e2e2e", letterSpacing: "0.05em" }}>Based in Chennai · Open to Remote Projects</span> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ padding: "24px", borderTop: "1px solid rgba(200,169,110,0.06)", background: "#070707" }}>
      <div style={{ padding: "0 clamp(1.5rem,4vw,4rem)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", maxWidth: "1200px", margin: "0 auto" }}>
        <span className="serif" style={{ color: "#c8a96e", fontSize: "1rem" }}>NR</span>
        <span className="sans" style={{ fontSize: "0.65rem", color: "#1e1e1e", letterSpacing: "0.1em" }}>© 2025 Naveen R · Social Media Strategist</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Work", "About", "Contact"].map(l => (
            <button key={l} className="sans" onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.65rem", color: "#2a2a2a", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = "#c8a96e"} onMouseLeave={e => e.target.style.color = "#2a2a2a"}>{l}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── App ────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="grain-overlay" style={{ background: "#070707", minHeight: "100vh" }}>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <Metrics />
      <AllProjects />
      <About />
      <Services />
      <Quote />
      <Contact />
      <Footer />
    </div>
  );
}
