export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center px-6 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-cyan-500/20" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-cyan-500/20" />
    </div>
  )
}
