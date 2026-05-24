import { Link } from 'react-router-dom'
import { Printer, ArrowLeft, Github, Linkedin, Mail } from 'lucide-react'
import Navbar from '../components/Navbar'
import { projects } from '../data/projects'
import { skills } from '../data/skills'
import { certificates } from '../data/certificates'

const topProjects = projects.filter(p => p.featured)

const certs = certificates.filter(c => c.featured).map(c => c.title)

export default function Resume() {
  return (
    <>
      <Navbar />

      <div className="no-print fixed bottom-8 right-8 z-50 flex gap-3">
        <Link to="/" className="btn-outline flex items-center gap-2 text-sm py-2.5">
          <ArrowLeft size={15} /> Back
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="btn-primary flex items-center gap-2 text-sm py-2.5"
        >
          <Printer size={15} /> Print / Save PDF
        </button>
      </div>

      <main className="min-h-screen pt-24 pb-24 px-6 print:pt-0 print:pb-0 print:px-0">
        <div className="max-w-4xl mx-auto">

          {/* === WEB VIEW === */}
          <div className="print:hidden">
            {/* Hero header */}
            <div className="glass-card mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 to-blue-600/5" />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/60 via-blue-500/40 to-transparent" />
              <div className="relative p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Initials avatar */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(0,212,255,0.12)]">
                  <span className="font-heading font-bold text-2xl text-cyan-400">SB</span>
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">Sathvik Banda</h1>
                  <p className="text-cyan-400 font-medium mb-1">AI &amp; ML Engineer</p>
                  <p className="text-white/40 text-sm mb-4 max-w-xl">
                    Final-year B.Tech student building intelligent systems — from real-time gesture control to deployed ML web apps.
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-white/50">
                    <a href="mailto:bandasathvik0@gmail.com" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                      <Mail size={13} /> bandasathvik0@gmail.com
                    </a>
                    <a href="https://github.com/Sathvik0728" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                      <Github size={13} /> Sathvik0728
                    </a>
                    <a href="https://www.linkedin.com/in/banda-sathvik/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                      <Linkedin size={13} /> banda-sathvik
                    </a>
                  </div>
                </div>
                {/* Open to work badge */}
                <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Open to work
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="glass-card p-6 mb-5">
              <h2 className="font-heading text-base font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-400 rounded-full" />
                Education
              </h2>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-white font-semibold text-sm">B.Tech — Computer Science &amp; Engineering (AI &amp; ML)</h3>
                  <p className="text-white/40 text-sm mt-0.5">Malla Reddy College of Engineering And Technology</p>
                </div>
                <span className="tag shrink-0 self-start">2023 – 2027</span>
              </div>
            </div>

            {/* Skills */}
            <div className="glass-card p-6 mb-5">
              <h2 className="font-heading text-base font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-400 rounded-full" />
                Technical Skills
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {Object.entries(skills).map(([cat, items]) => (
                  <div key={cat}>
                    <p className="text-white/35 text-[10px] uppercase tracking-widest mb-2 font-medium">{cat}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map(s => (
                        <span key={s.name} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-white/65">{s.name}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="glass-card p-6 mb-5">
              <h2 className="font-heading text-base font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-400 rounded-full" />
                Key Projects
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {topProjects.map(p => (
                  <div key={p.title} className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.07] hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-200 group">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-heading font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors leading-snug">{p.title}</h3>
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} GitHub repository`} className="text-white/20 hover:text-white transition-colors shrink-0 mt-0.5">
                          <Github size={13} />
                        </a>
                      )}
                    </div>
                    <p className="text-white/45 text-xs leading-relaxed mb-2.5">{p.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.slice(0, 4).map(t => <span key={t} className="tag text-[10px] py-0.5">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="glass-card p-6">
              <h2 className="font-heading text-base font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-cyan-400 rounded-full" />
                Certifications &amp; Achievements
              </h2>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {certs.map(c => (
                  <li key={c} className="flex items-start gap-2 text-sm text-white/55">
                    <span className="text-cyan-400/70 mt-0.5 text-xs shrink-0">▸</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* === PRINT VIEW === */}
          <div className="hidden print:block">
            <style>{`
              @media print {
                @page { size: A4; margin: 11mm 15mm; }
                * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                body { background: white !important; }
                nav, .no-print { display: none !important; }
                main { padding: 0 !important; }
              }
              .print-resume {
                font-family: 'Calibri', 'Arial', sans-serif;
                font-size: 11pt;
                color: #111;
                line-height: 1.6;
              }
              .print-resume h1 { font-size: 23pt; font-weight: 700; color: #0a0a0a; margin: 0 0 3px 0; letter-spacing: -0.3px; }
              .print-resume .subtitle { font-size: 12pt; color: #444; margin-bottom: 6px; }
              .print-resume .contact-row { font-size: 10pt; color: #555; display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1.5px solid #1a1a2e; }
              .print-resume .summary { font-size: 10.5pt; color: #333; line-height: 1.6; margin-bottom: 2px; }
              .print-resume .section-heading { font-size: 9.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #1a1a2e; border-bottom: 1px solid #ccc; padding-bottom: 3px; margin: 14px 0 7px 0; }
              .print-resume .edu-row { display: flex; justify-content: space-between; align-items: baseline; }
              .print-resume .edu-name { font-weight: 600; font-size: 11pt; }
              .print-resume .edu-college { color: #555; font-size: 10pt; }
              .print-resume .edu-date { font-size: 10pt; color: #555; }
              .print-resume .skill-row { margin-bottom: 4px; font-size: 10pt; }
              .print-resume .skill-label { font-weight: 700; color: #1a1a2e; }
              .print-resume .project-title { font-weight: 700; font-size: 10.5pt; color: #0a0a0a; }
              .print-resume .project-tech { font-size: 9pt; color: #777; margin-left: 6px; }
              .print-resume .project-desc { font-size: 10pt; color: #444; margin: 2px 0 9px 0; line-height: 1.5; }
              .print-resume .cert-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 24px; }
              .print-resume .cert-item { font-size: 10pt; color: #444; }
            `}</style>

            <div className="print-resume">
              <h1>Sathvik Banda</h1>
              <p className="subtitle">AI &amp; ML Engineer</p>
              <div className="contact-row">
                <span>bandasathvik0@gmail.com</span>
                <span>github.com/Sathvik0728</span>
                <span>linkedin.com/in/banda-sathvik</span>
              </div>

              <p className="section-heading">Summary</p>
              <p className="summary">
                Final-year B.Tech student in Computer Science (AI &amp; ML) with hands-on experience building intelligent systems across computer vision, NLP, and web AI. Developed 17+ projects spanning real-time gesture control, deep learning classifiers, and deployed ML web applications. Passionate about turning complex AI research into interactive, real-world products.
              </p>

              <p className="section-heading">Education</p>
              <div className="edu-row">
                <div>
                  <p className="edu-name">B.Tech — Computer Science &amp; Engineering (AI &amp; ML)</p>
                  <p className="edu-college">Malla Reddy College of Engineering And Technology</p>
                </div>
                <span className="edu-date">2023 – 2027</span>
              </div>

              <p className="section-heading">Technical Skills</p>
              {Object.entries(skills).map(([cat, items]) => (
                <p key={cat} className="skill-row">
                  <span className="skill-label">{cat}: </span>
                  <span>{items.map(s => s.name).join(' · ')}</span>
                </p>
              ))}

              <p className="section-heading">Key Projects</p>
              {topProjects.map(p => (
                <div key={p.title}>
                  <span className="project-title">{p.title}</span>
                  <span className="project-tech">— {p.tags.join(', ')}</span>
                  <p className="project-desc">{p.description}</p>
                </div>
              ))}

              <p className="section-heading">Certifications &amp; Achievements</p>
              <div className="cert-grid">
                {certs.map(c => (
                  <p key={c} className="cert-item">• {c}</p>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
