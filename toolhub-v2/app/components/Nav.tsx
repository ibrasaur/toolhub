"use client";
import { useEffect, useState } from "react";

type NavProps = {
  active?: "home" | "tools" | "courses";
};

export default function Nav({ active = "home" }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4 bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.04]" : "py-7 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        {/* Wordmark */}
        <a
          href="/"
          className="flex items-center gap-2.5 group"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#f5a623] group-hover:scale-150 transition-transform" />
          <span className="text-[11px] uppercase tracking-[0.4em] text-white/80 group-hover:text-white transition-colors">
            Tool<span className="text-[#f5a623]">Hub</span>
          </span>
        </a>

        {/* Links */}
        <div
          className="flex items-center gap-1"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {[
            { label: "Home", href: "/", key: "home" },
            { label: "Tools", href: "/tools", key: "tools" },
            { label: "Courses", href: "/courses", key: "courses" },
          ].map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`relative px-4 py-2 text-[10px] uppercase tracking-[0.3em] transition-all duration-300 rounded-full ${
                active === item.key
                  ? "text-[#f5a623] bg-[#f5a623]/10"
                  : "text-white/30 hover:text-white/70"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
