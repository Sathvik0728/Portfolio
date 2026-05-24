import { useRef, useEffect } from 'react'

const techs = [
  'Python', 'OpenCV', 'MediaPipe', 'TensorFlow', 'scikit-learn',
  'Flask', 'React', 'TypeScript', 'Streamlit', 'NumPy',
  'pandas', 'PyAutoGUI', 'Tailwind CSS', 'Vite', 'Git',
]

const doubled = [...techs, ...techs]

export default function TechTicker() {
  const trackRef   = useRef<HTMLDivElement>(null)
  const dragging   = useRef(false)
  const hovering   = useRef(false)
  const startX     = useRef(0)
  const baseX      = useRef(0)

  const getX = () => {
    if (!trackRef.current) return 0
    return new DOMMatrix(getComputedStyle(trackRef.current).transform).m41
  }

  const pauseAt = (x?: number) => {
    const el = trackRef.current
    if (!el) return
    const px = x ?? getX()
    baseX.current = px
    el.style.animationPlayState = 'paused'
    el.style.transform = `translateX(${px}px)`
  }

  const resume = () => {
    const el = trackRef.current
    if (!el || dragging.current || hovering.current) return
    el.style.transform = ''
    el.style.animationPlayState = 'running'
  }

  useEffect(() => {
    const onMove = (clientX: number) => {
      if (!dragging.current || !trackRef.current) return
      const delta = clientX - startX.current
      trackRef.current.style.transform = `translateX(${baseX.current + delta}px)`
    }

    const onUp = (clientX: number) => {
      if (!dragging.current) return
      baseX.current = baseX.current + (clientX - startX.current)
      dragging.current = false
      resume()
    }

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX)
    const onMouseUp   = (e: MouseEvent) => onUp(e.clientX)
    const onTouchMove = (e: TouchEvent) => onMove(e.touches[0].clientX)
    const onTouchEnd  = (e: TouchEvent) => {
      if (!dragging.current) return
      baseX.current = getX()
      dragging.current = false
      hovering.current = false
      resume()
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup',   onMouseUp)
    document.addEventListener('touchmove', onTouchMove, { passive: true })
    document.addEventListener('touchend',  onTouchEnd)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup',   onMouseUp)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend',  onTouchEnd)
    }
  }, [])

  return (
    <div
      className="relative overflow-hidden py-4 select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => { hovering.current = true;  pauseAt() }}
      onMouseLeave={() => { hovering.current = false; resume() }}
      onMouseDown={e => {
        pauseAt()
        dragging.current = true
        startX.current = e.clientX
        e.preventDefault()
      }}
      onTouchStart={e => {
        hovering.current = true
        pauseAt()
        dragging.current = true
        startX.current = e.touches[0].clientX
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#060B18] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#060B18] to-transparent pointer-events-none" />

      <div ref={trackRef} className="ticker-track flex gap-6 w-max">
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
