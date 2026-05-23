import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const words = ['sees', 'predicts', 'ships', 'learns', 'creates']

export default function RotatingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % words.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="inline-flex items-center justify-center gap-2">
      <span className="text-white/40 shrink-0">I build AI that</span>
      {/* Fixed width = widest word "predicts" so static text never shifts */}
      <span className="relative inline-block w-20 h-6 overflow-hidden shrink-0">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 top-0 glow-text font-semibold whitespace-nowrap"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
