import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Award } from 'lucide-react'
import { certificates, certCategories, type Certificate } from '../data/certificates'
import CertificateModal from './CertificateModal'

const categoryColors: Record<string, string> = {
  'ML & AI': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'Generative AI': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  'Cloud & Tools': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  'Data & Analytics': 'text-green-400 bg-green-500/10 border-green-500/20',
  'Competitions': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
}

export default function Certificates() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState<string>('All')
  const [showAll, setShowAll] = useState(false)
  const [selected, setSelected] = useState<Certificate | null>(null)

  const byCat = active === 'All' ? certificates : certificates.filter(c => c.category === active)
  const displayed = showAll ? byCat : byCat.filter(c => c.featured)
  const hiddenCount = byCat.filter(c => !c.featured).length

  return (
    <section id="certificates" ref={ref} className="py-14 md:py-24 px-6 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="section-subtitle">Credentials</p>
          <h2 className="section-title">Certificates</h2>
          <p className="text-white/40 text-sm mt-2 max-w-md mx-auto">
            Learning never stops — here's proof.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {['All', ...certCategories].map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => { setActive(cat); setShowAll(false) }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => cert.filename && setSelected(cert)}
              className={`glass-card p-5 flex items-start gap-4 hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all duration-300 group ${cert.filename ? 'cursor-pointer' : ''}`}
            >
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${categoryColors[cert.category]}`}>
                <Award size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors leading-snug mb-1">
                  {cert.title}
                </h3>
                <p className="text-white/40 text-xs">{cert.issuer}</p>
                <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full border ${categoryColors[cert.category]}`}>
                  {cert.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && hiddenCount > 0 && (
          <div className="text-center mt-10">
            <button type="button" onClick={() => setShowAll(true)} className="btn-outline">
              Show {hiddenCount} More
            </button>
          </div>
        )}
        {showAll && hiddenCount > 0 && (
          <div className="text-center mt-10">
            <button type="button" onClick={() => setShowAll(false)} className="btn-outline">
              Show Less
            </button>
          </div>
        )}
      </div>

      <CertificateModal cert={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
