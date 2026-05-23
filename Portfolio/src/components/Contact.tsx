import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'bandasathvik0@gmail.com',
    href: 'mailto:bandasathvik0@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Sathvik0728',
    href: 'https://github.com/Sathvik0728',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'banda-sathvik',
    href: 'https://www.linkedin.com/in/banda-sathvik/',
  },
]

export default function Contact() {
  const [ref, inView] = useInView()

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
          className="grid sm:grid-cols-3 gap-4 mb-6 md:mb-10"
        >
          {links.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="glass-card p-5 flex flex-col items-center gap-3 hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <Icon size={18} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">{label}</p>
                <p className="text-white text-sm font-medium group-hover:text-cyan-400 transition-colors">{value}</p>
              </div>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <Link to="/resume" className="inline-flex items-center gap-2 btn-primary">
            <FileText size={16} />
            View Full Resume
          </Link>
        </motion.div>
      </div>

      <div className="text-center mt-10 md:mt-16 pt-8 border-t border-white/5">
        <p className="text-white/20 text-sm">
          Designed & built by Sathvik Banda · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  )
}
