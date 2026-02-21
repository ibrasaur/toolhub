"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    const timer = setTimeout(() => setHidden(true), 3800);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (hidden) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.9, delay: 2.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080808]"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#f5a623] animate-pulse" />
          <span
            className="text-xs uppercase tracking-widest text-white/30"
            style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.5em" }}
          >
            TOOLHUB
          </span>
        </div>
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2.4, duration: 0.4 }}
          className="text-8xl text-white/90"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {count}
          <span className="text-[#f5a623]">%</span>
        </motion.span>
        <div className="w-48 h-px bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[#f5a623] transition-all duration-75"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
