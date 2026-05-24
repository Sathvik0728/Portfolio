import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Github, ExternalLink } from 'lucide-react'
import type { Project } from '../data/projects'

const categoryColors: Record<string, string> = {
  'Computer Vision': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  'Deep Learning':   'text-purple-400 bg-purple-500/10 border-purple-500/20',
  'Web & NLP':       'text-green-400 bg-green-500/10 border-green-500/20',
  'Games & Utilities':'text-orange-400 bg-orange-500/10 border-orange-500/20',
}

interface Props {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={e => e.stopPropagation()}
            className="relative glass-card w-full max-w-lg p-6 md:p-8 overflow-hidden"
          >
            {/* colour banner */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
              project.category === 'Computer Vision' ? 'from-blue-500/40 to-cyan-500/40' :
              project.category === 'Deep Learning'   ? 'from-purple-500/40 to-blue-500/40' :
              project.category === 'Web & NLP'       ? 'from-green-500/40 to-teal-500/40' :
                                                       'from-orange-500/40 to-yellow-500/40'
            }`} />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full border mb-4 ${categoryColors[project.category]}`}>
              {project.category}
            </span>

            <h2 className="font-heading font-bold text-white text-xl md:text-2xl mb-3">
              {project.title}
            </h2>

            <p className="text-white/60 text-sm leading-relaxed mb-5">
              {project.longDesc}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="tag text-xs">{tag}</span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-2 px-4 flex items-center gap-2"
                >
                  <Github size={14} /> GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
