import { Github, ExternalLink, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'

const categoryColors: Record<string, string> = {
  'Computer Vision': 'from-blue-500/20 to-cyan-500/20 border-cyan-500/20',
  'Deep Learning':   'from-purple-500/20 to-blue-500/20 border-purple-500/20',
  'Web & NLP':       'from-green-500/20 to-teal-500/20 border-green-500/20',
  'Games & Utilities':'from-orange-500/20 to-yellow-500/20 border-orange-500/20',
}

const categoryDot: Record<string, string> = {
  'Computer Vision':  'bg-cyan-400',
  'Deep Learning':    'bg-purple-400',
  'Web & NLP':        'bg-green-400',
  'Games & Utilities':'bg-orange-400',
}

interface Props {
  project: Project
  index: number
  inView: boolean
  featured?: boolean
  onClick?: () => void
}

export default function ProjectCard({ project, index, inView, featured, onClick }: Props) {
  const gradientClass = categoryColors[project.category] ?? 'from-white/5 to-white/5 border-white/10'
  const dotClass = categoryDot[project.category] ?? 'bg-white/40'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onClick}
      className={`glass-card flex flex-col hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.06)] transition-all duration-300 group overflow-hidden ${featured ? 'h-full' : ''} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Category colour banner */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradientClass}`} />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotClass}`} />
            <span className="text-xs text-white/50 font-mono">{project.category}</span>
          </div>
          <div className="flex items-center gap-2">
            {featured && (
              <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                <Star size={10} fill="currentColor" /> Featured
              </span>
            )}
            {/* Always-visible icon links for keyboard/accessibility */}
            <div className="flex gap-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub repository`}
                  className="text-white/30 hover:text-white transition-colors focus:text-white focus:outline-none">
                  <Github size={15} />
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="text-white/30 hover:text-cyan-400 transition-colors focus:text-cyan-400 focus:outline-none">
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
        </div>

        <h3 className="font-heading font-semibold text-white text-base mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-white/50 text-sm leading-relaxed flex-1 mb-4">
          {featured ? project.longDesc : project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="tag text-xs">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
