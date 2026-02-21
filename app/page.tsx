import RadialGlow from '../components/RadialGlow'
import Link from 'next/link'
import { ArrowRight, Wrench, BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-20">
      <RadialGlow />
      
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6">
          The ultimate directory of <span className="text-accent italic">free resources</span> for students.
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-mono mb-12 max-w-2xl leading-relaxed">
          Stop paying for software and courses. We've curated the best tools, apps, and educational materials—100% free or freemium.
        </p>

        <div className="flex flex-wrap gap-8 font-mono text-sm border-y border-white/10 py-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="text-accent text-3xl">60+</span>
            <span className="text-gray-500 uppercase tracking-widest">Curated<br/>Tools</span>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <span className="text-accent text-3xl">20+</span>
            <span className="text-gray-500 uppercase tracking-widest">Free<br/>Courses</span>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-3">
            <span className="text-accent text-3xl">0</span>
            <span className="text-gray-500 uppercase tracking-widest">Hidden<br/>Paywalls</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Link href="/tools" className="group relative p-8 border border-white/10 bg-dark/50 hover:border-accent/50 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Wrench className="w-8 h-8 text-accent mb-6" />
            <h2 className="text-2xl font-serif mb-2">Browse Tools</h2>
            <p className="text-gray-400 font-mono text-sm mb-6">Discover PDF editors, IDEs, design software, and AI assistants.</p>
            <div className="flex items-center gap-2 text-accent font-mono text-sm group-hover:translate-x-2 transition-transform">
              Explore Library <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link href="/courses" className="group relative p-8 border border-white/10 bg-dark/50 hover:border-accent/50 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <BookOpen className="w-8 h-8 text-accent mb-6" />
            <h2 className="text-2xl font-serif mb-2">Find Courses</h2>
            <p className="text-gray-400 font-mono text-sm mb-6">Learn CS, Design, and Data Science from top universities for free.</p>
            <div className="flex items-center gap-2 text-accent font-mono text-sm group-hover:translate-x-2 transition-transform">
              Start Learning <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
