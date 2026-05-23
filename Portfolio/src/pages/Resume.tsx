import { Link } from 'react-router-dom'
import { Printer, ArrowLeft, Github, Linkedin, Mail } from 'lucide-react'
import Navbar from '../components/Navbar'
import { projects } from '../data/projects'
import { skills } from '../data/skills'
import { certificates } from '../data/certificates'

const topProjects = projects.filter(p => p.featured)

const certs = certificates
  .filter(c => c.featured)
  .map(c => `${c.title}${c.issuer !== 'Online Course' && c.issuer !== 'Online Platform' ? ` — ${c.issuer}` : ''}`)

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
            <div className="glass-card p-8 mb-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />
              <div className="relative">
                <h1 className="font-heading text-4xl font-bold text-white mb-1">Sathvik Banda</h1>
                <p className="text-cyan-400 text-lg font-medium mb-4">AI &amp; ML Engineer</p>
                <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/50">
                  <a href="mailto:bandasathvik0@gmail.com" aria-label="Email" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                    <Mail size={14} /> bandasathvik0@gmail.com
                  </a>
                  <a href="https://github.com/Sathvik0728" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                    <Github size={14} /> Sathvik0728
                  </a>
                  <a href="https://www.linkedin.com/in/banda-sathvik/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                    <Linkedin size={14} /> banda-sathvik
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 mb-6">
              <h2 className="font-heading text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-cyan-400 rounded-full inline-block" />
                Education
              </h2>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-semibold">B.Tech — Computer Science & Engineering (AI & ML)</h3>
                  <p className="text-white/50 text-sm mt-1">Malla Reddy College of Engineering And Technology</p>
                </div>
                <span className="tag shrink-0">2023 – 2027</span>
              </div>
            </div>

            <div className="glass-card p-6 mb-6">
              <h2 className="font-heading text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-cyan-400 rounded-full inline-block" />
                Technical Skills
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(skills).map(([cat, items]) => (
                  <div key={cat}>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{cat}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map(s => (
                        <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 mb-6">
              <h2 className="font-heading text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-cyan-400 rounded-full inline-block" />
                Key Projects
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {topProjects.map(p => (
                  <div key={p.title} className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                    <h3 className="font-heading font-semibold text-white text-sm mb-1">{p.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed mb-2">{p.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map(t => <span key={t} className="tag text-xs">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-heading text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-cyan-400 rounded-full inline-block" />
                Certifications &amp; Achievements
              </h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {certs.map(c => (
                  <li key={c} className="flex items-start gap-2 text-sm text-white/60">
                    <span className="text-cyan-400 mt-1 text-xs">▸</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* === PRINT VIEW === */}
          <div className="hidden print:block">
            <style>{`
              @media print {
                @page { size: A4; margin: 16mm 18mm; }
                * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                body { background: white !important; }
                nav, .no-print { display: none !important; }
                main { padding: 0 !important; }
              }
              .print-resume {
                font-family: 'Calibri', 'Arial', sans-serif;
                font-size: 11pt;
                color: #111;
                line-height: 1.55;
              }
              .print-resume h1 { font-size: 24pt; font-weight: 700; color: #0a0a0a; margin: 0 0 3px 0; letter-spacing: -0.3px; }
              .print-resume .subtitle { font-size: 12pt; color: #444; margin-bottom: 7px; }
              .print-resume .contact-row { font-size: 10pt; color: #555; display: flex; gap: 22px; flex-wrap: wrap; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1.5px solid #1a1a2e; }
              .print-resume .summary { font-size: 10.5pt; color: #333; line-height: 1.6; margin-bottom: 4px; }
              .print-resume .section-heading { font-size: 9.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #1a1a2e; border-bottom: 1px solid #ccc; padding-bottom: 3px; margin: 14px 0 7px 0; }
              .print-resume .edu-row { display: flex; justify-content: space-between; align-items: baseline; }
              .print-resume .edu-name { font-weight: 600; font-size: 11pt; }
              .print-resume .edu-college { color: #555; font-size: 10pt; }
              .print-resume .edu-date { font-size: 10pt; color: #555; }
              .print-resume .skill-row { margin-bottom: 4px; font-size: 10pt; }
              .print-resume .skill-label { font-weight: 700; color: #1a1a2e; }
              .print-resume .project-title { font-weight: 700; font-size: 10.5pt; color: #0a0a0a; }
              .print-resume .project-tech { font-size: 9pt; color: #777; margin-left: 6px; }
              .print-resume .project-desc { font-size: 10pt; color: #444; margin: 2px 0 8px 0; line-height: 1.5; }
              .print-resume .cert-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 24px; }
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
                Final-year B.Tech student in Computer Science (AI &amp; ML) with hands-on experience building intelligent systems across computer vision, NLP, and web AI. Developed 20+ projects spanning real-time gesture control, deep learning classifiers, and deployed ML web applications. Passionate about turning complex AI research into interactive, real-world products.
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
                  <span>{items.join(' · ')}</span>
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
