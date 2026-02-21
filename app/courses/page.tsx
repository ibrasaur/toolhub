'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Search, Clock, Award } from 'lucide-react'

// ==========================================
// DATA STRUCTURE: HOW TO ADD NEW COURSES
// 1. Add your course object to the array below.
// 2. Ensure category and level match the predefined options.
// 3. 'hours' can be an estimate (e.g., "12 weeks", "40 hours").
// ==========================================

interface Course {
  name: string
  provider: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  type: 'Free' | 'Audit Free'
  hasCert: boolean
  hours: string
  url: string
}

const CATEGORIES = ["All", "CS & Programming", "Data Science & ML", "Design & UX", "Languages", "Business & Finance", "STEM Foundations"]
const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"]

const COURSES_DATA: Course[] = [
  // CS & Programming
  { name: "CS50: Introduction to Computer Science", provider: "Harvard University", category: "CS & Programming", level: "Beginner", type: "Free", hasCert: true, hours: "12 weeks", url: "https://pll.harvard.edu/course/cs50-introduction-computer-science" },
  { name: "CS50W: Web Programming with Python and JS", provider: "Harvard University", category: "CS & Programming", level: "Intermediate", type: "Free", hasCert: true, hours: "12 weeks", url: "https://cs50.harvard.edu/web/" },
  { name: "Responsive Web Design", provider: "freeCodeCamp", category: "CS & Programming", level: "Beginner", type: "Free", hasCert: true, hours: "300 hours", url: "https://www.freecodecamp.org/" },
  { name: "Introduction to Computer Science and Programming in Python", provider: "MIT OpenCourseWare", category: "CS & Programming", level: "Beginner", type: "Free", hasCert: false, hours: "Self-paced", url: "https://ocw.mit.edu" },
  // Data Science & ML
  { name: "Practical Deep Learning for Coders", provider: "fast.ai", category: "Data Science & ML", level: "Intermediate", type: "Free", hasCert: false, hours: "Self-paced", url: "https://course.fast.ai/" },
  { name: "Machine Learning Specialization", provider: "Stanford / DeepLearning.AI", category: "Data Science & ML", level: "Beginner", type: "Audit Free", hasCert: false, hours: "2 months", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
  { name: "Elements of AI", provider: "University of Helsinki", category: "Data Science & ML", level: "Beginner", type: "Free", hasCert: true, hours: "30 hours", url: "https://www.elementsofai.com/" },
  // Design & UX
  { name: "Google UX Design Professional Certificate", provider: "Google", category: "Design & UX", level: "Beginner", type: "Audit Free", hasCert: false, hours: "6 months", url: "https://www.coursera.org/professional-certificates/google-ux-design" },
  { name: "Principles of UX Design", provider: "Figma", category: "Design & UX", level: "Beginner", type: "Free", hasCert: false, hours: "Self-paced", url: "https://www.figma.com/resource-library/ux-design-principles/" },
  // Business & Finance
  { name: "Financial Markets", provider: "Yale University", category: "Business & Finance", level: "Beginner", type: "Audit Free", hasCert: false, hours: "33 hours", url: "https://www.coursera.org/learn/financial-markets-global" },
  { name: "Entrepreneurship in Emerging Economies", provider: "HarvardX", category: "Business & Finance", level: "All Levels", type: "Free", hasCert: false, hours: "6 weeks", url: "https://www.edx.org/course/entrepreneurship-in-emerging-economies" },
  // STEM Foundations
  { name: "Calculus 1", provider: "Khan Academy", category: "STEM Foundations", level: "Beginner", type: "Free", hasCert: false, hours: "Self-paced", url: "https://www.khanacademy.org/math/calculus-1" },
  { name: "Physics library", provider: "Khan Academy", category: "STEM Foundations", level: "Beginner", type: "Free", hasCert: false, hours: "Self-paced", url: "https://www.khanacademy.org/science/physics" },
  // Languages
  { name: "Duolingo Language Tracks", provider: "Duolingo", category: "Languages", level: "All Levels", type: "Free", hasCert: false, hours: "Self-paced", url: "https://www.duolingo.com" },
  { name: "Basic Spanish 1", provider: "UPValenciaX", category: "Languages", level: "Beginner", type: "Free", hasCert: false, hours: "7 weeks", url: "https://www.edx.org/course/basic-spanish-1-getting-started" }
]

export default function CoursesDirectory() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeLevel, setActiveLevel] = useState("All Levels")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = activeCategory === "All" || course.category === activeCategory
    const matchesLevel = activeLevel === "All Levels" || course.level === activeLevel
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.provider.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesLevel && matchesSearch
  })

  return (
    <div className="py-12 pb-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Course Library</h1>
        <p className="text-gray-400 font-mono text-sm max-w-2xl">High-quality education should be accessible to everyone. Browse free courses from top universities and platforms.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search courses or providers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark/50 border border-white/10 rounded-none py-3 pl-10 pr-4 text-sm font-mono text-white focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            value={activeCategory} 
            onChange={(e) => setActiveCategory(e.target.value)}
            className="bg-dark border border-white/10 text-white font-mono text-xs py-3 px-4 focus:outline-none focus:border-accent/50 appearance-none rounded-none"
          >
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select 
            value={activeLevel} 
            onChange={(e) => setActiveLevel(e.target.value)}
            className="bg-dark border border-white/10 text-white font-mono text-xs py-3 px-4 focus:outline-none focus:border-accent/50 appearance-none rounded-none"
          >
            {LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course, idx) => (
          <motion.a
            key={course.name}
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group block p-6 bg-dark/40 border border-white/5 hover:border-accent/30 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="mb-4 relative z-10">
              <span className="text-accent text-xs font-mono uppercase tracking-wider block mb-2">{course.provider}</span>
              <h3 className="text-xl font-serif text-white">{course.name}</h3>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6 relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <span className={`w-2 h-2 rounded-full ${course.level === 'Beginner' ? 'bg-green-500' : course.level === 'Intermediate' ? 'bg-yellow-500' : course.level === 'Advanced' ? 'bg-red-500' : 'bg-gray-500'}`}></span>
                {course.level}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Clock className="w-3 h-3" />
                {course.hours}
              </div>
              {course.hasCert && (
                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                  <Award className="w-3 h-3" />
                  Certificate
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto relative z-10">
              <span className="text-[10px] font-mono px-2 py-1 uppercase tracking-wider bg-white/5 text-gray-300 border border-white/10">
                {course.type}
              </span>
              <div className="flex items-center text-xs font-mono text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                View Course <ArrowUpRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-20 text-gray-500 font-mono text-sm">
          No courses found matching your criteria.
        </div>
      )}
    </div>
  )
}
