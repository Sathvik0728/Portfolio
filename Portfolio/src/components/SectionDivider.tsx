export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center px-6 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-cyan-500/20" />
      <div className="mx-4 w-1.5 h-1.5 rounded-full bg-cyan-400/60 shadow-[0_0_8px_2px_rgba(0,212,255,0.5)]" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-cyan-500/20" />
    </div>
  )
}
