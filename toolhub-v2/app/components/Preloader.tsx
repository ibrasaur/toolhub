"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 3800);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  if (done) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.9, delay: 2.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080808]"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8"
      >
        {/* Logo mark */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#f5a623] animate-pulse" />
          <span
            className="text-[11px] tracking-[0.5em] uppercase text-white/30"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            TOOLHUB
          </span>
        </div>

        {/* Counter */}
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2.4, duration: 0.4 }}
          className="text-7xl md:text-9xl text-white/90"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {count}
          <span className="text-[#f5a623]">%</span>
        </motion.span>

        {/* Loading bar */}
        <div className="w-48 h-px bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-[#f5a623]"
            style={{ width: `${count}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
