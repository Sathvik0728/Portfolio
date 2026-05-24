import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Eye, Brain, Globe, Cpu } from 'lucide-react'

const focuses = [
  { icon: Eye,   label: 'Computer Vision', desc: 'Real-time gesture & pose systems',      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  { icon: Brain, label: 'Deep Learning',   desc: 'CNNs, emotion & object detection',       color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  { icon: Globe, label: 'Web AI Apps',     desc: 'Deployed ML-powered web services',       color: 'text-green-400 bg-green-500/10 border-green-500/20' },
  { icon: Cpu,   label: 'NLP Pipelines',   desc: 'Text classification & translation',      color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
]

const stats = [
  { value: 22, suffix: '+', label: 'Projects' },
  { value: 4,  suffix: '',  label: 'Live Apps' },
  { value: 20, suffix: '+', label: 'Certificates' },
]

function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    const duration = 1200
    const steps = 40
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, value)
      setCount(Math.floor(current))
      if (current >= value) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [active, value])

  return (
    <span className="font-heading font-bold text-3xl md:text-4xl glow-text">
      {count}{suffix}
    </span>
  )
}

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" ref={ref} className="py-14 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="section-subtitle">Who I Am</p>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        {/* Animated stat counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto"
        >
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="text-center glass-card py-4 px-2">
              <Counter value={value} suffix={suffix} active={inView} />
              <p className="text-white/40 text-xs mt-1">{label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Catchy pull quote */}
            <p className="text-cyan-400/80 font-heading text-lg font-medium italic mb-5 border-l-2 border-cyan-500/40 pl-4">
              "If I can imagine it, I can build it — and make it intelligent."
            </p>

            <p className="text-white/70 text-base leading-relaxed mb-5">
              I'm <span className="text-white font-semibold">Sathvik Banda</span>, a final-year B.Tech student in Computer Science specializing in AI & Machine Learning.
            </p>
            <p className="text-white/55 leading-relaxed mb-5">
              I build intelligent systems that go beyond notebooks — gesture-controlled interfaces, real-time computer vision pipelines, NLP tools, and ML-powered web apps that people can actually use.
            </p>
            <p className="text-white/55 leading-relaxed">
              I care about the full journey: from model to product, from idea to deployment.
            </p>

            <div className="flex flex-wrap gap-2 mt-7">
              <span className="tag">B.Tech CSE (AI&ML)</span>
              <span className="tag">Graduating 2027</span>
              <span className="tag">Open to Opportunities</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid grid-cols-2 gap-3"
          >
            {focuses.map(({ icon: Icon, label, desc, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="glass-card p-5 hover:bg-white/[0.07] transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-3 transition-colors ${color}`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-heading font-semibold text-white text-sm mb-1">{label}</h3>
                <p className="text-white/40 text-xs leading-snug">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
