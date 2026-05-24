import { useRef } from 'react'

const techs = [
  'Python', 'OpenCV', 'MediaPipe', 'TensorFlow', 'scikit-learn',
  'Flask', 'React', 'TypeScript', 'Streamlit', 'NumPy',
  'pandas', 'PyAutoGUI', 'Tailwind CSS', 'Vite', 'Git',
]

const doubled = [...techs, ...techs]

export default function TechTicker() {
  const trackRef = useRef<HTMLDivElement>(null)

  const pause = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused' }
  const play  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running' }

  return (
    <div
      className="relative overflow-hidden py-4 select-none"
      onMouseEnter={pause}
      onMouseLeave={play}
      onTouchStart={pause}
      onTouchEnd={play}
    >
<div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#060B18] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#060B18] to-transparent pointer-events-none" />

      <div
        ref={trackRef}
        className="ticker-track flex gap-6 w-max"
      >
        {doubled.map((tech, i) => (
          <span
            key={i}
            className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/[0.08] text-white/40 whitespace-nowrap"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
