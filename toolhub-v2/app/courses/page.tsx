"use client";
import { motion } from "motion/react";
import { useState } from "react";
import Nav from "../components/Nav";

// ═══════════════════════════════════════════════════════════════════════════════
// 📌 HOW TO ADD A COURSE
// ───────────────────────────────────────────────────────────────────────────────
// 1. Find the right category below, or create a new one.
// 2. Inside the category's `courses` array, copy any existing course object and fill in:
//      name      → Course/platform name
//      provider  → Who offers it (e.g. "Harvard", "Google", "YouTube")
//      desc      → One-sentence description
//      url       → Full URL (include https://)
//      level     → "Beginner" | "Intermediate" | "Advanced" | "All Levels"
//      free      → true = completely free forever, false = free to audit / limited
//      cert      → true = offers free certificate, false = no cert
//      hours     → Estimated total hours (optional, "" to omit)
// 3. Save. Done.
//
// 📌 HOW TO ADD A CATEGORY
// ───────────────────────────────────────────────────────────────────────────────
// Copy an existing category block and paste it at the end of COURSE_CATEGORIES.
// Give it a unique id, emoji, label, and tagClass (see globals.css for options).
// ═══════════════════════════════════════════════════════════════════════════════

type Course = {
  name: string;
  provider: string;
  desc: string;
  url: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  free: boolean;
  cert: boolean;
  hours: string;
};

type CourseCategory = {
  id: string;
  emoji: string;
  label: string;
  tagClass: string;
  courses: Course[];
};

// ─── COURSE LIBRARY ───────────────────────────────────────────────────────────
// ↓↓↓ ADD / EDIT CATEGORIES AND COURSES BELOW ↓↓↓

const COURSE_CATEGORIES: CourseCategory[] = [
  // ─── CS & PROGRAMMING ─────────────────────────────────────────────────────
  {
    id: "cs",
    emoji: "💻",
    label: "CS & Programming",
    tagClass: "tag-cs",
    courses: [
      {
        name: "CS50: Intro to Computer Science",
        provider: "Harvard / edX",
        desc: "The most popular free CS course in the world. C, Python, SQL, and web basics.",
        url: "https://cs50.harvard.edu/x",
        level: "Beginner",
        free: true,
        cert: false,
        hours: "100+",
      },
      {
        name: "The Odin Project",
        provider: "Community",
        desc: "Full-stack web dev curriculum (HTML, CSS, JS, Ruby/Node). Project-based.",
        url: "https://www.theodinproject.com",
        level: "Beginner",
        free: true,
        cert: false,
        hours: "~1000",
      },
      {
        name: "freeCodeCamp",
        provider: "freeCodeCamp",
        desc: "10 certifications covering responsive web, JS, Python, ML, and more.",
        url: "https://www.freecodecamp.org",
        level: "Beginner",
        free: true,
        cert: true,
        hours: "300+",
      },
      {
        name: "MIT 6.0001: Intro to Python",
        provider: "MIT OpenCourseWare",
        desc: "MIT's official intro to Python programming. Lectures, problem sets, and exams.",
        url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/",
        level: "Beginner",
        free: true,
        cert: false,
        hours: "~40",
      },
      {
        name: "JavaScript.info",
        provider: "Community",
        desc: "The definitive modern JavaScript tutorial. From basics to advanced patterns.",
        url: "https://javascript.info",
        level: "All Levels",
        free: true,
        cert: false,
        hours: "~60",
      },
      {
        name: "OSSU Computer Science",
        provider: "Open Source Society University",
        desc: "A complete, free CS degree curriculum assembled from top university MOOCs.",
        url: "https://github.com/ossu/computer-science",
        level: "All Levels",
        free: true,
        cert: false,
        hours: "~2000",
      },
    ],
  },

  // ─── DATA SCIENCE & ML ────────────────────────────────────────────────────
  {
    id: "data",
    emoji: "📊",
    label: "Data Science & ML",
    tagClass: "tag-data",
    courses: [
      {
        name: "Machine Learning Specialization",
        provider: "Coursera / Andrew Ng",
        desc: "The classic ML course — linear regression, neural nets, SVMs. Free to audit.",
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
        level: "Intermediate",
        free: false,
        cert: false,
        hours: "~85",
      },
      {
        name: "Kaggle Learn",
        provider: "Kaggle",
        desc: "Bite-size courses on Python, Pandas, SQL, ML, and deep learning. Fully free.",
        url: "https://www.kaggle.com/learn",
        level: "Beginner",
        free: true,
        cert: true,
        hours: "~30",
      },
      {
        name: "fast.ai: Practical Deep Learning",
        provider: "fast.ai",
        desc: "Top-down, practical deep learning. Build real models before learning theory.",
        url: "https://course.fast.ai",
        level: "Intermediate",
        free: true,
        cert: false,
        hours: "~70",
      },
      {
        name: "Google ML Crash Course",
        provider: "Google",
        desc: "Google's internal ML training, now public. Covers TensorFlow basics.",
        url: "https://developers.google.com/machine-learning/crash-course",
        level: "Beginner",
        free: true,
        cert: false,
        hours: "~15",
      },
      {
        name: "Statistics with Python",
        provider: "University of Michigan / Coursera",
        desc: "Inferential stats, hypothesis testing, and regression — free to audit.",
        url: "https://www.coursera.org/specializations/statistics-with-python",
        level: "Beginner",
        free: false,
        cert: false,
        hours: "~50",
      },
    ],
  },

  // ─── DESIGN & UX ──────────────────────────────────────────────────────────
  {
    id: "design",
    emoji: "🎨",
    label: "Design & UX",
    tagClass: "tag-design",
    courses: [
      {
        name: "Google UX Design Certificate",
        provider: "Google / Coursera",
        desc: "7-course UX design path from scratch. Figma, prototyping, and user research.",
        url: "https://www.coursera.org/professional-certificates/google-ux-design",
        level: "Beginner",
        free: false,
        cert: true,
        hours: "~200",
      },
      {
        name: "Design for Non-Designers",
        provider: "Canva Design School",
        desc: "Visual design fundamentals — color, typography, layout. Free short courses.",
        url: "https://www.canva.com/designschool/courses/",
        level: "Beginner",
        free: true,
        cert: false,
        hours: "~10",
      },
      {
        name: "Figma for Beginners",
        provider: "Figma / YouTube",
        desc: "Official Figma crash course. Frames, auto-layout, components, and prototypes.",
        url: "https://www.youtube.com/playlist?list=PLXDU_eVOJTx7QHLShNqIXL1Cgbxj7HlN4",
        level: "Beginner",
        free: true,
        cert: false,
        hours: "~6",
      },
      {
        name: "Shift Nudge Interface Design",
        provider: "Shift Nudge",
        desc: "Deep-dive into UI components, spacing, and visual hierarchy. Paid but widely recommended.",
        url: "https://shiftnudge.com",
        level: "Intermediate",
        free: false,
        cert: false,
        hours: "~40",
      },
    ],
  },

  // ─── LANGUAGES ────────────────────────────────────────────────────────────
  {
    id: "lang",
    emoji: "🌍",
    label: "Languages",
    tagClass: "tag-lang",
    courses: [
      {
        name: "Duolingo",
        provider: "Duolingo",
        desc: "40+ languages. Gamified lessons keep you coming back daily. Surprisingly effective.",
        url: "https://www.duolingo.com",
        level: "Beginner",
        free: false,
        cert: false,
        hours: "Ongoing",
      },
      {
        name: "Language Transfer",
        provider: "Language Transfer",
        desc: "Audio-first language courses. Completely free. Arabic, Spanish, French, Swahili.",
        url: "https://www.languagetransfer.org",
        level: "Beginner",
        free: true,
        cert: false,
        hours: "~15",
      },
      {
        name: "Anki Flashcards",
        provider: "Anki",
        desc: "Spaced repetition flashcard app used by med students worldwide. Language decks.",
        url: "https://apps.ankiweb.net",
        level: "All Levels",
        free: true,
        cert: false,
        hours: "Ongoing",
      },
      {
        name: "Pimsleur (Intro)",
        provider: "Pimsleur",
        desc: "Audio-based language learning. First lesson free for 50+ languages.",
        url: "https://www.pimsleur.com",
        level: "Beginner",
        free: false,
        cert: false,
        hours: "~30",
      },
    ],
  },

  // ─── BUSINESS & PRODUCTIVITY ──────────────────────────────────────────────
  {
    id: "biz",
    emoji: "📈",
    label: "Business & Productivity",
    tagClass: "tag-biz",
    courses: [
      {
        name: "Financial Markets",
        provider: "Yale / Coursera",
        desc: "Robert Shiller's legendary Yale finance course. Free to audit on Coursera.",
        url: "https://www.coursera.org/learn/financial-markets-global",
        level: "Beginner",
        free: false,
        cert: false,
        hours: "~33",
      },
      {
        name: "Introduction to Negotiation",
        provider: "Yale / Coursera",
        desc: "Game theory and strategy for negotiation. Totally free to audit.",
        url: "https://www.coursera.org/learn/negotiation",
        level: "Beginner",
        free: false,
        cert: false,
        hours: "~20",
      },
      {
        name: "Paul Graham's Essays",
        provider: "paulgraham.com",
        desc: "Not a course, but required reading for anyone interested in startups or thinking clearly.",
        url: "http://www.paulgraham.com/articles.html",
        level: "All Levels",
        free: true,
        cert: false,
        hours: "~20",
      },
      {
        name: "Khan Academy — Finance",
        provider: "Khan Academy",
        desc: "Personal finance, banking, credit, and taxes explained simply. Completely free.",
        url: "https://www.khanacademy.org/economics-finance-domain",
        level: "Beginner",
        free: true,
        cert: false,
        hours: "~20",
      },
    ],
  },

  // ─── STEM FOUNDATIONS ─────────────────────────────────────────────────────
  {
    id: "stem",
    emoji: "🔬",
    label: "STEM Foundations",
    tagClass: "tag-stem",
    courses: [
      {
        name: "Khan Academy",
        provider: "Khan Academy",
        desc: "Math from arithmetic to calculus, chemistry, physics, and biology. Truly free.",
        url: "https://www.khanacademy.org",
        level: "All Levels",
        free: true,
        cert: false,
        hours: "Ongoing",
      },
      {
        name: "MIT OpenCourseWare",
        provider: "MIT",
        desc: "Full lecture notes, exams, and readings from thousands of MIT courses. Free forever.",
        url: "https://ocw.mit.edu",
        level: "All Levels",
        free: true,
        cert: false,
        hours: "Varies",
      },
      {
        name: "3Blue1Brown (YouTube)",
        provider: "3Blue1Brown",
        desc: "Visual math explanations — linear algebra, calculus, neural networks, topology.",
        url: "https://www.youtube.com/@3blue1brown",
        level: "All Levels",
        free: true,
        cert: false,
        hours: "~50",
      },
      {
        name: "Brilliant",
        provider: "Brilliant",
        desc: "Interactive problem-solving courses in math, CS, and science. Free tier available.",
        url: "https://brilliant.org",
        level: "All Levels",
        free: false,
        cert: false,
        hours: "Ongoing",
      },
      {
        name: "Crash Course (YouTube)",
        provider: "Crash Course",
        desc: "10-min episodes covering every STEM subject. Made with PBS. Always free.",
        url: "https://www.youtube.com/@crashcourse",
        level: "Beginner",
        free: true,
        cert: false,
        hours: "~200",
      },
    ],
  },

  // ─── ✦ ADD YOUR NEXT CATEGORY HERE ✦ ──────────────────────────────────────
  // Copy the block below, uncomment it, and fill in your details:
  //
  // {
  //   id: "your-id",          ← unique, lowercase, no spaces
  //   emoji: "📚",
  //   label: "Your Category",
  //   tagClass: "tag-stem",   ← pick from: tag-cs, tag-data, tag-design,
  //                                         tag-lang, tag-biz, tag-stem
  //   courses: [
  //     {
  //       name: "Course Name",
  //       provider: "Platform / Creator",
  //       desc: "One-sentence description of what you learn.",
  //       url: "https://example.com",
  //       level: "Beginner",  ← "Beginner" | "Intermediate" | "Advanced" | "All Levels"
  //       free: true,
  //       cert: false,
  //       hours: "~20",
  //     },
  //     // ... add more courses
  //   ],
  // },
];

// ─── LEVEL BADGE STYLES ───────────────────────────────────────────────────────
const levelStyle: Record<string, string> = {
  Beginner: "text-emerald-400 border-emerald-500/25 bg-emerald-500/5",
  Intermediate: "text-amber-400 border-amber-500/25 bg-amber-500/5",
  Advanced: "text-rose-400 border-rose-500/25 bg-rose-500/5",
  "All Levels": "text-sky-400 border-sky-500/25 bg-sky-500/5",
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT — no need to edit below this line unless changing layout/UI
// ═══════════════════════════════════════════════════════════════════════════════

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  const levels = ["all", "Beginner", "Intermediate", "Advanced", "All Levels"];

  const filtered = COURSE_CATEGORIES.map((cat) => ({
    ...cat,
    courses: cat.courses.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        c.name.toLowerCase().includes(q) ||
        c.provider.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q);
      const matchLevel = levelFilter === "all" || c.level === levelFilter;
      return matchSearch && matchLevel;
    }),
  })).filter((cat) => {
    if (activeCategory !== "all" && cat.id !== activeCategory) return false;
    return cat.courses.length > 0;
  });

  const totalCourses = COURSE_CATEGORIES.reduce((acc, c) => acc + c.courses.length, 0);

  return (
    <main className="bg-[#080808] min-h-screen text-white overflow-x-hidden">
      <Nav active="courses" />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-36 pb-16 px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.5em] text-[#f5a623] mb-4"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Library / Courses
          </p>
          <h1
            className="text-5xl md:text-7xl font-medium tracking-tighter leading-none mb-6"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            World-class
            <br />
            <em className="text-white/25 font-light">education. Free.</em>
          </h1>
          <p
            className="text-white/35 text-sm max-w-md leading-relaxed"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {totalCourses} curated courses across {COURSE_CATEGORIES.length} fields.
            Ranging from free-forever to free-to-audit.
          </p>
        </motion.div>
      </section>

      {/* ── FILTER BAR ─────────────────────────────────────────────────────── */}
      <section className="sticky top-[64px] z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.04] px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3.5 py-1.5 rounded-full text-[9px] uppercase tracking-[0.25em] border transition-all ${
                activeCategory === "all"
                  ? "bg-[#f5a623] text-black border-[#f5a623]"
                  : "border-white/10 text-white/30 hover:border-white/25 hover:text-white/60"
              }`}
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              All
            </button>
            {COURSE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-[9px] uppercase tracking-[0.25em] border transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-[#f5a623] text-black border-[#f5a623]"
                    : "border-white/10 text-white/30 hover:border-white/25 hover:text-white/60"
                }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}

            {/* Search — right aligned */}
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-auto bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2 text-[11px] text-white/70 placeholder-white/20 focus:outline-none focus:border-[#f5a623]/40 w-full md:w-56 transition-colors"
              style={{ fontFamily: "'DM Mono', monospace" }}
            />
          </div>

          {/* Level filter */}
          <div className="flex gap-2 flex-wrap">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                className={`px-3 py-1 rounded-full text-[8px] uppercase tracking-[0.2em] border transition-all ${
                  levelFilter === l
                    ? "border-white/30 text-white/70 bg-white/5"
                    : "border-white/[0.06] text-white/20 hover:text-white/40"
                }`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {l === "all" ? "All Levels" : l}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSE GRID ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-8 py-16 space-y-20 relative z-10">
        {filtered.length === 0 && (
          <div className="text-center py-32 text-white/20 text-sm" style={{ fontFamily: "'DM Mono', monospace" }}>
            No courses found
          </div>
        )}

        {filtered.map((cat) => (
          <div key={cat.id} id={cat.id}>
            {/* Category heading */}
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/[0.05]">
              <span className="text-2xl">{cat.emoji}</span>
              <h2
                className="text-2xl font-medium"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {cat.label}
              </h2>
              <span
                className={`ml-auto px-2.5 py-0.5 rounded-full border text-[9px] uppercase tracking-[0.25em] ${cat.tagClass}`}
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {cat.courses.length} courses
              </span>
            </div>

            {/* Course cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {cat.courses.map((course, ci) => (
                <motion.a
                  key={ci}
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.05 }}
                  className="group relative p-7 rounded-2xl border border-white/[0.06] bg-white/[0.01] card-hover-glow overflow-hidden flex flex-col justify-between min-h-[220px]"
                >
                  <div className="absolute inset-0 bg-[#f5a623]/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-2xl pointer-events-none" />

                  <div className="relative z-10">
                    {/* Provider chip */}
                    <div className="mb-4">
                      <span
                        className="text-[9px] uppercase tracking-[0.3em] text-white/30 bg-white/[0.04] px-2.5 py-1 rounded-full"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {course.provider}
                      </span>
                    </div>

                    <h3
                      className="text-lg font-medium mb-2.5 group-hover:text-[#f5a623] transition-colors leading-snug"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {course.name}
                    </h3>
                    <p
                      className="text-white/35 text-xs leading-relaxed font-light"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {course.desc}
                    </p>
                  </div>

                  {/* Bottom metadata */}
                  <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2">
                    {/* Level */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-[8px] uppercase tracking-[0.2em] ${levelStyle[course.level]}`}
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {course.level}
                    </span>

                    {/* Free badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-[8px] uppercase tracking-[0.2em] ${
                        course.free
                          ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
                          : "text-amber-400 border-amber-500/20 bg-amber-500/5"
                      }`}
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {course.free ? "Free" : "Free Audit"}
                    </span>

                    {/* Cert badge */}
                    {course.cert && (
                      <span
                        className="px-2.5 py-0.5 rounded-full border text-[8px] uppercase tracking-[0.2em] text-sky-400 border-sky-500/20 bg-sky-500/5"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        Cert ✓
                      </span>
                    )}

                    {/* Hours */}
                    {course.hours && (
                      <span
                        className="ml-auto text-white/20 text-[9px]"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        ~{course.hours} hrs
                      </span>
                    )}

                    {/* Open arrow */}
                    <span
                      className="w-full text-right text-[#f5a623] text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Open ↗
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.04] py-14 px-8 mt-10">
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
            <a href="/" className="hover:text-white/60 transition-colors">Home</a>
            <a href="/tools" className="hover:text-white/60 transition-colors">Tools</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
