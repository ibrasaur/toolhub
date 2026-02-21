'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Courses', path: '/courses' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/70 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl text-accent">
          ToolkitHub.
        </Link>
        <div className="flex gap-8 font-mono text-sm uppercase tracking-wider">
          {links.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`relative hover:text-accent transition-colors ${pathname === link.path ? 'text-accent' : 'text-gray-400'}`}
            >
              {link.name}
              {pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
