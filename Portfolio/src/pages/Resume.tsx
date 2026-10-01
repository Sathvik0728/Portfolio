import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Printer, ArrowLeft, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import Navbar from '../components/Navbar'
import { projects } from '../data/projects'
import { skills } from '../data/skills'
import { certificates, CERT_BASE } from '../data/certificates'

const resumeProjectTitles = ['Sign Language Detection', 'Face Emotion Recognition']

const resumeProjectPoints: Record<string, string[]> = {
  'Sign Language Detection': [
    'Built a real-time sign language recognition system that detects hand signs from a live webcam feed.',
    'Used MediaPipe and cvzone hand tracking with OpenCV to extract hand landmarks and classify gestures.',
    'Added multi-backend camera support (DSHOW, MSMF, VFW) with automatic retries and robust error handling for reliable real-world use.',
  ],
  'Face Emotion Recognition': [
    'Trained a custom CNN on the FER2013 dataset to classify 7 emotions: happy, sad, angry, fear, disgust, surprise and neutral.',
    'Integrated Haar cascade face detection with OpenCV to locate faces in a live webcam stream.',
    'Runs predictions frame by frame in real time, overlaying the detected emotion on each face.',
  ],
}
const topProjects = resumeProjectTitles
  .map(title => projects.find(p => p.title === title))
  .filter((p): p is (typeof projects)[number] => Boolean(p))

const resumeCertOrder = [
  'Fundamentals of Machine Learning and Artificial Intelligence',
  'Prompt Design in Vertex AI Skill Badge',
  'Fundamentals of Generative AI',
  'SIH Internal Hackathon Certificate',
]
const certs = resumeCertOrder
  .map(title => certificates.find(c => c.title === title))
  .filter((c): c is (typeof certificates)[number] => Boolean(c))
  .map(c => ({ title: c.title, issuer: c.issuer, url: `${CERT_BASE}/${encodeURIComponent(c.filename)}` }))

export default function Resume() {
  const printRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const prev = document.title
    document.title = 'Resume — Sathvik Banda'
    return () => { document.title = prev }
  }, [])

  const handleDownload = async () => {
    if (!printRef.current || downloading) return
    setDownloading(true)
    try {
      const [{ default: html2canvas }, jspdfModule] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])
      const jsPDF = jspdfModule.jsPDF ?? jspdfModule.default

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pageWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      const imgData = canvas.toDataURL('image/png')

      // Always fit the resume onto exactly one A4 page
      const scale = Math.min(1, pageHeight / imgHeight)
      const w = imgWidth * scale
      const h = imgHeight * scale
      pdf.addImage(imgData, 'PNG', (pageWidth - w) / 2, 0, w, h)

      pdf.save('Sathvik_Banda_Resume.pdf')
    } catch (err) {
      console.error('PDF generation failed', err)
      window.print()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <>
      <Navbar />

      <div className="no-print fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex gap-2 sm:gap-3">
        <Link to="/" className="btn-outline flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3.5 sm:px-6 py-2 sm:py-2.5 whitespace-nowrap">
          <ArrowLeft size={14} className="shrink-0" /> Back
        </Link>
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="btn-primary flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3.5 sm:px-6 py-2 sm:py-2.5 whitespace-nowrap disabled:opacity-60"
        >
          <Printer size={14} className="shrink-0" /> {downloading ? 'Generating…' : 'Download PDF'}
        </button>
      </div>

      <main className="min-h-screen pt-24 pb-28 sm:pb-24 px-4 sm:px-6 print:pt-0 print:pb-0 print:px-0">
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
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-white/50">
                    <a href="mailto:bandasathvik0@gmail.com" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors break-all">
                      <Mail size={13} className="shrink-0" /> bandasathvik0@gmail.com
                    </a>
                    <a href="https://github.com/Sathvik0728" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                      <Github size={13} className="shrink-0" /> Sathvik0728
                    </a>
                    <a href="https://www.linkedin.com/in/banda-sathvik/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                      <Linkedin size={13} className="shrink-0" /> banda-sathvik
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
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span className="tag">2023 – 2027</span>
                  <p className="text-cyan-400 text-sm font-medium">CGPA: 7.66</p>
                </div>
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
                        <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-white/65">{s}</span>
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
              <div className="grid gap-3">
                {topProjects.map(p => (
                  <div key={p.title} className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.07] hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-200 group">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      {p.github ? (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="font-heading font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors leading-snug hover:underline flex items-center gap-1">
                          {p.title}
                          <ExternalLink size={11} className="shrink-0 opacity-60" />
                        </a>
                      ) : (
                        <h3 className="font-heading font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors leading-snug">{p.title}</h3>
                      )}
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} GitHub repository`} className="text-white/20 hover:text-white transition-colors shrink-0 mt-0.5">
                          <Github size={13} />
                        </a>
                      )}
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-white/45 text-xs leading-relaxed mb-2.5">
                      {(resumeProjectPoints[p.title] ?? [p.description]).map(pt => <li key={pt}>{pt}</li>)}
                    </ul>
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
              <ul className="flex flex-col gap-2.5">
                {certs.map(c => (
                  <li key={c.title} className="flex flex-col sm:flex-row items-start sm:justify-between gap-1 sm:gap-4 text-sm">
                    <span className="flex items-start gap-2">
                      <span className="text-cyan-400/70 mt-0.5 text-xs shrink-0">▸</span>
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-white/70 font-medium hover:text-cyan-400 hover:underline transition-colors flex items-center gap-1">
                        {c.title}
                        <ExternalLink size={10} className="shrink-0 opacity-60" />
                      </a>
                    </span>
                    <span className="text-white/35 text-xs shrink-0 mt-0.5 pl-5 sm:pl-0">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* === PRINT VIEW === */}
          <div className="no-print-hide fixed left-0 top-0 -z-50 opacity-0 pointer-events-none print:static print:z-auto print:opacity-100 print:pointer-events-auto" aria-hidden="true">
            <style>{`
              @media print {
                @page { size: A4; margin: 0; }
                * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                body { background: white !important; }
                nav, .no-print { display: none !important; }
                main { padding: 0 !important; }
              }
              .no-print-hide { width: 210mm; }
              .print-resume {
                font-family: 'Calibri', 'Arial', sans-serif;
                font-size: 11.5pt;
                color: #111;
                line-height: 1.5;
                background: #ffffff;
                width: 210mm;
                height: 297mm;
                padding: 10mm;
                box-sizing: border-box;
                overflow: hidden;
              }
              .print-resume * { box-sizing: border-box; }
              .print-resume p, .print-resume ul { margin: 0; }
              .print-resume .frame {
                height: 100%;
                padding: 4mm 7mm;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .print-resume .header { text-align: center; }
              .print-resume .rs { }
              .print-resume h1 { font-size: 25pt; font-weight: 700; color: #0a0a0a; margin: 0 0 4px 0; letter-spacing: -0.3px; }
              .print-resume .subtitle { font-size: 12.5pt; color: #444; margin-bottom: 6px; letter-spacing: 0.5px; }
              .print-resume .contact-row { font-size: 10.5pt; color: #444; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; padding-bottom: 9px; border-bottom: 1.5px solid #1a1a2e; }
              .print-resume .contact-row .sep { color: #aaa; }
              .print-resume .summary { font-size: 11pt; color: #333; line-height: 1.55; text-align: justify; }
              .print-resume .section-heading { font-size: 10pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #1a1a2e; border-bottom: 1px solid #1a1a2e; padding-bottom: 3px; margin: 0 0 7px 0; }
              .print-resume .edu-row { display: flex; justify-content: space-between; align-items: baseline; }
              .print-resume .edu-name { font-weight: 600; font-size: 11.5pt; }
              .print-resume .edu-college { color: #555; font-size: 10.5pt; }
              .print-resume .edu-date { font-size: 10.5pt; color: #555; }
              .print-resume .skill-row { margin-bottom: 3px; font-size: 10.5pt; }
              .print-resume .skill-label { font-weight: 700; color: #1a1a2e; }
              .print-resume .project-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
              .print-resume .project-title { font-weight: 700; font-size: 11pt; color: #0a0a0a; }
              .print-resume .project-tech { font-size: 9.5pt; color: #666; font-style: italic; text-align: right; }
              .print-resume .project-desc { font-size: 10.5pt; color: #444; margin: 3px 0 8px 0; line-height: 1.45; list-style: disc; padding-left: 18px; }
              .print-resume .project-desc li { margin-bottom: 2px; }
              .print-resume .cert-list { display: flex; flex-direction: column; gap: 4px; }
              .print-resume .cert-row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
              .print-resume .cert-item { font-size: 10.5pt; color: #444; }
              .print-resume .cert-issuer { font-size: 9.5pt; color: #777; white-space: nowrap; }
              .print-resume a { color: inherit; text-decoration: none; }
            `}</style>

            <div className="print-resume" ref={printRef}>
             <div className="frame">
              <div className="header">
              <h1>Sathvik Banda</h1>
              <p className="subtitle">AI &amp; ML Engineer</p>
              <div className="contact-row">
                <a href="mailto:bandasathvik0@gmail.com">bandasathvik0@gmail.com</a>
                <span className="sep">|</span>
                <a href="https://github.com/Sathvik0728" target="_blank" rel="noopener noreferrer">github.com/Sathvik0728</a>
                <span className="sep">|</span>
                <a href="https://www.linkedin.com/in/banda-sathvik/" target="_blank" rel="noopener noreferrer">linkedin.com/in/banda-sathvik</a>
              </div>
              </div>

              <div className="rs">
              <p className="section-heading">Summary</p>
              <p className="summary">
                Final-year B.Tech student in Computer Science (AI &amp; ML) with hands-on experience building intelligent systems across computer vision, NLP, and web AI. Developed 22+ projects spanning real-time gesture control, deep learning classifiers, and deployed ML web applications. Passionate about turning complex AI research into interactive, real-world products.
              </p>

              </div>

              <div className="rs">
              <p className="section-heading">Education</p>
              <div className="edu-row">
                <div>
                  <p className="edu-name">B.Tech — Computer Science &amp; Engineering (AI &amp; ML)</p>
                  <p className="edu-college">Malla Reddy College of Engineering And Technology</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span className="edu-date">2023 – 2027</span>
                  <p className="edu-date" style={{ marginTop: 2 }}>CGPA: 7.66</p>
                </div>
              </div>

              </div>

              <div className="rs">
              <p className="section-heading">Technical Skills</p>
              {Object.entries(skills).map(([cat, items]) => (
                <p key={cat} className="skill-row">
                  <span className="skill-label">{cat}: </span>
                  <span>{items.join(' · ')}</span>
                </p>
              ))}

              </div>

              <div className="rs">
              <p className="section-heading">Key Projects</p>
              {topProjects.map(p => (
                <div key={p.title}>
                  <div className="project-head">
                    {p.github ? (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-title">
                        {p.title} <ExternalLink size={10} style={{ display: 'inline', verticalAlign: 'middle' }} />
                      </a>
                    ) : (
                      <span className="project-title">{p.title}</span>
                    )}
                    <span className="project-tech">{p.tags.join(' · ')}</span>
                  </div>
                  <ul className="project-desc">
                    {(resumeProjectPoints[p.title] ?? [p.description]).map(pt => <li key={pt}>{pt}</li>)}
                  </ul>
                </div>
              ))}

              </div>

              <div className="rs">
              <p className="section-heading">Certifications &amp; Achievements</p>
              <div className="cert-list">
                {certs.map(c => (
                  <div key={c.title} className="cert-row">
                    <span className="cert-item">• <a href={c.url} target="_blank" rel="noopener noreferrer">{c.title} <ExternalLink size={9} style={{ display: 'inline', verticalAlign: 'middle' }} /></a></span>
                    <span className="cert-issuer">{c.issuer}</span>
                  </div>
                ))}
              </div>
              </div>
             </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
