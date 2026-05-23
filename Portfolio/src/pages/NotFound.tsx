import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-cyan-400 font-mono text-sm tracking-widest mb-4">404</p>
      <h1 className="font-heading text-5xl font-bold text-white mb-4">Page Not Found</h1>
      <p className="text-white/50 mb-10 max-w-sm">This page doesn't exist. Maybe you followed a broken link.</p>
      <Link to="/" className="btn-primary flex items-center gap-2">
        <Home size={16} /> Back to Portfolio
      </Link>
    </div>
  )
}
