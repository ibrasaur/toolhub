'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function RadialGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 opacity-30 mix-blend-screen"
      animate={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 166, 35, 0.15), transparent 80%)`
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
    />
  )
}
