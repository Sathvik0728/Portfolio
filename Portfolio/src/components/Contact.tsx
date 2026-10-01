import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Github, Linkedin, Mail, FileText, Copy, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const EMAIL = 'bandasathvik0@gmail.com'

const links = [
  { icon: Mail,     label: 'Email',    value: EMAIL,                   href: `mailto:${EMAIL}` },
  { icon: Github,   label: 'GitHub',   value: 'github.com/Sathvik0728', href: 'https://github.com/Sathvik0728' },
  { icon: Linkedin, label: 'LinkedIn', value: 'banda-sathvik',          href: 'https://www.linkedin.com/in/banda-sathvik/' },
]

export default function Contact() {
  const [ref, inView] = useInView()
  const [copied, setCopied] = useState(false)
  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" ref={ref} className="pt-14 md:pt-20 pb-8 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Get In Touch</p>
          <h2 className="section-title">Let's Build Something</h2>
          <p className="text-white/50 mt-4 mb-10 leading-relaxed max-w-md mx-auto">
            Open to internships, full-time roles, and anything interesting in AI/ML.
            If you have an idea worth building — let's talk.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid sm:grid-cols-3 gap-4 mb-10"
        >
          {links.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="glass-card p-5 flex flex-col items-center gap-3 hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all duration-300 group relative"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <Icon size={18} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">{label}</p>
                <p className="text-white text-sm font-medium group-hover:text-cyan-400 transition-colors">{value}</p>
              </div>
              {label === 'Email' && (
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="absolute top-3 right-3 text-white/20 hover:text-cyan-400 transition-colors"
                >
                  {copied ? <Check size={13} className="text-cyan-400" /> : <Copy size={13} />}
                </button>
              )}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
        >
          <Link to="/resume" className="inline-flex items-center gap-2 btn-primary">
            <FileText size={16} />
            View Full Resume
          </Link>
        </motion.div>
      </div>

      <footer className="mt-8 pt-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-heading font-bold text-white text-sm">
              Sathvik <span className="text-cyan-400">Banda</span>
            </p>
            <p className="text-white/30 text-xs mt-0.5">AI & ML Engineer · Open to opportunities</p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-5 text-xs text-white/40">
            {['#about','#skills','#projects','#certificates','#contact'].map(href => (
              <a key={href} href={href} className="hover:text-cyan-400 transition-colors capitalize">
                {href.slice(1)}
              </a>
            ))}
            <Link to="/resume" className="hover:text-cyan-400 transition-colors">Resume</Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href="https://github.com/Sathvik0728" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/30 hover:text-cyan-400 transition-colors">
              <Github size={16} />
            </a>
            <a href="https://www.linkedin.com/in/banda-sathvik/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/30 hover:text-cyan-400 transition-colors">
              <Linkedin size={16} />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="text-white/30 hover:text-cyan-400 transition-colors">
              <Mail size={16} />
            </a>
          </div>
        </div>
        <p className="text-center text-white/15 text-xs mt-6">
          Designed & built by Sathvik Banda · {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  )
}
