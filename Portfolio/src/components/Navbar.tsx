import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact',      href: '#contact' },
]

const sectionIds = navLinks.map(l => l.href.slice(1))

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [open, setOpen]           = useState(false)
  const [active, setActive]       = useState('')
  const location = useLocation()
  const isResume = location.pathname === '/resume'

  const onScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setScrolled(window.scrollY > 50)
      // Find which section is currently in view
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) current = id
      }
      setActive(current)
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#060B18]/90 backdrop-blur-md' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Sathvik Banda — Home"
          className="font-heading font-bold text-lg text-white hover:text-cyan-400 transition-colors"
        >
          <span className="relative inline-block w-[130px] h-6">
            <AnimatePresence mode="wait">
              {scrolled ? (
                <motion.span
                  key="full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-0 whitespace-nowrap"
                >
                  Sathvik <span className="text-cyan-400">Banda</span>
                </motion.span>
              ) : (
                <motion.span
                  key="initials"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-0 whitespace-nowrap"
                >
                  SB<span className="text-cyan-400">.</span>
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </Link>

        {!isResume && (
          <>
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map(link => {
                const id = link.href.slice(1)
                const isActive = active === id
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`text-sm font-medium transition-colors relative ${isActive ? 'text-cyan-400' : 'text-white/60 hover:text-white'}`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            <Link to="/resume" className="hidden md:block btn-outline text-sm py-2 px-4">
              Resume
            </Link>

            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open ? 'true' : 'false'}
              className="md:hidden text-white/70 hover:text-white transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </>
        )}

        {isResume && (
          <Link to="/" className="btn-outline text-sm py-2 px-4">← Portfolio</Link>
        )}
      </div>

      {open && (
        <div className="md:hidden bg-[#0A0F1E]/95 backdrop-blur-md border-b border-white/5 px-6 pb-6 pt-2">
          <ul className="flex flex-col gap-4">
            {navLinks.map(link => {
              const id = link.href.slice(1)
              const isActive = active === id
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors ${isActive ? 'text-cyan-400 font-medium' : 'text-white/70 hover:text-white'}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
            <li>
              <Link
                to="/resume"
                className="btn-outline text-sm py-2 px-4 inline-block"
                onClick={() => setOpen(false)}
              >
                Resume
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
