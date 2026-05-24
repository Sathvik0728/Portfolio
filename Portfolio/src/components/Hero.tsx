import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, Github, Linkedin, Boxes, Rocket, BadgeCheck } from 'lucide-react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { motion } from 'framer-motion'
import RotatingText from './RotatingText'

const stats = [
  { icon: Boxes,     value: '22+', label: 'Projects Built' },
  { icon: Rocket,    value: '4',   label: 'Live Deployments' },
  { icon: BadgeCheck,value: '20+', label: 'Certificates' },
]

export default function Hero() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row md:items-center md:justify-center circuit-bg overflow-hidden">
      {ready && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: { value: 'transparent' } },
            fpsLimit: 60,
            particles: {
              color: { value: '#00D4FF' },
              links: { color: '#00D4FF', distance: 150, enable: true, opacity: 0.15, width: 1 },
              move: { enable: true, speed: 0.6, outModes: { default: 'bounce' } },
              number: { density: { enable: true }, value: 60 },
              opacity: { value: 0.25 },
              size: { value: { min: 1, max: 2 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0"
        />
      )}

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full flex flex-col items-center justify-evenly flex-1 pt-24 pb-20 md:flex-none md:block md:pt-0 md:pb-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 mb-3 md:mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-medium">Available for opportunities</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-cyan-400 font-mono text-sm tracking-widest mb-0 md:mb-4"
        >
          Hello, World! — I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-5xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-0 md:mb-3"
        >
          Sathvik{' '}
          <span className="glow-text">Banda</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 text-xl md:text-2xl font-light mb-0 md:mb-4"
        >
          AI &amp; ML Engineer
        </motion.p>

        {/* Rotating line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-0 md:mb-8 text-sm md:text-base"
        >
          <RotatingText />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/40 text-base md:text-lg max-w-2xl mx-auto mb-0 md:mb-10 leading-relaxed"
        >
          Turning complex AI research into products people can actually see, touch, and use —
          from gesture interfaces to deployed ML pipelines.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-0 md:mb-10"
        >
          <a href="#projects" className="btn-primary">View Projects</a>
          <Link to="/resume" className="btn-outline">Resume</Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex items-center justify-center gap-6 md:gap-10 mb-0 md:mb-8"
        >
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <Icon size={14} className="text-cyan-400/70" />
                <span className="font-heading font-bold text-xl md:text-2xl text-white">{value}</span>
              </div>
              <span className="text-white/35 text-xs">{label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href="https://github.com/Sathvik0728"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-white/40 hover:text-cyan-400 transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/banda-sathvik/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-white/40 hover:text-cyan-400 transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        tabIndex={0}
        className="absolute bottom-8 inset-x-0 mx-auto w-fit text-white/30 hover:text-cyan-400 transition-colors animate-bounce focus:outline-none focus:text-cyan-400"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  )
}
