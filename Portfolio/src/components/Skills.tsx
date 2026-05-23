import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Code2, BrainCircuit, Globe, Wrench } from 'lucide-react'
import { skills } from '../data/skills'
import TechTicker from './TechTicker'

const categoryMeta: Record<string, { icon: React.ElementType; gradient: string; iconColor: string }> = {
  'Languages':        { icon: Code2,        gradient: 'from-blue-500/15 to-cyan-500/5',    iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  'AI / ML':          { icon: BrainCircuit,  gradient: 'from-purple-500/15 to-pink-500/5',  iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  'Web':              { icon: Globe,          gradient: 'from-green-500/15 to-teal-500/5',   iconColor: 'text-green-400 bg-green-500/10 border-green-500/20' },
  'Tools & Platforms':{ icon: Wrench,         gradient: 'from-orange-500/15 to-yellow-500/5',iconColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
}

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" ref={ref} className="py-14 md:py-24 px-6 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="section-subtitle">What I Work With</p>
          <h2 className="section-title">Skills</h2>
          <p className="text-white/40 text-sm mt-2 max-w-md mx-auto">
            Tools I reach for when turning ideas into working AI systems.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {Object.entries(skills).map(([category, items], ci) => {
            const meta = categoryMeta[category]
            const Icon = meta?.icon ?? Code2
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
                className={`glass-card overflow-hidden hover:border-white/20 transition-all duration-300`}
              >
                {/* Gradient header strip */}
                <div className={`p-5 pb-3 bg-gradient-to-br ${meta?.gradient ?? ''}`}>
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-3 ${meta?.iconColor ?? ''}`}>
                    <Icon size={17} />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-sm tracking-wide">{category}</h3>
                </div>

                <div className="px-5 pb-5 pt-3 flex flex-wrap gap-2">
                  {items.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.25, delay: ci * 0.1 + si * 0.04 }}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-white/60 cursor-default select-none"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Scrolling tech ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TechTicker />
        </motion.div>
      </div>
    </section>
  )
}
