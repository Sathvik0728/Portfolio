import { Link } from 'react-router-dom'
import { Home, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-8xl md:text-9xl font-bold text-white/5 select-none mb-0 leading-none">
          404
        </p>
        <p className="text-cyan-400 font-mono text-sm tracking-widest -mt-6 mb-6">
          PAGE NOT FOUND
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Lost in the matrix?
        </h1>
        <p className="text-white/40 mb-10 max-w-sm leading-relaxed">
          This page doesn't exist — or was moved. Head back to the portfolio.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-primary flex items-center gap-2">
            <Home size={15} /> Back to Portfolio
          </Link>
          <Link to="/#projects" className="btn-outline flex items-center gap-2">
            View Projects <ArrowRight size={15} />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
