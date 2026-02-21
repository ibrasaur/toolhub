'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'

// ==========================================
// DATA STRUCTURE: HOW TO ADD NEW TOOLS
// 1. Add your tool object to the array below.
// 2. Ensure the category matches one of the exact strings in the categories array.
// 3. 'type' should be either "Free" or "Freemium".
// ==========================================

interface Tool {
  name: string
  category: string
  type: 'Free' | 'Freemium'
  description: string
  tags: string[]
  url: string
}

const CATEGORIES = ["All", "PDF & Docs", "Image Editing", "Writing & Research", "Dev & Code", "Video & Media", "AI Tools", "Math & Science", "Audio"]

const TOOLS_DATA: Tool[] = [
  // PDF & Docs
  { name: "ILovePDF", category: "PDF & Docs", type: "Free", description: "Merge, split, compress, convert, and unlock PDFs online.", tags: ["Utilities", "Browser"], url: "https://www.ilovepdf.com" },
  { name: "Obsidian", category: "PDF & Docs", type: "Free", description: "A powerful knowledge base on top of a local folder of plain text Markdown files.", tags: ["Notes", "Local"], url: "https://obsidian.md" },
  { name: "Notion", category: "PDF & Docs", type: "Freemium", description: "All-in-one workspace for notes, docs, wikis, and projects.", tags: ["Productivity", "Cloud"], url: "https://notion.so" },
  { name: "Sejda", category: "PDF & Docs", type: "Freemium", description: "Online PDF editor and converter with a generous free tier.", tags: ["Editor", "Web"], url: "https://www.sejda.com" },
  { name: "Google Docs", category: "PDF & Docs", type: "Free", description: "Online word processor included as part of the free, web-based Google Docs Editors suite.", tags: ["Cloud", "Collaboration"], url: "https://docs.google.com" },
  // Image Editing
  { name: "Photopea", category: "Image Editing", type: "Freemium", description: "Advanced image editor supporting PSD, XCF, Sketch, XD and CDR formats.", tags: ["Browser", "Photoshop Alternative"], url: "https://www.photopea.com" },
  { name: "Canva", category: "Image Editing", type: "Freemium", description: "Free design tool for presentations, video, social media, and more.", tags: ["Design", "Templates"], url: "https://www.canva.com" },
  { name: "Figma", category: "Image Editing", type: "Freemium", description: "Collaborative interface design tool. Free for students via education plan.", tags: ["UI/UX", "Vector"], url: "https://www.figma.com" },
  { name: "GIMP", category: "Image Editing", type: "Free", description: "Cross-platform image editor available for GNU/Linux, OS X, Windows.", tags: ["Open Source", "Desktop"], url: "https://www.gimp.org" },
  { name: "Pixlr", category: "Image Editing", type: "Freemium", description: "Free photo editor and design maker in your browser.", tags: ["Web", "Quick Edits"], url: "https://pixlr.com" },
  // Writing & Research
  { name: "Zotero", category: "Writing & Research", type: "Free", description: "A free, easy-to-use tool to help you collect, organize, cite, and share research.", tags: ["Citations", "Open Source"], url: "https://www.zotero.org" },
  { name: "Grammarly", category: "Writing & Research", type: "Freemium", description: "Cloud-based typing assistant that reviews spelling, grammar, and punctuation.", tags: ["Proofreading", "Extension"], url: "https://www.grammarly.com" },
  { name: "DeepL", category: "Writing & Research", type: "Freemium", description: "Highly accurate AI translator for text and documents.", tags: ["Translation", "AI"], url: "https://www.deepl.com" },
  { name: "Hemingway App", category: "Writing & Research", type: "Free", description: "Makes your writing bold and clear by highlighting complex sentences.", tags: ["Editor", "Style"], url: "https://hemingwayapp.com" },
  { name: "Quillbot", category: "Writing & Research", type: "Freemium", description: "AI paraphrasing tool to rewrite and enhance sentences.", tags: ["Paraphrase", "AI"], url: "https://quillbot.com" },
  // Dev & Code
  { name: "VS Code", category: "Dev & Code", type: "Free", description: "Code editing. Redefined. Free. Built on open source. Runs everywhere.", tags: ["Editor", "Microsoft"], url: "https://code.visualstudio.com" },
  { name: "Vercel", category: "Dev & Code", type: "Freemium", description: "Platform for frontend frameworks and static sites, built to integrate with headless content.", tags: ["Hosting", "Next.js"], url: "https://vercel.com" },
  { name: "GitHub", category: "Dev & Code", type: "Freemium", description: "Where the world builds software. Free Student Developer Pack available.", tags: ["Git", "Collaboration"], url: "https://github.com" },
  { name: "CodePen", category: "Dev & Code", type: "Freemium", description: "Build, test, and discover front-end code.", tags: ["HTML/CSS/JS", "Community"], url: "https://codepen.io" },
  { name: "Postman", category: "Dev & Code", type: "Freemium", description: "API platform for building and using APIs.", tags: ["API", "Testing"], url: "https://www.postman.com" },
  // Video & Media
  { name: "DaVinci Resolve", category: "Video & Media", type: "Free", description: "Professional 8K editing, color correction, visual effects and audio post production.", tags: ["Pro Video", "Desktop"], url: "https://www.blackmagicdesign.com/products/davinciresolve" },
  { name: "OBS Studio", category: "Video & Media", type: "Free", description: "Free and open source software for video recording and live streaming.", tags: ["Streaming", "Open Source"], url: "https://obsproject.com" },
  { name: "CapCut", category: "Video & Media", type: "Freemium", description: "All-in-one video editor that makes video creation easier.", tags: ["Mobile/Desktop", "Social"], url: "https://www.capcut.com" },
  { name: "HandBrake", category: "Video & Media", type: "Free", description: "Open source video transcoder for converting video from nearly any format.", tags: ["Converter", "Open Source"], url: "https://handbrake.fr" },
  // AI Tools
  { name: "ChatGPT", category: "AI Tools", type: "Freemium", description: "Conversational AI model capable of answering questions and assisting with tasks.", tags: ["LLM", "OpenAI"], url: "https://chat.openai.com" },
  { name: "Claude", category: "AI Tools", type: "Freemium", description: "Next generation AI assistant based on Anthropic's research.", tags: ["LLM", "Anthropic"], url: "https://claude.ai" },
  { name: "Perplexity", category: "AI Tools", type: "Freemium", description: "AI-powered search engine that provides cited answers.", tags: ["Search", "Research"], url: "https://www.perplexity.ai" },
  { name: "Hugging Face", category: "AI Tools", type: "Free", description: "The AI community building the future. Access thousands of open-source models.", tags: ["Open Source", "ML"], url: "https://huggingface.co" },
  { name: "Gemini", category: "AI Tools", type: "Freemium", description: "Google's capable AI model for writing, planning, and learning.", tags: ["LLM", "Google"], url: "https://gemini.google.com" },
  // Math & Science
  { name: "Desmos", category: "Math & Science", type: "Free", description: "Beautiful, free math. Explore math with our beautiful, free online graphing calculator.", tags: ["Graphing", "Browser"], url: "https://www.desmos.com" },
  { name: "Wolfram Alpha", category: "Math & Science", type: "Freemium", description: "Compute expert-level answers using Wolfram's breakthrough algorithms.", tags: ["Computation", "Engine"], url: "https://www.wolframalpha.com" },
  { name: "GeoGebra", category: "Math & Science", type: "Free", description: "Dynamic mathematics software for all levels of education.", tags: ["Geometry", "Algebra"], url: "https://www.geogebra.org" },
  { name: "Symbolab", category: "Math & Science", type: "Freemium", description: "Step-by-step math solver for algebra, calculus, and more.", tags: ["Solver", "Steps"], url: "https://www.symbolab.com" },
  { name: "PhET", category: "Math & Science", type: "Free", description: "Interactive science and math simulations from University of Colorado Boulder.", tags: ["Simulations", "Physics"], url: "https://phet.colorado.edu" },
  // Audio
  { name: "Audacity", category: "Audio", type: "Free", description: "Free, open source, cross-platform audio software for multi-track recording and editing.", tags: ["Editor", "Open Source"], url: "https://www.audacityteam.org" },
  { name: "BandLab", category: "Audio", type: "Free", description: "Online music creation platform with built-in DAWs and loops.", tags: ["Browser", "DAW"], url: "https://www.bandlab.com" },
  { name: "Soundtrap", category: "Audio", type: "Freemium", description: "Spotify's online collaborative music and podcast recording studio.", tags: ["Podcast", "Music"], url: "https://www.soundtrap.com" },
  { name: "LMMS", category: "Audio", type: "Free", description: "Cross-platform music production software.", tags: ["Beatmaking", "Open Source"], url: "https://lmms.io" }
]

export default function ToolsDirectory() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="py-12 pb-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Software Directory</h1>
        <p className="text-gray-400 font-mono text-sm max-w-2xl">A curated collection of the best free and freemium tools for studying, creating, and building.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search tools..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark/50 border border-white/10 rounded-none py-3 pl-10 pr-4 text-sm font-mono text-white focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-mono border transition-all ${
                activeCategory === cat 
                  ? 'border-accent text-accent bg-accent/5' 
                  : 'border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, idx) => (
          <motion.a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group block p-6 bg-dark/40 border border-white/5 hover:border-accent/30 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <h3 className="text-xl font-serif text-white">{tool.name}</h3>
              <span className={`text-[10px] font-mono px-2 py-1 uppercase tracking-wider ${tool.type === 'Free' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
                {tool.type}
              </span>
            </div>
            
            <p className="text-sm text-gray-400 font-mono mb-6 line-clamp-2 relative z-10">
              {tool.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
              {tool.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono text-gray-500 border border-white/5 px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center text-xs font-mono text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all absolute bottom-6 right-6 z-10">
              Launch <ArrowUpRight className="w-3 h-3 ml-1" />
            </div>
          </motion.a>
        ))}
      </div>
      
      {filteredTools.length === 0 && (
        <div className="text-center py-20 text-gray-500 font-mono text-sm">
          No tools found matching your criteria.
        </div>
      )}
    </div>
  )
}
