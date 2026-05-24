import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Github, Linkedin, Mail, FileText, Copy, Check, Send, Loader, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const EMAIL = 'bandasathvik0@gmail.com'
const FORMSPREE_ID = 'mlgvlvay'

const links = [
  { icon: Mail,     label: 'Email',    value: EMAIL,                   href: `mailto:${EMAIL}` },
  { icon: Github,   label: 'GitHub',   value: 'github.com/Sathvik0728', href: 'https://github.com/Sathvik0728' },
  { icon: Linkedin, label: 'LinkedIn', value: 'banda-sathvik',          href: 'https://www.linkedin.com/in/banda-sathvik/' },
]

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [ref, inView] = useInView()
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref} className="py-14 md:py-24 px-6">
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

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="glass-card p-6 md:p-8 text-left mb-10"
        >
          <h3 className="font-heading font-semibold text-white text-base mb-6 flex items-center gap-2">
            <Send size={15} className="text-cyan-400" /> Send a Message
          </h3>

          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <Check size={22} className="text-green-400" />
              </div>
              <p className="text-white font-semibold mb-1">Message sent!</p>
              <p className="text-white/40 text-sm">I'll get back to you soon.</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 text-cyan-400 text-sm hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/40 text-xs uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/40 text-xs uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-white/40 text-xs uppercase tracking-widest">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                />
              </div>
              {status === 'error' && (
                <p className="text-red-400 text-sm">Something went wrong. Try emailing me directly.</p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary self-end flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending'
                  ? <><Loader size={15} className="animate-spin" /> Sending…</>
                  : <><Send size={15} /> Send Message</>
                }
              </button>
            </form>
          )}
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

      <footer className="mt-10 md:mt-16 pt-8 border-t border-white/5">
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
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="text-white/30 hover:text-cyan-400 transition-colors ml-2"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
        <p className="text-center text-white/15 text-xs mt-6">
          Designed & built by Sathvik Banda · {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  )
}
