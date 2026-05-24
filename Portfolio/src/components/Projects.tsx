import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { projects, categories, type Category, type Project } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

const PAGE_SIZE = 6

export default function Projects() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState<Category>('All')
  const [showAll, setShowAll] = useState(false)
  const [selected, setSelected] = useState<Project | null>(null)

  const featured = projects.filter(p => p.featured)
  const filtered = active === 'All'
    ? projects.filter(p => !p.featured)
    : projects.filter(p => p.category === active && !p.featured)
  const displayed = showAll ? filtered : filtered.slice(0, PAGE_SIZE)
  const hiddenCount = Math.max(0, filtered.length - PAGE_SIZE)

  return (
    <section id="projects" ref={ref} className="py-14 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="section-subtitle">What I've Built</p>
          <h2 className="section-title">Projects</h2>
          <p className="text-white/40 text-sm mt-2 max-w-md mx-auto">
            Real code. Real results. From weekend experiments to deployed products.
          </p>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="font-heading text-lg font-semibold text-white/80 mb-5"
        >
          Featured
        </motion.h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 md:mb-14">
          {featured.map((p, i) => (
            <div key={p.id} className={i >= 3 ? 'hidden md:block' : ''}>
              <ProjectCard project={p} index={i} inView={inView} featured onClick={() => setSelected(p)} />
            </div>
          ))}
        </div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-heading text-lg font-semibold text-white/80 mb-5"
        >
          All Projects
        </motion.h3>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => { setActive(cat); setShowAll(false) }}
              className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} inView={inView} onClick={() => setSelected(p)} />
          ))}
        </div>

        {hiddenCount > 0 && !showAll && (
          <div className="text-center mt-8">
            <button type="button" onClick={() => setShowAll(true)} className="btn-outline">
              Show All ({hiddenCount} more)
            </button>
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
