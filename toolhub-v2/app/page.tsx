"use client";
import { motion } from "motion/react";
import { useEffect } from "react";
import Nav from "./components/Nav";

// ─── STATS (edit freely) ──────────────────────────────────────────────────────
const STATS = [
  { value: "60+", label: "Free Tools" },
  { value: "20+", label: "Courses" },
  { value: "0", label: "Paywalls" },
  { value: "∞", label: "Use Cases" },
];

// ─── FEATURED CATEGORIES on homepage ─────────────────────────────────────────
const FEATURED = [
  {
    emoji: "📄",
    title: "PDF & Docs",
    desc: "Convert, compress, merge, split, and edit PDFs for free — no signup required.",
    href: "/tools#pdf",
    tag: "Tools",
    tagClass: "tag-pdf",
  },
  {
    emoji: "🎨",
    title: "Image Editing",
    desc: "Remove backgrounds, resize, compress, and enhance photos in seconds.",
    href: "/tools#image",
    tag: "Tools",
    tagClass: "tag-image",
  },
  {
    emoji: "✍️",
    title: "Writing Aids",
    desc: "Paraphrase, grammar-check, cite sources, and structure essays effortlessly.",
    href: "/tools#write",
    tag: "Tools",
    tagClass: "tag-write",
  },
  {
    emoji: "💻",
    title: "Dev & Code",
    desc: "Sandboxes, snippet formatters, regex testers, and API mock tools.",
    href: "/tools#dev",
    tag: "Tools",
    tagClass: "tag-dev",
  },
  {
    emoji: "🎓",
    title: "CS & Programming",
    desc: "Harvard CS50, The Odin Project, freeCodeCamp — top free coding curricula.",
    href: "/courses#cs",
    tag: "Courses",
    tagClass: "tag-cs",
  },
  {
    emoji: "📊",
    title: "Data & ML",
    desc: "Kaggle Learn, fast.ai, Google ML Crash Course — learn to build models.",
    href: "/courses#data",
    tag: "Courses",
    tagClass: "tag-data",
  },
];

export default function Home() {
  // Mouse-tracked glow effect
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main className="bg-[#080808] min-h-screen text-white overflow-x-hidden">
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 glow-cursor"
        aria-hidden="true"
      />

      {/* Dot grid */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <Nav active="home" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 pt-20">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03]"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">
            For students. By a student.
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(20px)", y: 30 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3rem,10vw,8rem)] leading-[0.95] tracking-tighter font-medium"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Stop searching,
          <br />
          <em className="text-white/35 font-light">start doing.</em>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 text-base text-white/35 max-w-md mx-auto leading-relaxed font-light"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Every free tool and course a student actually needs —
          no paywalls, no subscriptions, no nonsense.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <a
            href="/tools"
            className="px-8 py-3.5 rounded-full bg-[#f5a623] text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Browse Tools →
          </a>
          <a
            href="/courses"
            className="px-8 py-3.5 rounded-full border border-white/10 text-white/60 text-[11px] uppercase tracking-[0.2em] hover:border-white/30 hover:text-white transition-all duration-300"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Free Courses
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          <span className="text-[9px] uppercase tracking-[0.5em] text-white/20">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS ROW ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#080808] p-8 text-center hover:bg-white/[0.02] transition-colors"
            >
              <div
                className="text-4xl font-medium text-[#f5a623] mb-2"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {s.value}
              </div>
              <div
                className="text-[10px] uppercase tracking-[0.3em] text-white/30"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURED GRID ──────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pb-32">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.4em] text-[#f5a623] mb-3"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              What's inside
            </p>
            <h2
              className="text-4xl md:text-5xl font-medium tracking-tighter"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Every category,
              <br />
              <em className="text-white/30 font-light">covered.</em>
            </h2>
          </div>
          <a
            href="/tools"
            className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-[#f5a623] transition-colors border-b border-white/10 pb-0.5"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            See all tools ↗
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.01] card-hover-glow overflow-hidden cursor-pointer block"
            >
              {/* Hover glow blob */}
              <div className="absolute -inset-1 bg-[#f5a623]/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl rounded-2xl pointer-events-none" />

              <div className="relative z-10">
                {/* Top row */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-2xl">{item.emoji}</span>
                  <span
                    className={`px-2.5 py-1 rounded-full border text-[9px] uppercase tracking-[0.25em] ${item.tagClass}`}
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {item.tag}
                  </span>
                </div>

                <h3
                  className="text-xl font-medium mb-3 group-hover:text-[#f5a623] transition-colors"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-white/35 text-sm leading-relaxed font-light"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {item.desc}
                </p>

                <div
                  className="mt-6 text-[#f5a623] text-[9px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0 flex items-center gap-2"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Explore <span>↗</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.04] py-14 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div
            className="text-[10px] uppercase tracking-[0.4em] text-white/20"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            © {new Date().getFullYear()} ToolHub — Free. Always.
          </div>
          <div
            className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-white/20"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <a href="/tools" className="hover:text-white/60 transition-colors">Tools</a>
            <a href="/courses" className="hover:text-white/60 transition-colors">Courses</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
