'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 400)
          return 100
        }
        return prev + Math.floor(Math.random() * 15) + 5
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center font-mono"
    >
      <div className="text-accent text-6xl font-serif mb-4">{progress}%</div>
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
      <p className="mt-4 text-sm text-gray-500 uppercase tracking-widest">Loading Toolkit</p>
    </motion.div>
  )
}
