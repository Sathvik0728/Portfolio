import { motion } from 'framer-motion'

const techs = [
  'Python', 'OpenCV', 'MediaPipe', 'TensorFlow', 'scikit-learn',
  'Flask', 'React', 'TypeScript', 'Streamlit', 'NumPy',
  'pandas', 'PyAutoGUI', 'Tailwind CSS', 'Vite', 'Git',
]

const doubled = [...techs, ...techs]

export default function TechTicker() {
  return (
    <div className="relative overflow-hidden py-4 select-none">
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#060B18] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#060B18] to-transparent" />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        className="flex gap-6 w-max"
      >
        {doubled.map((tech, i) => (
          <span
            key={i}
            className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-white/40 whitespace-nowrap"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
