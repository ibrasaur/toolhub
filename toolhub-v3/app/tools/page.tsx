"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";

// ═══════════════════════════════════════════════════════════════════════════════
// 📌 HOW TO ADD A TOOL
// ───────────────────────────────────────────────────────────────────────────────
// 1. Find the category you want below, inside its `tools` array.
// 2. Copy any existing tool object and fill in:
//      name  → Display name
//      desc  → One-line description
//      url   → Full URL with https://
//      free  → true = fully free | false = freemium
//      tags  → Short keyword tags (optional)
// 3. Save. Done.
//
// 📌 HOW TO ADD A CATEGORY
// ───────────────────────────────────────────────────────────────────────────────
// Copy any full category block, paste at the end of TOOL_CATEGORIES,
// give it a unique id, emoji, label, and tagClass from globals.css.
// ═══════════════════════════════════════════════════════════════════════════════

type Tool = {
  name: string;
  desc: string;
  url: string;
  free: boolean;
  tags?: string[];
};

type Category = {
  id: string;
  emoji: string;
  label: string;
  tagClass: string;
  tools: Tool[];
};

const TOOL_CATEGORIES: Category[] = [
  {
    id: "pdf",
    emoji: "📄",
    label: "PDF & Docs",
    tagClass: "tag-pdf",
    tools: [
      { name: "iLovePDF", desc: "Convert, merge, split, compress, and edit PDFs. Full suite, no signup needed.", url: "https://www.ilovepdf.com", free: true, tags: ["convert", "merge", "compress"] },
      { name: "Smallpdf", desc: "PDF to Word, Excel, PPT — and back. Simple drag-and-drop interface.", url: "https://smallpdf.com", free: false, tags: ["pdf to word", "compress"] },
      { name: "PDF24", desc: "20+ PDF tools, totally free and browser-based. No file size limits.", url: "https://tools.pdf24.org", free: true, tags: ["ocr", "split", "merge"] },
      { name: "LibreOffice", desc: "Full office suite. Edit DOCX, XLSX, PPTX for free, forever.", url: "https://www.libreoffice.org", free: true, tags: ["word", "excel", "presentations"] },
      { name: "Sejda", desc: "Edit PDF text, add signatures, fill forms, and annotate — all free.", url: "https://www.sejda.com", free: false, tags: ["edit text", "sign", "forms"] },
      { name: "OCR.space", desc: "Extract text from scanned PDFs and images. Supports 25+ languages.", url: "https://ocr.space", free: true, tags: ["ocr", "scan", "extract text"] },
    ],
  },
  {
    id: "image",
    emoji: "🎨",
    label: "Image Editing",
    tagClass: "tag-image",
    tools: [
      { name: "Remove.bg", desc: "Remove image backgrounds instantly with AI. Free for standard resolution.", url: "https://www.remove.bg", free: false, tags: ["background removal", "ai"] },
      { name: "Squoosh", desc: "Compress and convert images (WEBP, AVIF, PNG, JPG) with zero quality loss.", url: "https://squoosh.app", free: true, tags: ["compress", "convert", "webp"] },
      { name: "Canva", desc: "Design posters, presentations, and social media graphics. Generous free tier.", url: "https://www.canva.com", free: false, tags: ["design", "posters", "social"] },
      { name: "Photopea", desc: "Full Photoshop-like editor in the browser. Supports PSD, XCF, Sketch files.", url: "https://www.photopea.com", free: true, tags: ["photoshop", "psd", "layers"] },
      { name: "Upscayl", desc: "AI image upscaler. Make low-res images crisp and high-resolution for free.", url: "https://upscayl.org", free: true, tags: ["upscale", "ai", "resolution"] },
      { name: "Birme", desc: "Batch resize images to exact dimensions. Download as ZIP. No watermark.", url: "https://www.birme.net", free: true, tags: ["resize", "batch"] },
      { name: "Pixlr", desc: "Lightweight online photo editor with filters, adjustments, and overlays.", url: "https://pixlr.com", free: false, tags: ["filters", "retouch"] },
    ],
  },
  {
    id: "write",
    emoji: "✍️",
    label: "Writing & Research",
    tagClass: "tag-write",
    tools: [
      { name: "QuillBot", desc: "Paraphrase sentences, summarize text, and check grammar. Free tier is solid.", url: "https://quillbot.com", free: false, tags: ["paraphrase", "summarize", "grammar"] },
      { name: "Grammarly", desc: "Real-time grammar and spelling checker. The free plan covers 90% of needs.", url: "https://www.grammarly.com", free: false, tags: ["grammar", "spelling", "tone"] },
      { name: "ZLibrary", desc: "The world's largest e-book library. Free access to textbooks and research papers.", url: "https://z-lib.id", free: true, tags: ["ebooks", "textbooks", "papers"] },
      { name: "Zotero", desc: "Citation manager. Collect, organize, and generate citations in any style.", url: "https://www.zotero.org", free: true, tags: ["citations", "bibliography", "research"] },
      { name: "Hemingway Editor", desc: "Highlights complex sentences, passive voice, and adverbs. Makes writing sharp.", url: "https://hemingwayapp.com", free: true, tags: ["clarity", "readability"] },
      { name: "Sci-Hub", desc: "Access research papers and academic journals that are behind paywalls.", url: "https://sci-hub.se", free: true, tags: ["research papers", "academic"] },
      { name: "WordCounter", desc: "Count words, characters, sentences. Check keyword density and reading time.", url: "https://wordcounter.net", free: true, tags: ["word count", "analyze"] },
    ],
  },
  {
    id: "dev",
    emoji: "💻",
    label: "Dev & Code",
    tagClass: "tag-dev",
    tools: [
      { name: "CodePen", desc: "HTML/CSS/JS sandbox in the browser. Instant preview, shareable snippets.", url: "https://codepen.io", free: false, tags: ["sandbox", "frontend", "html/css/js"] },
      { name: "CodeSandbox", desc: "Full dev environment for React, Vue, Node.js — runs in the browser.", url: "https://codesandbox.io", free: false, tags: ["react", "node", "sandbox"] },
      { name: "Regex101", desc: "Build, test, and debug regular expressions with detailed explanations.", url: "https://regex101.com", free: true, tags: ["regex", "testing"] },
      { name: "Prettier Playground", desc: "Format and prettify code in JS, CSS, HTML, JSON, TypeScript instantly.", url: "https://prettier.io/playground", free: true, tags: ["format", "beautify"] },
      { name: "JSON Formatter", desc: "Validate, format, and minify JSON. Great for working with APIs.", url: "https://jsonformatter.curiousconcept.com", free: true, tags: ["json", "api", "validate"] },
      { name: "Replit", desc: "Browser IDE supporting 50+ languages. Collaborate and share projects easily.", url: "https://replit.com", free: false, tags: ["ide", "python", "collaborate"] },
      { name: "ExplainShell", desc: "Paste any shell command and get a detailed explanation of each argument.", url: "https://explainshell.com", free: true, tags: ["bash", "terminal", "explain"] },
      { name: "GitExplorer", desc: "Find the right git command for any scenario without memorizing flags.", url: "https://gitexplorer.com", free: true, tags: ["git", "commands"] },
    ],
  },
  {
    id: "video",
    emoji: "🎬",
    label: "Video & Media",
    tagClass: "tag-video",
    tools: [
      { name: "HandBrake", desc: "Open-source video transcoder. Convert any video format to MP4, MKV, WebM.", url: "https://handbrake.fr", free: true, tags: ["convert", "compress", "transcode"] },
      { name: "Clideo", desc: "Trim, merge, compress, and convert videos online. No install required.", url: "https://clideo.com", free: false, tags: ["trim", "merge", "online"] },
      { name: "Kapwing", desc: "Edit videos, add subtitles, remove silence, and meme-ify clips in browser.", url: "https://www.kapwing.com", free: false, tags: ["subtitles", "edit"] },
      { name: "DaVinci Resolve", desc: "Professional-grade video editor. The free version is absurdly feature-rich.", url: "https://www.blackmagicdesign.com/products/davinciresolve", free: true, tags: ["editing", "color grade", "professional"] },
      { name: "yt-dlp", desc: "Download videos from YouTube, Vimeo, and 1000+ sites via command line.", url: "https://github.com/yt-dlp/yt-dlp", free: true, tags: ["download", "youtube", "cli"] },
    ],
  },
  {
    id: "ai",
    emoji: "🤖",
    label: "AI Tools",
    tagClass: "tag-ai",
    tools: [
      { name: "Claude", desc: "Anthropic's AI — great for writing, analysis, coding, and long documents.", url: "https://claude.ai", free: false, tags: ["writing", "coding", "analysis"] },
      { name: "ChatGPT", desc: "OpenAI's flagship AI. Versatile for Q&A, brainstorming, and code review.", url: "https://chat.openai.com", free: false, tags: ["q&a", "brainstorm", "code"] },
      { name: "Perplexity AI", desc: "AI search engine that cites sources. Great for research and fact-checking.", url: "https://www.perplexity.ai", free: false, tags: ["search", "research", "citations"] },
      { name: "Napkin AI", desc: "Turn plain text into diagrams, charts, and visuals automatically.", url: "https://www.napkin.ai", free: false, tags: ["diagrams", "visuals"] },
      { name: "ElevenLabs", desc: "Text-to-speech with ultra-realistic AI voices. Free tier available.", url: "https://elevenlabs.io", free: false, tags: ["voice", "tts", "audio"] },
      { name: "Adobe Podcast Enhance", desc: "Remove background noise and enhance voice quality with AI. Surprisingly free.", url: "https://podcast.adobe.com/enhance", free: true, tags: ["noise removal", "ai", "voice"] },
    ],
  },
  {
    id: "math",
    emoji: "🧮",
    label: "Math & Science",
    tagClass: "tag-math",
    tools: [
      { name: "Wolfram Alpha", desc: "Solve equations, integrals, derivatives, and get step-by-step solutions.", url: "https://www.wolframalpha.com", free: false, tags: ["equations", "calculus", "step-by-step"] },
      { name: "Desmos", desc: "Interactive graphing calculator. Plot functions, inequalities, and data sets.", url: "https://www.desmos.com/calculator", free: true, tags: ["graphing", "functions", "calculator"] },
      { name: "GeoGebra", desc: "Dynamic geometry, algebra, and statistics for all levels of math.", url: "https://www.geogebra.org", free: true, tags: ["geometry", "algebra", "statistics"] },
      { name: "Symbolab", desc: "Step-by-step math solver for algebra, calculus, trig, and matrices.", url: "https://www.symbolab.com", free: false, tags: ["solver", "calculus", "algebra"] },
      { name: "PhET Simulations", desc: "Interactive physics, chemistry, and biology simulations by University of Colorado.", url: "https://phet.colorado.edu", free: true, tags: ["physics", "chemistry", "simulations"] },
    ],
  },
  {
    id: "audio",
    emoji: "🎧",
    label: "Audio",
    tagClass: "tag-audio",
    tools: [
      { name: "Audacity", desc: "Free, open-source audio editor. Record, cut, mix, and export any audio.", url: "https://www.audacityteam.org", free: true, tags: ["edit", "record", "mix"] },
      { name: "MP3Cut", desc: "Trim, cut, and merge audio files online. Supports MP3, WAV, OGG, AAC.", url: "https://mp3cut.net", free: true, tags: ["trim", "cut", "merge"] },
      { name: "Soundtrap", desc: "Cloud-based music studio. Collaborate on tracks from any device.", url: "https://www.soundtrap.com", free: false, tags: ["music", "studio", "collaborate"] },
    ],
  },

  // ─── ✦ ADD YOUR NEXT CATEGORY HERE ✦ ──────────────────────────────────────
  // {
  //   id: "your-id",
  //   emoji: "🔧",
  //   label: "Your Category Name",
  //   tagClass: "tag-dev",  // pick from: tag-pdf tag-image tag-write tag-dev
  //                         //            tag-video tag-ai tag-math tag-audio
  //   tools: [
  //     {
  //       name: "Tool Name",
  //       desc: "One-line description.",
  //       url: "https://example.com",
  //       free: true,
  //       tags: ["tag1", "tag2"],
  //     },
  //   ],
  // },
];

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) setActiveCategory(hash);
  }, []);

  const filtered = TOOL_CATEGORIES.map((cat) => ({
    ...cat,
    tools: cat.tools.filter((t) => {
      const q = search.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        (t.tags || []).some((tag) => tag.includes(q))
      );
    }),
  })).filter((cat) => {
    if (activeCategory !== "all" && cat.id !== activeCategory) return false;
    return cat.tools.length > 0;
  });

  const totalTools = TOOL_CATEGORIES.reduce((acc, c) => acc + c.tools.length, 0);

  return (
    <main className="bg-[#080808] min-h-screen text-white overflow-x-hidden">
      <Nav active="tools" />

      {/* HEADER */}
      <section className="relative z-10 pt-36 pb-16 px-8 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-xs uppercase text-[#f5a623] mb-4" style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.5em" }}>
            Library / Tools
          </p>
          <h1 className="text-6xl md:text-7xl font-medium tracking-tighter leading-none mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Free Tools.
            <br />
            <em className="text-white/25 font-light">No excuses.</em>
          </h1>
          <p className="text-white/35 text-sm max-w-md leading-relaxed" style={{ fontFamily: "'DM Mono', monospace" }}>
            {totalTools} tools across {TOOL_CATEGORIES.length} categories. All browser-accessible, most completely free.
          </p>
        </motion.div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-[64px] z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.04] px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs uppercase border transition-all ${activeCategory === "all" ? "bg-[#f5a623] text-black border-[#f5a623]" : "border-white/10 text-white/30 hover:text-white/60 hover:border-white/25"}`}
              style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.25em" }}
            >
              All
            </button>
            {TOOL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); window.history.replaceState(null, "", `#${cat.id}`); }}
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase border transition-all flex items-center gap-1.5 ${activeCategory === cat.id ? "bg-[#f5a623] text-black border-[#f5a623]" : "border-white/10 text-white/30 hover:text-white/60 hover:border-white/25"}`}
                style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.25em" }}
              >
                <span>{cat.emoji}</span>{cat.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white/70 placeholder-white/20 focus:outline-none focus:border-[#f5a623]/40 w-full md:w-56 transition-colors"
            style={{ fontFamily: "'DM Mono', monospace" }}
          />
        </div>
      </section>

      {/* TOOL GRID */}
      <section className="max-w-7xl mx-auto px-8 py-16 space-y-20 relative z-10">
        {filtered.length === 0 && (
          <div className="text-center py-32 text-white/20 text-sm" style={{ fontFamily: "'DM Mono', monospace" }}>
            No tools found for &quot;{search}&quot;
          </div>
        )}
        {filtered.map((cat) => (
          <div key={cat.id} id={cat.id}>
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/[0.05]">
              <span className="text-2xl">{cat.emoji}</span>
              <h2 className="text-2xl font-medium" style={{ fontFamily: "'DM Serif Display', serif" }}>{cat.label}</h2>
              <span className={`ml-auto px-2.5 py-0.5 rounded-full border text-xs uppercase ${cat.tagClass}`} style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.25em" }}>
                {cat.tools.length} tools
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cat.tools.map((tool, ti) => (
                <motion.a
                  key={ti}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ti * 0.04 }}
                  className="group relative p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] card-hover-glow overflow-hidden flex flex-col justify-between min-h-[180px]"
                >
                  <div className="absolute inset-0 bg-[#f5a623]/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-base font-medium group-hover:text-[#f5a623] transition-colors leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {tool.name}
                      </h3>
                      <span
                        className={`ml-2 shrink-0 px-2 py-0.5 rounded-full text-xs border ${tool.free ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" : "text-amber-400 border-amber-500/20 bg-amber-500/5"}`}
                        style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em" }}
                      >
                        {tool.free ? "Free" : "Freemium"}
                      </span>
                    </div>
                    <p className="text-white/35 text-xs leading-relaxed font-light" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {tool.desc}
                    </p>
                  </div>
                  <div className="relative z-10 mt-5 flex items-center justify-between">
                    {tool.tags && (
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.slice(0, 2).map((tag, ti2) => (
                          <span key={ti2} className="text-xs text-white/20 bg-white/[0.04] px-1.5 py-0.5 rounded" style={{ fontFamily: "'DM Mono', monospace" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="text-[#f5a623] text-xs uppercase opacity-0 group-hover:opacity-100 transition-all ml-auto" style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.2em" }}>
                      Open ↗
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.04] py-14 px-8 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs uppercase text-white/20" style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.4em" }}>
            © {new Date().getFullYear()} ToolHub — Free. Always.
          </div>
          <div className="flex gap-8 text-xs uppercase text-white/20" style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.3em" }}>
            <a href="/" className="hover:text-white/60 transition-colors">Home</a>
            <a href="/courses" className="hover:text-white/60 transition-colors">Courses</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
